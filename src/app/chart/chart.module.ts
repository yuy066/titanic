import { NgModule } from '@angular/core';
import { ChartComponent } from './chart.component';
import { RouterModule } from '@angular/router';
import { PassengerService } from '../passengers/passenger.service';
import { SharedModule } from './../shared/shared.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  imports: [
    RouterModule.forChild([
        { path: 'chart', component: ChartComponent }
    ]),
    SharedModule,
    Ng2GoogleChartsModule
  ],
  declarations: [
    ChartComponent
  ],
  providers: [
    PassengerService
  ]
})
export class ChartModule { }