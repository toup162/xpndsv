import { Component, OnInit, Input } from '@angular/core';
import { DateBalance } from 'src/app/date-balance';

@Component({
    selector: 'tr [app-date-balance]',
    templateUrl: './date-balance.component.html',
    styleUrls: ['./date-balance.component.css']
})
export class DateBalanceComponent implements OnInit {
    @Input() dateBalance?: [string, number];

    constructor() { }

    ngOnInit(): void {
    }

}
