export interface IApiItemBase {
    ItemGUID: string;
    ItemVersion: number;
    FileAs: string | null | undefined;
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