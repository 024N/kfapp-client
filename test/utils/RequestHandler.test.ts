import { axiosGetRequest, axiosPostRequest } from '../../app/utils/RequestHandler';
import {outagesResponse, getSiteInfoResponse, bodyFormatterResponse} from '../constant';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RequestHandler Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // jest.resetAllMocks();
    // jest.resetModules();
    // jest.restoreAllMocks();
  });

  //######## Test: axiosGetRequest(URL: string, retry: number) ################
  test('Should return all outages, when method called', async () => {
    // GIVEN
    expect.assertions(1);
    // WHEN
    mockedAxios.get.mockResolvedValue(outagesResponse);
    const response: any = await axiosGetRequest("/outages", 3);
    // THEN
    expect(response).toEqual(outagesResponse);
  });

  test('Should return site info, when method called', async () => {
    // GIVEN
    expect.assertions(1);
    // WHEN
    mockedAxios.get.mockResolvedValue(getSiteInfoResponse);
    const response: any = await axiosGetRequest("/site-info/norwich-pear-tree", 3);
    // THEN
    expect(response).toEqual(getSiteInfoResponse);
  });

  //######## Test: axiosPostRequest(URL: string, body: any, retry: number) ################
  test('Should return status 200, when post request success', async () => {
    // GIVEN
    expect.assertions(2);
    // WHEN
    mockedAxios.post.mockResolvedValue({ data: {}, status: 200 });
    const response: any = await axiosPostRequest("/site-outages/norwich-pear-tree", "body", 3);
    // THEN
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({});
  });
});
