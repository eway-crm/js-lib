import { IApiItemBase } from "./IApiItemBase";
import { IApiEnumValue } from "./IApiEnumValue";

export interface IApiEnumType extends IApiItemBase {
    EnumName: string;
    IsSystem: boolean;
    AllowEditVisibility: boolean;
    AllowEditLastActivity: boolean;
    RequireDefaultValue: boolean;
    AssociatedFolderNames: string[] | null;
    AssociatedWorkflowModelGuid: string | null;
    NameEn: string;
    NameCs: string;
    NameDe: string;
    NameRu: string;
    NameSk: string;
    NameNo: string;
    IsAdditionalField: boolean;
    AssociatedAdditionalFieldId: number | null;
    EnumValuesInEnumType: IApiEnumValue[] | null;
}