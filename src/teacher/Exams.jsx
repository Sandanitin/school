import React, { useState } from 'react';
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
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
  Chip,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  FaSearch, 
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaUsers,
  FaFilePdf,
  FaFileExcel,
  FaPrint
} from 'react-icons/fa';

const Exams = () => {
  const [tabValue, setTabValue] = useState('upcoming');
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Mock data for exams
  const examsData = [
    {
      id: 1,
      title: 'Mid-Term Examination',
      class: '10th Grade',
      section: 'A',
      subject: 'Mathematics',
      date: '2025-09-15',
      startTime: '09:00',
      endTime: '12:00',
      type: 'Mid Term',
      status: 'upcoming',
      totalMarks: 100,
      passingMarks: 35,
      description: 'Covers chapters 1-5 from the textbook.'
    },
    {
      id: 2,
      title: 'Unit Test - Physics',
      class: '11th Grade',
      section: 'B',
      subject: 'Physics',
      date: '2025-09-20',
      startTime: '10:30',
      endTime: '12:30',
      type: 'Unit Test',
      status: 'upcoming',
      totalMarks: 50,
      passingMarks: 18,
      description: 'Kinematics and Laws of Motion'
    },
    {
      id: 3,
      title: 'Final Examination',
      class: '12th Grade',
      section: 'Science',
      subject: 'Chemistry',
      date: '2025-09-25',
      startTime: '09:00',
      endTime: '12:00',
      type: 'Final',
      status: 'upcoming',
      totalMarks: 100,
      passingMarks: 35,
      description: 'Complete syllabus'
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredExams = examsData.filter(exam => {
    if (tabValue === 'all') return true;
    return exam.status === tabValue;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusChip = (status) => {
    const statusMap = {
      'upcoming': { label: 'Upcoming', color: 'primary' },
      'ongoing': { label: 'Ongoing', color: 'warning' },
      'completed': { label: 'Completed', color: 'success' },
      'cancelled': { label: 'Cancelled', color: 'error' }
    };

    const statusInfo = statusMap[status] || { label: status, color: 'default' };
    
    return (
      <Chip 
        label={statusInfo.label}
        color={statusInfo.color}
        size="small"
        variant="outlined"
      />
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Exam Management</h1>
          <p className="text-gray-600">Schedule and manage examinations</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button 
            variant="outlined" 
            color="primary"
            startIcon={<FaFilePdf />}
            className="mr-2"
          >
            Export
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<FaPlus />}
            onClick={() => setOpenDialog(true)}
          >
            Schedule Exam
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-md mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search exams..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />
            
            <FormControl variant="outlined" size="small" className="min-w-[180px]">
              <InputLabel>Subject</InputLabel>
              <Select
                label="Subject"
                defaultValue=""
              >
                <MenuItem value="">All Subjects</MenuItem>
                <MenuItem value="math">Mathematics</MenuItem>
                <MenuItem value="physics">Physics</MenuItem>
                <MenuItem value="chemistry">Chemistry</MenuItem>
                <MenuItem value="biology">Biology</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl variant="outlined" size="small" className="min-w-[180px]">
              <InputLabel>Class</InputLabel>
              <Select
                label="Class"
                defaultValue=""
              >
                <MenuItem value="">All Classes</MenuItem>
                <MenuItem value="9">9th Grade</MenuItem>
                <MenuItem value="10">10th Grade</MenuItem>
                <MenuItem value="11">11th Grade</MenuItem>
                <MenuItem value="12">12th Grade</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" className="min-w-[180px]">
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                defaultValue=""
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="unit">Unit Test</MenuItem>
                <MenuItem value="mid">Mid Term</MenuItem>
                <MenuItem value="final">Final</MenuItem>
                <MenuItem value="quiz">Quiz</MenuItem>
              </Select>
            </FormControl>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          aria-label="exam tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All" value="all" />
          <Tab label="Upcoming" value="upcoming" />
          <Tab label="Ongoing" value="ongoing" />
          <Tab label="Completed" value="completed" />
          <Tab label="Cancelled" value="cancelled" />
        </Tabs>
      </Box>

      {/* Exams Table */}
      <Card className="shadow-md">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell>Exam Title</TableCell>
                <TableCell>Class & Section</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Marks</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExams.length > 0 ? (
                filteredExams
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((exam) => (
                    <TableRow key={exam.id} hover>
                      <TableCell>
                        <div className="font-medium">{exam.title}</div>
                        <div className="text-xs text-gray-500">
                          {exam.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{exam.class}</div>
                        <div className="text-sm text-gray-500">Section {exam.section}</div>
                      </TableCell>
                      <TableCell>{exam.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1 text-gray-400" size={14} />
                          <span className="mr-2">{formatDate(exam.date)}</span>
                          <FaClock className="mr-1 text-gray-400" size={12} />
                          <span>{exam.startTime} - {exam.endTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={exam.type} 
                          size="small" 
                          color={exam.type === 'Final' ? 'primary' : 'default'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Total: {exam.totalMarks}</div>
                          <div className="text-gray-500">Pass: {exam.passingMarks}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusChip(exam.status)}</TableCell>
                      <TableCell align="right">
                        <div className="flex justify-end space-x-1">
                          <IconButton size="small" color="primary" title="Edit">
                            <FaEdit size={16} />
                          </IconButton>
                          <IconButton size="small" color="primary" title="View Results">
                            <FaFileExcel size={16} />
                          </IconButton>
                          <IconButton size="small" color="error" title="Delete">
                            <FaTrash size={16} />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No exams found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredExams.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="border-t"
        />
      </Card>

      {/* Schedule Exam Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Schedule New Exam</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <TextField
              fullWidth
              label="Exam Title"
              variant="outlined"
              size="small"
              className="mt-4"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormControl fullWidth size="small">
                <InputLabel>Class</InputLabel>
                <Select label="Class">
                  <MenuItem value="9">9th Grade</MenuItem>
                  <MenuItem value="10">10th Grade</MenuItem>
                  <MenuItem value="11">11th Grade</MenuItem>
                  <MenuItem value="12">12th Grade</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth size="small">
                <InputLabel>Section</InputLabel>
                <Select label="Section">
                  <MenuItem value="A">Section A</MenuItem>
                  <MenuItem value="B">Section B</MenuItem>
                  <MenuItem value="C">Section C</MenuItem>
                  <MenuItem value="D">Section D</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth size="small">
                <InputLabel>Subject</InputLabel>
                <Select label="Subject">
                  <MenuItem value="math">Mathematics</MenuItem>
                  <MenuItem value="physics">Physics</MenuItem>
                  <MenuItem value="chemistry">Chemistry</MenuItem>
                  <MenuItem value="biology">Biology</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth size="small">
                <InputLabel>Exam Type</InputLabel>
                <Select label="Exam Type">
                  <MenuItem value="unit">Unit Test</MenuItem>
                  <MenuItem value="mid">Mid Term</MenuItem>
                  <MenuItem value="final">Final</MenuItem>
                  <MenuItem value="quiz">Quiz</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                label="Exam Date"
                type="date"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              
              <div className="flex space-x-2">
                <TextField
                  fullWidth
                  label="Start Time"
                  type="time"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="End Time"
                  type="time"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              
              <TextField
                fullWidth
                label="Total Marks"
                type="number"
                size="small"
                defaultValue="100"
              />
              
              <TextField
                fullWidth
                label="Passing Marks"
                type="number"
                size="small"
                defaultValue="35"
              />
            </div>
            
            <TextField
              fullWidth
              label="Instructions"
              variant="outlined"
              multiline
              rows={3}
              className="mt-2"
              placeholder="Enter any specific instructions for the exam..."
            />
            
            <div className="mt-2">
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Enable negative marking"
              />
            </div>
            
            <div className="mt-2">
              <FormControlLabel
                control={<Switch color="primary" defaultChecked />}
                label="Publish results immediately after submission"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => setOpenDialog(false)} 
            variant="contained" 
            color="primary"
          >
            Schedule Exam
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Exams;
