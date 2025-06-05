import { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Phone, Loader2, Camera, Edit3, Save, X, MessageCircle, Users, Heart, Loader } from 'lucide-react';
// import { useTheme } from '../context/ThemeContext';
import { useAuthStore } from '../store/useAuthStore';

export default function Profile() {
    // const { false, setfalse } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const fileInputRef = useRef(null);

    const [previewImage, setPreviewImage] = useState(null);

    // Floating message animation
    const [floatingMessages, setFloatingMessages] = useState([
        { id: 1, text: "Hey!", x: 20, y: 30, delay: 0 },
        { id: 2, text: "How are you?", x: 70, y: 20, delay: 1000 },
        { id: 3, text: "😊", x: 40, y: 60, delay: 2000 }
    ]);

    // Fetch profile data from backend
    useEffect(() => {
        fetchAuthUser();
    }, []);

    const fetchAuthUser = async () => {
        // setIsLoading(true);
        try {
            // Simulate API call - replace with actual backend call
            await new Promise(resolve => setTimeout(resolve, 1500));

            const userData = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                bio: 'Love chatting with friends and meeting new people! 💬',
                joinedDate: 'January 2024',
                totalChats: 147,
                totalFriends: 23
            };

            setAuthUser(userData);
            setPreviewImage('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
        } catch (error) {
            console.error('Failed to fetch profile data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setAuthUser({
            ...authUser,
            [e.target.name]: e.target.value
        });
    };



    const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const base64Image = reader.result;
                setSelectedImg(base64Image); // Update the preview image
                await updateProfile({
                    profilePic: base64Image,
                });
            };
            reader.readAsDataURL(file);
        }
    };


    const validateForm = () => {
        // Basic validation
        if (!authUser.firstName.trim() || !authUser.lastName.trim() || !authUser.email.trim()) {
            alert('Please fill in all required fields.');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(authUser.email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        // Password validation (if changing password)
        if (authUser.newPassword) {
            if (!authUser.currentPassword) {
                alert('Please enter your current password to change it.');
                return false;
            }
            if (authUser.newPassword.length < 6) {
                alert('New password must be at least 6 characters long.');
                return false;
            }
            if (authUser.newPassword !== authUser.confirmPassword) {
                alert('New passwords do not match.');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async () => {
        // if (!validateForm()) return;

        setIsUpdating(true);

        try {
            // Simulate API call - replace with actual backend call
            const formData = new FormData();
            formData.append('firstName', authUser.firstName);
            formData.append('lastName', authUser.lastName);
            formData.append('email', authUser.email);
            formData.append('bio', authUser.bio);
            if (authUser.profileImage) {
                formData.append('profileImage', authUser.profileImage);
            }
            if (authUser.newPassword) {
                formData.append('currentPassword', authUser.currentPassword);
                formData.append('newPassword', authUser.newPassword);
            }

            await new Promise(resolve => setTimeout(resolve, 2000));

            setIsEditing(false);
            setAuthUser({
                ...authUser,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

            // Show success message
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        fetchAuthUser(); // Refresh data to cancel changes
        setAuthUser({
            ...authUser,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    // if (isLoading) {
    //     return (
    //         <div className="flex items-center justify-center h-screen">
    //             <Loader className="size-10 animate-spin" />
    //         </div>
    //     );
    // }

    return (
        <div  className={`h-full transition-colors duration-500 `}>
            {/* Main Content */}
            <div className="flex flex-col lg:flex-row px-6 py-6">
                {/* Left Half - Chat Animation */}
                <div className="flex-1 flex items-center justify-center order-1 lg:order-none mb-2 lg:mb-0">
                    <div className="relative w-full max-w-md">
                        {/* Chat Bubbles Background */}
                        <div className="absolute inset-0 overflow-hidden">
                            {/* Large Chat Bubble */}
                            <div className={`absolute top-1/4 left-1/4 w-32 h-20 rounded-3xl transition-all duration-3000  animate-pulse`}
                                style={{
                                    animation: 'float 6s ease-in-out infinite',
                                    animationDelay: '0s'
                                }}></div>

                            {/* Medium Chat Bubble */}
                            <div className={`absolute top-1/2 right-1/4 w-24 h-16 rounded-3xl transition-all duration-3000  animate-pulse`}
                                style={{
                                    animation: 'float 6s ease-in-out infinite',
                                    animationDelay: '2s'
                                }}></div>

                            {/* Small Chat Bubble */}
                            <div className={`absolute bottom-1/3 left-1/3 w-16 h-12 rounded-2xl transition-all duration-3000  animate-pulse`}
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
                                    className={`absolute px-3 py-3 rounded-full text-sm font-medium transition-all duration-1000  backdrop-blur-sm shadow-lg`}
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
                            <div className={`relative w-32 h-32 rounded-full border-4 transition-all duration-500  overflow-hidden shadow-2xl`}
                                style={{ animation: 'profilePulse 3s ease-in-out infinite' }}>
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center `}>
                                        <User className={`w-16 h-16 `} />
                                    </div>
                                )}

                                {/* Online Status Indicator */}
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white animate-ping"></div>
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                            </div>

                            {/* Chat Stats */}
                            <div className="mt-8 flex space-x-8">
                                <div className="text-center">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-2`}>
                                        <MessageCircle className={`w-6 h-6 `} />
                                    </div>
                                    <p className={`text-2xl font-bold `}>
                                        {authUser.totalChats}
                                    </p>
                                    <p className={`text-sm `}>Chats</p>
                                </div>

                                <div className="text-center">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full  mb-2`}>
                                        <Users className={`w-6 h-6 `} />
                                    </div>
                                    <p className={`text-2xl font-bold `}>
                                        {authUser.totalFriends}
                                    </p>
                                    <p className={`text-sm `}>Friends</p>
                                </div>
                            </div>

                            {/* Welcome Text */}
                            <div className={`mt-8 text-center transition-all duration-500`}>
                                <h2 className="text-3xl font-bold mb-2">Your Profile</h2>
                                <p className="text-lg opacity-80">Manage your chat settings</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Half - Profile Form */}
                <div className="flex-1 flex items-center justify-center order-2 lg:order-none">
                    <div className={`w-full max-w-2xl p-4 sm:p-8 rounded-3xl shadow-2xl transition-all duration-500 `}>

                        {/* Header with Edit Button */}
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h1 className={`text-3xl font-bold mb-2`}>Profile Settings</h1>
                                <p>
                                    Member since {new Date(authUser.createdAt).toLocaleString('en-IN', {
                                        dateStyle: 'medium',
                                        // timeStyle: 'short',
                                    })}
                                </p>
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    <Edit3 size={18} />
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            {/* Profile Image Section */}
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative">
                                    <div className={`w-32 h-32 rounded-full overflow-hidden border-4 `}>
                                        {selectedImg || authUser?.profilePic || previewImage ? (
                                            <img
                                                src={selectedImg || authUser?.profilePic || previewImage}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className={`w-full h-full flex items-center justify-center `}>
                                                <User className={`w-12 h-12 `} />
                                            </div>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300
                                                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                                        >
                                            <Camera size={16} />
                                        </button>
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                    className="hidden"
                                />
                                {isEditing && (
                                    <p className="text-sm text-zinc-400">
                                        {isUpdatingProfile ? "Uploading..." : "Click the camera icon to change your profile picture"}
                                    </p>
                                )}
                            </div>

                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5`} />
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={authUser?.name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200`}
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `} />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={authUser?.lastName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200`}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5`} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={authUser?.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 `}
                                    required
                                />
                            </div>

                            {/* Bio */}
                            <div className="relative">
                                <MessageCircle className={`absolute left-3 top-4 w-5 h-5 `} />
                                <textarea
                                    name="bio"
                                    placeholder="Tell your friends about yourself..."
                                    value={authUser.bio}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    rows={5}
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none `}
                                />
                            </div>

                            {/* Password Change Section - Only show when editing */}
                            {isEditing && (
                                <>
                                    <div className={`border-t pt-6`}>
                                        <h3 className={`text-lg font-semibold mb-4 `}>
                                            Change Password (Optional)
                                        </h3>

                                        {/* Current Password */}
                                        <div className="relative mb-4">
                                            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `} />
                                            <input
                                                type={showCurrentPassword ? 'text' : 'password'}
                                                name="currentPassword"
                                                placeholder="Current Password"
                                                value={authUser.currentPassword}
                                                onChange={handleInputChange}
                                                className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 `}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 `}
                                            >
                                                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>

                                        {/* New Password */}
                                        <div className="relative mb-4">
                                            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `} />
                                            <input
                                                type={showNewPassword ? 'text' : 'password'}
                                                name="newPassword"
                                                placeholder="New Password"
                                                value={authUser.newPassword}
                                                onChange={handleInputChange}
                                                className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 `}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className={`absolute right-3 top-1/2 transform -translate-y-1/2`}
                                            >
                                                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>

                                        {/* Confirm New Password */}
                                        <div className="relative">
                                            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `} />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                placeholder="Confirm New Password"
                                                value={authUser.confirmPassword}
                                                onChange={handleInputChange}
                                                className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 `}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 `}
                                            >
                                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Action Buttons - Only show when editing */}
                            {isEditing && (
                                <div className="flex gap-4 pt-6">
                                    <button
                                        disabled={isUpdating}
                                        onClick={handleSubmit}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={18} />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                    <button
                                        disabled={isUpdating}
                                        onClick={handleCancel}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 font-medium rounded-xl border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed `}
                                    >
                                        <X size={18} />
                                        Cancel
                                    </button>
                                </div>
                            )}
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
}