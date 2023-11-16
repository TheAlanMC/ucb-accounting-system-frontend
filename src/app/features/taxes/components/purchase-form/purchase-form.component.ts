import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.css']
})
export class PurchaseFormComponent {
  nuevaCompraForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.nuevaCompraForm = this.formBuilder.group({
      Fecha_de_Creacion: '',
      Proveedor: '',
      Tipo_de_documento: '',
      Importe_total: '',
      Nota: '',
      Productos: '',
      Cantidad: '',
      Precio_Unitario: ''
    });
  }

  onSubmit() {
    // Aquí puedes implementar la lógica para guardar la nueva compra
    console.log('Guardar compra', this.nuevaCompraForm.value);
    this.router.navigate(['/daily-journal-page']);
  }

  descartar() {
    // Aquí puedes implementar la lógica para descartar los cambios
    console.log('Descartar cambios');
    this.router.navigate(['/daily-journal-page']);
  }
}
