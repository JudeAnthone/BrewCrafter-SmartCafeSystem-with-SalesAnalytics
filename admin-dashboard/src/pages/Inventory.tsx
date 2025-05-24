import { useState, useEffect } from 'react';
import {
  Search,
  PlusCircle,
  Filter,
  Download,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  X,
  Edit,
  Trash2,
  Check
} from 'lucide-react';

// Define TypeScript interfaces
interface InventoryItem {
  id: string;
  name: string;
  category: 'Coffee Beans' | 'Milk' | 'Syrups' | 'Tea' | 'Fruits' | 'Pastries' | 'Supplies';
  quantity: number;
  unit: string;
  minLevel: number;
  supplierName: string;
  lastRestocked: string;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  location?: string;
  expiryDate?: string;
}

// Mock data for inventory items
const mockInventoryItems: InventoryItem[] = [
  {
    id: 'INV-001',
    name: 'Arabica Coffee Beans',
    category: 'Coffee Beans',
    quantity: 25,
    unit: 'kg',
    minLevel: 10,
    supplierName: 'Metro Coffee Suppliers',
    lastRestocked: '2025-05-15',
    price: 450,
    status: 'In Stock'
  },
  {
    id: 'INV-002',
    name: 'Fresh Milk',
    category: 'Milk',
    quantity: 8,
    unit: 'L',
    minLevel: 10,
    supplierName: 'Local Dairy Farm',
    lastRestocked: '2025-05-20',
    price: 95,
    status: 'Low Stock',
    expiryDate: '2025-05-27'
  },
  {
    id: 'INV-003',
    name: 'Vanilla Syrup',
    category: 'Syrups',
    quantity: 12,
    unit: 'bottles',
    minLevel: 5,
    supplierName: 'Flavor Masters Inc.',
    lastRestocked: '2025-05-10',
    price: 180,
    status: 'In Stock'
  },
  {
    id: 'INV-004',
    name: 'Caramel Syrup',
    category: 'Syrups',
    quantity: 3,
    unit: 'bottles',
    minLevel: 5,
    supplierName: 'Flavor Masters Inc.',
    lastRestocked: '2025-05-10',
    price: 180,
    status: 'Low Stock'
  },
  {
    id: 'INV-005',
    name: 'Green Tea Leaves',
    category: 'Tea',
    quantity: 5,
    unit: 'kg',
    minLevel: 2,
    supplierName: 'Tea Essence Co.',
    lastRestocked: '2025-05-08',
    price: 320,
    status: 'In Stock'
  },
  {
    id: 'INV-006',
    name: 'Strawberries',
    category: 'Fruits',
    quantity: 0,
    unit: 'kg',
    minLevel: 2,
    supplierName: 'Fresh Produce Market',
    lastRestocked: '2025-05-18',
    price: 220,
    status: 'Out of Stock',
    expiryDate: '2025-05-25'
  },
  {
    id: 'INV-007',
    name: 'Chocolate Croissants',
    category: 'Pastries',
    quantity: 15,
    unit: 'pcs',
    minLevel: 8,
    supplierName: 'Sweet Delights Bakery',
    lastRestocked: '2025-05-24',
    price: 35,
    status: 'In Stock',
    expiryDate: '2025-05-26'
  },
  {
    id: 'INV-008',
    name: 'Paper Cups (12oz)',
    category: 'Supplies',
    quantity: 250,
    unit: 'pcs',
    minLevel: 100,
    supplierName: 'EcoPack Solutions',
    lastRestocked: '2025-05-05',
    price: 3.5,
    status: 'In Stock'
  }
];

// Categories and their colors
const categoryColors: Record<string, { bg: string; text: string }> = {
  'Coffee Beans': { bg: 'bg-amber-100', text: 'text-amber-800' },
  'Milk': { bg: 'bg-blue-50', text: 'text-blue-800' },
  'Syrups': { bg: 'bg-purple-50', text: 'text-purple-800' },
  'Tea': { bg: 'bg-green-50', text: 'text-green-800' },
  'Fruits': { bg: 'bg-pink-50', text: 'text-pink-800' },
  'Pastries': { bg: 'bg-orange-50', text: 'text-orange-800' },
  'Supplies': { bg: 'bg-gray-100', text: 'text-gray-800' }
};

