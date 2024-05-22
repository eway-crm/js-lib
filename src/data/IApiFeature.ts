import type { IApiItemBase } from './IApiItemBase';

export interface IApiFeature extends IApiItemBase {
    Active: boolean;
    AssociatedFolderNames: string[];
}