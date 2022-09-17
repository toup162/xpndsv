import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-date-table',
    templateUrl: './date-table.component.html',
    styleUrls: ['./date-table.component.scss']
})
export class DateTableComponent implements OnInit {
    @Input() allData?: Array<[string, number]>;
    @Input() cardHeader?: string;
    @Input() headerClasses?: string;

    Math = Math;
    currentPageNum: number = 0;
    rowsPerPage: number = 5;
    dateBalances?: Array<[string, number]> = [];

    constructor() { }

    setDateBalances(): void {
        this.dateBalances = this.allData?.slice(
            this.currentPageNum * this.rowsPerPage,
            (this.currentPageNum * this.rowsPerPage) + this.rowsPerPage);
    }

    nextPage(): void {
        if (this.currentPageNum * this.rowsPerPage <= this.allData?.length! - this.rowsPerPage) {
            this.currentPageNum += 1;
            this.setDateBalances();
        }
    }

    prevPage(): void {
        if (this.currentPageNum * this.rowsPerPage >= this.rowsPerPage) {
            this.currentPageNum -= 1;
            this.setDateBalances();
        }
    }

    firstPage(): void {
        this.currentPageNum = 0;
        this.setDateBalances();
    }

    lastPage(): void {
        this.currentPageNum = Math.floor(this.allData?.length! / this.rowsPerPage);
        this.setDateBalances();
    }

    canGoBack(): boolean {
        return this.currentPageNum > 0;
    }

    canGoForward(): boolean {
        return this.currentPageNum < Math.floor(this.allData?.length! / this.rowsPerPage)
    }

    ngOnInit(): void {
        this.dateBalances = this.allData?.slice(0, 5);
    }

}
