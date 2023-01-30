import {SiteInfoService} from '../../app/services/SiteInfoService';
import {getSiteInfoResponse} from '../constant';

describe('SiteInfoService Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // jest.resetAllMocks();
    // jest.resetModules();
    // jest.restoreAllMocks();
  });

  const siteInfoService = new SiteInfoService();
  
  //######## Test: getSiteInfo(siteId: string) ################
  test('Should return site info, when correct siteId given', async () => {
    // GIVEN
    expect.assertions(2);
    // WHEN
    const getSiteInfo: any = jest
      .spyOn(siteInfoService, 'getSiteInfo')
      .mockReturnValue(getSiteInfoResponse);
    const response: any = await siteInfoService.getSiteInfo(
      'norwich-pear-tree'
    );
    // THEN
    expect(response).toEqual(getSiteInfoResponse);
    expect(getSiteInfo).toBeCalled();
  });
});
