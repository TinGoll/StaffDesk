import axios, { type AxiosRequestConfig, type Method } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

interface FetcherArgs<D = unknown> {
  url: string;
  method?: Method;
  params?: Record<string, any>;
  data?: D; 
  config?: AxiosRequestConfig;
}

export const fetcher = async <R = unknown, D = unknown>({
  url,
  method = 'GET',
  params,
  data,
  config,
}: FetcherArgs<D>): Promise<R> => {
  const response = await api.request<R>({
    url,
    method,
    params,
    data,
    ...config,
  });
  return response.data;
};