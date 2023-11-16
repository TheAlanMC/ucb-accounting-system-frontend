import { Component } from '@angular/core';
import { TaxService } from 'src/app/core/services/tax.service';
import { SubaccountTaxTypeAbstractDto } from '../../models/subaccount-tax-type-abstract.dto';
import { TaxTypeDto } from '../../models/tax-type.dto';
import { SubaccountTaxTypeDto } from '../../models/subaccount-tax-type.dto';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-tax-page',
  templateUrl: './tax-page.component.html',
  styleUrls: ['./tax-page.component.css']
})
export class TaxPageComponent {
  companyId = Number(localStorage.getItem('companyId'));
  impuestos!: SubaccountTaxTypeAbstractDto[];

  clonedImpuestos: any = {};
  sidebarVisible2 = false;
  editingRow: number | null = null;
  isNavbarOpen: boolean = false;
  date = new Date(); //TODO: Cambiar por la fecha de la bd

  constructor(private taxService: TaxService, private sidebarService: SidebarService) {

  }

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    this.sidebarService.setIsOpen(this.isNavbarOpen);
  }


  ngOnInit(): void {
    const bgColor = '#F3F6F6;'; // Cambiamos el color
    this.sidebarService.setBackgroundColor(bgColor);
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
    });
    this.taxService.getSubaccountTaxTypes(this.companyId).subscribe({
      next: (data) => {
        this.impuestos = data.data!;
        console.log(this.impuestos);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onRowEditInit(impuesto: any) {
    this.clonedImpuestos[impuesto.id] = { ...impuesto };
  }

  onRowEditSave(impuesto: any) {
    console.log(impuesto);
    var impuestomodificado: SubaccountTaxTypeDto = {
      subaccountId: impuesto.subaccount.subaccountId,
      taxRate: impuesto.taxRate,
      taxTypeId: impuesto.taxType.taxTypeId
    }
    console.log(impuestomodificado);
    this.taxService.updateSubaccountTaxTypeRate(this.companyId, impuestomodificado).subscribe({
      next: (data) => {
        console.log(data);
        this.taxService.getSubaccountTaxTypes(this.companyId).subscribe({
          next: (data) => {
            this.impuestos = data.data!;
            console.log(this.impuestos);
          },
          error: (error) => {
            console.log(error);
          }
        });
      },
      error: (error) => {
        console.log(error);
      }
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
