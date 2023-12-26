import Env from "./Env";
import { I_ApiRes } from "./Interfaces";
import Pubs from "./Pubs";
import axios from 'axios';

// Default config options
const defaultOptions = {
  baseURL: Env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create instance
let instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(async function (config) {
  const logged = await Pubs.getUserLoggedInStorage();
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = logged ? `Bearer ${logged.accessTokenFromBE}` : '';
  return config;
}, function (_error) {
  // TODO: Handle error
});

class ApiClient {
  static makeResponse(data: any) {
    let result: I_ApiRes = {
      success: data.success,
      result: data.result,
      message: data.message,
      total: data.total,
    };

    return result;
  }

  static makeResponseError() {
    let result: I_ApiRes = {
      success: false,
      message: 'Network error!',
    };

    return result;
  }

  static async get(url: string) {
    url = Env.API_URL + url;

    const dataRes = await instance.get(url).catch((_error) => {
      return null;
    });
    return dataRes ? this.makeResponse(dataRes.data) : this.makeResponseError();
  }

  static async post(url: string, data?: any): Promise<I_ApiRes> {
    url = Env.API_URL + url;

    const dataRes = await instance.post(url, data).catch((_error) => {
      return null;
    });
    return dataRes ? this.makeResponse(dataRes.data) : this.makeResponseError();
  }

  static async put(url: string, data?: any) {
    url = Env.API_URL + url;

    const dataRes = await instance.put(url, data).catch((_error) => {
      return null;
    });
    return dataRes ? this.makeResponse(dataRes.data) : this.makeResponseError();
  }

  static async delete(url: string) {
    url = Env.API_URL + url;

    const dataRes = await instance.delete(url).catch((_error) => {
      return null;
    });
    return dataRes ? this.makeResponse(dataRes.data) : this.makeResponseError();
  }
}

export default ApiClient;
