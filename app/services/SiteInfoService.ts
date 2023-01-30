import * as dotenv from 'dotenv';
import {axiosGetRequest} from '../utils/RequestHandler';

dotenv.config({path: '.env.local'});
const RETRY = Number(process.env.RETRY);
const BASE_PATH = String(process.env.BASE_PATH);
const SITE_INFO = String(process.env.SITE_INFO);
const URL: string = BASE_PATH + SITE_INFO;

export class SiteInfoService {
  public async getSiteInfo(siteId: string): Promise<any> {
    const response: any = await axiosGetRequest(URL + '/' + siteId, RETRY);
    return response.data;
  }
}
