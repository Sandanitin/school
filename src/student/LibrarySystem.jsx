import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardMedia, CardActionArea,
  TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, 
  Chip, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Divider, Tabs, Tab, Badge, Avatar, Tooltip, LinearProgress, useTheme
} from '@mui/material';
import {
  Search as SearchIcon, FilterList as FilterIcon, Sort as SortIcon,
  Book as BookIcon, Category as CategoryIcon, Person as PersonIcon,
  CalendarMonth as CalendarIcon, Close as CloseIcon, Star as StarIcon,
  StarBorder as StarBorderIcon, Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon, MenuBook as MenuBookIcon,
  LocalLibrary as LocalLibraryIcon, CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon, AccessTime as AccessTimeIcon,
  FilterAltOff as FilterAltOffIcon, ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon
} from '@mui/icons-material';
import { format, addDays, isAfter, parseISO } from 'date-fns';

// Sample data - replace with API calls
const sampleBooks = [
  {
    id: 1,
    title: 'Introduction to React',
    author: 'John Doe',
    isbn: '978-1234567890',
    category: 'Programming',
    publishedYear: 2022,
    publisher: 'Tech Books Inc.',
    description: 'A comprehensive guide to React development with modern practices and examples.',
    coverImage: 'https://via.placeholder.com/150x200?text=React+Book',
    totalCopies: 5,
    availableCopies: 2,
    rating: 4.5,
    location: 'Shelf A1',
    addedDate: '2023-01-15',
    tags: ['react', 'frontend', 'javascript']
  },
  // More sample books...
];

const sampleBorrowedBooks = [
  {
    id: 1,
    bookId: 1,
    title: 'Introduction to React',
    borrowDate: '2023-08-15',
    dueDate: '2023-09-15',
    returnDate: null,
    status: 'borrowed',
    renewalsLeft: 2
  },
  // More sample borrowed books...
];

