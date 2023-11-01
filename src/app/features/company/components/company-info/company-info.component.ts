import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company.service';
import { CompanyDto} from '../../models/company.dto';
import { MessageService } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';
import { CompanyAbstractDto } from 'src/app/features/company-registration/models/company-abstract.dto';
import { FilesService } from 'src/app/core/services/files.service';
import { Location } from '@angular/common';
import {BusinessEntityDto} from "../../models/business-entity.dto";

@Component({
  selector: 'app-company',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})

export class CompanyInfoComponent implements OnInit {
  constructor(private companyService: CompanyService, private messageService: MessageService, private filesService: FilesService, private location: Location) { }
  companyId = Number(localStorage.getItem('companyId'));
  imageChanged: boolean = false;
  previewImage: string | ArrayBuffer | null = null;
  file: File | null = null;
  companyData!: CompanyDto;
  companyUpdated!: CompanyAbstractDto;
  s3Id: number | null = null;
  businessEntities: any = [];
  industries: any = [];
  selectedBusinessEntity: any;
  selectedIndustry: any;
  ngOnInit(): void {
    this.companyService.getCompanyInfo(this.companyId).subscribe((data) => {
      this.companyData = data.data!;
      this.selectedIndustry = {
        name: this.companyData.industry?.industryName,
        code: this.companyData.industry?.industryId
      };
      this.selectedBusinessEntity = {
        name: this.companyData.businessEntity?.businessEntityName,
        code: this.companyData.businessEntity?.businessEntityId
      }
    });
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

  save(): void {
    if(this.imageChanged){
      if (this.file) {
        const formData = new FormData();
        formData.append('picture', this.file);
        this.filesService.uploadPicture(formData).subscribe({
          next: (response) => {
            this.s3Id = response.data!.s3ObjectId;
            this.saveCompanyData();
          },
          error: (error) => {
            // Maneja errores aquí si es necesario
            console.error(error);
          }
        });
      }
    }else{
      this.saveCompanyData();
    }
  }

  saveCompanyData(){
    //Fill the company data updated
    this.companyUpdated = {
      companyName: this.companyData.companyName,
      companyNit: this.companyData.companyNit,
      companyAddress: this.companyData.companyAddress,
      phoneNumber: this.companyData.phoneNumber,
      //si el campo esta vacio, se envia el valor del objeto anterior
      s3CompanyLogoId: this.s3Id,
      industryId: this.selectedIndustry.code,
      businessEntityId: this.selectedBusinessEntity.code,
    }


    this.companyService.updateCompany(this.companyUpdated, this.companyId).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tus datos se guardaron correctamente' });
      },
      error: (error) => {
        // Maneja errores aquí si es necesario
        console.error(error);
      }
    });
  }




  onFileSelected2(event: any) {
    this.file = event.target.files[0];
    this.imageChanged = true;
    if (this.file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        this.companyData.companyLogo = e.target.result;
      };

      reader.readAsDataURL(this.file);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
