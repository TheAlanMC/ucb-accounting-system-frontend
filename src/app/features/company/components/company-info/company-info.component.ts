import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company.service';
import { CompanyDto} from '../../models/company.dto';
import { MessageService } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';
import { CompanyAbstractDto } from 'src/app/features/company-registration/models/company-abstract.dto';
import { FilesService } from 'src/app/core/services/files.service';

@Component({
  selector: 'app-company',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})

export class CompanyInfoComponent implements OnInit {
  constructor(private companyService: CompanyService, private messageService: MessageService, private keycloakService: KeycloakService, private filesService: FilesService) { }

  imageChanged: boolean = false;
  previewImage: string | ArrayBuffer | null = null;
  file: File | null = null;

  companyData: CompanyDto = {
    industry: {
      industryId: 1,
      industryName: "Tecnologia"
    },
    businessEntity: {
      businessEntityId: 1,
      businessEntityName: "Empresa 1"
    },
    companyName: "Empresa 1",
    companyNit: "123456789",
    companyAddress: "Calle 1 # 1-1",
    phoneNumber: "123456789",
    companyLogo: "https://aidajerusalem.org/wp-content/uploads/2021/09/blank-profile-picture-973460_1280.png"
  };

  companyUpdated: CompanyAbstractDto | undefined;

  ngOnInit(): void {
    this.companyService.getCompanyInfo(1).subscribe((data) => {
      console.log(data);
      console.log(data.data);
      this.companyData = data.data!;
    });

    this.keycloakService.loadUserProfile().then((user) => {
      console.log(user);
    });
  }

  saveCompanyData(): void {

    if(this.imageChanged){
      this.saveImage();
    }

    //Fill the company data updated
    this.companyUpdated = {
      companyName: this.companyData.companyName,
      companyNit: this.companyData.companyNit,
      companyAddress: this.companyData.companyAddress,
      phoneNumber: this.companyData.phoneNumber,
      s3CompanyLogoId: 1, //TODO: Cambiar por el id del logo
      industryId: this.companyData.industry?.industryId,
      businessEntityId: this.companyData.businessEntity?.businessEntityId
    }

    this.companyService.updateCompany(this.companyUpdated, 1).subscribe(
      (response) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tus datos se guardaron correctamente' });
        
      },
      (error) => {
        // Maneja errores aquí si es necesario
        console.error(error);
      }
    );
    console.log(this.companyData);
  }

  
  saveImage(): void {
    
    // if (this.file) {
    //   this.filesService.uploadPicture(this.file).subscribe(
    //     (response) => {
    //       console.log(response);
    //       console.log("URL: "+response.body.data.fileUrl);
    //       this.companyData.companyLogo = response.body.data.fileUrl;
          
    //     },
    //     (error) => {
    //       // Maneja errores aquí si es necesario
    //       console.error(error);
    //     }
    //   );
    // }
    console.log(this.companyData);
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
}
