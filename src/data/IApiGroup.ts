import type { IApiItemBase } from "./IApiItemBase";

export interface IApiGroup extends IApiItemBase {
    GroupName: string;
    Description: string | null;
    ResponsibilityDescription: string | null;
    System: boolean;
    IsAdmin: boolean;
    IsPM: boolean;
    IsRole: boolean;
    IsCategory: boolean;
    IsOutlookCategory: boolean;
    DisallowControlUserAssignment: boolean;
    DisallowControlModulePermissions: boolean;
    DisallowControlColumnPermissions: boolean;
    ContainsAnyUneditablePermission: boolean;
    ColorEn: string | null;
}