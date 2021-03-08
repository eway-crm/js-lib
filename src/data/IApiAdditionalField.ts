import { IApiItemBase } from "./IApiItemBase";

export interface IApiAdditionalField extends IApiItemBase {
    ObjectTypeFolderName: string;
    FieldId: number;
    ColumnName: string;
    Name: string;
    Comment: string | null;
    Type: number;
    CategoryEn: string | null;
    Rank: number;
    Data_RelatedFolderName: string | null;
    Data_IsDateTime: boolean | null;
    Data_FormatType: string | null;
    Data_EditMask: string | null;
    Data_MemoBoxLines: number | null;
    Data_SummaryType: string | null;
    Data_LinkType: string | null;
    AssociatedEnumTypeGuid: string | null;
    IsInGeneralSection: boolean;
}