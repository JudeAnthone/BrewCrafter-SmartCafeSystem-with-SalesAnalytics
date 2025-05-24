import React, { useState } from 'react';
import { 
  User, Lock, Globe, Bell, Coffee, Store, CreditCard, Upload, 
  Save, Clock, Mail, Phone, MapPin, ToggleLeft, ToggleRight, Trash2
} from 'lucide-react';

const Settings = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('account');
  
  // State for notification settings
  const [notifications, setNotifications] = useState({
    orderConfirmations: true,
    stockAlerts: true,
    customerReviews: true,
    dailyReports: false,
    marketingEmails: false
  });

  // Toggle notification settings
  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // State for store settings
  const [storeSettings, setStoreSettings] = useState({
    name: 'BrewCrafter Coffee',
    description: 'Premium coffee and pastries in a cozy atmosphere',
    email: 'contact@brewcrafter.com',
    phone: '+63 912 345 6789',
    address: '123 Coffee Street, Makati City, Metro Manila',
    operatingHours: '7:00 AM - 10:00 PM',
    timezone: 'Asia/Manila'
  });

  // State for payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    acceptCash: true,
    acceptCreditCard: true,
    acceptDebit: true,
    acceptGcash: true,
    acceptPaymaya: true,
    acceptGrabpay: false,
    taxRate: 12,
    serviceCharge: 0,
    currency: 'PHP'
  });

  // Handle form submission (placeholder)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would save changes to the backend in a real app
    alert('Settings saved successfully!');
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
                onClick={() => setActiveTab('payment')}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === 'payment' 
                    ? 'bg-[#f8e8d0] text-[#3e2723] font-medium' 
                    : 'text-[#5d4037] hover:bg-[#f8e8d0]/50'
                }`}
              >
                <CreditCard size={18} className="mr-3" />
                Payment Methods
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
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-bold text-[#3e2723] mb-5">Account Settings</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-[#e4c9a7] rounded-full overflow-hidden flex items-center justify-center">
                          <User size={36} className="text-[#3e2723]" />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-[#3e2723] text-white p-1.5 rounded-full">
                          <Upload size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#5d4037] mb-1">
                          First Name
                        </label>
                        <input 
                          type="text" 
                          className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                          defaultValue="Admin"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#5d4037] mb-1">
                          Last Name
                        </label>
                        <input 
                          type="text" 
                          className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                          defaultValue="User"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                        defaultValue="admin@brewcrafter.com"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#5d4037] mb-1">
                          Role
                        </label>
                        <input 
                          type="text" 
                          className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20 bg-gray-50"
                          defaultValue="Administrator"
                          disabled
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#5d4037] mb-1">
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                          defaultValue="+63 912 345 6789"
                        />
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
            
            {/* Security Settings */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold text-[#3e2723] mb-5">Security Settings</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        Current Password
                      </label>
                      <input 
                        type="password" 
                        className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                        placeholder="Enter your current password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        New Password
                      </label>
                      <input 
                        type="password" 
                        className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                        placeholder="Enter new password"
                      />
                      <p className="text-xs text-[#5d4037] mt-1">
                        Password must be at least 8 characters and include uppercase, lowercase, number, and special character
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        Confirm New Password
                      </label>
                      <input 
                        type="password" 
                        className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium text-[#3e2723] mb-3">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 bg-[#f8e8d0] rounded-lg">
                      <div>
                        <p className="font-medium text-[#3e2723]">Enable 2FA</p>
                        <p className="text-sm text-[#5d4037] mt-1">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 border border-[#3e2723] text-[#3e2723] rounded-md hover:bg-[#3e2723] hover:text-white transition-colors"
                      >
                        Setup
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium text-[#3e2723] mb-3">Login Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-[#f8e8d0] rounded-lg">
                        <div>
                          <p className="font-medium text-[#3e2723]">Current Session</p>
                          <p className="text-sm text-[#5d4037]">
                            Windows • Chrome • Manila, Philippines
                          </p>
                        </div>
                        <span className="text-green-600 text-sm font-medium">Active Now</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-[#f8e8d0]/50 rounded-lg">
                        <div>
                          <p className="font-medium text-[#3e2723]">Previous Session</p>
                          <p className="text-sm text-[#5d4037]">
                            Windows • Chrome • Manila, Philippines
                          </p>
                        </div>
                        <span className="text-[#5d4037] text-sm">Yesterday, 3:45 PM</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        className="text-red-600 text-sm hover:underline"
                      >
                        Sign out of all other sessions
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
            
            {/* Payment Methods */}
            {activeTab === 'payment' && (
              <div>
                <h2 className="text-xl font-bold text-[#3e2723] mb-5">Payment Settings</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-[#3e2723] mb-3">Accepted Payment Methods</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="acceptCash" 
                          checked={paymentSettings.acceptCash}
                          onChange={() => setPaymentSettings({...paymentSettings, acceptCash: !paymentSettings.acceptCash})}
                          className="h-4 w-4 text-[#3e2723] focus:ring-[#3e2723] rounded"
                        />
                        <label htmlFor="acceptCash" className="ml-2 text-[#5d4037]">
                          Cash
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="acceptCreditCard" 
                          checked={paymentSettings.acceptCreditCard}
                          onChange={() => setPaymentSettings({...paymentSettings, acceptCreditCard: !paymentSettings.acceptCreditCard})}
                          className="h-4 w-4 text-[#3e2723] focus:ring-[#3e2723] rounded"
                        />
                        <label htmlFor="acceptCreditCard" className="ml-2 text-[#5d4037]">
                          Credit Card
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="acceptDebit" 
                          checked={paymentSettings.acceptDebit}
                          onChange={() => setPaymentSettings({...paymentSettings, acceptDebit: !paymentSettings.acceptDebit})}
                          className="h-4 w-4 text-[#3e2723] focus:ring-[#3e2723] rounded"
                        />
                        <label htmlFor="acceptDebit" className="ml-2 text-[#5d4037]">
                          Debit Card
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="acceptGcash" 
                          checked={paymentSettings.acceptGcash}
                          onChange={() => setPaymentSettings({...paymentSettings, acceptGcash: !paymentSettings.acceptGcash})}
                          className="h-4 w-4 text-[#3e2723] focus:ring-[#3e2723] rounded"
                        />
                        <label htmlFor="acceptGcash" className="ml-2 text-[#5d4037]">
                          GCash
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="acceptPaymaya" 
                          checked={paymentSettings.acceptPaymaya}
                          onChange={() => setPaymentSettings({...paymentSettings, acceptPaymaya: !paymentSettings.acceptPaymaya})}
                          className="h-4 w-4 text-[#3e2723] focus:ring-[#3e2723] rounded"
                        />
                        <label htmlFor="acceptPaymaya" className="ml-2 text-[#5d4037]">
                          PayMaya
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="acceptGrabpay" 
                          checked={paymentSettings.acceptGrabpay}
                          onChange={() => setPaymentSettings({...paymentSettings, acceptGrabpay: !paymentSettings.acceptGrabpay})}
                          className="h-4 w-4 text-[#3e2723] focus:ring-[#3e2723] rounded"
                        />
                        <label htmlFor="acceptGrabpay" className="ml-2 text-[#5d4037]">
                          GrabPay
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium text-[#3e2723] mb-3">Tax & Pricing</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#5d4037] mb-1">
                          Tax Rate (%)
                        </label>
                        <input 
                          type="number" 
                          min="0"
                          step="0.01"
                          className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                          value={paymentSettings.taxRate}
                          onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: parseFloat(e.target.value)})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#5d4037] mb-1">
                          Service Charge (%)
                        </label>
                        <input 
                          type="number" 
                          min="0"
                          step="0.01"
                          className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                          value={paymentSettings.serviceCharge}
                          onChange={(e) => setPaymentSettings({...paymentSettings, serviceCharge: parseFloat(e.target.value)})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#5d4037] mb-1">
                          Currency
                        </label>
                        <select 
                          className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                          value={paymentSettings.currency}
                          onChange={(e) => setPaymentSettings({...paymentSettings, currency: e.target.value})}
                        >
                          <option value="PHP">Philippine Peso (PHP ₱)</option>
                          <option value="USD">US Dollar (USD $)</option>
                          <option value="EUR">Euro (EUR €)</option>
                          <option value="JPY">Japanese Yen (JPY ¥)</option>
                          <option value="GBP">British Pound (GBP £)</option>
                        </select>
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