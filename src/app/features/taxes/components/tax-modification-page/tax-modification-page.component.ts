import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tax-modification-page',
  templateUrl: './tax-modification-page.component.html',
  styleUrls: ['./tax-modification-page.component.css']
})
export class TaxModificationPageComponent {
  nuevoImpuestoForm: FormGroup;
  editing = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.nuevoImpuestoForm = this.formBuilder.group({
      Fecha_de_Creacion: '',
      Nombre_de_Impuesto: '',
      No: '',
      Tasa_Actual_del_Impuesto: '',
    });
  }

  onSubmit() {
    console.log('Guardar impuesto', this.nuevoImpuestoForm.value);
    this.router.navigate(['/tax-home-page']);
  }

  descartar() {
    console.log('Descartar cambios');
    this.router.navigate(['/tax-home-page']);
  }

  editar() {
    this.editing = true;
  }

  guardar() {
    this.editing = false;
    // Aquí puedes implementar la lógica para guardar los cambios
    console.log('Guardar cambios', this.nuevoImpuestoForm.value);
  }
}

