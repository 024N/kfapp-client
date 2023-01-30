import * as dotenv from 'dotenv';
import {axiosGetRequest} from '../utils/RequestHandler';

dotenv.config({path: '.env.local'});
const RETRY = Number(process.env.RETRY);
const BASE_PATH = String(process.env.BASE_PATH);
const OUTAGES = String(process.env.OUTAGES);
const URL: string = BASE_PATH + OUTAGES;

export class OutagesService {
  public async getOutages(): Promise<any> {
    const response: any = await axiosGetRequest(URL, RETRY);
    return response.data;
  }
}
