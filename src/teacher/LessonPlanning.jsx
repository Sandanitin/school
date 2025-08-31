import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Chip
} from '@mui/material';
import { Add, Delete, Edit, Save, CalendarToday, Today, ViewWeek, ViewDay } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const LessonPlanning = () => {
  const [view, setView] = useState('week');
  const [date, setDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    class: '',
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    objectives: '',
    materials: '',
    activities: '',
    assessment: '',
    notes: ''
  });

  // Sample data - replace with actual data from your backend
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      class: 'Class 7A',
      date: '2025-09-01',
      startTime: '09:00',
      endTime: '10:00',
      status: 'Planned'
    },
    {
      id: 2,
      title: 'Chemical Reactions',
      subject: 'Science',
      class: 'Class 8B',
      date: '2025-09-01',
      startTime: '11:00',
      endTime: '12:00',
      status: 'Completed'
    },
  ]);

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography'];
  const classes = ['Class 1A', 'Class 1B', 'Class 2A', 'Class 2B', 'Class 3A', 'Class 3B'];
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = 8 + i;
    return `${hour < 10 ? '0' + hour : hour}:00`;
  });

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (newDate) => {
    setFormData(prev => ({
      ...prev,
      date: newDate
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Update existing lesson
      setLessons(lessons.map(lesson => 
        lesson.id === selectedLesson.id ? { ...formData, id: selectedLesson.id } : lesson
      ));
    } else {
      // Add new lesson
      const newLesson = {
        ...formData,
        id: lessons.length + 1,
        status: 'Planned'
      };
      setLessons([...lessons, newLesson]);
    }
    setOpenDialog(false);
    resetForm();
  };

  const handleEdit = (lesson) => {
    setSelectedLesson(lesson);
    setIsEditMode(true);
    setFormData({
      title: lesson.title,
      subject: lesson.subject,
      class: lesson.class,
      date: new Date(lesson.date),
      startTime: lesson.startTime,
      endTime: lesson.endTime,
      objectives: lesson.objectives || '',
      materials: lesson.materials || '',
      activities: lesson.activities || '',
      assessment: lesson.assessment || '',
      notes: lesson.notes || ''
    });
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lesson plan?')) {
      setLessons(lessons.filter(lesson => lesson.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subject: '',
      class: '',
      date: new Date(),
      startTime: '09:00',
      endTime: '10:00',
      objectives: '',
      materials: '',
      activities: '',
      assessment: '',
      notes: ''
    });
    setSelectedLesson(null);
    setIsEditMode(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Planned':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Lesson Planning</Typography>
        <Box display="flex" gap={2}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            size="small"
          >
            <ToggleButton value="day" aria-label="Day view">
              <Today />
            </ToggleButton>
            <ToggleButton value="week" aria-label="Week view">
              <ViewWeek />
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => {
              resetForm();
              setOpenDialog(true);
            }}
          >
            New Lesson Plan
          </Button>
        </Box>
      </Box>

      {/* Calendar View */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton>
              <CalendarToday color="primary" />
            </IconButton>
            <Typography variant="h6">
              {view === 'day' 
                ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
                : 'Week of ' + new Date(date.setDate(date.getDate() - date.getDay())).toLocaleDateString()
              }
            </Typography>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select Date"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        {/* Lesson List */}
        <Box>
          {lessons.map((lesson) => (
            <Paper 
              key={lesson.id} 
              elevation={2} 
              sx={{ 
                p: 2, 
                mb: 2,
                borderLeft: `4px solid ${getStatusColor(lesson.status) === 'success' ? '#4caf50' : 
                  getStatusColor(lesson.status) === 'warning' ? '#ff9800' : '#2196f3'}`
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="h6">{lesson.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {lesson.subject} | {lesson.class} | {lesson.startTime} - {lesson.endTime}
                  </Typography>
                  <Chip 
                    label={lesson.status} 
                    size="small" 
                    color={getStatusColor(lesson.status)}
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Box>
                  <IconButton size="small" onClick={() => handleEdit(lesson)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(lesson.id)} color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      </Paper>

      {/* Add/Edit Lesson Dialog */}
      {openDialog && (
        <Paper elevation={3} sx={{ p: 3, position: 'relative' }}>
          <Typography variant="h6" gutterBottom>
            {isEditMode ? 'Edit Lesson Plan' : 'Create New Lesson Plan'}
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Lesson Title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Subject</InputLabel>
                  <Select
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    label="Subject"
                    required
                  >
                    {subjects.map(subject => (
                      <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Class</InputLabel>
                  <Select
                    name="class"
                    value={formData.class}
                    onChange={handleFormChange}
                    label="Class"
                    required
                  >
                    {classes.map(cls => (
                      <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={formData.date}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth margin="normal" required />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Start Time</InputLabel>
                  <Select
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleFormChange}
                    label="Start Time"
                    required
                  >
                    {timeSlots.map(time => (
                      <MenuItem key={`start-${time}`} value={time}>{time}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>End Time</InputLabel>
                  <Select
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleFormChange}
                    label="End Time"
                    required
                  >
                    {timeSlots
                      .filter(time => time > formData.startTime)
                      .map(time => (
                        <MenuItem key={`end-${time}`} value={time}>{time}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Learning Objectives"
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleFormChange}
                  multiline
                  rows={2}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Materials Needed"
                  name="materials"
                  value={formData.materials}
                  onChange={handleFormChange}
                  multiline
                  rows={2}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Activities"
                  name="activities"
                  value={formData.activities}
                  onChange={handleFormChange}
                  multiline
                  rows={2}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Assessment"
                  name="assessment"
                  value={formData.assessment}
                  onChange={handleFormChange}
                  multiline
                  rows={2}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                  multiline
                  rows={2}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setOpenDialog(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<Save />}
                  >
                    {isEditMode ? 'Update' : 'Create'} Lesson Plan
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </Box>
  );
};

export default LessonPlanning;
