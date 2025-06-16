import React, { useState, useEffect } from 'react';
import { 
  User, Lock, Globe, Bell, Coffee, Store, CreditCard, Upload, 
  Save, Clock, Mail, Phone, MapPin, ToggleLeft, ToggleRight
} from 'lucide-react';

const Settings = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('account');
  
  // State for profile information
  const [profile, setProfile] = useState({
    user_name: '',
    user_email: '',
    birthday: '',
    user_phone: ''
  });

  // State for password fields
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // State for loading, message, and error
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  // Fetch admin profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('http://localhost:5000/api/admin/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch profile');
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  // Handle profile update
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');
      setMsg('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    }
    setLoading(false);
  };

  // Handle password change
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    setError('');
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/admin/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to change password');
      setMsg('Password changed successfully!');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#3e2723] mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-[#e4c9a7] overflow-hidden">
            <nav className="flex flex-col">
              <button 
                onClick={() => setActiveTab('account')}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === 'account' 
                    ? 'bg-[#f8e8d0] text-[#3e2723] font-medium' 
                    : 'text-[#5d4037] hover:bg-[#f8e8d0]/50'
                }`}
              >
                <User size={18} className="mr-3" />
                Account Settings
              </button>
              
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === 'security' 
                    ? 'bg-[#f8e8d0] text-[#3e2723] font-medium' 
                    : 'text-[#5d4037] hover:bg-[#f8e8d0]/50'
                }`}
              >
                <Lock size={18} className="mr-3" />
                Security
              </button>
              
              <button 
                onClick={() => setActiveTab('store')}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === 'store' 
                    ? 'bg-[#f8e8d0] text-[#3e2723] font-medium' 
                    : 'text-[#5d4037] hover:bg-[#f8e8d0]/50'
                }`}
              >
                <Store size={18} className="mr-3" />
                Store Information
              </button>
              
              <button 
                onClick={() => setActiveTab('menu')}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === 'menu' 
                    ? 'bg-[#f8e8d0] text-[#3e2723] font-medium' 
                    : 'text-[#5d4037] hover:bg-[#f8e8d0]/50'
                }`}
              >
                <Coffee size={18} className="mr-3" />
                Menu Settings
              </button>
              
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === 'notifications' 
                    ? 'bg-[#f8e8d0] text-[#3e2723] font-medium' 
                    : 'text-[#5d4037] hover:bg-[#f8e8d0]/50'
                }`}
              >
                <Bell size={18} className="mr-3" />
                Notifications
              </button>
              
              <button 
                onClick={() => setActiveTab('system')}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === 'system' 
                    ? 'bg-[#f8e8d0] text-[#3e2723] font-medium' 
                    : 'text-[#5d4037] hover:bg-[#f8e8d0]/50'
                }`}
              >
                <Globe size={18} className="mr-3" />
                System
              </button>
            </nav>
          </div>
        </div>
        
        
        {/* Settings Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-[#e4c9a7] p-6">
            {msg && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">{msg}</div>}
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>}
            {/* Account Settings */}
            {activeTab === 'account' && (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div>
                  <label className="block text-[#5d4037] font-medium mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                    value={profile.user_name}
                    onChange={e => setProfile({ ...profile, user_name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#5d4037] font-medium mb-2">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                    value={profile.user_email}
                    onChange={e => setProfile({ ...profile, user_email: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#5d4037] font-medium mb-2">
                    Birthday
                  </label>
                  <input 
                    type="date" 
                    className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                    value={profile.birthday ? profile.birthday.slice(0, 10) : ''}
                    onChange={e => setProfile({ ...profile, birthday: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#5d4037] font-medium mb-2">
                    Phone
                  </label>
                  <input 
                    type="tel" 
                    className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                    value={profile.user_phone || ''}
                    onChange={e => setProfile({ ...profile, user_phone: e.target.value })}
                  />
                </div>
                
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#3e2723] text-white rounded-md hover:bg-[#5d4037] flex items-center"
                  disabled={loading}
                >
                  <Save size={16} className="mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            )}
            
            {/* Security Settings */}
            {activeTab === 'security' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label className="block text-[#5d4037] font-medium mb-2">
                    Current Password
                  </label>
                  <input 
                    type="password" 
                    className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                    value={passwords.currentPassword}
                    onChange={e => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#5d4037] font-medium mb-2">
                    New Password
                  </label>
                  <input 
                    type="password" 
                    className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                    value={passwords.newPassword}
                    onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#5d4037] font-medium mb-2">
                    Confirm New Password
                  </label>
                  <input 
                    type="password" 
                    className="w-full p-3 border border-[#e4c9a7] rounded-xl"
                    value={passwords.confirmPassword}
                    onChange={e => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#3e2723] text-white rounded-md hover:bg-[#5d4037] flex items-center"
                  disabled={loading}
                >
                  <Save size={16} className="mr-2" />
                  {loading ? 'Saving...' : 'Change Password'}
                </button>
              </form>
            )}
            
            {/* Store Information */}
            {activeTab === 'store' && (
              <div>
                <h2 className="text-xl font-bold text-[#3e2723] mb-5">Store Information</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        Store Name
                      </label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                        value={storeSettings.name}
                        onChange={(e) => setStoreSettings({...storeSettings, name: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        Store Description
                      </label>
                      <textarea 
                        className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                        rows={3}
                        value={storeSettings.description}
                        onChange={(e) => setStoreSettings({...storeSettings, description: e.target.value})}
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#5d4037] mb-1">
                          Store Email
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 bg-[#f8e8d0] border border-r-0 border-[#e4c9a7] rounded-l-md">
                            <Mail size={16} className="text-[#5d4037]" />
                          </span>
                          <input 
                            type="email" 
                            className="flex-1 p-2 border border-[#e4c9a7] rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                            value={storeSettings.email}
                            onChange={(e) => setStoreSettings({...storeSettings, email: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#5d4037] mb-1">
                          Store Phone
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 bg-[#f8e8d0] border border-r-0 border-[#e4c9a7] rounded-l-md">
                            <Phone size={16} className="text-[#5d4037]" />
                          </span>
                          <input 
                            type="tel" 
                            className="flex-1 p-2 border border-[#e4c9a7] rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                            value={storeSettings.phone}
                            onChange={(e) => setStoreSettings({...storeSettings, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        Store Address
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 bg-[#f8e8d0] border border-r-0 border-[#e4c9a7] rounded-l-md">
                          <MapPin size={16} className="text-[#5d4037]" />
                        </span>
                        <input 
                          type="text" 
                          className="flex-1 p-2 border border-[#e4c9a7] rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                          value={storeSettings.address}
                          onChange={(e) => setStoreSettings({...storeSettings, address: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#5d4037] mb-1">
                          Operating Hours
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 bg-[#f8e8d0] border border-r-0 border-[#e4c9a7] rounded-l-md">
                            <Clock size={16} className="text-[#5d4037]" />
                          </span>
                          <input 
                            type="text" 
                            className="flex-1 p-2 border border-[#e4c9a7] rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                            value={storeSettings.operatingHours}
                            onChange={(e) => setStoreSettings({...storeSettings, operatingHours: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#5d4037] mb-1">
                          Timezone
                        </label>
                        <select 
                          className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                          value={storeSettings.timezone}
                          onChange={(e) => setStoreSettings({...storeSettings, timezone: e.target.value})}
                        >
                          <option value="Asia/Manila">Asia/Manila (GMT+8)</option>
                          <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                          <option value="Asia/Hong_Kong">Asia/Hong Kong (GMT+8)</option>
                          <option value="America/New_York">America/New_York (GMT-4)</option>
                          <option value="Europe/London">Europe/London (GMT+1)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        Store Logo
                      </label>
                      <div className="mt-1 flex items-center">
                        <div className="w-20 h-20 rounded-md bg-[#f8e8d0] flex items-center justify-center mr-4">
                          <Coffee size={32} className="text-[#3e2723]" />
                        </div>
                        <button
                          type="button"
                          className="px-4 py-2 border border-[#e4c9a7] rounded-md text-[#5d4037] hover:bg-[#f8e8d0]"
                        >
                          Change Logo
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-[#3e2723] text-white rounded-md hover:bg-[#5d4037] flex items-center"
                    >
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            
            {/* Menu Settings */}
            {activeTab === 'menu' && (
              <div>
                <h2 className="text-xl font-bold text-[#3e2723] mb-5">Menu Settings</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        Default Menu Categories
                      </label>
                      <div className="p-3 bg-[#f8e8d0] rounded-lg">
                        <div className="flex flex-wrap gap-2">
                          {['Coffee', 'Tea', 'Frappe', 'Smoothie', 'Pastries', 'Add-ons'].map(category => (
                            <span 
                              key={category}
                              className="px-3 py-1 bg-white text-[#3e2723] rounded-full text-sm flex items-center"
                            >
                              {category}
                            </span>
                          ))}
                          <button 
                            type="button"
                            className="px-3 py-1 border border-dashed border-[#3e2723] text-[#3e2723] rounded-full text-sm"
                          >
                            + Add Category
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium text-[#5d4037]">
                            Show Out of Stock Items
                          </label>
                          <button type="button" onClick={() => {}}>
                            {true ? <ToggleRight size={24} className="text-[#3e2723]" /> : <ToggleLeft size={24} className="text-[#5d4037]" />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium text-[#5d4037]">
                            Enable "Popular" Label
                          </label>
                          <button type="button" onClick={() => {}}>
                            {true ? <ToggleRight size={24} className="text-[#3e2723]" /> : <ToggleLeft size={24} className="text-[#5d4037]" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium text-[#5d4037]">
                            Display Nutritional Info
                          </label>
                          <button type="button" onClick={() => {}}>
                            {false ? <ToggleRight size={24} className="text-[#3e2723]" /> : <ToggleLeft size={24} className="text-[#5d4037]" />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium text-[#5d4037]">
                            Enable Ingredient Customization
                          </label>
                          <button type="button" onClick={() => {}}>
                            {true ? <ToggleRight size={24} className="text-[#3e2723]" /> : <ToggleLeft size={24} className="text-[#5d4037]" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        Special Menu Note
                      </label>
                      <textarea 
                        className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                        rows={2}
                        placeholder="This note will appear on your menu (e.g., 'All prices include VAT')"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-[#3e2723] text-white rounded-md hover:bg-[#5d4037] flex items-center"
                    >
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold text-[#3e2723] mb-5">Notification Settings</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 hover:bg-[#f8e8d0]/50 rounded-lg">
                      <div>
                        <p className="font-medium text-[#3e2723]">Order Confirmations</p>
                        <p className="text-sm text-[#5d4037]">
                          Receive notifications when new orders are placed
                        </p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => toggleNotification('orderConfirmations')}
                      >
                        {notifications.orderConfirmations ? 
                          <ToggleRight size={24} className="text-[#3e2723]" /> : 
                          <ToggleLeft size={24} className="text-[#5d4037]" />
                        }
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-[#f8e8d0]/50 rounded-lg">
                      <div>
                        <p className="font-medium text-[#3e2723]">Stock Alerts</p>
                        <p className="text-sm text-[#5d4037]">
                          Get notified when inventory items are running low
                        </p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => toggleNotification('stockAlerts')}
                      >
                        {notifications.stockAlerts ? 
                          <ToggleRight size={24} className="text-[#3e2723]" /> : 
                          <ToggleLeft size={24} className="text-[#5d4037]" />
                        }
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-[#f8e8d0]/50 rounded-lg">
                      <div>
                        <p className="font-medium text-[#3e2723]">Customer Reviews</p>
                        <p className="text-sm text-[#5d4037]">
                          Be notified when customers leave reviews
                        </p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => toggleNotification('customerReviews')}
                      >
                        {notifications.customerReviews ? 
                          <ToggleRight size={24} className="text-[#3e2723]" /> : 
                          <ToggleLeft size={24} className="text-[#5d4037]" />
                        }
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-[#f8e8d0]/50 rounded-lg">
                      <div>
                        <p className="font-medium text-[#3e2723]">Daily Reports</p>
                        <p className="text-sm text-[#5d4037]">
                          Receive daily sales and inventory reports
                        </p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => toggleNotification('dailyReports')}
                      >
                        {notifications.dailyReports ? 
                          <ToggleRight size={24} className="text-[#3e2723]" /> : 
                          <ToggleLeft size={24} className="text-[#5d4037]" />
                        }
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 hover:bg-[#f8e8d0]/50 rounded-lg">
                      <div>
                        <p className="font-medium text-[#3e2723]">Marketing Emails</p>
                        <p className="text-sm text-[#5d4037]">
                          Receive updates about marketing features and promotions
                        </p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => toggleNotification('marketingEmails')}
                      >
                        {notifications.marketingEmails ? 
                          <ToggleRight size={24} className="text-[#3e2723]" /> : 
                          <ToggleLeft size={24} className="text-[#5d4037]" />
                        }
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-[#3e2723] text-white rounded-md hover:bg-[#5d4037] flex items-center"
                    >
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* System Settings */}
            {activeTab === 'system' && (
              <div>
                <h2 className="text-xl font-bold text-[#3e2723] mb-5">System Settings</h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-[#f8e8d0] rounded-lg">
                    <h3 className="text-lg font-medium text-[#3e2723] mb-1">System Information</h3>
                    <p className="text-sm text-[#5d4037] mb-3">
                      Technical details about your BrewCrafter system
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between border-b border-[#e4c9a7] py-1">
                        <span className="text-[#5d4037]">Version</span>
                        <span>BrewCrafter 1.0.0</span>
                      </div>
                      <div className="flex justify-between border-b border-[#e4c9a7] py-1">
                        <span className="text-[#5d4037]">Database</span>
                        <span>MongoDB Cloud</span>
                      </div>
                      <div className="flex justify-between border-b border-[#e4c9a7] py-1">
                        <span className="text-[#5d4037]">Last Updated</span>
                        <span>May 24, 2025</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#5d4037]">API Status</span>
                        <span className="text-green-600">Connected</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#3e2723]">Data Management</h3>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#f8e8d0] rounded-lg">
                      <div className="mb-3 md:mb-0">
                        <p className="font-medium text-[#3e2723]">Export All Data</p>
                        <p className="text-sm text-[#5d4037]">
                          Export all your store data for backup purposes
                        </p>
                      </div>
                      <button 
                        type="button"
                        className="px-4 py-2 border border-[#3e2723] text-[#3e2723] rounded-md hover:bg-[#3e2723] hover:text-white transition-colors self-start md:self-auto"
                      >
                        Export Data
                      </button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div className="mb-3 md:mb-0">
                        <p className="font-medium text-red-600">Delete All Data</p>
                        <p className="text-sm text-red-600">
                          This will permanently delete all your store data
                        </p>
                      </div>
                      <button 
                        type="button"
                        className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors self-start md:self-auto"
                      >
                        Delete Data
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-[#3e2723] mb-3">User Management</h3>
                    <div className="space-y-3">
                      <div className="p-3 border border-[#e4c9a7] rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-medium">Admin User</p>
                          <p className="text-sm text-[#5d4037]">admin@brewcrafter.com</p>
                        </div>
                        <div className="bg-[#3e2723] text-white text-xs px-2 py-1 rounded-full">
                          Owner
                        </div>
                      </div>
                      
                      <div className="p-3 border border-[#e4c9a7] rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-medium">Staff Member</p>
                          <p className="text-sm text-[#5d4037]">staff@brewcrafter.com</p>
                        </div>
                        <div className="bg-[#e4c9a7] text-[#3e2723] text-xs px-2 py-1 rounded-full">
                          Staff
                        </div>
                      </div>
                      
                      <button 
                        type="button"
                        className="w-full p-3 border border-dashed border-[#e4c9a7] rounded-lg text-[#5d4037] hover:bg-[#f8e8d0] text-center"
                      >
                        + Add New User
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;