import { Component, ElementRef, Renderer2 } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
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

    constructor(private sidebarService: SidebarService, private valuesService: ValuesService, private keycloakService: KeycloakService, private userService: UserService) { 
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
                label: 'Su empresa',
                items: [
                    {
                        label: 'Información de la empresa',
                        icon: 'pi pi-info-circle',
                        routerLink: ['/company']
                    },
                    {
                        label: 'Usuarios',
                        icon: 'pi pi-users',
                        routerLink: ['/company/users']
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
