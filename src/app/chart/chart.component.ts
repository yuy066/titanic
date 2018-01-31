import { Component , OnInit} from '@angular/core';
import { PassengerService } from '../passengers/passenger.service'
import { Passenger } from '../../api/src/controllers/passengers';
import { PassengerListComponent } from '../passengers/passenger-list.component'

@Component({
    templateUrl: './chart.component.html'
})

export class ChartComponent {
    public pageTitle: string = 'Statistics';
    errorMessage: string;

    survivedMen:number = 0;
    survivedFemale:number = 0;
    one: number = 0;
    two: number = 0;
    three: number = 0;
    passengers: Passenger[] = [];
    sexChartData: any;
    typeChartData: any;
    constructor(private _passengerService: PassengerService) {}

    countSurvived() : void{
        //subscribe(success, failure, complete)
        this._passengerService.getPassengers()
                .subscribe(passengers => {
                    this.passengers = passengers;
                    for(let p of this.passengers){
                        if(p.survived === true){
                            if(p.sex === 'male'){
                                this.survivedMen += 1;
                            }
                            else{
                                this.survivedFemale += 1;
                            }
                            
                            if(p.ticket_type === 1){
                                this.one += 1;
                            }
                            else if(p.ticket_type === 2){
                                this.two += 1;
                            }
                            else{
                                this.three += 1;
                            }
                        }
                    }
                    this.sexChartData =  {
                        chartType: 'PieChart',
                        dataTable: [
                          ['Sex', 'Count'],
                          ['Male', this.survivedMen],
                          ['Female', this.survivedFemale ]
                        ],
                        options: {'title': 'Gender Distribution of Survived People'},
                      };

                    this.typeChartData = {
                        chartType: 'PieChart',
                        dataTable: [
                            ['TicketType', 'Count'],
                            ['One', this.one],
                            ['Two', this.two],
                            ['Three', this.three]
                    ],
                    options: {'title': 'Ticket Type Distribution of Survived People'},
                  };
                },
                error => this.errorMessage = <any>error,
            );

    }

    ngOnInit(): void{
          this.countSurvived();
    }


    

}
