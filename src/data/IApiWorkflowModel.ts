import { IApiItemBase } from "./IApiItemBase";

export interface IApiWorkflowModel extends IApiItemBase {
    EnumTypeGuid: string;
    IsSystem: boolean;
    ParentEn: string | null;
    IsUsingFlows: boolean;
    AllowEditItems: boolean;
}