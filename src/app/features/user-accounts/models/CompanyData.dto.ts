import { BusinessEntity } from "./BusinessEntity.dto";
import { Industry } from "./Industry.dto";



export interface CompanyData {
    industry: Industry;
    businessEntity: BusinessEntity;
    companyName: string;
    companyNit: string;
    companyAddress: string;
    phoneNumber: string;
    companyLogo: string;
  }