export interface IApiItemBaseWithoutPrivate {
    Server_ItemCreated: string | null;
    Server_ItemChanged: string | null;
    ItemCreated: string;
    ItemChanged: string;
    FileAs: string | null | undefined;
    OwnerGUID: string;
    CreatedByGUID: string;
    ModifiedByGUID: string;
    ItemGUID: string;
    ItemVersion: number;
}

export interface IApiItemBase extends IApiItemBaseWithoutPrivate {
    IsPrivate: boolean;
}

export interface IApiBoundRelation {
    RelationType: string;
    ForeignItemGUID: string;
    ForeignFolderName: string;
    RelationDataGUID: string;
}

export type TApiItemWithReleations<TItem> = TItem & {
    Relations: IApiBoundRelation[];
};