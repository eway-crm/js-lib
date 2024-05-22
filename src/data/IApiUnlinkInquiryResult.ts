export default interface IApiUnlinkInquiryResult {
    Result: TApiUnlinkInquiryResultType;
    RelatedItemGuid: string;
    CanBeUnlinked: boolean;
}

export type TApiUnlinkInquiryResultType = 'Allowed' | 'AllowedWithOptionalWarning' | 'DisallowedByMandatoryField' | 'DisallowedByReadonlyItem' | 'DisallowedByLockedForm' | 'DisallowedByLockedInferiorForm' | 'DisallowedByReadonlyInferiorField' | 'DisallowedByLockedInferiorField' | 'Disallowed';