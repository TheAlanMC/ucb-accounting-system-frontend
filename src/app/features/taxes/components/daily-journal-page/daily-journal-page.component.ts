import { Component } from '@angular/core';

@Component({
  selector: 'app-daily-journal-page',
  templateUrl: './daily-journal-page.component.html',
  styleUrls: ['./daily-journal-page.component.css']
})
export class DailyJournalPageComponent {
  companyId = Number(localStorage.getItem('companyId'));
  isEditing = false;
  // constructor(private dailyJournalService: DailyJournalService) { }
  asientos = [
    // Aquí puedes agregar los asientos que quieras
     {
       ClienteProveedor: 'Proveedor XYZ',
       Estado: 'Activo',
       Tipo_de_documento: 'Factura',
       Importe_total: '1000',
       Fecha_de_Creacion: '01/01/2023',
       Nota: 'Pago de servicios'
     }
  ];
  sidebarVisible2: boolean = false;
  agregarNuevoAsiento() {
  }
obtenerAsientos() {
  // this.dailyJournalService.getAllDailyJournals(this.companyId).subscribe({
  //   next: (data => {
  //     console.log(data.data);
  //   }
  //   ),
  //   error: (error => {
  //     console.log(error);
  //   })
  // }
  //)
}
onSearch(event: any) {
  const query = event.target.value;
  // Aquí puedes implementar la lógica para buscar en tus asientos basándote en la consulta
}
}

