import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BookingPageComponent } from './booking-page/booking-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, // default route
  { path: 'book-tickets', component: BookingPageComponent }, // route for booking page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
