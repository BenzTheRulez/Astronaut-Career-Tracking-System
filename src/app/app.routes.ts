import { Routes } from '@angular/router';
import { PersonDetailModalComponent } from './person-detail-modal/person-detail-modal.component';
import { PersonCardContainerComponent } from './person-card-container/person-card-container.component';

export const routes: Routes = [
    { path: "", redirectTo: "person", pathMatch: "full"},
    { path: 'person', component: PersonCardContainerComponent }, // Using route parameter
    { path: 'person/:name', component: PersonDetailModalComponent }, // Using route parameter
];
