import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios from '@blog/client/admin/axios';
import { AxiosRequestConfig, AxiosError } from 'axios';

const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string;
            method: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
            params?: AxiosRequestConfig['params'];
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, params }) => {
        try {
            const result = await axios({ url, method, data, params });
            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: { status: err.response?.status, data: err.response?.data },
            };
        }
    };

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        fetchUserInfo: build.query<any, void>({
            query: () => ({
                url: '/user/login-info',
                method: 'get',
            }),
        }),
    }),
});

export const { useFetchUserInfoQuery } = adminApi;
