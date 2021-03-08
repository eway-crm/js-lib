import { IApiItemBase } from "./IApiItemBase";
import { IApiLicenseBundleBase } from "./IApiLicenseBundleBase";

export interface IApiUser extends IApiItemBase {
    Username: string;
    FirstName: string | null;
    LastName: string | null;
    IsActive: boolean;
    Email1Address: string | null;
    Email2Address: string | null;
    IsSystem: boolean;
    Server_Password: string;
    Server_LicensingBundlesList: IApiLicenseBundleBase[] | null;
    Server_ForcePasswordChange: boolean;
    Users_SupervisorGuid: string | null;
    ProfilePicture: string | null;
    ProfilePictureWidth: number | null;
    Server_IsAccountLocked: boolean;
    Server_LastLogin: string | null;
    Server_LastActivity: string | null;
}