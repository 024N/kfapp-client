import express, {Request, Response, NextFunction} from 'express';
import {sendFailed, sendSuccess} from '../utils/Response';
import {requestValidator} from '../middleware/RequestValidator';
import {EnhancedOutages} from '../models/schema/EnhancedOutages';
import {SiteOutagesService} from '../services/SiteOutagesService';

const router = express.Router();
const siteOutagesService = new SiteOutagesService();

router.post(
  '/:siteId',
  requestValidator(EnhancedOutages),
  async (req: Request, res: Response, next: NextFunction) => {
    const siteId = req.params.siteId;
    const response = await siteOutagesService.saveOutages(siteId).catch(next);
    if (response) {
      sendSuccess(res, response);
    }
  }
);

export default router;
