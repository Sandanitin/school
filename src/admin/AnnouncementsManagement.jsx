import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSearch, FaBell, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { format } from 'date-fns';

const AnnouncementsManagement = () => {
  // Mock data for announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'School Reopening',
      description: 'School will reopen on January 10th for all classes. Please ensure all health protocols are followed.',
      category: 'General',
      startDate: '2024-01-10',
      endDate: '2024-01-10',
      target: 'All',
      isPublished: true,
      createdAt: '2024-01-05T10:00:00Z'
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      description: 'Quarterly parent-teacher meeting scheduled for January 15th. Please confirm your attendance.',
      category: 'PTM',
      startDate: '2024-01-15',
      endDate: '2024-01-15',
      target: 'Parents',
      isPublished: true,
      createdAt: '2024-01-01T14:30:00Z'
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentAnnouncement, setCurrentAnnouncement] = useState({
    id: null,
    title: '',
    description: '',
    category: 'General',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    target: 'All',
    isPublished: false
  });

  // Constants
  const categories = ['General', 'PTM', 'Holiday', 'Exam', 'Event', 'Urgent'];
  const targets = ['All', 'Students', 'Parents', 'Teachers', 'Staff'];

  // Filter announcements
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
      (filter === 'published' && announcement.isPublished) ||
      (filter === 'draft' && !announcement.isPublished);
    
    return matchesSearch && matchesFilter;
  });

  // Format date
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  // Handlers
  const handleAddNew = () => {
    setCurrentAnnouncement({
      id: null,
      title: '',
      description: '',
      category: 'General',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(), 'yyyy-MM-dd'),
      target: 'All',
      isPublished: false
    });
    setIsFormOpen(true);
  };

  const handleEdit = (announcement) => {
    setCurrentAnnouncement({...announcement});
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentAnnouncement.title || !currentAnnouncement.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (currentAnnouncement.id) {
      // Update existing
      setAnnouncements(announcements.map(a => 
        a.id === currentAnnouncement.id ? currentAnnouncement : a
      ));
    } else {
      // Add new
      setAnnouncements([{
        ...currentAnnouncement,
        id: Date.now(),
        createdAt: new Date().toISOString()
      }, ...announcements]);
    }
    
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  const togglePublishStatus = (id) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id 
        ? { ...announcement, isPublished: !announcement.isPublished }
        : announcement
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage school announcements and notifications
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
              filteredAnnouncements.map(announcement => (
                <div key={announcement.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className={`p-4 ${announcement.isPublished ? 'bg-white' : 'bg-gray-50'} border-b flex flex-col sm:flex-row sm:items-center sm:justify-between`}>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                          {announcement.title}
                        </h3>
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {announcement.category}
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
                      
                      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                          <span>{formatDate(announcement.startDate)}</span>
                          {announcement.endDate !== announcement.startDate && (
                            <span> to {formatDate(announcement.endDate)}</span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <FaBell className="mr-1.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                          <span>Target: {announcement.target}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex items-center space-x-2">
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
                  
                  <div className="p-4 bg-white">
                    <p className="text-gray-700">{announcement.description}</p>
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
                        : 'Get started by creating a new announcement.'}
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
      
      {/* Announcement Form Modal */}
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
                    {currentAnnouncement.id ? 'Edit' : 'New'} Announcement
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Title *
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                          value={currentAnnouncement.title}
                          onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, title: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description *
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows="4"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={currentAnnouncement.description}
                          onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, description: e.target.value})}
                          required
                        ></textarea>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                          </label>
                          <select
                            id="category"
                            name="category"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentAnnouncement.category}
                            onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, category: e.target.value})}
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="target" className="block text-sm font-medium text-gray-700">
                            Target Audience
                          </label>
                          <select
                            id="target"
                            name="target"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentAnnouncement.target}
                            onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, target: e.target.value})}
                          >
                            {targets.map(target => (
                              <option key={target} value={target}>{target}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Status
                          </label>
                          <div className="mt-1">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                checked={currentAnnouncement.isPublished}
                                onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, isPublished: e.target.checked})}
                              />
                              <span className="ml-2 text-sm text-gray-700">
                                {currentAnnouncement.isPublished ? 'Published' : 'Draft'}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                            Start Date
                          </label>
                          <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentAnnouncement.startDate}
                            onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, startDate: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                            End Date
                          </label>
                          <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentAnnouncement.endDate}
                            onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, endDate: e.target.value})}
                            min={currentAnnouncement.startDate}
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
                          {currentAnnouncement.id ? 'Update' : 'Create'} Announcement
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

export default AnnouncementsManagement;