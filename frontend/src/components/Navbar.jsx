import React, { useState } from 'react';
import { Settings, Moon, Sun, User, LogOut, Menu, X, LogIn } from 'lucide-react';
// import { useTheme } from '../context/ThemeContext';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { authUser, isLoggingIn, logout } = useAuthStore();
    // const { darkMode, setDarkMode } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Since login expects data, you'll need to handle this differently
    // This is just for demonstration - you'll likely want to redirect to a login page
    const handleLogin = () => {
        // Option 1: Redirect to login page
        // navigate('/login');
        
        // Option 2: Open login modal
        // setShowLoginModal(true);
        
        // For now, just close mobile menu
        setIsMobileMenuOpen(false);
        
        // You can't call login() directly here since it expects login data
        console.log('Redirect to login page or open login modal');
    };

    const handleLogout = async () => {
        await logout();
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={``}>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            BAATWAAT
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Settings Icon */}
                        <Link to="/settings" className={`p-2 rounded-lg transition-colors `}>
                            <Settings size={20} />
                        </Link>

                        {/* Theme Toggle */}
                        {/* <button
                            onClick={() => }
                            className={`p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg`}
                        >
                            {darkMode ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
                        </button> */}

                        {/* Conditional Menu Items based on authUser */}
                        {authUser ? (
                            <>
                                {/* Profile */}
                                <Link to="/profile" className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors`}>
                                    <User size={18} />
                                    <span className="text-sm font-medium">Profile</span>
                                </Link>

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    disabled={isLoggingIn}
                                    className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <LogOut size={18} />
                                    <span className="text-sm font-medium">
                                        {isLoggingIn ? 'Logging out...' : 'Logout'}
                                    </span>
                                </button>
                            </>
                        ) : (null)}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className={`p-2 rounded-lg transition-colors `}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className={`md:hidden border-t py-4 ${
                        darkMode ? 'border-gray-700' : 'border-gray-100'
                    }`}>
                        <div className="flex flex-col space-y-3">
                            {/* Settings */}
                            <Link to="/settings" className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors `}>
                                <Settings size={20} />
                                <span>Settings</span>
                            </Link>

                            {/* Theme Toggle */}
                            <button 
                                onClick={() => setDarkMode(!darkMode)}
                                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors `}
                            >
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                                <span>Theme</span>
                            </button>

                            {/* Conditional Mobile Menu Items based on authUser */}
                            {authUser ? (
                                <>
                                    {/* Profile */}
                                    <Link to="/profile" className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors `}>
                                        <User size={20} />
                                        <span>Profile</span>
                                    </Link>

                                    {/* Logout */}
                                    <button
                                        onClick={handleLogout}
                                        disabled={isLoggingIn}
                                        className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        <LogOut size={20} />
                                        <span>{isLoggingIn ? 'Logging out...' : 'Logout'}</span>
                                    </button>
                                </>
                            ) : (null)}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;