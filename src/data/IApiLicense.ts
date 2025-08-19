import type { IApiCapacityAvailableBundle } from './IApiCapacityAvailableBundle';
import type { ITranslatableString } from '../interfaces/ITranslatableString';
import type { TFeatureWithEdition } from './IApiFeaturesLicenseBundle';
import type { Edition } from '../constants/Edition';
import type { Feature } from '../constants/Feature';
import type { TFolderName } from '../constants/FolderNames';
import type ExpirationReason from '../constants/ExpirationReason';
import type LicenseKeyInvoiceSeverity from '../constants/LicenseKeyInvoiceSeverity';

type LicenceBusinessType = 'Premium' | 'Trial' | 'Free';

interface IApiRestrictionBase {
    AvailableInEdition: Edition;
    AvailableInFeature: Feature;
}

interface IApiRestrictionsClass {
    Functionalities: (IApiRestrictionBase & {
        Functionality: string;
        CurrentLimit: number | null;
    })[];
    GlobalSettings: (IApiRestrictionBase & {
        GlobalSettingName: string;
    })[];
    Modules: (IApiRestrictionBase & {
        FolderName: TFolderName;
    })[];
}

export interface IApiLicenseExpiration {
    ExpiresOn: string;
    Reason: ExpirationReason;
    IsLicenseKeyExpiredAndSystemLocked: boolean;
    IsLicenseKeyInExpireTimePeriod: boolean;
    IsLicenseKeyInSilentExpireTimePeriod: boolean;
    NumberOfDaysToLockSystem: number | null;
}

export interface IApiCurrentUserLicenseInfo {
    ReceivesAdminLicenseNotifications: boolean;
    ReceivesBillingLicenseNotifications: boolean;
}

interface IApiLicenseKeyInvoices {
    UnpaidInvoices: IApiLicenseKeyInvoice[] | null;
    BillingEmails: string[] | null;
}

export interface IApiLicenseKeyInvoice {
    Name: string;
    Url: string;
    DueDate: string;
    Severity: LicenseKeyInvoiceSeverity;
}

export interface IApiLicense {
    AvailableBundles: (IApiCapacityAvailableBundle & { Name: ITranslatableString })[];
    CustomerName: string;
    BusinessType: LicenceBusinessType;
    Features: TFeatureWithEdition[] | null;
    CurrentUserRestrictions: IApiRestrictionsClass;
    Restrictions: IApiRestrictionsClass;
    CurrentUserLicenseInfo: IApiCurrentUserLicenseInfo;
    Expiration: IApiLicenseExpiration | null;
    Invoices: IApiLicenseKeyInvoices | null;
    GeneratedDate: string;
    DbSize: IApiLicenseDbSizeModel;
    IsCloudHosted: boolean;
}

export interface IApiLicenseDbSizeModel {
    IsFull: boolean;
    Used: number | null;
    Licensed: number | null;
}