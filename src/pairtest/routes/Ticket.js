import express from 'express';
import TicketController from '../controllers/TicketController.js';

const router = express.Router();

const controller = new TicketController();

router.post('/purchase', controller.newPurchase);

export default router;