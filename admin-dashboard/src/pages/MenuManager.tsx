import React, { useState } from 'react';
import { Search, Filter, PlusCircle, Edit, Trash2, Coffee, CupSoda, Cookie, Eye, X } from 'lucide-react';

// Define TypeScript interfaces for menu items
interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'Coffee' | 'Tea' | 'Cold Drinks' | 'Pastries' | 'Add-ons' | 'Custom Drinks';
  description: string;
  image?: string;
  isPopular: boolean;
  isAvailable: boolean;
  ingredients?: string[];
  tags?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

// Mock data for menu items
const mockMenuItems: MenuItem[] = [
  {
    id: '001',
    name: 'Espresso',
    price: 120,
    category: 'Coffee',
    description: 'Rich and aromatic coffee shot',
    isPopular: true,
    isAvailable: true,
    ingredients: ['Coffee beans', 'Water'],
    tags: ['Hot', 'Caffeine', 'Classic']
  },
  {
    id: '002',
    name: 'Cappuccino',
    price: 150,
    category: 'Coffee',
    description: 'Espresso with steamed milk and foam',
    isPopular: true,
    isAvailable: true,
    ingredients: ['Coffee beans', 'Milk', 'Water'],
    tags: ['Hot', 'Caffeine', 'Milk']
  },
  {
    id: '003',
    name: 'Matcha Latte',
    price: 160,
    category: 'Tea',
    description: 'Premium matcha with steamed milk',
    isPopular: true,
    isAvailable: true,
    ingredients: ['Matcha powder', 'Milk', 'Water'],
    tags: ['Hot', 'Tea']
  },
  {
    id: '004',
    name: 'Iced Americano',
    price: 135,
    category: 'Cold Drinks',
    description: 'Chilled espresso with cold water',
    isPopular: false,
    isAvailable: true,
    ingredients: ['Coffee beans', 'Water', 'Ice'],
    tags: ['Cold', 'Caffeine', 'Classic']
  },
  {
    id: '005',
    name: 'Chocolate Croissant',
    price: 95,
    category: 'Pastries',
    description: 'Buttery croissant with chocolate filling',
    isPopular: true,
    isAvailable: true,
    ingredients: ['Flour', 'Butter', 'Chocolate', 'Sugar'],
    tags: ['Breakfast', 'Sweet']
  },
  {
    id: '006',
    name: 'Extra Espresso Shot',
    price: 40,
    category: 'Add-ons',
    description: 'Extra shot of espresso',
    isPopular: false,
    isAvailable: true,
    ingredients: ['Coffee beans', 'Water'],
    tags: ['Add-on', 'Caffeine']
  },
  {
    id: '007',
    name: 'Custom Caramel Frappuccino',
    price: 180,
    category: 'Custom Drinks',
    description: 'Personalized caramel blended ice drink',
    isPopular: false,
    isAvailable: true,
    ingredients: ['Coffee', 'Milk', 'Caramel syrup', 'Ice', 'Whipped cream'],
    tags: ['Cold', 'Sweet', 'Custom']
  }
];

// Categories and their icons
const categories = [
  { name: 'All', count: 0, icon: <Coffee size={16} /> },
  { name: 'Coffee', count: 0, icon: <Coffee size={16} /> },
  { name: 'Tea', count: 0, icon: <CupSoda size={16} /> },
  { name: 'Cold Drinks', count: 0, icon: <CupSoda size={16} /> },
  { name: 'Pastries', count: 0, icon: <Cookie size={16} /> },
  { name: 'Add-ons', count: 0, icon: <PlusCircle size={16} /> },
  { name: 'Custom Drinks', count: 0, icon: <Coffee size={16} /> }
];

