import * as dotenv from 'dotenv';
import axios from 'axios';
import {
  InternalServerException,
  LimitExceededException,
  NotExistException,
  UnauthorizedException,
  WrongFormatException,
} from './CustomError';

dotenv.config({path: '.env.local'});
const API_KEY = String(process.env.API_KEY);
const delayTime = 5000;

export async function axiosGetRequest(URL: string, retry: number) {
  axios.defaults.headers['X-API-KEY'] = API_KEY;
  return await axios.get(URL).catch(async error => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          throw new UnauthorizedException(
            'Permission require',
            'Authorization'
          );
        case 404:
          throw new NotExistException(
            'Resource that does not exist',
            'Request'
          );
        case 429:
          throw new LimitExceededException(
            'Api Key Limit Exceeded',
            'Authorization'
          );
        case 500:
          retry--;
          if (retry !== 0) {
            await delay(delayTime);
            console.log('Error code: 500, retry:', retry);
            await axiosGetRequest(URL, retry);
          }
          throw new InternalServerException('Server Error', 'Request');
        default:
          console.log('No such error exists!', error.response.status);
          throw Error(error.response);
      }
    } else if (error.request) {
      console.log('Error Request: ', error.request);
    } else {
      console.log('Undefined Error: ', error.message);
    }
  });
}

export async function axiosPostRequest(URL: string, body: any, retry: number) {
  axios.defaults.headers['X-API-KEY'] = API_KEY;
  return await axios.post(URL, body).catch(async error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new WrongFormatException('Wrong Format', 'Request');
        case 403:
          throw new UnauthorizedException(
            'Permission require',
            'Authorization'
          );
        case 404:
          throw new NotExistException(
            'Resource that does not exist',
            'Request'
          );
        case 429:
          throw new LimitExceededException(
            'Api Key Limit Exceeded',
            'Authorization'
          );
        case 500:
          retry--;
          if (retry !== 0) {
            await delay(delayTime);
            console.log('Error code: 500, retry:', retry);
            await axiosPostRequest(URL, body, retry);
          }
          throw new InternalServerException('Server Error', 'Request');
        default:
          console.log('No such error exists!', error.response.status);
          throw Error(error.response);
      }
    } else if (error.request) {
      console.log('Error Request: ', error.request);
    } else {
      console.log('Undefined Error: ', error.message);
    }
  });
}

async function delay(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
