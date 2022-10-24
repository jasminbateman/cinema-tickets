import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException

    if(this.#validateAccountNumber(accountId) && this.#validateAdultPurchase(ticketTypeRequests) && this.#validateAdultToInfantRatio(ticketTypeRequests) && this.#validateTicketAmount(ticketTypeRequests)) {
        const seatingReservation = new SeatReservationService();
        const payment = new TicketPaymentService();

        const noOfSeats = this.#processSeatReservation(ticketTypeRequests);
        const totalAmount = this.#calculateTotalCost(ticketTypeRequests);

        seatingReservation.reserveSeat(accountId, noOfSeats);
        payment.makePayment(accountId, totalAmount);
        return `You have successfully purchased your tickets at a cost of ${totalAmount} and reserved ${noOfSeats} seats`
    } 
  }

  #validateAccountNumber(accountId) {
    const validId = accountId >= 1;
    if(!validId) {
      throw new InvalidPurchaseException('Account ID must be more than or equal to 1.');
    }
    return validId;
  }

  #validateAdultPurchase(ticketTypeRequests) {
    let noOfAdults = 0;
    
    ticketTypeRequests.forEach((req) => {
      if (req.getAdultPresent()) {
        noOfAdults += req.getNoOfTickets();
      };
    });
    const adultPresent = noOfAdults >= 1

    if (!adultPresent) {
      throw new InvalidPurchaseException('You must purchase at least one adult ticket.');
    }

    return adultPresent;
  }

  #validateAdultToInfantRatio(ticketTypeRequests) {
    let noOfAdults = 0;
    let noOfInfants = 0;

    ticketTypeRequests.forEach((req) => {

      if (req.getTicketType() === 'ADULT') {
        noOfAdults += req.getNoOfTickets();
      } else if (req.getTicketType() === 'INFANT') {
        noOfInfants += req.getNoOfTickets();
      };
    });

    const adultRatioMet = noOfAdults >= noOfInfants;

    if (!adultRatioMet) {
      throw new InvalidPurchaseException('For every infant ticket purchased, there must be an accompanying adult ticket. Please adjust the your ticket purchase to meet this criteria.');
    };

    return adultRatioMet;
  }

  #validateTicketAmount(ticketTypeRequests) { 
    let noOfTickets = 0; 
    
    ticketTypeRequests.forEach((req) => {
      noOfTickets += req.getNoOfTickets();
    })

    const lessThan20 = noOfTickets <= 20;

    if (!lessThan20) {
      throw new InvalidPurchaseException('You can only puchase up to 20 tickets.');
    }
    return lessThan20;   
  }

  #calculateTotalCost(ticketTypeRequest) {
    let totalAmount = 0;
    
    ticketTypeRequest.forEach((req) => {
      totalAmount += req.getTicketPrice();
    });

    return totalAmount;
  }

  #processSeatReservation(ticketTypeRequest) {
    let seatsForReservation = 0;
    ticketTypeRequest.forEach((req) => {
      if (req.getTicketType() != 'INFANT') {
        seatsForReservation += req.getNoOfTickets();
      }
    })
    return seatsForReservation;
  }

}
