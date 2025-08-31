import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Badge,
  Menu,
  MenuItem,
  InputAdornment,
  Chip,
  Button,
  Tooltip,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import {
  Send,
  AttachFile,
  EmojiEmotions,
  Notifications as NotificationsIcon,
  Chat,
  People,
  Announcement,
  MoreVert,
  CheckCircle,
  Schedule,
  Error as ErrorIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

const CommunicationPanel = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const messagesEndRef = useRef(null);

  // Sample data - replace with actual API calls
  const chats = [
    { id: 1, name: 'Class 10A', lastMessage: 'Homework submitted by 15 students', time: '10:30 AM', unread: 2 },
    { id: 2, name: 'Mathematics Group', lastMessage: 'Discussion about tomorrow\'s assignment', time: '9:15 AM', unread: 1 },
    { id: 3, name: 'Science Club', lastMessage: 'Meeting at 3 PM', time: 'Yesterday', unread: 0 },
  ];

  const announcements = [
    { id: 1, title: 'School Reopening', content: 'School will reopen on September 15th', date: '2023-08-28' },
    { id: 2, title: 'PTA Meeting', content: 'Next PTA meeting scheduled for September 5th', date: '2023-08-25' },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'teacher',
      timestamp: new Date(),
      status: 'sent'
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = () => {
    setNotificationCount(0);
    // Add notification handling logic here
  };

  useEffect(() => {
    // Auto-scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Paper 
        elevation={3} 
        sx={{ 
          width: 300, 
          display: 'flex', 
          flexDirection: 'column',
          borderRight: '1px solid #e0e0e0'
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Communications</Typography>
          <Box>
            <Tooltip title="Notifications">
              <IconButton 
                color="inherit" 
                onClick={handleNotificationClick}
                sx={{ mr: 1 }}
              >
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <IconButton onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>New Group</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Help</MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab 
              icon={<Chat />} 
              label="Chats" 
              value="chat" 
              sx={{ minHeight: 64 }} 
            />
            <Tab 
              icon={<People />} 
              label="Groups" 
              value="groups" 
              sx={{ minHeight: 64 }} 
            />
            <Tab 
              icon={<Announcement />} 
              label="Announcements" 
              value="announcements" 
              sx={{ minHeight: 64 }} 
            />
          </Tabs>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          {activeTab === 'chat' && (
            <List>
              {chats.map((chat) => (
                <React.Fragment key={chat.id}>
                  <ListItem 
                    button 
                    selected={selectedChat === chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: 'action.selected',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {chat.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle2" noWrap>
                            {chat.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {chat.time}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            sx={{ 
                              flex: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              mr: 1
                            }}
                          >
                            {chat.lastMessage}
                          </Typography>
                          {chat.unread > 0 && (
                            <Chip 
                              label={chat.unread} 
                              size="small" 
                              color="primary"
                              sx={{ height: 18, minWidth: 20 }}
                            />
                          )}
                        </Box>
                      }
                      primaryTypographyProps={{ noWrap: true }}
                      sx={{ m: 0 }}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          )}

          {activeTab === 'announcements' && (
            <List>
              {announcements.map((announcement) => (
                <React.Fragment key={announcement.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" color="primary">
                          {announcement.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            display="block"
                            sx={{ mb: 1 }}
                          >
                            {announcement.content}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {format(new Date(announcement.date), 'MMM d, yyyy')}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          )}

          {activeTab === 'groups' && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Button variant="contained" color="primary">
                Create New Group
              </Button>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                No groups yet. Create a new group to start collaborating with your students.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Main Chat Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  {chats.find(c => c.id === selectedChat)?.name.charAt(0) || 'C'}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">
                    {chats.find(c => c.id === selectedChat)?.name || 'Chat'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ width: 8, height: 8, bgcolor: 'success.main', borderRadius: '50%', mr: 0.5 }} />
                    Online
                  </Typography>
                </Box>
              </Box>
              <Box>
                <IconButton>
                  <People />
                </IconButton>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
            </Paper>

            {/* Messages */}
            <Box 
              sx={{ 
                flex: 1, 
                p: 2, 
                overflowY: 'auto',
                bgcolor: 'background.default',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))',
              }}
            >
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <Box 
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.sender === 'teacher' ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '70%',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: msg.sender === 'teacher' ? 'primary.main' : 'grey.100',
                        color: msg.sender === 'teacher' ? 'common.white' : 'text.primary',
                        position: 'relative',
                        wordBreak: 'break-word',
                      }}
                    >
                      <Typography variant="body2">{msg.text}</Typography>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          mt: 0.5,
                        }}
                      >
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontSize: '0.65rem',
                            opacity: 0.8,
                            mr: 0.5,
                            color: msg.sender === 'teacher' ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary'
                          }}
                        >
                          {format(msg.timestamp, 'h:mm a')}
                        </Typography>
                        {msg.sender === 'teacher' && (
                          msg.status === 'sent' ? (
                            <CheckCircle sx={{ fontSize: '0.9rem', opacity: 0.7 }} />
                          ) : msg.status === 'delivered' ? (
                            <CheckCircle sx={{ fontSize: '0.9rem', opacity: 0.7 }} />
                          ) : msg.status === 'error' ? (
                            <ErrorIcon color="error" sx={{ fontSize: '0.9rem' }} />
                          ) : (
                            <Schedule sx={{ fontSize: '0.9rem', opacity: 0.7 }} />
                          )
                        )}
                      </Box>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'text.secondary',
                    textAlign: 'center',
                    p: 3
                  }}
                >
                  <Chat sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
                  <Typography variant="h6" gutterBottom>
                    No messages yet
                  </Typography>
                  <Typography variant="body2">
                    Start the conversation by sending a message
                  </Typography>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', bgcolor: 'background.paper' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary">
                  <AttachFile />
                </IconButton>
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  variant="outlined"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    sx: { borderRadius: 4 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton color="primary">
                          <EmojiEmotions />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton 
                  color="primary" 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  sx={{ ml: 1 }}
                >
                  <Send />
                </IconButton>
              </Box>
            </Box>
          </>
        ) : (
          <Box 
            sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: 'background.default',
              color: 'text.secondary',
              textAlign: 'center',
              p: 3
            }}
          >
            <Chat sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
            <Typography variant="h6" gutterBottom>
              Select a chat to start messaging
            </Typography>
            <Typography variant="body2">
              Choose a conversation from the sidebar or start a new one
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CommunicationPanel;
