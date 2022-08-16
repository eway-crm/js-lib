enum ExpirationReason {
    UnpaidImportantInvoices = 'UnpaidImportantInvoices',
    UncollectableSubscriptionPayment = 'UncollectableSubscriptionPayment',
    UncollectableSubscriptionPaymentWithExpiredCard = 'UncollectableSubscriptionPaymentWithExpiredCard',
    StandardSubscriptionPeriod = 'StandardSubscriptionPeriod',
}

export default ExpirationReason;
