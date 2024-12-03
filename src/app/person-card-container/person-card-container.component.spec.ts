import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCardContainerComponent } from './person-card-container.component';

describe('PersonCardContainerComponent', () => {
  let component: PersonCardContainerComponent;
  let fixture: ComponentFixture<PersonCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonCardContainerComponent]
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
