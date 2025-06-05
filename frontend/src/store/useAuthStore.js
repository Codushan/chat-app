import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.MODE ? 'http://localhost:5001':'/' // Update with your actual socket URL

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, // ✅ Start with true to show loader initially
  onlineUsers: [], // ✅ Added onlineUsers state
  socket: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      console.log('🔍 Making auth check request...');
      const res = await axiosInstance.get('/auth/check');
      console.log('✅ Auth check successful:', res.data);
      
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error('❌ Error checking authentication:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
      console.log('🏁 Auth check completed');
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true }); // ✅ Fixed: isSigningUp (capital U)
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      toast.success('Account created successfully!');
      set({ authUser: res.data, isSigningUp: false });
      get().connectSocket(); // ✅ Reset loading state
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error(error.response?.data?.message || 'Failed to create account.');
      set({ isSigningUp: false }); // ✅ Reset loading state on error
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      toast.success('Logged in successfully!');
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(error.response?.data?.message || 'Failed to log in.');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logged out successfully!');
      get().disconnectSocket();
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Failed to log out.');
      // Still clear user on frontend even if backend call fails
      set({ authUser: null });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put('/auth/update-profile', data);
      toast.success('Profile updated successfully!');
      set({ authUser: res.data});
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile.');
      
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const {authUser} = get();
    if (!authUser || get().socket?.connected) {
      console.warn('No user authenticated, skipping socket connection');
      return;
    }
    const socket = io(SOCKET_URL, {
      query: {
        userId: authUser._id,
      }
    })
    socket.connect();
    
    set({ socket:socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  
  disconnectSocket: () => {
    if(get().socket?.connected) get().socket.disconnect();
  },
}));