export interface Subaccount {
    subaccountCode: number;
    subaccountId: number;
    subaccountName: string;
    totalAmountBs: number;
  }
  
  export interface Account {
    accountCode: number;
    accountId: number;
    accountName: string;
    totalAmountBs: number;
    subaccounts: Subaccount[];
  }
  
  export interface AccountSubgroup {
    accountSubgroupCode: number;
    accountSubgroupId: number;
    accountSubgroupName: string;
    totalAmountBs: number;
    accounts: Account[];
  }
  
  export interface AccountGroup {
    accountGroupCode: number;
    accountGroupId: number;
    accountGroupName: string;
    totalAmountBs: number;
    accountSubgroups: AccountSubgroup[];
  }
  
  export interface AccountCategory {
    accountCategoryCode: number;
    accountCategoryId: number;
    accountCategoryName: string;
    totalAmountBs: number;
    accountGroups: AccountGroup[];
  }
  
  export interface FinancialStatementDetail {
    accountCategory: AccountCategory;
    description: string;
    totalAmountBs: number;
  }
  
  export interface ReportData {
    description: string;
    financialStatementDetails: FinancialStatementDetail[];
    totalAmountBs: number;
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
  
  export interface BalanceSheetsDto {
    company: Company;
    currencyType: CurrencyType;
    endDate: string;
    reportData: ReportData;
    startDate: string;
  }
  