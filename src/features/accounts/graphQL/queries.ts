import { gql } from '@apollo/client'
import { apolloClient } from '../../../config/apolloClient'
import type { GetAccountByRiotIdResponse, GetAccountByRiotIdVariables, RiotAccount } from '../types/account.types'

export const GET_ACCOUNT_BY_RIOT_ID = gql`
    query GetAccountByRiotId($gameName: String!, $tagLine: String!) {
        getAccountByRiotId(gameName: $gameName, tagLine: $tagLine)
            @rest(type: "RiotAccount", path: "/riot/account/v1/accounts/by-riot-id/:gameName/:tagLine") {
            puuid
            gameName
            tagLine
        }
    }
`

export const QueryAccountByRiotId = async (gameName: string, tagLine: string): Promise<RiotAccount> => {
    return apolloClient
        .query<GetAccountByRiotIdResponse, GetAccountByRiotIdVariables>({
            query: GET_ACCOUNT_BY_RIOT_ID,
            variables: { gameName, tagLine },
            fetchPolicy: 'network-only',
        })
        .then(response => {
            if (!response.data?.getAccountByRiotId) {
                throw new Error('Account not found')
            }
            return response.data.getAccountByRiotId
        })
        .catch(exception => {
            console.error('[QueryAccountByRiotId] Error:', exception)
            throw exception
        })
}
