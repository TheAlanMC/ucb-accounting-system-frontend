export interface BusinessEntity {
    businessEntityId: number;
    businessEntityName: string;
  }
  
  export interface Industry {
    industryId: number;
    industryName: string;
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
  
  export interface CurrencyType {
    currencyCode: string;
    currencyName: string;
  }
  
  export interface DocumentType {
    documentTypeId: number;
    documentTypeName: string;
  }
  
  export interface Subaccount {
    subaccountCode: number;
    subaccountId: number;
    subaccountName: string;
  }
  
  export interface TransactionDetails {
    creditAmountBs: number;
    debitAmountBs: number;
    subaccount: Subaccount;
  }
  
  export interface Attachment {
    contentType: string;
    fileUrl: string;
    filename: string;
  }
  
  export interface ReportData {
    attachments: Attachment[];
    description: string;
    documentType: DocumentType;
    gloss: string;
    journalEntryId: number;
    journalEntryNumber: number;
    transactionDate: string;
    transactionDetails: TransactionDetails[];
  }
  
  export interface journalBookReportDto {
    company: Company;
    currencyType: CurrencyType;
    endDate: string;
    reportData: ReportData[];
    startDate: string;
  }
  