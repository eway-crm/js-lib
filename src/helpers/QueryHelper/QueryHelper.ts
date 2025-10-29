import VersionHelper from '../VersionHelper';
import { type TFolderName } from "../../constants/FolderNames";
import type { ApiConnection } from '../../ApiConnection';
import type {
    IApiQueryAndFilterExpressionOperator,
    IApiQueryEqualsFilterExpressionPredicate,
    IApiQueryGreaterFilterExpressionPredicate,
    IApiQueryGreaterOrEqualFilterExpressionPredicate,
    IApiQueryLessFilterExpressionPredicate,
    IApiQueryLessOrEqualFilterExpressionPredicate,
    IApiQueryLikeFilterExpressionPredicate,
    IApiQueryInFilterExpressionPredicate,
    IApiQueryNotFilterExpression,
    IApiQueryOrFilterExpressionOperator,
    TApiQueryFilterExpression,
    IApiQueryRelatedToFilterExpressionPredicate
} from '../../data/query/IApiQueryFilters';
import type {
    IApiQueryColumn,
    IApiQueryColumnVariation,
    IApiQueryToken,
    IApiQueryVariatedColumn,
    TApiQueryField,
    IApiQuerySubstituableColumn,
    TApiQueryAggregateFunction,
    IApiQueryAggregateColumn
} from "../../data/query/IApiQuery";
import type { TRelationType } from '../../constants/RelationTypes';
import QuerySources, { type TApiQueryHubRelationSourceOptions } from './QuerySources';

type TFilterValue = string | number | boolean | null;

export default class QueryHelper {
    static createHubItemsCountsQuery(parentItemGuids: string[], itemTypes: TFolderName[], excludeSystemItems?: boolean) {
        return {
            "__type": "HubItemsCountsQuery:#EQ",
            "ParentItemGuids": parentItemGuids,
            "ItemTypes": itemTypes,
            "ExcludeSystemItems": excludeSystemItems
        };
    }

    static createRelatedTableQuery(baseItemGuid: string, itemTypes: TFolderName | TFolderName[], relationType?: TRelationType) {
        return {
            "__type": !!relationType ? "RelatedTableQuery:#EQ" : "TypelessRelatedTableQuery:#EQ",
            "BaseItemID": baseItemGuid,
            "ItemTypes": Array.isArray(itemTypes) ? itemTypes : [itemTypes],
            "RelationType": relationType
        };
    }

    static createMainTableQuery(itemTypes: TFolderName | TFolderName[]) {
        return {
            "__type": "MainTableQuery:#EQ",
            "ItemTypes": Array.isArray(itemTypes) ? itemTypes : [itemTypes]
        };
    }

    static column = (colName: string): IApiQueryColumn => {
        const col: IApiQueryColumn = {
            __type: 'Column:#EQ',
            Source: QuerySources.mainTable(),
            Name: colName,
        };

        return col;
    };

    /**
     * For versions < 7.7
     */
    private static readonly multiSelectComboColumnLegacy = (colName: string, pickColName: string, alias?: string) => {
        const legacyMultiSelectComboColumn: IApiQueryColumn = {
            __type: 'Column:#EQ',
            Source: QuerySources.mainTable(),
            Name: 'ItemGUID',
            Transformation: `[dbo].[GetConcatenatedEnumValuesRelationsValues]({0}, '${colName}', '${pickColName}')`,
            Alias: alias ?? colName,
        };

        return legacyMultiSelectComboColumn;
    };

    static multiSelectComboColumn = (connection: ApiConnection, folderName: TFolderName, colName: string, pickColName: string, alias?: string) => {
        if (!VersionHelper.is77OrLater(connection)) {
            return QueryHelper.multiSelectComboColumnLegacy(colName, pickColName, alias);
        }

        const multiSelectComboColumn: IApiQueryColumn = {
            __type: 'Column:#EQ',
            Source: QuerySources.mainTable(),
            Name: 'ItemGUID',
            Transformation: `[dbo].[GetConcatenatedEnumValuesRelationsValues_WithObjectTypeID]({0}, dbo.GetObjectTypeID('${folderName}'), '${colName}', '${pickColName}')`,
            Alias: alias ?? colName,
        };

        return multiSelectComboColumn;
    };

