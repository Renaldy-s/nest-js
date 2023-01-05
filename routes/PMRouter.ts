import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();

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
