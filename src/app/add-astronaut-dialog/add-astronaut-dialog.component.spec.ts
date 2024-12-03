import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAstronautDialogComponent } from './add-astronaut-dialog.component';

describe('AddAstronautDialogComponent', () => {
  let component: AddAstronautDialogComponent;
  let fixture: ComponentFixture<AddAstronautDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAstronautDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAstronautDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
