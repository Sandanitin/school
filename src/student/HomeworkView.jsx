import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Error as ErrorIcon,
  Close as CloseIcon,
  AttachFile as AttachFileIcon,
  InsertDriveFile as InsertDriveFileIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarTodayIcon,
  School as SchoolIcon,
  Subject as SubjectIcon
} from '@mui/icons-material';
import { format, isBefore, isAfter, parseISO } from 'date-fns';

const HomeworkView = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = React.useRef(null);

  // Sample data - replace with API calls
  const [homeworks, setHomeworks] = useState([
    {
      id: 1,
      title: 'Algebra Homework #5',
      subject: 'Mathematics',
      description: 'Complete exercises 1-10 on page 45. Show all your work for full credit.',
      dueDate: '2023-09-15T23:59:00',
      status: 'pending', // pending, submitted, late, graded
      submission: null,
      grade: null,
      feedback: '',
      attachments: [
        { name: 'worksheet.pdf', type: 'pdf', size: '2.4 MB' },
        { name: 'chapter_3.pdf', type: 'pdf', size: '3.1 MB' }
      ]
    },
    {
      id: 2,
      title: 'Science Project',
      subject: 'Science',
      description: 'Prepare a 5-minute presentation about the water cycle. Include diagrams and examples.',
      dueDate: '2023-09-10T23:59:00',
      status: 'submitted',
      submission: {
        text: 'I\'ve completed the presentation and attached the slides.',
        file: { name: 'water_cycle_presentation.pptx', type: 'pptx', size: '5.2 MB' },
        submittedAt: '2023-09-09T14:30:00',
        isLate: false
      },
      grade: null,
      feedback: 'Submission received. Will be graded soon.',
      attachments: [
        { name: 'project_guidelines.pdf', type: 'pdf', size: '1.8 MB' }
      ]
    },
    {
      id: 3,
      title: 'Book Report - To Kill a Mockingbird',
      subject: 'English',
      description: 'Write a 1000-word book report analyzing the themes and characters in To Kill a Mockingbird.',
      dueDate: '2023-09-05T23:59:00',
      status: 'graded',
      submission: {
        text: 'Attached is my book report on To Kill a Mockingbird.',
        file: { name: 'book_report_mockingbird.docx', type: 'docx', size: '1.2 MB' },
        submittedAt: '2023-09-06T10:15:00',
        isLate: true
      },
      grade: 'A-',
      feedback: 'Excellent analysis of the themes, but could have included more about character development. Well done overall!',
      attachments: [
        { name: 'rubric.pdf', type: 'pdf', size: '0.8 MB' }
      ]
    }
  ]);

  const filteredHomeworks = homeworks.filter(hw => {
    if (activeTab === 'all') return true;
    return hw.status === activeTab;
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleViewHomework = (homework) => {
    setSelectedHomework(homework);
    setSubmissionText(homework.submission?.text || '');
    setSelectedFile(homework.submission?.file || null);
  };

  const handleCloseDialog = () => {
    setSelectedHomework(null);
    setSubmissionText('');
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        type: file.name.split('.').pop().toLowerCase(),
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
      });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if ((!submissionText.trim() && !selectedFile) || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedHomeworks = homeworks.map(hw => {
        if (hw.id === selectedHomework.id) {
          const isLate = isAfter(new Date(), parseISO(hw.dueDate));
          return {
            ...hw,
            status: 'submitted',
            submission: {
              text: submissionText,
              file: selectedFile,
              submittedAt: new Date().toISOString(),
              isLate
            },
            feedback: isLate ? 'Submitted late. Will be graded soon.' : 'Submitted. Will be graded soon.'
          };
        }
        return hw;
      });
      
      setHomeworks(updatedHomeworks);
      setIsSubmitting(false);
      handleCloseDialog();
    }, 1500);
  };

  const getStatusChip = (homework) => {
    const status = homework.status;
    const isPastDue = isAfter(new Date(), parseISO(homework.dueDate)) && status === 'pending';
    
    if (isPastDue) {
      return (
        <Chip 
          icon={<ErrorIcon />} 
          label="Past Due" 
          color="error" 
          size="small" 
          variant="outlined"
        />
      );
    }
    
    switch(status) {
      case 'submitted':
        return (
          <Chip 
            icon={<CheckCircleIcon />} 
            label="Submitted" 
            color="success" 
            size="small" 
            variant="outlined"
          />
        );
      case 'graded':
        return (
          <Chip 
            label={`Graded: ${homework.grade}`} 
            color="primary" 
            size="small"
          />
        );
      default:
        return (
          <Chip 
            icon={<AccessTimeIcon />} 
            label="Pending" 
            color="default" 
            size="small" 
            variant="outlined"
          />
        );
    }
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf':
        return <DescriptionIcon color="error" />;
      case 'docx':
      case 'doc':
        return <DescriptionIcon color="primary" />;
      case 'pptx':
      case 'ppt':
        return <DescriptionIcon color="warning" />;
      default:
        return <InsertDriveFileIcon />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          My Homework
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<SchoolIcon />}
            onClick={() => {
              // Navigate to subjects or filter by subject
            }}
            sx={{ mr: 1 }}
          >
            Subjects
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<CalendarTodayIcon />}
            onClick={() => {
              // Show calendar view
            }}
          >
            Calendar
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon sx={{ mr: 1, fontSize: 20 }} />
                Pending
                <Chip 
                  label={homeworks.filter(hw => hw.status === 'pending' && !isAfter(new Date(), parseISO(hw.dueDate))).length} 
                  size="small" 
                  sx={{ ml: 1 }} 
                />
              </Box>
            } 
            value="pending" 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon sx={{ mr: 1, fontSize: 20 }} />
                Submitted
                <Chip 
                  label={homeworks.filter(hw => hw.status === 'submitted').length} 
                  size="small" 
                  sx={{ ml: 1 }} 
                  color="primary"
                />
              </Box>
            } 
            value="submitted" 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AssignmentIcon sx={{ mr: 1, fontSize: 20 }} />
                Graded
                <Chip 
                  label={homeworks.filter(hw => hw.status === 'graded').length} 
                  size="small" 
                  sx={{ ml: 1 }} 
                  color="success"
                />
              </Box>
            } 
            value="graded" 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ErrorIcon sx={{ mr: 1, fontSize: 20 }} />
                Late
                <Chip 
                  label={homeworks.filter(hw => 
                    (hw.status === 'pending' && isAfter(new Date(), parseISO(hw.dueDate))) || 
                    (hw.submission?.isLate)
                  ).length} 
                  size="small" 
                  sx={{ ml: 1 }} 
                  color="error"
                />
              </Box>
            } 
            value="late" 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SubjectIcon sx={{ mr: 1, fontSize: 20 }} />
                All
                <Chip 
                  label={homeworks.length} 
                  size="small" 
                  sx={{ ml: 1 }} 
                  color="default"
                />
              </Box>
            } 
            value="all" 
          />
        </Tabs>
        <Divider />
        
        {filteredHomeworks.length > 0 ? (
          <List>
            {filteredHomeworks.map((homework, index) => (
              <React.Fragment key={homework.id}>
                <ListItem 
                  button 
                  onClick={() => handleViewHomework(homework)}
                  sx={{
                    '&:hover': { bgcolor: 'action.hover' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    py: 2,
                  }}
                >
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1 }}>
                          {homework.title}
                        </Typography>
                        {getStatusChip(homework)}
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <SubjectIcon sx={{ fontSize: 16, mr: 0.5, opacity: 0.7 }} />
                        {homework.subject}
                        <Box component="span" sx={{ mx: 1 }}>•</Box>
                        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5, opacity: 0.7 }} />
                          Due: {format(parseISO(homework.dueDate), 'MMM d, yyyy h:mm a')}
                        </Box>
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {homework.description.length > 150 
                          ? `${homework.description.substring(0, 150)}...` 
                          : homework.description}
                      </Typography>
                      
                      {homework.attachments && homework.attachments.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                          {homework.attachments.map((file, idx) => (
                            <Chip
                              key={idx}
                              icon={getFileIcon(file.type)}
                              label={`${file.name} (${file.size})`}
                              variant="outlined"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle file download
                              }}
                              sx={{ cursor: 'pointer' }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 2 }}>
                      {homework.grade && (
                        <Chip 
                          label={`Grade: ${homework.grade}`} 
                          color="primary" 
                          size="small" 
                          sx={{ mb: 1, fontWeight: 'bold' }}
                        />
                      )}
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewHomework(homework);
                        }}
                      >
                        {homework.status === 'pending' ? 'Submit' : 'View'}
                      </Button>
                    </Box>
                  </Box>
                </ListItem>
                {index < filteredHomeworks.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <AssignmentIcon sx={{ fontSize: 60, opacity: 0.3, mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No {activeTab === 'all' ? '' : activeTab} homework found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {activeTab === 'pending' 
                ? 'All caught up! No pending homework.' 
                : activeTab === 'submitted'
                ? 'No submitted homework to show.'
                : activeTab === 'graded'
                ? 'No graded homework yet.'
                : activeTab === 'late'
                ? 'No late homework. Keep it up!'
                : 'No homework assigned yet.'}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Homework Submission Dialog */}
      <Dialog 
        open={!!selectedHomework} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6">{selectedHomework?.title}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {selectedHomework?.subject} • Due: {selectedHomework && format(parseISO(selectedHomework.dueDate), 'MMM d, yyyy h:mm a')}
              </Typography>
            </Box>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              DESCRIPTION
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {selectedHomework?.description}
            </Typography>
          </Box>
          
          {selectedHomework?.attachments && selectedHomework.attachments.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                ATTACHED FILES
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedHomework.attachments.map((file, idx) => (
                  <Chip
                    key={idx}
                    icon={getFileIcon(file.type)}
                    label={`${file.name} (${file.size})`}
                    variant="outlined"
                    onClick={() => {
                      // Handle file download
                    }}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>
          )}
          
          {selectedHomework?.submission ? (
            <Box sx={{ 
              p: 2, 
              bgcolor: 'action.hover', 
              borderRadius: 1,
              borderLeft: '4px solid',
              borderColor: selectedHomework.status === 'graded' ? 'success.main' : 'primary.main'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Your Submission
                </Typography>
                <Chip 
                  label={`Submitted on ${format(parseISO(selectedHomework.submission.submittedAt), 'MMM d, yyyy h:mm a')}`} 
                  size="small" 
                  color={selectedHomework.submission.isLate ? 'error' : 'default'}
                  variant="outlined"
                />
              </Box>
              
              {selectedHomework.submission.text && (
                <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {selectedHomework.submission.text}
                  </Typography>
                </Box>
              )}
              
              {selectedHomework.submission.file && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 1, 
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    flex: 1
                  }}>
                    {getFileIcon(selectedHomework.submission.file.type)}
                    <Box sx={{ ml: 1, overflow: 'hidden' }}>
                      <Typography variant="body2" noWrap>
                        {selectedHomework.submission.file.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedHomework.submission.file.size}
                      </Typography>
                    </Box>
                  </Box>
                  <Button 
                    size="small" 
                    startIcon={<DownloadIcon />}
                    sx={{ ml: 1 }}
                  >
                    Download
                  </Button>
                </Box>
              )}
              
              {selectedHomework.grade && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Grade: {selectedHomework.grade}
                    </Typography>
                    <Chip 
                      label="Graded" 
                      size="small" 
                      color="success"
                      variant="outlined"
                    />
                  </Box>
                  {selectedHomework.feedback && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                        {selectedHomework.feedback}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
              
              {!selectedHomework.grade && selectedHomework.feedback && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    <strong>Note from teacher:</strong> {selectedHomework.feedback}
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                YOUR SUBMISSION
              </Typography>
              
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Type your submission here..."
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Add files (optional)
              </Typography>
              
              {selectedFile ? (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 1, 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 2
                }}>
                  {getFileIcon(selectedFile.type)}
                  <Box sx={{ ml: 1, flex: 1, overflow: 'hidden' }}>
                    <Typography variant="body2" noWrap>
                      {selectedFile.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedFile.size}
                    </Typography>
                  </Box>
                  <IconButton size="small" onClick={handleRemoveFile}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                  sx={{ mb: 2 }}
                >
                  Upload File
                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </Button>
              )}
              
              {selectedHomework && isAfter(new Date(), parseISO(selectedHomework.dueDate)) && (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 1.5, 
                  bgcolor: 'error.light', 
                  borderRadius: 1,
                  mb: 2
                }}>
                  <ErrorIcon color="error" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="error">
                    This assignment is past due. Late submissions may be subject to penalties.
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={handleCloseDialog} color="inherit">
            {selectedHomework?.submission ? 'Close' : 'Cancel'}
          </Button>
          
          {(!selectedHomework?.submission || selectedHomework.status === 'pending') && (
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              disabled={isSubmitting || (!submissionText.trim() && !selectedFile)}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : <UploadIcon />}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomeworkView;
