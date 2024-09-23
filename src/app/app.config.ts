import { provideRouter } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BookingPageComponent } from './booking-page/booking-page.component';

export const appConfig = {
  providers: [
    provideRouter([
      { path: '', component: HomePageComponent },    // Default route
      { path: 'book-tickets', component: BookingPageComponent } // Route to the booking page
    ])
  ]
};
