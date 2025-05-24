import { useState } from 'react';
import { 
  Search, Filter, Download, X, User, Star, Mail, Phone, 
  MapPin, Calendar, Edit, Trash2, UserPlus, ChevronDown, ChevronUp, Eye 
} from 'lucide-react';

// Define TypeScript interfaces
interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinDate: string;
  orders: number;
  totalSpent: number;
  loyaltyPoints: number;
  favorites: string[];
  address?: string;
  lastVisit: string;
  birthday?: string;
  status: 'Active' | 'Inactive';
  notes?: string;
  profileImage?: string;
}

// Mock data for customers
const mockCustomers: Customer[] = [
  {
    id: 'C001',
    name: 'Juan Dela Cruz',
    email: 'juan@email.com',
    phone: '+63 912 345 6789',
    joinDate: '2025-01-15',
    orders: 24,
    totalSpent: 4580,
    loyaltyPoints: 450,
    favorites: ['Caramel Latte', 'Chocolate Croissant'],
    address: 'Makati City, Metro Manila',
    lastVisit: '2025-05-22',
    birthday: '1994-06-12',
    status: 'Active'
  },
  {
    id: 'C002',
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '+63 917 876 5432',
    joinDate: '2025-02-03',
    orders: 18,
    totalSpent: 3250,
    loyaltyPoints: 325,
    favorites: ['Matcha Latte', 'Vanilla Croissant'],
    address: 'Quezon City, Metro Manila',
    lastVisit: '2025-05-21',
    status: 'Active'
  },
  {
    id: 'C003',
    name: 'Paolo Reyes',
    email: 'paolo@email.com',
    phone: '+63 918 765 4321',
    joinDate: '2025-01-22',
    orders: 15,
    totalSpent: 2830,
    loyaltyPoints: 280,
    favorites: ['Americano', 'Blueberry Cheesecake'],
    lastVisit: '2025-05-19',
    status: 'Active'
  },
  {
    id: 'C004',
    name: 'Ana Tan',
    email: 'ana@email.com',
    phone: '+63 919 234 5678',
    joinDate: '2025-03-15',
    orders: 8,
    totalSpent: 1450,
    loyaltyPoints: 145,
    favorites: ['Cold Brew', 'Chocolate Chip Cookie'],
    address: 'Pasig City, Metro Manila',
    lastVisit: '2025-05-12',
    birthday: '1996-09-28',
    status: 'Active'
  },
  {
    id: 'C005',
    name: 'David Lee',
    email: 'david@email.com',
    joinDate: '2025-02-28',
    orders: 3,
    totalSpent: 590,
    loyaltyPoints: 60,
    favorites: ['Cappuccino'],
    lastVisit: '2025-04-05',
    status: 'Inactive'
  },
  {
    id: 'C006',
    name: 'Sofia Garcia',
    email: 'sofia@email.com',
    phone: '+63 927 654 3210',
    joinDate: '2025-04-10',
    orders: 12,
    totalSpent: 1980,
    loyaltyPoints: 190,
    favorites: ['Caramel Macchiato', 'Cinnamon Roll'],
    address: 'Mandaluyong City, Metro Manila',
    lastVisit: '2025-05-20',
    birthday: '1992-11-15',
    status: 'Active'
  },
  {
    id: 'C007',
    name: 'Miguel Castro',
    email: 'miguel@email.com',
    phone: '+63 935 123 4567',
    joinDate: '2025-03-05',
    orders: 6,
    totalSpent: 930,
    loyaltyPoints: 95,
    favorites: ['Espresso', 'Butter Croissant'],
    lastVisit: '2025-05-01',
    status: 'Inactive'
  }
];

