import { Component } from '@angular/core';
import { read, utils } from 'xlsx';
import { transaction } from './transaction';
import TEST_DATA from './test-data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title: string = 'xpndsv';
    /* TESTING */
    transactions: transaction[] = TEST_DATA;
    transactionsByDateMap = this.transactionsByDate(this.transactions);
    totalsByDateMap = this.totalsByDate(this.transactionsByDateMap);
    datesSortedByExpenseArray = this.datesSortedByExpense(this.totalsByDateMap);
    datesWithPositiveBalanceArray = this.datesWithPositiveBalance(this.totalsByDateMap);
    categorizedTransactionsArray = this.categorizedTransactions();
    grandTotalBalanceNumber = this.grandTotalBalance();
    
    rows = [
        { name: 'Austin', gender: 'Male', company: 'Swimlane' },
        { name: 'Dany', gender: 'Male', company: 'KFC' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
      ];
      columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];

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
            grandTotal += transaction.amount;
            
        }
        
        return Math.round( grandTotal * 1e2 ) / 1e2;
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
                    this.datesSortedByExpenseArray = this.datesSortedByExpense(this.totalsByDateMap);
                    //  ***
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    ngOnInit(): void {
    }
}