    static joinColumn = (itemType: TFolderName, sourceColName: string, pickColName: string, alias?: string, targetColName?: string): IApiQueryColumn => {
        return QueryHelper.joinColumnFromKey(itemType, QueryHelper.column(sourceColName), pickColName, alias, targetColName);
    };

    static joinColumnFromKey = (itemType: TFolderName, sourceKey: IApiQueryColumn, pickColName: string, alias?: string, targetColName?: string): IApiQueryColumn => {
        const joinedColumn: IApiQueryColumn = {
            __type: 'Column:#EQ',
            Source: QuerySources.join(itemType, sourceKey, targetColName),
            Name: pickColName,
        };

        if (alias) {
            joinedColumn.Alias = alias;
        }

        return joinedColumn;
    };

    static singleVariatedColumn = (colName: string, folderName: TFolderName, alias?: string) => {
        return QueryHelper.variatedColumn([QueryHelper.columnVariation(colName, folderName)], alias);
    };

    static variatedColumn = (variations: IApiQueryColumnVariation[], alias?: string) => {
        const columnForQuery: IApiQueryVariatedColumn = {
            __type: 'VariatedColumn:#EQ',
            Source: QuerySources.mainTable(),
            Variations: variations,
        };

        if (alias) {
            columnForQuery.Alias = alias;
        }

        return columnForQuery;
    };

    static columnVariation = (colName: string, folderName: TFolderName, transformation?: string) => {
        const columnVariation: IApiQueryColumnVariation = {
            FolderName: folderName,
            Field: {
                __type: 'Column:#EQ',
                Source: QuerySources.mainTable(),
                Name: colName,
            },
        };

        if (transformation) {
            columnVariation.Field.Transformation = transformation;
        }

        return columnVariation;
    };

    static joinColumnVariation = (folderName: TFolderName, joinTableName: TFolderName, joinColumnName: string, pickColumnName: string) => {
        const joinColumnVariation: IApiQueryColumnVariation = {
            FolderName: folderName,
            Field: {
                __type: 'Column:#EQ',
                Source: QuerySources.join(joinTableName, QueryHelper.column(joinColumnName)),
                Name: pickColumnName,
            },
        };

        return joinColumnVariation;
    };

    static relationColumnVariation = (folderName: TFolderName, relationType: string, itemTypes: TFolderName[], pickColumnName: string) => {
        const relationColumnVariation: IApiQueryColumnVariation = {
            FolderName: folderName,
            Field: {
                __type: 'Column:#EQ',
                Source: QuerySources.relation(itemTypes, relationType, 1),
                Name: pickColumnName,
            },
        };

        return relationColumnVariation;
    };

    static relatedColumn = (relationType: string, itemTypes: TFolderName[], name: string, alias?: string) => {
        const relatedColumn: IApiQueryColumn = {
            __type: 'Column:#EQ',
            Source: QuerySources.relation(itemTypes, relationType, 1),
            Name: name,
        };

        if (alias) {
            relatedColumn.Alias = alias;
        }

        return relatedColumn;
    };

    static relatedSubstituableColumn = (relationType: string, itemTypes: TFolderName[], name: string, substitute: TApiQueryField, alias?: string) => {
        const relatedSubstituableColumn: IApiQuerySubstituableColumn = {
            __type: 'SubstituableColumn:#EQ',
            Source: QuerySources.relation(itemTypes, relationType, 1),
            Name: name,
            Substitute: substitute
        };

        if (alias) {
            relatedSubstituableColumn.Alias = alias;
        }

        return relatedSubstituableColumn;
    };

    static relatedColumnFolderNameToken = (relationType: string, itemTypes: TFolderName[], alias: string) => {
        const relatedColumnFolderNameToken: IApiQueryToken = {
            __type: 'Token:#EQ',
            Source: QuerySources.relation(itemTypes, relationType, 1),
            TypeName: 'ItemType',
            Alias: alias,
        };

        return relatedColumnFolderNameToken;
    };

    static readonly hubRelationColumn = (columnName: string, hubRelationOptions: TApiQueryHubRelationSourceOptions): IApiQueryColumn => {
        return {
            __type: 'Column:#EQ',
            Source: QuerySources.hubRelation(hubRelationOptions),
            Name: columnName
        };
    };

    static readonly aggregateColumn = (aggFunction: TApiQueryAggregateFunction, field: TApiQueryField, alias?: string): IApiQueryAggregateColumn => {
        return {
            "__type": "AggregateColumn:#EQ",
            FunctionName: aggFunction,
            Source: field.Source,
            AggregatedField: field,
            Alias: alias
        };
    };

