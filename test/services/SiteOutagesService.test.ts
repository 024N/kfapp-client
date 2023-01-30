import { OutagesService } from '../../app/services/OutagesService';
import { SiteInfoService } from '../../app/services/SiteInfoService';
import {SiteOutagesService} from '../../app/services/SiteOutagesService';
import {bodyFormatterResponse, getSiteInfoResponse, outagesResponse} from '../constant';

describe('SiteOutagesService Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // jest.resetAllMocks();
    // jest.resetModules();
    // jest.restoreAllMocks();
  });

  const outagesService = new OutagesService();
  const siteInfoService = new SiteInfoService();
  const siteOutagesService = new SiteOutagesService();

  //######## Test: saveOutages(siteId: string, body: any) ################
  test('Should return OK(200), when outages saved', async () => {
    // GIVEN
    expect.assertions(2);
    // WHEN
    const bodyFormatter: any = jest
      .spyOn(siteOutagesService, 'bodyFormatter')
      .mockReturnValue(bodyFormatterResponse);

    const response: any = await siteOutagesService.saveOutages(
      'norwich-pear-tree'
    );
    // THEN
    expect(response).toEqual({});
    expect(bodyFormatter).toBeCalled();
  });

  //######## Test: bodyFormatter(siteId: any) ################
  test('Should return body, when formatter', async () => {
    // GIVEN
    expect.assertions(1);
    // WHEN
    const getOutages: any = jest
      .spyOn(outagesService, 'getOutages')
      .mockReturnValue(outagesResponse);
    const getSiteInfo: any = jest
      .spyOn(siteInfoService, 'getSiteInfo')
      .mockReturnValue(getSiteInfoResponse);

    const response: any = await siteOutagesService.bodyFormatter(
      'norwich-pear-tree'
    );
    // THEN
    expect(response).toEqual(bodyFormatterResponse);
    // expect(getOutages).toBeCalled();
    // expect(getSiteInfo).toBeCalled();
  });

  //######## Test: filter(outagesResponse: any, siteInfoResponse: any) ################
  test('Should return filtered body, when filter called', async () => {
    // GIVEN
    expect.assertions(1);
    // WHEN
 
    const response: any = await siteOutagesService.filter(outagesResponse, getSiteInfoResponse);
    // THEN
    expect(response).toEqual(bodyFormatterResponse);
  });
});
