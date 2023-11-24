import { Router } from 'express';

import * as AuthController from '../controllers/auth.controller';
import authGuard from '../middlewares/auth-guard';

const router = Router();

router.post('/login', AuthController.login);
router.get('/me', authGuard, AuthController.getAccount);
router.post('/refresh-token', authGuard, AuthController.refreshToken);

export default router;
