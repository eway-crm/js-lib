import type { TFieldType } from '../constants/FieldTypes';
import type { TFolderName } from '../constants/FolderNames';
import type { TNumericValidatorType } from '../interfaces/TNumericValidatorType';
import type { TApiColumnPermissionMandatoryRuleOptions, TApiColumnPermissionPermissionRuleOptions } from './IApiColumnPermission';

type TAdditionalFieldItem = {
    CategoryEn: string | null;
    Comment: string;
    FieldId: number;
    ItemGUID: string;
};

type EnumTypeItem = {
    EnumName: string;
    ItemGUID: string;
};

type TForeignKeyRelationInfo = {
    RelatedFolders: TFolderName[];
    RelationType: string;
};

type TNumericInfo = {
    FormatType: TNumericValidatorType;
    CurrencyEnColumnName?: string;
};

export interface IApiColumn {
    AdditionalFieldItem?: TAdditionalFieldItem;
    AllowedColumnMandatoryTypes: TApiColumnPermissionMandatoryRuleOptions[] | null;
    AllowedColumnPermissionTypes: TApiColumnPermissionPermissionRuleOptions[] | null;
    AltNameCs?: string;
    AltNameDe?: string;
    AltNameEn?: string;
    AltNameNo?: string;
    AltNameRu?: string;
    AltNameSk?: string;
    ColumnName: string;
    EnumTypeItem?: EnumTypeItem;
    FolderName: string;
    ForeignKeyRelationInfo?: TForeignKeyRelationInfo;
    IsAdditionalField: boolean;
    IsPermissionEnabled: boolean;
    IsUniqueConstraintSupported: boolean;
    LinkType?: 'Phone' | 'URL' | 'Email' | 'File' | 'Custom';
    NameCs: string;
    NameDe: string;
    NameEn: string;
    NameNo: string;
    NameRu: string;
    NameSk: string;
    NumericInfo?: TNumericInfo;
    DateTimeType?: 'Date' | 'DateTime' | 'DateTimeSeconds';
    OriginalCurrencyColumn?: string;
    Type: TFieldType;
}
