import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  Avatar,
  LinearProgress,
  Divider
} from '@mui/material';
import { 
  FaBook, 
  FaClipboardCheck, 
  FaChartLine,
  FaBell,
  FaCalendarAlt,
  FaUserGraduate
} from 'react-icons/fa';

const StudentDashboard = () => {
  // Mock data
  const studentInfo = {
    name: 'Alex Johnson',
    class: '10th Grade',
    section: 'A',
    rollNumber: 'STU2023001',
    attendance: 92,
    overallGrade: 'A',
    upcomingExams: [
      { subject: 'Mathematics', date: '2025-09-10', topic: 'Algebra' },
      { subject: 'Science', date: '2025-09-15', topic: 'Physics - Motion' },
    ],
    recentActivities: [
      { type: 'assignment', subject: 'Mathematics', title: 'Homework #5 Submitted', time: '2 hours ago' },
      { type: 'grade', subject: 'Science', title: 'Test Score: 95%', time: '1 day ago' },
      { type: 'announcement', title: 'School Holiday on 5th Sept', time: '2 days ago' },
    ]
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {studentInfo.name}!</h1>
          <p className="text-gray-600">Here's what's happening with your studies today</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0 bg-blue-50 p-3 rounded-lg">
          <Avatar className="bg-blue-100 text-blue-600 mr-3">
            <FaUserGraduate size={20} />
          </Avatar>
          <div>
            <p className="text-sm text-gray-600">{studentInfo.class} - Section {studentInfo.section}</p>
            <p className="font-medium">Roll No: {studentInfo.rollNumber}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} md={4}>
          <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
            <CardContent>
              <div className="flex items-center">
                <Avatar className="bg-green-100 text-green-600 mr-4">
                  <FaClipboardCheck size={20} />
                </Avatar>
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Attendance
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {studentInfo.attendance}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={studentInfo.attendance} 
                    className="mt-2"
                    color={studentInfo.attendance > 85 ? 'success' : 'warning'}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
            <CardContent>
              <div className="flex items-center">
                <Avatar className="bg-blue-100 text-blue-600 mr-4">
                  <FaBook size={20} />
                </Avatar>
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Current Grade
                  </Typography>
                  <Typography variant="h4" component="h2" className="text-blue-600">
                    {studentInfo.overallGrade}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Overall Performance
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
            <CardContent>
              <div className="flex items-center">
                <Avatar className="bg-purple-100 text-purple-600 mr-4">
                  <FaBell size={20} />
                </Avatar>
                <div>
                  <Typography color="textSecondary" gutterBottom>
                    Upcoming Deadlines
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {studentInfo.upcomingExams.length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Exams this week
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Upcoming Exams */}
        <Grid item xs={12} md={6}>
          <Card className="h-full shadow-md">
            <CardContent>
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-blue-500 mr-2" />
                <Typography variant="h6" className="font-semibold">Upcoming Exams</Typography>
              </div>
              <div className="space-y-4">
                {studentInfo.upcomingExams.map((exam, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{exam.subject}</p>
                        <p className="text-sm text-gray-600">{exam.topic}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))}
                {studentInfo.upcomingExams.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No upcoming exams</p>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card className="h-full shadow-md">
            <CardContent>
              <div className="flex items-center mb-4">
                <FaBell className="text-green-500 mr-2" />
                <Typography variant="h6" className="font-semibold">Recent Activities</Typography>
              </div>
              <div className="space-y-4">
                {studentInfo.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 ${
                      activity.type === 'grade' ? 'bg-green-100 text-green-600' :
                      activity.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {activity.type === 'grade' ? <FaChartLine size={16} /> :
                       activity.type === 'assignment' ? <FaBook size={16} /> :
                       <FaBell size={16} />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      {activity.subject && (
                        <p className="text-sm text-gray-600">{activity.subject}</p>
                      )}
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default StudentDashboard;
