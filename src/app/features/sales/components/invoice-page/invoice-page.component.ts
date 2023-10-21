import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/core/services/customer.service';
import { AttachmentDto } from 'src/app/core/models/attachment.dto';
import { InvoiceDetailDto } from '../../models/invoice-detail.dto';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { AttachmentsSectionComponent } from '../attachments-section/attachments-section.component';
import { forkJoin } from 'rxjs';
import { FilesService } from 'src/app/core/services/files.service';
import { InvoiceDto } from '../../models/invoice.dto';
import { format } from 'date-fns';
import { SalesService } from 'src/app/core/services/sales.service';
import { PaymentTypeService } from 'src/app/core/services/payment-type.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.css'],
  providers: [MessageService]
})
export class InvoicePageComponent {
  @ViewChild(TransactionTableComponent) transactionTableComponent!: TransactionTableComponent; // Obtén una referencia al componente hijo
  @ViewChild(AttachmentsSectionComponent) attachmentsComponent!: AttachmentsSectionComponent; // Obtén una referencia al componente hijo

  //Variables
  companyId = Number(localStorage.getItem('companyId'));
  invoiceNumber: number = 0;
  customers: any = [];
  paymentTypes: any = [];
  dateValue!: Date;
  description: string = ' ';
  filesDetails: any[] = []; //Files from component - attachments section
  attachments: AttachmentDto[] = []; //Files to send to the service
  transactionDetails: InvoiceDetailDto[] = []; //Transactions from component - transaction table, ready to send to the service
  gloss: string = ''; //Gloss from component - transaction table
  saldoAmount: number = 0;
  sale!: InvoiceDto;
  selectedCustomer: any;
  selectedPaymentType: any;

  //Retrieve the data from the child component - transaction table
  retrieveTransactionDetails(transactionDetails: InvoiceDetailDto[]) {
    console.log(transactionDetails)
    this.transactionDetails = transactionDetails;
  }
  //Retrieve the data from the child component - attachments section
  retrieveAttachments(attachments: any[]) {
    // console.log(attachments)
    this.filesDetails = attachments;
  }
  //Retrieve the gloss from the child component - transaction table
  retrieveGlossAndTotal(values: string[]) {
    this.gloss = values[0];
    this.saldoAmount = parseFloat(values[1]);
  }


  constructor(private messageService: MessageService, private customerService: CustomerService, private filesService: FilesService, private salesService: SalesService, private paymentTypeService: PaymentTypeService, private location: Location) { }
  ngOnInit(): void {
    this.getAllCustomers()
    this.getNextInvoiceNumber()
    this.getPaymentTypes()
  }


  getAllCustomers() {
    this.customerService.getAllCustomers(this.companyId).subscribe({
      next: (data) => {
        if (data.data != null) {
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

  getNextInvoiceNumber() {
    this.salesService.getLastInvoiceNumber(this.companyId).subscribe({
      next: (data) => {
        if (data.data != null) {
          this.invoiceNumber = data.data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  createInvoice() {
    //Getting the gloss from the child component - transaction table
    this.transactionTableComponent.sendGlossAndTotal();
    if (this.validateFields()) {
      //Getting the transactions from the child component - transaction table
      this.transactionTableComponent.sendTransactionDetails();

      //If there si empty transactions, return
      let emptyTransactions = false;
      for (let i = 0; i < this.transactionDetails.length; i++) {
        if (this.transactionDetails[i].subaccountId == 0 || this.transactionDetails[i].quantity == 0 || this.transactionDetails[i].unitPriceBs == 0 ) {
          emptyTransactions = true;
        }
      }
      if (emptyTransactions) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: '💡 No se puede crear la factura si hay filas vacias, elimínelas e intente nuevamente.' });
        return;
      }

      //Getting the attachments from the child component - attachments section
      this.attachmentsComponent.sendAttachments();


      if (this.attachmentsComponent.uploadedFiles.length == 0) {
        this.uploadSale()
      } else {
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
            this.uploadSale()
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

  uploadSale() {
    //Upload sale
    //Sale dto
    this.sale = {
      invoiceNumber: this.invoiceNumber,
      paymentTypeId: this.selectedPaymentType.code,
      clientId: this.selectedCustomer.code,
      gloss: this.gloss,
      description: this.description,
      invoiceDate: new Date(format(new Date(this.dateValue), 'yyyy-MM-dd')),
      attachments: this.attachments,
      invoiceDetails: this.transactionDetails
    }
    console.log(this.sale)
    //Calling service
    this.salesService.createInvoice(this.companyId, this.sale).subscribe({
      next: (data) => {
        //console.log(data);
        //console.log("Se creoo");
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Factura guardada correctamente' });
        //Esperar 1 segundo para redireccionar
        setTimeout(() => {
          this.goBack();
        }, 1000);
      },
      error: (error) => {
        // console.log(error);
        // console.log("Hubo un error al crear el asiento");
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al crear la factura, intente nuevamente' });
      }
    });
  }

  validateFields() {
    if (this.selectedCustomer == null || this.selectedCustomer == undefined) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor seleccione un cliente' });
      return false;
    }
    if(this.selectedPaymentType == null || this.selectedPaymentType == undefined) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor seleccione un tipo de pago' });
      return false;
    }
    if (this.dateValue == null || this.dateValue == undefined) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor seleccione una fecha' });
      return false;
    }
    return true;
  }

  getPaymentTypes() {
    this.paymentTypeService.getAllPaymentTypes().subscribe({
      next: (data) => {
        if (data.data != null) {
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

  goBack(): void {
    this.location.back();
  }
}
