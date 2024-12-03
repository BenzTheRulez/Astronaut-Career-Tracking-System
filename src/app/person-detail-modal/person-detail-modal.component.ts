import { CommonModule, DatePipe, Location } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ACTSService, AstronautDuty, Person } from '../acts.service';
import { AgGridModule } from 'ag-grid-angular'; // Import the AG Grid module
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { AddAstronautDialogComponent } from '../add-astronaut-dialog/add-astronaut-dialog.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-person-detail-modal',
  imports: [MatCardModule, CommonModule, AgGridModule, MatButton],
  templateUrl: './person-detail-modal.component.html',
  styleUrl: './person-detail-modal.component.css',
  providers: [DatePipe]
})
export class PersonDetailModalComponent implements OnInit {
  errorMessage: string = '';  // Error message for failed requests
  personDetail?: Person;
  personName: string = '';
  columnDefs: ColDef[] = [
    { headerName: 'Rank', field: 'rank' },
    { headerName: 'Duty Title', field: 'dutyTitle' },
    { headerName: 'Start Date', field: 'dutyStartDate',
      valueFormatter: (params: any) => this.formatDate(params.value) },
    { headerName: 'End Date', field: 'dutyEndDate',
      valueFormatter: (params: any) => this.formatDate(params.value) },
  ];
  rowData: any[] = [];
  gridOptions: GridOptions = {
    // Optionally, set grid options like auto-size
    defaultColDef: {
      resizable: true, // Make columns resizable
      sortable: true,   // Enable sorting
      filter: true,     // Enable filtering
    },
  };
  gridApi: any;
  columnApi: any;

  constructor(private service: ACTSService, private datePipe: DatePipe, private route: ActivatedRoute, private location: Location, public dialog: MatDialog) { }

  ngOnInit() {
    console.log('route', this.route.snapshot);
    this.route.params.subscribe((params: any) => this.personName = params['name']);
    // You can fetch person details based on this ID from a service
    // Call the service method to get the list of people
    console.log('name', this.personName);


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
  // Access the grid API and column API after grid initialization
  onGridReady(params: any): void {
    console.log('ongridReady', params)
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.service.getPersonDutiesByName(this.personName).subscribe({
      next: (data: any) => {
        console.log('getduty', data);
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
  // Method to navigate back
  goBack(): void {
    this.location.back(); // Goes back to the previous page
  }
    // Method to open the "Add New Astronaut" modal
  openAddAstronautDialog(): void {
    const dialogRef = this.dialog.open(AddAstronautDialogComponent, {
      width: '400px',
      data: {rank: '', dutyTitle: '', dutyStartDate: ''} // Data to pass to modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New astronaut data:', result);
        // You can send the data to a service here to add the astronaut
      }
    });
  }
  // closeDialog(): void {
  //   this.dialogRef.close();
  //   // You can add custom logic to close the dialog if needed
  // }
}