// Status colors
const statusColors: Record<string, { bg: string; text: string }> = {
  'In Stock': { bg: 'bg-green-100', text: 'text-green-800' },
  'Low Stock': { bg: 'bg-amber-100', text: 'text-amber-800' },
  'Out of Stock': { bg: 'bg-red-100', text: 'text-red-800' }
};

const Inventory = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [sortConfig, setSortConfig] = useState<{key: keyof InventoryItem | null, direction: 'asc' | 'desc'}>({
    key: null,
    direction: 'asc'
  });

  // Count low stock and out of stock items for summary
  const lowStockItems = mockInventoryItems.filter(item => item.status === 'Low Stock').length;
  const outOfStockItems = mockInventoryItems.filter(item => item.status === 'Out of Stock').length;
  const totalItems = mockInventoryItems.length;
  const totalValue = mockInventoryItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Generate unique categories from data
  const categories = ['All', ...new Set(mockInventoryItems.map(item => item.category))];

  // Generate unique statuses from data
  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

  // Handle sort
  const requestSort = (key: keyof InventoryItem) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sort
  const sortedItems = [...mockInventoryItems].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter inventory items
  const filteredItems = sortedItems.filter(item => {
    // Search filter
    const matchesSearch = 
      searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    
    // Status filter
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
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

  // Check if date is approaching expiry (within 3 days)
  const isApproachingExpiry = (dateString?: string) => {
    if (!dateString) return false;
    
    const expiryDate = new Date(dateString);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= 0 && diffDays <= 3;
  };

  // Create a new inventory item (placeholder)
  const handleNewItem = () => {
    setCurrentItem(null);
    setShowForm(true);
  };

  // Edit an existing inventory item
  const handleEditItem = (item: InventoryItem) => {
    setCurrentItem(item);
    setShowForm(true);
  };

  // Save an inventory item (placeholder)
  const handleSaveItem = () => {
    setShowForm(false);
    // In a real app, you would save to your backend here
  };

  // Delete an inventory item (placeholder)
  const handleDeleteItem = (id: string) => {
    console.log("Delete item:", id);
    // In a real app, you would delete from your backend here
  };

  // Update stock (placeholder)
  const handleUpdateStock = (id: string, newQuantity: number) => {
    console.log("Update stock for item:", id, "to", newQuantity);
    // In a real app, you would update your backend here
  };

  // Format price to currency
  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString()}`;
  };

  // Sort indicator component
  const SortIndicator = ({ column }: { column: keyof InventoryItem }) => {
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
        <h1 className="text-2xl font-bold text-[#3e2723]">Inventory Management</h1>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 border border-[#e4c9a7] rounded-lg flex items-center text-[#3e2723] hover:bg-[#f8e8d0] transition-colors"
          >
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button
            onClick={handleNewItem}
            className="bg-[#3e2723] text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium hover:bg-[#5d4037] transition-colors"
          >
            <PlusCircle size={16} className="mr-2" />
            Add Item
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Total Items</h3>
          <p className="text-2xl font-bold text-[#3e2723]">{totalItems}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Low Stock</h3>
          <p className="text-2xl font-bold text-amber-600">{lowStockItems}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Out of Stock</h3>
          <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e4c9a7]">
          <h3 className="text-sm font-medium text-[#5d4037] mb-1">Total Value</h3>
          <p className="text-2xl font-bold text-[#3e2723]">{formatPrice(totalValue)}</p>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e4c9a7] mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b5a397]" />
            <input
              type="text"
              placeholder="Search inventory by name, ID, or supplier..."
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
            
            {(searchTerm || categoryFilter !== 'All' || statusFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('All');
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
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      categoryFilter === category
                        ? 'bg-[#3e2723] text-white'
                        : 'bg-[#f8e8d0] text-[#3e2723] hover:bg-[#e4c9a7]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Status</label>
              <div className="flex flex-wrap gap-2">
                {statuses.map(status => (
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

      {/* Inventory Table */}
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
                    Item Name <SortIndicator column="name" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]"
                  onClick={() => requestSort('category')}
                >
                  <div className="flex items-center">
                    Category <SortIndicator column="category" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]"
                  onClick={() => requestSort('quantity')}
                >
                  <div className="flex items-center">
                    Quantity <SortIndicator column="quantity" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]"
                  onClick={() => requestSort('price')}
                >
                  <div className="flex items-center">
                    Unit Price <SortIndicator column="price" />
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
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]"
                  onClick={() => requestSort('lastRestocked')}
                >
                  <div className="flex items-center">
                    Last Restocked <SortIndicator column="lastRestocked" />
                  </div>
                </th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4c9a7]">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className={`${item.status === 'Out of Stock' ? 'bg-red-50' : item.quantity <= item.minLevel ? 'bg-amber-50' : ''} hover:bg-[#f8e8d0]/30`}>
                    <td className="py-3 px-4 font-medium">{item.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#3e2723]">{item.name}</div>
                      <div className="text-xs text-[#5d4037]">
                        Supplier: {item.supplierName}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        categoryColors[item.category]?.bg || 'bg-gray-100'
                      } ${
                        categoryColors[item.category]?.text || 'text-gray-800'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="font-medium">
                          {item.quantity} {item.unit}
                        </div>
                        {item.quantity <= item.minLevel && (
                          <AlertTriangle size={16} className="text-amber-500" />
                        )}
                      </div>
                      <div className="text-xs text-[#5d4037]">
                        Min: {item.minLevel} {item.unit}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{formatPrice(item.price)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        statusColors[item.status]?.bg || 'bg-gray-100'
                      } ${
                        statusColors[item.status]?.text || 'text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div>{formatDate(item.lastRestocked)}</div>
                      {item.expiryDate && (
                        <div className={`text-xs ${
                          isApproachingExpiry(item.expiryDate) 
                            ? 'text-red-600 font-medium'
                            : 'text-[#5d4037]'
                        }`}>
                          Expires: {formatDate(item.expiryDate)}
                          {isApproachingExpiry(item.expiryDate) && ' (Soon)'}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="p-1 hover:bg-[#e4c9a7] rounded text-[#3e2723]"
                          title="Edit Item"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                          title="Delete Item"
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
                    No inventory items found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-[#e4c9a7]">
              <h2 className="text-xl font-bold text-[#3e2723]">
                {currentItem ? `Edit Item: ${currentItem.name}` : 'Add New Inventory Item'}
              </h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-[#5d4037] hover:text-[#3e2723]"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <form className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5d4037] mb-1">
                      Item Name*
                    </label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                      defaultValue={currentItem?.name}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#5d4037] mb-1">
                      Category*
                    </label>
                    <select 
                      className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                      defaultValue={currentItem?.category}
                      required
                    >
                      {Object.keys(categoryColors).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5d4037] mb-1">
                      Quantity*
                    </label>
                    <input 
                      type="number" 
                      className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                      defaultValue={currentItem?.quantity}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#5d4037] mb-1">
                      Unit*
                    </label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                      defaultValue={currentItem?.unit}
                      placeholder="e.g. kg, L, pcs"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#5d4037] mb-1">
                      Minimum Level*
                    </label>
                    <input 
                      type="number" 
                      className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                      defaultValue={currentItem?.minLevel}
                      min="0"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5d4037] mb-1">
                      Supplier Name*
                    </label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                      defaultValue={currentItem?.supplierName}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#5d4037] mb-1">
                      Unit Price (₱)*
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                      defaultValue={currentItem?.price}
                      min="0"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5d4037] mb-1">
                      Last Restocked Date*
                    </label>
                    <input 
                      type="date" 
                      className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                      defaultValue={currentItem?.lastRestocked}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#5d4037] mb-1">
                      Expiry Date (if applicable)
                    </label>
                    <input 
                      type="date" 
                      className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                      defaultValue={currentItem?.expiryDate}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#5d4037] mb-1">
                    Storage Location
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                    defaultValue={currentItem?.location}
                    placeholder="e.g. Back Storage, Refrigerator 2"
                  />
                </div>
              </form>
              
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-[#e4c9a7] rounded-md text-[#5d4037] hover:bg-[#f8e8d0]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveItem}
                  className="px-4 py-2 bg-[#3e2723] text-white rounded-md hover:bg-[#5d4037]"
                >
                  {currentItem ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;