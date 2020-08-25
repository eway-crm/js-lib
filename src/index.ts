import * as Promise from 'es6-promise';
import { ApiConnection } from './ApiConnection';
import { HttpMethod } from './HttpMethod';
import { IApiResult } from './IApiResult';
import { ISessionHandler } from './ISessionHandler';
import { ReturnCodes } from './ReturnCodes';
import { ITokenizedApiResult } from './tokenizedServices/ITokenizedApiResult';
import { TokenizedServiceConnection } from './tokenizedServices/TokenizedServiceConnection';
import { CommonDataConnection } from './tokenizedServices/CommonDataConnection';
import { ApiMethods } from './ApiMethods';

Promise.polyfill();

export default ApiConnection;

export { HttpMethod, IApiResult, ISessionHandler, ReturnCodes, ITokenizedApiResult, TokenizedServiceConnection, CommonDataConnection, ApiMethods };
