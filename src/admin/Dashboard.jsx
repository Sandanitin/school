import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Avatar, 
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Badge,
  Paper
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon,
  Notifications as NotificationsIcon,
  EventNote as EventNoteIcon,
  Announcement as AnnouncementIcon,
  TrendingUp as TrendingUpIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8]
  }
}));

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    activeClasses: 0,
    attendanceRate: 0,
    pendingPayments: 0,
    upcomingEvents: 0
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setStats({
          totalStudents: 1245,
          totalTeachers: 48,
          activeClasses: 32,
          attendanceRate: 92.5,
          pendingPayments: 18,
          upcomingEvents: 5
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Chart data
  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Attendance %',
        data: [85, 92, 78, 95, 89, 76],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const genderDistribution = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        data: [680, 540, 25],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'added a new student', time: '5 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'updated attendance', time: '1 hour ago' },
    { id: 3, user: 'Admin', action: 'sent a notification', time: '2 hours ago' },
    { id: 4, user: 'System', action: 'scheduled maintenance', time: '1 day ago' },
  ];

  const quickActions = [
    { title: 'Add Student', icon: <AddIcon />, path: '/admin/student-management/add' },
    { title: 'Add Teacher', icon: <SchoolIcon />, path: '/admin/teacher-management/add' },
    { title: 'Mark Attendance', icon: <EventNoteIcon />, path: '/admin/attendance' },
    { title: 'Send Notice', icon: <AnnouncementIcon />, path: '/admin/notices/new' },
  ];

  const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <div>
            <Typography color="textSecondary" variant="subtitle2">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            {trend && (
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUpIcon 
                  color={trend > 0 ? 'success' : 'error'} 
                  fontSize="small" 
                  sx={{ transform: trend > 0 ? 'none' : 'rotate(180deg)' }} 
                />
                <Typography 
                  variant="caption" 
                  color={trend > 0 ? 'success.main' : 'error.main'}
                  ml={0.5}
                >
                  {Math.abs(trendValue)}% {trend > 0 ? 'increase' : 'decrease'}
                </Typography>
              </Box>
            )}
          </div>
          <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.dark` }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </StyledCard>
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Dashboard Overview
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<NotificationsIcon />}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={3} color="error">
              Notifications
            </Badge>
          </Button>
          <Button variant="contained" startIcon={<EventNoteIcon />}>
            Calendar
          </Button>
        </Box>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard 
            title="Total Students" 
            value={stats.totalStudents.toLocaleString()} 
            icon={<PeopleIcon />} 
            color="primary"
            trend={5.2}
            trendValue={5.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard 
            title="Total Teachers" 
            value={stats.totalTeachers} 
            icon={<SchoolIcon />} 
            color="secondary"
            trend={2.1}
            trendValue={2.1}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard 
            title="Active Classes" 
            value={stats.activeClasses} 
            icon={<ClassIcon />} 
            color="warning"
            trend={-1.5}
            trendValue={1.5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard 
            title="Attendance" 
            value={`${stats.attendanceRate}%`} 
            icon={<AssessmentIcon />} 
            color="success"
            trend={1.2}
            trendValue={1.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard 
            title="Pending Fees" 
            value={stats.pendingPayments} 
            icon={<AssessmentIcon />} 
            color="error"
            trend={-3.2}
            trendValue={3.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard 
            title="Upcoming Events" 
            value={stats.upcomingEvents} 
            icon={<EventNoteIcon />} 
            color="info"
          />
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          {/* Attendance Chart */}
          <StyledCard sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" component="div">
                  Weekly Attendance Trend
                </Typography>
                <Button size="small" color="primary">
                  View Report
                </Button>
              </Box>
              <Box sx={{ height: 300 }}>
                <Bar 
                  data={attendanceData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                          callback: value => `${value}%`
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }} 
                />
              </Box>
            </CardContent>
          </StyledCard>

          {/* Quick Actions */}
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2} mb={3}>
            {quickActions.map((action, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={action.icon}
                  component={Link}
                  to={action.path}
                  sx={{
                    py: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    '& .MuiButton-startIcon': {
                      mr: 0,
                      mb: 1
                    }
                  }}
                >
                  {action.title}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          {/* Gender Distribution */}
          <StyledCard sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Gender Distribution
              </Typography>
              <Box sx={{ height: 200, position: 'relative' }}>
                <Doughnut 
                  data={genderDistribution}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </StyledCard>

          {/* Recent Activities */}
          <StyledCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" component="div">
                  Recent Activities
                </Typography>
                <Button size="small" color="primary">
                  View All
                </Button>
              </Box>
              <List>
                {recentActivities.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <ListItem 
                      alignItems="flex-start"
                      secondaryAction={
                        <IconButton edge="end" size="small">
                          <MoreVertIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}>
                          {activity.user.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body2" component="span">
                            <strong>{activity.user}</strong> {activity.action}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="textSecondary">
                            {activity.time}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
