export interface GetParamsType {
  endpoint: string;
  params?: Record<string, any>;
  config?: any;
}

export interface PostParamsType {
  endpoint: string;
  data?: Record<string, any>;
  config?: any;
}
