import { Component } from '@angular/core';
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

    constructor(private messageService: MessageService, private valuesService: ValuesService) { }

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
            this.pfpUrl = data.profilePicture;
        })
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    }

}
