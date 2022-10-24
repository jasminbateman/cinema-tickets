import TicketService from "../TicketService.js";
import TicketTypeRequest from '../lib/TicketTypeRequest.js';
import Joi from 'joi';

export default class TicketController {

    newPurchase = (req, res) => {

        const { accountId, noOfAdults, noOfChildren, noOfInfants } = req.body;
        const schema = Joi.object({
            accountId: Joi.number().integer().min(1).required(),
            noOfAdults: Joi.number(),
            noOfChildren: Joi.number(),
            noOfInfants: Joi.number()
        });

        const result = schema.validate({ accountId, noOfAdults, noOfChildren, noOfInfants });
        const err = result.error;

        if (err) {
            return res.status(422).json({
                status: 'error',
                message: 'Invalid request body',
                data: err
            });
        }

        try {
            const ticketRequest = new TicketService();
            const message = ticketRequest.purchaseTickets(accountId, new TicketTypeRequest('ADULT', noOfAdults), new TicketTypeRequest('CHILD', noOfChildren), new TicketTypeRequest('INFANT', noOfInfants));
            res.status(200).json({ message: message });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }

    }
}
