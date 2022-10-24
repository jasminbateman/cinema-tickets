import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';

describe('POST /purchase', () => {

    describe('given a valid request body', () => {

        const req = {
            "accountId": 1,
            "noOfAdults": 2,
            "noOfChildren": 1,
            "noOfInfants": 1
        };

        const expectedReturn = "You have successfully purchased your tickets at a cost of 50 and reserved 3 seats";

        it('should respond with a 200 status code and purchase successful message', async () => {
            const response = await request(app)
                .post('/purchase')
                .send(req);
            expect(response.statusCode).to.equal(200);
            expect(response.body.message).to.equal(expectedReturn);
        })
    })

    describe('given an invalid request body', () => {

        const req = {
            "noOfInfants": 1
        };

        it('should respond with a 422 status code', async () => {
            const response = await request(app)
                .post('/purchase')
                .send(req);
            expect(response.statusCode).to.equal(422);
        })

    })

    describe('given invalid data', () => {

        it('should respond with a 404 status code when there are no adults', async () => {
            const req = {
                "accountId": 1,
                "noOfAdults": 0,
                "noOfChildren": 1
            };
            const response = await request(app)
                .post('/purchase')
                .send(req);
            expect(response.statusCode).to.equal(404);
        })
        it('should respond with a 404 status code when there are not enough adults to infants', async () => {
            const req = {
                "accountId": 1,
                "noOfAdults": 2,
                "noOfChildren": 1,
                "noOfInfants": 5
            }
            const response = await request(app)
                .post('/purchase')
                .send(req);
            expect(response.statusCode).to.equal(404);
        })
        it('should respond with a 404 status code when there are more than 20 tickets', async () => {
            const req = {
                "accountId": 1,
                "noOfAdults": 21
            }
            const response = await request(app)
                .post('/purchase')
                .send(req);
            expect(response.statusCode).to.equal(404);
        })
    })
})