import type { IApiItemBase } from "./IApiItemBase";
import type { IApiEnumValue } from "./IApiEnumValue";

export enum EnumTypeEditMode {
    Readonly = 'Readonly',
    VisibleRankDefaultOnly = 'VisibleRankDefaultOnly',
    Editable = 'Editable',
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
    EditMode: EnumTypeEditMode | null;
    EnumValuesInEnumType: IApiEnumValue[] | null;
}