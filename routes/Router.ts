import { Request, Response } from 'express';
import { testController } from '../controllers/TestController';
import { serviceMiddleware } from '../middleware/middleware';

const express = require('express');
const router = express.Router();

router.post('/test', serviceMiddleware, testController.getTestResponse);

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Service is live',
  });
});

router.get('*', (req: Request, res: Response) => {
  res.status(404).json();
});

module.exports = router;
