import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';
import { ValuesService } from 'src/app/core/services/values/values.service';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    providers: [MessageService]
})
export class NavbarComponent {
    items: MenuItem[] | undefined;
    pfpUrl: string = '';

    constructor(private messageService: MessageService, private valuesService: ValuesService, private keycloakService: KeycloakService, private userService: UserService) { }

    ngOnInit() {
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
