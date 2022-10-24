import { expect } from 'chai';
import * as dotenv from 'dotenv';
dotenv.config();
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';


describe('valid ticket type request', () => {

    it('should set the adult ticket price', () => {
        const ticketTypeRequest = new TicketTypeRequest('ADULT', 1);
        expect(ticketTypeRequest.getTicketPrice()).to.equal(parseInt(process.env.ADULT_PRICE));
    })

    it('should set the child ticket price', () => {
        const ticketTypeRequest = new TicketTypeRequest('CHILD', 1);
        expect(ticketTypeRequest.getTicketPrice()).to.equal(parseInt(process.env.CHILD_PRICE));
    })

    it('should set the infant ticket price', () => {
        const ticketTypeRequest = new TicketTypeRequest('INFANT', 1);
        expect(ticketTypeRequest.getTicketPrice()).to.equal(parseInt(process.env.INFANT_PRICE));
    })

    it('should return if the ticket is an adult ticket', () => {
        const ticketTypeRequest = new TicketTypeRequest('ADULT', 1);
        expect(ticketTypeRequest.getAdultPresent()).to.equal(true);
    })

    it('should return the correct number of tickets', () => {
        const ticketTypeRequest = new TicketTypeRequest('CHILD', 5);
        expect(ticketTypeRequest.getNoOfTickets()).to.equal(5);
    })

    it('should return the correct price for the request when there are multiple tickets', () => {
        const ticketTypeRequest = new TicketTypeRequest('CHILD', 5);
        expect(ticketTypeRequest.getTicketPrice()).to.equal(parseInt(process.env.CHILD_PRICE) * 5);
    })
})

describe('invalid ticket type request', () => {

    it('should throw an error when the type is not one of ADULT, CHILD or INFANT', () => {
        expect(() => new TicketTypeRequest('ABCD', 1)).to.throw(TypeError, 'type must be ADULT, CHILD, or INFANT');
    })

    it('should throw an error when the noOfTickets is not an integer', () => {
        expect(() => new TicketTypeRequest('ADULT', '2')).to.throw(TypeError, 'noOfTickets must be an integer');
    })
})