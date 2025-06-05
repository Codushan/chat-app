import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get('/messages/users');
            set({ users: res.data });
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch users.');
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error(error.response.data.message || 'Failed to fetch messages.');
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error(error.response.data.message || 'Failed to send message.');
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;


        const socket = useAuthStore.getState().socket;


        socket.off("newMessage");

        socket.on("newMessage", (newMessage) => {
            const { selectedUser } = get();
            const { user } = useAuthStore.getState(); // get the logged-in user
            const authUser = user || useAuthStore.getState().authUser; // Fallback to authUser if user is not available
            console.log(selectedUser, authUser);
            const isRelevant =
                (newMessage.senderId === selectedUser._id && newMessage.receiverId === authUser._id) ||
                (newMessage.senderId === authUser._id && newMessage.receiverId === selectedUser._id);

            if (!isRelevant) return;

            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        // if (socket) {
        socket.off("newMessage");
        // console.log("Unsubscribed from messages");
        // }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),



}));