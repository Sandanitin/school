import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSearch, FaBox, FaBoxes, FaExclamationTriangle, FaFilter } from 'react-icons/fa';

const InventoryManagement = () => {
  // Mock data for inventory items
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Textbooks - Mathematics',
      category: 'Books',
      quantity: 50,
      minQuantity: 10,
      unit: 'pcs',
      location: 'Library - Shelf A1',
      lastUpdated: '2024-08-20',
      status: 'In Stock' // 'In Stock', 'Low Stock', 'Out of Stock'
    },
    {
      id: 2,
      name: 'Lab Microscopes',
      category: 'Lab Equipment',
      quantity: 5,
      minQuantity: 3,
      unit: 'pcs',
      location: 'Science Lab 1',
      lastUpdated: '2024-08-15',
      status: 'In Stock'
    },
    {
      id: 3,
      name: 'Whiteboard Markers',
      category: 'Stationery',
      quantity: 2,
      minQuantity: 10,
      unit: 'packs',
      location: 'Store Room 2',
      lastUpdated: '2024-08-10',
      status: 'Low Stock'
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: '',
    category: '',
    quantity: '',
    minQuantity: '',
    unit: 'pcs',
    location: '',
    status: 'In Stock'
  });

  // Constants
  const categories = ['All', 'Books', 'Stationery', 'Lab Equipment', 'Furniture', 'Electronics', 'Sports', 'Other'];
  const units = ['pcs', 'boxes', 'sets', 'packs', 'dozens', 'kg', 'liters'];
  const statuses = ['In Stock', 'Low Stock', 'Out of Stock'];

  // Get unique categories for filter dropdown
  const uniqueCategories = ['All', ...new Set(inventory.map(item => item.category))];

  // Filter inventory based on search term and filters
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate inventory summary
  const inventorySummary = {
    totalItems: inventory.length,
    lowStock: inventory.filter(item => item.status === 'Low Stock').length,
    outOfStock: inventory.filter(item => item.status === 'Out of Stock').length
  };

  // Handlers
  const handleAddNew = () => {
    setCurrentItem({
      id: null,
      name: '',
      category: '',
      quantity: '',
      minQuantity: '',
      unit: 'pcs',
      location: '',
      status: 'In Stock'
    });
    setIsFormOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentItem({...item});
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentItem.name || !currentItem.category || currentItem.quantity === '' || !currentItem.location) {
      alert('Please fill in all required fields');
      return;
    }

    const quantity = parseInt(currentItem.quantity);
    const minQuantity = parseInt(currentItem.minQuantity || '0');
    
    // Determine status based on quantity
    let status = 'In Stock';
    if (quantity === 0) {
      status = 'Out of Stock';
    } else if (quantity <= minQuantity) {
      status = 'Low Stock';
    }

    const itemWithStatus = {
      ...currentItem,
      quantity,
      minQuantity,
      status,
      lastUpdated: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    };

    if (currentItem.id) {
      // Update existing
      setInventory(inventory.map(item => 
        item.id === currentItem.id ? itemWithStatus : item
      ));
    } else {
      // Add new
      setInventory([{
        ...itemWithStatus,
        id: Date.now()
      }, ...inventory]);
    }
    
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  const handleQuantityChange = (id, change) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        let status = item.status;
        
        if (newQuantity === 0) {
          status = 'Out of Stock';
        } else if (newQuantity <= item.minQuantity) {
          status = 'Low Stock';
        } else {
          status = 'In Stock';
        }
        
        return {
          ...item,
          quantity: newQuantity,
          status,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  // Get status badge style
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Track and manage school inventory items
              </p>
            </div>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaPlus className="mr-2" /> Add New Item
            </button>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <FaBox className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Items</p>
                  <p className="text-2xl font-semibold text-gray-900">{inventorySummary.totalItems}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-yellow-100 rounded-lg p-4 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                  <FaExclamationTriangle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Low Stock</p>
                  <p className="text-2xl font-semibold text-yellow-700">{inventorySummary.lowStock}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-red-100 rounded-lg p-4 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                  <FaBoxes className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                  <p className="text-2xl font-semibold text-red-700">{inventorySummary.outOfStock}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search items or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaFilter className="text-gray-400" />
                  </div>
                  <select
                    className="appearance-none block pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {uniqueCategories
                      .filter(cat => cat !== 'All')
                      .map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))
                    }
                  </select>
                </div>
                
                <select
                  className="block pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Inventory Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                            disabled={item.quantity <= 0}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        {item.minQuantity > 0 && (
                          <div className="text-xs text-gray-500 mt-1">Min: {item.minQuantity}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No inventory items found. Try adjusting your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Item Form Modal */}
      {isFormOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {currentItem.id ? 'Edit' : 'Add New'} Inventory Item
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Item Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentItem.name}
                            onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category *
                          </label>
                          <select
                            id="category"
                            name="category"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentItem.category}
                            onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}
                            required
                          >
                            <option value="">Select Category</option>
                            {categories
                              .filter(cat => cat !== 'All')
                              .map(category => (
                                <option key={category} value={category}>{category}</option>
                              ))
                            }
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                            Unit of Measurement
                          </label>
                          <select
                            id="unit"
                            name="unit"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentItem.unit}
                            onChange={(e) => setCurrentItem({...currentItem, unit: e.target.value})}
                          >
                            {units.map(unit => (
                              <option key={unit} value={unit}>{unit}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            Current Quantity *
                          </label>
                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="0"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentItem.quantity}
                            onChange={(e) => setCurrentItem({...currentItem, quantity: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="minQuantity" className="block text-sm font-medium text-gray-700">
                            Minimum Quantity
                          </label>
                          <input
                            type="number"
                            id="minQuantity"
                            name="minQuantity"
                            min="0"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentItem.minQuantity}
                            onChange={(e) => setCurrentItem({...currentItem, minQuantity: e.target.value})}
                            placeholder="Optional"
                          />
                        </div>
                        
                        <div className="col-span-2">
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location *
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentItem.location}
                            onChange={(e) => setCurrentItem({...currentItem, location: e.target.value})}
                            placeholder="e.g., Room 101, Shelf A"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-1 sm:text-sm"
                          onClick={() => setIsFormOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-2 sm:text-sm"
                        >
                          {currentItem.id ? 'Update' : 'Add'} Item
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;