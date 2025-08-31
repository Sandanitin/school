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
  Tabs,
  Tab,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
  Badge
} from '@mui/material';
import { 
  FaSearch, 
  FaBook, 
  FaFilePdf, 
  FaFileWord, 
  FaFilePowerpoint, 
  FaFileImage,
  FaFilter,
  FaDownload,
  FaEye,
  FaStar,
  FaRegStar,
  FaSortAmountDown,
  FaListUl,
  FaThLarge,
  FaFolder,
  FaFolderOpen,
  FaFileAlt,
  FaBookOpen,
  FaClipboardList,
  FaChevronRight
} from 'react-icons/fa';

const StudyMaterial = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subject, setSubject] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  
  // Mock data for study materials
  const studyMaterials = {
    recent: [
      {
        id: 'm1',
        title: 'Mathematics Chapter 5 Notes',
        type: 'pdf',
        subject: 'Mathematics',
        uploadDate: '2025-08-28',
        size: '2.4 MB',
        isStarred: true
      },
      {
        id: 's1',
        title: 'Science Lab Report Template',
        type: 'doc',
        subject: 'Science',
        uploadDate: '2025-08-27',
        size: '1.2 MB',
        isStarred: false
      },
    ],
    subjects: [
      {
        id: 'math',
        name: 'Mathematics',
        icon: <FaBookOpen className="text-blue-500" />,
        materials: [
          { id: 'm1', title: 'Chapter 5 - Algebra', type: 'pdf', date: '2025-08-28', size: '2.4 MB' },
          { id: 'm2', title: 'Chapter 6 - Geometry', type: 'pdf', date: '2025-08-20', size: '3.1 MB' },
          { id: 'm3', title: 'Practice Problems Set', type: 'doc', date: '2025-08-15', size: '1.8 MB' },
        ]
      },
      {
        id: 'science',
        name: 'Science',
        icon: <FaFlask className="text-green-500" />,
        materials: [
          { id: 's1', title: 'Physics Formulas', type: 'pdf', date: '2025-08-25', size: '1.5 MB' },
          { id: 's2', title: 'Chemistry Lab Report', type: 'doc', date: '2025-08-22', size: '0.9 MB' },
          { id: 's3', title: 'Biology Diagrams', type: 'pptx', date: '2025-08-18', size: '4.2 MB' },
        ]
      },
      {
        id: 'english',
        name: 'English',
        icon: <FaBook className="text-purple-500" />,
        materials: [
          { id: 'e1', title: 'Literature Notes', type: 'pdf', date: '2025-08-24', size: '1.2 MB' },
          { id: 'e2', title: 'Writing Guide', type: 'doc', date: '2025-08-16', size: '0.8 MB' },
        ]
      },
      {
        id: 'history',
        name: 'History',
        icon: <FaLandmark className="text-amber-500" />,
        materials: [
          { id: 'h1', title: 'World War II Timeline', type: 'pdf', date: '2025-08-23', size: '1.7 MB' },
          { id: 'h2', title: 'Ancient Civilizations', type: 'pptx', date: '2025-08-17', size: '3.5 MB' },
        ]
      },
    ],
    folders: [
      {
        id: 'f1',
        name: 'Exam Preparation',
        itemCount: 8,
        lastModified: '2025-08-26',
        icon: <FaFolder className="text-yellow-500" size={24} />
      },
      {
        id: 'f2',
        name: 'Reference Materials',
        itemCount: 12,
        lastModified: '2025-08-22',
        icon: <FaFolder className="text-blue-500" size={24} />
      },
      {
        id: 'f3',
        name: 'Project Work',
        itemCount: 5,
        lastModified: '2025-08-18',
        icon: <FaFolder className="text-green-500" size={24} />
      },
    ]
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FaFilePdf className="text-red-500" size={20} />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="text-blue-500" size={20} />;
      case 'ppt':
      case 'pptx':
        return <FaFilePowerpoint className="text-orange-500" size={20} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FaFileImage className="text-green-500" size={20} />;
      default:
        return <FaFileAlt className="text-gray-500" size={20} />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleToggleSelect = (id) => {
    const currentIndex = selectedItems.indexOf(id);
    const newSelected = [...selectedItems];

    if (currentIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedItems(newSelected);
  };

  const handleSelectAll = (items) => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };

  const renderMaterialCard = (material) => (
    <Card key={material.id} className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <CardActionArea className="flex-grow flex flex-col items-start p-4">
        <div className="flex items-center w-full mb-3">
          <div className="p-2 bg-gray-100 rounded-lg mr-3">
            {getFileIcon(material.type)}
          </div>
          <div className="flex-grow">
            <Typography variant="subtitle2" className="font-medium line-clamp-1">
              {material.title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {material.size} • {formatDate(material.date || material.uploadDate)}
            </Typography>
          </div>
          <IconButton size="small" className="text-gray-400 hover:text-yellow-500">
            {material.isStarred ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
          </IconButton>
        </div>
      </CardActionArea>
      <CardActions className="p-2 border-t flex justify-between">
        <Button size="small" startIcon={<FaEye />}>
          View
        </Button>
        <Button size="small" startIcon={<FaDownload />} color="primary">
          Download
        </Button>
      </CardActions>
    </Card>
  );

  const renderFolderCard = (folder) => (
    <Card key={folder.id} className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <CardActionArea className="flex-grow flex flex-col items-center p-6 text-center">
        <div className="text-4xl mb-3">
          <FaFolderOpen className="text-yellow-500" />
        </div>
        <Typography variant="subtitle1" className="font-medium">
          {folder.name}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {folder.itemCount} items • {formatDate(folder.lastModified)}
        </Typography>
      </CardActionArea>
    </Card>
  );

  const renderSubjectSection = (subject) => (
    <div key={subject.id} className="mb-8">
      <div className="flex items-center mb-4">
        <span className="text-xl mr-2">{subject.icon}</span>
        <Typography variant="h6" className="font-semibold">
          {subject.name}
        </Typography>
        <Button size="small" className="ml-auto" endIcon={<FaChevronRight size={12} />}>
          View All
        </Button>
      </div>
      
      <Grid container spacing={3}>
        {subject.materials.slice(0, 3).map(material => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={material.id}>
            {renderMaterialCard(material)}
          </Grid>
        ))}
      </Grid>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Study Materials</h1>
          <p className="text-gray-600">Access and organize your study resources</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<FaFileAlt />}
          >
            Upload Material
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <Card className="shadow-md mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search study materials..."
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
            
            <FormControl variant="outlined" size="small" className="min-w-[180px]">
              <InputLabel>Subject</InputLabel>
              <Select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                label="Subject"
              >
                <MenuItem value="all">All Subjects</MenuItem>
                {studyMaterials.subjects.map((subj) => (
                  <MenuItem key={subj.id} value={subj.id}>
                    {subj.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <div className="flex items-center space-x-2">
              <IconButton 
                onClick={() => setViewMode('list')} 
                color={viewMode === 'list' ? 'primary' : 'default'}
                size="small"
              >
                <FaListUl />
              </IconButton>
              <IconButton 
                onClick={() => setViewMode('grid')} 
                color={viewMode === 'grid' ? 'primary' : 'default'}
                size="small"
              >
                <FaThLarge />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs 
        value={selectedTab} 
        onChange={(e, newValue) => setSelectedTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        className="mb-6 border-b"
      >
        <Tab label="All Materials" value="all" />
        <Tab label="Recent" value="recent" />
        <Tab label="Starred" value="starred" />
        <Tab label="Folders" value="folders" />
      </Tabs>

      {/* Content Area */}
      {selectedTab === 'recent' && (
        <div className="space-y-6">
          <Typography variant="h6" className="font-semibold mb-4">
            Recently Added
          </Typography>
          <Grid container spacing={3}>
            {studyMaterials.recent.map(material => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={material.id}>
                {renderMaterialCard(material)}
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {selectedTab === 'folders' && (
        <div className="space-y-6">
          <Typography variant="h6" className="font-semibold mb-4">
            My Folders
          </Typography>
          <Grid container spacing={3}>
            {studyMaterials.folders.map(folder => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={folder.id}>
                {renderFolderCard(folder)}
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {selectedTab === 'all' && (
        <div className="space-y-8">
          <div>
            <Typography variant="h6" className="font-semibold mb-4">
              My Folders
            </Typography>
            <Grid container spacing={3}>
              {studyMaterials.folders.map(folder => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={folder.id}>
                  {renderFolderCard(folder)}
                </Grid>
              ))}
            </Grid>
          </div>

          {studyMaterials.subjects.map(subject => renderSubjectSection(subject))}
        </div>
      )}

      {selectedTab === 'starred' && (
        <div className="text-center py-12">
          <FaStar className="mx-auto text-4xl text-gray-300 mb-4" />
          <Typography variant="h6" className="mb-2">No starred items</Typography>
          <Typography variant="body2" color="textSecondary">
            Star important materials to find them quickly
          </Typography>
        </div>
      )}
    </div>
  );
};

// Mock FaFlask and FaLandmark components for demonstration
const FaFlask = ({ className }) => <div className={className}>🧪</div>;
const FaLandmark = ({ className }) => <div className={className}>🏛️</div>;

export default StudyMaterial;
