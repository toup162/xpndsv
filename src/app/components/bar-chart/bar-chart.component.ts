import { Component, OnInit, Input } from '@angular/core';
import { ThemeOption } from 'ngx-echarts';
import { DarkChart } from './dark-chart';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  
    @Input() totalsByDateMap?: Map<string, number>;
    @Input() openModalWithFilter?: any;

    theme!: string | ThemeOption;
    darkTheme = DarkChart;
    options: any;
    
    constructor() { }

    onChartEvent = (event: any, columnName: string) => {
        this.openModalWithFilter(columnName, event?.name)
        return;
    }

    ngOnInit(): void {
        this.theme = this.darkTheme;
        const xAxisData = [];
        const data1 = [];

        for (let [key, value] of this.totalsByDateMap!) {
            xAxisData.push(key);
            if (value < 0) {
                data1.push({
                    value,
                    itemStyle: {
                        normal: {
                            color: value >= 0 ? '#77b300' : '#cc0000'
                        }
                    }
                });
            } else {
                data1.push(0);
            }
        };
 

        this.options = {
            tooltip: {
                trigger: 'axis',
                formatter: "{b} : {c}"
            },
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false,
                },
            },
            yAxis: {},
            series: [
                {
                    name: 'Balance Change',
                    type: 'bar',
                    data: data1,
                    animationDelay: (idx: any) => idx * 10,
                }
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: (idx: any) => idx * 5,
        };
    }
}