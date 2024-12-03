import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModule
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-astronaut-duty-dialog',
  imports: [MatFormFieldModule, MatDialogModule, MatInputModule, CommonModule, FormsModule, MatButton, MatDatepickerModule, MatNativeDateModule, NgbModule],
  providers: [MatDatepickerModule],
  templateUrl: './add-astronaut-duty-dialog.component.html',
  styleUrls: ['./add-astronaut-duty-dialog.component.css']
})
export class AddAstronautDutyDialogComponent implements OnInit {
  defaultStartDate?: Date;
  
  constructor(
    public dialogRef: MatDialogRef<AddAstronautDutyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.defaultStartDate = new Date(this.data.dutyStartDate);
    console.log(this.data);
    console.log(this.defaultStartDate);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data); // Pass the data back to the parent component
  }
}