    static folderNameToken = (alias?: string) => {
        const folderNameToken: IApiQueryToken = {
            __type: 'Token:#EQ',
            Source: QuerySources.mainTable(),
            TypeName: 'ItemType',
            Alias: alias ?? 'FolderName',
        };

        return folderNameToken;
    };

    static equalsFilterExpression = (field: TApiQueryField, value: TFilterValue) => {
        const equalsFilterExpression: IApiQueryEqualsFilterExpressionPredicate = {
            __type: 'EqualsFilterExpressionPredicate:#EQ',
            Field: field,
            Value: value,
        };

        return equalsFilterExpression;
    };

    static notEqualsExpression = (field: TApiQueryField, value: TFilterValue) => {
        const notEqualsExpression: IApiQueryNotFilterExpression = {
            __type: 'NotFilterExpression:#EQ',
            Child: QueryHelper.equalsFilterExpression(field, value),
        };

        return notEqualsExpression;
    };

    static andFilterExpression = (children: TApiQueryFilterExpression[]) => {
        const andFilterExpression: IApiQueryAndFilterExpressionOperator = {
            __type: 'AndFilterExpressionOperator:#EQ',
            Children: children,
        };

        return andFilterExpression;
    };

    static orFilterExpression = (children: TApiQueryFilterExpression[]) => {
        const orFilterExpression: IApiQueryOrFilterExpressionOperator = {
            __type: 'OrFilterExpressionOperator:#EQ',
            Children: children,
        };
        return orFilterExpression;
    };

    static lessFilterExpression = (field: TApiQueryField, value: TFilterValue) => {
        const lessFilterExpression: IApiQueryLessFilterExpressionPredicate = {
            __type: 'LessFilterExpressionPredicate:#EQ',
            Field: field,
            Value: value,
        };

        return lessFilterExpression;
    };

    static lessOrEqualFilterExpression = (field: TApiQueryField, value: TFilterValue) => {
        const lessOrEqualFilterExpression: IApiQueryLessOrEqualFilterExpressionPredicate = {
            __type: 'LessOrEqualFilterExpressionPredicate:#EQ',
            Field: field,
            Value: value,
        };

        return lessOrEqualFilterExpression;
    };

    static greaterFilterExpression = (field: TApiQueryField, value: TFilterValue) => {
        const greaterFilterExpression: IApiQueryGreaterFilterExpressionPredicate = {
            __type: 'GreaterFilterExpressionPredicate:#EQ',
            Field: field,
            Value: value,
        };

        return greaterFilterExpression;
    };

    static greaterOrEqualFilterExpression = (field: TApiQueryField, value: TFilterValue) => {
        const greaterFilterExpression: IApiQueryGreaterOrEqualFilterExpressionPredicate = {
            __type: 'GreaterOrEqualFilterExpressionPredicate:#EQ',
            Field: field,
            Value: value,
        };

        return greaterFilterExpression;
    };

    static likeFilterExpression = (field: TApiQueryField, value: TFilterValue) => {
        const likeFilterExpression: IApiQueryLikeFilterExpressionPredicate = {
            __type: 'LikeFilterExpressionPredicate:#EQ',
            Field: field,
            Value: `%${value}%`,
        };

        return likeFilterExpression;
    };

    static inFilterExpression = (field: TApiQueryField, values: TFilterValue[]) => {
        const inFilterExpression: IApiQueryInFilterExpressionPredicate = {
            __type: 'InFilterExpressionPredicate:#EQ',
            Field: field,
            Value: values
        };

        return inFilterExpression;
    };

    static relatedToExpression = (baseItemGuid: string, relationType?: string | null) => {
        const relatedToExpression: IApiQueryRelatedToFilterExpressionPredicate = {
            __type: 'RelatedToFilterExpressionPredicate:#EQ',
            Value: baseItemGuid,
            RelationType: relationType
        };
        return relatedToExpression;
    };

    static isNullOrEmptyFilterExpression = (field: string) => {
        return QueryHelper.orFilterExpression([QueryHelper.equalsFilterExpression(QueryHelper.column(field), null), QueryHelper.equalsFilterExpression(QueryHelper.column(field), '')]);
    };
}