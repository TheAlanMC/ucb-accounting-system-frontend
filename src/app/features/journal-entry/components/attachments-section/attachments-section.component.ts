import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-attachments-section',
  templateUrl: './attachments-section.component.html',
  styleUrls: ['./attachments-section.component.css'],
})
export class AttachmentsSectionComponent {
    //Object emmited to the parent component
    @Output() attachmentsEmmited = new EventEmitter<any[]>();

    //Variables
    uploadedFiles: any[] = [];
    isDragging: boolean = false;

    //Send data to the parent component
    sendAttachments(){
      this.attachmentsEmmited.emit(this.uploadedFiles);
    }

    // Manejar la selección de archivos
    onFileToUpload(event: any) {
      this.uploadedFiles = event.files;
    }
    
    onFileRemoved(event: any) {
      this.uploadedFiles = this.uploadedFiles.filter(file => file.name !== event.file.name);
    }

    // Drag and drop
    onDragOver(event: any) {
      event.preventDefault();
      this.isDragging = true;
    }

    onDragLeave(event: any) {
      event.preventDefault();
      this.isDragging = false;
    }

    onDrop(event: any) {
      event.preventDefault();
      this.isDragging = false;
    }

}


