import { Component, OnInit, Output } from '@angular/core';

import { Passenger, Note } from '../../api/src/controllers/passengers';
import { PassengerService } from './passenger.service';
import { DialogComponent } from '../dialog/dialog.component'
import { MatDialog } from '@angular/material'
import { identifierModuleUrl } from '@angular/compiler';

@Component({
    templateUrl: './passenger-list.component.html',
    styleUrls: ['./passenger-list.component.css']
})
export class PassengerListComponent implements OnInit {
    pageTitle: string = 'Passenger List';
    errorMessage: string;
    notes: Note[];

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredPassengers = this.listFilter ? this.performFilter(this.listFilter) : this.passengers;
    }

    filteredPassengers: Passenger[];
    passengers: Passenger[] = [];

    performFilter(filterBy: string): Passenger[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.passengers.filter((passenger: Passenger) =>
              passenger.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    constructor(private _passengerService: PassengerService,
        public dialog: MatDialog) {}

    openDialog(id: number) : void {
        let dialogRef = this.dialog.open(DialogComponent, {
            width: '700px',
            height: 'auto',
            data: { id: id}
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            
          });
    }
    
    getPassengerList(): void{
        let pList = this._passengerService.getPassengers();
        pList.forEach((element)=>{
            this.passengers = element;
            this.filteredPassengers = this.passengers;
        })
    }

    ngOnInit(): void {
        this.getPassengerList();

    }
}
