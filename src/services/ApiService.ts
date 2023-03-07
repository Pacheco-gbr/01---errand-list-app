import axios, { AxiosResponse } from "axios";
import { ResponseAPI } from "../store/modules/typeStore";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const apiGet = async (route: string) => {
  try {
    const response: AxiosResponse = await axios.get(route);

    const responseAPI: ResponseAPI = {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
    };

    return responseAPI;
  } catch (error: any) {

    const responseAPIError: ResponseAPI = {
      success: error.response.data.success,
      message: error.response.data.message,
      data: error.response.data.data,
    };

    return responseAPIError;
  }
};

export const apiPost = async (route: string, data: any) => {
  try {
    const response: AxiosResponse = await axios.post(route, data);

    const responseAPI: ResponseAPI = {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data
    };

    return responseAPI;

  } catch (error: any) {
    const responseAPIError: ResponseAPI = {
      success: error.response.data.success,
      message: error.response.data.message,
      data: error.response.data.data,
    };

    return responseAPIError;
  }
};

export const apiPut = async (route: string, data: any) => {
  try {
    const response: AxiosResponse = await axios.put(route, data);

    const responseAPI: ResponseAPI = {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
    };

    return responseAPI;
  } catch (error: any) {
    const responseAPIError: ResponseAPI = {
      success: error.response.data.success,
      message: error.response.data.message,
      data: error.response.data.data,
    };

    return responseAPIError;
  }
};

export const apiDelete= async (route: string) => {
  try {
    const response: AxiosResponse = await axios.delete(route);

    const responseAPI: ResponseAPI = {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
    };

    return responseAPI;
  } catch (error: any) {
    const responseAPIError: ResponseAPI = {
      success: error.response.data.success,
      message: error.response.data.message,
      data: error.response.data.data,
    };

    return responseAPIError;
  }
};