import * as dotenv from 'dotenv';
import {axiosPostRequest} from '../utils/RequestHandler';
import {SiteInfoService} from './SiteInfoService';
import {OutagesService} from './OutagesService';

dotenv.config({path: '.env.local'});
const filter_date_env = String(process.env.FILTER_DATE);
const filter_date = new Date(filter_date_env);

const RETRY = Number(process.env.RETRY);
const BASE_PATH = String(process.env.BASE_PATH);
const SITE_OUTAGES = String(process.env.SITE_OUTAGES);
const URL: string = BASE_PATH + SITE_OUTAGES;

const siteInfoService = new SiteInfoService();
const outagesService = new OutagesService();

export class SiteOutagesService {
  public async saveOutages(siteId: string): Promise<any> {
    const body = await this.bodyFormatter(siteId);
    const response: any = await axiosPostRequest(
      URL + '/' + siteId,
      body,
      RETRY
    );
    return response.data;
  }

  public async bodyFormatter(siteId: any) {
    const outagesResponse = await outagesService.getOutages();
    const siteInfoResponse = await siteInfoService.getSiteInfo(siteId);
    return await this.filter(outagesResponse, siteInfoResponse);
  }

  public async filter(
    outagesResponse: any,
    siteInfoResponse: any
  ): Promise<any> {
    try {
      const deviceList: Array<any> = [];
      const siteDeviceInfoTable = new Map<string, string>();
      if (outagesResponse && siteInfoResponse) {
        const siteDeviceInfo = siteInfoResponse.devices;
        for (const deviceInfo of siteDeviceInfo) {
          siteDeviceInfoTable.set(deviceInfo.id, deviceInfo.name);
        }
        for (const outages of outagesResponse) {
          const begin = new Date(outages.begin);
          if (begin >= filter_date) {
            const deviceName = siteDeviceInfoTable.get(outages.id);
            if (deviceName) {
              outages['name'] = deviceName;
              deviceList.push(outages);
            }
          }
        }
      }
      return deviceList;
    } catch (error) {
      console.log('Filter Error', error);
    }
  }
}
