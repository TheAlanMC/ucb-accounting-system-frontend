import { Component, OnInit } from '@angular/core';

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
  types: typeOfCompany[] | undefined;

  selectedType: typeOfCompany | undefined;

  ngOnInit() {
      this.types = [
          { name: 'Comerciante Unico'},
          { name: 'Sociedad' },
          { name: 'Empresa' },
          { name: 'Otro' },
      ];
  }
}