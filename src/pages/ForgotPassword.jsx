// src/pages/auth/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaLeaf, FaEnvelope, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import api from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      // Call your backend API to send reset email
      await api.post('/auth/forgot-password', { email });
      
      setEmailSent(true);
      toast.success('Password reset link sent! Check your email.', {
        duration: 5000,
        icon: '✅',
        style: {
          borderRadius: '10px',
          background: '#10b981',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to send reset email. Please try again.', {
        duration: 4000,
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#ef4444',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 animate-float">
          <FaLeaf className="text-6xl text-green-600 transform rotate-45" />
        </div>
        <div className="absolute bottom-40 right-20 animate-float-delayed">
          <FaLeaf className="text-5xl text-emerald-600 transform -rotate-12" />
        </div>
        <div className="absolute top-1/2 left-1/3 animate-float-slow">
          <FaLeaf className="text-7xl text-teal-600 transform rotate-90" />
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Back to Login Link */}
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors mb-4"
        >
          <FaArrowLeft />
          <span>Back to Login</span>
        </Link>

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full shadow-lg">
              <FaLeaf className="text-4xl text-white animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-600">
            {emailSent 
              ? "We've sent you a reset link!" 
              : "No worries, we'll send you reset instructions"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <FaLeaf className="text-sm" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              {/* Success Message */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="text-5xl mb-4">📧</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Check Your Email
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-gray-500 text-xs">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>

              {/* Resend Button */}
              <button
                onClick={() => {
                  setEmailSent(false);
                  setEmail('');
                }}
                className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
              >
                Try another email
              </button>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Remember your password? <span className="text-green-600 font-semibold">Sign in</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-30px) translateX(20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(-5deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite 1s;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;