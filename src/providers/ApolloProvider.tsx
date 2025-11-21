import { ApolloProvider as ApolloProviderBase } from '@apollo/client/react'
import { apolloClient } from '../config/apolloClient'

interface ApolloProviderProps {
    children: React.ReactNode
}

export const ApolloProvider = ({ children }: ApolloProviderProps) => {
    return <ApolloProviderBase client={apolloClient}>{children}</ApolloProviderBase>
}
