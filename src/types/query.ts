import { AxiosResponse } from 'axios';

export type Options = {
  key: string | string[];
  url: string;
};

export type QueryOptions = Options & {
  enabled?: boolean;
  params?: Record<string, string | number | boolean>;
};

export type MutationOptions = Options & {
  method: 'post' | 'put' | 'delete' | 'patch';
  data?: Record<string, unknown>;
};

export type MutationCallbacks = {
  onSuccess: (res: AxiosResponse) => void;
  onError: (error: unknown) => void;
};
