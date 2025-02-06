import request from 'supertest';
import express from 'express';
import numberRoutes from '../src/routes/numberRoutes.mjs';
import { expect } from 'chai';

const app = express();
app.use('/api', numberRoutes);

/**
 * Test suite for the /api/classify-number endpoint.
 */
describe('GET /api/classify-number', function() {
    this.timeout(10000); // Increase timeout to 10 seconds

    /**
     * Test case for classifying a valid number.
     */
    it('should classify a valid number', async () => {
        const res = await request(app)
            .get('/api/classify-number?number=371')
            .expect('Content-Type', /json/)
            .expect(200);

        const { number, is_prime, is_perfect, properties, digit_sum, fun_fact } = res.body;
        expect(number).to.equal(371);
        expect(is_prime).to.be.false;
        expect(is_perfect).to.be.false;
        expect(properties).to.include('armstrong');
        expect(properties).to.include('odd');
        expect(digit_sum).to.equal(11);
        expect(fun_fact).to.be.a('string');
    });

    /**
     * Test case for handling non-numeric input.
     */
    it('should return error for non-numeric input', async () => {
        const res = await request(app)
            .get('/api/classify-number?number=abc')
            .expect('Content-Type', /json/)
            .expect(400);

        const { number, error } = res.body;
        expect(number).to.equal('alphabet');
        expect(error).to.be.true;
    });

    /**
     * Test case for classifying zero.
     */
    it('should classify zero', async () => {
        const res = await request(app)
            .get('/api/classify-number?number=0')
            .expect('Content-Type', /json/)
            .expect(200);

        const { number, is_prime, is_perfect, properties, digit_sum, fun_fact } = res.body;
        expect(number).to.equal(0);
        expect(is_prime).to.be.false;
        expect(is_perfect).to.be.false;
        expect(properties).to.include('even');
        expect(digit_sum).to.equal(0);
        expect(fun_fact).to.be.a('string');
    });

    /**
     * Test case for classifying a negative number.
     */
    it('should classify a negative number', async () => {
        const res = await request(app)
            .get('/api/classify-number?number=-5')
            .expect('Content-Type', /json/)
            .expect(200);

        const { number, is_prime, is_perfect, properties, digit_sum, fun_fact } = res.body;
        expect(number).to.equal(-5);
        expect(is_prime).to.be.false;
        expect(is_perfect).to.be.false;
        expect(properties).to.include('odd');
        expect(digit_sum).to.equal(5);
        expect(fun_fact).to.be.a('string');
    });

    /**
     * Test case for classifying a very large number.
     */
    it('should classify a very large number', async () => {
        const largeNumber = 999999937; // A large prime number
        const res = await request(app)
            .get(`/api/classify-number?number=${largeNumber}`)
            .expect('Content-Type', /json/)
            .expect(200);

        const { number, is_prime, is_perfect, properties, digit_sum, fun_fact } = res.body;
        expect(number).to.equal(largeNumber);
        expect(is_prime).to.be.true;
        expect(is_perfect).to.be.false;
        expect(properties).to.include('odd');
        expect(digit_sum).to.be.a('number');
        expect(fun_fact).to.be.a('string');
    });
});