import { IApiItemBase } from "./IApiItemBase";

export interface IApiObjectType extends IApiItemBase {
    FolderName: string;
    IsCustomizable: boolean;
    IsModule: boolean;
    IsActive: boolean;
    IsLinkable: boolean;
    ContainsAnyPermittableColumn: boolean;
}