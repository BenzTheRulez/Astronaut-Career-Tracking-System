import { Component, Input, OnInit } from '@angular/core';
import { PersonCardComponent } from '../person-card/person-card.component';
import { CommonModule } from '@angular/common';
import { ACTSService, Person } from '../acts.service';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-person-card-container',
  imports: [PersonCardComponent, CommonModule, MatCardModule, MatIcon, MatButton, MatToolbar],
  templateUrl: './person-card-container.component.html',
  styleUrl: './person-card-container.component.css'
})
export class PersonCardContainerComponent implements OnInit {
  @Input() person?: Person;
  people: Person[] = [];
  errorMessage: string = '';  // Error message for failed requests
  constructor(private service: ACTSService){}
  ngOnInit(): void {
            // Call the service method to get the list of people
            this.service.getPeople().subscribe({
              next: (data: any) => {
                console.log('getpeople', data.people);
                this.people = data.people;  // Store the response in the people array
              },
              error: (error) => {
                this.errorMessage = 'Failed to load people data';
                console.error(error);
              }
      });
  }

}
