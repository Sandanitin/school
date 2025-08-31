import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Tabs,
  Tab,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Tooltip
} from '@mui/material';
import { Search, FilterList, Book, Category, MenuBook, PictureAsPdf, VideoLibrary, Link } from '@mui/icons-material';

const LibraryAccess = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    sortBy: 'recent'
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  // Sample library resources - replace with actual data from your backend
  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'Advanced Mathematics',
      author: 'John Smith',
      category: 'Mathematics',
      type: 'textbook',
      coverImage: 'https://via.placeholder.com/150x200?text=Math',
      description: 'Comprehensive guide to advanced mathematical concepts for high school students.',
      tags: ['Algebra', 'Calculus', 'Advanced'],
      fileType: 'pdf',
      pages: 350,
      publishYear: 2023,
      isAvailable: true
    },
    {
      id: 2,
      title: 'Chemistry Experiments',
      author: 'Sarah Johnson',
      category: 'Science',
      type: 'lab_manual',
      coverImage: 'https://via.placeholder.com/150x200?text=Chemistry',
      description: 'Step-by-step guide to common high school chemistry experiments with safety guidelines.',
      tags: ['Experiments', 'Lab Work', 'Safety'],
      fileType: 'pdf',
      pages: 120,
      publishYear: 2022,
      isAvailable: true
    },
    {
      id: 3,
      title: 'Introduction to Programming',
      author: 'David Wilson',
      category: 'Computer Science',
      type: 'e-book',
      coverImage: 'https://via.placeholder.com/150x200?text=Programming',
      description: 'Beginner-friendly introduction to programming concepts using Python.',
      tags: ['Python', 'Beginner', 'Coding'],
      fileType: 'epub',
      pages: 280,
      publishYear: 2023,
      isAvailable: true
    },
    {
      id: 4,
      title: 'World History: Ancient Civilizations',
      author: 'Emily Chen',
      category: 'History',
      type: 'textbook',
      coverImage: 'https://via.placeholder.com/150x200?text=History',
      description: 'Exploration of ancient civilizations from Mesopotamia to Rome.',
      tags: ['Ancient', 'Civilizations', 'World History'],
      fileType: 'pdf',
      pages: 420,
      publishYear: 2021,
      isAvailable: true
    },
    {
      id: 5,
      title: 'Physics Fundamentals Video Course',
      author: 'Robert Taylor',
      category: 'Science',
      type: 'video',
      coverImage: 'https://via.placeholder.com/150x200?text=Physics',
      description: 'Comprehensive video course covering fundamental physics concepts.',
      tags: ['Mechanics', 'Electromagnetism', 'Video'],
      fileType: 'mp4',
      duration: '8h 45m',
      publishYear: 2023,
      isAvailable: true
    },
    {
      id: 6,
      title: 'Literary Analysis Guide',
      author: 'Jennifer Lee',
      category: 'English',
      type: 'study_guide',
      coverImage: 'https://via.placeholder.com/150x200?text=Literature',
      description: 'Guide to analyzing literature with examples from classic works.',
      tags: ['Literature', 'Analysis', 'Writing'],
      fileType: 'pdf',
      pages: 180,
      publishYear: 2022,
      isAvailable: true
    },
    {
      id: 7,
      title: 'Environmental Science Case Studies',
      author: 'Michael Brown',
      category: 'Science',
      type: 'case_study',
      coverImage: 'https://via.placeholder.com/150x200?text=Environment',
      description: 'Collection of case studies on current environmental issues and solutions.',
      tags: ['Environment', 'Case Studies', 'Sustainability'],
      fileType: 'pdf',
      pages: 210,
      publishYear: 2023,
      isAvailable: false
    }
  ]);

  const categories = [...new Set(resources.map(resource => resource.category))];
  const resourceTypes = [
    { value: 'textbook', label: 'Textbook' },
    { value: 'e-book', label: 'E-book' },
    { value: 'video', label: 'Video' },
    { value: 'lab_manual', label: 'Lab Manual' },
    { value: 'study_guide', label: 'Study Guide' },
    { value: 'case_study', label: 'Case Study' },
    { value: 'other', label: 'Other' }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1); // Reset to first page when changing tabs
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(1); // Reset to first page when changing filters
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };

  const getFileTypeIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return <PictureAsPdf color="error" />;
      case 'epub':
        return <MenuBook color="primary" />;
      case 'mp4':
      case 'webm':
        return <VideoLibrary color="primary" />;
      default:
        return <Link color="action" />;
    }
  };

  // Filter and sort resources based on search, filters, and active tab
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !filters.category || resource.category === filters.category;
    const matchesType = !filters.type || resource.type === filters.type;
    const matchesTab = activeTab === 'all' || resource.category.toLowerCase() === activeTab;
    
    return matchesSearch && matchesCategory && matchesType && matchesTab;
  }).sort((a, b) => {
    if (filters.sortBy === 'recent') {
      return b.publishYear - a.publishYear;
    } else if (filters.sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (filters.sortBy === 'author') {
      return a.author.localeCompare(b.author);
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const paginatedResources = filteredResources.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Library Resources</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              label="Sort By"
            >
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="title">Title (A-Z)</MenuItem>
              <MenuItem value="author">Author (A-Z)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Search and Filters */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search resources by title, author, or keyword..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Resource Type</InputLabel>
              <Select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                label="Resource Type"
              >
                <MenuItem value="">All Types</MenuItem>
                {resourceTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Category Tabs */}
      <Paper elevation={3} sx={{ mb: 3, overflowX: 'auto' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="resource categories"
        >
          <Tab icon={<Category />} label="All" value="all" />
          {categories.map(category => (
            <Tab 
              key={category} 
              icon={<Book />} 
              label={category} 
              value={category.toLowerCase()} 
            />
          ))}
        </Tabs>
      </Paper>

      {/* Resource Grid */}
      {paginatedResources.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {paginatedResources.map((resource) => (
              <Grid item xs={12} sm={6} md={4} key={resource.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    opacity: resource.isAvailable ? 1 : 0.7
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={resource.coverImage}
                    alt={resource.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Typography gutterBottom variant="h6" component="div" noWrap>
                        {resource.title}
                      </Typography>
                      <Tooltip title={resource.fileType.toUpperCase()}>
                        <span>
                          {getFileTypeIcon(resource.fileType)}
                        </span>
                      </Tooltip>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      by {resource.author} • {resource.publishYear}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      mb: 1
                    }}>
                      {resource.description}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Box display="flex" flexWrap="wrap" gap={0.5} mb={1}>
                        <Chip 
                          label={resource.category} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                        <Chip 
                          label={resourceTypes.find(t => t.value === resource.type)?.label || 'Other'} 
                          size="small" 
                          variant="outlined"
                        />
                        {resource.pages && (
                          <Chip 
                            label={`${resource.pages} pages`} 
                            size="small" 
                            variant="outlined"
                          />
                        )}
                      </Box>
                      <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {resource.tags.slice(0, 3).map((tag, index) => (
                          <Chip 
                            key={index} 
                            label={tag} 
                            size="small" 
                            variant="outlined"
                            color="secondary"
                          />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button 
                      size="small" 
                      color="primary"
                      disabled={!resource.isAvailable}
                    >
                      {resource.isAvailable ? 'View Details' : 'Unavailable'}
                    </Button>
                    <Button 
                      size="small" 
                      color="primary"
                      disabled={!resource.isAvailable}
                    >
                      {resource.isAvailable ? 'Download' : 'Unavailable'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                showFirstButton 
                showLastButton 
              />
            </Box>
          )}
        </>
      ) : (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Box py={4}>
            <Book sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No resources found
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Try adjusting your search or filters to find what you're looking for.
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default LibraryAccess;
