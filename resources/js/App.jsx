import React, {useState} from 'react';
import { createRoot } from "react-dom/client";
import TodoList from "./components/TodoList.jsx";
import { Header, Profile } from './components';
import { AuthProvider } from './context/AuthContext.jsx';
import LoginForm from "./components/LoginForm.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from "./components/RegisterForm.jsx";

function App() {
    const [view, setView] = useState('login')
    const { user } = useAuth()

    return (
        <div>
            <Header />
            {user && <Profile />}
            {!user ? view === 'login' ? <LoginForm setView={(view) => setView(view)} /> : <RegisterForm setView={() => setView('login')} /> : <TodoList />}
        </div>
    );
}

export default App;

if (document.getElementById('react')) {
    createRoot(document.getElementById('react')).render(
        <Provider store={store}>
            <AuthProvider>
                <App />
            </AuthProvider>
            <ToastContainer />
        </Provider>
    )
}
