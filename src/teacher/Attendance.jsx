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
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box
} from '@mui/material';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaCalendarAlt,
  FaSearch
} from 'react-icons/fa';

const Attendance = () => {
  // Mock data for students
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', rollNumber: 'S001', status: 'present' },
    { id: 2, name: 'Jane Smith', rollNumber: 'S002', status: 'absent' },
    { id: 3, name: 'Mike Johnson', rollNumber: 'S003', status: 'present' },
    { id: 4, name: 'Sarah Williams', rollNumber: 'S004', status: 'present' },
    { id: 5, name: 'David Brown', rollNumber: 'S005', status: 'absent' },
  ]);

  const [classValue, setClassValue] = useState('');
  const [section, setSection] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const sections = ['A', 'B', 'C', 'D'];

  const handleStatusChange = (studentId, status) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the attendance data to your backend
    console.log('Attendance submitted:', { classValue, section, date, students });
    alert('Attendance submitted successfully!');
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Attendance</h1>
      
      {/* Filter Section */}
      <Card className="mb-6 shadow-md">
        <CardContent>
          <Typography variant="h6" className="mb-4 font-semibold">
            <FaCalendarAlt className="inline mr-2" />
            Attendance Filters
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <FormControl fullWidth size="small">
                <InputLabel>Class</InputLabel>
                <Select
                  value={classValue}
                  label="Class"
                  onChange={(e) => setClassValue(e.target.value)}
                  required
                >
                  {classes.map((cls, index) => (
                    <MenuItem key={index} value={cls}>{cls}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl fullWidth size="small">
                <InputLabel>Section</InputLabel>
                <Select
                  value={section}
                  label="Section"
                  onChange={(e) => setSection(e.target.value)}
                  required
                >
                  {sections.map((sec, index) => (
                    <MenuItem key={index} value={sec}>Section {sec}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                size="small"
                required
              />
              
              <div className="flex items-end">
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  fullWidth
                >
                  Save Attendance
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card className="shadow-md">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="font-semibold">
              Student List
            </Typography>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <TextField
                placeholder="Search students..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell>Roll No.</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant={student.status === 'present' ? 'contained' : 'outlined'}
                          color="success"
                          size="small"
                          startIcon={<FaCheckCircle />}
                          onClick={() => handleStatusChange(student.id, 'present')}
                        >
                          Present
                        </Button>
                        <Button
                          variant={student.status === 'absent' ? 'contained' : 'outlined'}
                          color="error"
                          size="small"
                          startIcon={<FaTimesCircle />}
                          onClick={() => handleStatusChange(student.id, 'absent')}
                        >
                          Absent
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
