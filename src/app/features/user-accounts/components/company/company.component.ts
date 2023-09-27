import { Component, OnInit, inject } from '@angular/core';
import { CompanyInfoService } from 'src/app/core/services/company-info.service';
import { CompanyData } from '../../models/CompanyData.dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{

  companyinfoservice = inject(CompanyInfoService);
  messageService = inject(MessageService);

  // crea un objeto company data con los datos de la empresa

  companyData: CompanyData = {
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

  


  ngOnInit(): void {
    this.companyinfoservice.getCompanyInfo(1).subscribe((data) => {
      console.log(data);
      console.log(data.businessEntity);
      this.companyData = data;
    });
  }
  
  saveCompanyData(): void {
    
    this.companyinfoservice.updateCompanyInfo(this.companyData, 1).subscribe(
      (response) => {
        console.log(response);
  
        // Verifica si la respuesta tiene un código 200 (OK)
        if (response.status === 200) {
          // Muestra el mensaje de éxito
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tus datos se guardaron correctamente' });
        }
      },
      (error) => {
        // Maneja errores aquí si es necesario
        console.error(error);
      }
    );
  
    console.log(this.companyData);
  
    }
}
