import type { TFolderName } from "../constants/FolderNames";
import type { IApiItemBase } from "./IApiItemBase";

export interface IApiObjectType extends IApiItemBase {
    FolderName: TFolderName;
    IsCustomizable: boolean;
    IsModule: boolean;
    IsActive: boolean;
    IsLinkable: boolean;
    ContainsAnyPermittableColumn: boolean;
}