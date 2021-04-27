import { IApiItemBase } from "./IApiItemBase";

export interface IApiWorkflowModel extends IApiItemBase {
    EnumTypeGuid: string;
    IsVisible: boolean;
    ParentEn: string;
}