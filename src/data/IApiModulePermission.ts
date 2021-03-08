import { IApiItemBase } from "./IApiItemBase";

export type TApiModulePermissionOptions = 'All' | 'Inherited' | 'Group' | 'Related' | 'Own' | 'None';

export interface IApiModulePermission extends IApiItemBase {
    CanCreate: boolean;
    CanExport: boolean;
    CanSeeHistory: boolean;
    View: TApiModulePermissionOptions;
    Edit: TApiModulePermissionOptions;
    Delete: TApiModulePermissionOptions;
    RowsRestriction: number;
    FolderName: string;
    GroupGuid: string;
    IsSystem: boolean;
}