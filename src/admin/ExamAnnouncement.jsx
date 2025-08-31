import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSearch, FaBell, FaCalendarAlt, FaClock, FaInfoCircle } from 'react-icons/fa';
import { format } from 'date-fns';

const ExamAnnouncement = () => {
  // Mock data - replace with API calls
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Mid-Term Examinations 2024',
      description: 'Mid-term examinations for all classes will be conducted from 15th to 25th October 2024.',
      examType: 'Mid-Term',
      startDate: '2024-10-15',
      endDate: '2024-10-25',
      classes: ['9', '10', '11', '12'],
      isPublished: true,
      createdAt: '2024-08-20T10:00:00Z'
    },
    {
      id: 2,
      title: 'Annual Practical Exams',
      description: 'Annual practical examinations for Science stream will begin from 5th March 2025.',
      examType: 'Annual',
      startDate: '2025-03-05',
      endDate: '2025-03-15',
      classes: ['11', '12'],
      isPublished: false,
      createdAt: '2024-08-22T14:30:00Z'
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentAnnouncement, setCurrentAnnouncement] = useState({
    id: null,
    title: '',
    description: '',
    examType: 'Mid-Term',
    startDate: '',
    endDate: '',
    classes: [],
    isPublished: false
  });
  const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState('all');

  const examTypes = ['Mid-Term', 'Final', 'Unit Test', 'Pre-Board', 'Annual', 'Other'];
  const allClasses = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  // Filter announcements based on search term and status filter
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
      (filter === 'published' && announcement.isPublished) ||
      (filter === 'draft' && !announcement.isPublished);
    
    return matchesSearch && matchesFilter;
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentAnnouncement.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!currentAnnouncement.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!currentAnnouncement.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!currentAnnouncement.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (currentAnnouncement.startDate && currentAnnouncement.endDate < currentAnnouncement.startDate) {
      newErrors.endDate = 'End date cannot be before start date';
    }
    
    if (currentAnnouncement.classes.length === 0) {
      newErrors.classes = 'At least one class must be selected';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setCurrentAnnouncement({
      ...currentAnnouncement,
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

  const handleClassToggle = (className) => {
    const newClasses = [...currentAnnouncement.classes];
    const classIndex = newClasses.indexOf(className);
    
    if (classIndex === -1) {
      newClasses.push(className);
    } else {
      newClasses.splice(classIndex, 1);
    }
    
    setCurrentAnnouncement({
      ...currentAnnouncement,
      classes: newClasses
    });
    
    if (errors.classes) {
      setErrors({
        ...errors,
        classes: null
      });
    }
  };

  const handleAddNew = () => {
    setCurrentAnnouncement({
      id: null,
      title: '',
      description: '',
      examType: 'Mid-Term',
      startDate: '',
      endDate: '',
      classes: [],
      isPublished: false
    });
    setErrors({});
    setIsFormOpen(true);
  };

  const handleEdit = (announcement) => {
    setCurrentAnnouncement({ ...announcement });
    setErrors({});
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const now = new Date().toISOString();
    
    if (currentAnnouncement.id) {
      // Update existing announcement
      setAnnouncements(announcements.map(a => 
        a.id === currentAnnouncement.id ? { ...currentAnnouncement, updatedAt: now } : a
      ));
    } else {
      // Add new announcement
      const newAnnouncement = {
        ...currentAnnouncement,
        id: Date.now(),
        createdAt: now
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }
    
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement? This action cannot be undone.')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  const togglePublishStatus = (id) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id 
        ? { 
            ...announcement, 
            isPublished: !announcement.isPublished,
            updatedAt: new Date().toISOString()
          } 
        : announcement
    ));
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">Exam Announcements</h1>
              <p className="mt-1 text-sm text-gray-500">
                Create and manage exam announcements for students and parents
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-shrink-0">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Announcements</option>
                  <option value="published">Published</option>
                  <option value="draft">Drafts</option>
                </select>
              </div>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaPlus className="mr-2" /> New Announcement
              </button>
            </div>
          </div>
          
          {/* Announcements List */}
          <div className="space-y-4">
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 bg-white">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">
                            {announcement.title}
                          </h3>
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {announcement.examType}
                          </span>
                          {announcement.isPublished ? (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Published
                            </span>
                          ) : (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Draft
                            </span>
                          )}
                        </div>
                        
                        <p className="mt-1 text-sm text-gray-600">
                          {announcement.description}
                        </p>
                        
                        <div className="mt-3 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-1.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                            <span>{formatDate(announcement.startDate)} - {formatDate(announcement.endDate)}</span>
                          </div>
                          <div className="flex items-center">
                            <FaInfoCircle className="mr-1.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                            <span>Classes: {announcement.classes.sort().join(', ')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex items-center space-x-2">
                        <button
                          onClick={() => togglePublishStatus(announcement.id)}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            announcement.isPublished 
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {announcement.isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleEdit(announcement)}
                          className="p-2 text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(announcement.id)}
                          className="p-2 text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <FaBell className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No announcements found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm 
                    ? 'No announcements match your search.' 
                    : filter === 'published' 
                      ? 'No published announcements yet.'
                      : filter === 'draft'
                        ? 'No draft announcements.'
                        : 'Get started by creating a new exam announcement.'}
                </p>
                {!searchTerm && filter === 'all' && (
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handleAddNew}
                    >
                      <FaPlus className="-ml-1 mr-2 h-4 w-4" />
                      New Announcement
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add/Edit Announcement Modal */}
      {isFormOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {currentAnnouncement.id ? 'Edit Announcement' : 'New Exam Announcement'}
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            className={`mt-1 block w-full border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            value={currentAnnouncement.title}
                            onChange={handleInputChange}
                            placeholder="e.g. Annual Examinations 2024"
                          />
                          {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="examType" className="block text-sm font-medium text-gray-700">
                            Exam Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="examType"
                            name="examType"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentAnnouncement.examType}
                            onChange={handleInputChange}
                          >
                            {examTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                              Start Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              id="startDate"
                              name="startDate"
                              className={`mt-1 block w-full border ${errors.startDate ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                              value={currentAnnouncement.startDate}
                              onChange={handleInputChange}
                            />
                            {errors.startDate && (
                              <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                              End Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              id="endDate"
                              name="endDate"
                              className={`mt-1 block w-full border ${errors.endDate ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                              value={currentAnnouncement.endDate}
                              onChange={handleInputChange}
                              min={currentAnnouncement.startDate}
                            />
                            {errors.endDate && (
                              <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Applicable Classes <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                            {allClasses.map(className => (
                              <div key={className} className="flex items-center">
                                <input
                                  id={`class-${className}`}
                                  type="checkbox"
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  checked={currentAnnouncement.classes.includes(className)}
                                  onChange={() => handleClassToggle(className)}
                                />
                                <label htmlFor={`class-${className}`} className="ml-2 block text-sm text-gray-700">
                                  {className === 'Nursery' || className === 'LKG' || className === 'UKG' 
                                    ? className 
                                    : `Class ${className}`}
                                </label>
                              </div>
                            ))}
                          </div>
                          {errors.classes && (
                            <p className="mt-1 text-sm text-red-600">{errors.classes}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description <span className="text-red-500">*</span>
                            <span className="ml-1 text-xs text-gray-500">(You can use basic formatting like **bold** or *italic*)</span>
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows="6"
                            className={`mt-1 block w-full border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            value={currentAnnouncement.description}
                            onChange={handleInputChange}
                            placeholder="Provide detailed information about the exam..."
                          />
                          {errors.description ? (
                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                          ) : (
                            <p className="mt-1 text-xs text-gray-500">
                              Include important details like exam timing, syllabus, and any special instructions.
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <div className="flex items-center">
                          <input
                            id="isPublished"
                            name="isPublished"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={currentAnnouncement.isPublished}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                            Publish immediately
                          </label>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:col-start-2 space-x-3 flex justify-end">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setIsFormOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            <FaSave className="mr-2" />
                            {currentAnnouncement.id ? 'Update Announcement' : 'Save Announcement'}
                          </button>
                        </div>
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

export default ExamAnnouncement;
