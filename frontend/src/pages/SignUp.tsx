import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api'; // Make sure this path is correct

// Your SVG icon components (CalendarIcon, EyeIcon) remain the same...
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);


const SignUp = () => {
  // 1. Add state for inputs and errors
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Implement the actual API call to get the OTP
  const handleGetOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.post('/api/auth/signup/email', { email });
      console.log(response.data.msg); // "OTP sent to your email successfully."
      setOtpSent(true);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Failed to send OTP.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 3. Implement the API call to verify OTP and sign up
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.post('/api/auth/verify/otp', { email, otp });
      // On success, you get a token. Save it and redirect the user.
      localStorage.setItem('token', response.data.token);
      alert('Sign up successful!');
      // Example: window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Failed to sign up.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:flex w-full min-h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-white">
        <div className="w-full max-w-sm">
          {/* Your logo and header JSX remains the same */}
          <div className="flex items-center justify-center lg:justify-start mb-8">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm4.356 1.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-3.636 4.356a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM10 17a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.636 14.356a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zM4.356 5.636a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-800">HD</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 lg:text-left text-center mb-2">Sign up</h1>
          <p className="text-gray-600 lg:text-left text-center mb-8">Sign up to enjoy the feature of HD</p>

          <form className="w-full" onSubmit={handleSignUp}>
            {/* ... other inputs like Name and Date of Birth ... */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-500 text-xs font-semibold mb-2">Your Name</label>
              <input type="text" id="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" defaultValue="Jonas Khanwald" disabled={otpSent} />
            </div>
            <div className="mb-4">
              <label htmlFor="birthdate" className="block text-gray-500 text-xs font-semibold mb-2">Date of Birth</label>
              <div className="relative">
                <input type="text" id="birthdate" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 disabled:bg-gray-100" defaultValue="11 December 1997" disabled={otpSent}/>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><CalendarIcon /></div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className={`block text-xs font-semibold mb-2 ${otpSent ? 'text-gray-500' : 'text-blue-600'}`}>Email</label>
              {/* 4. Connect the input to state */}
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${otpSent ? 'border-gray-300' : 'border-2 border-blue-500'}`}
                disabled={otpSent}
                required
              />
            </div>
            
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            {otpSent ? (
              <>
                <div className="mb-6">
                  <label htmlFor="otp" className="block text-blue-600 text-xs font-semibold mb-2">OTP</label>
                  <div className="relative">
                    <input
                      type="password"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      placeholder="Enter OTP"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"><EyeIcon /></div>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline transition-colors duration-200 disabled:bg-blue-300">
                  {loading ? 'Signing up...' : 'Sign up'}
                </button>
              </>
            ) : (
              <button type="button" onClick={handleGetOtp} disabled={loading} className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline transition-colors duration-200 disabled:bg-blue-300">
                {loading ? 'Sending OTP...' : 'Get OTP'}
              </button>
            )}
          </form>

          {/* Your "Already have an account?" JSX remains the same */}
          <p className="mt-8 text-center text-gray-500 text-sm">
            Already have an account??{' '}
            <Link to="/signin" className="font-semibold text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549241520-425e3dfc01cb?q=80&w=2574&auto=format&fit=crop")' }} />
    </div>
  );
};

export default SignUp;