import React, { useState, useEffect, useRef } from 'react';
import socketService from '../../services/socketService';
import './ChatRoom.css';
import { MdPerson } from 'react-icons/md';

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
        // Nếu thiếu sender hoặc createdAt thì bổ sung cho đồng nhất với lịch sử
        let fixedMsg = { ...msg };
        // Nếu sender chỉ là id, tìm trong participants của chatRoom
        if (fixedMsg.sender && typeof fixedMsg.sender === 'string' && chatRoom.participants) {
          const found = chatRoom.participants.find(u => u._id === fixedMsg.sender);
          if (found) fixedMsg.sender = found;
        }
        if (!fixedMsg.sender) {
          fixedMsg.sender = currentUser;
        }
        if (!fixedMsg.createdAt) {
          fixedMsg.createdAt = new Date().toISOString();
        }
        setMessages(prev => [...prev, fixedMsg]);
      });
      socketService.on('systemMessage', (data) => {
        setMessages(prev => [...prev, { system: true, message: data.message }]);
      });
      socketService.on('error', (err) => {
        setError(err.message);
      });
      // Join room
      socketService.joinRoom(chatRoom._id, currentUser._id);
      // Lấy lịch sử chat khi vào phòng
      initializeChat();
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
    } catch {
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
        {loading ? (
          <div className="chat-room-loading">Đang tải lịch sử chat...</div>
        ) : messages.length === 0 ? (
          <div className="no-messages">Chưa có tin nhắn nào.</div>
        ) : (
          messages.map((msg, idx) => (
            // Ẩn system message chứa 'đã tham gia phòng' hoặc 'đã rời phòng'
            (msg.system && (msg.message?.includes('đã tham gia phòng') || msg.message?.includes('đã rời phòng'))) ? null : (
              <div key={idx} className={msg.system ? 'system-message' : (msg.sender?._id === currentUser._id ? 'message own' : 'message other')}>
            {msg.system ? (
              <em>{msg.message}</em>
            ) : (
              <>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      {msg.sender?.avatar && msg.sender.avatar !== 'false' ? (
                        <img src={msg.sender.avatar} alt="avatar" style={{width:32,height:32,borderRadius:'50%',objectFit:'cover'}} />
                      ) : (
                        <MdPerson size={32} color="#A9745B" style={{ background: '#f8f6f3', borderRadius: '50%' }} />
                      )}
                      <span className="message-sender">{msg.sender?.name || 'Ẩn danh'}</span>
                    </div>
                <div className="message-content">{msg.message}</div>
                    <div className="message-time">{new Date(msg.createdAt).toLocaleString('vi-VN')}</div>
              </>
            )}
          </div>
            )
          ))
        )}
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
