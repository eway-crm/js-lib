import { IApiCapacityAvailableBundle } from './IApiCapacityAvailableBundle';
import { ITranslatableString } from '../interfaces/ITranslatableString';
import { TFeatureWithEdition } from './IApiFeaturesLicenseBundle';

type LicenceBusinessType = 'Premium' | 'Trial' | 'Free';

export interface IApiLicense {
    AvailableBundles: (IApiCapacityAvailableBundle & { Name: ITranslatableString })[];
    BusinessType: LicenceBusinessType;
    Features: TFeatureWithEdition[];
}
