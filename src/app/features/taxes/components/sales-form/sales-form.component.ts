import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})
export class SalesFormComponent {
  nuevaVentaForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.nuevaVentaForm = this.formBuilder.group({
      Fecha_de_Creacion: '',
      Importe_total: '',
      Notas: '',
      Producto: '',
      Cantidad: '',
      Precio_Unitario: ''
    });
  }

  onSubmit() {
    // Aquí puedes implementar la lógica para guardar la nueva venta
    console.log('Guardar venta', this.nuevaVentaForm.value);
    this.router.navigate(['/daily-journal-page']);
  }

  descartar() {
    // Aquí puedes implementar la lógica para descartar los cambios
    console.log('Descartar cambios');
    this.router.navigate(['/daily-journal-page']);
  }
}
