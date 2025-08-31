import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSearch, FaCalendarAlt, FaClock, FaBook, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { format } from 'date-fns';

const ClassTestManagement = () => {
  // Mock data for class tests
  const [classTests, setClassTests] = useState([
    {
      id: 1,
      title: 'Mathematics Quiz - Chapter 1',
      subject: 'Mathematics',
      class: '10',
      section: 'A',
      topic: 'Algebra Basics',
      maxMarks: 20,
      date: '2024-09-15',
      duration: 45, // in minutes
      teacher: 'John Smith',
      status: 'scheduled', // scheduled, completed, cancelled
      createdAt: '2024-09-01T10:00:00Z',
      students: [
        { id: 101, name: 'Alice Johnson', marks: 18, status: 'present' },
        { id: 102, name: 'Bob Williams', marks: 15, status: 'present' },
        { id: 103, name: 'Charlie Brown', marks: 0, status: 'absent' }
      ]
    },
    {
      id: 2,
      title: 'Science Test - Physics',
      subject: 'Science',
      class: '9',
      section: 'B',
      topic: 'Motion and Force',
      maxMarks: 30,
      date: '2024-09-10',
      duration: 60,
      teacher: 'Sarah Johnson',
      status: 'completed',
      createdAt: '2024-08-28T14:30:00Z',
      students: [
        { id: 201, name: 'David Miller', marks: 25, status: 'present' },
        { id: 202, name: 'Eva Davis', marks: 28, status: 'present' }
      ]
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, scheduled, completed, cancelled
  const [currentTest, setCurrentTest] = useState({
    id: null,
    title: '',
    subject: '',
    class: '',
    section: 'A',
    topic: '',
    maxMarks: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    duration: 30,
    status: 'scheduled'
  });

  // Constants
  const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Languages', 'Computer Science'];
  const classes = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B', 'C', 'D'];
  const statuses = [
    { value: 'scheduled', label: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ];

  // Filter class tests
  const filteredTests = classTests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.topic.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || test.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  // Format date and time
  const formatDate = (dateString) => format(new Date(dateString), 'MMM dd, yyyy');
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Handlers
  const handleAddNew = () => {
    setCurrentTest({
      id: null,
      title: '',
      subject: '',
      class: '',
      section: 'A',
      topic: '',
      maxMarks: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      duration: 30,
      status: 'scheduled'
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentTest.title || !currentTest.subject || !currentTest.class || !currentTest.maxMarks) {
      alert('Please fill in all required fields');
      return;
    }

    if (currentTest.id) {
      // Update existing
      setClassTests(classTests.map(test => 
        test.id === currentTest.id ? currentTest : test
      ));
    } else {
      // Add new
      setClassTests([{
        ...currentTest,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        teacher: 'Current User', // Replace with actual teacher name from auth context
        students: [] // Will be populated with class students
      }, ...classTests]);
    }
    
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      setClassTests(classTests.filter(test => test.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setClassTests(classTests.map(test => 
      test.id === id ? { ...test, status: newStatus } : test
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">Class Tests</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and track class tests and assessments
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
                  placeholder="Search tests..."
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
                  <option value="all">All Tests</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaPlus className="mr-2" /> New Test
              </button>
            </div>
          </div>
          
          {/* Class Tests List */}
          <div className="space-y-4">
            {filteredTests.length > 0 ? (
              filteredTests.map(test => (
                <div key={test.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                          {test.title}
                        </h3>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statuses.find(s => s.value === test.status)?.color}`}>
                          {statuses.find(s => s.value === test.status)?.label}
                        </span>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <FaBook className="mr-2 text-gray-400" />
                          <span>{test.subject} • Class {test.class}{test.section}</span>
                        </div>
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-2 text-gray-400" />
                          <span>{formatDate(test.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <FaClock className="mr-2 text-gray-400" />
                          <span>{formatTime(test.duration)} • {test.maxMarks} marks</span>
                        </div>
                        <div className="flex items-center">
                          <FaChalkboardTeacher className="mr-2 text-gray-400" />
                          <span>{test.teacher}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                      {test.status === 'scheduled' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(test.id, 'completed')}
                            className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200"
                          >
                            Mark as Completed
                          </button>
                          <button
                            onClick={() => handleStatusChange(test.id, 'cancelled')}
                            className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setCurrentTest({...test});
                          setIsFormOpen(true);
                        }}
                        className="p-2 text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(test.id)}
                        className="p-2 text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  {test.status === 'completed' && test.students && test.students.length > 0 && (
                    <div className="p-4 bg-white">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Results Summary</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {test.students.map(student => (
                              <tr key={student.id}>
                                <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {student.name}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    student.status === 'present' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {student.status === 'present' ? 'Present' : 'Absent'}
                                  </span>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {student.status === 'present' ? student.marks : 'N/A'} / {test.maxMarks}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {student.status === 'present' 
                                    ? `${Math.round((student.marks / test.maxMarks) * 100)}%` 
                                    : 'N/A'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <FaBook className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No class tests found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm 
                    ? 'No tests match your search.' 
                    : filter === 'scheduled' 
                      ? 'No scheduled tests.'
                      : filter === 'completed'
                        ? 'No completed tests.'
                        : filter === 'cancelled'
                          ? 'No cancelled tests.'
                          : 'Get started by creating a new class test.'}
                </p>
                {!searchTerm && filter === 'all' && (
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handleAddNew}
                    >
                      <FaPlus className="-ml-1 mr-2 h-4 w-4" />
                      New Class Test
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Class Test Form Modal */}
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
                    {currentTest.id ? 'Edit' : 'New'} Class Test
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Test Title *
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={currentTest.title}
                          onChange={(e) => setCurrentTest({...currentTest, title: e.target.value})}
                          placeholder="e.g., Mathematics Quiz - Chapter 1"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            Subject *
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentTest.subject}
                            onChange={(e) => setCurrentTest({...currentTest, subject: e.target.value})}
                            required
                          >
                            <option value="">Select Subject</option>
                            {subjects.map(subject => (
                              <option key={subject} value={subject}>{subject}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                            Topic
                          </label>
                          <input
                            type="text"
                            id="topic"
                            name="topic"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentTest.topic}
                            onChange={(e) => setCurrentTest({...currentTest, topic: e.target.value})}
                            placeholder="e.g., Algebra Basics"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                            Class *
                          </label>
                          <select
                            id="class"
                            name="class"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentTest.class}
                            onChange={(e) => setCurrentTest({...currentTest, class: e.target.value})}
                            required
                          >
                            <option value="">Select Class</option>
                            {classes.map(cls => (
                              <option key={cls} value={cls}>
                                {cls === 'Nursery' || cls === 'LKG' || cls === 'UKG' ? cls : `Class ${cls}`}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                            Section
                          </label>
                          <select
                            id="section"
                            name="section"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentTest.section}
                            onChange={(e) => setCurrentTest({...currentTest, section: e.target.value})}
                          >
                            {sections.map(section => (
                              <option key={section} value={section}>Section {section}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="maxMarks" className="block text-sm font-medium text-gray-700">
                            Max Marks *
                          </label>
                          <input
                            type="number"
                            id="maxMarks"
                            name="maxMarks"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentTest.maxMarks}
                            onChange={(e) => setCurrentTest({...currentTest, maxMarks: e.target.value})}
                            min="1"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date *
                          </label>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentTest.date}
                            onChange={(e) => setCurrentTest({...currentTest, date: e.target.value})}
                            min={format(new Date(), 'yyyy-MM-dd')}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                            Duration (minutes) *
                          </label>
                          <input
                            type="number"
                            id="duration"
                            name="duration"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentTest.duration}
                            onChange={(e) => setCurrentTest({...currentTest, duration: e.target.value})}
                            min="1"
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
                          {currentTest.id ? 'Update' : 'Create'} Test
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

export default ClassTestManagement;