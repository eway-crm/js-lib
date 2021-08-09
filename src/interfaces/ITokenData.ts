export interface ITokenData {
    access_token: string;
    expires_in: number;
    id_token?: string;
    token_type: string;
    refresh_token: string;
    error: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type TInputData = Record<string, Object | null>;