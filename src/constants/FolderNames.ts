export type TFolderName = 'Actions'
    | 'AdditionalFields'
    | 'Bonuses'
    | 'Calendar'
    | 'CapacityNotes'
    | 'CapacityNoteTypes'
    | 'Carts'
    | 'ColumnPermissions'
    | 'Companies'
    | 'Contacts'
    | 'CurrencyExchangeRates'
    | 'Documents'
    | 'Emails'
    | 'EnumTypes'
    | 'EnumValues'
    | 'EnumValuesRelations'
    | 'Features'
    | 'Flows'
    | 'GlobalSettings'
    | 'Goals'
    | 'Goods'
    | 'GoodsInCart'
    | 'GoodsInSet'
    | 'Groups'
    | 'History'
    | 'Holidays'
    | 'Children'
    | 'IndividualDiscounts'
    | 'InvoiceItems'
    | 'Invoices'
    | 'ItemCopyRelations'
    | 'Journal'
    | 'Knowledge'
    | 'Layouts'
    | 'LayoutsModels'
    | 'Leads'
    | 'Ledger'
    | 'Mappings'
    | 'Marketing'
    | 'MarketingList'
    | 'MarketingListSources'
    | 'Models'
    | 'ModulePermissions'
    | 'ObjectTypesOptions'
    | 'Payments'
    | 'PriceListGroups'
    | 'ProjectAssignments'
    | 'ProjectAssignmentsPerUserProject'
    | 'ProjectAssignmentsTotal'
    | 'ProjectAssignmentsTotalUserProject'
    | 'ProjectList'
    | 'Projects'
    | 'ProjectUsersInCaPlan'
    | 'RelationData'
    | 'Relations'
    | 'Reports'
    | 'RevisionsHistory'
    | 'Salaries'
    | 'SalePrices'
    | 'Prices'
    | 'SqlObjects'
    | 'Tasks'
    | 'RecurrencePatterns'
    | 'TeamRoles'
    | 'Templates'
    | 'Training'
    | 'Users'
    | 'UserSettings'
    | 'Vacation'
    | 'WebAccess2Options'
    | 'WebAccessOptions'
    | 'WorkCommitments'
    | 'WorkflowHistory'
    | 'WorkReports'
    | 'WrongClientVersions'
    | 'XsltTransformations';

export class FolderNames {
    static isValidFolderName = (folderName: string): boolean => {
        return Object.values(FolderNames).includes(folderName);
    };
    
    static readonly actions: TFolderName = "Actions";
    static readonly additionalFields: TFolderName = "AdditionalFields";
    static readonly bonuses: TFolderName = "Bonuses";
    static readonly calendar: TFolderName = "Calendar";
    static readonly capacityNotes: TFolderName = "CapacityNotes";
    static readonly capacityNoteTypes: TFolderName = "CapacityNoteTypes";
    static readonly carts: TFolderName = "Carts";
    static readonly columnPermissions: TFolderName = "ColumnPermissions";
    static readonly companies: TFolderName = "Companies";
    static readonly contacts: TFolderName = "Contacts";
    static readonly currencyExchangeRates: TFolderName = "CurrencyExchangeRates";
    static readonly documents: TFolderName = "Documents";
    static readonly emails: TFolderName = "Emails";
    static readonly enumTypes: TFolderName = "EnumTypes";
    static readonly enumValues: TFolderName = "EnumValues";
    static readonly enumValuesRelations: TFolderName = "EnumValuesRelations";
    static readonly features: TFolderName = "Features";
    static readonly flows: TFolderName = "Flows";
    static readonly globalSettings: TFolderName = "GlobalSettings";
    static readonly goals: TFolderName = "Goals";
    static readonly goods: TFolderName = "Goods";
    static readonly goodsInCart: TFolderName = "GoodsInCart";
    static readonly goodsInSet: TFolderName = "GoodsInSet";
    static readonly groups: TFolderName = "Groups";
    static readonly history: TFolderName = "History";
    static readonly holidays: TFolderName = "Holidays";
    static readonly children: TFolderName = "Children";
    static readonly individualDiscounts: TFolderName = "IndividualDiscounts";
    static readonly invoiceItems: TFolderName = "InvoiceItems";
    static readonly invoices: TFolderName = "Invoices";
    static readonly itemCopyRelations: TFolderName = "ItemCopyRelations";
    static readonly journal: TFolderName = "Journal";
    static readonly knowledge: TFolderName = "Knowledge";
    static readonly layouts: TFolderName = "Layouts";
    static readonly layoutsModels: TFolderName = "LayoutsModels";
    static readonly leads: TFolderName = "Leads";
    static readonly ledger: TFolderName = "Ledger";
    static readonly mappings: TFolderName = "Mappings";
    static readonly marketing: TFolderName = "Marketing";
    static readonly marketingList: TFolderName = "MarketingList";
    static readonly marketingListSources: TFolderName = "MarketingListSources";
    static readonly models: TFolderName = "Models";
    static readonly modulePermissions: TFolderName = "ModulePermissions";
    static readonly objectTypesOptions: TFolderName = "ObjectTypesOptions";
    static readonly payments: TFolderName = "Payments";
    static readonly priceListGroups: TFolderName = "PriceListGroups";
    static readonly projectAssignments: TFolderName = "ProjectAssignments";
    static readonly projectAssignmentsPerUserProject: TFolderName = "ProjectAssignmentsPerUserProject";
    static readonly projectAssignmentsTotal: TFolderName = "ProjectAssignmentsTotal";
    static readonly projectAssignmentsTotalUserProject: TFolderName = "ProjectAssignmentsTotalUserProject";
    static readonly projectList: TFolderName = "ProjectList";
    static readonly projects: TFolderName = "Projects";
    static readonly projectUsersInCaPlan: TFolderName = "ProjectUsersInCaPlan";
    static readonly relationData: TFolderName = "RelationData";
    static readonly relations: TFolderName = "Relations";
    static readonly reports: TFolderName = "Reports";
    static readonly revisionsHistory: TFolderName = "RevisionsHistory";
    static readonly salaries: TFolderName = "Salaries";
    static readonly salePrices: TFolderName = "SalePrices";
    static readonly prices: TFolderName = "Prices";
    static readonly sqlObjects: TFolderName = "SqlObjects";
    static readonly tasks: TFolderName = "Tasks";
    static readonly recurrencePatterns: TFolderName = "RecurrencePatterns";
    static readonly teamRoles: TFolderName = "TeamRoles";
    static readonly templates: TFolderName = "Templates";
    static readonly training: TFolderName = "Training";
    static readonly users: TFolderName = "Users";
    static readonly userSettings: TFolderName = "UserSettings";
    static readonly vacation: TFolderName = "Vacation";
    static readonly webAccess2Options: TFolderName = "WebAccess2Options";
    static readonly webAccessOptions: TFolderName = "WebAccessOptions";
    static readonly workCommitments: TFolderName = "WorkCommitments";
    static readonly workflowHistory: TFolderName = "WorkflowHistory";
    static readonly workReports: TFolderName = "WorkReports";
    static readonly wrongClientVersions: TFolderName = "WrongClientVersions";
    static readonly xsltTransformations: TFolderName = "XsltTransformations";
}