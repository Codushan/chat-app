import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Phone, Loader2, Camera, Edit3, Save, X, MessageCircle, Users, Heart, Loader } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/useAuthStore';

export default function Profile() {
    const { darkMode, setDarkMode } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const fileInputRef = useRef(null);

    const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    // Floating message animation
    const [floatingMessages, setFloatingMessages] = useState([
        { id: 1, text: "Hey!", x: 20, y: 30, delay: 0 },
        { id: 2, text: "How are you?", x: 70, y: 20, delay: 1000 },
        { id: 3, text: "😊", x: 40, y: 60, delay: 2000 }
    ]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const base64Image = reader.result;
                setSelectedImg(base64Image);
                await updateProfile({
                    profilePic: base64Image,
                });
            };
            reader.readAsDataURL(file);
        }
    };



    // Get current profile image
    const getCurrentProfileImage = () => {
        return selectedImg || authUser?.profilePic || null;
    };

    return (
        <div className={`min-h-screen h-full transition-colors duration-500 ${darkMode
            ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
            }`}>
            {/* Navbar */}
            <Navbar />
            
            {/* Main Content */}
            <div className="flex flex-col lg:flex-row px-6 py-6">
                {/* Left Half - Chat Animation */}
                <div className="flex-1 flex items-center justify-center order-1 lg:order-none mb-2 lg:mb-0">
                    <div className="relative w-full max-w-md">
                        {/* Chat Bubbles Background */}
                        <div className="absolute inset-0 overflow-hidden">
                            {/* Large Chat Bubble */}
                            <div className={`absolute top-1/4 left-1/4 w-32 h-20 rounded-3xl transition-all duration-3000 ${darkMode ? 'bg-purple-500/20' : 'bg-purple-200/40'
                                } animate-pulse`}
                                style={{
                                    animation: 'float 6s ease-in-out infinite',
                                    animationDelay: '0s'
                                }}></div>

                            {/* Medium Chat Bubble */}
                            <div className={`absolute top-1/2 right-1/4 w-24 h-16 rounded-3xl transition-all duration-3000 ${darkMode ? 'bg-pink-500/20' : 'bg-pink-200/40'
                                } animate-pulse`}
                                style={{
                                    animation: 'float 6s ease-in-out infinite',
                                    animationDelay: '2s'
                                }}></div>

                            {/* Small Chat Bubble */}
                            <div className={`absolute bottom-1/3 left-1/3 w-16 h-12 rounded-2xl transition-all duration-3000 ${darkMode ? 'bg-blue-500/20' : 'bg-blue-200/40'
                                } animate-pulse`}
                                style={{
                                    animation: 'float 6s ease-in-out infinite',
                                    animationDelay: '4s'
                                }}></div>
                        </div>

                        {/* Floating Messages */}
                        <div className="absolute inset-0">
                            {floatingMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`absolute px-3 py-3 rounded-full text-sm font-medium transition-all duration-1000 ${darkMode
                                            ? 'bg-gray-700/80 text-white border border-purple-500/30'
                                            : 'bg-white/80 text-gray-800 border border-purple-300/30'
                                        } backdrop-blur-sm shadow-lg`}
                                    style={{
                                        left: `${message.x}%`,
                                        top: `${message.y}%`,
                                        animation: `messageFloat 4s ease-in-out infinite`,
                                        animationDelay: `${message.delay}ms`
                                    }}
                                >
                                    {message.text}
                                </div>
                            ))}
                        </div>

                        {/* Central Profile Icon with Chat Animation */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`relative w-32 h-32 rounded-full border-4 transition-all duration-500 ${darkMode ? 'border-purple-400' : 'border-purple-500'
                                } overflow-hidden shadow-2xl`}
                                style={{ animation: 'profilePulse 3s ease-in-out infinite' }}>
                                {getCurrentProfileImage() ? (
                                    <img
                                        src={getCurrentProfileImage()}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'
                                        }`}>
                                        <User className={`w-16 h-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    </div>
                                )}

                                {/* Online Status Indicator */}
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white animate-ping"></div>
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                            </div>

                            {/* Chat Stats */}
                            <div className="mt-8 flex space-x-8">
                                <div className="text-center">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
                                        } mb-2`}>
                                        <MessageCircle className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                                    </div>
                                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                        {authUser?.totalChats || 0}
                                    </p>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Chats</p>
                                </div>

                                <div className="text-center">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${darkMode ? 'bg-pink-500/20' : 'bg-pink-100'
                                        } mb-2`}>
                                        <Users className={`w-6 h-6 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`} />
                                    </div>
                                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                        {authUser?.totalFriends || 0}
                                    </p>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Friends</p>
                                </div>
                            </div>

                            {/* Welcome Text */}
                            <div className={`mt-8 text-center transition-all duration-500 ${darkMode ? 'text-white' : 'text-gray-800'
                                }`}>
                                <h2 className="text-3xl font-bold mb-2">Your Profile</h2>
                                <p className="text-lg opacity-80">Manage your chat settings</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Half - Profile Form */}
                <div className="flex-1 flex items-center justify-center order-2 lg:order-none">
                    <div className={`w-full max-w-2xl p-4 sm:p-8 rounded-3xl shadow-2xl transition-all duration-500 ${darkMode ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-lg'
                        }`}>

                        {/* Header with Edit Button */}
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'
                                    }`}>Profile Settings</h1>
                                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Member since {authUser?.joinedDate || 'Unknown'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Profile Image Section */}
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative">
                                    <div className={`w-32 h-32 rounded-full overflow-hidden border-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'
                                        }`}>
                                        {getCurrentProfileImage() ? (
                                            <img
                                                src={getCurrentProfileImage()}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className={`w-full h-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'
                                                }`}>
                                                <User className={`w-12 h-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300
                                            ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                                    >
                                        <Camera size={16} />
                                    </button>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                    className="hidden"
                                />
                                <p className="text-sm text-zinc-400">
                                    {isUpdatingProfile ? "Uploading..." : "Click the camera icon to change your profile picture"}    
                                </p>
                            </div>

                            {/* Basic Information */}
                            <div className="space-y-4">
                                <div className="relative">
                                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                        }`} />
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={authUser?.name || ''}
                                        readOnly
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 cursor-not-allowed opacity-60 ${darkMode
                                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'}`}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={authUser?.email || ''}
                                    readOnly
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 cursor-not-allowed opacity-60 ${darkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'}`}
                                />
                            </div>

                            {/* Bio */}
                            <div className="relative">
                                <MessageCircle className={`absolute left-3 top-4 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`} />
                                <textarea
                                    name="bio"
                                    placeholder="Tell your friends about yourself..."
                                    value={authUser?.bio || ''}
                                    readOnly
                                    rows={5}
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 resize-none cursor-not-allowed opacity-60 ${darkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
               @keyframes float {
                   0%, 100% { transform: translateY(0px); }
                   50% { transform: translateY(-20px); }
               }
               
               @keyframes messageFloat {
                   0%, 100% { transform: translateY(0px) scale(1); opacity: 0.8; }
                   50% { transform: translateY(-10px) scale(1.05); opacity: 1; }
               }
               
               @keyframes profilePulse {
                   0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4); }
                   50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(168, 85, 247, 0); }
               }
           `}</style>
        </div>
    );
};