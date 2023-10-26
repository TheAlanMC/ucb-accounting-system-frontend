import { Component } from '@angular/core';
import { da } from 'date-fns/locale';
import { LedgerBookService } from 'src/app/core/services/values/ledger-book.service';

@Component({
  selector: 'app-date-modal',
  templateUrl: './date-modal.component.html',
  styleUrls: ['./date-modal.component.css']
})
export class DateModalComponent {
  dateTo!: Date;
  dateFrom!: Date;

  constructor(private ledgerBookService: LedgerBookService) { }

  updateDateTo(event: any){
    console.log(event);
    this.ledgerBookService.setdateTo(event);
  }

  updateDateFrom(event: any){
    console.log(event);
    this.ledgerBookService.setdateFrom(event);
  }

}
