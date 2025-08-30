import { Link } from 'react-router-dom';
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
  return (
    <div className="lg:flex w-full min-h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-white">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center lg:justify-start mb-8">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm4.356 1.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-3.636 4.356a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM10 17a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.636 14.356a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zM4.356 5.636a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-800">HD</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 lg:text-left text-center mb-2">Sign In</h1>
          <p className="text-gray-600 lg:text-left text-center mb-8">Please login to continue to your account.</p>

          <form className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block text-blue-600 text-xs font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="jonas_kahnwald@gmail.com"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-500 text-xs font-semibold mb-2">
                OTP
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="otp"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="OTP"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                  <EyeIcon /> 
                </div>
              </div>
              <Link to="#" className="block text-left text-blue-600 text-sm font-semibold mt-2 hover:underline">
                Resend OTP
              </Link>
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                Keep me logged In
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600 text-sm">
            Need an account??{' '}
            <Link to="/" className="font-semibold text-blue-600 hover:underline">
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