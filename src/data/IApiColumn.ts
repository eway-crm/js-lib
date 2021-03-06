type TAdditionalFieldItem = {
    Comment: string;
    FieldId: number;
    ItemGUID: string;
};

type EnumTypeItem = {
    EnumName: string;
    ItemGUID: string;
};

export interface IApiColumn {
    AdditionalFieldItem: TAdditionalFieldItem | null;
    AllowedColumnMandatoryTypes: string[] | null;
    AllowedColumnPermissionTypes: string[] | null;
    AltNameCs: string | null;
    AltNameDe: string | null;
    AltNameEn: string | null;
    AltNameNo: string | null;
    AltNameRu: string | null;
    AltNameSk: string | null;
    ColumnName: string;
    EnumTypeItem: EnumTypeItem | null;
    FolderName: string;
    IsAdditionalField: boolean;
    IsPermissionEnabled: boolean;
    IsUniqueConstraintSupported: boolean;
    LinkType: 'Phone' | 'URL' | 'Email' | 'Custom';
    NameCs: string;
    NameDe: string;
    NameEn: string;
    NameNo: string;
    NameRu: string;
    NameSk: string;
    OriginalCurrencyColumn: string | null;
    Type: string;
}