const numberUtils = require('../utils/numberUtils');

class NumberController {
    async classifyNumber(req, res) {
        const number = parseInt(req.query.number, 10);

        if (isNaN(number) || !Number.isInteger(number)) {
            return res.status(400).json({ number: "alphabet", error: true });
        }

        const isPrime = numberUtils.isPrime(number);
        const isPerfect = numberUtils.isPerfect(number);
        const isArmstrong = numberUtils.isArmstrong(number);
        const digitSum = numberUtils.digitSum(number);
        const properties = [];

        if (isArmstrong) {
            properties.push('armstrong');
        }
        properties.push(number % 2 === 0 ? 'even' : 'odd');

        const funFact = await this.getFunFact(number);

        return res.status(200).json({
            number: number,
            is_prime: isPrime,
            is_perfect: isPerfect,
            properties: properties,
            digit_sum: digitSum,
            fun_fact: funFact
        });
    }

    async getFunFact(num) {
        const response = await fetch(`http://numbersapi.com/${num}/math`);
        const text = await response.text();
        return text;
    }
}

const numberController = new NumberController();
module.exports = numberController;