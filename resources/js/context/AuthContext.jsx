import {useState, createContext, useContext, useEffect} from 'react';
import {
    useGetProfileQuery,
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation
} from "../store/components/auth.js";
import {toast} from "react-toastify";

import { tasksApi } from "../store/components/tasks.js";
import {store} from "../store/store.js";

const defaultProvider = {
    user: null,
    loading: false,
    handleLogin: (data) => {},
    handleRegister: (data) => {},
    handleLogout: () => {},
}

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(defaultProvider.user);
    const [login, result] = useLoginMutation();
    const [logout, logoutResult] = useLogoutMutation();

    const [register, registerResult] = useRegisterMutation();

    const { data, isSuccess, isFetching, isError, refetch, isUninitialized } = useGetProfileQuery(null, {
        skip: !loggedIn
    })

    const handleLogin = (userData) => {
        login(userData);
    }

    const handleRegister = (userData) => {
        register(userData);
    }

    const handleLogout = () => {
        logout();
    }

    useEffect(() => {
        if (registerResult.status === 'fulfilled') {
            toast('Registered!')
            window.location.reload();
        }
    }, [registerResult])

    useEffect(() => {
        if (result.status === 'fulfilled' && result.data.status) {
            localStorage.setItem('todo:token', result.data.token);
            setLoggedIn(true);
            toast('Welcome back :)')
            if (!isUninitialized) {
                refetch();
            }
        }
        if (result.status === 'rejected') {
            toast('Invalid credentials');
        }
    }, [result]);

    useEffect(() => {
        if (data && data.data) {
            setUser(data.data);
        }

        if (isError) {
            setLoggedIn(false);
            setUser(null);
            window.localStorage.removeItem('todo:token');
        }

    }, [isSuccess, data, isError])

    useEffect(() => {
        if (logoutResult.status === 'fulfilled') {
            setLoggedIn(false)
            window.localStorage.removeItem('todo:token');
            setUser(null);
            toast('Goodbye!')
            store.dispatch(tasksApi.util.resetApiState());
        }
    }, [logoutResult]);

    useEffect(() => {
        if (window.localStorage.getItem('todo:token')) {
            setLoggedIn(true)
        }
    }, [])


    return <AuthContext.Provider value={{ user: loggedIn && user ? user : null, loading: result.status === 'pending' || isFetching, handleLogin, handleLogout, handleRegister }}>{children}</AuthContext.Provider>
}

const useAuth = () => {
    return useContext(AuthContext);
}


export { AuthProvider, AuthContext, useAuth };
