import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import ticketRouter from './src/pairtest/routes/Ticket.js';

const app = express();

app.use(express.json());

app.use('/', ticketRouter);

const listener = app.listen(process.env.PORT, () => {
    console.log(`app listening on port: ${listener.address().port}`)
})

export default app;