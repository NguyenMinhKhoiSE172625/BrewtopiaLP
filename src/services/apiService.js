// API Service - Quản lý tập trung tất cả API calls
const API_CONFIG = {
  BASE_URL: 'https://brewtopia-production.up.railway.app/api',
  SOCKET_URL: 'https://brewtopia-production.up.railway.app',
  TIMEOUT: 10000, // 10 seconds
};

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  // === HELPER METHODS ===
  
  // Lấy auth token từ localStorage
  getAuthToken() {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      return userData?.token || null;
    } catch {
      return null;
    }
  }

  // Tạo headers với auth token
  getAuthHeaders(includeContentType = true) {
    const headers = {};
    
    if (includeContentType) {
      headers['Content-Type'] = 'application/json';
    }
    
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      body = null,
      headers = {},
      credentials = 'include',
      timeout = API_CONFIG.TIMEOUT,
      isFormData = false
    } = options;

    const url = `${this.baseURL}${endpoint}`;
    
    const requestHeaders = {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...this.getAuthHeaders(!isFormData),
      ...headers
    };

    const requestOptions = {
      method,
      headers: requestHeaders,
      credentials,
      ...(body && { body: isFormData ? body : JSON.stringify(body) })
    };

    console.log(`🔄 [API] ${method} ${endpoint}`);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...requestOptions,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log(`📡 [API] ${method} ${endpoint} - Status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      console.log(`✅ [API] ${method} ${endpoint} - Success`);
      return data;

    } catch (error) {
      console.error(`❌ [API] ${method} ${endpoint} - Error:`, error.message);
      throw error;
    }
  }

  // === AUTH MODULE ===
  
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: credentials
    });
  }

  async resetPassword(resetData) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: resetData
    });
  }

  // === CAFES MODULE ===
  
  async getCafeByUserId(userId) {
    return this.request(`/cafes/${userId}`);
  }

  async updateCafe(cafeId, cafeData) {
    return this.request(`/cafes/${cafeId}`, {
      method: 'PUT',
      body: cafeData
    });
  }

  // === MENU MODULE ===
  
  async getMenuItems(menuId) {
    return this.request(`/menu-items/${menuId}`);
  }

  async createMenuItem(menuId, itemData) {
    return this.request(`/menu-items/create-Item/${menuId}`, {
      method: 'POST',
      body: itemData,
      isFormData: true
    });
  }

  // === POSTS MODULE ===
  
  async getPosts() {
    return this.request('/posts');
  }

  async getAllPosts() {
    return this.request('/posts/Allpost');
  }

  // === USERS MODULE ===
  
  async getUsers() {
    return this.request('/users');
  }

  // === EVENTS MODULE ===
  
  async getEvents() {
    return this.request('/events/');
  }

  // === REVIEWS MODULE ===
  
  async getReviews() {
    return this.request('/reviews');
  }

  // === PAYMENTS MODULE ===
  
  async getPayments() {
    return this.request('/payments/');
  }

  // === CHAT MODULE ===
  
  async createChatRoom(participants, isGroupChat = false, name = '') {
    return this.request('/chat/room', {
      method: 'POST',
      body: { participants, isGroupChat, name }
    });
  }

  async getChatRooms(userId) {
    return this.request(`/chat/rooms/${userId}`);
  }

  async getChatMessages(chatId) {
    return this.request(`/chat/message/${chatId}`);
  }

  // === BULK OPERATIONS ===
  
  // Lấy tất cả dữ liệu cho dashboard admin
  async getDashboardData() {
    try {
      const [events, posts, users, reviews, payments] = await Promise.all([
        this.getEvents(),
        this.getAllPosts(),
        this.getUsers(),
        this.getReviews(),
        this.getPayments()
      ]);

      return {
        events,
        posts,
        users,
        reviews,
        payments
      };
    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
      throw error;
    }
  }
}

// Export singleton instance
const apiService = new ApiService();
export default apiService;

// Export config để các service khác sử dụng
export { API_CONFIG }; 