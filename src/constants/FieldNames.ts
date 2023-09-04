import { FolderNames, TFolderName } from "./FolderNames";

export default class FieldNames {
    static readonly ServerCommon = {
        Server_ID: 'Server_ID',
        Server_ItemCreated: 'Server_ItemCreated',
        Server_ItemChanged: 'Server_ItemChanged'
    } as const;

    static readonly Common = {
        CreatedByGUID: 'CreatedByGUID',
        CurrencyEn: 'CurrencyEn',
        DefaultCurrencySuffix: 'DefaultCurrency',
        FileAs: 'FileAs',
        ItemCreated: 'ItemCreated',
        ItemChanged: 'ItemChanged',
        ItemGUID: 'ItemGUID',
        ItemVersion: 'ItemVersion',
        ModifiedByGUID: 'ModifiedByGUID',
        OwnerGUID: 'OwnerGUID',
        ParentCurrencySuffix: 'ParentCurrency',
    } as const;

    static readonly Calendar = {
        EndDate: 'EndDate',
        Note: 'Note',
    } as const;

    static readonly Carts = {
        SuperiorItem: 'SuperiorItem',
        SuperiorCompany: 'SuperiorCompany',
        SuperiorContact: 'SuperiorContact',
        TypeEn: 'TypeEn',
        StateEn: 'StateEn',
    } as const;

    static readonly Companies = {
        ID: 'ID',
        CompanyName: 'CompanyName',
        Department: 'Department',
        AccountNumber: 'AccountNumber',
        IdentificationNumber: 'IdentificationNumber',
        VatNumber: 'VatNumber',
        Sales: 'Reversal',
        EmployeesCount: 'EmployeesCount',
        Purchaser: 'Purchaser',
        Suppliers: 'Suppliers',
        Competitor: 'Competitor',

        Address1Street: 'Address1Street',
        Address1City: 'Address1City',
        Address1PostalCode: 'Address1PostalCode',
        Address1CountryEn: 'Address1CountryEn',
        Address1State: 'Address1State',
        Address1POBox: 'Address1POBox',

        Address2Street: 'Address2Street',
        Address2City: 'Address2City',
        Address2PostalCode: 'Address2PostalCode',
        Address2CountryEn: 'Address2CountryEn',
        Address2State: 'Address2State',
        Address2POBox: 'Address2POBox',

        Address3Street: 'Address3Street',
        Address3City: 'Address3City',
        Address3PostalCode: 'Address3PostalCode',
        Address3CountryEn: 'Address3CountryEn',
        Address3State: 'Address3State',
        Address3POBox: 'Address3POBox',

        InvoiceAddress: 'InvoiceAddress',
        PostalAddress: 'PostalAddress',

        Phone: 'Phone',
        Mobile: 'Mobile',
        Fax: 'Fax',

        WebPage: 'WebPage',

        Email: 'Email',
        ICQ: 'ICQ',
        MSN: 'MSN',
        Skype: 'Skype',

        ImportanceEn: 'ImportanceEn',
        FirstContactEn: 'FirstContactEn',
        LineOfBusiness: 'LineOfBusiness',
        EmailOptOut: 'EmailOptOut',
        MailingListOther: 'MailingListOther',
        MailingListOtherValue: 'MailingListOtherValue',

        Note: 'Note',
        IsPrivate: 'IsPrivate',
        NextStep: 'NextStep',
        LastActivity: 'LastActivity',
        AdditionalDiscount: 'AdditionalDiscount',
    } as const;

    static readonly Contacts = {
        ProfilePicture: 'ProfilePicture',
        Title: 'Title',
        Email1Address: 'Email1Address',
        Email2Address: 'Email2Address',
        Email3Address: 'Email3Address',
        DoNotSendNewsletter: 'DoNotSendNewsletter',
        ImportanceEn: 'ImportanceEn',

        PrefixEn: 'PrefixEn',
        FirstName: 'FirstName',
        MiddleName: 'MiddleName',
        LastName: 'LastName',
        SuffixEn: 'SuffixEn',

        BusinessAddressStreet: 'BusinessAddressStreet',
        BusinessAddressCity: 'BusinessAddressCity',
        BusinessAddressPostalCode: 'BusinessAddressPostalCode',
        BusinessAddressCountryEn: 'BusinessAddressCountryEn',
        BusinessAddressState: 'BusinessAddressState',
        BusinessAddressPoBox: 'BusinessAddressPOBox',

        HomeAddressStreet: 'HomeAddressStreet',
        HomeAddressCity: 'HomeAddressCity',
        HomeAddressPostalCode: 'HomeAddressPostalCode',
        HomeAddressCountryEn: 'HomeAddressCountryEn',
        HomeAddressState: 'HomeAddressState',
        HomeAddressPOBox: 'HomeAddressPOBox',

        OtherAddressStreet: 'OtherAddressStreet',
        OtherAddressCity: 'OtherAddressCity',
        OtherAddressPostalCode: 'OtherAddressPostalCode',
        OtherAddressCountryEn: 'OtherAddressCountryEn',
        OtherAddressState: 'OtherAddressState',
        OtherAddressPOBox: 'OtherAddressPOBox',

        BusinessPhoneNumber: 'TelephoneNumber1',
        BusinessPhoneNumber2: 'TelephoneNumber5',
        BusinessFaxNumber: 'TelephoneNumber6',
        MobilePhoneNumber: 'TelephoneNumber3',
        HomePhoneNumber: 'TelephoneNumber2',
        OtherPhoneNumber: 'TelephoneNumber4',

        ICQ: 'ICQ',
        MSN: 'MSN',
        Skype: 'Skype',
        WebPage: 'WebPage',

        Note: 'Note',
        Department: 'Department',
        Company: 'Company',

        IsPrivate: 'Private',
        NextStep: 'NextStep',
        LastActivity: 'LastActivity',
    } as const;

