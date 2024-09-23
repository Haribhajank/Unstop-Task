import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,  // Router outlet to load pages
  standalone: true,
  imports: [RouterModule]  // Import RouterModule for routing
})
export class AppComponent {}
