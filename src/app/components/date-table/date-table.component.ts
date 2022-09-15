import { Component, OnInit, Input } from '@angular/core';
import { DateBalance } from 'src/app/date-balance';
import { transaction } from 'src/app/transaction';

@Component({
    selector: 'app-date-table',
    templateUrl: './date-table.component.html',
    styleUrls: ['./date-table.component.css']
})
export class DateTableComponent implements OnInit {
    @Input() allData?: Array<[string, number]>;
    
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
        this.currentPageNum = 1;
        this.setDateBalances();
    }

    ngOnInit(): void {
        
        this.dateBalances = this.allData?.slice(0, 5);
        console.log(this.allData);
    }

}
