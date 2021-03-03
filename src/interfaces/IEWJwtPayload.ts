import { JwtPayload } from 'jwt-decode';

export interface IEWJwtPayload extends JwtPayload {
    username?: string;
}