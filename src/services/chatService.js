import apiService from './apiService';

class ChatService {
  constructor() {
    this.roomCache = new Map(); // Cache rooms để tránh duplicate
  }

  // Fallback demo users để dùng khi API không available
  getDemoUsers() {
    return [
      { _id: 'demo1', name: 'Demo User 1', email: 'demo1@example.com' },
      { _id: 'demo2', name: 'Demo User 2', email: 'demo2@example.com' },
      { _id: 'demo3', name: 'Demo User 3', email: 'demo3@example.com' }
    ];
  }
  // Lấy danh sách users
  async getUsers() {
    try {
      console.log('🔄 Fetching users from API...');
      const data = await apiService.getUsers();
      
      console.log('✅ Real users loaded:', data.length, 'users');
      console.log('👥 Users:', data.map(u => ({ id: u._id, name: u.name })));

      // Cache users để dùng cho demo room
      this.cachedUsers = data;

      return data;
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      console.warn('🔄 Fallback to demo users');
      return this.getDemoUsers();
    }
  }

  // Tạo phòng chat (hoặc tìm room đã tồn tại)
  async createChatRoom(participants, isGroupChat = false, name = '') {
    try {
      // Chỉ truyền đúng participants là userId của người muốn chat
      const cacheKey = participants.sort().join('_');
      if (this.roomCache.has(cacheKey)) {
        console.log('✅ Sử dụng cached room cho:', participants);
        return this.roomCache.get(cacheKey);
      }

      console.log('🔍 [API] POST /chat/room', { participants, isGroupChat, name });
      const data = await apiService.createChatRoom(participants, isGroupChat, name);
      
      console.log('✅ Room created/found:', data);
      
      this.roomCache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error('❌ createChatRoom error:', error);
      // Re-throw với thông tin chi tiết hơn
      throw new Error(`Lỗi tạo phòng chat: ${error.message}`);
    }
  }

  // Lấy danh sách phòng chat của user
  async getChatRooms(userId) {
    try {
      const data = await apiService.getChatRooms(userId);
      return data;
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      throw error;
    }
  }

  // Lấy tin nhắn trong phòng chat
  // eslint-disable-next-line no-unused-vars
  async getChatMessages(chatId, page = 1, limit = 50) {
    try {
      const data = await apiService.getChatMessages(chatId);
      return data;
    } catch (error) {
      console.warn('Chat messages API not available, starting with empty chat:', error.message);
      // Trả về empty messages thay vì throw error
      return { messages: [] };
    }
  }

  // Gửi tin nhắn (chỉ qua socket - backend sẽ tự lưu vào database)  
  // eslint-disable-next-line no-unused-vars
  async sendMessage(chatId, senderId, message) {
    console.log('💬 Sending message via socket only (no API call)');

    // Chỉ gửi qua socket, backend sẽ tự lưu vào database
    // Không cần gọi API nữa vì backend socket đã handle việc lưu
    return { success: true, socketOnly: true };
  }
}

// Tạo instance duy nhất
const chatService = new ChatService();
export default chatService;
