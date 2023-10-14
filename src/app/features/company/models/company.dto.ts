import { IndustryDto } from "./industry.dto";
import { BusinessEntityDto } from "./business-entity.dto";

export interface CompanyDto {
    industry: IndustryDto;
    businessEntity: BusinessEntityDto;
    companyName: string;
    companyNit: string;
    companyAddress: string;
    phoneNumber: string;
    companyLogo: string;
  }