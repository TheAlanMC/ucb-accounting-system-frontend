import { Component, OnInit, ViewChild } from '@angular/core';
import { ListTempDto } from '../../models/listTemp.dto';
import { Table } from 'primeng/table'
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { is } from 'date-fns/locale';

@Component({
  selector: 'app-list-journalentries-generated',
  templateUrl: './journal-entries-list.component.html',
  styleUrls: ['./journal-entries-list.component.css']
})


export class JournalEntriesListComponent implements OnInit {
  

  listTempDto!: ListTempDto[];
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  isNavbarOpen : boolean = false;

  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    this.sidebarService.setIsOpen(this.isNavbarOpen);
    console.log(this.isNavbarOpen);
    
  }
  constructor(private sidebarService: SidebarService) { 
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
      console.log(this.isNavbarOpen);
    });
  }

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
