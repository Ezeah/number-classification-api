class NumberController {
    async classifyNumber(req, res) {
        const number = parseInt(req.query.number, 10);

        if (isNaN(number) || !Number.isInteger(number)) {
            return res.status(400).json({ number: "alphabet", error: true });
        }

        const isPrime = this.isPrime(number);
        const isPerfect = this.isPerfect(number);
        const isArmstrong = this.isArmstrong(number);
        const digitSum = this.digitSum(number);
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

    isPrime(num) {
        if (num <= 1) return false;
        for (let i = 2; i < num; i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    isPerfect(num) {
        let sum = 1;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                if (i === (num / i)) sum += i;
                else sum += (i + num / i);
            }
        }
        return sum === num && num !== 1;
    }

    isArmstrong(num) {
        const digits = num.toString().split('');
        const power = digits.length;
        const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0);
        return sum === num;
    }

    digitSum(num) {
        return num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }

    async getFunFact(num) {
        const response = await fetch(`http://numbersapi.com/${num}/math`);
        const text = await response.text();
        return text;
    }
}

const numberController = new NumberController();
module.exports = numberController;