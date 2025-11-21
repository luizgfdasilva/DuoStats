# Accounts Feature

Esta feature gerencia as chamadas relacionadas a contas Riot Games através de GraphQL.

## Estrutura

```
accounts/
├── examples/           # Componentes de exemplo
├── graphQL/           # Queries e mutations GraphQL
├── hooks/             # Custom hooks React
├── mocks/             # Dados mockados para testes
├── types/             # TypeScript types e interfaces
└── index.ts           # Barrel exports
```

## Como usar

Existem **duas formas** de usar esta feature:

### 1. Função direta: `QueryAccountByRiotId` (Recomendado)

Use esta abordagem quando você quer controle total sobre a chamada, similar ao padrão do seu exemplo.

```tsx
import { QueryAccountByRiotId } from '@/features/accounts'

async function handleGetAccount() {
    try {
        const account = await QueryAccountByRiotId('imEDGE', '666')
        console.log(account.puuid)
    } catch (error) {
        console.error('Failed to fetch account:', error)
    }
}
```

**Vantagens:**

- ✅ Controle total sobre a chamada
- ✅ Pode ser usado fora de componentes React
- ✅ Útil para chamadas imperativas
- ✅ Código mais limpo e direto

### 2. Hook: `useGetAccountByRiotId`

Use esta abordagem quando você precisa de reatividade e estados gerenciados automaticamente.

```tsx
import { useGetAccountByRiotId } from '@/features/accounts'

function MyComponent() {
    const { fetchAccountByRiotId, account, loading, error } = useGetAccountByRiotId()

    const handleSearch = async () => {
        await fetchAccountByRiotId('PlayerName', 'BR1')
    }

    return (
        <div>
            <button onClick={handleSearch} disabled={loading}>
                Buscar
            </button>
            {account && <p>PUUID: {account.puuid}</p>}
            {error && <p>Erro: {error.message}</p>}
        </div>
    )
}
```

**Vantagens:**

- ✅ Estados (loading, error) gerenciados automaticamente
- ✅ Reatividade do React
- ✅ Ideal para UIs complexas

### 2. Query GraphQL

A query `GET_ACCOUNT_BY_RIOT_ID` está disponível em `graphQL/queries.ts`:

```graphql
query GetAccountByRiotId($gameName: String!, $tagLine: String!) {
    getAccountByRiotId(gameName: $gameName, tagLine: $tagLine) {
        puuid
        gameName
        tagLine
    }
}
```

### 3. Types

```typescript
interface RiotAccount {
    puuid: string
    gameName: string
    tagLine: string
}
```

## Endpoint da API Riot

Esta feature prepara a chamada para o endpoint:

- `/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}`

**IMPORTANTE**: A chamada não será executada até que você:

1. Configure um servidor GraphQL que faça o proxy para a API da Riot
2. Configure a variável de ambiente `VITE_GRAPHQL_URI`
3. Use o hook em um componente e chame `fetchAccountByRiotId()`

## Configuração

Certifique-se de ter as variáveis de ambiente configuradas no arquivo `.env`:

```env
VITE_RIOT_API_KEY=sua_chave_aqui
VITE_GRAPHQL_URI=http://localhost:4000/graphql
```

## Arquitetura REST Link

Esta feature está configurada para usar **apollo-link-rest**, que permite fazer chamadas REST diretamente sem precisar de um servidor GraphQL intermediário.

### Como funciona:

1. **RestLink** intercepta queries GraphQL com a diretiva `@rest`
2. Converte a query em uma chamada HTTP REST
3. A API da Riot responde com JSON
4. O RestLink transforma o JSON em dados GraphQL tipados

### Vantagens:

- ✅ Sem necessidade de servidor GraphQL
- ✅ Chamadas diretas à API da Riot
- ✅ Cache do Apollo Client
- ✅ TypeScript type-safety
- ✅ Mesma API de hooks do Apollo

### Endpoint configurado:

- Base URL: `https://americas.api.riotgames.com`
- Endpoint: `/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}`
