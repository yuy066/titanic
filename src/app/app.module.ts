import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatTableModule, MatPaginatorModule, MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PassengerModule } from './passengers/passenger.module';
import { ChartModule } from './chart/chart.module';
import { DialogModule } from './dialog/dialog.module'
import { HomeComponent } from './home/home.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { PassengerService } from './passengers/passenger.service'
import { PassengerListComponent } from './passengers/passenger-list.component';
import { DialogComponent } from './dialog/dialog.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatTableModule, 
    MatDialogModule,
    MatPaginatorModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: 'home', component: HomeComponent },
        { path: '', redirectTo: 'home', pathMatch: 'full'},
        { path: '**', redirectTo: 'home', pathMatch: 'full'}
    ]),
    PassengerModule,
    ChartModule,
    DialogModule,
    Ng2GoogleChartsModule
  ],
  providers: [PassengerService],
  entryComponents:[PassengerListComponent, DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
