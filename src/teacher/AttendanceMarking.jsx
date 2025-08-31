import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, Typography, Box } from '@mui/material';

const AttendanceMarking = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', rollNumber: '001', isPresent: false },
    { id: 2, name: 'Jane Smith', rollNumber: '002', isPresent: false },
  ]);

  const toggleAttendance = (id) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, isPresent: !student.isPresent } : student
    ));
  };

  const handleSubmit = () => {
    // Handle attendance submission
    console.log('Attendance submitted:', students);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Mark Attendance</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Roll No.</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Present</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={student.isPresent}
                    onChange={() => toggleAttendance(student.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Attendance
        </Button>
      </Box>
    </Box>
  );
};

export default AttendanceMarking;
