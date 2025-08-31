import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, MenuItem, InputLabel, FormControl, Select } from '@mui/material';

const HomeworkAssignment = () => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    class: '',
    dueDate: '',
    description: '',
  });

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography'];
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Homework assigned:', formData);
    // Reset form
    setFormData({
      title: '',
      subject: '',
      class: '',
      dueDate: '',
      description: '',
    });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Assign Homework</Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Homework Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          
          <Box display="flex" gap={2} mt={2}>
            <FormControl fullWidth margin="normal">
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
            </FormControl>

            <FormControl fullWidth margin="normal">
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
            </FormControl>
          </Box>

          <TextField
            fullWidth
            margin="normal"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            label="Due Date"
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
            required
          />

          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Assign Homework
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default HomeworkAssignment;
