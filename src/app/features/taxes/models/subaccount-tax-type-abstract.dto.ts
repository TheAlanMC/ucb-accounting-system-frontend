import { SubaccountTaxDto } from "./subaccount-tax.dto";
import { TaxTypeDto } from "./tax-type.dto";

export interface SubaccountTaxTypeAbstractDto {
    subaccount: SubaccountTaxDto;
    taxRate: number;
    taxType: TaxTypeDto;
}