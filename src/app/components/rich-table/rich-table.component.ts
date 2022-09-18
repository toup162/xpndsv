import { Component, OnInit, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
    selector: 'app-rich-table',
    templateUrl: './rich-table.component.html',
    styleUrls: ['./rich-table.component.scss']
})
export class RichTableComponent implements OnInit {
    @Input() allTransactions: any;
    @Input() columnsData: any;
    @Input() setModalTableRowData?: (newRowTableData: any) => void;
    @Input() modalTableRowData?: any;
    @Input() openModalWithFilter?: any;
    
    tableData: any = [];
    constructor(public ngxSmartModalService: NgxSmartModalService) { }

    ngOnInit(): void {
    }

}
