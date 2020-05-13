import * as Promise from 'es6-promise';
import { ApiConnection } from './ApiConnection';
import { HttpMethod } from './HttpMethod';
import { IApiResult } from './IApiResult';
import { ISessionHandler } from './ISessionHandler';
import { ReturnCodes } from './ReturnCodes';

Promise.polyfill();

export default ApiConnection;

export { HttpMethod, IApiResult, ISessionHandler, ReturnCodes };
