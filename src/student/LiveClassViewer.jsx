import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, IconButton, Button, Divider, Tabs, Tab,
  TextField, InputAdornment, Avatar, Badge, List, ListItem, ListItemAvatar,
  ListItemText, ListItemIcon, useTheme, useMediaQuery, Chip
} from '@mui/material';
import {
  Videocam as VideocamIcon, Chat as ChatIcon, People as PeopleIcon,
  Send as SendIcon, Mic as MicIcon, MicOff as MicOffIcon,
  VideocamOff as VideocamOffIcon, ScreenShare as ScreenShareIcon,
  StopScreenShare as StopScreenShareIcon, FiberManualRecord as FiberManualRecordIcon,
  EmojiEmotions as EmojiEmotionsIcon, GetApp as GetAppIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

const LiveClassViewer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [showParticipants, setShowParticipants] = useState(!isMobile);
  
  // Sample data
  const classData = {
    title: 'Advanced Calculus - Limits and Continuity',
    subject: 'Mathematics',
    instructor: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
    },
    participants: [
      { id: 'p001', name: 'Alex Johnson', role: 'student', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', online: true },
      { id: 'p002', name: 'Maria Garcia', role: 'student', avatar: 'https://randomuser.me/api/portraits/women/22.jpg', online: true },
      { id: 'p003', name: 'James Wilson', role: 'student', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', online: false }
    ],
    chat: [
      { id: 'msg1', sender: 'Dr. Sarah Johnson', message: 'Welcome everyone!', time: '10:00 AM' },
      { id: 'msg2', sender: 'Alex Johnson', message: 'Good to be here!', time: '10:02 AM' },
      { id: 'msg3', sender: 'Maria Garcia', message: 'Excited for the lesson!', time: '10:03 AM' }
    ]
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // In a real app, send message to server
      console.log('Message sent:', chatMessage);
      setChatMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Video Container */}
        <Box sx={{ 
          flex: 1, 
          backgroundColor: '#000',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <VideocamIcon sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h6">{classData.title}</Typography>
            <Typography variant="body2">Live stream will start soon</Typography>
          </Box>
          
          {/* Controls */}
          <Box sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2,
            bgcolor: 'rgba(0,0,0,0.6)',
            p: 1,
            borderRadius: 4
          }}>
            <IconButton 
              color={isMicOn ? 'primary' : 'default'}
              onClick={() => setIsMicOn(!isMicOn)}
              sx={{ color: 'white' }}
            >
              {isMicOn ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
            <IconButton 
              color={isCameraOn ? 'primary' : 'default'}
              onClick={() => setIsCameraOn(!isCameraOn)}
              sx={{ color: 'white' }}
            >
              {isCameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
            <IconButton 
              color={isScreenSharing ? 'primary' : 'default'}
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              sx={{ color: 'white' }}
            >
              {isScreenSharing ? <StopScreenShareIcon /> : <ScreenShareIcon />}
            </IconButton>
            <IconButton 
              color={isMuted ? 'default' : 'primary'}
              onClick={() => setIsMuted(!isMuted)}
              sx={{ color: 'white' }}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </IconButton>
          </Box>
        </Box>
        
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
          >
            <Tab label="Chat" value="chat" icon={<ChatIcon />} />
            <Tab label="Participants" value="participants" icon={<PeopleIcon />} />
          </Tabs>
        </Box>
        
        {/* Tab Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {activeTab === 'chat' ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {classData.chat.map((msg) => (
                  <Box key={msg.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
                        {msg.sender}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {msg.time}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{msg.message}</Typography>
                  </Box>
                ))}
              </Box>
              
              {/* Chat Input */}
              <Box component="form" onSubmit={handleSendMessage} sx={{ p: 1, borderTop: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small">
                    <EmojiEmotionsIcon />
                  </IconButton>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    variant="outlined"
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    disabled={!chatMessage.trim()}
                  >
                    Send
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <List>
              {classData.participants.map((participant) => (
                <ListItem key={participant.id}>
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      color={participant.online ? 'success' : 'default'}
                    >
                      <Avatar src={participant.avatar} alt={participant.name} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={participant.name}
                    secondary={participant.role}
                  />
                  {participant.role === 'instructor' && (
                    <Chip label="Host" size="small" color="primary" />
                  )}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
      
      {/* Sidebar - Only show on larger screens */}
      {!isMobile && (
        <Box sx={{ width: 300, borderLeft: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="subtitle1" gutterBottom>Class Information</Typography>
            <Typography variant="body2">
              <strong>Instructor:</strong> {classData.instructor.name}
            </Typography>
            <Typography variant="body2">
              <strong>Subject:</strong> {classData.subject}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {format(new Date(), 'MMMM d, yyyy hh:mm a')}
            </Typography>
          </Box>
          
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2">Participants ({classData.participants.length})</Typography>
              <Chip 
                label="Live" 
                size="small" 
                color="error" 
                icon={<FiberManualRecordIcon fontSize="small" />}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', mr: 1 }}>
                {classData.participants.slice(0, 3).map((p, i) => (
                  <Avatar 
                    key={p.id}
                    src={p.avatar}
                    alt={p.name}
                    sx={{
                      width: 32,
                      height: 32,
                      border: '2px solid white',
                      ml: i > 0 ? -1 : 0,
                      zIndex: 3 - i
                    }}
                  />
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary">
                {classData.participants.length} people joined
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>
            <Typography variant="subtitle2" gutterBottom>Class Materials</Typography>
            <List dense>
              <ListItem button>
                <ListItemIcon><GetAppIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Lecture Notes.pdf" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><GetAppIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Assignment.pdf" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><GetAppIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Reference Materials.zip" />
              </ListItem>
            </List>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LiveClassViewer;
