import { ITranslatableString } from '../interfaces/ITranslatableString';
import { IApiItemBase } from './IApiItemBase';

type TAvailableValue = {
    Key: string;
    Value: string;
    Translations: ITranslatableString;
};

export interface IApiGlobalSetting extends IApiItemBase {
    Name: string;
    Value: string | number | null;
    Type: number;
    IsLegacy: boolean;
    MinValue: number | null;
    MaxValue: number | null;
    NameCs: string;
    NameEn: string;
    NameDe: string;
    NameNo: string;
    NameRu: string;
    NameSk: string;
    FeatureGuid: string | null;
    AvailableValues: TAvailableValue[] | null;
    Category: string;
    Visible: boolean;
    Rank: number | null;
    DependsOn: string | null;
    DependsOnValue: string | null;
    DependsOnValueInverted: boolean;
    KbUrlShortCode: string | null;
    IsPremium: boolean;
    DisabledValue: string | null;
    UnlimitedValue: string | null;
}