    static readonly Leads = {
        ID: 'ID',
        FileAs: 'FileAs',
        HumanID: 'HID',
        Customer: 'Customer',
        ContactPerson: 'ContactPerson',
        Marketing: 'Marketing',

        ReceiveDate: 'ReceiveDate',
        Email: 'Email',
        Phone: 'Phone',

        Street: 'Street',
        State: 'State',
        CountryEn: 'CountryEn',
        City: 'City',
        POBox: 'POBox',
        Zip: 'Zip',

        Price: 'Price',
        PriceChanged: 'PriceChanged',
        CurrencyEn: FieldNames.Common.CurrencyEn,
        EstimatedEnd: 'EstimatedEnd',
        Probability: 'Probability',
        LeadOriginEn: 'LeadOriginEn',

        PriceDefaultCurrency: 'PriceDefaultCurrency',
        EstimatedValue: 'EstimatedValue',
        EstimatedValueDefaultCurrency: 'EstimatedValueDefaultCurrency',
        Note: 'Note',

        TypeEn: 'TypeEn',
        StateEn: 'StateEn',
        PrevStateEn: 'PrevStateEn',

        IsPrivate: 'Private',
        EmailOptOut: 'EmailOptOut',
        NextStep: 'NextStep',
        LastActivity: 'LastActivity',
        ItemVersion: 'ItemVersion',

        EstimatedRevenue: 'EstimatedRevenue',
        EstimatedRevenueDefaultCurrency: 'EstimatedRevenueDefaultCurrency',

        CompletedDate: 'CompletedDate',
        LostDate: 'LostDate'
    } as const;

    static readonly Documents = {
        FileAs: 'FileAs',
        DocName: 'DocName',
        Preview: 'Preview',
        PreviewWidth: 'PreviewWidth',
        PreviewHeight: 'PreviewHeight',

        DocTypeEn: 'DocTypeEn',
        StateEn: 'StateEn',

        ImportanceEn: 'ImportanceEn',
        SuperiorItem: 'SuperiorItem',
        SuperiorCompany: 'Company',
        SuperiorContact: 'Contact',

        DocSize: 'DocSize',
        Extension: 'Extension',
        CreationTime: 'CreationTime',
        LastWriteTime: 'LastWriteTime',
        IsPrivate: 'Private',
        Note: 'Note',
    } as const;

    static readonly Emails = {
        To: 'To',
        From: 'SenderEmailAddress',
        Cc: 'Cc',
        Subject: 'Subject',
        ImportanceEn: 'ImportanceEn',
        SuperiorItem: 'SuperiorItem',
        SentOn: 'SentOn',
        ReceivedTime: 'ReceivedTime',
        FileSize: 'FileSize',
        AttachmentsCount: 'AttachmentsCount',
        Note: 'Note',
    } as const;

    static readonly Goods = {
        Code: 'Code',
        Structure: 'Structure',
        Note: 'Note',
        Description: 'Description'
    } as const;

    static readonly Journal = {
        FileAs: 'FileAs',
        Subject: 'Subject',
        TypeEn: 'TypeEn',
        StateEn: 'StateEn',
        ImportanceEn: 'ImportanceEn',
        EventStart: 'EventStart',
        EventEnd: 'EventEnd',
        SuperiorItem: 'SuperiorItem',
        Company: 'Company',
        Contact: 'Contact',
        Marketing: 'Marketing',
        IsSystem: 'System',
        IsPrivate: 'Private',
        Note: 'Note',
        Phone: 'Phone',
    } as const;

    static readonly Vacation = {
        StartDate: 'StartDate',
        EndDate: 'EndDate',
        User: 'User',

        Duration: 'Duration',
        Place: 'Place',
        Note: 'Note',

        AllDay: 'AllDay',
        TypeEn: 'TypeEn',
        StateEn: 'StateEn',

        IsPrivate: 'Private',
    } as const;

