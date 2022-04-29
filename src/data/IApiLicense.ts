import { IApiCapacityAvailableBundle } from './IApiCapacityAvailableBundle';
import { ITranslatableString } from '../interfaces/ITranslatableString';
import { TFeatureWithEdition } from './IApiFeaturesLicenseBundle';
import { Edition } from '../constants/Edition';
import { Feature } from '../constants/Feature';
import { TFunctionality } from '../constants/Functionality';
import { TFolderName } from '../constants/FolderNames';

type LicenceBusinessType = 'Premium' | 'Trial' | 'Free';

interface IApiRestrictionBase {
    AvailableInEdition: Edition;
    AvailableInFeature: Feature;
}

interface IApiRestrictionsClass {
    Functionalities: (IApiRestrictionBase & {
        Functionality: TFunctionality;
        CurrentLimit: number | null;
    })[];
    GlobalSettings: (IApiRestrictionBase & {
        GlobalSettingName: string;
    })[];
    Modules: (IApiRestrictionBase & {
        FolderName: TFolderName;
    })[];
}

export interface IApiLicense {
    AvailableBundles: (IApiCapacityAvailableBundle & { Name: ITranslatableString })[];
    BusinessType: LicenceBusinessType;
    Features: TFeatureWithEdition[];
    CurrentUserRestrictions: IApiRestrictionsClass;
    Restrictions: IApiRestrictionsClass;
}
