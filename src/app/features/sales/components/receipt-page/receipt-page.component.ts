import { Component, ViewChild } from '@angular/core';
import { AttachmentsSectionComponent } from '../attachments-section/attachments-section.component';
import { CustomerService } from 'src/app/core/services/customer.service';
import { MessageService } from 'primeng/api';
import { PaymentTypeService } from 'src/app/core/services/payment-type.service';
import { SalesService } from 'src/app/core/services/sales.service';
import { FilesService } from 'src/app/core/services/files.service';
import { forkJoin } from 'rxjs';
import { AttachmentDto } from 'src/app/core/models/attachment.dto';
import { PaymentDto } from '../../models/payment.dto';
import { format } from 'date-fns';
import { PaymentDetailDto } from '../../models/payment-detail.dto';
import {Location} from "@angular/common";

@Component({
  selector: 'app-receipt-page',
  templateUrl: './receipt-page.component.html',
  styleUrls: ['./receipt-page.component.css'],
  providers: [MessageService]
})
export class ReceiptPageComponent {
  @ViewChild(AttachmentsSectionComponent) attachmentsComponent!: AttachmentsSectionComponent; // Obtén una referencia al componente hijo

  constructor(private customerService: CustomerService, private paymentTypeService: PaymentTypeService, private salesService: SalesService, private filesService: FilesService ,private messageService: MessageService, private location: Location) { }
  ngOnInit(): void{
    this.getNextReceiptNumber()
    this.getAllCustomers()
    this.getAllPaymentTypes()
    this.getSubaccounts()

  }

  // Variables
  companyId = Number(localStorage.getItem('companyId'));
  importeRecibido: number = 0;
  referenceNumber: string = '';
  paymentNumber: number = 0;
  dateValue!: Date;
  description: string = ' ';
  filesDetails: any[] = []; //Files from component - attachments section
  attachments: AttachmentDto[] = []; //Files to send to the service
  customers:any = [];
  paymentTypes: any = [];
  paymentSubaccounts: any = [];
  selectedCustomer: any;
  selectedPaymentType: any;
  selectedPaymentSubaccount: any;
  payment!: PaymentDto;



  //Retrieve the data from the child component - attachments section
  retrieveAttachments(attachments: any[]) {
    // console.log(attachments)
    this.filesDetails = attachments;
  }


  createReceipt(){
    if(this.validateData()){
      //Getting the attachments from the child component - attachments section
      this.attachmentsComponent.sendAttachments();

      if(this.attachmentsComponent.uploadedFiles.length == 0){
        this.uploadPayment()
      }else{
        //Upload files
        //Calling service - each file
        const uploadObservables = this.attachmentsComponent.uploadedFiles.map((file) => {
          const formData = new FormData();
          formData.append('attachment', file);
          return this.filesService.uploadFile(this.companyId, formData);
        });
        forkJoin(uploadObservables).subscribe({
          next: (responses) => {
            // console.log("Todos los archivos se han subido correctamente");
            // console.log(responses);
            // Se asigna los datos de los archivos subidos a 'this.attachments'.
            this.attachments = responses.map((data: any) => ({
              attachmentId: data.data.attachmentId,
              contentType: data.data.contentType,
              filename: data.data.filename
            }));
            console.log(this.attachments);
            this.uploadPayment()
          },
          error: (error) => {
            // console.log("Hubo un error al subir los archivos");
            // console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear la factura, intente nuevamente' });
          }
        });
      }
    }



  }
  uploadPayment(){
    //Payment details
    var paymentDetail: PaymentDetailDto = {
      subaccountId: this.selectedPaymentSubaccount.code,
      amountBs: this.importeRecibido
    }
    //Payment Dto
    this.payment = {
      paymentNumber: this.paymentNumber,
      reference: this.referenceNumber,
      clientId: this.selectedCustomer.code,
      paymentTypeId: this.selectedPaymentType.code,
      gloss: this.description,
      description: this.description,
      paymentDate: new Date(format(new Date(this.dateValue), 'yyyy-MM-dd')),
      attachments: this.attachments,
      paymentDetail: paymentDetail
    }

    console.log(this.payment)

    //Calling service
    this.salesService.createPaymentSale(this.companyId, this.payment).subscribe({
      next: (data) => {
        //console.log(data);
        //console.log("Se creoo");
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Recibo guardado correctamente' });
        //Esperar 1 segundo para redirigir
        setTimeout(() => {
          this.goBack();
        }, 1000);
      },
      error: (error) => {
        // console.log(error);
        // console.log("Hubo un error al crear el asiento");
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear el recibo, intente nuevamente' });
      }
    });

  }

  //Get all the customers
  getAllCustomers(){
    this.customerService.getAllCustomers(this.companyId).subscribe({
      next: (data) => {
        if(data.data != null){
          //Parsing the data
          this.customers = data.data.map((customer) => ({
            name: customer.displayName,
            code: customer.customerId
          }));
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  //Get all the payment types
  getAllPaymentTypes(){
    this.paymentTypeService.getAllPaymentTypes().subscribe({
      next: (data) => {
        if(data.data != null){
          //Parsing the data
          this.paymentTypes = data.data.map((paymentType) => ({
            name: paymentType.paymentTypeName,
            code: paymentType.paymentTypeId
          }));
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  //Get all the subaccounts used for payments
  getSubaccounts(){
    this.salesService.getPaymentSubaccounts(this.companyId).subscribe({
      next: (data) => {
        if(data.data != null){
          //Parsing the data
          this.paymentSubaccounts = data.data.map((subaccount) => ({
            name: subaccount.subaccountName,
            code: subaccount.subaccountId
          }));
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  //Get next receipt number
  getNextReceiptNumber(){
    this.salesService.getLastPaymentNumber(this.companyId).subscribe({
      next: (data) => {
        if(data.data != null){
          this.paymentNumber = data.data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  //Validate the data and empty fields
  validateData(){
    if(this.selectedCustomer == null){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe seleccionar un cliente'});
      return false;
    }
    if(this.selectedPaymentType == null){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe seleccionar un método de pago'});
      return false;
    }
    if(this.selectedPaymentSubaccount == null){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe seleccionar una cuenta'});
      return false;
    }
    if(this.dateValue == null){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe seleccionar una fecha'});
      return false;
    }
    if(this.referenceNumber == ''){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe ingresar un número de referencia'});
      return false;
    }
    if(this.importeRecibido == 0){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe ingresar un importe'});
      return false;
    }
    return true;
  }

  goBack(): void {
    this.location.back();
  }

}
