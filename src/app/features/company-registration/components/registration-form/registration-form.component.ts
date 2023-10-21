import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CompanyDto} from "../../../company/models/company.dto";
import {CompanyService} from "../../../../core/services/company.service";
import {MessageService} from "primeng/api";
import {CompanyAbstractDto} from "../../models/company-abstract.dto";

interface typeOfCompany {
  name: string;
  code?: string;
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
    companyId = Number(localStorage.getItem('companyId'))

    companyData!: CompanyAbstractDto;

    businessEntities: any = [];
    industries: any = [];
    selectedBusinessEntity: any;
    selectedIndustry: any;

    companyName: string = '';
    companyNit: string = '';
    companyAddress: string = '';
    companyPhoneNumber: string = '';

    constructor(private router: Router, private companyService: CompanyService, private messageService: MessageService, private route: Router) { }

  ngOnInit() {
      if (this.companyId > 0) {
          this.router.navigate(['/home']);
      }
      this.companyService.getBusinessEntities().subscribe({
          next: (data) => {
              if (data.data != null) {
                  // Parsing the data
                  this.businessEntities = data.data.map((businessEntity) => ({
                      name: businessEntity.businessEntityName,
                      code: businessEntity.businessEntityId
                  }));
              }
          },
          error: (error) => {
              console.log(error);
          }
      });
      this.companyService.getIndustries().subscribe({
          next: (data) => {
              if (data.data != null) {
                  // Parsing the data
                  this.industries = data.data.map((industry) => ({
                      name: industry.industryName,
                      code: industry.industryId
                  }));
              }
          },
          error: (error) => {
              console.log(error);
          }
      });
  }

    save() {
            //Fill the company data updated
            this.companyData= {
                companyName: this.companyName,
                companyNit: this.companyNit,
                companyAddress: this.companyAddress,
                phoneNumber: this.companyPhoneNumber,
                s3CompanyLogoId: 1,
                industryId: this.selectedIndustry.code,
                businessEntityId: this.selectedBusinessEntity.code,
            }

            this.companyService.createCompany(this.companyData).subscribe({
                next: (response) => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La compañia se creo correctamente' });
                    this.route.navigate(['/home']);
                },
                error: (error) => {
                    // Maneja errores aquí si es necesario
                    console.error(error);
                }
            });

    }
}
