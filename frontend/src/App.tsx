import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext'; // Adjust path if needed
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

// This component handles the routing logic
const AppRoutes = () => {
  const { token, isLoading } = useUser();

  // Show a loading indicator while the token is being checked
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* If the user is logged in, redirect them from signup/signin to the dashboard */}
      <Route path="/" element={!token ? <SignUp /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!token ? <SignUp /> : <Navigate to="/dashboard" />} />
      <Route path="/signin" element={!token ? <SignIn /> : <Navigate to="/dashboard" />} />
      
      {/* Protect the dashboard route. If not logged in, redirect to signin */}
      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/signin" />} />
    </Routes>
  );
};

// The main App component wraps everything in the UserProvider and Router
function App() {
  return (
    <Router>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </Router>
  );
}

export default App;