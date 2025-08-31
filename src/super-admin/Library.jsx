import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  InputAdornment, 
  IconButton,
  Chip,
  Grid,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CardMedia,
  CardActions,
  CardActionArea,
  Pagination,
  Box
} from '@mui/material';
import { 
  FaSearch, 
  FaBook, 
  FaFilePdf, 
  FaFileWord, 
  FaFilePowerpoint, 
  FaFileVideo,
  FaFilter,
  FaDownload,
  FaEye,
  FaStar,
  FaRegStar,
  FaSortAmountDown,
  FaListUl,
  FaThLarge
} from 'react-icons/fa';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);
  
  // Mock data for library resources
  const resources = [
    {
      id: 1,
      title: 'Introduction to React',
      author: 'John Doe',
      category: 'books',
      type: 'pdf',
      uploadDate: '2025-08-25',
      downloads: 245,
      rating: 4.5,
      thumbnail: 'https://via.placeholder.com/150x200/3f51b5/ffffff?text=React',
      description: 'A comprehensive guide to React.js for beginners and advanced developers.'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Patterns',
      author: 'Jane Smith',
      category: 'ebooks',
      type: 'pdf',
      uploadDate: '2025-08-20',
      downloads: 189,
      rating: 4.8,
      thumbnail: 'https://via.placeholder.com/150x200/4caf50/ffffff?text=JS',
      description: 'Learn advanced JavaScript patterns and best practices.'
    },
    {
      id: 3,
      title: 'Mathematics for Grade 10',
      author: 'School Board',
      category: 'textbooks',
      type: 'pdf',
      uploadDate: '2025-08-15',
      downloads: 312,
      rating: 4.2,
      thumbnail: 'https://via.placeholder.com/150x200/ff9800/ffffff?text=Math',
      description: 'Complete mathematics curriculum for 10th grade students.'
    },
    {
      id: 4,
      title: 'Science Experiments',
      author: 'Dr. Sarah Johnson',
      category: 'videos',
      type: 'video',
      uploadDate: '2025-08-10',
      downloads: 156,
      rating: 4.7,
      thumbnail: 'https://via.placeholder.com/150x200/f44336/ffffff?text=Science',
      description: 'Educational science experiments for high school students.'
    },
    {
      id: 5,
      title: 'History of Ancient Civilizations',
      author: 'Prof. Robert Brown',
      category: 'presentations',
      type: 'ppt',
      uploadDate: '2025-08-05',
      downloads: 98,
      rating: 4.0,
      thumbnail: 'https://via.placeholder.com/150x200/9c27b0/ffffff?text=History',
      description: 'Comprehensive presentation on ancient civilizations.'
    },
    {
      id: 6,
      title: 'Creative Writing Guide',
      author: 'Emily Wilson',
      category: 'ebooks',
      type: 'doc',
      uploadDate: '2025-08-01',
      downloads: 203,
      rating: 4.6,
      thumbnail: 'https://via.placeholder.com/150x200/009688/ffffff?text=Writing',
      description: 'A guide to improve creative writing skills.'
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'books', name: 'Books' },
    { id: 'ebooks', name: 'eBooks' },
    { id: 'textbooks', name: 'Textbooks' },
    { id: 'videos', name: 'Videos' },
    { id: 'presentations', name: 'Presentations' },
  ];

  const sortOptions = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'title', name: 'Title (A-Z)' },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FaFilePdf className="text-red-500" size={24} />;
      case 'doc':
        return <FaFileWord className="text-blue-500" size={24} />;
      case 'ppt':
        return <FaFilePowerpoint className="text-orange-500" size={24} />;
      case 'video':
        return <FaFileVideo className="text-purple-500" size={24} />;
      default:
        return <FaBook className="text-gray-500" size={24} />;
    }
  };

  const filterResources = () => {
    return resources
      .filter(resource => 
        (category === 'all' || resource.category === category) &&
        (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
         resource.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'recent':
            return new Date(b.uploadDate) - new Date(a.uploadDate);
          case 'popular':
            return b.downloads - a.downloads;
          case 'rating':
            return b.rating - a.rating;
          case 'title':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  };

  const filteredResources = filterResources();
  const itemsPerPage = 6;
  const pageCount = Math.ceil(filteredResources.length / itemsPerPage);
  const paginatedResources = filteredResources.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Library</h1>
          <p className="text-gray-600">Access educational resources and materials</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<FaDownload />}
          >
            Upload Resource
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <Card className="shadow-md mb-6">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />
            
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
                startAdornment={
                  <InputAdornment position="start">
                    <FaFilter className="text-gray-400 mr-2" />
                  </InputAdornment>
                }
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
                startAdornment={
                  <InputAdornment position="start">
                    <FaSortAmountDown className="text-gray-400 mr-2" />
                  </InputAdornment>
                }
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <div className="flex items-center justify-end space-x-2">
              <IconButton 
                onClick={() => setViewMode('list')} 
                color={viewMode === 'list' ? 'primary' : 'default'}
              >
                <FaListUl />
              </IconButton>
              <IconButton 
                onClick={() => setViewMode('grid')} 
                color={viewMode === 'grid' ? 'primary' : 'default'}
              >
                <FaThLarge />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="body2" color="textSecondary">
          Showing {filteredResources.length} resources
        </Typography>
        <Chip 
          label={`${category === 'all' ? 'All Categories' : categories.find(c => c.id === category)?.name}`} 
          size="small" 
          onDelete={category !== 'all' ? () => setCategory('all') : null}
          className="mr-2"
        />
      </div>

      {/* Resources Grid/List View */}
      {viewMode === 'grid' ? (
        <Grid container spacing={3}>
          {paginatedResources.map((resource) => (
            <Grid item xs={12} sm={6} md={4} key={resource.id}>
              <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={resource.thumbnail}
                    alt={resource.title}
                    className="object-cover"
                  />
                </CardActionArea>
                <CardContent className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <Typography variant="h6" component="h3" className="font-medium line-clamp-2">
                      {resource.title}
                    </Typography>
                    <div className="ml-2">
                      {getFileIcon(resource.type)}
                    </div>
                  </div>
                  <Typography variant="body2" color="textSecondary" className="mb-2">
                    By {resource.author}
                  </Typography>
                  <div className="flex items-center mb-2">
                    {renderRating(resource.rating)}
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">{resource.downloads} downloads</span>
                  </div>
                  <Typography variant="body2" className="text-gray-600 line-clamp-2">
                    {resource.description}
                  </Typography>
                </CardContent>
                <CardActions className="justify-between p-4 border-t">
                  <Button 
                    size="small" 
                    color="primary"
                    startIcon={<FaEye />}
                  >
                    Preview
                  </Button>
                  <Button 
                    size="small" 
                    color="primary" 
                    variant="contained"
                    startIcon={<FaDownload />}
                  >
                    Download
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="space-y-4">
          {paginatedResources.map((resource) => (
            <Card key={resource.id} className="shadow-md hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <CardMedia
                  component="img"
                  className="h-48 md:h-auto md:w-48 object-cover"
                  image={resource.thumbnail}
                  alt={resource.title}
                />
                <div className="flex-1 flex flex-col">
                  <CardContent className="flex-grow">
                    <div className="flex justify-between">
                      <Typography variant="h6" component="h3" className="font-medium">
                        {resource.title}
                      </Typography>
                      <div className="ml-4">
                        {getFileIcon(resource.type)}
                      </div>
                    </div>
                    <Typography variant="body2" color="textSecondary" className="mt-1">
                      By {resource.author} • {new Date(resource.uploadDate).toLocaleDateString()}
                    </Typography>
                    <div className="flex items-center my-2">
                      {renderRating(resource.rating)}
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{resource.downloads} downloads</span>
                    </div>
                    <Typography variant="body2" className="text-gray-600">
                      {resource.description}
                    </Typography>
                  </CardContent>
                  <CardActions className="justify-end p-4 border-t">
                    <Button 
                      size="small" 
                      color="primary"
                      startIcon={<FaEye />}
                      className="mr-2"
                    >
                      Preview
                    </Button>
                    <Button 
                      size="small" 
                      color="primary" 
                      variant="contained"
                      startIcon={<FaDownload />}
                    >
                      Download
                    </Button>
                  </CardActions>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <Box className="flex justify-center mt-8">
          <Pagination 
            count={pageCount} 
            page={page} 
            onChange={(e, value) => setPage(value)} 
            color="primary"
            showFirstButton 
            showLastButton
          />
        </Box>
      )}

      {/* No Results */}
      {filteredResources.length === 0 && (
        <Card className="text-center p-8">
          <FaBook className="mx-auto text-4xl text-gray-300 mb-4" />
          <Typography variant="h6" className="mb-2">No resources found</Typography>
          <Typography variant="body2" color="textSecondary">
            Try adjusting your search or filter criteria
          </Typography>
        </Card>
      )}
    </div>
  );
};

export default Library;
