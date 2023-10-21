import { Component } from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {map} from "rxjs";
import {UserDto} from "../../../user-accounts/models/user.dto";
import {CompanyService} from "../../../../core/services/company.service";

@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.css']
})
export class CompanySelectComponent {
  constructor(private userService: UserService, private companyService: CompanyService) {}
  companies: any = [];
  selectedCompany: any;

  selectCompany() {
    localStorage.setItem('companyId', this.selectedCompany.code);
    //Redireccionar a la pagina de inicio
    window.location.href = '/home';

  }

  ngOnInit() {
    this.userService.getUserById().subscribe({
      next: (data) => {
        if (data.data != null) {
          //Recorrer el arreglo de empresas y agregarlas al arreglo de companies
          console.log(data.data.companyIds);
          data.data.companyIds.forEach((company: any) => {
            this.getCompanyName(company);
          });
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getCompanyName(companyId: number){
    // @ts-ignore
    this.companyService.getCompanyInfo(companyId).subscribe({
      next: (data) => {
        if (data.data != null) {
          this.companies.push({
            name: data.data.companyName,
            code: companyId
          });
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
