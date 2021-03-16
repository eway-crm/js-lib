import { IApiItemBase } from "./IApiItemBase";
import { IApiEnumValue } from "./IApiEnumValue";

export enum EnumTypeAdminEditMode {
    Readonly,
    VisibleRankDefaultOnly,
    Editable,
}

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
    EnumTypeAdminEditMode: EnumTypeAdminEditMode | null;
    EnumValuesInEnumType: IApiEnumValue[] | null;
}