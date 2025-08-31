import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaEdit, FaSearch, FaTimes, FaInfoCircle } from 'react-icons/fa';

const FeeTypeForm = () => {
  // Mock data - replace with API calls
  const [feeTypes, setFeeTypes] = useState([
    { id: 1, name: 'Tuition Fee', code: 'TUI', description: 'Regular tuition fee for academic sessions', isRecurring: true, taxApplicable: true },
    { id: 2, name: 'Examination Fee', code: 'EXAM', description: 'Fee for term and annual examinations', isRecurring: false, taxApplicable: false },
    { id: 3, name: 'Library Fee', code: 'LIB', description: 'Annual library membership fee', isRecurring: true, taxApplicable: true },
  ]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFeeType, setCurrentFeeType] = useState({
    id: null,
    name: '',
    code: '',
    description: '',
    isRecurring: false,
    taxApplicable: false
  });
  const [errors, setErrors] = useState({});

  // Filter fee types based on search term
  const filteredFeeTypes = feeTypes.filter(feeType => 
    feeType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feeType.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feeType.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentFeeType.name.trim()) {
      newErrors.name = 'Fee type name is required';
    } else if (currentFeeType.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    if (!currentFeeType.code.trim()) {
      newErrors.code = 'Fee code is required';
    } else if (!/^[A-Z0-9]{2,6}$/.test(currentFeeType.code)) {
      newErrors.code = 'Code must be 2-6 uppercase alphanumeric characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentFeeType({
      ...currentFeeType,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleAddNew = () => {
    setCurrentFeeType({
      id: null,
      name: '',
      code: '',
      description: '',
      isRecurring: false,
      taxApplicable: false
    });
    setErrors({});
    setIsFormOpen(true);
  };

  const handleEdit = (feeType) => {
    setCurrentFeeType({ ...feeType });
    setErrors({});
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (currentFeeType.id) {
      // Update existing fee type
      setFeeTypes(feeTypes.map(ft => 
        ft.id === currentFeeType.id ? { ...currentFeeType } : ft
      ));
    } else {
      // Add new fee type
      const newFeeType = {
        ...currentFeeType,
        id: Date.now() // Generate temporary ID
      };
      setFeeTypes([...feeTypes, newFeeType]);
    }
    
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this fee type? This action cannot be undone.')) {
      setFeeTypes(feeTypes.filter(ft => ft.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Fee Types</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage different types of fees that can be assigned to students
              </p>
            </div>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaPlus className="mr-2" /> Add Fee Type
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search fee types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
          
          {/* Fee Types Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFeeTypes.length > 0 ? (
                  filteredFeeTypes.map((feeType) => (
                    <tr key={feeType.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {feeType.code}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {feeType.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {feeType.description || 'No description'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${feeType.isRecurring ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {feeType.isRecurring ? 'Recurring' : 'One-time'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${feeType.taxApplicable ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                          {feeType.taxApplicable ? 'Taxable' : 'Non-taxable'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(feeType)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(feeType.id)}
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
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <FaInfoCircle className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No fee types found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {searchTerm 
                          ? 'No fee types match your search.' 
                          : 'Get started by creating a new fee type.'}
                      </p>
                      {!searchTerm && (
                        <div className="mt-6">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={handleAddNew}
                          >
                            <FaPlus className="-ml-1 mr-2 h-4 w-4" />
                            New Fee Type
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Fee Type Modal */}
      {isFormOpen && (
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
                    {currentFeeType.id ? 'Edit Fee Type' : 'Add New Fee Type'}
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Fee Type Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className={`mt-1 block w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                          value={currentFeeType.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Tuition Fee"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                          Fee Code <span className="text-red-500">*</span>
                          <span className="ml-1 text-xs text-gray-500">(2-6 uppercase letters/numbers)</span>
                        </label>
                        <input
                          type="text"
                          id="code"
                          name="code"
                          className={`mt-1 block w-full border ${errors.code ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm uppercase`}
                          value={currentFeeType.code}
                          onChange={handleInputChange}
                          placeholder="e.g. TUI"
                          maxLength="6"
                        />
                        {errors.code ? (
                          <p className="mt-1 text-sm text-red-600">{errors.code}</p>
                        ) : (
                          <p className="mt-1 text-xs text-gray-500">
                            This code will be used as an identifier in reports and exports.
                          </p>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows="3"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={currentFeeType.description}
                          onChange={handleInputChange}
                          placeholder="Brief description of this fee type"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="isRecurring"
                              name="isRecurring"
                              type="checkbox"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              checked={currentFeeType.isRecurring}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="isRecurring" className="font-medium text-gray-700">
                              Recurring Fee
                            </label>
                            <p className="text-xs text-gray-500">
                              Check if this fee recurs (e.g., monthly, termly)
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="taxApplicable"
                              name="taxApplicable"
                              type="checkbox"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              checked={currentFeeType.taxApplicable}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="taxApplicable" className="font-medium text-gray-700">
                              Tax Applicable
                            </label>
                            <p className="text-xs text-gray-500">
                              Check if tax is applicable to this fee
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                        >
                          <FaSave className="mr-2" />
                          {currentFeeType.id ? 'Update Fee Type' : 'Save Fee Type'}
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => setIsFormOpen(false)}
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

export default FeeTypeForm;
