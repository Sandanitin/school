import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  Select, 
  FormHelperText,
  IconButton
} from '@mui/material';
import { CloudUpload, AttachFile } from '@mui/icons-material';

const CreateHomeworkForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    class: '',
    dueDate: '',
    description: '',
    file: null
  });

  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState('');

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography'];
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData(prev => ({
        ...prev,
        file: files[0]
      }));
      setFileName(files[0]?.name || '');
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.class) newErrors.class = 'Please select a class';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.description) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      console.log('Homework created:', formData);
      // Reset form
      setFormData({
        title: '',
        subject: '',
        class: '',
        dueDate: '',
        description: '',
        file: null
      });
      setFileName('');
      setErrors({});
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Create Homework</Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Homework Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            required
          />
          
          <Box display="flex" gap={2} mt={2}>
            <FormControl fullWidth margin="normal" error={!!errors.subject}>
              <InputLabel>Subject</InputLabel>
              <Select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                label="Subject"
                required
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </Select>
              {errors.subject && <FormHelperText>{errors.subject}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.class}>
              <InputLabel>Class</InputLabel>
              <Select
                name="class"
                value={formData.class}
                onChange={handleChange}
                label="Class"
                required
              >
                {classes.map((cls) => (
                  <MenuItem key={cls} value={cls}>
                    {cls}
                  </MenuItem>
                ))}
              </Select>
              {errors.class && <FormHelperText>{errors.class}</FormHelperText>}
            </FormControl>
          </Box>

          <TextField
            fullWidth
            margin="normal"
            type="datetime-local"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            label="Due Date & Time"
            error={!!errors.dueDate}
            helperText={errors.dueDate}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            required
          />

          <Box mt={2} mb={2}>
            <input
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              style={{ display: 'none' }}
              id="homework-file-upload"
              type="file"
              name="file"
              onChange={handleChange}
            />
            <label htmlFor="homework-file-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUpload />}
              >
                Upload File
              </Button>
            </label>
            {fileName && (
              <Box display="flex" alignItems="center" mt={1}>
                <AttachFile fontSize="small" color="action" />
                <Typography variant="body2" ml={1}>
                  {fileName}
                </Typography>
              </Box>
            )}
          </Box>

          <Box mt={3}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
            >
              Create Homework
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateHomeworkForm;
