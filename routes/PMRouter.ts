import { Request, Response } from 'express';
import { serviceMiddleware } from '../middleware/middleware';
import { masterController } from '../controllers/MasterController';
import { onboardingController } from '../controllers/OnboardingController';
import { loanController } from '../controllers/LoanController';
import { repaymentController } from '../controllers/RepaymentController';
import { callbackNotificationController } from '../controllers/CallbackNotificationController';

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

router.post('/loan', serviceMiddleware, loanController.submitLoan);
router.post('/loan/process', serviceMiddleware, loanController.processLoan);
router.post(
  '/loan/histories',
  serviceMiddleware,
  loanController.getLoanHistory,
);
router.post('/loan/status', serviceMiddleware, loanController.getLoanStatus);
router.post(
  '/loan/calculation',
  serviceMiddleware,
  loanController.loanCalculation,
);

router.post(
  '/repayment/online',
  serviceMiddleware,
  repaymentController.onlineRepayment,
);
router.post(
  '/repayment/offline',
  serviceMiddleware,
  repaymentController.offlineRepayment,
);
router.post(
  '/repayment/offline/otp/request',
  serviceMiddleware,
  repaymentController.offlineRepaymentOTPRequest,
);
router.post(
  '/repayment/offline/otp/verify',
  serviceMiddleware,
  repaymentController.offlineRepaymentOTPVerify,
);
router.post(
  '/repayment/cash',
  serviceMiddleware,
  repaymentController.cashRepayment,
);

router.post(
  '/callback/loan/active',
  callbackNotificationController.callbackOnLoanActive,
);
router.post(
  '/callback/loan/repayment',
  callbackNotificationController.callbackOnRepayment,
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
