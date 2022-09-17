import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { DateTableComponent } from './components/date-table/date-table.component';
import { DateBalanceComponent } from './components/date-balance/date-balance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { GrandTotalBalanceComponent } from './components/grand-total-balance/grand-total-balance.component';

@NgModule({
    declarations: [
        AppComponent,
        DateTableComponent,
        DateBalanceComponent,
        BarChartComponent,
        PieChartComponent,
        GrandTotalBalanceComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
