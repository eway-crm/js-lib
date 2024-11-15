import type { IApiItemBase } from "./IApiItemBase";

export interface IApiContactsSuggestion extends IApiItemBase {
    EmailAddress: string;
    SourceEmailId: string;
    RelatedEmailsCount: number;
    IsHidden: boolean;
}