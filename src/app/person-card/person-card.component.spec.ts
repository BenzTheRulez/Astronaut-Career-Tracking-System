import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCardComponent } from './person-card.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('PersonCardComponent', () => {
  let component: PersonCardComponent;
  let fixture: ComponentFixture<PersonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCardComponent],
      providers: [HttpClient, ActivatedRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
