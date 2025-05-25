import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create context
const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Check if user is already logged in from localStorage
  useEffect(() => {
    console.log("AuthProvider mounted - checking for existing user");
    const user = localStorage.getItem('brewCrafterUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function - stores user in localStorage and state
  const login = (userData) => {
    console.log("Login function called with:", userData);
    localStorage.setItem('brewCrafterUser', JSON.stringify(userData));
    setCurrentUser(userData);
    navigate('/profile');
  };

  // Register function - creates a new user
  const register = (userData) => {
    console.log("Register function called with:", userData);
    const newUser = {
      ...userData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('brewCrafterUser', JSON.stringify(newUser));
    setCurrentUser(newUser);
    navigate('/profile');
  };

  // Logout function - removes user from localStorage and state
  const logout = () => {
    console.log("Logout function called");
    localStorage.removeItem('brewCrafterUser');
    setCurrentUser(null);
    navigate('/login');
  };

  // Password reset - placeholder function
  const resetPassword = (email) => {
    console.log(`Password reset email sent to: ${email}`);
    return Promise.resolve();
  };

  // Update profile function
  const updateProfile = (updatedData) => {
    console.log("Updating profile with:", updatedData);
    const updatedUser = {
      ...currentUser,
      ...updatedData
    };
    localStorage.setItem('brewCrafterUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  // Create the value object to be provided by the context
  const value = {
    currentUser,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children once loading is complete */}
      {!loading ? children : (
        <div className="h-screen flex items-center justify-center">
          <div className="animate-pulse text-[#3e2723] text-xl font-bold">
            Loading auth...
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export the context as well
export default AuthContext;