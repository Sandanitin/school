import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSearch, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { format } from 'date-fns';

const ExamScheduleForm = () => {
  // Mock data
  const [examSchedules, setExamSchedules] = useState([
    {
      id: 1,
      examName: 'Mid-Term 2024',
      examType: 'Mid-Term',
      class: '10',
      section: 'A',
      schedule: [
        { id: 1, subject: 'Math', date: '2024-10-15', startTime: '09:00', endTime: '12:00', maxMarks: 100, roomNo: '101' }
      ],
      isPublished: true
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSchedule, setCurrentSchedule] = useState({
    id: null,
    examName: '',
    examType: 'Mid-Term',
    class: '',
    section: 'A',
    schedule: [],
    isPublished: false
  });

  const [currentExam, setCurrentExam] = useState({
    id: null,
    subject: '',
    date: '',
    startTime: '09:00',
    endTime: '12:00',
    maxMarks: '',
    roomNo: ''
  });

  const [isExamFormOpen, setIsExamFormOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // Constants
  const examTypes = ['Mid-Term', 'Final', 'Unit Test', 'Pre-Board', 'Annual'];
  const classes = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B', 'C', 'D'];
  const subjects = ['Math', 'Science', 'English', 'Social Studies', 'Languages'];

  // Filter schedules
  const filteredSchedules = examSchedules.filter(schedule => 
    schedule.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date and time
  const formatDate = (dateString) => format(new Date(dateString), 'MMM dd, yyyy');
  const formatTime = (timeString) => format(new Date(`2000-01-01T${timeString}`), 'h:mm a');

  // Handlers
  const handleAddNew = () => {
    setCurrentSchedule({
      id: null,
      examName: '',
      examType: 'Mid-Term',
      class: '',
      section: 'A',
      schedule: [],
      isPublished: false
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentSchedule.examName || !currentSchedule.class || currentSchedule.schedule.length === 0) {
      alert('Please fill all required fields and add at least one exam');
      return;
    }
    
    if (currentSchedule.id) {
      // Update existing
      setExamSchedules(examSchedules.map(s => 
        s.id === currentSchedule.id ? currentSchedule : s
      ));
    } else {
      // Add new
      setExamSchedules([{
        ...currentSchedule,
        id: Date.now(),
        createdAt: new Date().toISOString()
      }, ...examSchedules]);
    }
    setIsFormOpen(false);
  };

  const handleAddExam = () => {
    setCurrentExam({
      id: null,
      subject: '',
      date: '',
      startTime: '09:00',
      endTime: '12:00',
      maxMarks: '',
      roomNo: ''
    });
    setIsExamFormOpen(true);
  };

  const handleSubmitExam = (e) => {
    e.preventDefault();
    if (!currentExam.subject || !currentExam.date || !currentExam.maxMarks || !currentExam.roomNo) {
      alert('Please fill all exam details');
      return;
    }
    
    const updatedSchedule = { ...currentSchedule };
    
    if (currentExam.id) {
      // Update existing exam
      const index = updatedSchedule.schedule.findIndex(e => e.id === currentExam.id);
      if (index !== -1) updatedSchedule.schedule[index] = { ...currentExam };
    } else {
      // Add new exam
      updatedSchedule.schedule = [...updatedSchedule.schedule, {
        ...currentExam,
        id: Date.now()
      }];
    }
    
    // Sort by date
    updatedSchedule.schedule.sort((a, b) => new Date(a.date) - new Date(b.date));
    setCurrentSchedule(updatedSchedule);
    setIsExamFormOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">Exam Schedules</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage exam schedules and timetables
              </p>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FaPlus className="inline mr-1" /> New Schedule
              </button>
            </div>
          </div>
          
          {/* Schedules List */}
          <div className="space-y-4">
            {filteredSchedules.map(schedule => (
              <div key={schedule.id} className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{schedule.examName}</h3>
                    <p className="text-sm text-gray-600">
                      Class {schedule.class}{schedule.section} • {schedule.schedule.length} exams
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setCurrentSchedule({...schedule});
                        setIsFormOpen(true);
                      }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this schedule?')) {
                          setExamSchedules(examSchedules.filter(s => s.id !== schedule.id));
                        }
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Subject</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Time</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Marks</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Room</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {schedule.schedule.map(exam => (
                        <tr key={exam.id}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm">{formatDate(exam.date)}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">{exam.subject}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm">
                            {formatTime(exam.startTime)} - {formatTime(exam.endTime)}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm">{exam.maxMarks}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm">{exam.roomNo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {currentSchedule.id ? 'Edit' : 'New'} Exam Schedule
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Exam Name *</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={currentSchedule.examName}
                      onChange={(e) => setCurrentSchedule({...currentSchedule, examName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Exam Type *</label>
                    <select
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={currentSchedule.examType}
                      onChange={(e) => setCurrentSchedule({...currentSchedule, examType: e.target.value})}
                      required
                    >
                      {examTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Class *</label>
                    <select
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={currentSchedule.class}
                      onChange={(e) => setCurrentSchedule({...currentSchedule, class: e.target.value})}
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
                    <label className="block text-sm font-medium text-gray-700">Section</label>
                    <select
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={currentSchedule.section}
                      onChange={(e) => setCurrentSchedule({...currentSchedule, section: e.target.value})}
                    >
                      {sections.map(sec => (
                        <option key={sec} value={sec}>Section {sec}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Exam Schedule</h3>
                    <button
                      type="button"
                      onClick={handleAddExam}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      <FaPlus className="inline mr-1" /> Add Exam
                    </button>
                  </div>
                  
                  {currentSchedule.schedule.length > 0 ? (
                    <div className="border rounded overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Subject</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Time</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Marks</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Room</th>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {currentSchedule.schedule.map(exam => (
                            <tr key={exam.id}>
                              <td className="px-3 py-2 whitespace-nowrap text-sm">{formatDate(exam.date)}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm">{exam.subject}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm">
                                {formatTime(exam.startTime)} - {formatTime(exam.endTime)}
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm">{exam.maxMarks}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm">{exam.roomNo}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-right text-sm">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCurrentExam({...exam});
                                    setIsExamFormOpen(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-900 mr-3"
                                >
                                  <FaEdit className="inline" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (window.confirm('Remove this exam?')) {
                                      setCurrentSchedule({
                                        ...currentSchedule,
                                        schedule: currentSchedule.schedule.filter(e => e.id !== exam.id)
                                      });
                                    }
                                  }}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <FaTrash className="inline" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-md">
                      <FaCalendarAlt className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">No exams added yet</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {currentSchedule.id ? 'Update' : 'Create'} Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Exam Form Modal */}
      {isExamFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {currentExam.id ? 'Edit' : 'Add'} Exam
              </h2>
              
              <form onSubmit={handleSubmitExam} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject *</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={currentExam.subject}
                    onChange={(e) => setCurrentExam({...currentExam, subject: e.target.value})}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date *</label>
                  <input
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={currentExam.date}
                    onChange={(e) => setCurrentExam({...currentExam, date: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Time *</label>
                    <input
                      type="time"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={currentExam.startTime}
                      onChange={(e) => setCurrentExam({...currentExam, startTime: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Time *</label>
                    <input
                      type="time"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={currentExam.endTime}
                      onChange={(e) => setCurrentExam({...currentExam, endTime: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Marks *</label>
                    <input
                      type="number"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={currentExam.maxMarks}
                      onChange={(e) => setCurrentExam({...currentExam, maxMarks: e.target.value})}
                      required
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Room No. *</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      value={currentExam.roomNo}
                      onChange={(e) => setCurrentExam({...currentExam, roomNo: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsExamFormOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {currentExam.id ? 'Update' : 'Add'} Exam
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

export default ExamScheduleForm;