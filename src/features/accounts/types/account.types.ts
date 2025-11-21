export interface RiotAccount {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface GetAccountByRiotIdVariables {
  gameName: string;
  tagLine: string;
}

export interface GetAccountByRiotIdResponse {
  getAccountByRiotId: RiotAccount;
}
