import { Component, Input } from '@angular/core';
import { Person } from '../app.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PersonDetailModalComponent } from '../person-detail-modal/person-detail-modal.component';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatDialogModule, RouterModule],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.css'
})
export class PersonCardComponent {
  @Input() person?: Person;
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  navigateToPersonDetail(name: string) {
    // Navigate to the person detail page with the person's ID as a route parameter
    this.router.navigate(['/person', name], {relativeTo: this.route}).then(() => {
      console.log('Navigation successful!');
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }
}
