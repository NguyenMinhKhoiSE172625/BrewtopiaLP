const API_BASE_URL = 'https://brewtopia-production.up.railway.app/api';

class ChatService {
  constructor() {
    this.roomCache = new Map(); // Cache rooms để tránh duplicate
  }

  // Lấy token từ localStorage
  getAuthToken() {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      return userData?.token || null;
    } catch {
      return null;
    }
  }

  // Tạo headers với token
  getAuthHeaders() {
    const token = this.getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('🔑 Using auth token:', token.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ No auth token found in localStorage');
    }

    return headers;
  }
  // Lấy danh sách users
  async getUsers() {
    try {
      console.log('🔄 Fetching users from API...');
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.warn('❌ API failed:', response.status, errorText);
        console.warn('🔄 Fallback to demo users');
        return this.getDemoUsers();
      }

      const data = await response.json();
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
    // Chỉ truyền đúng participants là userId của người muốn chat
    const cacheKey = participants.sort().join('_');
    if (this.roomCache.has(cacheKey)) return this.roomCache.get(cacheKey);
    console.log('🔍 [API] POST /chat/room', { participants, isGroupChat, name });
    const response = await fetch(`${API_BASE_URL}/chat/room`, {
      method: 'POST',
      credentials: 'include',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ participants, isGroupChat, name }),
    });
    if (!response.ok) throw new Error('Không thể tạo/tìm phòng chat');
    const data = await response.json();
    this.roomCache.set(cacheKey, data);
    return data;
  }

  // Lấy danh sách phòng chat của user
  async getChatRooms(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/rooms/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      throw error;
    }
  }

  // Lấy tin nhắn trong phòng chat
  async getChatMessages(chatId, page = 1, limit = 50) {
    try {
      // Fix: Dùng endpoint giống test_chat.html
      const response = await fetch(`${API_BASE_URL}/chat/message/${chatId}`, {
        method: 'GET',
        credentials: 'include',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        // API chưa có hoặc endpoint không tồn tại
        console.warn(`Chat messages API not available (${response.status}), starting with empty chat`);
        return { messages: [] };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Chat messages API not available, starting with empty chat:', error.message);
      // Trả về empty messages thay vì throw error
      return { messages: [] };
    }
  }

  // Gửi tin nhắn (chỉ qua socket - backend sẽ tự lưu vào database)
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
