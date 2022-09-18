import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { GrandTotalBalanceComponent } from './components/grand-total-balance/grand-total-balance.component';
import { RichTableComponent } from './components/rich-table/rich-table.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DumbTableComponent } from './components/dumb-table/dumb-table.component';

@NgModule({
    declarations: [
        AppComponent,
        BarChartComponent,
        PieChartComponent,
        GrandTotalBalanceComponent,
        RichTableComponent,
        DumbTableComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        NgxSmartModalModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
