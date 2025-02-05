module.exports = {
    isPrime: function(num) {
        if (num <= 1) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    },

    isPerfect: function(num) {
        let sum = 0;
        for (let i = 1; i < num; i++) {
            if (num % i === 0) sum += i;
        }
        return sum === num;
    },

    isArmstrong: function(num) {
        const digits = num.toString().split('');
        const power = digits.length;
        const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), power), 0);
        return sum === num;
    },

    digitSum: function(num) {
        return num.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
    }
};