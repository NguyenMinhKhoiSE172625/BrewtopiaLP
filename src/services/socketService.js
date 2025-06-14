import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.currentRoom = null;
    this.currentUserId = null;
  }

  connect(serverUrl = 'http://localhost:4000') {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    try {
      this.socket = io(serverUrl, {
        transports: ['websocket'],
        autoConnect: true,
        timeout: 5000, // 5 second timeout
      });

      this.socket.on('connect', () => {
        console.log('✅ Socket connected:', this.socket.id);
        this.isConnected = true;
      });

      this.socket.on('disconnect', () => {
        console.log('🔌 Socket disconnected');
        this.isConnected = false;
      });

      this.socket.on('connect_error', (error) => {
        console.warn('⚠️ Socket connection failed - server may not be running:', error.message);
        this.isConnected = false;
      });

      return this.socket;
    } catch (error) {
      console.warn('⚠️ Socket.io not available:', error.message);
      this.isConnected = false;
      return null;
    }
  }

  disconnect() {
    if (this.socket) {
      // Leave current room trước khi disconnect
      if (this.currentRoom && this.currentUserId) {
        this.leaveRoom(this.currentRoom, this.currentUserId);
      }

      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.currentRoom = null;
      this.currentUserId = null;
    }
  }

  // Set thông tin user hiện tại
  setCurrentUser(userId) {
    this.currentUserId = userId;
    console.log(`👤 Set current user: ${userId}`);
  }

  // Get thông tin user hiện tại
  getCurrentUser() {
    return this.currentUserId;
  }

  // Gửi tin nhắn
  sendMessage(messageData) {
    if (this.socket && this.isConnected) {
      this.socket.emit('sendMessage', messageData);
    }
  }

  // Lắng nghe tin nhắn mới
  onNewMessage(callback) {
    if (this.socket) {
      // Fix: Dùng event name giống test_chat.html
      this.socket.on('receiveMessage', callback);
      // Backup: Vẫn lắng nghe newMessage nếu backend gửi
      this.socket.on('newMessage', callback);
    }
  }

  // Tham gia phòng chat
  joinRoom(roomId, userId = null) {
    if (this.socket && this.isConnected) {
      if (this.currentRoom === roomId) return;
      if (this.currentRoom && this.currentRoom !== roomId) {
        this.leaveRoom(this.currentRoom, this.currentUserId);
      }
      this.socket.emit('joinRoom', roomId, userId);
      this.currentRoom = roomId;
      this.currentUserId = userId;
    }
  }

  // Rời phòng chat
  leaveRoom(roomId, userId = null) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leaveRoom', roomId, userId);
      this.currentRoom = null;
      this.currentUserId = null;
    }
  }

  // Xóa listener
  removeListener(event) {
    if (this.socket) this.socket.off(event);
  }

  // Kiểm tra trạng thái kết nối
  getConnectionStatus() {
    return this.isConnected;
  }

  // Lấy thông tin chi tiết về socket
  getSocketInfo() {
    return {
      isConnected: this.isConnected,
      socketId: this.socket?.id || null,
      connected: this.socket?.connected || false,
      disconnected: this.socket?.disconnected || true,
      transport: this.socket?.io?.engine?.transport?.name || null,
    };
  }

  // Lấy socket instance (để test)
  getSocket() {
    return this.socket;
  }

  on(event, cb) {
    if (this.socket) this.socket.on(event, cb);
  }
}

// Tạo instance duy nhất
const socketService = new SocketService();
export default socketService;
