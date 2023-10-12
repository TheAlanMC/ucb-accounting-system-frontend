import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart-of-accounts-addaccount',
  templateUrl: './chart-of-accounts-addaccount.component.html',
  styleUrls: ['./chart-of-accounts-addaccount.component.css']
})
export class ChartOfAccountsAddaccountComponent {
  nuevaCuentaForm: FormGroup;
  niveles = [
    // Aquí puedes agregar los niveles que quieras
    { label: 'Grupo', value: '1' },
    { label: 'Subgrupo', value: '2' },
    // ...
  ];
  estados = [
    // Aquí puedes agregar los estados que quieras
    { label: 'Activo', value: 'activo' },
    { label: 'Inactivo', value: 'inactivo' },
    // ...
  ];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.nuevaCuentaForm = this.formBuilder.group({
      nivel: '',
      codigo: '',
      nombre: '',
      estado: ''
    });
  }

  onSubmit() {
    // Aquí puedes implementar la lógica para guardar la nueva cuenta
    console.log('Guardar cuenta', this.nuevaCuentaForm.value);
    this.router.navigate(['/chart-of-accounts-page']);
  }

  descartar() {
    // Aquí puedes implementar la lógica para descartar los cambios
    console.log('Descartar cambios');
    this.router.navigate(['/chart-of-accounts-page']);
  }
}
