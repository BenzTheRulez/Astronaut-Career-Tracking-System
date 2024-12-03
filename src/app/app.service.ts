import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


// Define an interface for a Person
export interface Person {
  personId: number;
  name: string;
  currentRank: string;
  currentDutyTitle: string;
  careerStartDate: Date;
  careerEndDate: Date;
  astronautDuties?: AstronautDuty[];
}

export interface AstronautDuty {
  id?: number;
  personId?: number;
  name: string;
  rank: string;
  dutyTitle: string;
  dutyStartDate: Date;
  dutyEndDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'http://localhost:5204';

  constructor(private http: HttpClient) { }

  /*
  *****PERSON REQUESTS*****
  */
  // Method to get a list of people
  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl+'/Person');
  }
  // Method to get a single person by ID
  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`);
  }
  // Method to add a new person
  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }
  /*
  *****ASTRONAUT DUTY REQUESTS*****
  */
  // Method to get a single person by name
  getPersonDutiesByName(name: string): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/AstronautDuty/${name}`);
  }
  // Method to add a duty by person name
  addPersonDutiesByName(astronautDuty: AstronautDuty): Observable<any> {
    console.log('add', astronautDuty);
    return this.http.post<any>(`${this.apiUrl}/AstronautDuty`, astronautDuty);
  }
}
