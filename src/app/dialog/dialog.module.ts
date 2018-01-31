import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { PassengerService } from '../passengers/passenger.service';
import { SharedModule } from './../shared/shared.module';
import { MatDialogModule, MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    MatDialogModule,
    MatTableModule
  ],
  declarations: [
    DialogComponent
  ],
  providers: [
    PassengerService
  ]
})
export class DialogModule { }