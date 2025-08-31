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
  Chip,
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
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination
} from '@mui/material';
import { 
  FaSearch, 
  FaFilter, 
  FaSortAmountDown,
  FaCalendarAlt,
  FaBook,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaPaperclip,
  FaUpload,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
  FaFileImage
} from 'react-icons/fa';

const Homework = () => {
  const [tabValue, setTabValue] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Mock data for homework assignments
  const homeworkData = [
    {
      id: 1,
      title: 'Algebra Practice Problems',
      class: '10th Grade',
      section: 'A',
      subject: 'Mathematics',
      dueDate: '2025-09-05',
      status: 'assigned',
      submissions: 24,
      graded: 18,
      description: 'Complete exercises 1-10 from chapter 5. Show all your work.',
      attachments: ['worksheet.pdf'],
      createdAt: '2025-08-28'
    },
    {
      id: 2,
      title: 'Science Lab Report',
      class: '9th Grade',
      section: 'B',
      subject: 'Science',
      dueDate: '2025-09-10',
      status: 'in-progress',
      submissions: 15,
      graded: 8,
      description: 'Write a lab report on the recent chemistry experiment.',
      attachments: ['lab_guidelines.pdf'],
      createdAt: '2025-08-25'
    },
    {
      id: 3,
      title: 'History Essay',
      class: '11th Grade',
      section: 'C',
      subject: 'History',
      dueDate: '2025-09-15',
      status: 'draft',
      submissions: 0,
      graded: 0,
      description: 'Write a 1000-word essay on the Industrial Revolution.',
      attachments: ['essay_rubric.pdf'],
      createdAt: '2025-08-30'
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

  const filteredHomework = homeworkData.filter(homework => {
    if (tabValue === 'all') return true;
    return homework.status === tabValue;
  });

  const getStatusChip = (status) => {
    const statusMap = {
      'assigned': { label: 'Assigned', color: 'primary' },
      'in-progress': { label: 'In Progress', color: 'warning' },
      'draft': { label: 'Draft', color: 'default' },
      'completed': { label: 'Completed', color: 'success' }
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

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FaFilePdf className="text-red-500 mr-1" />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="text-blue-500 mr-1" />;
      case 'ppt':
      case 'pptx':
        return <FaFilePowerpoint className="text-orange-500 mr-1" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FaFileImage className="text-green-500 mr-1" />;
      default:
        return <FaFilePdf className="text-gray-500 mr-1" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Homework Management</h1>
          <p className="text-gray-600">Create and manage homework assignments</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<FaPlus />}
            onClick={() => setOpenDialog(true)}
          >
            Create Assignment
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
              placeholder="Search assignments..."
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
                <MenuItem value="science">Science</MenuItem>
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="history">History</MenuItem>
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
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          aria-label="homework tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All" value="all" />
          <Tab label="Assigned" value="assigned" />
          <Tab label="In Progress" value="in-progress" />
          <Tab label="Draft" value="draft" />
          <Tab label="Completed" value="completed" />
        </Tabs>
      </Box>

      {/* Homework Table */}
      <Card className="shadow-md">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell>Title</TableCell>
                <TableCell>Class & Section</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Submissions</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHomework.length > 0 ? (
                filteredHomework
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((homework) => (
                    <TableRow key={homework.id} hover>
                      <TableCell>
                        <div className="font-medium">{homework.title}</div>
                        <div className="text-xs text-gray-500">
                          Created: {formatDate(homework.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{homework.class}</div>
                        <div className="text-sm text-gray-500">Section {homework.section}</div>
                      </TableCell>
                      <TableCell>{homework.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1 text-gray-400" size={14} />
                          <span>{formatDate(homework.dueDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-16 mr-2">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 rounded-full" 
                                style={{ 
                                  width: `${(homework.submissions / 30) * 100}%` 
                                }} 
                              />
                            </div>
                          </div>
                          <span>{homework.submissions}/30</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {homework.graded} graded
                        </div>
                      </TableCell>
                      <TableCell>{getStatusChip(homework.status)}</TableCell>
                      <TableCell align="right">
                        <div className="flex justify-end space-x-1">
                          <IconButton size="small" color="primary" title="Edit">
                            <FaEdit size={16} />
                          </IconButton>
                          <IconButton size="small" color="primary" title="View Submissions">
                            <FaCheckCircle size={16} />
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
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No homework assignments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredHomework.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="border-t"
        />
      </Card>

      {/* Create Assignment Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Assignment</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <TextField
              fullWidth
              label="Assignment Title"
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
                  <MenuItem value="science">Science</MenuItem>
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="history">History</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            
            <TextField
              fullWidth
              label="Instructions"
              variant="outlined"
              multiline
              rows={4}
              className="mt-2"
            />
            
            <div className="mt-2">
              <input
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
                id="homework-file-upload"
                type="file"
                multiple
              />
              <label htmlFor="homework-file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<FaPaperclip />}
                >
                  Attach Files
                </Button>
              </label>
              <Typography variant="caption" display="block" className="mt-1 text-gray-500">
                PDF, DOC, DOCX, TXT (Max 10MB)
              </Typography>
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
            Create Assignment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Homework;
