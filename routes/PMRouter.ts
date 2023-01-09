import { Request, Response } from 'express';
import { serviceMiddleware } from '../middleware/middleware';
import { masterController } from '../controllers/MasterController';
import { onboardingController } from '../controllers/OnboardingController';

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
router.post('/postal-code', serviceMiddleware, masterController.getPostalCode);
router.get(
  '/business-length',
  serviceMiddleware,
  masterController.getBusinessLength,
);

router.post(
  '/activation/status',
  serviceMiddleware,
  onboardingController.getActivationStatus,
);
router.post(
  '/submission/transaction-history',
  serviceMiddleware,
  onboardingController.submitTransactionHistory,
);
router.post(
  '/submission/personal-data',
  serviceMiddleware,
  onboardingController.submitPersonalData,
);
router.post(
  '/submission/document-file',
  serviceMiddleware,
  onboardingController.submitDocumentFile,
);
router.post(
  '/activation/otp/request',
  serviceMiddleware,
  onboardingController.requestActivationOTP,
);
router.post(
  '/activation/otp/verify',
  serviceMiddleware,
  onboardingController.verifyActivationOTP,
);
router.post(
  '/plafond',
  serviceMiddleware,
  onboardingController.getPaylaterPlafond,
);

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
