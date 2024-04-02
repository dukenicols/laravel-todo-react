import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api', credentials: 'include', prepareHeaders: (headers) => {
            const token = window.localStorage.getItem('todo:token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => ({
                url: '/tasks',
                method: 'GET'
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ id }) => ({ type: 'Task', id })), 'Task']
                    : ['Task'],
        }),
        addTask: builder.mutation({
           query: (body) => ({
                url: '/tasks',
               method: 'POST',
               body: { ...body, status: 'pending' }
           }),
           invalidatesTags: ['Task'],
        }),
        updateTask: builder.mutation({
            query: (body) => ({
                url: `/tasks/${body.id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Task', id: arg.id }],
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Task', id: arg.id }],
        })
    })
})

export const { useGetTasksQuery, useDeleteTaskMutation, useAddTaskMutation, useUpdateTaskMutation } = tasksApi;
