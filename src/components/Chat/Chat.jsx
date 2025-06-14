import React, { useState, useEffect } from 'react';
import UsersList from '../UsersList/UsersList';
import ChatRoom from '../ChatRoom/ChatRoom';
import chatService from '../../services/chatService';
import socketService from '../../services/socketService';
import './Chat.css';

const Chat = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Lấy thông tin user hiện tại từ localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.user) {
      setCurrentUser(userData.user);
      // Set user info cho socket service
      socketService.setCurrentUser(userData.user._id);
    }

    // Kết nối socket khi component mount
    socketService.connect();

    return () => {
      // Cleanup khi component unmount
      socketService.disconnect();
    };
  }, []);

  const handleUserSelect = async (user) => {
    if (!currentUser) {
      setError('Không tìm thấy thông tin người dùng hiện tại');
      return;
    }
    setLoading(true);
    setError(null);
    setSelectedUser(user);
    try {
      // Log dữ liệu gửi lên
      console.log('🔍 Gửi participants:', [user._id], 'name:', user.name);
      // Tạo phòng chat với user được chọn (chỉ truyền user._id)
      const response = await chatService.createChatRoom(
        [user._id],
        false,
        user.name
      );
      // Lấy đúng dữ liệu phòng chat
      let chatRoomData = response;
      if (response.room) {
        chatRoomData = response.room;
      }
      // Log dữ liệu nhận về
      console.log('🔍 Chat room data:', chatRoomData);
      // Đảm bảo participants là object user
      if (chatRoomData && chatRoomData.participants) {
        const fullParticipants = chatRoomData.participants.map(participant => {
          if (typeof participant === 'string') {
            if (participant === user._id) return user;
            else if (participant === currentUser._id) return currentUser;
            return { _id: participant, name: 'Unknown User' };
          }
          return participant;
        });
        chatRoomData.participants = fullParticipants;
      } else {
        chatRoomData.participants = [currentUser, user];
      }
      setChatRoom(chatRoomData);
    } catch (err) {
      // Log lỗi chi tiết
      console.error('❌ Lỗi tạo phòng chat:', err);
      setError('Không thể tạo hoặc tìm phòng chat');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToUsersList = () => {
    setSelectedUser(null);
    setChatRoom(null);
    setError(null);
  };

  if (!currentUser) {
    return (
      <div className="chat-container">
        <div className="chat-error">
          <h3>❌ Lỗi xác thực</h3>
          <p>Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {loading && (
        <div className="chat-loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang tạo phòng chat...</p>
        </div>
      )}

      {error && (
        <div className="chat-error-banner">
          <span>❌ {error}</span>
          <button onClick={() => setError(null)} className="close-error-btn">
            ✕
          </button>
        </div>
      )}

      <div className="chat-content">
        {!selectedUser ? (
          <UsersList 
            onUserSelect={handleUserSelect}
            currentUserId={currentUser._id}
          />
        ) : (
          chatRoom && (
            <ChatRoom
              chatRoom={chatRoom}
              currentUser={currentUser}
              onBack={handleBackToUsersList}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Chat;
