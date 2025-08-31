import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  TablePagination
} from '@mui/material';
import { Search, Visibility, Download, CheckCircle, Pending } from '@mui/icons-material';

const HomeworkSubmissionStatus = () => {
  // Sample data - replace with actual data from your backend
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      rollNumber: '001',
      submissionDate: '2025-08-30T10:30:00',
      status: 'Submitted',
      grade: 'A',
      comments: 'Good work!',
      file: 'homework1.pdf'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      rollNumber: '002',
      submissionDate: '2025-08-29T15:45:00',
      status: 'Graded',
      grade: 'B+',
      comments: 'Needs improvement in explanations',
      file: 'homework_jane.pdf'
    },
    {
      id: 3,
      studentName: 'Alex Johnson',
      rollNumber: '003',
      submissionDate: null,
      status: 'Not Submitted',
      grade: null,
      comments: '',
      file: null
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.rollNumber.includes(searchTerm)
  );

  const getStatusChip = (status) => {
    switch (status) {
      case 'Submitted':
        return <Chip icon={<Pending />} label="Submitted" color="info" size="small" />;
      case 'Graded':
        return <Chip icon={<CheckCircle />} label="Graded" color="success" size="small" />;
      case 'Not Submitted':
        return <Chip label="Not Submitted" color="default" size="small" variant="outlined" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const handleDownload = (fileName) => {
    // Implement download functionality
    console.log('Downloading:', fileName);
  };

  const handleGradeChange = (id, value) => {
    setSubmissions(submissions.map(submission => 
      submission.id === id ? { ...submission, grade: value } : submission
    ));
  };

  const handleCommentsChange = (id, value) => {
    setSubmissions(submissions.map(submission => 
      submission.id === id ? { ...submission, comments: value } : submission
    ));
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Homework Submissions</Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search students..."
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
      </Box>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Roll No.</TableCell>
                <TableCell>Submission Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSubmissions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.studentName}</TableCell>
                    <TableCell>{submission.rollNumber}</TableCell>
                    <TableCell>
                      {submission.submissionDate
                        ? new Date(submission.submissionDate).toLocaleString()
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {getStatusChip(submission.status)}
                    </TableCell>
                    <TableCell>
                      {submission.status !== 'Not Submitted' ? (
                        <TextField
                          size="small"
                          value={submission.grade || ''}
                          onChange={(e) => handleGradeChange(submission.id, e.target.value)}
                          sx={{ width: '80px' }}
                          placeholder="A"
                        />
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>
                      {submission.status !== 'Not Submitted' ? (
                        <TextField
                          size="small"
                          value={submission.comments || ''}
                          onChange={(e) => handleCommentsChange(submission.id, e.target.value)}
                          placeholder="Add comments..."
                          fullWidth
                        />
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>
                      {submission.file && (
                        <Tooltip title="Download Submission">
                          <IconButton 
                            onClick={() => handleDownload(submission.file)}
                            color="primary"
                            size="small"
                          >
                            <Download />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="View Details">
                        <IconButton color="primary" size="small">
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSubmissions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default HomeworkSubmissionStatus;
