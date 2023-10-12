import {Component, ViewChild} from '@angular/core';
import {MessageService} from "primeng/api";
import {AttachmentsSectionComponent} from "../attachments-section/attachments-section.component";
import {SupplierService} from "../../../../core/services/supplier.service";
import {PaymentTypeService} from "../../../../core/services/payment-type.service";
import {ExpensesService} from "../../../../core/services/expenses.service";
import {FilesService} from "../../../../core/services/files.service";
import {AttachmentDto} from "../../../journal-entry/models/attachment.dto";
import {PaymentDto} from "../../models/payment.dto";
import {forkJoin} from "rxjs";
import {PaymentDetailDto} from "../../models/payment-detail.dto";
import {format} from "date-fns";

@Component({
  selector: 'app-receipt-page',
  templateUrl: './receipt-page.component.html',
  styleUrls: ['./receipt-page.component.css'],
  providers: [MessageService]
})
export class ReceiptPageComponent {
  @ViewChild(AttachmentsSectionComponent) attachmentsComponent!: AttachmentsSectionComponent; // Obtén una referencia al componente hijo

  constructor(private supplierService: SupplierService, private paymentTypeService: PaymentTypeService, private expensesService: ExpensesService, private filesService: FilesService ,private messageService: MessageService) { }
  ngOnInit(): void{
    this.getNextReceiptNumber()
    this.getAllSuppliers()
    this.getAllPaymentTypes()
    this.getSubaccounts()

  }

  // Variables
  importeRecibido: number = 0;
  referenceNumber: string = '';
  paymentNumber: number = 0;
  dateValue!: Date;
  description: string = ' ';
  filesDetails: any[] = []; //Files from component - attachments section
  attachments: AttachmentDto[] = []; //Files to send to the service
  suppliers:any = [];
  paymentTypes: any = [];
  paymentSubaccounts: any = [];
  selectedSupplier: any;
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
          return this.filesService.uploadFile(1, formData);
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
      clientId: this.selectedSupplier.code,
      paymentTypeId: this.selectedPaymentType.code,
      gloss: this.description,
      description: this.description,
      paymentDate: new Date(format(new Date(this.dateValue), 'yyyy-MM-dd')),
      attachments: this.attachments,
      paymentDetail: paymentDetail
    }

    console.log(this.payment)

    //Calling service
    this.expensesService.createPaymentExpense(1, this.payment).subscribe({
      next: (data) => {
        //console.log(data);
        //console.log("Se creoo");
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Recibo guardado correctamente' });
      },
      error: (error) => {
        // console.log(error);
        // console.log("Hubo un error al crear el asiento");
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear el recibo, intente nuevamente' });
      }
    });

  }

  //Get all the suppliers
  getAllSuppliers(){
    this.supplierService.getAllSuppliers(1).subscribe({
      next: (data) => {
        if(data.data != null){
          //Parsing the data
          this.suppliers = data.data.map((supplier) => ({
            name: supplier.displayName,
            code: supplier.supplierId
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
    this.expensesService.getPaymentSubaccounts(1).subscribe({
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
    this.expensesService.getLastPaymentNumber(1).subscribe({
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
    if(this.selectedSupplier == null){
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


}
