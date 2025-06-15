import React, { useState, useEffect } from 'react';
import chatService from '../../services/chatService';
import './UsersList.css';
import { MdPerson } from 'react-icons/md';

const UsersList = ({ onUserSelect, currentUserId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await chatService.getUsers();
      
      // Lọc bỏ user hiện tại khỏi danh sách
      const filteredUsers = usersData.filter(user => user._id !== currentUserId);
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    onUserSelect(user);
  };

  if (loading) {
    return (
      <div className="users-list-container">
        <div className="users-list-header">
          <h3>💬 Danh sách người dùng</h3>
        </div>
        <div className="users-list-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải danh sách người dùng...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-list-container">
        <div className="users-list-header">
          <h3>💬 Danh sách người dùng</h3>
        </div>
        <div className="users-list-error">
          <p>❌ {error}</p>
          <button onClick={fetchUsers} className="retry-btn">
            🔄 Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="users-list-container">
      <div className="users-list-header">
        <h3>💬 Danh sách người dùng</h3>
        <p className="users-count">{filteredUsers.length} người dùng</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm người dùng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="users-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div
              key={user._id}
              className="user-item"
              onClick={() => handleUserClick(user)}
            >
              <div className="user-avatar">
                {user.avatar && user.avatar !== 'false' ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <MdPerson size={45} color="#A9745B" style={{ background: '#f8f6f3', borderRadius: '50%' }} />
                )}
                <div className="online-indicator"></div>
              </div>
              
              <div className="user-info">
                <h4 className="user-name">{user.name || 'Người dùng'}</h4>
                <p className="user-email">{user.email}</p>
                {user.role && (
                  <span className={`user-role ${user.role}`}>
                    {user.role === 'admin' ? '👑 Admin' : 
                     user.role === 'owner' ? '☕ Chủ quán' : '👤 Khách hàng'}
                  </span>
                )}
              </div>

              <div className="chat-icon">
                💬
              </div>
            </div>
          ))
        ) : (
          <div className="no-users">
            <p>🔍 Không tìm thấy người dùng nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
