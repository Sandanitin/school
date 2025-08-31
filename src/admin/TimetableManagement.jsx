import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaPrint, FaDownload } from 'react-icons/fa';

const TimetableManagement = () => {
  // Mock data - replace with API calls
  const classes = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B', 'C', 'D'];
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = Array.from({ length: 8 }, (_, i) => `Period ${i + 1}`);
  
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [timetable, setTimetable] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState({
    day: '',
    period: '',
    subject: '',
    teacher: '',
    room: ''
  });

  // Generate empty timetable
  const generateEmptyTimetable = () => {
    const newTimetable = weekDays.map(day => ({
      day,
      periods: periods.map(period => ({
        name: period,
        subject: '',
        teacher: '',
        room: ''
      }))
    }));
    setTimetable(newTimetable);
  };

  // Load timetable when class/section changes
  useEffect(() => {
    if (selectedClass && selectedSection) {
      // TODO: Replace with API call to fetch timetable
      generateEmptyTimetable();
    }
  }, [selectedClass, selectedSection]);

  const handlePeriodClick = (dayIndex, periodIndex) => {
    const day = weekDays[dayIndex];
    const period = periods[periodIndex];
    const periodData = timetable[dayIndex]?.periods[periodIndex] || {};
    
    setCurrentPeriod({
      day,
      period,
      subject: periodData.subject || '',
      teacher: periodData.teacher || '',
      room: periodData.room || ''
    });
    
    // Open edit modal
    document.getElementById('periodModal').classList.remove('hidden');
  };

  const handleSavePeriod = (e) => {
    e.preventDefault();
    
    const updatedTimetable = [...timetable];
    const dayIndex = weekDays.indexOf(currentPeriod.day);
    const periodIndex = periods.indexOf(currentPeriod.period);
    
    if (dayIndex !== -1 && periodIndex !== -1) {
      updatedTimetable[dayIndex].periods[periodIndex] = {
        name: currentPeriod.period,
        subject: currentPeriod.subject,
        teacher: currentPeriod.teacher,
        room: currentPeriod.room
      };
      
      setTimetable(updatedTimetable);
      // TODO: Save to API
      
      // Close modal
      document.getElementById('periodModal').classList.add('hidden');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // TODO: Implement download as PDF/Excel
    console.log('Download timetable');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Timetable Management</h1>
            <div className="flex space-x-2">
              <button 
                onClick={handlePrint}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaPrint className="mr-2" /> Print
              </button>
              <button 
                onClick={handleDownload}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaDownload className="mr-2" /> Download
              </button>
            </div>
          </div>
          
          {/* Class and Section Selector */}
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
              <label htmlFor="section" className="block text-sm font-medium text-gray-700">Section</label>
              <select
                id="section"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                disabled={!selectedClass}
              >
                <option value="">Select Section</option>
                {sections.map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={!selectedClass || !selectedSection}
              >
                <FaCalendarAlt className="mr-2" /> Generate Timetable
              </button>
            </div>
          </div>
          
          {/* Timetable Grid */}
          {selectedClass && selectedSection && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Day / Period
                    </th>
                    {periods.map((period) => (
                      <th key={period} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {period}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timetable.map((day, dayIndex) => (
                    <tr key={day.day}>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        {day.day}
                      </td>
                      {day.periods.map((period, periodIndex) => (
                        <td 
                          key={`${day.day}-${period.name}`}
                          className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 border cursor-pointer hover:bg-blue-50"
                          onClick={() => handlePeriodClick(dayIndex, periodIndex)}
                        >
                          <div className="text-center">
                            <div className="font-medium">{period.subject || 'Free'}</div>
                            <div className="text-xs text-gray-400">{period.teacher}</div>
                            <div className="text-xs text-gray-400">{period.room}</div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {(!selectedClass || !selectedSection) && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No class selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a class and section to view or edit the timetable.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Period Edit Modal */}
      <div id="periodModal" className="fixed z-10 inset-0 overflow-y-auto hidden">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {currentPeriod.day} - {currentPeriod.period}
                </h3>
                <div className="mt-4">
                  <form onSubmit={handleSavePeriod}>
                    <div className="mb-4">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={currentPeriod.subject}
                        onChange={(e) => setCurrentPeriod({...currentPeriod, subject: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">Teacher</label>
                        <input
                          type="text"
                          id="teacher"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={currentPeriod.teacher}
                          onChange={(e) => setCurrentPeriod({...currentPeriod, teacher: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="room" className="block text-sm font-medium text-gray-700">Room</label>
                        <input
                          type="text"
                          id="room"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          value={currentPeriod.room}
                          onChange={(e) => setCurrentPeriod({...currentPeriod, room: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                        onClick={() => document.getElementById('periodModal').classList.add('hidden')}
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
    </div>
  );
};

export default TimetableManagement;
