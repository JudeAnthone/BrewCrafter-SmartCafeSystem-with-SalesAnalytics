import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Search, PlusCircle, Filter, Download, AlertTriangle, ChevronDown, ChevronUp, X, Edit, Trash2
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category_name: string;
  quantity: number;
  unit: string;
  min_level: number;
  price_per_unit: number;
  status: string;
  last_restocked: string;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  'In Stock': { bg: 'bg-green-100', text: 'text-green-800' },
  'Low Stock': { bg: 'bg-amber-100', text: 'text-amber-800' },
  'Out of Stock': { bg: 'bg-red-100', text: 'text-red-800' }
};

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [sortConfig, setSortConfig] = useState<{key: keyof InventoryItem | null, direction: 'asc' | 'desc'}>({
    key: null,
    direction: 'asc'
  });

  // Fetch inventory from backend
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/admin/inventory');
        setInventoryItems(res.data);
      } catch (err) {
        setInventoryItems([]);
      }
      setLoading(false);
    };
    fetchInventory();
  }, []);

  // Add/Edit/Delete handlers  
  const handleNewItem = () => {
    setCurrentItem(null);
    setShowForm(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setCurrentItem(item);
    setShowForm(true);
  };

  const handleSaveItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const itemData = {
      name: formData.get('name') as string,
      category_id: formData.get('category_id') as string,
      quantity: Number(formData.get('quantity')),
      unit: formData.get('unit') as string,
      min_level: Number(formData.get('min_level')),
      price_per_unit: Number(formData.get('price_per_unit')),
      status: formData.get('status') as string,
      last_restocked: formData.get('last_restocked') as string,
    };

    try {
      if (currentItem) {
        // Update
        await axios.put(`http://localhost:5000/api/admin/inventory/${currentItem.id}`, itemData);
      } else {
        // Add
        await axios.post('http://localhost:5000/api/admin/inventory', itemData);
      }
      // Refresh list
      const res = await axios.get('http://localhost:5000/api/admin/inventory');
      setInventoryItems(res.data);
      setShowForm(false);
    } catch (err) {
      alert('Failed to save inventory item.');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm('Delete this inventory item?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/inventory/${id}`);
      setInventoryItems(items => items.filter(item => item.id !== id));
    } catch (err) {
      alert('Failed to delete inventory item.');
    }
  };

  // Sorting and filtering logic (same as before)
  const requestSort = (key: keyof InventoryItem) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  const sortedItems = [...inventoryItems].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredItems = sortedItems.filter(item => {
    const matchesSearch =
      searchTerm === '' ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
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

  // Format price
  const formatPrice = (price: number) => `₱${price.toLocaleString()}`;

  // Sort indicator
  const SortIndicator = ({ column }: { column: keyof InventoryItem }) => {
    if (sortConfig.key !== column) {
      return <ChevronDown size={14} className="ml-1 text-gray-400" />;
    }
    return sortConfig.direction === 'asc'
      ? <ChevronUp size={14} className="ml-1 text-[#3e2723]" />
      : <ChevronDown size={14} className="ml-1 text-[#3e2723]" />;
  };

  // Summary
  const lowStockItems = inventoryItems.filter(item => item.status === 'Low Stock').length;
  const outOfStockItems = inventoryItems.filter(item => item.status === 'Out of Stock').length;
  const totalItems = inventoryItems.length;
  const totalValue = inventoryItems.reduce((total, item) => total + (item.price_per_unit * item.quantity), 0);

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
              placeholder="Search inventory by name or ID..."
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
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-[#e4c9a7] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Status</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map(status => (
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
                <th className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]" onClick={() => requestSort('id')}>
                  <div className="flex items-center">ID <SortIndicator column="id" /></div>
                </th>
                <th className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]" onClick={() => requestSort('name')}>
                  <div className="flex items-center">Item Name <SortIndicator column="name" /></div>
                </th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]" onClick={() => requestSort('quantity')}>
                  <div className="flex items-center">Quantity <SortIndicator column="quantity" /></div>
                </th>
                <th className="py-3 px-4 text-left cursor-pointer hover:bg-[#e4c9a7]" onClick={() => requestSort('price_per_unit')}>
                  <div className="flex items-center">Unit Price <SortIndicator column="price_per_unit" /></div>
                </th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Last Restocked</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4c9a7]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-[#5d4037]">
                    Loading inventory...
                  </td>
                </tr>
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className={`${item.status === 'Out of Stock' ? 'bg-red-50' : item.quantity <= item.min_level ? 'bg-amber-50' : ''} hover:bg-[#f8e8d0]/30`}>
                    <td className="py-3 px-4 font-medium">{item.id}</td>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.category_name}</td>
                    <td className="py-3 px-4">{item.quantity} {item.unit}</td>
                    <td className="py-3 px-4 font-medium">{formatPrice(item.price_per_unit)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        statusColors[item.status]?.bg || 'bg-gray-100'
                      } ${
                        statusColors[item.status]?.text || 'text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{formatDate(item.last_restocked)}</td>
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
            <form className="p-6 space-y-6" onSubmit={handleSaveItem}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#5d4037] mb-1">
                    Item Name*
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                    defaultValue={currentItem?.name}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5d4037] mb-1">
                    Category ID*
                  </label>
                  <input
                    name="category_id"
                    type="text"
                    className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                    defaultValue={currentItem?.category_name}
                    required
                  />
                  
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#5d4037] mb-1">
                    Quantity*
                  </label>
                  <input
                    name="quantity"
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
                    name="unit"
                    type="text"
                    className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                    defaultValue={currentItem?.unit}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5d4037] mb-1">
                    Minimum Level*
                  </label>
                  <input
                    name="min_level"
                    type="number"
                    className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                    defaultValue={currentItem?.min_level}
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#5d4037] mb-1">
                    Unit Price (₱)*
                  </label>
                  <input
                    name="price_per_unit"
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                    defaultValue={currentItem?.price_per_unit}
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5d4037] mb-1">
                    Last Restocked Date*
                  </label>
                  <input
                    name="last_restocked"
                    type="date"
                    className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                    defaultValue={currentItem?.last_restocked?.slice(0, 10)}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-[#e4c9a7] rounded-md text-[#5d4037] hover:bg-[#f8e8d0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3e2723] text-white rounded-md hover:bg-[#5d4037]"
                >
                  {currentItem ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;