    static readonly Marketing = {
        HumanID: 'HumanID',
        EstimatedStart: 'EstimatedStart',
        EstimatedEnd: 'EstimatedEnd',

        RealStart: 'RealStart',
        RealEnd: 'RealEnd',

        TargetGroup: 'TargetGroup',
        EmailsSent: 'EmailsSent',
        EmailsDelivered: 'EmailsDelivered',
        EmailsViewed: 'EmailsViewed',
        PeopleUnsubscribed: 'PeopleUnsubscribed',
        FinalRevenues: 'FinalRevenues',

        TypeEn: 'TypeEn',
        StateEn: 'StateEn',
    } as const;

    static readonly Projects = {
        HumanID: 'HID',
        FileAs: 'FileAs',
        ProjectName: 'ProjectName',
        ProjectOriginEn: 'ProjectOriginEn',
        TypeEn: 'TypeEn',
        StateEn: 'StateEn',
        PaymentTypeEn: 'PaymentTypeEn',

        ProjectStart: 'ProjectStart',
        ProjectRealEnd: 'ProjectRealEnd',
        EstimatedEnd: 'ProjectEnd',
        CurrencyEn: FieldNames.Common.CurrencyEn,
        DefaultCurrencyEn: 'DefaultCurrencyEn',

        EstimatedMargin: 'EstimatedMargin',
        EstimatedPeopleExpenses: 'EstimatedPeopleExpenses',
        EstimatedPeopleExpensesDefaultCurrency: 'EstimatedPeopleExpensesDefaultCurrency',
        EstimatedOtherExpenses: 'EstimatedOtherExpenses',
        EstimatedOtherExpensesDefaultCurrency: 'EstimatedOtherExpensesDefaultCurrency',
        EstimatedPrice: 'EstimatedPrice',
        EstimatedPriceDefaultCurrency: 'EstimatedPriceDefaultCurrency',
        EstimatedProfit: 'EstimatedProfit',
        EstimatedProfitDefaultCurrency: 'EstimatedProfitDefaultCurrency',

        EstimatedPriceChanged: 'EstimatedPriceChanged',
        EstimatedPeopleExpensesChanged: 'EstimatedPeopleExpensesChanged',
        EstimatedOtherExpensesChanged: 'EstimatedOtherExpensesChanged',

        Delay: 'Delay',
        EstimatedWorkHours: 'EstimatedWorkHours',
        TotalWorkHours: 'TotalWorkHours',

        PeopleExpenses: 'PeopleExpenses',
        OtherExpenses: 'OtherExpenses',
        PeopleExpensesDefaultCurrency: 'PeopleExpensesDefaultCurrency',
        OtherExpensesDefaultCurrency: 'OtherExpensesDefaultCurrency',

        PeopleExpensesChanged: 'PeopleExpensesChanged',
        OtherExpensesChanged: 'OtherExpensesChanged',

        Price: 'Price',
        PriceDefaultCurrency: 'PriceDefaultCurrency',

        Profit: 'Profit',
        ProfitDefaultCurrency: 'ProfitDefaultCurrency',
        Margin: 'Margin',

        PriceChanged: 'PriceChanged',
        SuperiorProject: 'SuperiorProject',
        Customer: 'Customer',
        ContactPerson: 'ContactPerson',

        Users: 'Users',
        ProjectManager: 'ProjectManager',

        InvoicePaymentDate: 'InvoicePaymentDate',
        PaymentMaturity: 'PaymentMaturity',
        InvoiceIssueDate: 'InvoiceIssueDate',

        LicensesCount: 'LicensesCount',
        LicensePrice: 'LicensePrice',
        LicensePriceDefaultCurrency: 'LicensePriceDefaultCurrency',

        NextStep: 'NextStep',
        LastActivity: 'LastActivity',

        IsPrivate: 'Private',

        LicensePriceChanged: 'LicensePriceChanged',
        Note: 'Note',

        CompletedDate: 'CompletedDate',
        LostDate: 'LostDate'
    } as const;

    static readonly Tasks = {
        FileAs: 'FileAs',
        Subject: 'Subject',

        RootItem: 'RootItem',
        SuperiorItem: 'SuperiorItem',
        Company: 'Company',
        Contact: 'Contact',

        StartDate: 'StartDate',
        DueDate: 'DueDate',

        Reminder: 'Reminder',
        ReminderDate: 'ReminderDate',

        ImportanceEn: 'ImportanceEn',

        IsCompleted: 'Complete',
        PercentComplete: 'PercentComplete',
        PercentCompleteDecimal: 'PercentCompleteDecimal',
        CompletedDate: 'CompletedDate',

        Solver: 'Solver',
        Delegator: 'Delegator',

        Level: 'Level',
        IsPrivate: 'Private',

        ActualWorkHours: 'ActualWorkHours',
        TotalWorkHours: 'TotalWorkHours',
        Body: 'Body',

        TypeEn: 'TypeEn',
        StateEn: 'StateEn',
    } as const;

