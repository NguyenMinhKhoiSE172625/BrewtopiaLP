import React, { useState, useEffect, useRef } from 'react';
import socketService from '../../services/socketService';
import chatService from '../../services/chatService';
import './ChatRoom.css';

const ChatRoom = ({ chatRoom, currentUser, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatRoom && currentUser) {
      // Remove listener trước khi đăng ký mới để tránh duplicate
      socketService.removeListener('receiveMessage');
      socketService.removeListener('systemMessage');
      socketService.removeListener('error');
      // Lắng nghe tin nhắn mới
      socketService.on('receiveMessage', (msg) => {
        setMessages(prev => [...prev, msg]);
      });
      socketService.on('systemMessage', (data) => {
        setMessages(prev => [...prev, { system: true, message: data.message }]);
      });
      socketService.on('error', (err) => {
        setError(err.message);
      });
      // Join room
      socketService.joinRoom(chatRoom._id, currentUser._id);
    }
    return () => {
      socketService.removeListener('receiveMessage');
      socketService.removeListener('systemMessage');
      socketService.removeListener('error');
    };
  }, [chatRoom, currentUser]);

  const initializeChat = async () => {
    try {
      setLoading(true);
      setError(null);
      // Lấy lịch sử chat qua API
      const token = localStorage.getItem('token') || (JSON.parse(localStorage.getItem('userData'))?.token);
      let history = [];
      if (token) {
        const res = await fetch(`http://localhost:4000/api/chat/message/${chatRoom._id}`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        if (res.ok) {
          history = await res.json();
        }
      }
      setMessages(history);
      // Kết nối socket và join room
      socketService.connect();
      socketService.setCurrentUser(currentUser._id);
    } catch (e) {
      setError('Không thể kết nối đến phòng chat');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    socketService.sendMessage({
      chatId: chatRoom._id,
      senderId: currentUser._id,
      message: newMessage.trim(),
    });
    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-room-container">
      <div className="chat-room-header">
        <button className="back-btn" onClick={onBack}>← Quay lại</button>
        <div className="chat-partner-info">
          <h3>{chatRoom.name}</h3>
        </div>
      </div>
      <div className="messages-container">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.system ? 'system-message' : (msg.sender === currentUser._id || msg.senderId === currentUser._id ? 'message own' : 'message other')}>
            {msg.system ? (
              <em>{msg.message}</em>
            ) : (
              <>
                <div className="message-content">{msg.message}</div>
                <div className="message-time">{msg.sender || msg.senderId}</div>
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="message-input-container" onSubmit={handleSendMessage}>
        <input
          className="message-input"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          ref={inputRef}
        />
        <button className="send-btn" type="submit">Gửi</button>
      </form>
      {error && <div className="chat-error-banner">❌ {error}</div>}
    </div>
  );
};

export default ChatRoom;
