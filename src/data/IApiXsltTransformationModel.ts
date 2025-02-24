import type { IApiItemBase } from "./IApiItemBase";

export interface IApiXsltTransformationModel extends IApiItemBase {
    ObjectTypeID: number;
    TransformationGUID: string | null;
    ItemTypeGUID: string | null;
}