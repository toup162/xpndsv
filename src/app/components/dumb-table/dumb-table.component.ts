import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-dumb-table',
    templateUrl: './dumb-table.component.html',
    styleUrls: ['./dumb-table.component.scss']
})
export class DumbTableComponent implements OnInit {
    @Input() allTransactions: any;
    @Input() columnsData: any;
    @Input() selectedFilter: any;

    constructor() { }

    ngOnInit(): void {

    }

}
