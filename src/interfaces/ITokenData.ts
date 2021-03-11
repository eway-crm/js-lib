export interface ITokenData {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type TInputData = Record<string, Object | null>;