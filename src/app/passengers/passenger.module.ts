import { NgModule } from '@angular/core';
import { PassengerListComponent } from './passenger-list.component';
import { RouterModule } from '@angular/router';
import { PassengerService } from './passenger.service';
import { SharedModule } from './../shared/shared.module';
import { MatPaginatorModule, MatTableModule, MatDialogModule } from '@angular/material'

@NgModule({
  imports: [
    RouterModule.forChild([
        { path: 'passenger-list', component: PassengerListComponent }
    ]),
    SharedModule,
    MatPaginatorModule,
    MatTableModule
  ],
  declarations: [
    PassengerListComponent
  ],
  providers: [
    PassengerService
  ]
})
export class PassengerModule { }
