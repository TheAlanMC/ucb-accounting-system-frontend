import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import {TransactionDto} from "../../models/transaction.dto";
import {JournalEntryService} from "../../../../core/services/journal-entry.service";
import {Router} from "@angular/router";
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-list-journalentries-generated',
  templateUrl: './journal-entries-list.component.html',
  styleUrls: ['./journal-entries-list.component.css']
})


export class JournalEntriesListComponent implements OnInit {

  companyId = Number(localStorage.getItem('companyId'));
  transactions: TransactionDto[] = [];
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
  isLoading: boolean = true;

  private searchSubject = new Subject<string>();
  onNavbarToggle(isOpen: boolean) {
    this.isNavbarOpen = isOpen;
    this.sidebarService.setIsOpen(this.isNavbarOpen);
    console.log(this.isNavbarOpen);

  }
  constructor(private sidebarService: SidebarService, private journalEntryService: JournalEntryService, private router: Router) {
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

  getSeverity(status: boolean) {
    return status ? 'success' : 'warn';
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  }

  onPageChange(event: any) {
    var first = event.first;
    var rows = event.rows;
    this.page = Math.floor(first / rows);
    this.size = rows;
    // console.log(event);
    this.getAllTransactions();
  }

  onSortChange(event: any) {
    this.sortBy = event.field;
    this.sortType = (event.order == 1) ? 'asc' : 'desc';
    this.getAllTransactions();
  }

  getAllTransactions(){
    this.isLoading = true;
    this.journalEntryService.getAllTransactions(this.companyId, this.sortBy, this.sortType,this.page, this.size, this.searchTerm ).subscribe({
      next: (data) => {
        this.transactions = data.data!;
        // console.log(data);
        this.totalElements = data.totalElements!;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    })
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
