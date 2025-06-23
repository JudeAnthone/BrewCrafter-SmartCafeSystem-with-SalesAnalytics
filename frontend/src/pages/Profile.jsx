import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Profile() {
  const { currentUser, updateProfile, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle save profile changes
  const handleSave = () => {
    try {
      updateProfile(formData);
      setEditing(false);
      setMessage('Profile updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to update profile');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-[#e4c9a7]/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-[#3e2723]">My <span className="text-[#cc6d2d]">Profile</span></h1>
          <div className="mt-4 sm:mt-0">
            {editing ? (
              <div className="flex space-x-3">
                <button 
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 border border-[#e4c9a7] rounded-lg text-[#5d4037] hover:bg-[#f8e8d0] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#cc6d2d] text-white rounded-lg hover:bg-[#3e2723] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-[#cc6d2d] text-white rounded-lg hover:bg-[#3e2723] transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
        
        {message && (
          <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-[#f8f4e5] rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-[#cc6d2d] rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <h2 className="text-xl font-semibold text-[#3e2723]">{currentUser?.name}</h2>
              <p className="text-[#5d4037] mt-1">{currentUser?.email}</p>
              <p className="text-sm text-[#5d4037] mt-4">Member since {new Date(currentUser?.createdAt).toLocaleDateString()}</p>
              
              <button 
                onClick={logout}
                className="w-full mt-6 px-4 py-2 border border-red-400 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-[#f8f4e5] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#3e2723] mb-4">Personal Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[#5d4037] font-medium mb-1">Name</label>
                  {editing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#e4c9a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] bg-white"
                    />
                  ) : (
                    <p className="text-[#3e2723]">{currentUser?.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-[#5d4037] font-medium mb-1">Email</label>
                  {editing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#e4c9a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] bg-white"
                    />
                  ) : (
                    <p className="text-[#3e2723]">{currentUser?.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-[#5d4037] font-medium mb-1">Phone Number</label>
                  {editing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#e4c9a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] bg-white"
                      placeholder="Your phone number"
                    />
                  ) : (
                    <p className="text-[#3e2723]">{currentUser?.phone || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-[#5d4037] font-medium mb-1">Address</label>
                  {editing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#e4c9a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc6d2d] bg-white"
                      rows={3}
                      placeholder="Your delivery address"
                    />
                  ) : (
                    <p className="text-[#3e2723]">{currentUser?.address || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Order History Preview */}
            <div className="bg-[#f8f4e5] rounded-xl p-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#3e2723]">Recent Orders</h3>
                <Link to="/orders" className="text-[#cc6d2d] hover:text-[#3e2723] font-medium">View All</Link>
              </div>
              
              {/* If no orders yet */}
              <div className="text-center py-8 text-[#5d4037]">
                <p>You haven't placed any orders yet.</p>
                <Link 
                  to="/menu"
                  className="inline-block mt-4 px-6 py-2 bg-[#cc6d2d] text-white rounded-lg hover:bg-[#3e2723] transition-colors"
                >
                  Browse Menu
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;