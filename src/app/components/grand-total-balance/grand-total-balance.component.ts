import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-grand-total-balance',
    templateUrl: './grand-total-balance.component.html',
    styleUrls: ['./grand-total-balance.component.scss']
})
export class GrandTotalBalanceComponent implements OnInit {
    @Input() grandTotalBalance?: number;
    formattedBalance?: string;
    
    constructor() { }

    ngOnInit(): void {
        this.formattedBalance = this.grandTotalBalance?.toString();
        
        if (this.grandTotalBalance && this.grandTotalBalance < 0) {
            this.formattedBalance = this.formattedBalance?.replace('-', '- $');
        } else {
            this.formattedBalance = '+ $' + this.formattedBalance;
        }
    }

}
