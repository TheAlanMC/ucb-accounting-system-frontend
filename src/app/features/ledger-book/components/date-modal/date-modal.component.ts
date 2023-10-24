import { Component } from '@angular/core';

@Component({
  selector: 'app-date-modal',
  templateUrl: './date-modal.component.html',
  styleUrls: ['./date-modal.component.css']
})
export class DateModalComponent {
  dateTo!: Date;
  dateFrom!: Date;

}
