import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip
} from '@mui/material';
import { 
  FaCalendarAlt,
  FaFilter,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle
} from 'react-icons/fa';

const StudentAttendance = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [subject, setSubject] = useState('all');
  
  // Mock data for attendance records
  const attendanceData = {
    overall: {
      present: 45,
      absent: 5,
      late: 2,
      percentage: 89.3
    },
    subjects: [
      { id: 'math', name: 'Mathematics', present: 20, absent: 2, late: 1 },
      { id: 'science', name: 'Science', present: 18, absent: 1, late: 0 },
      { id: 'english', name: 'English', present: 19, absent: 2, late: 0 },
      { id: 'history', name: 'History', present: 17, absent: 0, late: 1 },
    ],
    records: [
      { date: '2025-08-30', day: 'Monday', status: 'present', subject: 'Mathematics' },
      { date: '2025-08-29', day: 'Friday', status: 'present', subject: 'Science' },
      { date: '2025-08-28', day: 'Thursday', status: 'late', subject: 'English' },
      { date: '2025-08-27', day: 'Wednesday', status: 'present', subject: 'History' },
      { date: '2025-08-26', day: 'Tuesday', status: 'absent', subject: 'Mathematics' },
    ]
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    ...attendanceData.subjects.map(subj => ({ id: subj.id, name: subj.name }))
  ];

  const filteredRecords = subject === 'all' 
    ? attendanceData.records 
    : attendanceData.records.filter(record => record.subject === subjects.find(s => s.id === subject)?.name);

  const getStatusChip = (status) => {
    const statusConfig = {
      present: { label: 'Present', color: 'success' },
      absent: { label: 'Absent', color: 'error' },
      late: { label: 'Late', color: 'warning' },
    };
    
    const config = statusConfig[status] || { label: status, color: 'default' };
    
    return (
      <Chip 
        label={config.label}
        color={config.color}
        size="small"
        variant="outlined"
      />
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Attendance</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-md">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Total Present
                </Typography>
                <Typography variant="h5" className="text-green-600">
                  {attendanceData.overall.present}
                </Typography>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaCheckCircle size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Total Absent
                </Typography>
                <Typography variant="h5" className="text-red-600">
                  {attendanceData.overall.absent}
                </Typography>
              </div>
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <FaTimesCircle size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Late Arrivals
                </Typography>
                <Typography variant="h5" className="text-amber-600">
                  {attendanceData.overall.late}
                </Typography>
              </div>
              <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                <FaInfoCircle size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Attendance %
                </Typography>
                <Typography variant="h5" className="text-blue-600">
                  {attendanceData.overall.percentage}%
                </Typography>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FaChartLine size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters */}
      <Card className="shadow-md mb-6">
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex items-center">
              <FaFilter className="text-gray-500 mr-2" />
              <Typography variant="subtitle1" className="font-medium">
                Filter By:
              </Typography>
            </div>
            
            <FormControl size="small" className="min-w-[180px]">
              <InputLabel>Month</InputLabel>
              <Select
                value={month}
                label="Month"
                onChange={(e) => setMonth(e.target.value)}
              >
                {months.map((m, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl size="small" className="min-w-[180px]">
              <InputLabel>Subject</InputLabel>
              <Select
                value={subject}
                label="Subject"
                onChange={(e) => setSubject(e.target.value)}
              >
                {subjects.map((subj) => (
                  <MenuItem key={subj.id} value={subj.id}>
                    {subj.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </CardContent>
      </Card>
      
      {/* Subject-wise Summary */}
      <Card className="shadow-md mb-6">
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Subject-wise Summary
          </Typography>
          <div className="overflow-x-auto">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="bg-gray-100">
                    <TableCell>Subject</TableCell>
                    <TableCell align="right">Present</TableCell>
                    <TableCell align="right">Absent</TableCell>
                    <TableCell align="right">Late</TableCell>
                    <TableCell align="right">Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData.subjects.map((subj) => {
                    const total = subj.present + subj.absent + subj.late;
                    const percentage = total > 0 ? ((subj.present / total) * 100).toFixed(1) : 0;
                    
                    return (
                      <TableRow key={subj.id} hover>
                        <TableCell>{subj.name}</TableCell>
                        <TableCell align="right">{subj.present}</TableCell>
                        <TableCell align="right">{subj.absent}</TableCell>
                        <TableCell align="right">{subj.late}</TableCell>
                        <TableCell align="right">
                          <span className={percentage < 75 ? 'text-red-600 font-medium' : ''}>
                            {percentage}%
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Detailed Records */}
      <Card className="shadow-md">
        <CardContent>
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="text-blue-500 mr-2" />
            <Typography variant="h6" className="font-semibold">
              Attendance Records - {months[month - 1]}
            </Typography>
          </div>
          
          {filteredRecords.length > 0 ? (
            <div className="space-y-4">
              {filteredRecords.map((record, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mr-4">
                    {new Date(record.date).getDate()}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{record.day}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(record.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{record.subject}</span>
                        {getStatusChip(record.status)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Box className="text-center py-8 text-gray-500">
              <FaCalendarAlt className="mx-auto text-4xl mb-2 text-gray-300" />
              <p>No attendance records found for the selected filters</p>
            </Box>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAttendance;
