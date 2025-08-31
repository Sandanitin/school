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
  DialogTitle
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
  FaPlus
} from 'react-icons/fa';

const Homework = () => {
  const [tabValue, setTabValue] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Mock data for homework
  const homeworkData = [
    {
      id: 1,
      title: 'Algebra Practice Problems',
      subject: 'Mathematics',
      dueDate: '2025-09-05',
      status: 'pending',
      description: 'Complete exercises 1-10 from chapter 5. Show all your work.',
      attachments: ['worksheet.pdf'],
      submitted: false
    },
    {
      id: 2,
      title: 'Science Lab Report',
      subject: 'Science',
      dueDate: '2025-09-10',
      status: 'submitted',
      description: 'Write a lab report on the recent chemistry experiment.',
      attachments: ['lab_guidelines.pdf'],
      submitted: true,
      submissionDate: '2025-09-08',
      grade: 'A-',
      feedback: 'Good work! Make sure to include more detailed observations next time.'
    },
    {
      id: 3,
      title: 'History Essay',
      subject: 'History',
      dueDate: '2025-09-15',
      status: 'pending',
      description: 'Write a 1000-word essay on the Industrial Revolution.',
      attachments: ['essay_rubric.pdf'],
      submitted: false
    },
    {
      id: 4,
      title: 'Reading Assignment',
      subject: 'English',
      dueDate: '2025-09-03',
      status: 'overdue',
      description: 'Read chapters 1-3 of "To Kill a Mockingbird" and write a summary.',
      attachments: ['reading_guide.docx'],
      submitted: false
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Handle homework submission
    console.log('Submitting homework with file:', selectedFile);
    setOpenDialog(false);
    setSelectedFile(null);
  };

  const filteredHomework = homeworkData.filter(homework => {
    if (tabValue === 'all') return true;
    if (tabValue === 'pending') return homework.status === 'pending';
    if (tabValue === 'submitted') return homework.status === 'submitted';
    if (tabValue === 'overdue') return homework.status === 'overdue';
    return true;
  });

  const getStatusChip = (status) => {
    const statusMap = {
      pending: { label: 'Pending', color: 'warning' },
      submitted: { label: 'Submitted', color: 'success' },
      overdue: { label: 'Overdue', color: 'error' },
      graded: { label: 'Graded', color: 'info' }
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
          <h1 className="text-2xl font-bold">My Homework</h1>
          <p className="text-gray-600">View and submit your homework assignments</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<FaPlus />}
            onClick={() => setOpenDialog(true)}
          >
            Submit Homework
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
              placeholder="Search homework..."
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
              <InputLabel>Sort By</InputLabel>
              <Select
                label="Sort By"
                startAdornment={
                  <InputAdornment position="start">
                    <FaSortAmountDown className="text-gray-400 mr-2" />
                  </InputAdornment>
                }
              >
                <MenuItem value="dueDate">Due Date</MenuItem>
                <MenuItem value="subject">Subject</MenuItem>
                <MenuItem value="status">Status</MenuItem>
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
          <Tab label="Pending" value="pending" />
          <Tab label="Submitted" value="submitted" />
          <Tab label="Overdue" value="overdue" />
        </Tabs>
      </Box>

      {/* Homework List */}
      <div className="space-y-4">
        {filteredHomework.length > 0 ? (
          filteredHomework.map((homework) => (
            <Card key={homework.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Typography variant="h6" className="font-medium">
                          {homework.title}
                        </Typography>
                        <div className="flex items-center mt-1 space-x-2">
                          <Chip 
                            label={homework.subject} 
                            size="small" 
                            variant="outlined"
                            color="primary"
                          />
                          <div className="flex items-center text-sm text-gray-500">
                            <FaCalendarAlt className="mr-1" size={12} />
                            <span>Due: {formatDate(homework.dueDate)}</span>
                          </div>
                          {homework.status === 'submitted' && homework.grade && (
                            <div className="flex items-center text-sm text-green-600">
                              <FaCheckCircle className="mr-1" size={12} />
                              <span>Graded: {homework.grade}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        {getStatusChip(homework.status)}
                      </div>
                    </div>
                    
                    <Typography variant="body2" className="mt-3 text-gray-600">
                      {homework.description}
                    </Typography>
                    
                    {homework.attachments && homework.attachments.length > 0 && (
                      <div className="mt-3">
                        <Typography variant="caption" color="textSecondary" className="block mb-1">
                          Attachments:
                        </Typography>
                        <div className="flex flex-wrap gap-2">
                          {homework.attachments.map((file, index) => (
                            <Chip
                              key={index}
                              icon={<FaPaperclip size={14} />}
                              label={file}
                              variant="outlined"
                              size="small"
                              onClick={() => console.log('Download', file)}
                              className="cursor-pointer"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {homework.feedback && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <Typography variant="subtitle2" className="font-medium mb-1">
                          Teacher's Feedback:
                        </Typography>
                        <Typography variant="body2" className="text-gray-700">
                          {homework.feedback}
                        </Typography>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                    {!homework.submitted ? (
                      <Button 
                        variant="contained" 
                        color="primary"
                        startIcon={<FaUpload />}
                        onClick={() => setOpenDialog(true)}
                        fullWidth
                      >
                        Submit Work
                      </Button>
                    ) : (
                      <div className="text-sm text-green-600 text-center">
                        <FaCheckCircle className="inline-block mr-1" />
                        <span>Submitted on {formatDate(homework.submissionDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="text-center p-8">
            <FaBook className="mx-auto text-4xl text-gray-300 mb-4" />
            <Typography variant="h6" className="mb-2">
              {tabValue === 'all' 
                ? 'No homework assignments found' 
                : `No ${tabValue} homework assignments`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {tabValue === 'all' 
                ? 'Check back later for new assignments' 
                : 'All caught up on this category!'}
            </Typography>
          </Card>
        )}
      </div>

      {/* Submit Homework Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Homework</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <TextField
              fullWidth
              label="Assignment Title"
              variant="outlined"
              size="small"
            />
            
            <FormControl fullWidth size="small" className="mt-2">
              <InputLabel>Subject</InputLabel>
              <Select label="Subject">
                <MenuItem value="math">Mathematics</MenuItem>
                <MenuItem value="science">Science</MenuItem>
                <MenuItem value="english">English</MenuItem>
                <MenuItem value="history">History</MenuItem>
              </Select>
            </FormControl>
            
            <div className="mt-4">
              <input
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
                id="homework-file-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="homework-file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<FaUpload />}
                  fullWidth
                  className="h-24"
                >
                  {selectedFile ? selectedFile.name : 'Upload your work (PDF, DOC, TXT)'}
                </Button>
              </label>
              {selectedFile && (
                <Typography variant="caption" className="block mt-1 text-gray-500">
                  {Math.round(selectedFile.size / 1024)} KB
                </Typography>
              )}
            </div>
            
            <TextField
              fullWidth
              label="Additional Notes (Optional)"
              variant="outlined"
              multiline
              rows={3}
              className="mt-2"
            />
          </div>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={!selectedFile}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Homework;
