import React, { useState, useRef } from 'react';
import {
  Box, Typography, Paper, Button, IconButton, Tooltip, Divider, List, ListItem,
  ListItemText, ListItemAvatar, Avatar, Badge, TextField, InputAdornment, Tabs, Tab
} from '@mui/material';
import {
  Videocam as VideocamIcon, VideocamOff as VideocamOffIcon, Mic as MicIcon,
  MicOff as MicOffIcon, ScreenShare as ScreenShareIcon, StopScreenShare as StopScreenShareIcon,
  People as PeopleIcon, Chat as ChatIcon, Send as SendIcon, MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon, RecordVoiceOver as RecordVoiceOverIcon
} from '@mui/icons-material';

const LiveClassHost = () => {
  // State for media controls
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeTab, setActiveTab] = useState('participants');
  
  // Sample data
  const [participants] = useState([
    { id: 1, name: 'John Doe', isMuted: false, isVideoOn: true, isHandRaised: false },
    { id: 2, name: 'Jane Smith', isMuted: true, isVideoOn: true, isHandRaised: true },
    { id: 3, name: 'Alex Johnson', isMuted: false, isVideoOn: false, isHandRaised: false },
  ]);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'John Doe', message: 'Good morning!', time: '10:00 AM', isTeacher: false },
    { id: 2, sender: 'You', message: 'Welcome to class!', time: '10:01 AM', isTeacher: true },
  ]);

  const [chatMessage, setChatMessage] = useState('');
  const localVideoRef = useRef(null);
  const screenShareRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Media control handlers
  const toggleCamera = () => setIsCameraOn(!isCameraOn);
  const toggleMic = () => setIsMicOn(!isMicOn);
  
  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        screenShareRef.current.srcObject = screenStream;
        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
        };
      } else {
        const tracks = screenShareRef.current?.srcObject?.getTracks() || [];
        tracks.forEach(track => track.stop());
        screenShareRef.current.srcObject = null;
      }
      setIsScreenSharing(!isScreenSharing);
    } catch (err) {
      console.error('Error sharing screen:', err);
    }
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'You',
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTeacher: true
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatMessage('');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#1a1e23' }}>
      {/* Main Video Area */}
      <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', p: 2 }}>
        {/* Main Video */}
        <Paper sx={{ flex: 1, borderRadius: 2, overflow: 'hidden', bgcolor: '#0f1217', mb: 2 }}>
          {isScreenSharing ? (
            <video
              ref={screenShareRef}
              autoPlay
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <Box sx={{ textAlign: 'center', color: 'white', p: 4 }}>
              <VideocamOffIcon sx={{ fontSize: 60, opacity: 0.5 }} />
              <Typography variant="h6" sx={{ mt: 1 }}>No active speaker</Typography>
            </Box>
          )}
        </Paper>

        {/* Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, py: 1 }}>
          <Tooltip title={isMicOn ? 'Mute' : 'Unmute'}>
            <IconButton 
              onClick={toggleMic}
              sx={{ bgcolor: isMicOn ? 'rgba(255,255,255,0.1)' : 'error.main', color: 'white' }}
            >
              {isMicOn ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}>
            <IconButton 
              onClick={toggleCamera}
              sx={{ bgcolor: isCameraOn ? 'rgba(255,255,255,0.1)' : 'error.main', color: 'white' }}
            >
              {isCameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title={isScreenSharing ? 'Stop sharing' : 'Share screen'}>
            <IconButton 
              onClick={toggleScreenShare}
              sx={{ bgcolor: isScreenSharing ? 'error.main' : 'rgba(255,255,255,0.1)', color: 'white' }}
            >
              {isScreenSharing ? <StopScreenShareIcon /> : <ScreenShareIcon />}
            </IconButton>
          </Tooltip>
          
          <Button variant="contained" color="error" sx={{ ml: 2 }}>
            End Class
          </Button>
        </Box>
      </Box>

      {/* Sidebar */}
      <Paper sx={{ width: 350, bgcolor: '#252a33', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: '#4285f4' },
            '& .MuiTab-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-selected': { color: '#fff' },
            },
          }}
        >
          <Tab icon={<PeopleIcon />} label={`Participants (${participants.length})`} value="participants" />
          <Tab icon={<ChatIcon />} label="Chat" value="chat" />
        </Tabs>
        
        <Divider sx={{ bgcolor: '#3a3f48' }} />
        
        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'participants' ? (
            <List dense sx={{ overflowY: 'auto', flex: 1 }}>
              {participants.map((p) => (
                <ListItem key={p.id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: p.isHandRaised ? '#4caf50' : 'primary.main' }}>
                      {p.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={p.name}
                    secondary={p.isMuted ? 'Muted' : 'Speaking'}
                    secondaryTypographyProps={{ color: p.isMuted ? 'error.main' : 'success.main' }}
                  />
                  {p.isHandRaised && <RecordVoiceOverIcon color="success" />}
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }} ref={chatContainerRef}>
                {chatMessages.map((msg) => (
                  <Box key={msg.id} sx={{ mb: 2, display: 'flex', flexDirection: msg.isTeacher ? 'row-reverse' : 'row' }}>
                    <Avatar sx={{ bgcolor: msg.isTeacher ? '#4285f4' : '#5f6368', width: 32, height: 32, fontSize: '0.8rem' }}>
                      {msg.sender.charAt(0)}
                    </Avatar>
                    <Box sx={{ maxWidth: '70%', ml: 1, mr: msg.isTeacher ? 1 : 0 }}>
                      <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: msg.isTeacher ? '#4285f4' : '#3a3f48' }}>
                        <Typography variant="body2">{msg.message}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, opacity: 0.7 }}>
                          {msg.time}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
              
              <Box sx={{ p: 2, borderTop: '1px solid #3a3f48' }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  variant="outlined"
                  placeholder="Send a message to everyone"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  InputProps={{
                    sx: { 
                      bgcolor: '#3a3f48',
                      borderRadius: 4,
                      color: 'white',
                      '&:hover fieldset': { borderColor: '#5f6368' },
                      '&.Mui-focused fieldset': { borderColor: '#4285f4' },
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          onClick={handleSendMessage}
                          disabled={!chatMessage.trim()}
                          sx={{ color: '#4285f4' }}
                        >
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default LiveClassHost;
