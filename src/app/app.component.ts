import { Component } from '@angular/core';
import { read, utils } from 'xlsx';
import { transaction } from './transaction';
import TEST_DATA from './test-data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string = 'xpndsv';
    /* TESTING */
    transactions: transaction[] = TEST_DATA;
    transactionsByDateMap = this.transactionsByDate(this.transactions);
    totalsByDateMap = this.totalsByDate(this.transactionsByDateMap);
    daysSortedByExpenseMap = this.daysSortedByExpense(this.totalsByDateMap);
    /* */
    
    /*
    transactions: transaction[] = [];
    transactionsByDateMap = new Map<string, transaction[]>([]);
    totalsByDateMap = new Map<string, number>([]);
    daysSortedByExpenseMap = new Array<[string, number]>;
    */

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
    
    daysSortedByExpense(totalsByDate: Map<string, number>): Array<[string, number]> {
        const compare = ( a: [string, number], b: [string, number] ) => {
            if ( a[1]< b[1] ){ return -1 }
            else if ( a[1] > b[1] ){ return 1 }
            else return 0;
        }
        const daysSortedByExpenseMap = [...totalsByDate].sort(compare);
        return daysSortedByExpenseMap;
    }

    handleImport($event: any) {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    console.log(JSON.stringify(utils.sheet_to_json(wb.Sheets[sheets[0]], {raw:false,dateNF:'mm/dd/yyyy'})));
                    const rows: transaction[] = utils.sheet_to_json(wb.Sheets[sheets[0]], {raw:false,dateNF:'mm/dd/yyyy'});
                    this.transactions = rows;
                    
                    //  *** Testing
                    this.transactionsByDateMap = this.transactionsByDate(rows);
                    this.totalsByDateMap = this.totalsByDate(this.transactionsByDateMap);
                    this.daysSortedByExpenseMap = this.daysSortedByExpense(this.totalsByDateMap);
                    console.log(this.transactionsByDateMap);
                    console.log(this.totalsByDateMap);
                    console.log(this.daysSortedByExpenseMap);
                    //  ***
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
}
