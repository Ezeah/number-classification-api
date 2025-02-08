import { classifyNumber } from '../utils/numberUtils.mjs';
import fetch from 'node-fetch';

class NumberController {
    async classifyNumber(req, res) {
        try {
            const input = req.query.number;
            const classificationResult = classifyNumber(input);

            if (classificationResult.error) {
                return res.status(400).json({ error: true });
            }

            const funFact = await this.getFunFact(classificationResult.number);
            return res.status(200).json({
                ...classificationResult,
                fun_fact: funFact
            });
        } catch (error) {
            console.error('Error classifying number:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
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