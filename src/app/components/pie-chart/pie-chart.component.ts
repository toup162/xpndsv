import { Component, OnInit, Input } from '@angular/core';
import { ThemeOption } from 'ngx-echarts';
import { DarkChart } from '../bar-chart/dark-chart';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
    
    @Input() categorizedTransactionsArray?: {name: string, value: number}[];
    
    theme!: string | ThemeOption;
    darkTheme = DarkChart;
    options: any;

    constructor() { }

    ngOnInit(): void {
        this.theme = this.darkTheme;
        this.options = {
            tooltip: {
                trigger: "item",
                formatter: "{b} : ${c} ({d}%)"
            },
        
            series: [
                {
                    name: "Area Mode",
                    type: "pie",
                    radius: [
                        20,
                        140
                    ],

                    roseType: "radius",
                    itemStyle: {
                        borderRadius: 5
                    },
                    data: this.categorizedTransactionsArray
                }
            ]
        };
    }

}
