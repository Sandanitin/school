import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  HelpOutline as HelpOutlineIcon,
  CalendarMonth as CalendarMonthIcon,
  School as SchoolIcon,
  Subject as SubjectIcon,
  Today as TodayIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, subMonths, isSameDay, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

// Sample data - replace with API calls
const sampleAttendanceData = [
  {
    id: 1,
    date: '2023-09-01',
    status: 'present',
    subject: 'Mathematics',
    class: 'Class 10A',
    time: '09:00 AM - 10:00 AM',
    teacher: 'Mr. Sharma'
  },
  {
    id: 2,
    date: '2023-09-01',
    status: 'absent',
    subject: 'Science',
    class: 'Class 10A',
    time: '10:15 AM - 11:15 AM',
    teacher: 'Ms. Patel'
  },
  {
    id: 3,
    date: '2023-09-02',
    status: 'present',
    subject: 'English',
    class: 'Class 10A',
    time: '08:30 AM - 09:30 AM',
    teacher: 'Ms. Johnson'
  },
  {
    id: 4,
    date: '2023-09-02',
    status: 'late',
    subject: 'History',
    class: 'Class 10A',
    time: '10:00 AM - 11:00 AM',
    teacher: 'Mr. Thompson'
  },
  {
    id: 5,
    date: '2023-09-03',
    status: 'present',
    subject: 'Mathematics',
    class: 'Class 10A',
    time: '09:00 AM - 10:00 AM',
    teacher: 'Mr. Sharma'
  },
  {
    id: 6,
    date: '2023-09-03',
    status: 'present',
    subject: 'Physics',
    class: 'Class 10A',
    time: '11:30 AM - 12:30 PM',
    teacher: 'Dr. Gupta'
  },
  {
    id: 7,
    date: '2023-09-04',
    status: 'absent',
    subject: 'Chemistry',
    class: 'Class 10A',
    time: '09:00 AM - 10:00 AM',
    teacher: 'Ms. Kapoor'
  },
  {
    id: 8,
    date: '2023-09-04',
    status: 'present',
    subject: 'Biology',
    class: 'Class 10A',
    time: '10:15 AM - 11:15 AM',
    teacher: 'Dr. Reddy'
  },
  {
    id: 9,
    date: '2023-09-05',
    status: 'present',
    subject: 'Mathematics',
    class: 'Class 10A',
    time: '09:00 AM - 10:00 AM',
    teacher: 'Mr. Sharma'
  },
  {
    id: 10,
    date: '2023-09-05',
    status: 'present',
    subject: 'Computer Science',
    class: 'Class 10A',
    time: '11:30 AM - 12:30 PM',
    teacher: 'Mr. Kumar'
  },
];

