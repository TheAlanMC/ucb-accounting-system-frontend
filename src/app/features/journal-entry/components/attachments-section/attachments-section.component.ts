import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-attachments-section',
  templateUrl: './attachments-section.component.html',
  styleUrls: ['./attachments-section.component.css'],
  providers: [MessageService]
})
export class AttachmentsSectionComponent {
    //Object emmited to the parent component
    @Output() attachmentsEmmited = new EventEmitter<any[]>();

    //Variables
    uploadedFiles: any[] = [];

    //Send data to the parent component
    sendAttachments(){
      this.attachmentsEmmited.emit(this.uploadedFiles);
    }

    constructor(private messageService: MessageService) {}
    // Manejar la selección de archivos
    onFileSelect(event: any) {
      for (let file of event.files) {
        this.uploadedFiles.push(file);
      }
    }
    
    onFileRemoved(event: any) {
      this.uploadedFiles = this.uploadedFiles.filter(file => file.name !== event.file.name);
    }
}


