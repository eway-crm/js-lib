import type { TFolderName } from '../../constants/FolderNames';

export interface IApiQueryMainTableSource {
    __type: 'MainTable:#EQ';
}

export interface IApiQueryJoinTableSource {
    __type: 'Join:#EQ';
    ItemType: TFolderName;
    Key: IApiQueryColumn;
    TargetColumnName?: string;
}

export interface IApiQueryRelationSource {
    __type: 'Relation:#EQ';
    Direction: 0 | 1 | 2;
    ItemTypes: TFolderName[];
    RelationType: string;
}

export interface IApiQueryHubRelationSource {
    __type: 'HubRelation:#EQ';
    IsToParentDirection?: boolean;
    ChildrenFolderNames?: TFolderName[];
}

type IApiQuerySource = IApiQueryMainTableSource | IApiQueryJoinTableSource | IApiQueryRelationSource | IApiQueryHubRelationSource;

interface IApiQueryField {
    Source: IApiQuerySource;
    Alias?: string;
}

export type TApiQueryField = IApiQueryColumn | IApiQuerySubstituableColumn | IApiQueryVariatedColumn | IApiQueryToken;

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

export type TApiQueryAggregateFunction = 'Count' | 'Avg' | 'Min' | 'Max' | 'Sum';

export interface IApiQueryAggregateColumn extends IApiQueryField {
    "__type": "AggregateColumn:#EQ";
    FunctionName: TApiQueryAggregateFunction;
    Function?: 0 | 1 | 2 | 3 | 4; // 0 - Count, 1 - Avg, 2 - Min, 3 - Max, 4 - Sum
    AggregatedField: TApiQueryField;
}
