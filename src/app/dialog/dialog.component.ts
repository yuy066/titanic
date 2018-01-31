import { Component , OnInit, Inject, Input} from '@angular/core';
import { PassengerService } from '../passengers/passenger.service'
import { Note, updateNote } from '../../api/src/controllers/passengers';
import { PassengerListComponent } from '../passengers/passenger-list.component'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableModule, MatTableDataSource} from '@angular/material';


@Component({
    templateUrl: './dialog.component.html'
})

export class DialogComponent {
    errorMessage: string;
    notes: Note[] = [];
    index: number = 0;

    constructor(private _passengerService: PassengerService,
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    onNoClick(): void {
        this.dialogRef.close();
    }

    displayedColumns = ['id', 'timestamp', 'message', ''];
    dataSource = new MatTableDataSource<Note>(this.notes);

    newAttribute: any = {
        id: "",
        passenger_id:"",
        timestamp: "",
        message: ""
    };
  
    addNote(id: number):void {
        if(this.newAttribute.message.length < 1){ 
            this.errorMessage = "invalid notes!";
            return;
        }
        else{
            this.errorMessage = "";
        }
        this.newAttribute.timestamp = new Date();
        if(this.notes.length == 0) this.newAttribute.id = 1;
        else this.newAttribute.id = this.notes[this.notes.length - 1].id + 1;
        this._passengerService.addNote(this.newAttribute, id);
        this.notes.push(this.newAttribute);
        this.newAttribute = {};
    }
  
    deleteNote(id: number) :void{
        let index = 0;
        for(let n of this.notes){
            if(id == n.id){
                this.notes.splice(index , 1);
                break;
            }
            index++;
        }
        this._passengerService.deleteNote(id);
    }

    getNotesById(id: number) : void{
        
        let nList = this._passengerService.getPassengerNote(id);
        nList.forEach((element)=>{
            this.notes = element;
        });
    }

    ngOnInit(): void{
        this.getNotesById(this.data.id);
        
    }
}
