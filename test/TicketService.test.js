import { expect } from 'chai';
import InvalidPurchaseException from '../src/pairtest/lib/InvalidPurchaseException.js';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';
import TicketService from '../src/pairtest/TicketService.js';

describe('valid ticket purchase', () => {
    const ticketService = new TicketService();

    it('should allow user to make a valid ticket purchase with the correct price and number of seat reservations', () => {
        expect(ticketService.purchaseTickets(2, new TicketTypeRequest('ADULT', 4), new TicketTypeRequest('CHILD', 2), new TicketTypeRequest('INFANT', 3)))
            .to.equal('You have successfully purchased your tickets at a cost of 100 and reserved 6 seats');
    })
})

describe('handling TicketService errors', () => {
    const ticketService = new TicketService();

    it('should throw an error when accountId is less than or equal to 1', () => {
        expect(() => {
            ticketService.purchaseTickets(0, new TicketTypeRequest('ADULT', 1))
        }).to.throw(InvalidPurchaseException, 'Account ID must be more than or equal to 1.');
    })

    it('should throw an error when there is no adult ticket purchased', () => {
        expect(() => {
            ticketService.purchaseTickets(1, new TicketTypeRequest('CHILD', 1))
        }).to.throw(InvalidPurchaseException, 'You must purchase at least one adult ticket.');
    })

    it('should throw an error when there are more infants than adults', () => {
        expect(() => {
            ticketService.purchaseTickets(1, new TicketTypeRequest('ADULT', 1), new TicketTypeRequest('INFANT', 2))
        }).to.throw(InvalidPurchaseException, 'For every infant ticket purchased, there must be an accompanying adult ticket. Please adjust the your ticket purchase to meet this criteria.');
    })

    it('should throw an error when there are more than 20 tickets', () => {
        expect(() => {
            ticketService.purchaseTickets(1, new TicketTypeRequest('ADULT', 21))
        }).to.throw(InvalidPurchaseException, 'You can only puchase up to 20 tickets.');
    })
})