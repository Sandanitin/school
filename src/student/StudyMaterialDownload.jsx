import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardActionArea, CardMedia,
  TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, 
  Chip, IconButton, Button, Divider, Tabs, Tab, Badge, Tooltip, useTheme,
  LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions,
  List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction
} from '@mui/material';
import {
  Search as SearchIcon, FilterList as FilterIcon, Sort as SortIcon,
  Book as BookIcon, Category as CategoryIcon, Download as DownloadIcon,
  Description as DescriptionIcon, PictureAsPdf as PdfIcon,
  Image as ImageIcon, VideoLibrary as VideoIcon, AudioFile as AudioIcon,
  InsertDriveFile as FileIcon, Star as StarIcon, StarBorder as StarBorderIcon,
  AccessTime as AccessTimeIcon, CloudDownload as CloudDownloadIcon,
  FilterAltOff as FilterAltOffIcon, ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon, Close as CloseIcon, Info as InfoIcon,
  GetApp as GetAppIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon,
  Visibility as VisibilityIcon, Share as ShareIcon, CloudOff as CloudOffIcon
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

// Sample data - replace with API calls
const sampleMaterials = [
  {
    id: 1,
    title: 'Mathematics Advanced Calculus',
    description: 'Comprehensive notes on advanced calculus topics including limits, derivatives, and integrals.',
    subject: 'Mathematics',
    type: 'pdf',
    fileSize: '2.4 MB',
    uploadDate: '2023-08-25T10:30:00',
    downloads: 124,
    rating: 4.7,
    isFavorite: false,
    previewUrl: 'https://via.placeholder.com/300x400?text=Math+Notes',
    downloadUrl: '#',
    tags: ['calculus', 'derivatives', 'integrals', 'advanced'],
    uploadedBy: 'Prof. Smith',
    lastAccessed: '2023-08-28T15:45:00'
  },
  {
    id: 2,
    title: 'Physics - Quantum Mechanics',
    description: 'Introduction to quantum mechanics with problem sets and solutions.',
    subject: 'Physics',
    type: 'pdf',
    fileSize: '3.1 MB',
    uploadDate: '2023-08-20T14:15:00',
    downloads: 89,
    rating: 4.5,
    isFavorite: true,
    previewUrl: 'https://via.placeholder.com/300x400?text=Physics+QM',
    downloadUrl: '#',
    tags: ['quantum', 'mechanics', 'physics', 'theory'],
    uploadedBy: 'Dr. Johnson',
    lastAccessed: '2023-08-27T11:20:00'
  },
  // Add more sample materials...
];

const StudyMaterialDownload = () => {
  const theme = useTheme();
  const [materials, setMaterials] = useState(sampleMaterials);
  const [filteredMaterials, setFilteredMaterials] = useState(sampleMaterials);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  
  // Get unique subjects and types
  const subjects = ['all', ...new Set(materials.map(material => material.subject))];
  const types = ['all', ...new Set(materials.map(material => material.type))];
  
  // Filter and sort materials
  useEffect(() => {
    let result = [...materials];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(material => 
        material.title.toLowerCase().includes(term) ||
        material.description.toLowerCase().includes(term) ||
        material.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply subject filter
    if (selectedSubject !== 'all') {
      result = result.filter(material => material.subject === selectedSubject);
    }
    
    // Apply type filter
    if (selectedType !== 'all') {
      result = result.filter(material => material.type === selectedType);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'title-desc': return b.title.localeCompare(a.title);
        case 'date-asc': return new Date(a.uploadDate) - new Date(b.uploadDate);
        case 'date-desc': return new Date(b.uploadDate) - new Date(a.uploadDate);
        case 'downloads-asc': return a.downloads - b.downloads;
        case 'downloads-desc': return b.downloads - a.downloads;
        case 'rating-asc': return a.rating - b.rating;
        case 'rating-desc': return b.rating - a.rating;
        case 'recent':
        default: return new Date(b.uploadDate) - new Date(a.uploadDate);
      }
    });
    
    setFilteredMaterials(result);
  }, [searchTerm, selectedSubject, selectedType, sortBy, materials]);
  
  // Handle material selection for preview
  const handleMaterialClick = (material) => {
    setSelectedMaterial(material);
    setIsPreviewOpen(true);
  };
  
  // Toggle favorite status
  const toggleFavorite = (materialId, e) => {
    e.stopPropagation();
    const updatedMaterials = materials.map(material => 
      material.id === materialId 
        ? { ...material, isFavorite: !material.isFavorite }
        : material
    );
    setMaterials(updatedMaterials);
  };
  
  // Handle download
  const handleDownload = (material, e) => {
    e.stopPropagation();
    // In a real app, this would trigger a download
    console.log(`Downloading: ${material.title}`);
    
    // Update download count and last accessed
    const updatedMaterials = materials.map(m => 
      m.id === material.id 
        ? { 
            ...m, 
            downloads: m.downloads + 1,
            lastAccessed: new Date().toISOString()
          }
        : m
    );
    setMaterials(updatedMaterials);
  };
  
  // Get file icon based on type
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf': return <PdfIcon color="error" />;
      case 'doc':
      case 'docx': return <DescriptionIcon color="primary" />;
      case 'jpg':
      case 'jpeg':
      case 'png': return <ImageIcon color="secondary" />;
      case 'mp4':
      case 'mov': return <VideoIcon color="info" />;
      case 'mp3':
      case 'wav': return <AudioIcon color="success" />;
      default: return <FileIcon />;
    }
  };
  
  // Render material card
  const renderMaterialCard = (material) => (
    <Card 
      key={material.id} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4]
        }
      }}
    >
      <CardActionArea onClick={() => handleMaterialClick(material)}>
        <CardMedia
          component="div"
          sx={{
            height: 160,
            backgroundColor: theme.palette.grey[200],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {material.previewUrl ? (
            <img 
              src={material.previewUrl} 
              alt={material.title}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }}
            />
          ) : (
            <Box sx={{ textAlign: 'center', p: 2 }}>
              {getFileIcon(material.type)}
              <Typography variant="body2" color="text.secondary">
                {material.type.toUpperCase()}
              </Typography>
            </Box>
          )}
          <Box 
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '50%',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={(e) => toggleFavorite(material.id, e)}
          >
            {material.isFavorite ? (
              <FavoriteIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
            ) : (
              <FavoriteBorderIcon fontSize="small" sx={{ color: 'white' }} />
            )}
          </Box>
        </CardMedia>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {getFileIcon(material.type)}
            <Chip 
              label={material.subject} 
              size="small" 
              sx={{ ml: 'auto' }}
              variant="outlined"
            />
          </Box>
          <Typography 
            gutterBottom 
            variant="subtitle1" 
            component="h3" 
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '3em',
              lineHeight: '1.5em'
            }}
          >
            {material.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.5em',
              mb: 1
            }}
          >
            {material.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <CloudDownloadIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="caption">
                {material.downloads}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon fontSize="small" color="warning" />
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                {material.rating.toFixed(1)}
              </Typography>
            </Box>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ ml: 'auto' }}
            >
              {formatDistanceToNow(new Date(material.uploadDate), { addSuffix: true })}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          startIcon={<VisibilityIcon />}
          onClick={() => handleMaterialClick(material)}
        >
          Preview
        </Button>
        <Button 
          size="small" 
          variant="contained"
          startIcon={<GetAppIcon />}
          onClick={(e) => handleDownload(material, e)}
        >
          Download
        </Button>
      </Box>
    </Card>
  );
  
  // Render material list item
  const renderMaterialListItem = (material) => (
    <Card key={material.id} sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: 120, flexShrink: 0, bgcolor: theme.palette.grey[100], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {material.previewUrl ? (
            <img 
              src={material.previewUrl} 
              alt={material.title}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }}
            />
          ) : (
            <Box sx={{ textAlign: 'center', p: 2 }}>
              {getFileIcon(material.type)}
              <Typography variant="caption" display="block">
                {material.type.toUpperCase()}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" component="h3" gutterBottom>
                  {material.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {material.description}
                </Typography>
              </Box>
              <IconButton 
                onClick={(e) => toggleFavorite(material.id, e)}
                color={material.isFavorite ? 'error' : 'default'}
              >
                {material.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              <Chip 
                label={material.subject} 
                size="small" 
                variant="outlined"
                icon={<CategoryIcon fontSize="small" />}
              />
              
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <CloudDownloadIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                  <Typography variant="caption">
                    {material.downloads} downloads
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <StarIcon fontSize="small" color="warning" />
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    {material.rating.toFixed(1)}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(new Date(material.uploadDate), { addSuffix: true })}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
              <Button 
                size="small" 
                startIcon={<VisibilityIcon />}
                onClick={() => handleMaterialClick(material)}
              >
                Preview
              </Button>
              <Button 
                size="small" 
                variant="contained"
                startIcon={<GetAppIcon />}
                onClick={(e) => handleDownload(material, e)}
              >
                Download
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          <BookIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Study Materials
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Access and download study materials for your courses
        </Typography>
      </Box>
      
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DescriptionIcon sx={{ mr: 1 }} />
                <span>All Materials</span>
              </Box>
            } 
            value="all"
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FavoriteIcon sx={{ mr: 1, color: theme.palette.error.main }} />
                <span>Favorites</span>
              </Box>
            } 
            value="favorites"
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon sx={{ mr: 1 }} />
                <span>Recent</span>
              </Box>
            } 
            value="recent"
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CloudDownloadIcon sx={{ mr: 1 }} />
                <span>My Downloads</span>
              </Box>
            } 
            value="downloads"
          />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {/* Search and Filters */}
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  placeholder="Search by title, description, or tags..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Subject</InputLabel>
                  <Select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    label="Subject"
                  >
                    <MenuItem value="all">All Subjects</MenuItem>
                    {subjects.filter(s => s !== 'all').map(subject => (
                      <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>File Type</InputLabel>
                  <Select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    label="File Type"
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    {types.filter(t => t !== 'all').map(type => (
                      <MenuItem key={type} value={type}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getFileIcon(type)}
                          <span style={{ marginLeft: 8 }}>{type.toUpperCase()}</span>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value="recent">Most Recent</MenuItem>
                    <MenuItem value="title-asc">Title (A-Z)</MenuItem>
                    <MenuItem value="title-desc">Title (Z-A)</MenuItem>
                    <MenuItem value="date-asc">Oldest First</MenuItem>
                    <MenuItem value="downloads-desc">Most Downloads</MenuItem>
                    <MenuItem value="rating-desc">Highest Rated</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterAltOffIcon />}
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSubject('all');
                    setSelectedType('all');
                    setSortBy('recent');
                  }}
                  fullWidth
                >
                  Reset
                </Button>
              </Grid>
              <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton 
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  color="primary"
                >
                  {viewMode === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          
          {/* Results */}
          {filteredMaterials.length > 0 ? (
            viewMode === 'grid' ? (
              <Grid container spacing={3}>
                {filteredMaterials.map(material => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={material.id}>
                    {renderMaterialCard(material)}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box>
                {filteredMaterials.map(material => renderMaterialListItem(material))}
              </Box>
            )
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              py: 8,
              textAlign: 'center'
            }}>
              <DescriptionIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No study materials found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
                No materials match your current filters. Try adjusting your search criteria or reset the filters.
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSubject('all');
                  setSelectedType('all');
                  setSortBy('recent');
                }}
              >
                Reset Filters
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
      
      {/* Material Preview Dialog */}
      <Dialog 
        open={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        {selectedMaterial && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {getFileIcon(selectedMaterial.type)}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {selectedMaterial.title}
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => toggleFavorite(selectedMaterial.id, { stopPropagation: () => {} })}>
                    {selectedMaterial.isFavorite ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <IconButton onClick={() => setIsPreviewOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box 
                    sx={{ 
                      backgroundColor: theme.palette.grey[100],
                      borderRadius: 1,
                      p: 2,
                      minHeight: 400,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    {selectedMaterial.previewUrl ? (
                      <img 
                        src={selectedMaterial.previewUrl} 
                        alt={selectedMaterial.title}
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '60vh',
                          objectFit: 'contain' 
                        }}
                      />
                    ) : (
                      <>
                        <DescriptionIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="body1" color="text.secondary">
                          Preview not available for this file type
                        </Typography>
                      </>
                    )}
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                      File type: {selectedMaterial.type.toUpperCase()} • {selectedMaterial.fileSize}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Details
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CategoryIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Subject" 
                        secondary={selectedMaterial.subject} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTimeIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Uploaded" 
                        secondary={formatDistanceToNow(new Date(selectedMaterial.uploadDate), { addSuffix: true })} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CloudDownloadIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Downloads" 
                        secondary={selectedMaterial.downloads} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <StarIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Rating" 
                        secondary={`${selectedMaterial.rating.toFixed(1)} (${Math.floor(selectedMaterial.rating * 20)} reviews)`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Uploaded by" 
                        secondary={selectedMaterial.uploadedBy} 
                      />
                    </ListItem>
                  </List>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {selectedMaterial.description}
                  </Typography>
                  
                  <Box sx={{ mt: 2, mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Tags
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selectedMaterial.tags.map((tag, index) => (
                        <Chip 
                          key={index} 
                          label={tag} 
                          size="small" 
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button 
                startIcon={<ShareIcon />}
                onClick={() => {
                  // Implement share functionality
                  navigator.clipboard.writeText(window.location.href);
                  // Show success message
                }}
              >
                Share
              </Button>
              <Button 
                variant="contained" 
                startIcon={<GetAppIcon />}
                onClick={(e) => {
                  handleDownload(selectedMaterial, e);
                  setIsPreviewOpen(false);
                }}
              >
                Download
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default StudyMaterialDownload;
