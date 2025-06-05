import { UtilitiesService } from '@/helpers/services/utilities.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { ColumnFilter, Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: '[esrDataTableTools]',
  imports: [CommonModule,
            ButtonModule,
            DatePickerModule,
            MultiSelectModule,
            TableModule,
            MultiSelectModule,
            SelectModule,
            InputIconModule,
            TagModule,
            InputTextModule,
            SliderModule,
            ProgressBarModule,
            ToggleButtonModule,
            ToastModule,
            CommonModule,
            FormsModule,
            ButtonModule,
            RatingModule,
            RippleModule,
            IconFieldModule,
            DecimalPipe
  ],
  providers: [FilterService,
   DecimalPipe
  ],

  templateUrl: './esr-data-table-tools.component.html',
  styleUrl: './esr-data-table-tools.component.scss',
})
export class EsrDataTableToolsComponent implements OnInit, AfterViewInit {


   @Input() pTable: Table | null = null;

   @Input() esrLabel: string | null = null;
   @Input() esrProperty: string | null = null;
   @Input() esrDataType: string | null = null;
   @Input() esrFilterCallback: any;

   @Input() esrDataList: any[] | null = null;
   @Input() esrDataListDisplayMember: string | null = null;
   @Input() esrDataListValueMember: string | null = null;
   @Input() esrRangeMinValue: number = 0;
   @Input() esrRangeMaxValue: number = 100;



   @Input() esrShowFilter: boolean = true;
   @Input() esrShowSort: boolean = true;

   @ViewChild("esrColumnFilter") esrColumnFilter: ColumnFilter | null = null;

   @ViewChild("esrInputText") esrInputText: ElementRef | null = null;
   @ViewChild("esrInputNumber") esrInputNumber: ElementRef | null = null;

   UniqueId: string;

   rangeValues: number[] = [0, 100];

   Totalizador: number = 0;

   constructor(public filterService: FilterService, private readonly utilitiesService: UtilitiesService) {
      this.UniqueId = "esrTool" + Math.floor(Math.random() * 10000000);
   }

    

   ngAfterViewInit(): void {
       if (this.esrDataType?.toLowerCase() == "sum") {

           this.pTable?.onFilter.subscribe((item) => {
               let vData: any[] | undefined = [];
               this.Totalizador = 0;
               
               vData = this.pTable?.filteredValue ? this.pTable?.filteredValue : this.pTable?.value;


               vData?.forEach(item => {
                   this.Totalizador += item[this.esrProperty!];
               });
           })
       }
   }

   ngOnInit(): void {
 
      if (this.esrFilterCallback) {
         const mode = this.UniqueId + 'CallBack';
     
         if (!this.filterService.filters[mode]) {
           this.filterService.filters[mode] = this.esrFilterCallback!;
         }
       }
      
     
      if (this.esrDataType === "range") {
         this.SetRange();
      }
       
 


   }
 

   Focus() {
       if (this.esrInputText) { this.esrInputText.nativeElement.focus(); };

       if (this.esrInputNumber) { this.esrInputNumber.nativeElement.focus(); }
   }

   public matchMode(): string | undefined {
        
      if (this.esrFilterCallback) {
        const custom = this.UniqueId + 'CallBack';
 
        return custom;
      }
    
      const type = this.esrDataType?.toLowerCase();
    
      switch (type) {
        case 'text': return 'contains';
        case 'number': return 'contains';
        case 'date': return 'dateIs';
        case 'list': return 'in';
        case 'month': return 'month';
        case 'range': return 'between';
        case 'rangedate': return 'between';
        default:
       
          return undefined;
      }
       
    }


   ListValue: any;
   ListFilter(fnFilter: (filter: any) => void, value: any[]) {
       let values = [];
       if (value) {
           values = value.map(a => a[this.esrDataListValueMember!]);
       }

       fnFilter(values);
   }

   RangeFilter(fnfilter: Function) {
       fnfilter([this.getRangeMinValue(), this.getRangeMaxValue()])
   }

   getRangeMinValue() {
       return (this.esrRangeMaxValue - this.esrRangeMinValue) * (this.rangeValues[0] / 100)
   }
   getRangeMaxValue() {

       return (this.esrRangeMaxValue - this.esrRangeMinValue) * (this.rangeValues[1] / 100)
   }

   SetRange() {
       this.rangeValues = [0, 100];
   }

   RangeDateMin: Date | undefined;
   RangeDateMax: Date | undefined;
   RangeDateFilter(fnfilter: Function) {
      let vMin: Date;
      let vMax: Date;
      if (this.RangeDateMin) { vMin = this.RangeDateMin } else { vMin = new Date(1900, 0, 1) }
      if (this.RangeDateMax) { vMax = this.RangeDateMax } else { vMax = new Date(2100, 0, 1) }

      fnfilter([vMin, vMax])
   }


   Clear(fnfilter: Function) {
      fnfilter(null);
      
      this.esrColumnFilter?.hide();

      this.ListValue = null;

    
      if (this.esrDataType?.toLowerCase() == 'range') {
         this.SetRange()
      }
       
   }



} 
