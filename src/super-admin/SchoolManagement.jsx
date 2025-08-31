import React from 'react';
import { FaSchool, FaChalkboardTeacher, FaUserGraduate, FaBook, FaCalendarAlt, FaBell } from 'react-icons/fa';

const SchoolManagement = () => {
  // Sample data - replace with actual data from your backend
  const stats = [
    { title: 'Total Students', count: '1,245', icon: <FaUserGraduate className="text-3xl text-blue-500" /> },
    { title: 'Total Teachers', count: '85', icon: <FaChalkboardTeacher className="text-3xl text-green-500" /> },
    { title: 'Classes', count: '32', icon: <FaSchool className="text-3xl text-purple-500" /> },
    { title: 'Subjects', count: '15', icon: <FaBook className="text-3xl text-yellow-500" /> },
  ];

  const recentActivities = [
    { id: 1, title: 'New student enrolled', time: '10 min ago', type: 'enrollment' },
    { id: 2, title: 'Math class schedule updated', time: '25 min ago', type: 'schedule' },
    { id: 3, title: 'Parent meeting scheduled', time: '1 hour ago', type: 'meeting' },
    { id: 4, title: 'New teacher joined', time: '2 hours ago', type: 'staff' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">School Management</h1>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FaCalendarAlt className="mr-2" />
            School Calendar
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
            <FaBell className="text-xl" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.count}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="p-2 bg-blue-100 rounded-full mr-4">
                  <FaBell className="text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{activity.title}</p>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <span>Add New Student</span>
              <span className="text-gray-400">+</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <span>Schedule Class</span>
              <span className="text-gray-400">+</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <span>Send Announcement</span>
              <span className="text-gray-400">+</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <span>Generate Reports</span>
              <span className="text-gray-400">📊</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolManagement;
