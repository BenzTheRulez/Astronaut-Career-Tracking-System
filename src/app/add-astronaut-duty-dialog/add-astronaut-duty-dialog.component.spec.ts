import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAstronautDutyDialogComponent } from './add-astronaut-duty-dialog.component';

describe('AddAstronautDialogComponent', () => {
  let component: AddAstronautDutyDialogComponent;
  let fixture: ComponentFixture<AddAstronautDutyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAstronautDutyDialogComponent]
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
