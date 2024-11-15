import type { IApiItemBase } from "./IApiItemBase";

export interface IApiXsltTransformation extends IApiItemBase {
    LangCode: string | null;
    Definition: string | null;
    Namespace: string;
    ObjectTypeID: number;
    TransformationVersion: number | null;
}