const AttendanceView = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  // Get unique subjects for filter
  const subjects = ['all', ...new Set(sampleAttendanceData.map(item => item.subject))];
  
  // Get unique statuses for filter
  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
    { value: 'excused', label: 'Excused' }
  ];

  // Calculate attendance statistics
  const calculateStats = () => {
    const totalClasses = sampleAttendanceData.length;
    const presentCount = sampleAttendanceData.filter(item => item.status === 'present' || item.status === 'late').length;
    const absentCount = sampleAttendanceData.filter(item => item.status === 'absent').length;
    const lateCount = sampleAttendanceData.filter(item => item.status === 'late').length;
    const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;
    
    return {
      totalClasses,
      presentCount,
      absentCount,
      lateCount,
      attendancePercentage
    };
  };

  const stats = calculateStats();

  // Filter attendance data based on filters
  const filteredData = sampleAttendanceData.filter(record => {
    const matchesSearch = 
      record.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.class.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSubject = selectedSubject === 'all' || record.subject === selectedSubject;
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    
    let matchesDate = true;
    if (selectedDate) {
      matchesDate = isSameDay(new Date(record.date), selectedDate);
    }
    
    return matchesSearch && matchesSubject && matchesStatus && matchesDate;
  });

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle filter changes
  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setPage(0);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setPage(0);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPage(0);
  };

  const clearDateFilter = () => {
    setSelectedDate(null);
  };

  // Handle view mode change
  const handleViewModeChange = (event, newValue) => {
    setViewMode(newValue);
  };

  // Handle month change for calendar view
  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  // Get status chip component
  const getStatusChip = (status) => {
    switch (status) {
      case 'present':
        return (
          <Chip 
            icon={<CheckCircleIcon />} 
            label="Present" 
            color="success" 
            size="small" 
            variant="outlined"
          />
        );
      case 'absent':
        return (
          <Chip 
            icon={<CancelIcon />} 
            label="Absent" 
            color="error" 
            size="small" 
            variant="outlined"
          />
        );
      case 'late':
        return (
          <Chip 
            icon={<HelpOutlineIcon />} 
            label="Late" 
            color="warning" 
            size="small" 
            variant="outlined"
          />
        );
      case 'excused':
        return (
          <Chip 
            icon={<EventIcon />} 
            label="Excused" 
            color="info" 
            size="small" 
            variant="outlined"
          />
        );
      default:
        return (
          <Chip 
            icon={<HelpOutlineIcon />} 
            label="Unknown" 
            size="small" 
            variant="outlined"
          />
        );
    }
  };

  // Generate calendar days for the selected month
  const generateCalendarDays = () => {
    const start = startOfMonth(selectedMonth);
    const end = endOfMonth(selectedMonth);
    const days = [];
    let currentDate = start;
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < currentDate.getDay(); i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add cells for each day of the month
    while (currentDate <= end) {
      const date = new Date(currentDate);
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayAttendance = sampleAttendanceData.filter(item => item.date === dateStr);
      const presentCount = dayAttendance.filter(item => item.status === 'present' || item.status === 'late').length;
      const totalCount = dayAttendance.length;
      const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
      
      days.push(
        <div 
          key={dateStr} 
          className={`calendar-day ${isSameDay(date, new Date()) ? 'today' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="day-number">{date.getDate()}</div>
          {totalCount > 0 && (
            <div className="attendance-indicator">
              <div 
                className="attendance-bar" 
                style={{
                  height: `${attendancePercentage}%`,
                  backgroundColor: attendancePercentage >= 80 ? '#4caf50' : 
                                   attendancePercentage >= 50 ? '#ff9800' : '#f44336'
                }}
              />
              <span className="attendance-percentage">{attendancePercentage}%</span>
            </div>
          )}
        </div>
      );
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  // Get filtered data for the selected date in calendar view
  const getFilteredDataForDate = (date) => {
    if (!date) return [];
    
    return sampleAttendanceData.filter(record => {
      const recordDate = new Date(record.date);
      return isSameDay(recordDate, date);
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Attendance
        </Typography>
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Classes
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h4" component="div">
                    {stats.totalClasses}
                  </Typography>
                  <SchoolIcon color="primary" sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Present
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h4" component="div" color="success.main">
                    {stats.presentCount}
                  </Typography>
                  <CheckCircleIcon color="success" sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Absent
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h4" component="div" color="error.main">
                    {stats.absentCount}
                  </Typography>
                  <CancelIcon color="error" sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Attendance Rate
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" component="div">
                      {stats.attendancePercentage}%
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {stats.presentCount} of {stats.totalClasses} classes
                    </Typography>
                  </Box>
                  <Box sx={{ width: '60px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="caption" color="textSecondary" sx={{ mr: 1 }}>
                        {stats.attendancePercentage}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={stats.attendancePercentage} 
                      color={
                        stats.attendancePercentage >= 80 ? 'success' : 
                        stats.attendancePercentage >= 50 ? 'warning' : 'error'
                      }
                      sx={{ height: 8, borderRadius: 5 }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 2 }}>
          <TextField
            placeholder="Search by subject, class, or teacher..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1, minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Subject</InputLabel>
            <Select
              value={selectedSubject}
              onChange={handleSubjectChange}
              label="Subject"
              startAdornment={
                <InputAdornment position="start">
                  <SubjectIcon fontSize="small" />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All Subjects</MenuItem>
              {subjects.filter(subject => subject !== 'all').map((subject) => (
                <MenuItem key={subject} value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              label="Status"
            >
              {statuses.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  size="small" 
                  sx={{ minWidth: 200 }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <TodayIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: selectedDate ? (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={clearDateFilter}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="end">
                        <CalendarMonthIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </LocalizationProvider>
          
          <Box sx={{ display: 'flex', ml: 'auto' }}>
            <Tabs
              value={viewMode}
              onChange={handleViewModeChange}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
                '& .Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white !important',
                  borderRadius: '4px',
                },
              }}
            >
              <Tab 
                value="list" 
                label="List View" 
                sx={{ 
                  textTransform: 'none',
                  minHeight: '36px',
                  py: 0,
                  px: 2,
                  fontSize: '0.875rem',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  '&.Mui-selected': {
                    borderColor: 'primary.main',
                  },
                }}
              />
              <Tab 
                value="calendar" 
                label="Calendar View" 
                sx={{ 
                  textTransform: 'none',
                  minHeight: '36px',
                  py: 0,
                  px: 2,
                  fontSize: '0.875rem',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderLeft: 'none',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  '&.Mui-selected': {
                    borderColor: 'primary.main',
                    borderLeft: '1px solid',
                  },
                }}
              />
            </Tabs>
          </Box>
        </Box>
      </Paper>

      {viewMode === 'list' ? (
        // List View
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                  <TableCell>Date</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Teacher</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((record) => (
                      <TableRow 
                        key={record.id} 
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EventIcon color="action" sx={{ mr: 1, fontSize: 20 }} />
                            {format(new Date(record.date), 'MMM d, yyyy')}
                          </Box>
                        </TableCell>
                        <TableCell>{record.subject}</TableCell>
                        <TableCell>{record.class}</TableCell>
                        <TableCell>{record.time}</TableCell>
                        <TableCell>{record.teacher}</TableCell>
                        <TableCell align="center">
                          {getStatusChip(record.status)}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <EventIcon color="disabled" sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
                        <Typography variant="subtitle1" color="textSecondary">
                          No attendance records found
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Try adjusting your filters or search term
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          {filteredData.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ borderTop: '1px solid', borderColor: 'divider' }}
            />
          )}
        </Paper>
      ) : (
        // Calendar View
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" component="h2">
              {format(selectedMonth, 'MMMM yyyy')}
            </Typography>
            <Box>
              <IconButton 
                onClick={() => handleMonthChange(subMonths(selectedMonth, 1))}
                size="small"
                sx={{ mr: 1 }}
              >
                <ArrowDropUpIcon />
              </IconButton>
              <IconButton 
                onClick={() => handleMonthChange(new Date())}
                size="small"
                variant="outlined"
                sx={{ mr: 1, border: '1px solid', borderColor: 'divider' }}
              >
                <TodayIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => handleMonthChange(addMonths(selectedMonth, 1))}
                size="small"
              >
                <ArrowDropDownIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Box className="calendar-container" sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 1,
            mb: 3
          }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <Box 
                key={day} 
                className="calendar-header"
                sx={{ 
                  textAlign: 'center', 
                  fontWeight: 'bold', 
                  py: 1,
                  bgcolor: 'action.hover',
                  borderRadius: 1
                }}
              >
                {day}
              </Box>
            ))}
            {generateCalendarDays()}
          </Box>
          
          {selectedDate && (
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              {getFilteredDataForDate(selectedDate).length > 0 ? (
                <Box>
                  {getFilteredDataForDate(selectedDate).map((record) => (
                    <Box 
                      key={record.id} 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        p: 1.5,
                        mb: 1,
                        borderRadius: 1,
                        bgcolor: 'background.default',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        }
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2">
                          {record.subject}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {record.time} • {record.teacher}
                        </Typography>
                      </Box>
                      {getStatusChip(record.status)}
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <EventNoteIcon color="disabled" sx={{ fontSize: 48, opacity: 0.5, mb: 1 }} />
                  <Typography variant="body1" color="textSecondary">
                    No classes scheduled for this day
                  </Typography>
                </Box>
              )}
            </Paper>
          )}
        </Box>
      )}
      
      {/* Add some custom styles */}
      <style jsx global>{`
        .calendar-day {
          aspect-ratio: 1;
          border: 1px solid #e0e0e0;
          padding: 4px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
          background-color: white;
          border-radius: 4px;
        }
        
        .calendar-day:hover {
          background-color: #f5f5f5;
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .calendar-day.today {
          border: 2px solid #1976d2;
          background-color: #e3f2fd;
        }
        
        .calendar-day.empty {
          background-color: #fafafa;
          border: 1px dashed #e0e0e0;
          cursor: default;
        }
        
        .day-number {
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .attendance-indicator {
          position: absolute;
          bottom: 4px;
          left: 4px;
          right: 4px;
          height: 20px;
          background-color: #f5f5f5;
          border-radius: 2px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .attendance-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          opacity: 0.3;
          transition: height 0.3s;
        }
        
        .attendance-percentage {
          position: relative;
          font-size: 10px;
          font-weight: bold;
          z-index: 1;
        }
      `}</style>
    </Box>
  );
};

export default AttendanceView;
