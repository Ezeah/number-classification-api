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
            .get('/api/classify-number?number=a')
            .expect('Content-Type', /json/)
            .expect(400);

        const { error } = res.body;
        expect(error).to.be.true;
    });

    /**
     * Test case for handling non-numeric input 2rw3.
     */
    it('should return error for non-numeric input 2rw3', async () => {
        const res = await request(app)
            .get('/api/classify-number?number=2rw3')
            .expect('Content-Type', /json/)
            .expect(400);

        const { error } = res.body;
        expect(error).to.be.true;
    });

    /**
     * Test case for handling non-numeric input sample.
     */
    it('should return error for non-numeric input sample', async () => {
        const res = await request(app)
            .get('/api/classify-number?number=sample')
            .expect('Content-Type', /json/)
            .expect(400);

        const { error } = res.body;
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
     * Test case for classifying a negative number and returning negative digit sum.
     */
    it('should classify a negative number and return negative digit sum', async () => {
        const res = await request(app)
            .get('/api/classify-number?number=-124')
            .expect('Content-Type', /json/)
            .expect(200);

        const { number, is_prime, is_perfect, properties, digit_sum, fun_fact } = res.body;
        expect(number).to.equal(-124);
        expect(is_prime).to.be.false;
        expect(is_perfect).to.be.false;
        expect(properties).to.include('even');
        expect(digit_sum).to.equal(-7);
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

    /**
     * Test case for classifying -4.
     */
    it('should classify -4', async () => {
        const res = await request(app)
            .get('/api/classify-number?number=-4')
            .expect('Content-Type', /json/)
            .expect(200);

        const { number, is_prime, is_perfect, properties, digit_sum, fun_fact } = res.body;
        expect(number).to.equal(-4);
        expect(is_prime).to.be.false;
        expect(is_perfect).to.be.false;
        expect(properties).to.include('even');
        expect(digit_sum).to.equal(-4);
        expect(fun_fact).to.be.a('string');
    });

    /**
     * Test case for classifying 124.
     */
    it('should classify 124', async () => {
        const res = await request(app)
            .get('/api/classify-number?number=124')
            .expect('Content-Type', /json/)
            .expect(200);

        const { number, is_prime, is_perfect, properties, digit_sum, fun_fact } = res.body;
        expect(number).to.equal(124);
        expect(is_prime).to.be.false;
        expect(is_perfect).to.be.false;
        expect(properties).to.include('even');
        expect(digit_sum).to.equal(7);
        expect(fun_fact).to.be.a('string');
    });

    /**
     * Test case for classifying 450.
     */
    it('should classify 450', async () => {
        const res = await request(app)
            .get('/api/classify-number?number=450')
            .expect('Content-Type', /json/)
            .expect(200);

        const { number, is_prime, is_perfect, properties, digit_sum, fun_fact } = res.body;
        expect(number).to.equal(450);
        expect(is_prime).to.be.false;
        expect(is_perfect).to.be.false;
        expect(properties).to.include('even');
        expect(digit_sum).to.equal(9);
        expect(fun_fact).to.be.a('string');
    });
});