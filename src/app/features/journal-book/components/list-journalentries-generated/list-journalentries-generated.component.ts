import { Component, OnInit, ViewChild } from '@angular/core';
import { ListTempDto } from '../../models/listTemp.dto';
import { Table } from 'primeng/table'

@Component({
  selector: 'app-list-journalentries-generated',
  templateUrl: './list-journalentries-generated.component.html',
  styleUrls: ['./list-journalentries-generated.component.css']
})


export class ListJournalentriesGeneratedComponent implements OnInit {
  

  listTempDto!: ListTempDto[];
  
  

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  

  ngOnInit(): void {
    this.listTempDto = [
      {
        client: 'Cliente 1',
        status: 'En Revisión',
        documentType: 'Factura',
        totalimport: 100.5,
        date: '2023-09-13',
        note: 'Nota para Cliente 1'
      },
      {
        client: 'Cliente 2',
        status: 'Aprobado',
        documentType: 'Recibo',
        totalimport: 75.0,
        date: '2023-09-14',
        note: 'Nota para Cliente 2'
      },
      {
        client: 'Cliente 3',
        status: 'Rechazado',
        documentType: 'Factura',
        totalimport: 200.0,
        date: '2023-09-15',
        note: 'Nota para Cliente 3'
      }
    ];

  }

  getSeverity(status: string) {
    switch (status) {
      case 'Aprobado':
        return 'success';
      case 'En Revisión':
        return 'warning';
      case 'Rechazado':
        return 'danger';
      default:
        return 'success';
    }
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  } 
}
