
export interface IApiWebServiceTaskStatus {
    TaskGuid: string;
    IsRunning: boolean;
    FinishedSuccessfully: boolean;
    CurrentIndex: number;
    LastIndex: number;
    ProgressDetail: string;
    Parameters: string;
    AdditionalData: string;
}