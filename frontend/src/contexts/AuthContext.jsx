import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingEmail, setPendingEmail] = useState(null); // For OTP step
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

  
  // Register function - calls backend
  const register = async (formData) => {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      user_name: formData.name,
      user_email: formData.email,
      user_password: formData.password,
      user_phone: formData.phone || '',
      user_address: formData.address || '',
      birthday: formData.birthday
    });
    setPendingEmail(formData.email); // Save for OTP step
    return res.data;
  };

  
  // OTP verification function
  const verifyOtp = async (otp) => {
    const res = await axios.post('http://localhost:5000/api/auth/verify', {
      email: pendingEmail,
      otp
    });
    // Save user/token after verification
    localStorage.setItem('brewCrafterToken', res.data.token);
    // Save user_id for use in cart/craft
    if (res.data.user && res.data.user.id) {
      localStorage.setItem('user_id', res.data.user.id);
    }
    setCurrentUser(res.data.user || { email: pendingEmail });
    setPendingEmail(null);
    return res.data;
  };

  // Login function - calls backend
  const login = async (formData) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: formData.email,
      password: formData.password
    });
    localStorage.setItem('brewCrafterUser', JSON.stringify(res.data.user));
    localStorage.setItem('brewCrafterToken', res.data.token);
    // Save user_id for use in cart/craft
    if (res.data.user && res.data.user.id) {
      localStorage.setItem('user_id', res.data.user.id);
    }
    setCurrentUser(res.data.user);
    navigate('/profile');
    return res.data;
  };
  

  // Logout function - removes user from localStorage and state
  const logout = () => {
    console.log("Logout function called");
    localStorage.removeItem('brewCrafterUser');
    localStorage.removeItem('brewCrafterToken');
    localStorage.removeItem('user_id'); // <-- Remove user_id on logout
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
      ...updatedData // merging the current and updated data of the user
    };
    localStorage.setItem('brewCrafterUser', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  }; 

  // Step-up functions for additional verification
  const stepUpBirthday = async (email, birthday) => {
    const res = await axios.post('http://localhost:5000/api/auth/stepup-birthday', { email, birthday });
    return res.data;
  };

  const stepUpOTP = async (email, otp) => {
    const res = await axios.post('http://localhost:5000/api/auth/stepup-otp', { email, otp });
    // Save user/token after verification
    localStorage.setItem('brewCrafterUser', JSON.stringify(res.data.user));
    localStorage.setItem('brewCrafterToken', res.data.token);
    if (res.data.user && res.data.user.id) {
      localStorage.setItem('user_id', res.data.user.id);
    }
    setCurrentUser(res.data.user);
    return res.data;
  };

  // Create the value object to be provided by the context
  const value = {
    currentUser,
    register,
    verifyOtp,
    login,
    logout,
    resetPassword,
    updateProfile,
    loading,
    pendingEmail,
    setPendingEmail,
    stepUpBirthday,
    stepUpOTP
  };

  return (
    <AuthContext.Provider value={value}>
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