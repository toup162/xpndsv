import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DateTableComponent } from './components/date-table/date-table.component';
import { DateBalanceComponent } from './components/date-balance/date-balance.component';

@NgModule({
    declarations: [
        AppComponent,
        DateTableComponent,
        DateBalanceComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
