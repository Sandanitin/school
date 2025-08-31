import React from 'react';
import { Users, BookOpen, Calendar, CreditCard, AlertCircle, CheckCircle } from 'react-feather';

const stats = [
  { name: 'Total Students', value: '1,234', icon: Users, change: '+12%', changeType: 'increase' },
  { name: 'Active Classes', value: '24', icon: BookOpen, change: '+2', changeType: 'increase' },
  { name: 'Today\'s Attendance', value: '92%', icon: Calendar, change: '+3%', changeType: 'increase' },
  { name: 'Monthly Revenue', value: '$24,500', icon: CreditCard, change: '+8.2%', changeType: 'increase' },
];

const recentActivities = [
  { id: 1, type: 'success', title: 'Fee payment received', description: 'John Doe paid Q2 fees', time: '5 min ago' },
  { id: 2, type: 'warning', title: 'Low attendance alert', description: 'Grade 5B attendance below 75%', time: '1 hour ago' },
  { id: 3, type: 'success', title: 'New student enrolled', description: 'Sarah Wilson joined Grade 4A', time: '2 hours ago' },
  { id: 4, type: 'info', title: 'Exam schedule updated', description: 'Mid-term exams starting next week', time: '1 day ago' },
];

const quickActions = [
  { title: 'Add New Student', icon: Users, path: '/students/add' },
  { title: 'Mark Attendance', icon: Calendar, path: '/attendance' },
  { title: 'Create Invoice', icon: CreditCard, path: '/finance/invoices/new' },
  { title: 'Schedule Class', icon: BookOpen, path: '/academics/timetable' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className={`mt-2 text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="w-full flex items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
                onClick={() => window.location.href = action.path}
              >
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                      activity.type === 'success' ? 'bg-green-100 text-green-600' : 
                      activity.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'success' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="button"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all activities
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-500">View Calendar</button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((event) => (
            <div key={event} className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 px-3 py-1 rounded-md text-sm font-medium">
                {`Oct ${10 + event}`}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Parent-Teacher Meeting</p>
                <p className="text-sm text-gray-500">10:00 AM - 12:00 PM • School Auditorium</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
