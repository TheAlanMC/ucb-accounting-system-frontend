import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AttachmentDto} from "../../../journal-entry/models/attachment.dto";

@Component({
  selector: 'app-attachments-section',
  templateUrl: './attachments-section.component.html',
  styleUrls: ['./attachments-section.component.css'],
})
export class AttachmentsSectionComponent {
    //Object emmited to the parent component
    @Input() attachments: AttachmentDto[] = [];
    //Variables
    uploadedFiles: any[] = [];
    isDragging: boolean = false;

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


