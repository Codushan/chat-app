// App.jsx
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react'; // Removed useState as it's not needed here
import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { useThemeStore } from './store/useThemeStore';

export default function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore(); // Get the current theme from the store

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser, isCheckingAuth });
  console.log({onlineUsers})

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      <Toaster />
    </div>
  );
}