import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api', credentials: 'include', prepareHeaders: (headers) => {
        const token = window.localStorage.getItem('todo:token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: "POST",
                body
            }),
            invalidatesTags: ['User'],

        }),
        register: builder.mutation({
            query: (body) => ({
                url: '/register',
                method: "POST",
                body
            }),
            invalidatesTags: ['User'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: "GET"
            }),
            invalidatesTags: ['User'],
        }),
        getProfile: builder.query({
            query: () => ({
                url: '/profile',
                method: 'GET'
            }),
            providesTags: ['User'],
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery, useLogoutMutation } = authApi;
