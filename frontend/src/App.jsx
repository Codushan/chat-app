import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { axiosInstance } from './lib/axios';
import { useAuthStore } from './store/useAuthStore';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';

export default function App() {
  // axiosInstance
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Apply theme to html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  console.log({ authUser, isCheckingAuth });

  if (isCheckingAuth && !authUser) 
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )

  return (
    <div className="App">
      {/* Theme Switcher - temporary for testing */}
      {/* <div className="p-4 bg-base-200">
        <select 
          value={currentTheme} 
          onChange={(e) => setCurrentTheme(e.target.value)}
          className="select select-bordered"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="bumblebee">Bumblebee</option>
          <option value="synthwave">Synthwave</option>
          <option value="retro">Retro</option>
          <option value="cyberpunk">Cyberpunk</option>
          <option value="cupcake">Cupcake</option>
        </select>
        <span className="ml-2 text-base-content">Current theme: {currentTheme}</span>
      </div> */}
      
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        {/* <Route path="/chat/:id" element={<Chat />} />
        <Route path="*" element={<NotFound />} /> */}
        <Route path="/settings" element={authUser ? <Settings /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
}