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
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  CircularProgress
} from '@mui/material';
import { CloudUpload, Delete, GetApp, Description, Folder, InsertDriveFile } from '@mui/icons-material';

const StudyMaterialUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    file: null,
    fileType: 'document'
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: 'Algebra Basics',
      description: 'Introduction to algebraic expressions',
      subject: 'Mathematics',
      class: 'Class 8A',
      fileName: 'algebra_basics.pdf',
      fileType: 'document',
      uploadDate: '2025-08-28',
      size: '2.5 MB'
    },
    {
      id: 2,
      title: 'Chemistry Lab Manual',
      description: 'Lab experiments for term 1',
      subject: 'Science',
      class: 'Class 9B',
      fileName: 'chemistry_lab.pdf',
      fileType: 'document',
      uploadDate: '2025-08-25',
      size: '5.1 MB'
    },
  ]);

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography'];
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  const fileTypes = [
    { value: 'document', label: 'Document' },
    { value: 'presentation', label: 'Presentation' },
    { value: 'worksheet', label: 'Worksheet' },
    { value: 'notes', label: 'Study Notes' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData(prev => ({
        ...prev,
        file: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.file) {
      alert('Please select a file to upload');
      return;
    }

    setUploading(true);
    
    // Simulate file upload with progress
    const totalSize = formData.file.size;
    let uploadedSize = 0;
    const chunkSize = 1024 * 1024; // 1MB chunks
    
    // This is a mock upload simulation
    const uploadInterval = setInterval(() => {
      uploadedSize += chunkSize;
      const progress = Math.min(Math.round((uploadedSize / totalSize) * 100), 100);
      setUploadProgress(progress);
      
      if (progress === 100) {
        clearInterval(uploadInterval);
        
        // Add the new material to the list
        const newMaterial = {
          id: materials.length + 1,
          title: formData.title || formData.file.name.split('.')[0],
          description: formData.description,
          subject: formData.subject,
          class: formData.class,
          fileName: formData.file.name,
          fileType: formData.fileType,
          uploadDate: new Date().toISOString().split('T')[0],
          size: `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB`
        };
        
        setMaterials([newMaterial, ...materials]);
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          subject: '',
          class: '',
          file: null,
          fileType: 'document'
        });
        
        setUploading(false);
        setUploadProgress(0);
        
        // Reset file input
        document.getElementById('file-upload').value = '';
      }
    }, 100);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      setMaterials(materials.filter(material => material.id !== id));
    }
  };

  const handleDownload = (fileName) => {
    // Implement actual download functionality
    console.log('Downloading:', fileName);
    // In a real app, this would trigger a file download
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'document':
        return <Description color="primary" />;
      case 'presentation':
        return <Description color="secondary" />;
      case 'worksheet':
        return <Description color="success" />;
      case 'notes':
        return <Description color="warning" />;
      default:
        return <InsertDriveFile color="action" />;
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Study Material Upload</Typography>
      
      {/* Upload Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Upload New Material</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a title for the material"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Subject</InputLabel>
                <Select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
              <FormControl fullWidth margin="normal">
                <InputLabel>Material Type</InputLabel>
                <Select
                  name="fileType"
                  value={formData.fileType}
                  onChange={handleChange}
                  label="Material Type"
                  required
                >
                  {fileTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={2}
                placeholder="Enter a brief description of the material"
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
                name="file"
                onChange={handleChange}
                disabled={uploading}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUpload />}
                  disabled={uploading}
                >
                  {formData.file ? formData.file.name : 'Select File'}
                </Button>
              </label>
              {formData.file && (
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Selected: {formData.file.name} ({(formData.file.size / (1024 * 1024)).toFixed(2)} MB)
                </Typography>
              )}
              <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT (Max: 25MB)
              </Typography>
              
              {uploading && (
                <Box sx={{ width: '100%', mt: 2 }}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="caption">Uploading...</Typography>
                    <Typography variant="caption">{uploadProgress}%</Typography>
                  </Box>
                  <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, overflow: 'hidden' }}>
                    <Box 
                      sx={{
                        height: 8,
                        bgcolor: 'primary.main',
                        width: `${uploadProgress}%`,
                        transition: 'width 0.3s ease-in-out'
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<CloudUpload />}
                disabled={!formData.file || uploading}
                sx={{ mt: 2 }}
              >
                {uploading ? 'Uploading...' : 'Upload Material'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Uploaded Materials List */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Uploaded Materials</Typography>
          <TextField
            size="small"
            placeholder="Search materials..."
            InputProps={{
              startAdornment: (
                <IconButton size="small" sx={{ mr: 1 }}>
                  <Search fontSize="small" />
                </IconButton>
              ),
            }}
          />
        </Box>
        
        {materials.length > 0 ? (
          <List>
            {materials.map((material, index) => (
              <React.Fragment key={material.id}>
                <ListItem>
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    {getFileIcon(material.fileType)}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                      <Typography variant="subtitle1" sx={{ mr: 1 }}>
                        {material.title}
                      </Typography>
                      <Chip 
                        label={material.fileType} 
                        size="small" 
                        variant="outlined"
                        sx={{ mr: 1, textTransform: 'capitalize' }}
                      />
                      <Chip 
                        label={material.subject} 
                        size="small" 
                        variant="outlined"
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                      <Chip 
                        label={material.class} 
                        size="small" 
                        variant="outlined"
                        color="secondary"
                      />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {material.description}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <Typography variant="caption" color="textSecondary" sx={{ mr: 2 }}>
                        {material.fileName} • {material.size}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Uploaded: {material.uploadDate}
                      </Typography>
                    </Box>
                  </Box>
                  <ListItemSecondaryAction>
                    <Tooltip title="Download">
                      <IconButton 
                        edge="end" 
                        aria-label="download"
                        onClick={() => handleDownload(material.fileName)}
                        sx={{ mr: 1 }}
                      >
                        <GetApp />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={() => handleDelete(material.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < materials.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box textAlign="center" py={4}>
            <Folder fontSize="large" color="disabled" />
            <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
              No study materials uploaded yet
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Upload your first study material using the form above
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default StudyMaterialUpload;
