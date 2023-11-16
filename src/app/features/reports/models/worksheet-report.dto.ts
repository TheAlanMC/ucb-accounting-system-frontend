export interface Subaccount {
    subaccountCode: number;
    subaccountId: number;
    subaccountName: string;
  }
  
  export interface WorksheetDetail {
    balanceCreditor: number;
    balanceDebtor: number;
    balanceSheetAsset: number;
    balanceSheetLiability: number;
    incomeStatementExpense: number;
    incomeStatementIncome: number;
    subaccount: Subaccount;
  }
  
  export interface CurrencyType {
    currencyCode: string;
    currencyName: string;
  }
  
  export interface Industry {
    industryId: number;
    industryName: string;
  }
  
  export interface BusinessEntity {
    businessEntityId: number;
    businessEntityName: string;
  }
  
  export interface Company {
    businessEntity: BusinessEntity;
    companyAddress: string;
    companyLogo: string;
    companyName: string;
    companyNit: string;
    industry: Industry;
    phoneNumber: string;
  }
  
  export interface ReportData {
    totalBalanceCreditor: number;
    totalBalanceDebtor: number;
    totalBalanceSheetAsset: number;
    totalBalanceSheetEquity: number;
    totalBalanceSheetLiability: number;
    totalIncomeStatementExpense: number;
    totalIncomeStatementIncome: number;
    totalIncomeStatementNetIncome: number;
    worksheetDetails: WorksheetDetail[];
  }
  
  export interface WorksheetReportDto {
    company: Company;
    currencyType: CurrencyType;
    endDate: string;
    reportData: ReportData;
    startDate: string;
  }
  