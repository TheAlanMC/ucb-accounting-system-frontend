import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService]
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}
    
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
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    }

}
