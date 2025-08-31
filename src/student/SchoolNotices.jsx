import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardActionArea,
  TextField, InputAdornment, Chip, Button, IconButton, Divider, Tabs, Tab,
  Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, useTheme,
  Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction,
  Menu, MenuItem, FormControl, InputLabel, Select, Pagination
} from '@mui/material';
import {
  Search as SearchIcon, FilterList as FilterIcon, Sort as SortIcon,
  Notifications as NotificationsIcon, Announcement as AnnouncementIcon,
  Event as EventIcon, Close as CloseIcon, MoreVert as MoreVertIcon,
  ArrowForward as ArrowForwardIcon, Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon, Share as ShareIcon,
  Download as DownloadIcon, Print as PrintIcon, CalendarToday as CalendarIcon,
  Person as PersonIcon, Category as CategoryIcon
} from '@mui/icons-material';
import { format, isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';

// Sample data
const sampleNotices = [
  {
    id: 'notice_001',
    title: 'School Reopening After Summer Break',
    content: 'All students are informed that the school will reopen on 1st September 2023. Please ensure you bring all necessary materials and complete your summer assignments.',
    category: 'General',
    date: '2023-08-28T10:00:00',
    author: 'Principal Office',
    priority: 'high',
    attachments: ['reopening_guidelines.pdf'],
    isBookmarked: false
  },
  {
    id: 'notice_002',
    title: 'Annual Sports Day 2023',
    content: 'We are excited to announce our Annual Sports Day will be held on 15th October 2023. Students can register for various events at the sports office.',
    category: 'Events',
    date: '2023-08-25T14:30:00',
    author: 'Sports Department',
    priority: 'medium',
    attachments: ['sports_day_schedule.pdf', 'event_list.pdf'],
    isBookmarked: true
  },
  {
    id: 'notice_003',
    title: 'Library Maintenance',
    content: 'The school library will be closed for maintenance from 5th to 7th September 2023. Please plan your book returns and borrowings accordingly.',
    category: 'Facilities',
    date: '2023-08-20T09:15:00',
    author: 'Library Department',
    priority: 'low',
    attachments: [],
    isBookmarked: false
  },
  {
    id: 'notice_004',
    title: 'Parent-Teacher Meeting Schedule',
    content: 'The next parent-teacher meeting is scheduled for 10th September 2023. Please book your time slot through the school portal.',
    category: 'Academic',
    date: '2023-08-18T11:45:00',
    author: 'Administration',
    priority: 'high',
    attachments: ['ptm_schedule.pdf'],
    isBookmarked: true
  },
  {
    id: 'notice_005',
    title: 'Science Exhibition 2023',
    content: 'Students are invited to participate in the annual Science Exhibition on 20th September 2023. Submit your project proposals by 5th September.',
    category: 'Events',
    date: '2023-08-15T13:20:00',
    author: 'Science Department',
    priority: 'medium',
    attachments: ['exhibition_guidelines.pdf', 'entry_form.pdf'],
    isBookmarked: false
  }
];

const categories = ['All', 'General', 'Academic', 'Events', 'Facilities', 'Examinations'];
const priorityOptions = ['All', 'High', 'Medium', 'Low'];

const SchoolNotices = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [notices, setNotices] = useState(sampleNotices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 5;

  // Filter and sort notices
  const filteredNotices = notices
    .filter(notice => {
      const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
      const matchesPriority = selectedPriority === 'All' || 
                            (selectedPriority.toLowerCase() === notice.priority);
      
      return matchesSearch && matchesCategory && matchesPriority;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'date') {
        comparison = new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      
      return sortOrder === 'asc' ? comparison * -1 : comparison;
    });

  // Get current notices for pagination
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);
  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);

  // Handle pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle bookmark status
  const toggleBookmark = (id) => {
    setNotices(notices.map(notice => 
      notice.id === id ? { ...notice, isBookmarked: !notice.isBookmarked } : notice
    ));
  };

  // Open notice details dialog
  const handleOpenDialog = (notice) => {
    setSelectedNotice(notice);
    setOpenDialog(true);
  };

  // Close notice details dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    if (isToday(date)) {
      return 'Today, ' + format(date, 'h:mm a');
    } else if (isThisWeek(date)) {
      return format(date, 'EEEE, h:mm a');
    } else if (isThisMonth(date)) {
      return format(date, 'MMM d, h:mm a');
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center' }}>
        <Box sx={{ mb: isMobile ? 2 : 0 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            School Notices & Announcements
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Stay updated with the latest news and announcements
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<NotificationsIcon />}
          onClick={() => setSelectedCategory('All')}
        >
          View All Notices
        </Button>
      </Box>

      {/* Search and Filter Bar */}
      <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.5}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2.5}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                value={selectedPriority}
                onChange={(e) => {
                  setSelectedPriority(e.target.value);
                  setCurrentPage(1);
                }}
                label="Priority"
              >
                {priorityOptions.map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSelectedCategory('All');
                setSelectedPriority('All');
                setSearchTerm('');
                setCurrentPage(1);
              }}
              sx={{ width: isMobile ? '100%' : 'auto' }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Notices List */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            {selectedCategory === 'All' ? 'All Notices' : `${selectedCategory} Notices`}
            {searchTerm && ` matching "${searchTerm}"`}
            <Chip 
              label={`${filteredNotices.length} ${filteredNotices.length === 1 ? 'notice' : 'notices'}`} 
              size="small" 
              color="primary" 
              variant="outlined" 
              sx={{ ml: 1, verticalAlign: 'middle' }} 
            />
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Sort by:
            </Typography>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              size="small"
              variant="standard"
              disableUnderline
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
            </Select>
            <IconButton 
              size="small" 
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              color="primary"
            >
              <SortIcon style={{ transform: sortOrder === 'asc' ? 'rotate(180deg)' : 'rotate(0)' }} />
            </IconButton>
          </Box>
        </Box>

        {currentNotices.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <AnnouncementIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No notices found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm 
                ? 'Try adjusting your search or filter criteria.'
                : 'There are no notices available at the moment.'}
            </Typography>
          </Paper>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {currentNotices.map((notice) => (
              <React.Fragment key={notice.id}>
                <ListItem 
                  alignItems="flex-start"
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    '&:hover': {
                      boxShadow: 3,
                      bgcolor: 'action.hover',
                      cursor: 'pointer',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onClick={() => handleOpenDialog(notice)}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(notice.id);
                      }}
                      color={notice.isBookmarked ? 'primary' : 'default'}
                      sx={{ mr: 1 }}
                    >
                      {notice.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                  }
                >
                  <ListItemAvatar sx={{ display: isMobile ? 'none' : 'flex' }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <AnnouncementIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography 
                          component="span" 
                          variant="subtitle1" 
                          sx={{ 
                            fontWeight: 600, 
                            mr: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {notice.title}
                        </Typography>
                        <Chip 
                          label={notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)} 
                          size="small" 
                          color={getPriorityColor(notice.priority)}
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.65rem' }}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            mb: 0.5
                          }}
                        >
                          {notice.content}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: 0.5 }}>
                          <Chip 
                            icon={<CategoryIcon fontSize="small" />}
                            label={notice.category}
                            size="small"
                            variant="outlined"
                            sx={{ mr: 1, mb: 0.5 }}
                          />
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ display: 'flex', alignItems: 'center', mr: 1.5, mb: 0.5 }}
                          >
                            <PersonIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                            {notice.author}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
                          >
                            <CalendarIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                            {formatDate(notice.date)}
                          </Typography>
                          {notice.attachments.length > 0 && (
                            <Typography 
                              variant="caption" 
                              color="primary"
                              sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}
                            >
                              <DownloadIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                              {notice.attachments.length} {notice.attachments.length === 1 ? 'attachment' : 'attachments'}
                            </Typography>
                          )}
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" sx={{ mx: 0 }} />
              </React.Fragment>
            ))}
          </List>
        )}

        {/* Pagination */}
        {filteredNotices.length > noticesPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              size={isMobile ? 'small' : 'medium'}
            />
          </Box>
        )}
      </Box>

      {/* Notice Details Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
          pb: 1.5
        }}>
          <Box>
            <Typography variant="h6" component="div">
              {selectedNotice?.title}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: 0.5 }}>
              <Chip 
                label={selectedNotice?.category}
                size="small"
                variant="outlined"
                sx={{ mr: 1, mb: 0.5 }}
              />
              <Chip 
                label={selectedNotice?.priority.charAt(0).toUpperCase() + selectedNotice?.priority.slice(1)}
                size="small"
                color={getPriorityColor(selectedNotice?.priority)}
                variant="outlined"
                sx={{ mr: 1, mb: 0.5 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <PersonIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                {selectedNotice?.author}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', ml: 1.5, mb: 0.5 }}>
                <CalendarIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                {selectedNotice && formatDate(selectedNotice.date)}
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton 
              onClick={(e) => {
                e.stopPropagation();
                selectedNotice && toggleBookmark(selectedNotice.id);
              }}
              color={selectedNotice?.isBookmarked ? 'primary' : 'default'}
              sx={{ mr: 0.5 }}
            >
              {selectedNotice?.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
            >
              <MenuItem>
                <ShareIcon fontSize="small" sx={{ mr: 1 }} />
                Share
              </MenuItem>
              <MenuItem>
                <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
                Download All Attachments
              </MenuItem>
              <MenuItem>
                <PrintIcon fontSize="small" sx={{ mr: 1 }} />
                Print
              </MenuItem>
            </Menu>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="body1" paragraph>
            {selectedNotice?.content}
          </Typography>
          
          {selectedNotice?.attachments && selectedNotice.attachments.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachFileIcon fontSize="small" sx={{ mr: 1 }} />
                Attachments ({selectedNotice.attachments.length})
              </Typography>
              <List dense>
                {selectedNotice.attachments.map((file, index) => (
                  <ListItem 
                    key={index}
                    sx={{ 
                      bgcolor: 'action.hover', 
                      borderRadius: 1, 
                      mb: 1,
                      '&:hover': { bgcolor: 'action.selected' }
                    }}
                    secondaryAction={
                      <IconButton edge="end">
                        <DownloadIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <DescriptionIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={file}
                      secondary={`${Math.floor(Math.random() * 5) + 1} MB`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<ArrowForwardIcon />}
            onClick={() => {
              // Handle action (e.g., mark as read, register, etc.)
              handleCloseDialog();
            }}
          >
            View Details
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SchoolNotices;
