import {CustomerAbstractDto} from "../../sales/models/customer.-abstract.dto";
import {SupplierAbstractDto} from "../../expenses/models/supplier-abstract.dto";

export interface PartnerDto{
  customers: CustomerAbstractDto[];
  suppliers: SupplierAbstractDto[];
}
