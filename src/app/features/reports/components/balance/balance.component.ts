import { Component } from '@angular/core';
import { ReportsService } from 'src/app/core/services/reports.service';
import { TrialBalanceReportDto } from '../../models/trial-balance-report.dto';
import { TrialBalanceReportDataDto } from '../../models/trial-balance-report-data.dto';
import { addDays, format } from 'date-fns';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent {
  cuentas!: TrialBalanceReportDto;
  alltransactions: TrialBalanceReportDataDto[] = []; // Aquí declaramos alltransactions
  transaction!: TrialBalanceReportDataDto;
  fechaInicial: Date=new Date(); // Aquí declaramos fechaInicial
  fechaFinal: Date=addDays(new Date(), 1);; // Aquí declaramos fechaFinal

  constructor(private reportsService:ReportsService) { }

  ngOnInit(): void {
    this.obtenertransacciones();

  }

  onSearch(event: any) {
    // Aquí puedes implementar la lógica para buscar en tus cuentas.
  }

  obtenertransacciones() {
    this.reportsService.getTrialBalances(1, format(this.fechaInicial, 'yyyy-MM-dd'), format(this.fechaFinal, 'yyyy-MM-dd')).subscribe({
      next: (response) => {
        console.log(response);
        this.alltransactions = response.data!.reportData;
        this.transaction = this.alltransactions[0];
        console.log(this.cuentas);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    })
    // Aquí puedes implementar la lógica para obtener las cuentas.
  }

}
