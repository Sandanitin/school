import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, TextField, Button, Grid, Paper, 
  FormControl, InputLabel, Select, MenuItem, Box, CircularProgress,
  Snackbar, Alert, Card, CardContent, CardHeader, Divider
} from '@mui/material';
import { 
  Save as SaveIcon, 
  Edit as EditIcon, 
  School as SchoolIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Public as PublicIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const InstituteInfoSetup = () => {
  // Initial state for institute information
  const [instituteInfo, setInstituteInfo] = useState({
    name: '',
    code: '',
    type: 'school',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    phone: '',
    email: '',
    website: '',
    principalName: '',
    establishedYear: new Date().getFullYear(),
    logo: null,
    logoPreview: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Load saved data on component mount
  useEffect(() => {
    const fetchInstituteData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        // const response = await fetch('/api/institute');
        // const data = await response.json();
        
        // Mock data for demonstration
        setTimeout(() => {
          const mockData = {
            name: 'Global Public School',
            code: 'GPS-001',
            type: 'school',
            address: '123 Education St',
            city: 'Mumbai',
            state: 'Maharashtra',
            country: 'India',
            pincode: '400001',
            phone: '+91 9876543210',
            email: 'info@globalpublicschool.edu',
            website: 'www.globalpublicschool.edu',
            principalName: 'Dr. Ramesh Kumar',
            establishedYear: 1995,
            logoPreview: 'https://via.placeholder.com/150'
          };
          
          setInstituteInfo(prev => ({
            ...prev,
            ...mockData
          }));
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching institute data:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load institute data',
          severity: 'error'
        });
        setIsLoading(false);
      }
    };

    fetchInstituteData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'logo' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInstituteInfo(prev => ({
          ...prev,
          logo: files[0],
          logoPreview: reader.result
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setInstituteInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'address', 'city', 'state', 'country', 'pincode', 'phone', 'email'];
    
    requiredFields.forEach(field => {
      if (!instituteInfo[field]?.trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (instituteInfo.email && !/\S+@\S+\.\S+/.test(instituteInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (basic)
    if (instituteInfo.phone && !/^[0-9+\-\s]+$/.test(instituteInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Website validation (basic)
    if (instituteInfo.website && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(instituteInfo.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      Object.keys(instituteInfo).forEach(key => {
        if (key !== 'logoPreview' && instituteInfo[key] !== null) {
          formData.append(key, instituteInfo[key]);
        }
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would do:
      // const response = await fetch('/api/institute', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to save institute information');
      // }
      
      setSnackbar({
        open: true,
        message: 'Institute information saved successfully!',
        severity: 'success'
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving institute information:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save institute information. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset form to initial values
    setInstituteInfo(prev => ({
      ...prev,
      ...initialValues
    }));
    setErrors({});
    setIsEditing(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const initialValues = {
    name: '',
    code: '',
    type: 'school',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    phone: '',
    email: '',
    website: '',
    principalName: '',
    establishedYear: new Date().getFullYear(),
    logo: null,
    logoPreview: null
  };

  if (isLoading && !isEditing) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card>
        <CardHeader
          title="Institute Information"
          subheader="Manage your institute's details"
          titleTypographyProps={{ variant: 'h4' }}
          action={
            !isEditing && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            )
          }
        />
        <Divider />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Logo Upload */}
              <Grid item xs={12} md={3}>
                <Box 
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 2
                  }}
                >
                  <Box
                    component="img"
                    src={instituteInfo.logoPreview || '/default-school-logo.png'}
                    alt="Institute Logo"
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: 1,
                      objectFit: 'cover',
                      mb: 2,
                      border: '1px solid #ddd'
                    }}
                  />
                  {isEditing && (
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<PublicIcon />}
                    >
                      Upload Logo
                      <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        hidden
                        onChange={handleChange}
                      />
                    </Button>
                  )}
                </Box>
              </Grid>

              {/* Institute Details */}
              <Grid item xs={12} md={9}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Institute Name"
                      name="name"
                      value={instituteInfo.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Institute Code"
                      name="code"
                      value={instituteInfo.code}
                      onChange={handleChange}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth disabled={!isEditing}>
                      <InputLabel>Institute Type</InputLabel>
                      <Select
                        name="type"
                        value={instituteInfo.type}
                        label="Institute Type"
                        onChange={handleChange}
                      >
                        <MenuItem value="school">School</MenuItem>
                        <MenuItem value="college">College</MenuItem>
                        <MenuItem value="university">University</MenuItem>
                        <MenuItem value="coaching">Coaching Institute</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Principal/Head Name"
                      name="principalName"
                      value={instituteInfo.principalName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Established Year"
                        views={['year']}
                        value={new Date(instituteInfo.establishedYear, 0, 1)}
                        onChange={(date) => {
                          setInstituteInfo(prev => ({
                            ...prev,
                            establishedYear: date.getFullYear()
                          }));
                        }}
                        disabled={!isEditing}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>

              {/* Contact Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={instituteInfo.address}
                      onChange={handleChange}
                      error={!!errors.address}
                      helperText={errors.address}
                      disabled={!isEditing}
                      multiline
                      rows={2}
                      InputProps={{
                        startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={instituteInfo.city}
                      onChange={handleChange}
                      error={!!errors.city}
                      helperText={errors.city}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="State"
                      name="state"
                      value={instituteInfo.state}
                      onChange={handleChange}
                      error={!!errors.state}
                      helperText={errors.state}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      value={instituteInfo.country}
                      onChange={handleChange}
                      error={!!errors.country}
                      helperText={errors.country}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Pincode"
                      name="pincode"
                      value={instituteInfo.pincode}
                      onChange={handleChange}
                      error={!!errors.pincode}
                      helperText={errors.pincode}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={instituteInfo.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={instituteInfo.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Website"
                      name="website"
                      value={instituteInfo.website}
                      onChange={handleChange}
                      error={!!errors.website}
                      helperText={errors.website || 'e.g., www.yourschool.edu'}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <PublicIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Form Actions */}
              {isEditing && (
                <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default InstituteInfoSetup;
