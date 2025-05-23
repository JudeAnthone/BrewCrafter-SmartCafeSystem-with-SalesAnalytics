import React, { useState } from 'react';
import { Search, Filter, Download, X, Eye, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

// Mock data for orders
const mockOrders = [
  { 
    id: '12345', 
    customer: 'Juan Dela Cruz', 
    email: 'juan@email.com',
    items: ['Espresso', 'Croissant'], 
    total: 250,
    date: '2025-05-22T08:30:00',
    status: 'Completed',
    paymentMethod: 'Cash'
  },
  { 
    id: '12346', 
    customer: 'Maria Santos', 
    email: 'maria@email.com',
    items: ['Custom Matcha'], 
    total: 180,
    date: '2025-05-22T09:15:00',
    status: 'Preparing',
    paymentMethod: 'GCash'
  },
  { 
    id: '12347', 
    customer: 'Paolo Reyes', 
    email: 'paolo@email.com',
    items: ['Caramel Latte', 'Cheesecake'], 
    total: 320,
    date: '2025-05-22T10:45:00',
    status: 'Pending',
    paymentMethod: 'Credit Card'
  },
  { 
    id: '12348', 
    customer: 'Ana Tan', 
    email: 'ana@email.com',
    items: ['Americano', 'Blueberry Muffin', 'Extra Shot'], 
    total: 275,
    date: '2025-05-21T14:20:00',
    status: 'Completed',
    paymentMethod: 'Cash'
  },
  { 
    id: '12349', 
    customer: 'David Lee', 
    email: 'david@email.com',
    items: ['Mocha Frappuccino', 'Butter Croissant'], 
    total: 295,
    date: '2025-05-21T16:10:00',
    status: 'Cancelled',
    paymentMethod: 'GCash'
  },
  { 
    id: '12350', 
    customer: 'Sofia Garcia', 
    email: 'sofia@email.com',
    items: ['Iced Coffee', 'Chocolate Chip Cookie'], 
    total: 195,
    date: '2025-05-21T11:30:00',
    status: 'Completed',
    paymentMethod: 'PayMaya'
  },
  { 
    id: '12351', 
    customer: 'Miguel Castro', 
    email: 'miguel@email.com',
    items: ['Custom Cold Brew', 'Cinnamon Roll'], 
    total: 260,
    date: '2025-05-20T09:45:00',
    status: 'Completed',
    paymentMethod: 'Credit Card'
  }
];

// Filter options
const statusOptions = ['All', 'Completed', 'Preparing', 'Pending', 'Cancelled'];
const dateOptions = ['All Time', 'Today', 'Yesterday', 'This Week', 'This Month'];

const Orders = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [showFilters, setShowFilters] = useState(false);

  // Count orders by status
  const orderCounts = {
    total: mockOrders.length,
    completed: mockOrders.filter(order => order.status === 'Completed').length,
    preparing: mockOrders.filter(order => order.status === 'Preparing').length,
    pending: mockOrders.filter(order => order.status === 'Pending').length,
    cancelled: mockOrders.filter(order => order.status === 'Cancelled').length,
  };

  // Filter orders
  const filteredOrders = mockOrders.filter(order => {
    // Search filter
    const matchesSearch = 
      searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Status filter
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    // Date filter (simplified for mock data)
    let matchesDate = true;
    if (dateFilter === 'Today') {
      matchesDate = order.date.includes('2025-05-22');
    } else if (dateFilter === 'Yesterday') {
      matchesDate = order.date.includes('2025-05-21');
    } else if (dateFilter === 'This Week') {
      matchesDate = order.date.includes('2025-05');
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Format date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor, textColor, icon;
    
    switch (status) {
      case 'Completed':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        icon = <CheckCircle size={14} className="mr-1" />;
        break;
      case 'Preparing':
        bgColor = 'bg-amber-100';
        textColor = 'text-amber-800';
        icon = <Clock size={14} className="mr-1" />;
        break;
      case 'Pending':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        icon = <Clock size={14} className="mr-1" />;
        break;
      case 'Cancelled':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        icon = <AlertTriangle size={14} className="mr-1" />;
        break;
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
        break;
    }
    
    return (
      <span className={`flex items-center ${bgColor} ${textColor} px-2 py-1 rounded-full text-xs font-medium`}>
        {icon}
        {status}
      </span>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Orders</h1>
        <button 
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium hover:bg-[#5d4037] transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export Orders
        </button>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-light-200">
          <p className="text-sm text-gray-100 mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-primary">{orderCounts.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-light-200">
          <p className="text-sm text-gray-100 mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-600">{orderCounts.completed}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-light-200">
          <p className="text-sm text-gray-100 mb-1">Preparing</p>
          <p className="text-2xl font-bold text-amber-600">{orderCounts.preparing}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-light-200">
          <p className="text-sm text-gray-100 mb-1">Pending</p>
          <p className="text-2xl font-bold text-blue-600">{orderCounts.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-light-200">
          <p className="text-sm text-gray-100 mb-1">Cancelled</p>
          <p className="text-2xl font-bold text-red-600">{orderCounts.cancelled}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-light-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-100" />
            <input
              type="text"
              placeholder="Search orders by ID, customer, or items..."
              className="w-full pl-10 pr-4 py-2 border border-light-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-light-200 rounded-lg flex items-center text-primary hover:bg-light-100 transition-colors"
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>
            
            {searchTerm || statusFilter !== 'All' || dateFilter !== 'All Time' ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setDateFilter('All Time');
                }}
                className="px-3 py-2 border border-red-200 text-red-600 rounded-lg flex items-center hover:bg-red-50 transition-colors"
              >
                <X size={18} className="mr-1" />
                Clear
              </button>
            ) : null}
          </div>
        </div>
        
        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-light-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-1">Status</label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      statusFilter === status
                        ? 'bg-primary text-white'
                        : 'bg-light-100 text-primary hover:bg-light-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-1">Date Range</label>
              <div className="flex flex-wrap gap-2">
                {dateOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => setDateFilter(option)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      dateFilter === option
                        ? 'bg-primary text-white'
                        : 'bg-light-100 text-primary hover:bg-light-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-light-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-light-100 text-primary">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Items</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Payment</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-light-100/30">
                    <td className="py-3 px-4 font-medium">#{order.id}</td>
                    <td className="py-3 px-4">
                      <div>{order.customer}</div>
                      <div className="text-xs text-gray-100">{order.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="max-w-[200px] truncate">
                        {order.items.join(', ')}
                      </div>
                      <div className="text-xs text-gray-100">{order.items.length} item(s)</div>
                    </td>
                    <td className="py-3 px-4 font-medium">₱{order.total.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">{formatDate(order.date)}</td>
                    <td className="py-3 px-4">{order.paymentMethod}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="p-2 hover:bg-light-100 rounded-full text-primary">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-100">
                    No orders found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-light-200">
          <div className="text-sm text-gray-100">
            Showing <span className="font-medium text-primary">{filteredOrders.length}</span> of{" "}
            <span className="font-medium text-primary">{mockOrders.length}</span> orders
          </div>
          
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-light-200 rounded hover:bg-light-100 text-primary disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 bg-primary text-white rounded">1</button>
            <button className="px-3 py-1 border border-light-200 rounded hover:bg-light-100 text-primary">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;