import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCardContainerComponent } from './person-card-container.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PersonCardContainerComponent', () => {
  let component: PersonCardContainerComponent;
  let fixture: ComponentFixture<PersonCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCardContainerComponent],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
