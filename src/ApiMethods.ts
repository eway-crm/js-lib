import { FolderNames, TFolderName } from "./constants/FolderNames";

export class ApiMethods {
    static readonly getAllEmailAttachments = 'GetAllEmailAttachments';
    static readonly getCalendarsByItemGuids = 'GetCalendarsByItemGuids';
    static readonly getEmailAttachment = 'GetEmailAttachment';
    static readonly getItemPreview = 'GetItemPreview';
    static readonly getJournalsByItemGuids = 'GetJournalsByItemGuids';
    static readonly getMarketingCampaignsByItemGuids = 'GetMarketingCampaignsByItemGuids';
    static readonly getMarketingListsRecordsByItemGuids = 'GetMarketingListsRecordsByItemGuids';
    static readonly getRevisionHistoryRecordsByItemGuids = 'GetRevisionHistoryRecordsByItemGuids';
    static readonly getVacationsByItemGuids = 'GetVacationsByItemGuids';
    static readonly getWorkflowHistoryRecordsByItemGuids = 'GetWorkflowHistoryRecordsByItemGuids';
    static readonly getCompanyInformationFromTaxRegister = 'GetCompanyInformationFromTaxRegister';
    static readonly logIn = 'LogIn';
    static readonly logOut = 'LogOut';
    static readonly query = 'Query';
    static readonly getServiceAuthSettings = 'GetServiceAuthSettings';

    static readonly getGetFolderNameByItemGuidsMethodName = (folderName: TFolderName) => {
        switch (folderName) {
            case FolderNames.calendar:
                return ApiMethods.getCalendarsByItemGuids;
            case FolderNames.journal:
                return ApiMethods.getJournalsByItemGuids;

            case FolderNames.marketing:
                return ApiMethods.getMarketingCampaignsByItemGuids;

            case FolderNames.marketingList:
                return ApiMethods.getMarketingListsRecordsByItemGuids;

            case FolderNames.revisionsHistory:
                return ApiMethods.getRevisionHistoryRecordsByItemGuids;

            case FolderNames.vacation:
                return ApiMethods.getVacationsByItemGuids;

            case FolderNames.workflowHistory:
                return ApiMethods.getWorkflowHistoryRecordsByItemGuids;

            default:
                return `Get${folderName}ByItemGuids`;
        }
    };
}
