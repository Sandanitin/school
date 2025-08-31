import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSchool, 
  FaUsers, 
  FaChartPie,
  FaCog,
  FaShieldAlt,
  FaMoneyBillWave,
  FaClipboardCheck
} from 'react-icons/fa';

const SuperAdminDashboard = () => {
  // Mock data - replace with actual API calls
  const stats = [
    { title: 'Total Schools', value: '15', icon: <FaSchool className="text-3xl text-indigo-500" /> },
    { title: 'Active Admins', value: '24', icon: <FaUsers className="text-3xl text-green-500" /> },
    { title: 'Total Revenue', value: '$45,230', icon: <FaMoneyBillWave className="text-3xl text-yellow-500" /> },
    { title: 'System Health', value: '100%', icon: <FaShieldAlt className="text-3xl text-emerald-500" /> },
  ];

  const quickActions = [
    { title: 'Manage Schools', path: "/super-admin/school-management", icon: <FaSchool /> },
    { title: 'Admin Requests', path: "/super-admin/admin-requests", icon: <FaClipboardCheck /> },
    { title: 'System Settings', path: "/super-admin/settings", icon: <FaCog /> },
    { title: 'View Analytics', path: "/super-admin/analytics", icon: <FaChartPie /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Super Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening with your schools.</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center">
            <FaCog className="mr-2" />
            System Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="p-2 bg-indigo-50 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link 
              key={index}
              to={action.path}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
            >
              <span className="text-indigo-600">{action.icon}</span>
              <span className="font-medium">{action.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'New school registration approved', time: '2 hours ago', icon: <FaSchool /> },
              { action: 'System update completed', time: '5 hours ago', icon: <FaCog /> },
              { action: 'New admin access requested', time: '1 day ago', icon: <FaUsers /> },
              { action: 'Monthly backup completed', time: '2 days ago', icon: <FaShieldAlt /> },
            ].map((item, index) => (
              <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="p-2 bg-indigo-100 rounded-full text-indigo-600 mr-3">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">System Status</h2>
            <div className="space-y-4">
              {[
                { service: 'API Server', status: 'Operational', color: 'text-green-500' },
                { service: 'Database', status: 'Operational', color: 'text-green-500' },
                { service: 'File Storage', status: 'Operational', color: 'text-green-500' },
                { service: 'Email Service', status: 'Operational', color: 'text-green-500' },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{item.service}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${item.color} bg-opacity-10 ${item.color.replace('text', 'bg')}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-3">
              {[
                { label: 'Active Schools', value: '15/20' },
                { label: 'Storage Used', value: '45% (2.3GB/5GB)' },
                { label: 'Active Sessions', value: '42' },
                { label: 'System Version', value: 'v2.4.1' },
              ].map((stat, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{stat.label}:</span>
                  <span className="font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
