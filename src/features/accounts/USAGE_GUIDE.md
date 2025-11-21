# Guia de Uso - REST Link com Apollo Client

Este guia explica como a estrutura está configurada para fazer chamadas REST à API da Riot usando Apollo Client.

## Arquitetura

```
┌─────────────┐
│  Component  │
└──────┬──────┘
       │
       │ useGetAccountByRiotId()
       ▼
┌─────────────────┐
│   Apollo Hook   │
└──────┬──────────┘
       │
       │ GraphQL Query com @rest
       ▼
┌─────────────────┐
│   RestLink      │
└──────┬──────────┘
       │
       │ HTTP GET
       ▼
┌─────────────────────────────────────────┐
│  Riot API                               │
│  GET /riot/account/v1/accounts/...     │
└─────────────────────────────────────────┘
```

## Configuração atual

### 1. Apollo Client ([src/config/apolloClient.ts](../config/apolloClient.ts))

```typescript
const restLink = new RestLink({
  uri: 'https://americas.api.riotgames.com',
  headers: {
    'X-Riot-Token': import.meta.env.VITE_RIOT_API_KEY,
  },
});
```

### 2. Query GraphQL ([graphQL/queries.ts](./graphQL/queries.ts))

```graphql
query GetAccountByRiotId($gameName: String!, $tagLine: String!) {
  getAccountByRiotId(gameName: $gameName, tagLine: $tagLine)
    @rest(
      type: "RiotAccount"
      path: "/riot/account/v1/accounts/by-riot-id/{args.gameName}/{args.tagLine}"
      method: "GET"
    ) {
    puuid
    gameName
    tagLine
  }
}
```

**Observações:**
- A diretiva `@rest` informa ao RestLink que esta é uma chamada REST
- `path` usa interpolação de variáveis com `{args.variableName}`
- `type` define o tipo do objeto retornado (para cache)
- `method` especifica o verbo HTTP (padrão é GET)

### 3. Hook personalizado ([hooks/useGetAccountByRiotId.ts](./hooks/useGetAccountByRiotId.ts))

```typescript
export const useGetAccountByRiotId = () => {
  const [getAccount, { data, loading, error }] = useLazyQuery<
    GetAccountByRiotIdResponse,
    GetAccountByRiotIdVariables
  >(GET_ACCOUNT_BY_RIOT_ID);

  const fetchAccountByRiotId = async (gameName: string, tagLine: string) => {
    return await getAccount({
      variables: { gameName, tagLine },
    });
  };

  return { fetchAccountByRiotId, account: data?.getAccountByRiotId, loading, error };
};
```

## Como usar no componente

```tsx
import { useGetAccountByRiotId } from '@/features/accounts';

function SearchPlayer() {
  const { fetchAccountByRiotId, account, loading, error } = useGetAccountByRiotId();

  const handleSearch = async () => {
    // Essa chamada vai fazer um GET para:
    // https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/PlayerName/BR1
    await fetchAccountByRiotId('PlayerName', 'BR1');
  };

  return (
    <div>
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      {error && <p>Erro: {error.message}</p>}

      {account && (
        <div>
          <p>PUUID: {account.puuid}</p>
          <p>Nome: {account.gameName}</p>
          <p>Tag: {account.tagLine}</p>
        </div>
      )}
    </div>
  );
}
```

## O que acontece quando você chama `fetchAccountByRiotId`?

1. **Hook dispara a query** com variáveis `gameName` e `tagLine`
2. **RestLink intercepta** a query e vê a diretiva `@rest`
3. **RestLink monta a URL**:
   - Base: `https://americas.api.riotgames.com`
   - Path: `/riot/account/v1/accounts/by-riot-id/PlayerName/BR1`
4. **RestLink adiciona headers**:
   - `X-Riot-Token: sua_api_key`
5. **RestLink faz o fetch**:
   ```
   GET https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/PlayerName/BR1
   Headers: { X-Riot-Token: ... }
   ```
6. **API da Riot responde** com JSON:
   ```json
   {
     "puuid": "abc123...",
     "gameName": "PlayerName",
     "tagLine": "BR1"
   }
   ```
7. **RestLink transforma** o JSON em dados GraphQL tipados
8. **Apollo cache** armazena o resultado
9. **Hook retorna** os dados no estado `account`

## Vantagens desta abordagem

### ✅ Sem servidor intermediário
Você **não precisa** criar um servidor GraphQL. A chamada vai direto para a API da Riot.

### ✅ Type-safety
TypeScript garante que você está usando os tipos corretos:
```typescript
interface RiotAccount {
  puuid: string;
  gameName: string;
  tagLine: string;
}
```

### ✅ Cache automático
Apollo Client cacheia automaticamente. Se você buscar o mesmo jogador duas vezes, a segunda busca vem do cache.

### ✅ Loading states
O hook gerencia automaticamente os estados de loading e error.

### ✅ Reatividade
Se você usar `useQuery` (ao invés de `useLazyQuery`), o componente re-renderiza automaticamente quando os dados mudam.

## Notas importantes

### Região da API
A configuração atual usa `americas.api.riotgames.com`. Se precisar de outras regiões:

```typescript
// Opções de regiões:
// - americas.api.riotgames.com
// - asia.api.riotgames.com
// - europe.api.riotgames.com
// - sea.api.riotgames.com
```

### API Key
A API key é lida de `import.meta.env.VITE_RIOT_API_KEY`.

**IMPORTANTE**:
- Nunca commite a `.env` no git
- Use `.env.example` como referência
- A chave da Riot expira após 24 horas

### CORS
Como a chamada é feita do browser, você pode enfrentar problemas de CORS. Soluções:

1. **Development**: Use um proxy no Vite
2. **Production**: Use um backend que faça proxy das chamadas
3. **Riot API**: Algumas rotas da Riot não permitem CORS direto do browser

## Próximas features

Para adicionar novos endpoints da Riot, siga o mesmo padrão:

1. Crie a interface TypeScript em `types/`
2. Crie a query GraphQL com `@rest` em `graphQL/queries.ts`
3. Crie o hook customizado em `hooks/`
4. Export no `index.ts`

Exemplo para buscar matches:
```graphql
query GetMatchesByPuuid($puuid: String!) {
  getMatches(puuid: $puuid)
    @rest(
      type: "[String]"
      path: "/lol/match/v5/matches/by-puuid/{args.puuid}/ids"
    )
}
```
