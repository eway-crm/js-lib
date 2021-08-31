import { IApiItemBase } from "./IApiItemBase";
import { IApiEvent } from "./workflowActions/IApiAction";

export interface IApiEnumValue extends IApiItemBase {
    EnumType: string;
    EnumTypeName: string;
    Rank: number;
    IsSystem: boolean;
    IsVisible: boolean;
    IncludeInLastActivityCalculation: boolean;
    IsDefault: boolean;
    En: string | null;
    Cs: string | null;
    De: string | null;
    Sk: string | null;
    Ru: string | null;
    No: string | null;
    AllActionEvents: IApiEvent[] | null;
}