import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { useAuthStore } from './store/useAuthStore';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { useThemeStore } from './store/useThemeStore';

export default function App() {
  // axiosInstance
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser, isCheckingAuth });

  if (isCheckingAuth && !authUser) 
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )

  return (
    <div data-theme ="retro"> 
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        {/* <Route path="/chat/:id" element={<Chat />} />
        <Route path="*" element={<NotFound />} /> */}
        <Route path="/settings" element={<Settings />} />
      </Routes>

      <Toaster />
    </div>
  );
}