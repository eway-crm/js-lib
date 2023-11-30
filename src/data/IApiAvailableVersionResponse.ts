import { IApiResult } from "./IApiResult";

export interface IApiAvailableVersionResponse extends IApiResult {
    ClientVersion: string | null;
    WebServiceVersion: string | null;
    IsApproved: boolean | null;
    KnowledgeBaseLink: string | null;
    ReleaseDate: string | null;
    IsNewVersionAvailable: boolean;
    UpdateBlockingTodayMaintenance: null | {
        Start: string;
        End: string;
    };
}