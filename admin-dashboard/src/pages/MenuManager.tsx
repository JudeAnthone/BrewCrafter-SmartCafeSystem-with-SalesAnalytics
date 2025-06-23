import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Edit, Trash2, X } from 'lucide-react';

interface MenuItem {
  id: string;
  product_name: string;
  product_price: number;
  category_id: number; 
  product_description: string;
  image_url?: string;
  is_popular: boolean;
  is_available: boolean;
  ingredients?: string[];
}

const categories = [
  { name: 'Coffee', value: 1 },
  { name: 'Frappe', value: 2 },
  { name: 'Smoothie', value: 3 }
];

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | number>('All');
  const [showForm, setShowForm] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null);

  // Fetch menu items from backend
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setMenuItems(res.data);
  };

  // Filter menu items
  const filteredItems = menuItems.filter(item => {
    const matchesSearch =
      searchTerm === '' ||
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product_description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || item.category_id === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Handlers
  const handleEditItem = (item: MenuItem) => {
    setCurrentItem(item);
    setShowForm(true);
  };

  const handleNewItem = () => {
    setCurrentItem(null);
    setShowForm(true);
  };

  const handleSaveItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // If editing, append the id for PUT
    let url = 'http://localhost:5000/api/products';
    let method: 'post' | 'put' = 'post';
    if (currentItem) {
      url += `/${currentItem.id}`;
      method = 'put';
    }

    // Ingredients: convert to JSON string for backend
    const ingredients = formData.get('ingredients') as string;
    formData.set('ingredients', JSON.stringify(ingredients.split(',').map(i => i.trim())));

    try {
      await axios({
        method,
        url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowForm(false);
      fetchMenuItems();
    } catch (err) {
      alert('Failed to save item.');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setMenuItems(menuItems.filter(item => item.id !== id));  
    } catch (err) {
      alert('Failed to delete item.');
    }
  };

  const formatPrice = (price: number) => `₱${price.toLocaleString()}`;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#3e2723]">Menu Manager</h1>
        <button
          onClick={handleNewItem}
          className="bg-[#3e2723] text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium hover:bg-[#5d4037] transition-colors"
        >
          <PlusCircle size={16} className="mr-2" />
          Add New Item
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6">
        <button
          key="All"
          onClick={() => setCategoryFilter('All')}
          className={`flex items-center px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${
            categoryFilter === 'All'
              ? 'bg-[#3e2723] text-white'
              : 'bg-white border border-[#e4c9a7] text-[#5d4037] hover:bg-[#f8e8d0]'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setCategoryFilter(category.value)}
            className={`flex items-center px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${
              categoryFilter === category.value
                ? 'bg-[#3e2723] text-white'
                : 'bg-white border border-[#e4c9a7] text-[#5d4037] hover:bg-[#f8e8d0]'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full pl-4 pr-4 py-3 border border-[#e4c9a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-[#e4c9a7] overflow-hidden">
              <div className="h-40 bg-[#f8e8d0] relative">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PlusCircle size={40} className="text-[#b5a397]" />
                  </div>
                )}
                {item.is_popular && (
                  <div className="absolute top-2 left-2 bg-[#3e2723] text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
                {!item.is_available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#3e2723]">{item.product_name}</h3>
                  <span className="font-bold text-[#3e2723]">{formatPrice(item.product_price)}</span>
                </div>
                <p className="text-sm text-[#5d4037] mb-3 line-clamp-2">{item.product_description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#b5a397]">
                    {categories.find(cat => cat.value === item.category_id)?.name || item.category_id}
                  </span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEditItem(item)}
                      className="p-1.5 bg-[#f8e8d0] text-[#3e2723] rounded-md hover:bg-[#e4c9a7]"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 bg-[#f8e8d0] text-red-600 rounded-md hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center bg-white rounded-lg border border-[#e4c9a7]">
            <p className="text-[#5d4037] mb-2">No menu items found matching your search.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('All');
              }}
              className="text-[#3e2723] underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Item Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-[#e4c9a7]">
              <h2 className="text-xl font-bold text-[#3e2723]">
                {currentItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-[#5d4037] hover:text-[#3e2723]"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-6" onSubmit={handleSaveItem}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5d4037] mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="product_name"
                      className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                      defaultValue={currentItem?.product_name}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        Price (₱)
                      </label>
                      <input
                        type="number"
                        name="product_price"
                        className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                        defaultValue={currentItem?.product_price}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        Category
                      </label>
                      <select
                        name="category_id"
                        className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                        defaultValue={currentItem?.category_id}
                        required
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5d4037] mb-1">
                      Description
                    </label>
                    <textarea
                      name="product_description"
                      className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                      rows={3}
                      defaultValue={currentItem?.product_description}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_popular"
                      id="is_popular"
                      className="rounded border-[#e4c9a7]"
                      defaultChecked={currentItem?.is_popular}
                    />
                    <label htmlFor="is_popular" className="ml-2 text-[#5d4037]">
                      Mark as Popular
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_available"
                      id="is_available"
                      className="rounded border-[#e4c9a7]"
                      defaultChecked={currentItem?.is_available ?? true}
                    />
                    <label htmlFor="is_available" className="ml-2 text-[#5d4037]">
                      Available for ordering
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5d4037] mb-1">
                    Ingredients (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="ingredients"
                    className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                    defaultValue={currentItem?.ingredients?.join(', ')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5d4037] mb-1">
                    Product Image URL
                  </label>
                  <input
                    type="text"
                    name="image_url"
                    className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                    defaultValue={currentItem?.image_url}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5d4037] mb-1">
                    Product Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                  />
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
        </div>
      )}
    </div>
  );
};

export default MenuManager;