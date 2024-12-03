import { CommonModule, DatePipe, Location } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ACTSService, AstronautDuty, Person } from '../acts.service';
import { AgGridModule } from 'ag-grid-angular'; 
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { AddAstronautDutyDialogComponent } from '../add-astronaut-duty-dialog/add-astronaut-duty-dialog.component';
import { catchError, of, switchMap, tap } from 'rxjs';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-person-detail-modal',
  imports: [MatCardModule, CommonModule, AgGridModule, MatButton, MatToolbar],
  templateUrl: './person-detail-modal.component.html',
  styleUrl: './person-detail-modal.component.css',
  providers: [DatePipe]
})
export class PersonDetailModalComponent implements OnInit {
  errorMessage: string = '';  // Error message for failed requests
  personDetail?: any;
  personName: string = '';
  currentDuty?: AstronautDuty;
  gridApi: any;
  columnApi: any;
  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true, // Make columns resizable
      sortable: true,   // Enable sorting
      filter: true,     // Enable filtering
    },
  };
  rowData: any[] = [];
  columnDefs: ColDef[] = [
    { headerName: 'Rank', field: 'rank' },
    { headerName: 'Duty Title', field: 'dutyTitle' },
    { headerName: 'Start Date', field: 'dutyStartDate',
      valueFormatter: (params: any) => this.formatDate(params.value) },
    { headerName: 'End Date', field: 'dutyEndDate',
      valueFormatter: (params: any) => this.formatDate(params.value) },
  ];

  constructor(private service: ACTSService, private datePipe: DatePipe, private route: ActivatedRoute, private location: Location, public dialog: MatDialog) { }
  
  ngOnInit() {
    this.route.params.subscribe((params: any) => this.personName = params['name']);
  }
  // Access the grid API and column API after grid initialization
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // Call the service method to get the list of people
    this.service.getPersonDutiesByName(this.personName).subscribe({
      next: (data: any) => {
        this.personDetail = data.person;  // Store the response in the people array
        this.rowData = data.astronautDuties;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load people data';
        console.error(error);
      }
        });
    // Automatically size columns after grid is ready
    this.gridApi.sizeColumnsToFit();
  }
  // Function to format the date using DatePipe
  formatDate(date: string): string {
    return this.datePipe.transform(date, 'MM/dd/yyyy') || '';
  }
  // Method to update the row data dynamically
  updateRowData(newData: AstronautDuty[]) {
    if (this.gridApi) {
      this.gridApi.setRowData(newData); // Update AG Grid row data dynamically
    } else {
      this.rowData = newData; // Fallback if gridApi isn't ready yet
    }
  }
  ngAfterViewInit() {
    // After view initialization, auto-size the columns to fit content
    setTimeout(() => {
      if (this.gridApi) {
        this.gridApi.sizeColumnsToFit(); // Adjust column sizes to fit content
      }
    });
  }
  // Method to navigate back
  goBack(): void {
    this.location.back(); // Goes back to the previous page
  }
  // Method to open the "Add New Astronaut" modal
  openAddAstronautDialog(): void {
    this.currentDuty = this.rowData.filter(duty => !duty.dutyEndDate)[0]; // current duty that has no end date
    const dialogRef = this.dialog.open(AddAstronautDutyDialogComponent, {
      width: '400px',
      data: {name: this.personName, rank: '', dutyTitle: '', dutyStartDate: this.currentDuty?.dutyStartDate} // Data to pass to modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.SubmitAstronautDuties(result);
      }
    });
  }
  // Method to make HTTP Request to submit a new astronaut duty 
  SubmitAstronautDuties(duty: AstronautDuty) {
    this.service.addPersonDutiesByName(duty).pipe(
      switchMap(response => {
        return of(response); // Return Observable for further processing
      }),
      catchError(error => {
        console.error('Error adding astronaut duty', error);
        return of(null); // Return Observable to continue flow
      })
    ).subscribe();
  }
}
