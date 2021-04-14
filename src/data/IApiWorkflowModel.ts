import { IApiItemBase } from "./IApiItemBase";

export interface IApiWorkflowModel extends IApiItemBase {
    EnumTypeGuid: string;
    IsSystem: boolean;
    IsVisible: boolean;
    ParentEn: string;
}