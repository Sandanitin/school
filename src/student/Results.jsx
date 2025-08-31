import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  LinearProgress,
  Divider
} from '@mui/material';
import { 
  FaChartLine,
  FaFilter,
  FaInfoCircle,
  FaTrophy,
  FaStar,
  FaBookOpen,
  FaClipboardList
} from 'react-icons/fa';

const StudentResults = () => {
  const [examType, setExamType] = useState('all');
  const [subject, setSubject] = useState('all');
  
  // Mock data for results
  const resultsData = {
    overall: {
      percentage: 87.5,
      grade: 'A',
      rank: 5,
      totalStudents: 120
    },
    subjects: [
      { id: 'math', name: 'Mathematics', marks: 92, maxMarks: 100, grade: 'A+', rank: 3 },
      { id: 'science', name: 'Science', marks: 88, maxMarks: 100, grade: 'A', rank: 7 },
      { id: 'english', name: 'English', marks: 85, maxMarks: 100, grade: 'A', rank: 12 },
      { id: 'history', name: 'History', marks: 82, maxMarks: 100, grade: 'B+', rank: 18 },
      { id: 'geography', name: 'Geography', marks: 91, maxMarks: 100, grade: 'A+', rank: 4 },
    ],
    examTypes: [
      { id: 'all', name: 'All Exams' },
      { id: 'midterm', name: 'Mid Term' },
      { id: 'final', name: 'Final Term' },
      { id: 'unit', name: 'Unit Test' },
    ],
    performanceHistory: [
      { exam: 'Unit Test 1', date: '2025-04-15', percentage: 82, grade: 'A-' },
      { exam: 'Mid Term', date: '2025-05-20', percentage: 85, grade: 'A' },
      { exam: 'Unit Test 2', date: '2025-06-10', percentage: 88, grade: 'A' },
      { exam: 'Final Term', date: '2025-07-25', percentage: 87.5, grade: 'A' },
    ]
  };

  const subjectsList = [
    { id: 'all', name: 'All Subjects' },
    ...resultsData.subjects.map(subj => ({ id: subj.id, name: subj.name }))
  ];

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A+': 'text-green-600',
      'A': 'text-green-500',
      'A-': 'text-lime-500',
      'B+': 'text-blue-500',
      'B': 'text-blue-400',
      'B-': 'text-amber-500',
      'C+': 'text-amber-600',
      'C': 'text-orange-500',
      'D': 'text-red-500',
      'F': 'text-red-600',
    };
    return gradeColors[grade] || 'text-gray-600';
  };

  const getPerformanceStatus = (percentage) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 80) return 'Very Good';
    if (percentage >= 70) return 'Good';
    if (percentage >= 60) return 'Satisfactory';
    return 'Needs Improvement';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Results</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-md">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Overall Percentage
                </Typography>
                <Typography variant="h4" className={`font-bold ${getGradeColor(resultsData.overall.grade)}`}>
                  {resultsData.overall.percentage}%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {getPerformanceStatus(resultsData.overall.percentage)}
                </Typography>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FaChartLine size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Grade
                </Typography>
                <Typography variant="h4" className={`font-bold ${getGradeColor(resultsData.overall.grade)}`}>
                  {resultsData.overall.grade}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Overall Grade
                </Typography>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaStar size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Class Rank
                </Typography>
                <Typography variant="h4" className="font-bold text-purple-600">
                  {resultsData.overall.rank}
                  <span className="text-sm font-normal text-gray-500">/{resultsData.overall.totalStudents}</span>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Top {Math.round((resultsData.overall.rank / resultsData.overall.totalStudents) * 100)}%
                </Typography>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <FaTrophy size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Best Subject
                </Typography>
                <Typography variant="h6" className="font-medium">
                  {resultsData.subjects.reduce((prev, current) => 
                    (prev.marks > current.marks) ? prev : current).name
                  }
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {resultsData.subjects.reduce((prev, current) => 
                    (prev.marks > current.marks) ? prev : current).marks}%
                </Typography>
              </div>
              <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                <FaBookOpen size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters */}
      <Card className="shadow-md mb-6">
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex items-center">
              <FaFilter className="text-gray-500 mr-2" />
              <Typography variant="subtitle1" className="font-medium">
                Filter By:
              </Typography>
            </div>
            
            <FormControl size="small" className="min-w-[180px]">
              <InputLabel>Exam Type</InputLabel>
              <Select
                value={examType}
                label="Exam Type"
                onChange={(e) => setExamType(e.target.value)}
              >
                {resultsData.examTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl size="small" className="min-w-[180px]">
              <InputLabel>Subject</InputLabel>
              <Select
                value={subject}
                label="Subject"
                onChange={(e) => setSubject(e.target.value)}
              >
                {subjectsList.map((subj) => (
                  <MenuItem key={subj.id} value={subj.id}>
                    {subj.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </CardContent>
      </Card>
      
      {/* Subject-wise Performance */}
      <Card className="shadow-md mb-6">
        <CardContent>
          <div className="flex items-center mb-4">
            <FaClipboardList className="text-blue-500 mr-2" />
            <Typography variant="h6" className="font-semibold">
              Subject-wise Performance
            </Typography>
          </div>
          
          <div className="space-y-6">
            {resultsData.subjects.map((subject) => (
              <div key={subject.id}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <Typography variant="subtitle1" className="font-medium">
                      {subject.name}
                    </Typography>
                    <div className="flex items-center space-x-4">
                      <span className={`text-lg font-semibold ${getGradeColor(subject.grade)}`}>
                        {subject.marks}/{subject.maxMarks}
                      </span>
                      <span className={`px-2 py-1 rounded text-sm ${getGradeColor(subject.grade)}`}>
                        {subject.grade}
                      </span>
                      <span className="text-sm text-gray-500">
                        Rank: {subject.rank}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Typography variant="body2" color="textSecondary">
                      {((subject.marks / subject.maxMarks) * 100).toFixed(1)}%
                    </Typography>
                  </div>
                </div>
                <LinearProgress 
                  variant="determinate" 
                  value={(subject.marks / subject.maxMarks) * 100} 
                  className="h-2 rounded-full"
                  color={
                    (subject.marks / subject.maxMarks) * 100 >= 90 ? 'success' :
                    (subject.marks / subject.maxMarks) * 100 >= 75 ? 'primary' :
                    (subject.marks / subject.maxMarks) * 100 >= 60 ? 'warning' : 'error'
                  }
                />
                <Divider className="mt-4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Performance History */}
      <Card className="shadow-md">
        <CardContent>
          <div className="flex items-center mb-4">
            <FaChartLine className="text-green-500 mr-2" />
            <Typography variant="h6" className="font-semibold">
              Performance History
            </Typography>
          </div>
          
          <div className="overflow-x-auto">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="bg-gray-100">
                    <TableCell>Exam</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Percentage</TableCell>
                    <TableCell align="right">Grade</TableCell>
                    <TableCell>Progress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultsData.performanceHistory.map((exam, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{exam.exam}</TableCell>
                      <TableCell>
                        {new Date(exam.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell align="right">{exam.percentage}%</TableCell>
                      <TableCell align="right">
                        <span className={`font-medium ${getGradeColor(exam.grade)}`}>
                          {exam.grade}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-full mr-2">
                            <LinearProgress 
                              variant="determinate" 
                              value={exam.percentage} 
                              className="h-2 rounded-full"
                              color={
                                exam.percentage >= 90 ? 'success' :
                                exam.percentage >= 75 ? 'primary' :
                                exam.percentage >= 60 ? 'warning' : 'error'
                              }
                            />
                          </div>
                          <span className="text-sm text-gray-500 w-12">
                            +{index > 0 ? (exam.percentage - resultsData.performanceHistory[index - 1].percentage).toFixed(1) : '0.0'}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentResults;
