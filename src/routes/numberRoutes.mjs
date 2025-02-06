import express from 'express';
import numberController from '../controllers/numberController.mjs';

const router = express.Router();

/**
 * @route GET /api/classify-number
 * @desc Classify a number based on various properties
 * @access Public
 */
router.get('/classify-number', numberController.classifyNumber.bind(numberController));

export default router;