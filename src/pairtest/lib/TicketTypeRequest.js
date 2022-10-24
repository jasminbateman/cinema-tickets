/**
 * Immutable Object.
 */

export default class TicketTypeRequest {
  #type;

  #noOfTickets;

  #price;

  constructor(type, noOfTickets) {
    if (!this.#Type.includes(type)) {
      throw new TypeError(`type must be ${this.#Type.slice(0, -1).join(', ')}, or ${this.#Type.slice(-1)}`);
    }

    if (!Number.isInteger(noOfTickets)) {
      throw new TypeError('noOfTickets must be an integer');
    }

    this.#type = type;
    this.#noOfTickets = noOfTickets;
    this.#price = this.setTicketPrice(type, noOfTickets);
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }

  setTicketPrice(type, noOfTickets) {
    let cost;
    if (type === 'ADULT') {
      cost = process.env.ADULT_PRICE;
    } else if (type === 'CHILD') {
      cost = process.env.CHILD_PRICE;
    } else if (type === 'INFANT') {
      cost = process.env.INFANT_PRICE;
    }

    return cost * noOfTickets;
  }

  getTicketPrice() {
    return this.#price;
  }

  getAdultPresent() {
    return this.#type === 'ADULT';
  }

  #Type = ['ADULT', 'CHILD', 'INFANT'];
}
