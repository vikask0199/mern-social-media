import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import ChatHome from './components/chatwithfriends/ChatHome';
import ChatOutLet from './outlets/ChatOutLet';
import PublicOutlet from './outlets/PublicOutlet';
import HomePage from './pages/HomePage';
import ChatGroup from './components/chatwithfriends/ChatGroup';
import ChatCall from "./components/chatwithfriends/ChatCall"
import ChatSettings from "./components/chatwithfriends/ChatSettings"
import UserProfile from './components/chatwithfriends/UserProfile';
import Login from "./components/auth/Login"
import Signup from './components/auth/Signup';
import RequireAuth from './constants/RequireAuth';
import { ToastContainer } from 'react-toastify';
import OtpVerify from './components/auth/OtpVerify';

function App() {
  const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-400 text-white",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };


  // theme start  
  const [theme, setTheme] = useState('theme1');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const [systemTheme, setSystemTheme] = useState('light');
  useEffect(() => {
    const handleSystemThemeChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    const systemThemeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
    systemThemeMatcher.addEventListener('change', handleSystemThemeChange);
    handleSystemThemeChange(systemThemeMatcher);

    return () => {
      systemThemeMatcher.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme || systemTheme);
  }, [systemTheme, setTheme]);
  // theme ending


  return (
    <div>
      <Routes>
        <Route path='/' element={<PublicOutlet />}>
          <Route index element={<HomePage setTheme={setTheme} />} />
          <Route path='auth/login' element={<Login />} />
          <Route path='auth/register' element={<Signup />} />
          <Route path='auth/verify-otp' element={<OtpVerify />} />
        </Route>


        <Route element={<RequireAuth />}>
          <Route path="chat-with-friends" element={<ChatOutLet />}>
            <Route index element={<ChatHome />} />
            <Route path='group/:activeChatSidebar' element={<ChatGroup />} />
            <Route path='call/:activeChatSidebar' element={<ChatCall />} />
            <Route path='settings/:activeChatSidebar' element={<ChatSettings />} />
            <Route path='userprofile' element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer toastClassName={({ type }) => contextClass[type || "default"] +
        " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
      }
        bodyClassName={() => "text-sm font-white font-med block p-3"}
        position="bottom-right"
        autoClose={4000} />
    </div>
  )
}

export default App
