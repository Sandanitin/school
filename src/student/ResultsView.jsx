import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TextField, InputAdornment,
  FormControl, InputLabel, Select, MenuItem, Tabs, Tab, Chip, LinearProgress,
  IconButton, Tooltip, useTheme, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Divider, Avatar
} from '@mui/material';
import {
  Search as SearchIcon, Assessment as AssessmentIcon, School as SchoolIcon,
  BarChart as BarChartIcon, TableChart as TableChartIcon, Timeline as TimelineIcon,
  Download as DownloadIcon, Print as PrintIcon, Info as InfoIcon, Close as CloseIcon,
  ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon,
  Remove as RemoveIcon, FilterAltOff as FilterAltOffIcon,
  ViewModule as ViewModuleIcon, ShowChart as ShowChartIcon
} from '@mui/icons-material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { format } from 'date-fns';

// Register ChartJS components
ChartJS.register(...registerables);

// Sample data - replace with API calls
const sampleResults = [
  {
    id: 1,
    examName: 'Mid-Term 2023',
    examDate: '2023-10-15',
    subject: 'Mathematics',
    subjectCode: 'MATH101',
    maxMarks: 100,
    marksObtained: 85,
    grade: 'A',
    performance: 'improved',
    term: 'Mid Term',
    topics: [
      { name: 'Algebra', score: 45, maxScore: 50 },
      { name: 'Geometry', score: 30, maxScore: 35 },
      { name: 'Trigonometry', score: 10, maxScore: 15 }
    ]
  },
  // More sample results...
];

