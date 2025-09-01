import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // To set the token on login
import apiClient from '../../api'; // To make API calls

// Your SVG icon component (EyeIcon) remains the same
const EyeIcon = () => (
      <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const SignIn = () => {
    // 1. Add state for inputs, errors, and UI flow
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setToken } = useUser();

    // 2. Function to request OTP for login
    const handleGetOtp = async () => {
        if (!email) {
            setError('Please enter your email address.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            // NOTE: We need a login-specific OTP request endpoint
            // For now, we can reuse the signup one, but ideally, you'd create a new one
            await apiClient.post('/api/auth/signup/email', { email });
            setOtpSent(true);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Failed to send OTP. User may not exist.');
        } finally {
            setLoading(false);
        }
    };

    // 3. Function to verify OTP and sign in
    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!otp) {
            setError('Please enter the OTP.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            // NOTE: This verify endpoint is the same for signup and signin in our current setup
            const response = await apiClient.post('/api/auth/verify/otp', { email, otp });
            setToken(response.data.token); // Set token, which triggers redirect
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Failed to sign in. Invalid OTP.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:flex w-full min-h-screen">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-white">
                <div className="w-full max-w-sm">
                    {/* Your header JSX is great, no changes needed */}
                    {/* ... header code ... */}
                    <h1 className="text-4xl font-bold text-gray-900 lg:text-left text-center mb-2">Sign In</h1>
                    <p className="text-gray-600 lg:text-left text-center mb-8">Please login to continue to your account.</p>

                    <form className="w-full" onSubmit={handleSignIn}>
                        {!otpSent ? (
                            // --- Step 1: Enter Email ---
                            <>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-blue-600 text-xs font-semibold mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                                <button
                                    type="button"
                                    onClick={handleGetOtp}
                                    disabled={loading}
                                    className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline transition-colors duration-200 disabled:bg-blue-300"
                                >
                                    {loading ? 'Sending OTP...' : 'Get OTP'}
                                </button>
                            </>
                        ) : (
                            // --- Step 2: Enter OTP ---
                            <>
                                <div className="mb-4">
                                     <label htmlFor="email" className="block text-gray-500 text-xs font-semibold mb-2">Email</label>
                                     <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 disabled:bg-gray-100"
                                        disabled
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="otp" className="block text-blue-600 text-xs font-semibold mb-2">OTP</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            id="otp"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                            placeholder="Enter OTP from your email"
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"><EyeIcon /></div>
                                    </div>
                                </div>
                                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline transition-colors duration-200 disabled:bg-blue-300"
                                >
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </button>
                            </>
                        )}
                    </form>

                    <p className="mt-8 text-center text-gray-600 text-sm">
                        Need an account??{' '}
                        <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
            <div
                className="hidden lg:block lg:w-1/2 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549241520-425e3dfc01cb?q=80&w=2574&auto=format&fit=crop")' }}
            >
            </div>
        </div>
    );
};

export default SignIn;