import { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { signup, isSigneingup } = useAuthStore();

    const validateForm = () => {
        if (!formData.firstName.trim() || !formData.lastName.trim()) return toast.error('Full name is required');
        if (!formData.email.trim()) return toast.error('Email is required');
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Email is invalid');
        if (!formData.password.trim()) return toast.error('Password is required');
        if (formData.password !== formData.confirmPassword) return toast.error('Passwords do not match');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();
        const signupData = {
            name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
            email: formData.email.trim(),
            password: formData.password
        };

        // signup(signupData);
        if (success) signup(signupData);
    };

    // Animation state
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(prev => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    return (
        <div className={`min-h-screen h-full transition-colors duration-500 `}>
            <Navbar />
           
            {/* Main Content */}
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)] h-full px-6 pb-6">
                {/* Left Half - Animation - Will be on top on mobile */}
                <div className="flex-1 flex items-center justify-center order-1 lg:order-none mb-8 lg:mb-0">
                    <div className="relative">
                        {/* Animated Background Circles */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`w-80 h-80 rounded-full transition-all duration-1000  ${isAnimating ? 'scale-110' : 'scale-100'}`}></div>
                            <div className={`absolute w-60 h-60 rounded-full transition-all duration-1000 delay-200  ${isAnimating ? 'scale-90' : 'scale-110'}`}></div>
                        </div>

                        {/* Talking Animation Skeleton */}
                        <div className="relative z-10 flex flex-col items-center">
                            {/* Head */}
                            <div className={`w-24 h-24 rounded-full border-4 transition-all duration-500  ${isAnimating ? 'animate-pulse' : ''}`}>
                                {/* Eyes */}
                                <div className="flex justify-center mt-6 gap-3">
                                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isAnimating ? 'scale-125' : 'scale-100'}`}></div>
                                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isAnimating ? 'scale-125' : 'scale-100'}`}></div>
                                </div>
                                {/* Mouth */}
                                <div className={`mt-2 mx-auto w-6 h-3 border-2 border-t-0 rounded-b-full transition-all duration-300  ${isAnimating ? 'scale-110 animate-bounce' : 'scale-100'}`}></div>
                            </div>

                            {/* Neck */}
                            <div className={`w-4 h-8 border-2 border-t-0 transition-all duration-500 `}></div>

                            {/* Body */}
                            <div className={`w-20 h-24 border-4 rounded-t-3xl transition-all duration-500 `}></div>

                            {/* Arms */}
                            <div className="absolute top-32 left-0 right-0 flex justify-between px-2">
                                <div className={`w-16 h-4 border-2 rounded-full origin-right transition-all duration-500  ${isAnimating ? 'rotate-12' : '-rotate-12'}`}></div>
                                <div className={`w-16 h-4 border-2 rounded-full origin-left transition-all duration-500  ${isAnimating ? '-rotate-12' : 'rotate-12'}`}></div>
                            </div>


                            {/* Welcome Text */}
                            <div className={`mt-8 text-center transition-all duration-500 `}>
                                <h2 className="text-2xl font-bold mb-2">Welcome to BAATWAAT</h2>
                                <p className="text-lg opacity-80">Join the conversation</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Half - Signup Form - Will be below on mobile */}
                <div className="flex-1 flex items-center justify-center order-2 lg:order-none">
                    <div className={`w-full max-w-xl p-4 sm:p-8 rounded-3xl shadow-2xl transition-all duration-500 `}>
                        <div className="text-center mb-4">
                            <h1 className={`text-3xl font-bold mb-2 `}>Create Account</h1>
                            <p>
                                Start your journey with us
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `} />
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-4 py-2 rounded-xl border-2 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 `}
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `} />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full pl-12 pr-4 py-2 rounded-xl border-2 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 `}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-4 py-2 rounded-xl border-2 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 `}
                                    required
                                />
                            </div>


                            {/* Password */}
                            <div className="relative">
                                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-12 py-2 rounded-xl border-2 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 `}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 `}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-12 py-2 rounded-xl border-2 transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 `}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 `}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSigneingup}
                                onClick={handleSubmit}
                                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                {isSigneingup ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className={`absolute inset-0 flex items-center `}>
                                    <div className="w-full border-t border-current"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className={`px-2 `}>
                                        OR
                                    </span>
                                </div>
                            </div>

                            {/* Social Sign In */}
                            <button className={`w-full py-3 border-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 `}>
                                Continue with Google
                            </button>

                            {/* Login Link */}
                            <p className={`text-center `}>
                                Already have an account?{' '}
                                <Link to="/login" className="text-purple-400 hover:text-purple-700 font-semibold transition-colors duration-300">
                                    Sign In
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}