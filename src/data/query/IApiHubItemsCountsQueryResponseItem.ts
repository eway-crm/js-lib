import { TFolderName } from "../../constants/FolderNames";

export interface IApiHubItemsCountsQueryResponseItem {
    ParentItemGUID: string;
    ObjectTypeID: number;
    NumberOrItems: number;
    FolderName: TFolderName;
}