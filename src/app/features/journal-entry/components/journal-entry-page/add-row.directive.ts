import { Directive, HostListener, Input } from "@angular/core";
import { Table } from "primeng/table";


@Directive({
    selector: '[pAddRow]'
})
export class AddRowDirective {
    @Input() table!: Table;
    @Input() newRow: any;
    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.table.value.push(this.newRow);
        this.table.initRowEdit(this.newRow);
        event.preventDefault();
    }
}