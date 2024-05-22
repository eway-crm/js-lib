import type { JwtPayload } from 'jwt-decode';

export interface IEWJwtPayload extends JwtPayload {
    username?: string;
    ws?: string;
}