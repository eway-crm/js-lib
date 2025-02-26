import type { TFolderName } from '../../constants/FolderNames';

interface IApiQueryMainTableSource {
    __type: 'MainTable:#EQ';
}

interface IApiQueryJoinTableSource {
    __type: 'Join:#EQ';
    ItemType: TFolderName;
    Key: IApiQueryColumn;
    TargetColumnName?: string;
}

interface IApiQueryRelationSource {
    __type: 'Relation:#EQ';
    Direction: 1 | 2;
    ItemTypes: TFolderName[];
    RelationType: string;
}

interface IApiQueryField {
    Source: IApiQueryMainTableSource | IApiQueryJoinTableSource | IApiQueryRelationSource;
    Alias?: string;
}

export type TApiQueryField = IApiQueryColumn | IApiQuerySubstituableColumn |IApiQueryVariatedColumn | IApiQueryToken;

export interface IApiQueryColumn extends IApiQueryField {
    __type: 'Column:#EQ';
    Name: string;
    Transformation?: string;
}

export interface IApiQuerySubstituableColumn extends Omit<IApiQueryColumn, '__type'> {
    __type: 'SubstituableColumn:#EQ';
    Substitute: TApiQueryField;
}

export interface IApiQueryColumnVariation {
    FolderName: TFolderName;
    Field: IApiQueryColumn;
}

export interface IApiQueryVariatedColumn extends IApiQueryField {
    __type: 'VariatedColumn:#EQ';
    Variations: IApiQueryColumnVariation[];
}

export interface IApiQueryToken extends IApiQueryField {
    __type: 'Token:#EQ';
    TypeName: 'ItemType';
}
