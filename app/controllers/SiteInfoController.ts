import express, {Request, Response, NextFunction} from 'express';
import {sendFailed, sendSuccess} from '../utils/Response';
import {requestValidator} from '../middleware/RequestValidator';
import {SiteInfo} from '../models/schema/SiteInfo';
import {SiteInfoService} from '../services/SiteInfoService';

const router = express.Router();
const siteInfoService = new SiteInfoService();

router.get(
  '/:siteId',
  requestValidator(SiteInfo),
  async (req: Request, res: Response, next: NextFunction) => {
    const siteId = req.params.siteId;
    const response = await siteInfoService.getSiteInfo(siteId).catch(next);
    if (response) {
      sendSuccess(res, response);
    }
  }
);
export default router;
