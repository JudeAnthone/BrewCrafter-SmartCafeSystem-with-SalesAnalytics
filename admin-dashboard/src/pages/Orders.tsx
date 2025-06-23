import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, X, Eye, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const statusOptions = ['All', 'Completed', 'Preparing', 'Pending', 'Cancelled'];
const dateOptions = ['All Time', 'Today', 'Yesterday', 'This Week', 'This Month'];

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/admin/orders');
        setOrders(res.data);
      } catch (err) {
        setOrders([]);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  // Count orders by status
  const orderCounts = {
    total: orders.length,
    completed: orders.filter(order => order.status === 'completed' || order.status === 'Completed').length,
    preparing: orders.filter(order => order.status === 'preparing' || order.status === 'Preparing').length,
    pending: orders.filter(order => order.status === 'pending' || order.status === 'Pending').length,
    cancelled: orders.filter(order => order.status === 'cancelled' || order.status === 'Cancelled').length,
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Search filter
    const matchesSearch =
      searchTerm === '' ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.user_name && order.user_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.items && order.items.some((item: any) => item.item_name && item.item_name.toLowerCase().includes(searchTerm.toLowerCase())));

    // Status filter
    const matchesStatus = statusFilter === 'All' || order.status.toLowerCase() === statusFilter.toLowerCase();

    // Date filter (simplified)
    let matchesDate = true;
    const orderDate = new Date(order.created_at);
    const today = new Date();
    if (dateFilter === 'Today') {
      matchesDate = orderDate.toDateString() === today.toDateString();
    } else if (dateFilter === 'Yesterday') {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      matchesDate = orderDate.toDateString() === yesterday.toDateString();
    } else if (dateFilter === 'This Week') {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      matchesDate = orderDate >= weekAgo && orderDate <= today;
    } else if (dateFilter === 'This Month') {
      matchesDate = orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear();
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Format date string
  const formatDate = (dateString: string) => {
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
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor, textColor, icon;

    switch (status.toLowerCase()) {
      case 'completed':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        icon = <CheckCircle size={14} className="mr-1" />;
        break;
      case 'preparing':
        bgColor = 'bg-amber-100';
        textColor = 'text-amber-800';
        icon = <Clock size={14} className="mr-1" />;
        break;
      case 'pending':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        icon = <Clock size={14} className="mr-1" />;
        break;
      case 'cancelled':
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
        {status.charAt(0).toUpperCase() + status.slice(1)}
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
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-100">
                    Loading orders...
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-light-100/30">
                    <td className="py-3 px-4 font-medium">#{order.id.slice(0, 8)}</td>
                    <td className="py-3 px-4">
                      <div>{order.user_name}</div>
                      <div className="text-xs text-gray-100">{order.user_email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="max-w-[200px] truncate">
                        {order.items.map((item: any) => item.item_name).join(', ')}
                      </div>
                      <div className="text-xs text-gray-100">{order.items.length} item(s)</div>
                    </td>
                    <td className="py-3 px-4 font-medium">₱{Number(order.total_amount).toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">{formatDate(order.created_at)}</td>
                    <td className="py-3 px-4">{order.payment_method || 'Cash'}</td>
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

        <div className="px-4 py-3 flex items-center justify-between border-t border-light-200">
          <div className="text-sm text-gray-100">
            Showing <span className="font-medium text-primary">{filteredOrders.length}</span> of{" "}
            <span className="font-medium text-primary">{orders.length}</span> orders
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