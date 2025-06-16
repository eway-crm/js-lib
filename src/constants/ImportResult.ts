
export enum ImportResult {
    Success = "Success",
    Failure = "Failed",
    FailureDuplicityFound = "Failed_DuplicityFound",
    FailureItemAlreadyRemoved = "Failed_ItemAlreadyRemoved",
    FailureColumnsLockedWFAction = "Failed_ColumnsLocked",
    FailureItemLockedWFAction = "Failed_ItemLocked",
    FailureLicenseLimitReached = "Failed_LicenseLimitReached",
    FailureInssuficientModulePermission = "Failed_InsufficientModulePermission",
    FailureInssuficientColumnsPermission = "Failed_InsufficientColumnsPermission"
}