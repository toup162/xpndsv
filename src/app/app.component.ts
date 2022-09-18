import { Component } from '@angular/core';
import { read, utils } from 'xlsx';
import { transaction } from './transaction';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title: string = 'xpndsv';
    transactions: transaction[] = [];

    transactionsByDateMap: any;
    totalsByDateMap: any;
    datesSortedByExpenseArray: any;
    datesWithPositiveBalanceArray: any;
    categorizedTransactionsArray: any;
    grandTotalBalanceNumber: any;
    columnsData: any;

    modalTableRowData: transaction[] = [];
    selectedFilter: any = {column: '', value: ''};
    
    constructor(public ngxSmartModalService: NgxSmartModalService) {
    }

    datesWithPositiveBalance(totalsByDate: Map<string, number>): Array<[string, number]> {
        const isPositiveDate = ( t: [string, number] ) => { return (t[1] > 0) ? true : false }
        return [...totalsByDate].filter(isPositiveDate);
    }

    transactionsByDate(transactions: transaction[]): Map<string, transaction[]> {
        let transactionsByDateMap = new Map<string, transaction[]>([]);
        for (let t of transactions) {
            let newArray: transaction[] = [];
            if (transactionsByDateMap.get(t.transactionDate)) {
                newArray = transactionsByDateMap.get(t.transactionDate)!;
                newArray.push(t);
                transactionsByDateMap.set(t.transactionDate, newArray);
            } else {
                transactionsByDateMap.set(t.transactionDate, [t]);
            }            
        }
        return transactionsByDateMap;
    }

    totalsByDate(transactionsByDateMap: Map<string, transaction[]>): Map<string, number> {
        let dateTotals = new Map<string, number>([]);
        for (let [date, transactions] of transactionsByDateMap) {
            let dateTotal: number = 0;
            transactions.forEach(transaction => dateTotal = (+(dateTotal) + +(transaction.amount)));
            dateTotals.set(date, Math.round( dateTotal * 1e2 ) / 1e2);
        }

        return dateTotals;
    }

    compareCounts( a: [string, number], b: [string, number] ) {
        if ( a[1] < b[1] ){ return -1 }
        else if ( a[1] > b[1] ){ return 1 }
        else return 0;
    }
    
    datesSortedByExpense(totalsByDate: Map<string, number>): Array<[string, number]> {
        const datesSortedByExpenseArray = [...totalsByDate].sort(this.compareCounts);
        return datesSortedByExpenseArray;
    }

    categorizedTransactions() {
        let categoryTotals = new Map<string, number>();
        for (let transaction of this.transactions) {
            if (transaction.category && transaction.amount < 0) {
                if (!categoryTotals.get(transaction.category)) {
                    categoryTotals.set(transaction.category, (transaction.amount) * -1)
                } else {
                    categoryTotals.set(
                        transaction.category,
                        Math.round( (categoryTotals.get(transaction.category)! + (transaction.amount) * -1) * 1e2 ) / 1e2
                    )
                }
            }
        }

        let allPieChartData: any[] = [];

        [...categoryTotals].forEach(categoryTotal => {
            allPieChartData.push({name: categoryTotal[0], value: categoryTotal[1]})
        });
        
        /* Sort the categories */
        const sortedCategories = allPieChartData.sort((a, b) => (a.value > b.value) ? -1 : 1);

        /* Count the top 6 categories */
        let topCategoryCount = 0;
        const CATEGORIES_TO_SHOW = 6;
        for(let i = 0; i < CATEGORIES_TO_SHOW; i++) {
            topCategoryCount = topCategoryCount + sortedCategories[i].value;
        }   

        /* Categorize the rest as 'Other' */
        const otherCount = this.transactions.length - topCategoryCount;
        let culledPieChartData = [...sortedCategories.slice(0, CATEGORIES_TO_SHOW), {name: 'Other', value: otherCount}].sort((a, b) => (a.value > b.value) ? -1 : 1);
        
        return culledPieChartData;
    }

    grandTotalBalance(): number {
        let grandTotal: number = 0;
        for (let transaction of this.transactions) {
            grandTotal += Number(transaction.amount);
        }
        
        return Math.round( grandTotal * 1e2 ) / 1e2;
    }

    closeReport = () => {
        this.transactions = [];
    }

    openModalWithFilter = (filterColumn: string, filterValue: string) => {

        const filterColumnMap = {
            transactionDate: 'Transaction Date',
            desc: 'Description',
            category: 'Category',
            type: 'Type',
            amount: 'Amount',
        };

        if (this.transactions) {
            this.modalTableRowData = this.transactions.filter((transaction: transaction) => transaction[filterColumn as keyof transaction] === filterValue);
            this.ngxSmartModalService.getModal('myModal').open()
            this.selectedFilter = {column: filterColumnMap[filterColumn as keyof typeof filterColumnMap], value: filterValue};
        }
    }

    onModalClose = () => {
        this.selectedFilter = {column: '', value: ''};
        this.modalTableRowData = [];
    }

    setModalTableRowData(newRowTableData: any) {
        this.modalTableRowData = newRowTableData;
    }

    handleImport($event: any) {
        const files = $event.target.files;
        console.log("test");
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows: transaction[] = utils.sheet_to_json(wb.Sheets[sheets[0]], {raw:false,dateNF:'mm/dd/yyyy'});
                    this.transactions = rows;
                    
                    //  *** Testing
                    
                    this.transactionsByDateMap = this.transactionsByDate(this.transactions);
                    this.totalsByDateMap = this.totalsByDate(this.transactionsByDateMap);
                    this.datesSortedByExpenseArray = this.datesSortedByExpense(this.totalsByDateMap);
                    this.datesWithPositiveBalanceArray = this.datesWithPositiveBalance(this.totalsByDateMap);
                    this.categorizedTransactionsArray = this.categorizedTransactions();
                    this.grandTotalBalanceNumber = this.grandTotalBalance();
                    this.columnsData = [{prop: 'transactionDate', name: 'Transaction Date'}, {name: 'Description', prop: 'desc'}, {name: 'Category'}, {name: 'Type'}, {name: 'Amount'}]
                    
                    
                    //  ***
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    ngOnInit(): void {
        
    }
}
