import { IApiItemBase } from "./IApiItemBase";

export type TApiColumnPermissionPermissionRuleOptions = 'All' | 'Own' | 'Readonly' | 'Invisible' | 'None';
export type TApiColumnPermissionMandatoryRuleOptions = 'Mandatory' | 'Optional' | 'Unique' | 'None';

export interface IApiColumnPermission extends IApiItemBase {
    ColumnName: string;
    GroupGuid: string;
    FolderName: string;
    IsAdditionalField: boolean;
    IsMandatoryRuleEditable: boolean;
    IsPermissionRuleEditable: boolean;
    MandatoryRule: TApiColumnPermissionMandatoryRuleOptions | string;
    PermissionRule: TApiColumnPermissionPermissionRuleOptions | string;
    NotFullyPermittedForGroupGuids: string[] | null;
    IsSetToUnique: boolean;
}