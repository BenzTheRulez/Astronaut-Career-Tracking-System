import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-astronaut-dialog',
  imports: [MatFormField, MatDialogModule, MatLabel, MatInputModule, CommonModule, FormsModule, MatButton],
  templateUrl: './add-astronaut-dialog.component.html',
  styleUrls: ['./add-astronaut-dialog.component.css']
})
export class AddAstronautDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddAstronautDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data); // Pass the data back to the parent component
  }
}
