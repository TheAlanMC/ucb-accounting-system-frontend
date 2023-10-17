import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AttachmentDto} from "../../models/attachment.dto";

@Component({
  selector: 'app-attachments-section',
  templateUrl: './attachments-section.component.html',
  styleUrls: ['./attachments-section.component.css'],
})
export class AttachmentsSectionComponent {

  @Input() attachmentsList: AttachmentDto[] = [];

  downloadFile(fileUrl: string, filename: string, contentType: string) {
    fetch(fileUrl).then(res => res.blob()).then(blob => {
      // Create a new blob object using the response data of the onload object
      const blobData = new Blob([blob], {type: contentType});
      // Create a link element
      const anchor = document.createElement('a');
      // Create a reference to the object URL
      anchor.href = window.URL.createObjectURL(blobData);
      // Set the filename that will be downloaded
      anchor.download = `${filename}`;
      // Trigger the download by simulating click
      anchor.click();
      // Revoking the object URL to free up memory
      window.URL.revokeObjectURL(anchor.href);
    });
  }
}