const ResultsView = () => {
  const theme = useTheme();
  const [results, setResults] = useState(sampleResults);
  const [filteredResults, setFilteredResults] = useState(sampleResults);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedSort, setSelectedSort] = useState('date-desc');
  const [viewMode, setViewMode] = useState('table');
  const [activeTab, setActiveTab] = useState('current');
  const [selectedResult, setSelectedResult] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Get unique terms and subjects
  const terms = ['all', ...new Set(results.map(item => item.term))];
  const subjects = ['all', ...new Set(results.map(item => item.subject))];  
  // Calculate statistics
  const stats = {
    totalResults: results.length,
    averageMarks: results.reduce((sum, item) => sum + item.marksObtained, 0) / results.length,
    overallPercentage: (results.reduce((sum, item) => sum + item.marksObtained, 0) / 
                      (results.reduce((sum, item) => sum + item.maxMarks, 0))) * 100
  };

  // Filter and sort results
  useEffect(() => {
    let result = [...results];
    
    // Apply filters
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.subject.toLowerCase().includes(term) ||
        item.subjectCode.toLowerCase().includes(term)
      );
    }
    
    if (selectedTerm !== 'all') {
      result = result.filter(item => item.term === selectedTerm);
    }
    
    if (selectedSubject !== 'all') {
      result = result.filter(item => item.subject === selectedSubject);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (selectedSort) {
        case 'subject-asc': return a.subject.localeCompare(b.subject);
        case 'subject-desc': return b.subject.localeCompare(a.subject);
        case 'marks-asc': return a.marksObtained - b.marksObtained;
        case 'marks-desc': return b.marksObtained - a.marksObtained;
        case 'date-asc': return new Date(a.examDate) - new Date(b.examDate);
        case 'date-desc':
        default: return new Date(b.examDate) - new Date(a.examDate);
      }
    });
    
    setFilteredResults(result);
  }, [searchTerm, selectedTerm, selectedSubject, selectedSort, results]);

  // Helper components
  const PerformanceIndicator = ({ type }) => (
    <Chip 
      icon={type === 'improved' ? <ArrowUpwardIcon fontSize="small" /> : 
            type === 'declined' ? <ArrowDownwardIcon fontSize="small" /> : 
            <RemoveIcon fontSize="small" />}
      label={type === 'improved' ? 'Improved' : type === 'declined' ? 'Declined' : 'Same'}
      color={type === 'improved' ? 'success' : type === 'declined' ? 'error' : 'warning'}
      size="small"
      variant="outlined"
    />
  );

  const GradeChip = ({ grade }) => {
    const color = grade.startsWith('A') ? 'success' : 
                 grade.startsWith('B') ? 'info' : 
                 grade.startsWith('C') ? 'warning' : 'error';
    return (
      <Chip 
        label={grade} 
        color={color}
        variant="outlined"
        size="small"
        sx={{ fontWeight: 'bold', minWidth: 50 }}
      />
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          <AssessmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          My Academic Results
        </Typography>
        <Typography color="text.secondary">
          View and analyze your academic performance
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Overall Percentage</Typography>
              <Typography variant="h4">{stats.overallPercentage.toFixed(2)}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Average Marks</Typography>
              <Typography variant="h4">{stats.averageMarks.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total Results</Typography>
              <Typography variant="h4">{stats.totalResults}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Table */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Term</InputLabel>
              <Select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
                <MenuItem value="all">All Terms</MenuItem>
                {terms.filter(t => t !== 'all').map(term => (
                  <MenuItem key={term} value={term}>{term}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Subject</InputLabel>
              <Select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                <MenuItem value="all">All Subjects</MenuItem>
                {subjects.filter(s => s !== 'all').map(subject => (
                  <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
                <MenuItem value="date-desc">Date (Newest)</MenuItem>
                <MenuItem value="date-asc">Date (Oldest)</MenuItem>
                <MenuItem value="marks-desc">Marks (High-Low)</MenuItem>
                <MenuItem value="marks-asc">Marks (Low-High)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="outlined" 
              startIcon={<FilterAltOffIcon />}
              onClick={() => {
                setSearchTerm('');
                setSelectedTerm('all');
                setSelectedSubject('all');
                setSelectedSort('date-desc');
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>

        {/* Results Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell align="center">Exam</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Marks</TableCell>
                <TableCell align="center">Grade</TableCell>
                <TableCell align="center">Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredResults.map((result) => (
                <TableRow 
                  key={result.id}
                  hover
                  onClick={() => {
                    setSelectedResult(result);
                    setIsDetailOpen(true);
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SchoolIcon color="primary" sx={{ mr: 1 }} />
                      <Box>
                        <Typography>{result.subject}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {result.subjectCode}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{result.examName}</TableCell>
                  <TableCell align="center">
                    {format(new Date(result.examDate), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="body1" fontWeight="bold">
                        {result.marksObtained} / {result.maxMarks}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={(result.marksObtained / result.maxMarks) * 100} 
                        color={
                          (result.marksObtained / result.maxMarks) * 100 >= 80 ? 'success' : 
                          (result.marksObtained / result.maxMarks) * 100 >= 50 ? 'warning' : 'error'
                        }
                        sx={{ height: 4, width: '80%', mt: 0.5 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <GradeChip grade={result.grade} />
                  </TableCell>
                  <TableCell align="center">
                    <PerformanceIndicator type={result.performance} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Result Detail Dialog */}
      <Dialog open={isDetailOpen} onClose={() => setIsDetailOpen(false)} maxWidth="md" fullWidth>
        {selectedResult && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  {selectedResult.subject} - {selectedResult.examName}
                </Typography>
                <IconButton onClick={() => setIsDetailOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Exam Details</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Subject Code</Typography>
                    <Typography>{selectedResult.subjectCode}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Term</Typography>
                    <Typography>{selectedResult.term}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Exam Date</Typography>
                    <Typography>{format(new Date(selectedResult.examDate), 'MMMM d, yyyy')}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Performance</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>Marks Obtained:</Typography>
                    <Typography fontWeight="bold">
                      {selectedResult.marksObtained} / {selectedResult.maxMarks}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>Percentage:</Typography>
                    <Typography fontWeight="bold">
                      {((selectedResult.marksObtained / selectedResult.maxMarks) * 100).toFixed(2)}%
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>Grade:</Typography>
                    <GradeChip grade={selectedResult.grade} />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Performance:</Typography>
                    <PerformanceIndicator type={selectedResult.performance} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>Topic-wise Performance</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Topic</TableCell>
                          <TableCell align="right">Score</TableCell>
                          <TableCell align="right">Max</TableCell>
                          <TableCell align="right">%</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedResult.topics.map((topic, index) => (
                          <TableRow key={index}>
                            <TableCell>{topic.name}</TableCell>
                            <TableCell align="right">{topic.score}</TableCell>
                            <TableCell align="right">{topic.maxScore}</TableCell>
                            <TableCell align="right">
                              {((topic.score / topic.maxScore) * 100).toFixed(1)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDetailOpen(false)}>Close</Button>
              <Button variant="contained" startIcon={<DownloadIcon />}>
                Download Report
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ResultsView;
