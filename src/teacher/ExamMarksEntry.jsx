import React, { useState } from 'react';
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
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import { Save, Refresh, FileDownload } from '@mui/icons-material';

const ExamMarksEntry = () => {
  // Sample data - replace with actual data from your backend
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', rollNumber: '001', marks: { math: '', science: '', english: '' } },
    { id: 2, name: 'Jane Smith', rollNumber: '002', marks: { math: '', science: '', english: '' } },
    { id: 3, name: 'Alex Johnson', rollNumber: '003', marks: { math: '', science: '', english: '' } },
  ]);

  const [filters, setFilters] = useState({
    class: '',
    section: '',
    examType: '',
    subject: ''
  });

  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const sections = ['A', 'B', 'C', 'D'];
  const examTypes = ['Mid Term', 'Final', 'Quiz 1', 'Quiz 2'];
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography'];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMarksChange = (studentId, subject, value) => {
    // Validate marks (0-100)
    if ((value === '' || (Number(value) >= 0 && Number(value) <= 100)) && value.length <= 3) {
      setStudents(students.map(student => 
        student.id === studentId 
          ? { 
              ...student, 
              marks: { 
                ...student.marks, 
                [subject.toLowerCase()]: value 
              } 
            } 
          : student
      ));
    }
  };

  const handleSaveMarks = () => {
    // Implement save functionality
    console.log('Saving marks:', students);
    // Here you would typically make an API call to save the marks
  };

  const handleReset = () => {
    // Reset all marks to empty
    setStudents(students.map(student => ({
      ...student,
      marks: Object.keys(student.marks).reduce((acc, subject) => ({
        ...acc,
        [subject]: ''
      }), {})
    })));
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting marks');
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Exam Marks Entry</Typography>
      
      {/* Filters */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Class</InputLabel>
              <Select
                name="class"
                value={filters.class}
                onChange={handleFilterChange}
                label="Class"
              >
                {classes.map(cls => (
                  <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Section</InputLabel>
              <Select
                name="section"
                value={filters.section}
                onChange={handleFilterChange}
                label="Section"
              >
                {sections.map(section => (
                  <MenuItem key={section} value={section}>{section}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Exam Type</InputLabel>
              <Select
                name="examType"
                value={filters.examType}
                onChange={handleFilterChange}
                label="Exam Type"
              >
                {examTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Subject</InputLabel>
              <Select
                name="subject"
                value={filters.subject}
                onChange={handleFilterChange}
                label="Subject"
              >
                {subjects.map(subject => (
                  <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Marks Entry Table */}
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No.</TableCell>
                <TableCell>Student Name</TableCell>
                {subjects.map(subject => (
                  <TableCell key={subject} align="center">
                    {subject}
                    <Typography variant="caption" display="block">(Max: 100)</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  {subjects.map(subject => (
                    <TableCell key={`${student.id}-${subject}`}>
                      <TextField
                        type="number"
                        size="small"
                        fullWidth
                        value={student.marks[subject.toLowerCase()] || ''}
                        onChange={(e) => handleMarksChange(student.id, subject.toLowerCase(), e.target.value)}
                        inputProps={{ 
                          min: 0, 
                          max: 100,
                          step: '0.01'
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Action Buttons */}
      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          variant="outlined"
          startIcon={<FileDownload />}
          onClick={handleExport}
        >
          Export
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={handleSaveMarks}
        >
          Save Marks
        </Button>
      </Box>
    </Box>
  );
};

export default ExamMarksEntry;
