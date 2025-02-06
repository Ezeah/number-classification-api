import { isPrime, isPerfect, isArmstrong, digitSum } from '../utils/numberUtils.mjs';
import fetch from 'node-fetch';

class NumberController {
    async classifyNumber(req, res) {
        const number = parseInt(req.query.number, 10);

        if (isNaN(number) || !Number.isInteger(number)) {
            return res.status(400).json({ number: "alphabet", error: true });
        }

        const isPrimeResult = isPrime(number);
        const isPerfectResult = isPerfect(number);
        const isArmstrongResult = isArmstrong(number);
        const digitSumResult = digitSum(number);
        const properties = [];

        if (isArmstrongResult) {
            properties.push('armstrong');
        }
        properties.push(number % 2 === 0 ? 'even' : 'odd');

        try {
            const funFact = await this.getFunFact(number);
            return res.status(200).json({
                number: number,
                is_prime: isPrimeResult,
                is_perfect: isPerfectResult,
                properties: properties,
                digit_sum: digitSumResult,
                fun_fact: funFact
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch fun fact' });
        }
    }

    async getFunFact(num) {
        try {
            const response = await fetch(`http://numbersapi.com/${num}/math`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const text = await response.text();
            return text;
        } catch (error) {
            console.error('Error fetching fun fact:', error);
            throw error;
        }
    }
}

const numberController = new NumberController();
export default numberController;