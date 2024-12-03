import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailModalComponent } from './person-detail-modal.component';
import { DatePipe, Location } from '@angular/common';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PersonDetailModalComponent', () => {
  let component: PersonDetailModalComponent;
  let datePipe: DatePipe;
  // let fixture: ComponentFixture<PersonDetailModalComponent>;
  // Mocks for the dependencies
  let appServiceMock: jasmine.SpyObj<AppService>;
  let activatedRouteMock: jasmine.SpyObj<ActivatedRoute>;
  let locationMock: jasmine.SpyObj<Location>;
  let matDialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    // Create mock instances for services
    appServiceMock = jasmine.createSpyObj('AppService', ['getData']);
    activatedRouteMock = jasmine.createSpyObj('ActivatedRoute', ['paramMap']);
    locationMock = jasmine.createSpyObj('Location', ['back']);
    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    await TestBed.configureTestingModule({
      imports: [PersonDetailModalComponent],
      providers: [DatePipe, HttpClient, HttpHandler, ActivatedRoute]
    })
    .compileComponents();

    // Create the component instance with injected mocks
    component = new PersonDetailModalComponent(
      TestBed.inject(AppService),
      TestBed.inject(DatePipe),
      TestBed.inject(ActivatedRoute),
      TestBed.inject(Location),
      TestBed.inject(MatDialog)
    );
  });
    // fixture = TestBed.createComponent(PersonDetailModalComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format the date correctly', () => {
    const date = '2024-12-02'; // Example date string
    const formattedDate = component.formatDate(date);

    expect(formattedDate).toBe('12/02/2024'); // Expected format MM/dd/yyyy
  });

  it('should return an empty string if the date is invalid', () => {
    const date = ''; // Empty date string
    const formattedDate = component.formatDate(date);

    expect(formattedDate).toBe(''); // Should return an empty string
  });

});
