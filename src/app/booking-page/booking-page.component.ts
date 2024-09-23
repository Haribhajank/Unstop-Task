import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css'],
  standalone:true,
  imports: [CommonModule]
})
export class BookingPageComponent {
  seats: any[] = [];
  bookedSeats: any[] = [];   // Permanently booked seats (all users)
  currentUserBookedSeats: any[] = []; // Seats booked by the current user
  selectedSeats: number = 0;  // Stores the currently selected number of seats
  maxSeats: number = 7;
  totalSeats = 80;
  allSeatsBooked = false;
  availableSeats = 0;  // To keep track of available seats

  constructor() {
    this.initializeSeats();
    this.updateAvailableSeats();
  }

  // Initialize seats with 10 rows of 7 seats, and 1 row with 3 seats
  initializeSeats() {
    const fullRows = 11;  // First 10 rows
    const seatsPerFullRow = 7;
    const seatsInLastRow = 3;
    let seatNumber = 1;

    // Initialize full rows with 7 seats each
    for (let i = 0; i < fullRows; i++) {
      const row = [];
      for (let j = 0; j < seatsPerFullRow; j++) {
        row.push({ number: seatNumber++, selected: false });
      }
      this.seats.push(row);
    }

    // Initialize last row with 3 seats
    const lastRow = [];
    for (let j = 0; j < seatsInLastRow; j++) {
      lastRow.push({ number: seatNumber++, selected: false });
    }
    this.seats.push(lastRow);
  }

  // Check if a seat is already booked
  isBooked(seat: any) {
    return this.bookedSeats.includes(seat);
  }

  // Check if a seat is selected (being reserved in this session)
  isSelected(seat: any) {
    return this.currentUserBookedSeats.includes(seat);
  }

  // Select the number of seats
  selectSeats(num: number) {
    this.selectedSeats = num;
  }

  // Confirm the selected seats
  confirmSeatSelection() {
    console.log(`You have selected ${this.selectedSeats} seats.`);
    this.reserveSeats(this.selectedSeats);  // Reserve the selected seats
  }

  // Reserve the selected number of seats
  reserveSeats(seatsToReserve: number) {
    let reserved = 0;

    for (let row of this.seats) {
      for (let seat of row) {
        if (!this.isBooked(seat) && reserved < seatsToReserve) {
          this.bookedSeats.push(seat);  // Add to permanently booked seats
          this.currentUserBookedSeats.push(seat); // Track for the current user
          reserved++;
        }
        if (reserved === seatsToReserve) break;
      }
      if (reserved === seatsToReserve) break;
    }

    this.updateAvailableSeats();
    this.checkAllSeatsBooked();
  }

  // Update the count of available seats
  updateAvailableSeats() {
    this.availableSeats = this.totalSeats - this.bookedSeats.length;
  }

  // Check if all seats are booked
  checkAllSeatsBooked() {
    if (this.bookedSeats.length >= this.totalSeats) {
      this.allSeatsBooked = true;
    }
  }

  // Get the list of seat numbers booked by the current user
  getCurrentUserBookedSeats(): string {
    return this.currentUserBookedSeats.map(seat => seat.number).join(', ');
  }
}
