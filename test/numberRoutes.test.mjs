import request from 'supertest';
import express from 'express';
import numberRoutes from '../src/routes/numberRoutes.js';
import { expect } from 'chai';

const app = express();
app.use('/api', numberRoutes);

describe('GET /api/classify-number', function() {
    this.timeout(10000); // Increase timeout to 10 seconds

    it('should classify a valid number', (done) => {
        request(app)
            .get('/api/classify-number?number=371')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { number, is_prime, is_perfect, properties, digit_sum, fun_fact } = res.body;
                expect(number).to.equal(371);
                expect(is_prime).to.be.false;
                expect(is_perfect).to.be.false;
                expect(properties).to.include('armstrong');
                expect(properties).to.include('odd');
                expect(digit_sum).to.equal(11);
                expect(fun_fact).to.be.a('string');
                done();
            });
    });

    it('should return error for non-numeric input', (done) => {
        request(app)
            .get('/api/classify-number?number=abc')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                const { number, error } = res.body;
                expect(number).to.equal('alphabet');
                expect(error).to.be.true;
                done();
            });
    });

    it('should classify zero', (done) => {
        request(app)
            .get('/api/classify-number?number=0')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { number, is_prime, is_perfect, properties, digit_sum, fun_fact } = res.body;
                expect(number).to.equal(0);
                expect(is_prime).to.be.false; // Ensure 0 is not prime
                expect(is_perfect).to.be.false; // Ensure 0 is not perfect
                expect(properties).to.include('even'); // Ensure 'even' is included
                expect(properties).to.not.include('prime'); // Ensure 'prime' is NOT included
                expect(digit_sum).to.equal(0); // Ensure digit sum is 0
                expect(fun_fact).to.equal('Zero is neither positive nor negative.');
                done();
            });
    });    

    it('should classify a negative number', (done) => {
        request(app)
            .get('/api/classify-number?number=-5')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { number, is_prime, is_perfect, properties, digit_sum, fun_fact } = res.body;
                expect(number).to.equal(-5);
                expect(is_prime).to.be.false;
                expect(is_perfect).to.be.false;
                expect(properties).to.include('odd');
                expect(digit_sum).to.equal(5);
                expect(fun_fact).to.be.a('string');
                done();
            });
    });

    it('should classify a very large number', (done) => {
        const largeNumber = 999999937; // A large prime number
        request(app)
            .get(`/api/classify-number?number=${largeNumber}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const { number, is_prime, is_perfect, properties, digit_sum, fun_fact } = res.body;
                expect(number).to.equal(largeNumber);
                expect(is_prime).to.be.true;
                expect(is_perfect).to.be.false;
                expect(properties).to.include('odd');
                expect(digit_sum).to.be.a('number');
                expect(fun_fact).to.be.a('string');
                done();
            });
    });
});