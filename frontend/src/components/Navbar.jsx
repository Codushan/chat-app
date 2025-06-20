import React, { useState } from 'react';
import { Settings, Moon, Sun, User, LogOut, Menu, X, LogIn } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { authUser, isLoggingIn, logout } = useAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                        <Link to="/" className="text-2xl flex items-center sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            <img src="/baatwaat.png" alt="Logo" className="h-12 w-auto inline-block mr-2" />
                            BAATWAAT
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Settings Icon */}
                        <Link to="/settings" className={`p-2 rounded-lg transition-colors `}>
                            <Settings size={20} />
                        </Link>

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
                    <div className={`md:hidden border-t py-4 `}>
                        <div className="flex flex-col space-y-3">
                            {/* Settings */}
                            <Link to="/settings" className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors `}>
                                <Settings size={20} />
                                <span>Settings</span>
                            </Link>


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