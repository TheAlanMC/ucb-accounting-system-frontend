import { Component } from '@angular/core';

@Component({
  selector: 'app-tax-page',
  templateUrl: './tax-page.component.html',
  styleUrls: ['./tax-page.component.css']
})
export class TaxPageComponent {
  impuestos = [
    {
      id: 1,
      fechaCreacion: '15/06/2021',
      nombreImpuesto: 'Impuestos sobre la renta',
      numero: 1,
      tasaImpuesto: '21%',
      acciones: ''
    },
    {
      id: 2,
      fechaCreacion: '07/04/2021',
      nombreImpuesto: 'Impuesto al valor agregado',
      numero: 2,
      tasaImpuesto: '16%',
      acciones: ''
    },
    // Agrega más impuestos aquí
  ];

  clonedImpuestos: any = {};

  sidebarVisible2 = false;

  editingRow: number | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onRowEditInit(impuesto: any) {
    this.clonedImpuestos[impuesto.id] = {...impuesto};
  }

  onRowEditSave(impuesto: any) {
    if (impuesto.tasaImpuesto) {
        delete this.clonedImpuestos[impuesto.id];
        // Aquí puedes agregar el código para guardar los cambios en tu backend
        this.editingRow = null;
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
