import { Dispatch } from "@reduxjs/toolkit";
import { httpsLoaded, httpsLoading, setGetResponse, setPostResponse } from "_/store/slices/httpsSlice";
import axios, { AxiosInstance } from "axios";

import { GetParamsType, PostParamsType } from "./types";

const headers = {
  "Content-Type": "application/json",
};

export class HttpsController {
  private api: AxiosInstance;
  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers,
    });
  }

  async get<T>({ endpoint, params, config }: GetParamsType): Promise<T | undefined> {
    try {
      const response = await this.api.get(endpoint, { ...config, params });
      return response.data as T;
    } catch (error) {
      console.error(error);
    }
  }

  async post<T>({ endpoint, data, config }: PostParamsType): Promise<T | undefined> {
    try {
      const response = await this.api.post(endpoint, data, { ...config });
      return response.data as T;
    } catch (error) {
      console.error(error);
    }
  }
}

export const getHttpsAction = <T>(url: string, getParams: GetParamsType) => {
  const httpsController = new HttpsController(url);

  return async (dispatch: Dispatch) => {
    dispatch(httpsLoading());
    const response = await httpsController.get<T>(getParams);
    dispatch(setGetResponse(response));
    dispatch(httpsLoaded());
  };
};

export const postHttpsAction = <T>(url: string, postParams: PostParamsType) => {
  const httpsController = new HttpsController(url);

  return async (dispatch: Dispatch) => {
    dispatch(httpsLoading());
    const response = await httpsController.post<T>(postParams);
    dispatch(setPostResponse(response));
    dispatch(httpsLoaded());
  };
};
