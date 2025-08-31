import React, { useState, useEffect } from 'react';
import { 
  FaToggleOn, 
  FaToggleOff, 
  FaBook, 
  FaUsers, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaChalkboard, 
  FaClipboardCheck,
  FaCog,
  FaInfoCircle,
  FaExclamationTriangle,
  FaBus,
  FaBoxes,
  FaEnvelope,
  FaSearch
} from 'react-icons/fa';

const ModuleActivation = () => {
  // Sample modules data - replace with API call in production
  const [modules, setModules] = useState([
    {
      id: 'attendance',
      name: 'Attendance Management',
      description: 'Track and manage student and staff attendance records.',
      icon: <FaClipboardCheck className="text-blue-500 text-2xl" />,
      enabled: true,
      required: true,
      dependencies: []
    },
    {
      id: 'academics',
      name: 'Academics',
      description: 'Manage courses, subjects, and academic activities.',
      icon: <FaBook className="text-green-500 text-2xl" />,
      enabled: true,
      required: true,
      dependencies: []
    },
    {
      id: 'examinations',
      name: 'Examinations',
      description: 'Handle exam schedules, grading, and report cards.',
      icon: <FaClipboardCheck className="text-purple-500 text-2xl" />,
      enabled: true,
      required: false,
      dependencies: ['academics']
    },
    {
      id: 'timetable',
      name: 'Class Timetable',
      description: 'Create and manage class schedules and timetables.',
      icon: <FaCalendarAlt className="text-yellow-500 text-2xl" />,
      enabled: true,
      required: false,
      dependencies: ['academics']
    },
    {
      id: 'finance',
      name: 'Finance',
      description: 'Manage fees, invoices, and financial transactions.',
      icon: <FaMoneyBillWave className="text-red-500 text-2xl" />,
      enabled: false,
      required: false,
      dependencies: []
    },
    {
      id: 'library',
      name: 'Library',
      description: 'Manage books, issues, and returns in the library.',
      icon: <FaBook className="text-indigo-500 text-2xl" />,
      enabled: false,
      required: false,
      dependencies: []
    },
    {
      id: 'hostel',
      name: 'Hostel Management',
      description: 'Manage hostel rooms, allocations, and maintenance.',
      icon: <FaUsers className="text-pink-500 text-2xl" />,
      enabled: false,
      required: false,
      dependencies: []
    },
    {
      id: 'transport',
      name: 'Transport',
      description: 'Manage vehicles, routes, and transportation schedules.',
      icon: <FaBus className="text-teal-500 text-2xl" />,
      enabled: false,
      required: false,
      dependencies: []
    },
    {
      id: 'inventory',
      name: 'Inventory',
      description: 'Track and manage school inventory and assets.',
      icon: <FaBoxes className="text-amber-500 text-2xl" />,
      enabled: true,
      required: false,
      dependencies: []
    },
    {
      id: 'reports',
      name: 'Reports & Analytics',
      description: 'Generate reports and view analytics dashboard.',
      icon: <FaChartLine className="text-cyan-500 text-2xl" />,
      enabled: true,
      required: false,
      dependencies: []
    },
    {
      id: 'communication',
      name: 'Communication',
      description: 'Send notifications, emails, and announcements.',
      icon: <FaEnvelope className="text-blue-400 text-2xl" />,
      enabled: true,
      required: true,
      dependencies: []
    },
    {
      id: 'settings',
      name: 'System Settings',
      description: 'Configure system preferences and settings.',
      icon: <FaCog className="text-gray-500 text-2xl" />,
      enabled: true,
      required: true,
      dependencies: []
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [showDependencyWarning, setShowDependencyWarning] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, inactive

  // Filter modules based on search and filter
  const filteredModules = modules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        module.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && module.enabled) || 
                         (filter === 'inactive' && !module.enabled);
    
    return matchesSearch && matchesFilter;
  });

  // Check if a module has all its dependencies met
  const areDependenciesMet = (module) => {
    if (!module.dependencies || module.dependencies.length === 0) return true;
    
    return module.dependencies.every(depId => {
      const depModule = modules.find(m => m.id === depId);
      return depModule && depModule.enabled;
    });
  };

  // Get list of modules that depend on a specific module
  const getDependentModules = (moduleId) => {
    return modules.filter(module => 
      module.dependencies && module.dependencies.includes(moduleId)
    );
  };

  // Toggle module status
  const toggleModule = async (moduleId) => {
    const moduleToToggle = modules.find(m => m.id === moduleId);
    if (!moduleToToggle) return;

    // Check if it's a required module
    if (moduleToToggle.required) {
      alert('This is a required module and cannot be disabled.');
      return;
    }

    // If disabling, check for dependent modules
    if (moduleToToggle.enabled) {
      const dependentModules = getDependentModules(moduleId).filter(m => m.enabled);
      
      if (dependentModules.length > 0) {
        const dependentNames = dependentModules.map(m => m.name).join(', ');
        const proceed = window.confirm(
          `The following modules depend on this module and will also be disabled: ${dependentNames}.\n\nDo you want to continue?`
        );
        
        if (!proceed) return;
        
        // Disable dependent modules
        const updatedModules = modules.map(module => {
          if (module.id === moduleId || dependentModules.some(m => m.id === module.id)) {
            return { ...module, enabled: false };
          }
          return module;
        });
        
        setModules(updatedModules);
        return;
      }
    } else {
      // If enabling, check if dependencies are met
      if (!areDependenciesMet(moduleToToggle)) {
        const dependencyNames = moduleToToggle.dependencies
          .map(depId => modules.find(m => m.id === depId)?.name || depId)
          .join(', ');
        
        setShowDependencyWarning({
          module: moduleToToggle.name,
          dependencies: dependencyNames
        });
        return;
      }
    }

    // Toggle the module
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, enabled: !module.enabled } : module
    ));
  };

  // Save changes to the server
  const saveChanges = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/modules', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ modules }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to save module settings');
      // }
      
      // Show success message
      alert('Module settings saved successfully!');
    } catch (error) {
      console.error('Error saving module settings:', error);
      alert('Failed to save module settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get module status badge
  const getStatusBadge = (module) => {
    if (module.required) {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
          Required
        </span>
      );
    }
    
    return module.enabled ? (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        Active
      </span>
    ) : (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
        Inactive
      </span>
    );
  };

  // Get module card class based on status
  const getModuleCardClass = (module) => {
    let baseClass = "p-4 rounded-lg border shadow-sm transition-all duration-200 ";
    
    if (module.required) {
      return baseClass + "border-purple-200 bg-purple-50";
    }
    
    return module.enabled 
      ? baseClass + "border-green-200 bg-green-50 hover:bg-green-100"
      : baseClass + "border-gray-200 bg-white hover:bg-gray-50";
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Module Activation</h1>
              <p className="mt-1 text-sm text-gray-500">
                Enable or disable system modules as per your institution's needs
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={saveChanges}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
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
                    placeholder="Search modules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <select
                  className="block pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Modules</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModules.length > 0 ? (
              filteredModules.map((module) => (
                <div 
                  key={module.id} 
                  className={getModuleCardClass(module)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {module.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-medium text-gray-900 truncate">
                            {module.name}
                          </h3>
                          {getStatusBadge(module)}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {module.description}
                        </p>
                        {module.dependencies && module.dependencies.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 flex items-center">
                              <FaInfoCircle className="mr-1" />
                              Depends on: {module.dependencies.map(depId => {
                                const dep = modules.find(m => m.id === depId);
                                return dep ? dep.name : depId;
                              }).join(', ')}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {!module.required && (
                      <button
                        onClick={() => toggleModule(module.id)}
                        disabled={!areDependenciesMet(module) && !module.enabled}
                        className={`ml-2 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                          module.enabled ? 'bg-green-500' : 'bg-gray-200'
                        } ${!areDependenciesMet(module) && !module.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={!areDependenciesMet(module) && !module.enabled 
                          ? `Enable ${module.dependencies.filter(depId => !modules.find(m => m.id === depId)?.enabled).length} more required module(s) first` 
                          : ''}
                      >
                        <span
                          className={`${
                            module.enabled ? 'translate-x-5' : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        >
                          <span
                            className={`${
                              module.enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                            aria-hidden="true"
                          >
                            <FaToggleOff className="h-3 w-3 text-gray-400" />
                          </span>
                          <span
                            className={`${
                              module.enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                            aria-hidden="true"
                          >
                            <FaToggleOn className="h-3 w-3 text-green-500" />
                          </span>
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <FaExclamationTriangle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No modules found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
          
          {/* Dependency Warning Modal */}
          {showDependencyWarning && (
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
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                      <FaExclamationTriangle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Module Dependencies Required
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          To enable <span className="font-medium">{showDependencyWarning.module}</span>, 
                          you need to enable the following modules first:
                        </p>
                        <p className="mt-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-md text-sm">
                          {showDependencyWarning.dependencies}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                      onClick={() => setShowDependencyWarning(null)}
                    >
                      I understand
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaInfoCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">About Module Management</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    • <span className="font-medium">Required modules</span> are essential for the system and cannot be disabled.
                  </p>
                  <p className="mt-1">
                    • Some modules depend on others. You'll need to enable required dependencies first.
                  </p>
                  <p className="mt-1">
                    • Disabling a module will also disable all modules that depend on it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleActivation;