    static readonly Training = {
        TitleEn: 'TitleEn'
    };

    static readonly WorkReports = {
        Task: 'Task',
        ProjectName: 'ProjectName',
        UserName: 'UserName',
        Subject: 'Subject',

        Date: 'Date',
        FromTime: 'FromTime',
        ToTime: 'ToTime',
        Overtime: 'Overtime',

        Month: 'Month',
        Year: 'Year',

        IsPrivate: 'Private',
        Note: 'Note',

        Duration: 'Duration',

        WorkReportEn: 'WorkReportEn',
        StateEn: 'StateEn',
    } as const;

    static readonly Users = {
        ProfilePicture: 'ProfilePicture',
        UserName: 'UserName',
        JobTitle: 'JobTitle',
        IDCardNumber: 'IDCardNumber',

        Birthdate: 'Birthdate',
        BirthPlace: 'BirthPlace',
        PersonalIdentificationNumber: 'PersonalIdentificationNumber',
        Active: 'Active',
        FamilyStatusEn: 'FamilyStatusEn',

        HomeAddressStreet: 'HomeAddressStreet',
        HomeAddressCity: 'HomeAddressCity',
        HomeAddressPostalCode: 'HomeAddressPostalCode',
        HomeAddressCountryEn: 'HomeAddressCountryEn',
        HomeAddressState: 'HomeAddressState',
        HomeAddressPOBox: 'HomeAddressPOBox',

        BankAccount: 'BankAccount',

        BusinessPhoneNumber: 'BusinessPhoneNumber',
        MobilePhoneNumber: 'MobilePhoneNumber',
        Email1Address: 'Email1Address',
        Email2Address: 'Email2Address',
        ICQ: 'ICQ',
        MSN: 'MSN',
        Skype: 'Skype',

        IdentificationNumber: 'IdentificationNumber',
        HealthInsurance: 'HealthInsurance',
        HolidayLength: 'HolidayLength',
        RemainingDaysOfHoliday: 'RemainingDaysOfHoliday',
        SalaryDateEn: 'SalaryDateEn',
        Supervisor: 'Supervisor',
        TravelDistance: 'TravelDistance',
        TimeAccessibility: 'TimeAccessibility',
        TransportMode: 'TransportMode',
        WorkdayStartTime: 'WorkdayStartTime',

        Note: 'Note',
        IsSystem: 'IsSystem',
    } as const;

    static readonly Groups = {
        IsAdmin: 'IsAdmin',
        GroupName: 'GroupName',
        FileAs: 'FileAs',
        Description: 'Description',
        IsPM: 'IsPM',
        System: 'System',
        IsRole: 'IsRole',
        IsCategory: 'IsCategory',
        DisallowControlModulePermissions: 'DisallowControlModulePermissions',
        DisallowControlColumnPermissions: 'DisallowControlColumnPermissions',
        IsOutlookCategory: 'IsOutlookCategory',
        DisallowControlUserAssignment: 'DisallowControlUserAssignment',
        ColorEn: 'ColorEn',
        Picture: 'Picture'
    } as const;

    static allTypeEnNames = ['TypeEn', FieldNames.Documents.DocTypeEn, FieldNames.WorkReports.WorkReportEn, 'TitleEn'];

    static getFolderFileAs = (folderName: TFolderName) => {
        switch (folderName) {
            case FolderNames.leads:
                return FieldNames.Leads.FileAs;
            case FolderNames.projects:
                return FieldNames.Projects.ProjectName;
            case FolderNames.documents:
                return FieldNames.Documents.DocName;
            case FolderNames.companies:
                return FieldNames.Companies.CompanyName;
            case FolderNames.contacts:
                return FieldNames.Common.FileAs;
            case FolderNames.users:
                return FieldNames.Common.FileAs;
            case FolderNames.emails:
                return FieldNames.Emails.Subject;
            case FolderNames.journal:
                return FieldNames.Journal.FileAs;
            case FolderNames.tasks:
                return FieldNames.Tasks.Subject;
            case FolderNames.workReports:
                return FieldNames.WorkReports.Subject;
            case FolderNames.vacation:
                return FieldNames.Vacation.TypeEn;
            case FolderNames.carts:
                return FieldNames.Common.FileAs;
            case FolderNames.goods:
                return FieldNames.Common.FileAs;
            case FolderNames.groups:
                return FieldNames.Groups.GroupName;
            default:
                console.warn(`FileAs col name not defined for folderName ${folderName}`);
                return FieldNames.Common.FileAs;
        }
    };
}
