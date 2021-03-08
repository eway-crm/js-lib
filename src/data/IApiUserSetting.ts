import { IApiItemBase } from "./IApiItemBase";

export interface IApiUserSetting extends IApiItemBase {
    Name: string;
    Value: string | null;
    Path: string;
}