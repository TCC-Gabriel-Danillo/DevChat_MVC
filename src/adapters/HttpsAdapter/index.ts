import axios, { AxiosInstance } from "axios";

import { HttpsAdapterType } from "./types";

const headers = {
  "Content-Type": "application/json",
};

export class HttpsAdapter implements HttpsAdapterType {
  private api: AxiosInstance;
  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers,
    });
  }

  get = async <T>(endpoint: string, config?: any, params?: Record<string, any>) => {
    try {
      const response = await this.api.get(endpoint, { ...config, params });
      console.log("🚀 ~ file: index.ts:21 ~ HttpsAdapter ~ response", response);
      return response.data as T;
    } catch (error) {
      throw error;
    }
  };

  post = async <T>(endpoint: string, data: Record<string, any>, config?: any) => {
    try {
      const response = await this.api.post(endpoint, data, { ...config });
      return response.data as T;
    } catch (error) {
      throw error;
    }
  };
}
