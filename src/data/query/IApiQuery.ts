import { TFolderName } from '../../constants/FolderNames';

interface IApiQueryMainTableSource {
    __type: 'MainTable:#EQ';
}

interface IApiQueryJoinTableSource {
    __type: 'Join:#EQ';
    ItemType: TFolderName;
    Key: IApiQueryColumn;
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

export type TApiQueryField = IApiQueryColumn | IApiQueryVariatedColumn | IApiQueryToken;

export interface IApiQueryColumn extends IApiQueryField {
    __type: 'Column:#EQ';
    Name: string;
    Transformation?: string;
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
