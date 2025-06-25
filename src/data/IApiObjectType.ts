import type { TFolderName } from "../constants/FolderNames";

export interface IApiObjectType {
    ArePrivateItemsEnabled: boolean;
    ContainsAnyPermittableColumn: boolean;
    FolderName: TFolderName;
    GDPR: boolean;
    GDPRHistory: boolean;
    IsActive: boolean;
    IsCategorizable: boolean;
    IsCustomizable: boolean;
    IsFullTextEnabled: boolean;
    IsLinkable: boolean;
    IsModule: boolean;
    IsReadOnly: boolean;
    ObjectTypeId: number;
    SupportsFileAs: boolean;
    SupportsItemChanges: boolean;
}