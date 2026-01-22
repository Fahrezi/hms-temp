import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { MutationCallbacks, MutationOptions, QueryOptions } from '@/types/query';

import instance from './axiosInstance';

export const GetData = <T>(options: QueryOptions): UseQueryResult<AxiosResponse<T>> => {
  return useQuery({
    // Disabled eslint because options.url is intentionally excluded from queryKey
    // to avoid unnecessary cache invalidation when the same key is used with different URLs.
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [options.key, options.params],
    queryFn: () => instance.get(options.url, options),
    enabled: options?.enabled ?? true,
    ...options,
  });
};

export const GetDataById = <T>(id: string | number, options: QueryOptions): UseQueryResult<AxiosResponse<T>> => {
  return useQuery({
    // Disabled eslint because options.url is intentionally excluded from queryKey
    // to avoid unnecessary cache invalidation when the same key is used with different URLs.
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [options.key, id, options.params],
    queryFn: () => instance.get(`${options.url}/${id}`, options),
    enabled: options?.enabled ?? true,
    ...options,
  });
};

export const Mutation = <TData = unknown, TVariables = void>(
  options: MutationOptions,
  onSuccess?: MutationCallbacks['onSuccess'],
  onError?: MutationCallbacks['onError'],
  config?: object,
): UseMutationResult<AxiosResponse<TData>, unknown, TVariables, unknown> => {
  return useMutation({
    mutationKey: [options.key],
    mutationFn: (variables: TVariables) => {
      if (options.method === 'delete') {
        return instance.delete(options.url, config);
      }
      return instance[options.method](options.url, variables ?? options.data ?? {}, config);
    },
    onSuccess,
    onError,
    ...options,
  });
};