const MenuManager = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null);

  // Count items by category
  const categoryCounts = categories.map(category => {
    return {
      ...category,
      count: category.name === 'All' 
        ? mockMenuItems.length 
        : mockMenuItems.filter(item => item.category === category.name).length
    };
  });

  // Filter menu items
  const filteredItems = mockMenuItems.filter(item => {
    // Search filter
    const matchesSearch = 
      searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    // Category filter
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Handler for edit item
  const handleEditItem = (item: MenuItem) => {
    setCurrentItem(item);
    setShowForm(true);
  };

  // Handler for new item
  const handleNewItem = () => {
    setCurrentItem(null);
    setShowForm(true);
  };

  // For simplicity, these are just placeholder functions in the UI mockup
  const handleSaveItem = () => {
    // Save logic would go here
    setShowForm(false);
  };

  const handleDeleteItem = (id: string) => {
    // Delete logic would go here
    console.log("Delete item:", id);
  };

  // Format price to Philippine Peso
  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString()}`;
  };

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
        {categoryCounts.map((category) => (
          <button
            key={category.name}
            onClick={() => setCategoryFilter(category.name)}
            className={`flex items-center px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${
              categoryFilter === category.name
                ? 'bg-[#3e2723] text-white'
                : 'bg-white border border-[#e4c9a7] text-[#5d4037] hover:bg-[#f8e8d0]'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
            <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-opacity-20 bg-white text-current">
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b5a397]" />
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full pl-10 pr-4 py-3 border border-[#e4c9a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20 bg-white"
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
              {/* Item Image or Placeholder */}
              <div className="h-40 bg-[#f8e8d0] relative">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {item.category === 'Coffee' && <Coffee size={40} className="text-[#b5a397]" />}
                    {item.category === 'Tea' && <CupSoda size={40} className="text-[#b5a397]" />}
                    {item.category === 'Cold Drinks' && <CupSoda size={40} className="text-[#b5a397]" />}
                    {item.category === 'Pastries' && <Cookie size={40} className="text-[#b5a397]" />}
                    {(item.category === 'Add-ons' || item.category === 'Custom Drinks') && <Coffee size={40} className="text-[#b5a397]" />}
                  </div>
                )}
                {item.isPopular && (
                  <div className="absolute top-2 left-2 bg-[#3e2723] text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
                {!item.isAvailable && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
              
              {/* Item Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#3e2723]">{item.name}</h3>
                  <span className="font-bold text-[#3e2723]">{formatPrice(item.price)}</span>
                </div>
                
                <p className="text-sm text-[#5d4037] mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags && item.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-[#f8e8d0] text-[#5d4037] px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#b5a397]">{item.category}</span>
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
              <form className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5d4037] mb-1">
                      Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                      defaultValue={currentItem?.name}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        Price (₱)
                      </label>
                      <input 
                        type="number" 
                        className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                        defaultValue={currentItem?.price}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5d4037] mb-1">
                        Category
                      </label>
                      <select 
                        className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                        defaultValue={currentItem?.category}
                      >
                        <option value="Coffee">Coffee</option>
                        <option value="Tea">Tea</option>
                        <option value="Cold Drinks">Cold Drinks</option>
                        <option value="Pastries">Pastries</option>
                        <option value="Add-ons">Add-ons</option>
                        <option value="Custom Drinks">Custom Drinks</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#5d4037] mb-1">
                      Description
                    </label>
                    <textarea 
                      className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                      rows={3}
                      defaultValue={currentItem?.description}
                    ></textarea>
                  </div>
                </div>
                
                {/* Options */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="isPopular" 
                      className="rounded border-[#e4c9a7]"
                      defaultChecked={currentItem?.isPopular}
                    />
                    <label htmlFor="isPopular" className="ml-2 text-[#5d4037]">
                      Mark as Popular
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="isAvailable" 
                      className="rounded border-[#e4c9a7]"
                      defaultChecked={currentItem?.isAvailable ?? true}
                    />
                    <label htmlFor="isAvailable" className="ml-2 text-[#5d4037]">
                      Available for ordering
                    </label>
                  </div>
                </div>
                
                {/* Ingredients */}
                <div>
                  <label className="block text-sm font-medium text-[#5d4037] mb-1">
                    Ingredients (comma-separated)
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                    defaultValue={currentItem?.ingredients?.join(', ')}
                  />
                </div>
                
                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-[#5d4037] mb-1">
                    Tags (comma-separated)
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-[#e4c9a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e2723]/20"
                    defaultValue={currentItem?.tags?.join(', ')}
                  />
                </div>
                
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#5d4037] mb-1">
                    Product Image
                  </label>
                  <div className="flex items-center justify-center border-2 border-dashed border-[#e4c9a7] rounded-md p-6 bg-[#f8e8d0]">
                    <div className="space-y-1 text-center">
                      <div className="flex justify-center">
                        <PlusCircle size={24} className="text-[#5d4037]" />
                      </div>
                      <div className="text-sm text-[#5d4037]">
                        <span className="font-medium text-[#3e2723] hover:underline">Upload an image</span> or drag and drop
                      </div>
                      <p className="text-xs text-[#b5a397]">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </div>
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

export default MenuManager;