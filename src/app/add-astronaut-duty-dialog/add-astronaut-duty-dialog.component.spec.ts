import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAstronautDutyDialogComponent } from './add-astronaut-duty-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AddAstronautDialogComponent', () => {
  let component: AddAstronautDutyDialogComponent;
  let fixture: ComponentFixture<AddAstronautDutyDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<AddAstronautDutyDialogComponent>>;
  let matDialogData: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAstronautDutyDialogComponent],
      providers: [     
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: matDialogData }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAstronautDutyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
