import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {debounceTime, Subject} from "rxjs";
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';


interface Reporte {
  fecha: string;
  nombreReporte: string;
  tipoReporte: string;
  usuario: string;
  estado: string;
}

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})

export class ReportListComponent {
  
  companyId = Number(localStorage.getItem('companyId'));
  startDate: Date | undefined;  // Variable para la fecha de inicio
  endDate: Date | undefined;
  transactions: Reporte[] = [
    {
      fecha: "2023-10-26 16:05",
      nombreReporte: "Reporte Trimestral",
      tipoReporte: "Balance General",
      usuario: "Usuario123",
      estado: "Generado"
    },
    {
      fecha: "2023-10-25 16:05",
      nombreReporte: "Reporte Mensual",
      tipoReporte: "Estado de Resultados",
      usuario: "Usuario456",
      estado: "Pendiente"
    },
    {
      fecha: "2023-10-24 16:05",
      nombreReporte: "Informe Anual",
      tipoReporte: "Balance General",
      usuario: "Usuario789",
      estado: "Generado"
    },
    {
      fecha: "2023-10-23 16:05",
      nombreReporte: "Reporte Semestral",
      tipoReporte: "Balance General",
      usuario: "Usuario123",
      estado: "Generado"
    },
    {
      fecha: "2023-10-22 16:05",
      nombreReporte: "Reporte Trimestral",
      tipoReporte: "Estado de Resultados",
      usuario: "Usuario456",
      estado: "Pendiente"
    },
    {
      fecha: "2023-10-21 16:05",
      nombreReporte: "Informe Anual",
      tipoReporte: "Balance General",
      usuario: "Usuario789",
      estado: "Generado"
    },
    {
      fecha: "2023-10-20 16:05",
      nombreReporte: "Reporte Semestral",
      tipoReporte: "Balance General",
      usuario: "Usuario123",
      estado: "Generado"
    }
  ];
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  isNavbarOpen : boolean = false;
  searchTerm: string = '';


  // Pagination variables
  sortBy: string = 'journalEntryId';
  sortType: string = 'asc';
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;

  private searchSubject = new Subject<string>();
  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    this.sidebarService.setIsOpen(this.isNavbarOpen);
    console.log(this.isNavbarOpen);

  }
  constructor(private sidebarService: SidebarService, private router: Router) {
    this.sidebarService.getIsOpen().subscribe((isOpen) => {
      this.isNavbarOpen = isOpen;
      console.log(this.isNavbarOpen);
    });
  }

  ngOnInit(): void {
    this.getAllTransactions()
    this.searchSubject.pipe(debounceTime(500)).subscribe(() => {
      // When the user has stopped typing for 500 milliseconds, trigger the getAllTransactions method
      this.getAllTransactions();
    });
  }

  generateList(){

  }

  getSeverity(status: boolean) {
    return status ? 'success' : 'warn';
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  }

  onPageChange(event: any) {
    this.page = event.page;
    this.size = event.rows;
    // console.log(event);
    this.getAllTransactions();
  }

  onSortChange(event: any) {
    this.sortBy = event.field;
    this.sortType = (event.order == 1) ? 'asc' : 'desc';
    this.getAllTransactions();
  }

  getAllTransactions(){
    /*this.journalEntryService.getAllTransactions(this.companyId, this.sortBy, this.sortType,this.page, this.size, this.searchTerm ).subscribe({
      next: (data) => {
        this.transactions = data.data!;
        // console.log(data);
        this.totalElements = data.totalElements!;
      },
      error: (error) => {
        console.log(error);
      }
    })*/
  }

  onViewDetail(journalEntryId: number){
  //   router
    this.router.navigate([`/transactions/${journalEntryId}`]);
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.searchSubject.next(this.searchTerm);
  }
}
