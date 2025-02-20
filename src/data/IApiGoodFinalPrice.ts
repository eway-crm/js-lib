export interface IApiGoodFinalPrice {
    GoodGuid: string;
    SalePrice: number | null;
    ListPrice: number | null;
    Discount: number | null;
    SaleCurrencyEn: string | null;
    PriceListGroupGuid: string | null;
    CompanyGuid: string;
    SalePriceGuid: string | null;
    AdditionalDiscount: number | null;
}