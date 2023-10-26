import { Component } from '@angular/core';
import { TaxService } from 'src/app/core/services/tax.service';
import { SubaccountTaxTypeAbstractDto } from '../../models/subaccount-tax-type-abstract.dto';
import { TaxTypeDto } from '../../models/tax-type.dto';
import { SubaccountTaxTypeDto } from '../../models/subaccount-tax-type.dto';

@Component({
  selector: 'app-tax-page',
  templateUrl: './tax-page.component.html',
  styleUrls: ['./tax-page.component.css']
})
export class TaxPageComponent {
  impuestos!: SubaccountTaxTypeAbstractDto[];

  clonedImpuestos: any = {};

  sidebarVisible2 = false;

  editingRow: number | null = null;

  constructor(private taxService: TaxService) {

   }

  ngOnInit(): void {
    this.taxService.getSubaccountTaxTypes(1).subscribe({
      next: (data) => {
        this.impuestos = data.data!;
        console.log(this.impuestos);
      },
      error: (error) => {
        console.log(error);      }
          });
  }

  onRowEditInit(impuesto: any) {
    this.clonedImpuestos[impuesto.id] = {...impuesto};
  }

  onRowEditSave(impuesto: any) {
    console.log(impuesto);
    var impuestomodificado: SubaccountTaxTypeDto = {
      subaccountId: impuesto.subaccount.subaccountId,
      taxRate: impuesto.taxRate,
      taxTypeId: impuesto.taxType.taxTypeId
    }
    console.log(impuestomodificado);
            
        this.taxService.updateSubaccountTaxTypeRate(1, impuestomodificado).subscribe({
          next: (data) => {
            console.log(data);
            this.taxService.getSubaccountTaxTypes(1).subscribe({
              next: (data) => {
                this.impuestos = data.data!;
                console.log(this.impuestos);
              },
              error: (error) => {
                console.log(error);      }
                  });
          },
          error: (error) => {
            console.log(error);      }
                                                      });    
    if (impuesto.tasaImpuesto) {
        delete this.clonedImpuestos[impuesto.id];
        console.log(impuesto);      
    }
    else {
        // Restaura el valor original si la nueva tasa es inválida
        this.impuestos[this.impuestos.indexOf(impuesto)] = this.clonedImpuestos[impuesto.id];
        delete this.clonedImpuestos[impuesto.id];
    }
  }

  onRowEditCancel(impuesto: any, rowIndex: number) {
    this.impuestos[this.impuestos.indexOf(impuesto)] = this.clonedImpuestos[impuesto.id];
    delete this.clonedImpuestos[impuesto.id];
    this.editingRow = null;
  }
}
