import VersionHelper from './VersionHelper';
import { type TFolderName } from "../constants/FolderNames";
import type { ApiConnection } from '../ApiConnection';
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
    TApiQueryFilterExpression
} from '../data/query/IApiQueryFilters';
import type {
    IApiQueryColumn,
    IApiQueryColumnVariation,
    IApiQueryToken,
    IApiQueryVariatedColumn,
    TApiQueryField,
    IApiQuerySubstituableColumn
} from "../data/query/IApiQuery";
import type { TRelationType } from '../constants/RelationTypes';

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

    static column = (colName: string) => {
        const col: IApiQueryColumn = {
            __type: 'Column:#EQ',
            Source: {
                __type: 'MainTable:#EQ',
            },
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
            Source: {
                __type: 'MainTable:#EQ',
            },
            Name: 'ItemGUID',
            Transformation: `[dbo].[GetConcatenatedEnumValuesRelationsValues]({0}, '${colName}', '${pickColName}'`,
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
            Source: {
                __type: 'MainTable:#EQ',
            },
            Name: 'ItemGUID',
            Transformation: `[dbo].[GetConcatenatedEnumValuesRelationsValues_WithObjectTypeID]({0}, dbo.GetObjectTypeID('${folderName}'), '${colName}', '${pickColName}')`,
            Alias: alias ?? colName,
        };

        return multiSelectComboColumn;
    };

    static joinColumn = (itemType: TFolderName, sourceColName: string, pickColName: string, alias?: string, targetColName?: string) => {
        const joinedColumn: IApiQueryColumn = {
            __type: 'Column:#EQ',
            Source: {
                __type: 'Join:#EQ',
                ItemType: itemType,
                Key: {
                    __type: 'Column:#EQ',
                    Source: {
                        __type: 'MainTable:#EQ',
                    },
                    Name: sourceColName
                },
                TargetColumnName: targetColName
            },
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
            Source: {
                __type: 'MainTable:#EQ',
            },
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
                Source: {
                    __type: 'MainTable:#EQ',
                },
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
                Source: {
                    __type: 'Join:#EQ',
                    ItemType: joinTableName,
                    Key: {
                        __type: 'Column:#EQ',
                        Source: {
                            __type: 'MainTable:#EQ',
                        },
                        Name: joinColumnName,
                    },
                },
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
                Source: {
                    __type: 'Relation:#EQ',
                    RelationType: relationType,
                    Direction: 1,
                    ItemTypes: itemTypes,
                },
                Name: pickColumnName,
            },
        };

        return relationColumnVariation;
    };

    static relatedColumn = (relationType: string, itemTypes: TFolderName[], name: string, alias?: string) => {
        const relatedColumn: IApiQueryColumn = {
            __type: 'Column:#EQ',
            Source: {
                __type: 'Relation:#EQ',
                RelationType: relationType,
                Direction: 1,
                ItemTypes: itemTypes,
            },
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
            Source: {
                __type: 'Relation:#EQ',
                RelationType: relationType,
                Direction: 1,
                ItemTypes: itemTypes,
            },
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
            Source: {
                __type: 'Relation:#EQ',
                RelationType: relationType,
                Direction: 1,
                ItemTypes: itemTypes,
            },
            TypeName: 'ItemType',
            Alias: alias,
        };

        return relatedColumnFolderNameToken;
    };

    static folderNameToken = (alias?: string) => {
        const folderNameToken: IApiQueryToken = {
            __type: 'Token:#EQ',
            Source: {
                __type: 'MainTable:#EQ',
            },
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

    static isNullOrEmptyFilterExpression = (field: string) => {
        return QueryHelper.orFilterExpression([QueryHelper.equalsFilterExpression(QueryHelper.column(field), null), QueryHelper.equalsFilterExpression(QueryHelper.column(field), '')]);
    };
}