const Customers = () => {
  // State for filters and displays
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [sortConfig, setSortConfig] = useState<{key: keyof Customer | null, direction: 'asc' | 'desc'}>({
    key: null,
    direction: 'asc'
  });

  // Count customers by status for summary
  const activeCustomers = mockCustomers.filter(customer => customer.status === 'Active').length;
  const inactiveCustomers = mockCustomers.filter(customer => customer.status === 'Inactive').length;
  const totalCustomers = mockCustomers.length;
  const totalLoyaltyPoints = mockCustomers.reduce((total, customer) => total + customer.loyaltyPoints, 0);

  // Handle sort
  const requestSort = (key: keyof Customer) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sort
  const sortedCustomers = [...mockCustomers].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter customers
  const filteredCustomers = sortedCustomers.filter(customer => {
    // Search filter
    const matchesSearch = 
      searchTerm === '' || 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone && customer.phone.includes(searchTerm));
    
    // Status filter
    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₱${amount.toLocaleString()}`;
  };

  // Calculate days since last visit
  const daysSinceLastVisit = (dateString: string) => {
    const lastVisit = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - lastVisit.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Handle view customer details
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  // Handle adding a new customer (placeholder)
  const handleAddCustomer = () => {
    console.log("Add new customer");
    // This would open a form to add a new customer in a real app
  };

  // Handle editing a customer (placeholder)
  const handleEditCustomer = (customer: Customer) => {
    console.log("Edit customer:", customer.id);
    // This would open a form to edit the customer in a real app
  };

  // Handle deleting a customer (placeholder)
  const handleDeleteCustomer = (id: string) => {
    console.log("Delete customer:", id);
    // This would delete the customer in a real app
  };

  // Sort indicator component
  const SortIndicator = ({ column }: { column: keyof Customer }) => {
    if (sortConfig.key !== column) {
      return (
        <ChevronDown size={14} className="ml-1 text-gray-400" />
      );
    }
    
    return sortConfig.direction === 'asc' ? (
      <ChevronUp size={14} className="ml-1 text-[#3e2723]" />
    ) : (
      <ChevronDown size={14} className="ml-1 text-[#3e2723]" />
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#3e2723]">Customer Management</h1>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 border border-[#e4c9a7] rounded-lg flex items-center text-[#3e2723] hover:bg-[#f8e8d0] transition-colors"
          >
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button
            onClick={handleAddCustomer}
            className="bg-[#3e2723] text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium hover:bg-[#5d4037] transition-colors"
          >
            <UserPlus size={16} className="mr-2" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Total Customers</h3>
          <p className="text-2xl font-bold text-[#3e2723]">{totalCustomers}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Active Customers</h3>
          <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Inactive Customers</h3>
          <p className="text-2xl font-bold text-gray-500">{inactiveCustomers}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Total Loyalty Points</h3>
          <p className="text-2xl font-bold text-[#3e2723]">{totalLoyaltyPoints}</p>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e4c9a7] mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b5a397]" />
            <input
              type="text"
              placeholder="Search customers by name, email, ID, or phone..."
              className="w-full pl-10 pr-4 py-2 border border-[#e4c9a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-[#e4c9a7] rounded-lg flex items-center text-[#3e2723] hover:bg-[#f8e8d0] transition-colors"
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>
            
            {(searchTerm || statusFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                }}
                className="px-3 py-2 border border-red-200 text-red-600 rounded-lg flex items-center hover:bg-red-50 transition-colors"
              >
                <X size={18} className="mr-1" />
                Clear
              </button>
            )}
          </div>
        </div>
        
        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-[#e4c9a7] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Status</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Active', 'Inactive'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      statusFilter === status
                        ? 'bg-[#3e2723] text-white'
                        : 'bg-[#f8e8d0] text-[#3e2723] hover:bg-[#e4c9a7]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-[#e4c9a7] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8e8d0] text-[#3e2723]">
              <tr>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]"
                  onClick={() => requestSort('id')}
                >
                  <div className="flex items-center">
                    ID <SortIndicator column="id" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]"
                  onClick={() => requestSort('name')}
                >
                  <div className="flex items-center">
                    Customer <SortIndicator column="name" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]"
                  onClick={() => requestSort('orders')}
                >
                  <div className="flex items-center">
                    Orders <SortIndicator column="orders" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]"
                  onClick={() => requestSort('totalSpent')}
                >
                  <div className="flex items-center">
                    Total Spent <SortIndicator column="totalSpent" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]"
                  onClick={() => requestSort('loyaltyPoints')}
                >
                  <div className="flex items-center">
                    Points <SortIndicator column="loyaltyPoints" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]"
                  onClick={() => requestSort('lastVisit')}
                >
                  <div className="flex items-center">
                    Last Visit <SortIndicator column="lastVisit" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]"
                  onClick={() => requestSort('status')}
                >
                  <div className="flex items-center">
                    Status <SortIndicator column="status" />
                  </div>
                </th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4c9a7]">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[#f8e8d0]/30">
                    <td className="py-3 px-4 font-medium">{customer.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#e4c9a7] rounded-full flex items-center justify-center mr-3 text-[#3e2723]">
                          {customer.profileImage ? (
                            <img 
                              src={customer.profileImage} 
                              alt={customer.name} 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <User size={16} />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-[#3e2723]">{customer.name}</div>
                          <div className="text-xs text-[#5d4037]">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{customer.orders}</td>
                    <td className="py-3 px-4 font-medium">{formatCurrency(customer.totalSpent)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Star size={16} className="text-amber-400 mr-1" />
                        {customer.loyaltyPoints}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>{formatDate(customer.lastVisit)}</div>
                      <div className="text-xs text-[#5d4037]">
                        {daysSinceLastVisit(customer.lastVisit)} days ago
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        customer.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleViewCustomer(customer)}
                          className="p-1 hover:bg-[#e4c9a7] rounded text-[#3e2723]"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditCustomer(customer)}
                          className="p-1 hover:bg-[#e4c9a7] rounded text-[#3e2723]"
                          title="Edit Customer"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                          title="Delete Customer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-[#5d4037]">
                    No customers found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-[#e4c9a7]">
              <h2 className="text-xl font-bold text-[#3e2723]">
                Customer Details
              </h2>
              <button 
                onClick={() => setShowCustomerModal(false)}
                className="text-[#5d4037] hover:text-[#3e2723]"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Customer Header */}
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[#e4c9a7] rounded-full flex items-center justify-center mr-4 text-[#3e2723]">
                  {selectedCustomer.profileImage ? (
                    <img 
                      src={selectedCustomer.profileImage} 
                      alt={selectedCustomer.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <User size={32} />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#3e2723]">
                    {selectedCustomer.name}
                  </h3>
                  <div className="flex items-center text-[#5d4037] mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      selectedCustomer.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedCustomer.status}
                    </span>
                    <span className="mx-2">•</span>
                    <span>Customer since {formatDate(selectedCustomer.joinDate)}</span>
                  </div>
                </div>
              </div>

              {/* Customer Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Contact Information */}
                <div className="bg-[#f8e8d0]/50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#3e2723] mb-4">Contact Information</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Mail size={16} className="text-[#5d4037] mt-1 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-[#5d4037]">Email</div>
                        <div>{selectedCustomer.email}</div>
                      </div>
                    </div>
                    
                    {selectedCustomer.phone && (
                      <div className="flex items-start">
                        <Phone size={16} className="text-[#5d4037] mt-1 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-[#5d4037]">Phone</div>
                          <div>{selectedCustomer.phone}</div>
                        </div>
                      </div>
                    )}
                    
                    {selectedCustomer.address && (
                      <div className="flex items-start">
                        <MapPin size={16} className="text-[#5d4037] mt-1 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-[#5d4037]">Address</div>
                          <div>{selectedCustomer.address}</div>
                        </div>
                      </div>
                    )}
                    
                    {selectedCustomer.birthday && (
                      <div className="flex items-start">
                        <Calendar size={16} className="text-[#5d4037] mt-1 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-[#5d4037]">Birthday</div>
                          <div>{formatDate(selectedCustomer.birthday)}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Purchase History */}
                <div className="bg-[#f8e8d0]/50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#3e2723] mb-4">Purchase Summary</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-[#e4c9a7]">
                      <div className="text-[#5d4037]">Total Orders</div>
                      <div className="font-bold text-[#3e2723]">{selectedCustomer.orders}</div>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-[#e4c9a7]">
                      <div className="text-[#5d4037]">Total Spent</div>
                      <div className="font-bold text-[#3e2723]">
                        {formatCurrency(selectedCustomer.totalSpent)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-[#e4c9a7]">
                      <div className="text-[#5d4037]">Loyalty Points</div>
                      <div className="font-bold text-amber-600">
                        <div className="flex items-center">
                          <Star size={16} className="text-amber-400 mr-1" />
                          {selectedCustomer.loyaltyPoints}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-[#e4c9a7]">
                      <div className="text-[#5d4037]">Last Visit</div>
                      <div className="font-medium text-[#3e2723]">{formatDate(selectedCustomer.lastVisit)}</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-[#5d4037]">Average Order Value</div>
                      <div className="font-medium text-[#3e2723]">
                        {formatCurrency(selectedCustomer.totalSpent / selectedCustomer.orders)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Favorites */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[#3e2723] mb-3">Favorite Items</h4>
                
                {selectedCustomer.favorites.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.favorites.map((favorite, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-[#e4c9a7] text-[#3e2723] rounded-full text-sm flex items-center"
                      >
                        <Coffee size={14} className="mr-1" />
                        {favorite}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#5d4037]">No favorite items yet.</p>
                )}
              </div>
              
              {/* Notes */}
              {selectedCustomer.notes && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#3e2723] mb-2">Notes</h4>
                  <p className="text-[#5d4037] bg-[#f8e8d0]/50 p-3 rounded-lg">
                    {selectedCustomer.notes}
                  </p>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="px-4 py-2 border border-[#e4c9a7] rounded-md text-[#5d4037] hover:bg-[#f8e8d0]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowCustomerModal(false);
                    handleEditCustomer(selectedCustomer);
                  }}
                  className="px-4 py-2 bg-[#3e2723] text-white rounded-md hover:bg-[#5d4037]"
                >
                  Edit Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;