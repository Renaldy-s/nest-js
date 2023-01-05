import { Request, Response } from 'express';
import { authController } from '../controllers/AuthController';

const express = require('express');
const router = express.Router();

router.post('/auth', authController.getAccessKey);

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
