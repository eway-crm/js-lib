import { TFolderName } from "../constants/FolderNames";

export default class QueryHelper {
    static createHubItemsCountsQuery(parentItemGuids: string[], itemTypes: TFolderName[]) {
        return {
            "__type": "HubItemsCountsQuery:#EQ",
            "ParentItemGuids": parentItemGuids,
            "ItemTypes": itemTypes
        };
    }
}