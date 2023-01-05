import { Request, Response } from 'express';
import { serviceMiddleware } from '../middleware/middleware';
import { masterController } from '../controllers/MasterController';

const express = require('express');
const router = express.Router();

router.get(
  '/marital-status',
  serviceMiddleware,
  masterController.getMaritalStatus,
);
router.get('/genders', serviceMiddleware, masterController.getGender);
router.get('/religions', serviceMiddleware, masterController.getReligion);
router.get('/educations', serviceMiddleware, masterController.getEducation);
router.get('/postal-code', serviceMiddleware, masterController.getPostalCode);

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
