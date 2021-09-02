import { IApiItemBase } from './IApiItemBase';

export interface IApiItemIdentifier extends Omit<IApiItemBase, 'ItemGUID' | 'ItemVersion'> {
    ItemGUID: string | null;
    ItemVersion: number | null;
}
