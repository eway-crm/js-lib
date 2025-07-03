import type { TFolderName } from "../../constants/FolderNames";
import type { IApiQueryColumn, IApiQueryHubRelationSource, IApiQueryJoinTableSource, IApiQueryMainTableSource, IApiQueryRelationSource } from "../../data/query/IApiQuery";

export type TApiQueryHubRelationSourceOptions = { isToParentDirection?: false; childrenFolderNames?: TFolderName[] } | { isToParentDirection: true; childrenFolderNames?: undefined };

export default class QuerySources {
    static mainTable(): IApiQueryMainTableSource {
        return {
            __type: 'MainTable:#EQ',
        };
    }

    static relation(itemTypes: TFolderName[], relatypeType: string, direction: 0 | 1 | 2): IApiQueryRelationSource {
        return {
            __type: 'Relation:#EQ',
            Direction: direction,
            ItemTypes: itemTypes,
            RelationType: relatypeType
        };
    };

    static join(itemType: TFolderName, key: IApiQueryColumn, targetColumnName?: string): IApiQueryJoinTableSource {
        const join: IApiQueryJoinTableSource = {
            __type: 'Join:#EQ',
            ItemType: itemType,
            Key: key
        };
        if (targetColumnName) {
            join.TargetColumnName = targetColumnName;
        }
        return join;
    }

    static hubRelation(options: TApiQueryHubRelationSourceOptions): IApiQueryHubRelationSource {
        const { isToParentDirection, childrenFolderNames } = options;

        const relation: IApiQueryHubRelationSource = {
            __type: 'HubRelation:#EQ',
        };
        if (typeof isToParentDirection !== undefined) {
            relation.IsToParentDirection = isToParentDirection;
        }
        if (childrenFolderNames) {
            relation.ChildrenFolderNames = childrenFolderNames;
        }
        return relation;
    }
};