import { configureStore } from '@reduxjs/toolkit'
import {authApi} from "./components/auth.js";
import {tasksApi} from "./components/tasks.js";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(tasksApi.middleware)
})
