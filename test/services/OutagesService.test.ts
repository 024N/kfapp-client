import {OutagesService} from '../../app/services/OutagesService';
import {outagesResponse} from '../constant';

describe('OutagesService Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // jest.resetAllMocks();
    // jest.resetModules();
    // jest.restoreAllMocks();
  });

  const outagesService = new OutagesService();
  
  //######## Test: getOutages() ################
  test('Should return all outages, after method called', async () => {
    // GIVEN
    expect.assertions(2);
    // WHEN
    const getOutages: any = jest
      .spyOn(outagesService, 'getOutages')
      .mockReturnValue(outagesResponse);
    const response: any = await outagesService.getOutages();
    // THEN
    expect(response).toEqual(outagesResponse);
    expect(getOutages).toBeCalled();
  });
});
