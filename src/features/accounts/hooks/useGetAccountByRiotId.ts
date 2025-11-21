import { useLazyQuery } from '@apollo/client/react';
import { GET_ACCOUNT_BY_RIOT_ID } from '../graphQL/queries';
import type { GetAccountByRiotIdResponse, GetAccountByRiotIdVariables } from '../types/account.types';

export const useGetAccountByRiotId = () => {
  const [getAccount, { data, loading, error }] = useLazyQuery<
    GetAccountByRiotIdResponse,
    GetAccountByRiotIdVariables
  >(GET_ACCOUNT_BY_RIOT_ID);

  const fetchAccountByRiotId = async (gameName: string, tagLine: string) => {
    return await getAccount({
      variables: {
        gameName,
        tagLine,
      },
    });
  };

  return {
    fetchAccountByRiotId,
    account: data?.getAccountByRiotId,
    loading,
    error,
  };
};
