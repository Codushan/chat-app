import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Moon, Sun, Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { login, isLoggingIn } = useAuthStore();

  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Email is invalid');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };


  return (
    <div className={`min-h-screen h-full transition-colors duration-500`}>
      
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)] h-full px-6 pb-6">
        {/* Left Half - Door Opening Animation */}
        <div className="flex-1 flex items-center justify-center mb-8 lg:mb-0">
          <div className="relative">
            {/* Animated Background Circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-96 h-96 rounded-full transition-all duration-1000  ${isAnimating ? 'scale-105' : 'scale-95'}`}></div>
              <div className={`absolute w-72 h-72 rounded-full transition-all duration-1000 delay-300 
              } ${isAnimating ? 'scale-95' : 'scale-105'}`}></div>
            </div>

            {/* Door Opening Animation */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Door Frame */}
              <div className={`relative w-48 h-64 border-4 rounded-t-3xl transition-all duration-500 
              `}>
                {/* Door Left Panel */}
                <div className={`absolute left-0 top-0 h-full border-r-2 rounded-tl-3xl transition-all duration-1000 origin-left 
                 ${isAnimating ? 'w-20 shadow-2xl' : 'w-24'}`} 
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: isAnimating ? 'perspective(400px) rotateY(-60deg)' : 'perspective(400px) rotateY(0deg)'
                }}>
                  {/* Door Handle Left */}
                  <div className={`absolute right-2 top-1/2 w-2 h-2 rounded-full transition-all duration-500 
                  }`}></div>
                </div>

                {/* Door Right Panel */}
                <div className={`absolute right-0 top-0 h-full border-l-2 rounded-tr-3xl transition-all duration-1000 origin-right 
                 ${isAnimating ? 'w-20 shadow-2xl' : 'w-24'}`}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: isAnimating ? 'perspective(400px) rotateY(60deg)' : 'perspective(400px) rotateY(0deg)'
                }}>
                  {/* Door Handle Right */}
                  <div className={`absolute left-2 top-1/2 w-2 h-2 rounded-full transition-all duration-500 
                  }`}></div>
                </div>

                {/* Person Silhouette Behind Door */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
                  isAnimating ? 'opacity-100 scale-110' : 'opacity-30 scale-90'
                } overflow-hidden`}>
                  {/* Head */}
                  <div className="absolute top-12">
                    <div className={`w-16 h-16 rounded-full transition-all duration-500 
                     shadow-lg`}>
                      {/* Welcoming expression */}
                      <div className="flex justify-center mt-4 gap-2">
                        <div className={`w-3 h-3 rounded-full 
                        `}></div>
                        <div className={`w-3 h-3 rounded-full `}></div>
                      </div>
                      {/* Smile */}
                      <div className={`mt-1 mx-auto w-6 h-3 border-2 border-t-0 rounded-b-full`}></div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className={`absolute top-28 w-12 h-20 rounded-t-lg transition-all duration-500  shadow-lg`}></div>

                  {/* Welcoming Arms */}
                  <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
                    <div className={`absolute -left-8 w-12 h-4 rounded-full origin-right transition-all duration-500 shadow-lg ${isAnimating ? 'rotate-45' : 'rotate-12'}`}></div>
                    <div className={`absolute -right-8 w-12 h-4 rounded-full origin-left transition-all duration-500 shadow-lg ${isAnimating ? '-rotate-45' : '-rotate-12'}`}></div>
                  </div>
                </div>

                {/* Welcome Back Particles */}
                <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
                  isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 rounded-full transition-all duration-1000 shadow-lg`}
                      style={{
                        left: `${(i - 3) * 12}px`,
                        animationDelay: `${i * 200}ms`,
                        animation: isAnimating ? 'float 2s ease-in-out infinite' : 'none'
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Welcome Back Text */}
              <div className={`mt-8 text-center transition-all duration-500 `}>
                <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                <p className="text-lg opacity-80">We missed you</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Half - Sign In Form */}
        <div className="flex-1 flex items-center justify-center">
          <div className={`w-full max-w-xl p-6 sm:p-8 rounded-3xl shadow-2xl transition-all duration-500 `}>
            <div className="text-center mb-8">
              <h1 className={`text-3xl font-bold mb-2 `}>Sign In</h1>
              <p>
                Continue your conversation
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 `} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200`}
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
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 `}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 `}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300">
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {isLoggingIn ? (
                    <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Logging In...
                    </>
                ) : (
                    "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className={`absolute inset-0 flex items-center`}>
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

              {/* Sign Up Link */}
              <p className={`text-center `}>
                Don't have an account?{' '}
                <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-300">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}