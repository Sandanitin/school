import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { 
  FaChalkboardTeacher, 
  FaUserGraduate, 
  FaClipboardCheck, 
  FaBook 
} from 'react-icons/fa';

const TeacherDashboard = () => {
  const stats = [
    { 
      title: 'Total Classes', 
      value: '12', 
      icon: <FaChalkboardTeacher size={24} />,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      title: 'Students', 
      value: '245', 
      icon: <FaUserGraduate size={24} />,
      color: 'bg-green-100 text-green-600'
    },
    { 
      title: 'Attendance', 
      value: '92%', 
      icon: <FaClipboardCheck size={24} />,
      color: 'bg-yellow-100 text-yellow-600'
    },
    { 
      title: 'Subjects', 
      value: '5', 
      icon: <FaBook size={24} />,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {stat.value}
                  </Typography>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <Card className="shadow-md mb-8">
        <CardContent>
          <Typography variant="h6" className="mb-4 font-semibold">
            Recent Activities
          </Typography>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border-b pb-3 last:border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Class {item} - Mathematics</p>
                    <p className="text-sm text-gray-600">Today, 10:00 AM - 11:00 AM</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    In Progress
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Classes */}
      <Card className="shadow-md">
        <CardContent>
          <Typography variant="h6" className="mb-4 font-semibold">
            Upcoming Classes
          </Typography>
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="border-b pb-3 last:border-0">
                <p className="font-medium">Class {item + 3} - Science</p>
                <p className="text-sm text-gray-600">
                  Tomorrow, {item === 1 ? '09:00 AM' : '02:00 PM'} - {item === 1 ? '10:00 AM' : '03:00 PM'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
