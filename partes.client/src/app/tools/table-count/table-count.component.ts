import { AfterViewChecked, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'table-count',
  imports: [],
  templateUrl: './table-count.component.html',
  styleUrl: './table-count.component.scss'
})
export class TableCountComponent implements AfterViewChecked{
   @Input() pTable: Table | null = null;

   constructor(private cdRef: ChangeDetectorRef) { }


   ngAfterViewChecked(): void {
       this.cdRef.detectChanges();
   }

  
   public Count(): string {
       let vCount: string = "0";


       if (this.pTable) {
           if (this.pTable.hasFilter() && this.pTable.filteredValue) {
               vCount = this.pTable.filteredValue.length.toString() + " (filtrando)";
           }
           else {
               vCount = this.pTable.value?.length.toString();
           }
       }

       return vCount;

   }
}