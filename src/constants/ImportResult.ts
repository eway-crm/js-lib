
export enum ImportResult {
    Success = "Success",
    SuccessNoAction = "Success_NoAction",
    Failure = "Failed",
    FailurePermissionForbiden = "Failed_PermissionForbiden",
    FailureDuplicityFound = "Failed_DuplicityFound",
    FailureItemAlreadyRemoved = "Failed_ItemAlreadyRemoved",
}