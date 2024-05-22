import type { TFolderName } from "../constants/FolderNames";

export interface IApiCustomizationStatsItem {
    FolderName: TFolderName | null;
    Key: string;
    Value: number;
}