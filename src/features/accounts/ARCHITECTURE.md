# Arquitetura - REST Link vs GraphQL Server

Este documento explica as diferenças entre usar REST Link (implementação atual) e um servidor GraphQL tradicional.

## Implementação atual: REST Link

### Fluxo de dados

```
┌──────────────┐
│   Browser    │
│  (React App) │
└──────┬───────┘
       │
       │ Apollo Client + REST Link
       ▼
┌──────────────────────┐
│   Riot Games API     │
│  (REST Endpoints)    │
└──────────────────────┘
```

### Vantagens
- ✅ **Simplicidade**: Não precisa de backend
- ✅ **Menos infraestrutura**: Apenas frontend
- ✅ **Desenvolvimento rápido**: Setup mínimo
- ✅ **Custo zero**: Sem servidor adicional

### Desvantagens
- ❌ **CORS**: API da Riot pode bloquear requisições do browser
- ❌ **Segurança**: API key exposta no frontend (mesmo em variável de ambiente)
- ❌ **Rate limiting**: Difícil de controlar no cliente
- ❌ **Funcionalidades limitadas**: Não pode fazer transformações complexas

### Quando usar
- ✅ Protótipos e desenvolvimento local
- ✅ Testes e experimentação
- ✅ Aplicações pequenas sem requisitos de segurança

---

## Alternativa: GraphQL Server

### Fluxo de dados

```
┌──────────────┐
│   Browser    │
│  (React App) │
└──────┬───────┘
       │
       │ Apollo Client
       ▼
┌────────────────────┐
│  GraphQL Server    │
│  (Backend/BFF)     │
└──────┬─────────────┘
       │
       │ Axios/Fetch
       ▼
┌──────────────────────┐
│   Riot Games API     │
│  (REST Endpoints)    │
└──────────────────────┘
```

### Vantagens
- ✅ **Segurança**: API key fica no servidor
- ✅ **CORS**: Sem problemas, servidor faz as chamadas
- ✅ **Rate limiting**: Controle centralizado
- ✅ **Cache**: Pode implementar cache Redis/similar
- ✅ **Transformações**: Pode agregar dados de múltiplas APIs
- ✅ **Validação**: Valida dados antes de enviar ao cliente

### Desvantagens
- ❌ **Complexidade**: Precisa configurar servidor
- ❌ **Infraestrutura**: Precisa hospedar backend
- ❌ **Custo**: Servidor adicional
- ❌ **Manutenção**: Mais código para manter

### Quando usar
- ✅ Aplicações em produção
- ✅ Quando precisa de segurança
- ✅ Quando precisa agregar dados
- ✅ Quando precisa de rate limiting

---

## Exemplo de implementação com servidor GraphQL

Se você decidir migrar para um servidor GraphQL, aqui está um exemplo básico:

### Backend (Node.js + Apollo Server)

```typescript
// server.ts
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';

const typeDefs = `#graphql
  type RiotAccount {
    puuid: String!
    gameName: String!
    tagLine: String!
  }

  type Query {
    getAccountByRiotId(gameName: String!, tagLine: String!): RiotAccount
  }
`;

const resolvers = {
  Query: {
    getAccountByRiotId: async (_parent, { gameName, tagLine }) => {
      const response = await axios.get(
        `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
        {
          headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY,
          },
        }
      );
      return response.data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
```

### Frontend (React + Apollo Client)

```typescript
// apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

```typescript
// queries.ts
import { gql } from '@apollo/client';

export const GET_ACCOUNT_BY_RIOT_ID = gql`
  query GetAccountByRiotId($gameName: String!, $tagLine: String!) {
    getAccountByRiotId(gameName: $gameName, tagLine: $tagLine) {
      puuid
      gameName
      tagLine
    }
  }
`;
```

O hook `useGetAccountByRiotId` permanece **exatamente o mesmo**!

---

## Migração de REST Link para GraphQL Server

Se você decidir migrar:

### Passos

1. **Criar servidor GraphQL** (exemplo acima)
2. **Atualizar apolloClient.ts**:
   ```typescript
   // Trocar RestLink por HttpLink
   const httpLink = createHttpLink({
     uri: 'http://localhost:4000/graphql',
   });
   ```
3. **Atualizar queries.ts**:
   ```typescript
   // Remover diretiva @rest
   export const GET_ACCOUNT_BY_RIOT_ID = gql`
     query GetAccountByRiotId($gameName: String!, $tagLine: String!) {
       getAccountByRiotId(gameName: $gameName, tagLine: $tagLine) {
         puuid
         gameName
         tagLine
       }
     }
   `;
   ```
4. **Hooks permanecem iguais** - Zero mudanças!

### O que NÃO muda
- ✅ Hooks customizados
- ✅ Types TypeScript
- ✅ Componentes React
- ✅ Lógica de UI

### O que muda
- ⚠️ Configuração do Apollo Client
- ⚠️ Queries GraphQL (remover `@rest`)
- ⚠️ Variáveis de ambiente (adicionar URL do servidor)

---

## Recomendação

### Para desenvolvimento local
👉 **Use REST Link** (implementação atual)
- Rápido de configurar
- Fácil de testar
- Sem complexidade extra

### Para produção
👉 **Use GraphQL Server**
- Mais seguro
- Melhor controle
- Escalável

### Solução híbrida
Você pode usar **REST Link localmente** e ter um **servidor GraphQL em produção**, mudando apenas a configuração do Apollo Client baseado no ambiente:

```typescript
const link = process.env.NODE_ENV === 'production'
  ? createHttpLink({ uri: 'https://api.myapp.com/graphql' })
  : restLink;

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
```

---

## Conclusão

A implementação atual com **REST Link** é perfeita para:
- Desenvolvimento
- Protótipos
- Aprendizado
- Testes

Quando você for para produção, considere migrar para um **servidor GraphQL** para ter mais segurança e controle.

A beleza desta arquitetura é que **a migração é simples** e seus componentes React não precisam mudar! 🎉