const LibrarySystem = () => {
  const theme = useTheme();
  const [books, setBooks] = useState(sampleBooks);
  const [filteredBooks, setFilteredBooks] = useState(sampleBooks);
  const [borrowedBooks, setBorrowedBooks] = useState(sampleBorrowedBooks);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');
  const [viewMode, setViewMode] = useState('grid');
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  
  // Get unique categories
  const categories = ['all', ...new Set(books.map(book => book.category))];
  
  // Filter and sort books
  useEffect(() => {
    let result = [...books];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.isbn.includes(term) ||
        book.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(book => book.category === selectedCategory);
    }
    
    // Apply status filter
    if (selectedStatus === 'available') {
      result = result.filter(book => book.availableCopies > 0);
    } else if (selectedStatus === 'unavailable') {
      result = result.filter(book => book.availableCopies === 0);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'title-desc': return b.title.localeCompare(a.title);
        case 'author-asc': return a.author.localeCompare(b.author);
        case 'year-desc': return b.publishedYear - a.publishedYear;
        case 'year-asc': return a.publishedYear - b.publishedYear;
        case 'rating-desc': return b.rating - a.rating;
        default: return 0;
      }
    });
    
    setFilteredBooks(result);
  }, [searchTerm, selectedCategory, selectedStatus, sortBy, books]);
  
  // Handle book selection
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsBookDialogOpen(true);
  };
  
  // Handle book borrowing
  const handleBorrowBook = (bookId) => {
    // In a real app, this would be an API call
    const book = books.find(b => b.id === bookId);
    if (book && book.availableCopies > 0) {
      const newBorrowedBook = {
        id: Date.now(),
        bookId,
        title: book.title,
        borrowDate: new Date().toISOString().split('T')[0],
        dueDate: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
        returnDate: null,
        status: 'borrowed',
        renewalsLeft: 2
      };
      
      setBorrowedBooks([...borrowedBooks, newBorrowedBook]);
      
      // Update available copies
      const updatedBooks = books.map(b => 
        b.id === bookId ? { ...b, availableCopies: b.availableCopies - 1 } : b
      );
      setBooks(updatedBooks);
      
      // Close dialog
      setIsBookDialogOpen(false);
    }
  };
  
  // Handle book return
  const handleReturnBook = (borrowedBookId) => {
    const borrowedBook = borrowedBooks.find(b => b.id === borrowedBookId);
    if (borrowedBook) {
      // Update borrowed books
      const updatedBorrowedBooks = borrowedBooks.map(b => 
        b.id === borrowedBookId 
          ? { ...b, status: 'returned', returnDate: new Date().toISOString().split('T')[0] }
          : b
      );
      
      // Update available copies
      const updatedBooks = books.map(book => 
        book.id === borrowedBook.bookId 
          ? { ...book, availableCopies: book.availableCopies + 1 }
          : book
      );
      
      setBorrowedBooks(updatedBorrowedBooks);
      setBooks(updatedBooks);
    }
  };
  
  // Handle book renewal
  const handleRenewBook = (borrowedBookId) => {
    const updatedBorrowedBooks = borrowedBooks.map(book => {
      if (book.id === borrowedBookId && book.renewalsLeft > 0) {
        return {
          ...book,
          dueDate: format(addDays(parseISO(book.dueDate), 14), 'yyyy-MM-dd'),
          renewalsLeft: book.renewalsLeft - 1
        };
      }
      return book;
    });
    
    setBorrowedBooks(updatedBorrowedBooks);
  };
  
  // Render book card
  const renderBookCard = (book) => (
    <Card key={book.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={() => handleBookClick(book)}>
        <CardMedia
          component="img"
          height="200"
          image={book.coverImage}
          alt={book.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h3" noWrap>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            by {book.author}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Chip 
              size="small" 
              label={`${book.availableCopies} of ${book.totalCopies} available`} 
              color={book.availableCopies > 0 ? 'success' : 'error'}
              variant="outlined"
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon fontSize="small" color="warning" />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {book.rating.toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          startIcon={<BookmarkBorderIcon />}
          onClick={(e) => {
            e.stopPropagation();
            // Add to reading list
          }}
        >
          Save
        </Button>
        <Button 
          size="small" 
          variant="contained"
          disabled={book.availableCopies === 0}
          onClick={(e) => {
            e.stopPropagation();
            handleBorrowBook(book.id);
          }}
        >
          {book.availableCopies > 0 ? 'Borrow' : 'Unavailable'}
        </Button>
      </Box>
    </Card>
  );
  
  // Render book list item
  const renderBookListItem = (book) => (
    <Card key={book.id} sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: 100, flexShrink: 0 }}>
          <CardMedia
            component="img"
            height="140"
            image={book.coverImage}
            alt={book.title}
            sx={{ height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent>
            <Typography variant="h6" component="h3">
              {book.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              by {book.author} • {book.publishedYear} • {book.category}
            </Typography>
            <Typography variant="body2" paragraph>
              {book.description.length > 200 
                ? `${book.description.substring(0, 200)}...` 
                : book.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                size="small" 
                label={`${book.availableCopies} available`} 
                color={book.availableCopies > 0 ? 'success' : 'error'}
                variant="outlined"
              />
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                <StarIcon fontSize="small" color="warning" />
                <Typography variant="body2" sx={{ ml: 0.5, mr: 2 }}>
                  {book.rating.toFixed(1)}
                </Typography>
                <Button 
                  size="small" 
                  startIcon={<BookmarkBorderIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to reading list
                  }}
                >
                  Save
                </Button>
                <Button 
                  size="small" 
                  variant="contained"
                  disabled={book.availableCopies === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBorrowBook(book.id);
                  }}
                  sx={{ ml: 1 }}
                >
                  {book.availableCopies > 0 ? 'Borrow' : 'Unavailable'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
  
  // Render borrowed book item
  const renderBorrowedBook = (borrowedBook) => {
    const book = books.find(b => b.id === borrowedBook.bookId) || {};
    const isOverdue = isAfter(new Date(), parseISO(borrowedBook.dueDate));
    
    return (
      <Card key={borrowedBook.id} sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: 100, flexShrink: 0 }}>
            <CardMedia
              component="img"
              height="140"
              image={book.coverImage}
              alt={book.title}
              sx={{ height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h6" component="h3">
                  {borrowedBook.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  by {book.author}
                </Typography>
              </Box>
              <Chip 
                label={isOverdue ? 'Overdue' : 'Borrowed'}
                color={isOverdue ? 'error' : 'primary'}
                size="small"
              />
            </Box>
            
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Borrowed on</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <CalendarIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">
                    {format(new Date(borrowedBook.borrowDate), 'MMM d, yyyy')}
                  </Typography>
                </Box>
              </Box>
              
              <Box>
                <Typography variant="caption" color="text.secondary">Due on</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <AccessTimeIcon 
                    fontSize="small" 
                    color={isOverdue ? 'error' : 'action'} 
                    sx={{ mr: 0.5 }} 
                  />
                  <Typography variant="body2" color={isOverdue ? 'error.main' : 'inherit'}>
                    {format(new Date(borrowedBook.dueDate), 'MMM d, yyyy')}
                  </Typography>
                </Box>
              </Box>
              
              <Box>
                <Typography variant="caption" color="text.secondary">Renewals left</Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {borrowedBook.renewalsLeft}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => handleRenewBook(borrowedBook.id)}
                disabled={borrowedBook.renewalsLeft === 0}
              >
                Renew
              </Button>
              <Button 
                variant="contained" 
                size="small"
                color="error"
                onClick={() => handleReturnBook(borrowedBook.id)}
              >
                Return
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          <LocalLibraryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Library System
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse, borrow, and manage your library books
        </Typography>
      </Box>
      
      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MenuBookIcon sx={{ mr: 1 }} />
                <span>Browse Books</span>
              </Box>
            } 
            value="browse" 
          />
          <Tab 
            label={
              <Badge badgeContent={borrowedBooks.filter(b => b.status === 'borrowed').length} color="error">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BookIcon sx={{ mr: 1 }} />
                  <span>My Books</span>
                </Box>
              </Badge>
            } 
            value="mybooks" 
          />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {activeTab === 'browse' ? (
            <>
              {/* Search and Filters */}
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      placeholder="Search by title, author, or ISBN..."
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
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        label="Category"
                      >
                        <MenuItem value="all">All Categories</MenuItem>
                        {categories.filter(c => c !== 'all').map(category => (
                          <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        label="Status"
                      >
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="available">Available</MenuItem>
                        <MenuItem value="unavailable">Unavailable</MenuItem>
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
                        <MenuItem value="relevance">Relevance</MenuItem>
                        <MenuItem value="title-asc">Title (A-Z)</MenuItem>
                        <MenuItem value="title-desc">Title (Z-A)</MenuItem>
                        <MenuItem value="author-asc">Author (A-Z)</MenuItem>
                        <MenuItem value="year-desc">Newest First</MenuItem>
                        <MenuItem value="year-asc">Oldest First</MenuItem>
                        <MenuItem value="rating-desc">Highest Rated</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      startIcon={<FilterAltOffIcon />}
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setSelectedStatus('all');
                        setSortBy('relevance');
                      }}
                    >
                      Reset
                    </Button>
                    <IconButton 
                      onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                      sx={{ ml: 1 }}
                    >
                      {viewMode === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
              
              {/* Results */}
              {filteredBooks.length > 0 ? (
                viewMode === 'grid' ? (
                  <Grid container spacing={3}>
                    {filteredBooks.map(book => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                        {renderBookCard(book)}
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box>
                    {filteredBooks.map(book => renderBookListItem(book))}
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
                  <BookIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No books found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
                    No books match your current filters. Try adjusting your search criteria or reset the filters.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedStatus('all');
                      setSortBy('relevance');
                    }}
                  >
                    Reset Filters
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                My Borrowed Books ({borrowedBooks.filter(b => b.status === 'borrowed').length})
              </Typography>
              
              {borrowedBooks.filter(b => b.status === 'borrowed').length > 0 ? (
                <Box>
                  {borrowedBooks
                    .filter(book => book.status === 'borrowed')
                    .map(book => renderBorrowedBook(book))}
                </Box>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  py: 8,
                  textAlign: 'center'
                }}>
                  <MenuBookIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No books borrowed
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
                    You haven't borrowed any books yet. Browse our collection to find your next read!
                  </Typography>
                  <Button 
                    variant="contained"
                    onClick={() => setActiveTab('browse')}
                  >
                    Browse Books
                  </Button>
                </Box>
              )}
              
              {/* Borrowing History */}
              {borrowedBooks.filter(b => b.status === 'returned').length > 0 && (
                <Box sx={{ mt: 6 }}>
                  <Typography variant="h6" gutterBottom>
                    Borrowing History
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Title</TableCell>
                          <TableCell>Borrowed Date</TableCell>
                          <TableCell>Returned Date</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {borrowedBooks
                          .filter(book => book.status === 'returned')
                          .map(book => (
                            <TableRow key={book.id}>
                              <TableCell>{book.title}</TableCell>
                              <TableCell>{format(new Date(book.borrowDate), 'MMM d, yyyy')}</TableCell>
                              <TableCell>{book.returnDate ? format(new Date(book.returnDate), 'MMM d, yyyy') : '-'}</TableCell>
                              <TableCell>
                                <Chip 
                                  label="Returned" 
                                  size="small" 
                                  color="success" 
                                  variant="outlined"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Paper>
      
      {/* Book Details Dialog */}
      <Dialog 
        open={isBookDialogOpen} 
        onClose={() => setIsBookDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedBook && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{selectedBook.title}</Typography>
                <IconButton onClick={() => setIsBookDialogOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    width: '100%',
                    borderRadius: 1,
                    overflow: 'hidden',
                    boxShadow: 1
                  }}>
                    <img 
                      src={selectedBook.coverImage} 
                      alt={selectedBook.title}
                      style={{ width: '100%', display: 'block' }}
                    />
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      size="large"
                      disabled={selectedBook.availableCopies === 0}
                      onClick={() => handleBorrowBook(selectedBook.id)}
                      startIcon={<BookIcon />}
                    >
                      {selectedBook.availableCopies > 0 ? 'Borrow This Book' : 'Not Available'}
                    </Button>
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      startIcon={<BookmarkBorderIcon />}
                    >
                      Add to Reading List
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5" component="h1" gutterBottom>
                      {selectedBook.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      by {selectedBook.author}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                      <Chip 
                        label={selectedBook.category} 
                        size="small" 
                        icon={<CategoryIcon fontSize="small" />}
                        variant="outlined"
                      />
                      <Chip 
                        label={`${selectedBook.availableCopies} of ${selectedBook.totalCopies} available`} 
                        size="small" 
                        color={selectedBook.availableCopies > 0 ? 'success' : 'error'}
                        variant="outlined"
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                        <StarIcon color="warning" />
                        <Typography variant="body1" sx={{ ml: 0.5, mr: 1 }}>
                          {selectedBook.rating.toFixed(1)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ({Math.floor(Math.random() * 100)} ratings)
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>Description</Typography>
                      <Typography variant="body1" paragraph>
                        {selectedBook.description}
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="subtitle2" color="text.secondary">Publisher</Typography>
                        <Typography>{selectedBook.publisher}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="subtitle2" color="text.secondary">Published</Typography>
                        <Typography>{selectedBook.publishedYear}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="subtitle2" color="text.secondary">ISBN</Typography>
                        <Typography>{selectedBook.isbn}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                        <Typography>{selectedBook.location}</Typography>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Tags
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedBook.tags.map((tag, index) => (
                          <Chip 
                            key={index} 
                            label={tag} 
                            size="small" 
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsBookDialogOpen(false)}>Close</Button>
              <Button 
                variant="contained" 
                disabled={selectedBook.availableCopies === 0}
                onClick={() => {
                  handleBorrowBook(selectedBook.id);
                  setIsBookDialogOpen(false);
                }}
              >
                Borrow Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default LibrarySystem;
