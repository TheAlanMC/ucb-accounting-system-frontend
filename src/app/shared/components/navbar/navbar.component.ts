import { Component, ElementRef, Renderer2 } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SidebarProfileService } from 'src/app/core/services/sidebar-profile/sidebar-profile.service';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';
import { UserService } from 'src/app/core/services/user.service';
import { ValuesService } from 'src/app/core/services/values/values.service';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    providers: [MessageService]
})
export class NavbarComponent {
    backgroundColor: string = '';
    items: MenuItem[] | undefined;
    pfpUrl: string = '';

    constructor(private sidebarProfileService: SidebarProfileService, 
        private sidebarService: SidebarService,
        private valuesService: ValuesService,
         private keycloakService: KeycloakService, 
         private userService: UserService) { 
    }

    updateSidebarState(){
        this.sidebarProfileService.seleccionarOpcion('perfil');
    }
    
    ngOnInit() {
        
        this.backgroundColor = this.sidebarService.getBackgroundColor();
        if(this.backgroundColor == 'white'){
            this.backgroundColor = '#F3F6F6';
        }else{
            this.backgroundColor = 'white';
        }
        document.documentElement.style.setProperty('--color-navbar', this.backgroundColor);
        this.items = [
            {
                label: 'Manual de usuario',
                items: [
                    {
                        label: 'Introducción',
                        icon: 'pi pi-info-circle',
                        command: () => {
                          const rutaPDF = '/assets/manuales/Manual 1 - Introducción.pdf';
                          const urlPDF = window.location.origin + '/' + rutaPDF;
                          window.open(urlPDF, '_blank');
                        }
                    },
                    {
                        label: 'Ventas y Compras',
                        icon: 'pi pi-money-bill',
                        command: () => {
                          const rutaPDF = '/assets/manuales/Manual 2 - Ventas y Compras.pdf';
                          const urlPDF = window.location.origin + '/' + rutaPDF;
                          window.open(urlPDF, '_blank');
                        }                    
                    },
                    {
                        label: 'Contabilidad y Plan de cuentas',
                        icon: 'pi pi-percentage',
                        command: () => {
                          const rutaPDF = '/assets/manuales/Manual 3 - Contabilidad y Plan de cuentas.pdf';
                          const urlPDF = window.location.origin + '/' + rutaPDF;
                          window.open(urlPDF, '_blank');
                        }                    
                    },
                    {
                        label: 'Reportes',
                        icon: 'pi pi-file-pdf',
                        command: () => {
                          const rutaPDF = '/assets/manuales/Manual 4 - Reportes.pdf';
                          const urlPDF = window.location.origin + '/' + rutaPDF;
                          window.open(urlPDF, '_blank');
                        }
                    }
                ]
            },
        ];

        this.valuesService.getUserInfo().subscribe((data) => {
          if (data.profilePicture != null){
            this.pfpUrl = data.profilePicture;
          } else {
            this.userService.getUserById().subscribe((data) => {
              this.valuesService.setUser(data.data!);
              this.pfpUrl = data.data!.profilePicture!;
            })
          }
        })

        this.keycloakService.getToken().then((token) => {
            // console.log(token)
        })
    }

}
