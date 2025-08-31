import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaEdit, FaSearch, FaMoneyBillWave, FaFileExport, FaPrint } from 'react-icons/fa';

const FeeStructureSetup = () => {
  // Mock data - replace with API calls
  const classes = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const terms = ['Term 1', 'Term 2', 'Term 3', 'Annual'];
  const feeCategories = ['Tuition', 'Examination', 'Library', 'Sports', 'Transportation', 'Lab', 'Activity', 'Other'];
  
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(terms[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [feeStructures, setFeeStructures] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFee, setCurrentFee] = useState({
    id: null,
    category: '',
    amount: '',
    dueDate: '',
    description: ''
  });

  // Mock data for fee structures
  const mockFeeStructures = {
    '1': {
      'Term 1': [
        { id: 1, category: 'Tuition', amount: 5000, dueDate: '2023-04-15', description: 'Term 1 Tuition Fee' },
        { id: 2, category: 'Examination', amount: 1000, dueDate: '2023-05-20', description: 'Term 1 Exam Fee' }
      ],
      'Term 2': [
        { id: 3, category: 'Tuition', amount: 5000, dueDate: '2023-08-15', description: 'Term 2 Tuition Fee' }
      ]
    },
    '2': {
      'Term 1': [
        { id: 4, category: 'Tuition', amount: 5500, dueDate: '2023-04-15', description: 'Term 1 Tuition Fee' },
        { id: 5, category: 'Sports', amount: 800, dueDate: '2023-05-10', description: 'Sports Fee' }
      ]
    }
  };

  // Load fee structure when class or term changes
  useEffect(() => {
    if (selectedClass) {
      const classFees = mockFeeStructures[selectedClass] || {};
      const termFees = classFees[selectedTerm] || [];
      setFeeStructures(termFees);
    } else {
      setFeeStructures([]);
    }
  }, [selectedClass, selectedTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFee({
      ...currentFee,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    });
  };

  const handleAddFee = () => {
    setCurrentFee({
      id: null,
      category: '',
      amount: '',
      dueDate: '',
      description: ''
    });
    setIsEditing(true);
  };

  const handleEditFee = (fee) => {
    setCurrentFee({ ...fee });
    setIsEditing(true);
  };

  const handleSaveFee = (e) => {
    e.preventDefault();
    
    if (!selectedClass || !selectedTerm) return;
    
    const updatedFees = [...feeStructures];
    
    if (currentFee.id) {
      // Update existing fee
      const index = updatedFees.findIndex(f => f.id === currentFee.id);
      if (index !== -1) {
        updatedFees[index] = { ...currentFee };
      }
    } else {
      // Add new fee
      const newFee = {
        ...currentFee,
        id: Date.now() // Generate a temporary ID
      };
      updatedFees.push(newFee);
    }
    
    // In a real app, you would save to your API here
    setFeeStructures(updatedFees);
    
    // Update mock data
    if (!mockFeeStructures[selectedClass]) {
      mockFeeStructures[selectedClass] = {};
    }
    mockFeeStructures[selectedClass][selectedTerm] = updatedFees;
    
    // Reset form
    setIsEditing(false);
  };

  const handleDeleteFee = (id) => {
    if (window.confirm('Are you sure you want to delete this fee item?')) {
      const updatedFees = feeStructures.filter(fee => fee.id !== id);
      setFeeStructures(updatedFees);
      
      // Update mock data
      if (mockFeeStructures[selectedClass]) {
        mockFeeStructures[selectedClass][selectedTerm] = updatedFees;
      }
    }
  };

  const calculateTotal = () => {
    return feeStructures.reduce((sum, fee) => sum + (parseFloat(fee.amount) || 0), 0);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    // TODO: Implement export to Excel/PDF
    console.log('Exporting fee structure...');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Fee Structure Setup</h1>
            <div className="flex space-x-2">
              <button 
                onClick={handlePrint}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaPrint className="mr-2" /> Print
              </button>
              <button 
                onClick={handleExport}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaFileExport className="mr-2" /> Export
              </button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
              <select
                id="class"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="term" className="block text-sm font-medium text-gray-700">Term</label>
              <select
                id="term"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                disabled={!selectedClass}
              >
                {terms.map((term) => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handleAddFee}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={!selectedClass}
              >
                <FaPlus className="mr-2" /> Add Fee Item
              </button>
            </div>
          </div>
          
          {/* Fee Structure Table */}
          {selectedClass ? (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Fee Structure: Class {selectedClass} - {selectedTerm}
                </h2>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search fee items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount (₹)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {feeStructures
                      .filter(fee => 
                        fee.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        fee.description.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((fee) => (
                        <tr key={fee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {fee.category}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {fee.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            ₹{fee.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(fee.dueDate).toLocaleDateString('en-IN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEditFee(fee)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteFee(fee.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    
                    {/* Total Row */}
                    {feeStructures.length > 0 && (
                      <tr className="bg-gray-50">
                        <td colSpan="2" className="px-6 py-4 text-sm font-medium text-gray-900">
                          Total
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                          ₹{calculateTotal().toLocaleString('en-IN')}
                        </td>
                        <td colSpan="2"></td>
                      </tr>
                    )}
                  </tbody>
                </table>
                
                {feeStructures.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FaMoneyBillWave className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No fee items found</h3>
                    <p className="mt-1 text-sm text-gray-500 mb-4">
                      {searchTerm 
                        ? 'No fee items match your search.' 
                        : `No fee items have been added for Class ${selectedClass} - ${selectedTerm}.`}
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handleAddFee}
                    >
                      <FaPlus className="mr-2" /> Add Fee Item
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FaMoneyBillWave className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No class selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a class to view or edit the fee structure.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Add/Edit Fee Modal */}
      {isEditing && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {currentFee.id ? 'Edit Fee Item' : 'Add New Fee Item'}
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleSaveFee}>
                      <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="category"
                          name="category"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={currentFee.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Category</option>
                          {feeCategories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="description"
                          name="description"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={currentFee.description}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount (₹) <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">₹</span>
                            </div>
                            <input
                              type="number"
                              id="amount"
                              name="amount"
                              min="0"
                              step="0.01"
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              value={currentFee.amount}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                            Due Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentFee.dueDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                        >
                          <FaSave className="mr-2" /> Save
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
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

export default FeeStructureSetup;
