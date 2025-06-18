import React, { useState, useEffect } from 'react';
import Chat from '../Chat/Chat';
import ChatFloatingButton from './ChatFloatingButton';
import './Dashboard.css';

const DashboardAccount = () => {
  const [cafeData, setCafeData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  // States cho thêm menu item
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemData, setNewItemData] = useState({
    name: '',
    price: '',
    category: '',
    image: null
  });
  const [addItemLoading, setAddItemLoading] = useState(false);
  const [addItemMessage, setAddItemMessage] = useState('');

  // States cho posts
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(null);

  // Events data - code cứng
  const [events] = useState([
    {
      id: 1,
      title: "Live Acoustic Night",
      description: "Đêm nhạc acoustic với các nghệ sĩ trẻ tài năng. Thưởng thức cà phê và âm nhạc trong không gian ấm cúng.",
      date: "2025-01-15",
      time: "19:30",
      type: "music",
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      maxParticipants: 50,
      currentParticipants: 23
    },
    {
      id: 2,
      title: "Workshop Pha Chế Cà Phê",
      description: "Học cách pha chế các loại cà phê đặc biệt từ barista chuyên nghiệp. Bao gồm tài liệu và nguyên liệu thực hành.",
      date: "2025-01-20",
      time: "14:00",
      type: "workshop",
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
      maxParticipants: 15,
      currentParticipants: 8
    },
    {
      id: 3,
      title: "Triển Lãm Tranh Địa Phương",
      description: "Trưng bày các tác phẩm nghệ thuật của các họa sĩ địa phương. Cơ hội gặp gỡ và trò chuyện với các nghệ sĩ.",
      date: "2025-01-10",
      time: "10:00",
      type: "exhibition",
      status: "ongoing",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
      maxParticipants: 100,
      currentParticipants: 67
    },
    {
      id: 4,
      title: "Câu Lạc Bộ Đọc Sách",
      description: "Thảo luận về cuốn sách 'Nghệ Thuật Sống Chậm'. Chia sẻ cảm nhận và kết nối với những người yêu sách.",
      date: "2025-01-25",
      time: "16:00",
      type: "book-club",
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      maxParticipants: 20,
      currentParticipants: 12
    },
    {
      id: 5,
      title: "Đêm Thơ Và Cà Phê",
      description: "Buổi tối thơ ca với sự tham gia của các thi sĩ trẻ. Không gian lãng mạn với ánh nến và hương cà phê.",
      date: "2025-01-05",
      time: "20:00",
      type: "poetry",
      status: "completed",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      maxParticipants: 30,
      currentParticipants: 30
    },
    {
      id: 6,
      title: "Yoga Buổi Sáng",
      description: "Bắt đầu ngày mới với buổi yoga nhẹ nhàng. Sau đó thưởng thức breakfast đặc biệt của quán.",
      date: "2025-01-30",
      time: "07:00",
      type: "wellness",
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
      maxParticipants: 25,
      currentParticipants: 15
    }
  ]);

  // Helper functions cho events
  const getEventTypeIcon = (type) => {
    const icons = {
      music: '🎵',
      workshop: '🎓',
      exhibition: '🎨',
      'book-club': '📚',
      poetry: '✍️',
      wellness: '🧘‍♀️'
    };
    return icons[type] || '📅';
  };

  const getEventStatusColor = (status) => {
    const colors = {
      upcoming: '#28a745',
      ongoing: '#ffc107',
      completed: '#6c757d'
    };
    return colors[status] || '#6c757d';
  };

  const getEventStatusText = (status) => {
    const texts = {
      upcoming: 'Sắp diễn ra',
      ongoing: 'Đang diễn ra',
      completed: 'Đã kết thúc'
    };
    return texts[status] || 'Không xác định';
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Hàm lấy danh sách posts
  const fetchPosts = async () => {
    try {
      setPostsLoading(true);
      setPostsError(null);

      const response = await fetch('http://localhost:4000/api/posts', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Không thể lấy danh sách bài viết');
      }

      const postsData = await response.json();
      setPosts(postsData.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPostsError(error.message);
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin người dùng từ localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData || !userData.user || !userData.user._id) {
          throw new Error('Không tìm thấy thông tin người dùng, vui lòng đăng nhập lại');
        }

        const userId = userData.user._id;
        
        // Lấy thông tin quán cafe
        const cafeResponse = await fetch(`http://localhost:4000/api/cafes/${userId}`, {
          credentials: 'include',
        });
        
        if (!cafeResponse.ok) {
          throw new Error('Không thể lấy thông tin quán cafe');
        }
        
        const cafeData = await cafeResponse.json();
        setCafeData(cafeData[0]); // Lấy phần tử đầu tiên từ mảng
        
        // Nếu có menu, lấy thông tin menu items
        if (cafeData[0]?.menu?.length > 0) {
          const menuId = cafeData[0].menu[0];
          const menuResponse = await fetch(`http://localhost:4000/api/menu-items/${menuId}`, {
            credentials: 'include',
          });
          
          if (!menuResponse.ok) {
            throw new Error('Không thể lấy thông tin menu');
          }
          
          const menuData = await menuResponse.json();
          setMenuItems(menuData);
        }

        // Lấy danh sách posts
        await fetchPosts();

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hàm mở modal chỉnh sửa
  const handleEditClick = () => {
    if (cafeData) {
      setEditFormData({
        shopName: cafeData.shopName || '',
        address: cafeData.address || '',
        email: cafeData.email || '',
        phoneNumber: cafeData.phoneNumber || '',
        description: cafeData.description || '',
        openingHours: cafeData.openingHours || {
          monday: { open: '08:00', close: '22:00' },
          tuesday: { open: '08:00', close: '22:00' },
          wednesday: { open: '08:00', close: '22:00' },
          thursday: { open: '08:00', close: '22:00' },
          friday: { open: '08:00', close: '22:00' },
          saturday: { open: '08:00', close: '22:00' },
          sunday: { open: '08:00', close: '22:00' }
        }
      });
      setShowEditModal(true);
      setUpdateMessage('');
    }
  };

  // Hàm xử lý thay đổi form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Hàm xử lý thay đổi giờ mở cửa
  const handleOpeningHoursChange = (day, type, value) => {
    setEditFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [type]: value
        }
      }
    }));
  };

  // Hàm cập nhật thông tin cafe
  const handleUpdateCafe = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateMessage('');

    try {
      const response = await fetch(`http://localhost:4000/api/cafes/${cafeData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editFormData)
      });

      if (!response.ok) {
        throw new Error('Không thể cập nhật thông tin quán cafe');
      }

      const result = await response.json();
      setCafeData(result.cafe);
      setUpdateMessage('Cập nhật thông tin thành công!');

      // Đóng modal ngay lập tức khi thành công
      setShowEditModal(false);
      setUpdateMessage('');

    } catch (error) {
      console.error('Error updating cafe:', error);
      setUpdateMessage('Có lỗi xảy ra khi cập nhật thông tin: ' + error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  // Hàm mở modal thêm menu item
  const handleAddItemClick = () => {
    setNewItemData({
      name: '',
      price: '',
      category: '',
      image: null
    });
    setShowAddItemModal(true);
    setAddItemMessage('');
  };

  // Hàm xử lý thay đổi form thêm menu item
  const handleNewItemChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewItemData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setNewItemData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Hàm thêm menu item mới
  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    setAddItemLoading(true);
    setAddItemMessage('');

    try {
      // Lấy menuID từ cafeData
      const menuId = cafeData?.menu?.[0];
      if (!menuId) {
        throw new Error('Không tìm thấy menu ID');
      }

      // Tạo FormData để gửi file
      const formData = new FormData();
      formData.append('name', newItemData.name);
      formData.append('price', newItemData.price);
      formData.append('category', newItemData.category);
      if (newItemData.image) {
        formData.append('image', newItemData.image);
      }

      const response = await fetch(`http://localhost:4000/api/menu-items/create-Item/${menuId}`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Không thể thêm menu item');
      }

      const result = await response.json();

      // Cập nhật danh sách menu items
      setMenuItems(prev => [...prev, result]);
      setAddItemMessage('Thêm món thành công!');

      // Đóng modal ngay lập tức
      setShowAddItemModal(false);
      setAddItemMessage('');

    } catch (error) {
      console.error('Error adding menu item:', error);
      setAddItemMessage('Có lỗi xảy ra khi thêm món: ' + error.message);
    } finally {
      setAddItemLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-account-bg">
        <div className="dashboard-account-container">
          <h2>Đang tải dữ liệu...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-account-bg">
        <div className="dashboard-account-container">
          <h2>Đã xảy ra lỗi</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-account-bg">
      <div className="dashboard-account-container">
        <h1>Chào mừng, {cafeData?.shopName || 'Chủ quán'}!</h1>
        <p>Đây là dashboard quản lý quán cafe của bạn.</p>
        
        {cafeData && (
          <div className="dashboard-account-card">
            <div className="card-header">
              <h2>Thông tin quán cafe</h2>
              <button className="edit-btn" onClick={handleEditClick}>
                ✏️ Chỉnh sửa
              </button>
            </div>
            <ul>
              <li><b>Địa chỉ:</b> {cafeData.address || 'Chưa cập nhật'}</li>
              <li><b>Email:</b> {cafeData.email || 'Chưa cập nhật'}</li>
              <li><b>Số điện thoại:</b> {cafeData.phoneNumber || 'Chưa cập nhật'}</li>
              <li><b>Mô tả:</b> {cafeData.description || 'Chưa cập nhật'}</li>
            </ul>
          </div>
        )}
        
        {/* Menu section - hiển thị luôn nếu có cafeData */}
        {cafeData && (
          <div className="dashboard-account-card menu-card">
            <div className="card-header">
              <h2>Menu của quán</h2>
              <button className="add-item-btn" onClick={handleAddItemClick}>
                ➕ Thêm món
              </button>
            </div>

            {menuItems.length > 0 ? (
              <div className="menu-items-grid">
                {menuItems.map(item => (
                  <div key={item._id} className="menu-item">
                    {item.image && <img src={item.image} alt={item.name} />}
                    <h3>{item.name}</h3>
                    <p className="price">{item.price.toLocaleString('vi-VN')}đ</p>
                    <p className="category">{item.category}</p>
                    {item.bestSeller && <span className="bestseller-badge">Bán chạy</span>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-menu">
                <p>Chưa có món nào trong menu. Hãy thêm món đầu tiên!</p>
              </div>
            )}
          </div>
        )}

        {/* Posts section */}
        <div className="dashboard-account-card posts-card">
          <div className="card-header">
            <h2>Bài viết gần đây</h2>
          </div>

          {postsLoading ? (
            <div className="posts-loading">
              <p>Đang tải bài viết...</p>
            </div>
          ) : postsError ? (
            <div className="posts-error">
              <p>Lỗi: {postsError}</p>
              <button onClick={fetchPosts} className="retry-btn">Thử lại</button>
            </div>
          ) : posts.length > 0 ? (
            <div className="posts-grid">
              {posts.map(post => (
                <div key={post._id} className="post-item">
                  {post.images && post.images.length > 0 && (
                    <div className="post-image">
                      <img src={post.images[0]} alt="Post image" />
                      {post.images.length > 1 && (
                        <div className="image-count">+{post.images.length - 1}</div>
                      )}
                    </div>
                  )}
                  <div className="post-content">
                    <p className="post-text">{post.content}</p>
                    <div className="post-meta">
                      <span className="post-author">
                        Tác giả: {post.user?.name || 'Ẩn danh'}
                      </span>
                      <span className="post-date">
                        {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div className="post-stats">
                      <span className="stat-item">
                        ❤️ {post.likeCount || 0}
                      </span>
                      <span className="stat-item">
                        💬 {post.commentCount || 0}
                      </span>
                      <span className="stat-item">
                        📤 {post.shareCount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-posts">
              <p>Chưa có bài viết nào.</p>
            </div>
          )}
        </div>

        {/* Events section */}
        <div className="dashboard-account-card events-card">
          <div className="card-header">
            <h2>Sự kiện của quán</h2>
          </div>

          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-item">
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <div
                    className="event-status"
                    style={{ backgroundColor: getEventStatusColor(event.status) }}
                  >
                    {getEventStatusText(event.status)}
                  </div>
                </div>

                <div className="event-content">
                  <div className="event-header">
                    <span className="event-type-icon">
                      {getEventTypeIcon(event.type)}
                    </span>
                    <h3>{event.title}</h3>
                  </div>

                  <p className="event-description">{event.description}</p>

                  <div className="event-details">
                    <div className="event-datetime">
                      <span className="event-date">
                        📅 {formatEventDate(event.date)}
                      </span>
                      <span className="event-time">
                        🕐 {event.time}
                      </span>
                    </div>

                    <div className="event-participants">
                      <span className="participants-count">
                        👥 {event.currentParticipants}/{event.maxParticipants} người
                      </span>
                      <div className="participants-bar">
                        <div
                          className="participants-fill"
                          style={{
                            width: `${(event.currentParticipants / event.maxParticipants) * 100}%`,
                            backgroundColor: getEventStatusColor(event.status)
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {event.status === 'upcoming' && (
                    <button className="join-event-btn">
                      Tham gia sự kiện
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat section */}
        <ChatFloatingButton />

        {/* Modal chỉnh sửa thông tin */}
        {showEditModal && (
          <div className="dashboard-modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="dashboard-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Chỉnh sửa thông tin quán cafe</h2>
                <button className="close-btn" onClick={() => setShowEditModal(false)}>
                  ✕
                </button>
              </div>

              <form onSubmit={handleUpdateCafe} className="edit-form">
                <div className="form-section">
                  <h3>Thông tin cơ bản</h3>
                  <div className="form-group">
                    <label>Tên quán:</label>
                    <input
                      type="text"
                      name="shopName"
                      value={editFormData.shopName || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Địa chỉ:</label>
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Số điện thoại:</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={editFormData.phoneNumber || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Mô tả:</label>
                    <textarea
                      name="description"
                      value={editFormData.description || ''}
                      onChange={handleFormChange}
                      rows="3"
                      placeholder="Mô tả về quán cafe của bạn..."
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Giờ mở cửa</h3>
                  {editFormData.openingHours && Object.entries(editFormData.openingHours).map(([day, hours]) => (
                    <div key={day} className="opening-hours-row">
                      <label className="day-label">
                        {day === 'monday' ? 'Thứ 2' :
                         day === 'tuesday' ? 'Thứ 3' :
                         day === 'wednesday' ? 'Thứ 4' :
                         day === 'thursday' ? 'Thứ 5' :
                         day === 'friday' ? 'Thứ 6' :
                         day === 'saturday' ? 'Thứ 7' :
                         'Chủ nhật'}:
                      </label>
                      <div className="time-inputs">
                        <input
                          type="time"
                          value={hours.open || '08:00'}
                          onChange={(e) => handleOpeningHoursChange(day, 'open', e.target.value)}
                        />
                        <span>đến</span>
                        <input
                          type="time"
                          value={hours.close || '22:00'}
                          onChange={(e) => handleOpeningHoursChange(day, 'close', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {updateMessage && (
                  <div className={`update-message ${updateMessage.includes('thành công') ? 'success' : 'error'}`}>
                    {updateMessage}
                  </div>
                )}

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                    Hủy
                  </button>
                  <button type="submit" className="save-btn" disabled={updateLoading}>
                    {updateLoading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal thêm menu item */}
        {showAddItemModal && (
          <div className="dashboard-modal-overlay" onClick={() => setShowAddItemModal(false)}>
            <div className="dashboard-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Thêm món mới</h2>
                <button className="close-btn" onClick={() => setShowAddItemModal(false)}>
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddMenuItem} className="edit-form">
                <div className="form-section">
                  <div className="form-group">
                    <label>Tên món:</label>
                    <input
                      type="text"
                      name="name"
                      value={newItemData.name}
                      onChange={handleNewItemChange}
                      placeholder="Ví dụ: Cà phê đen đá"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Giá (VNĐ):</label>
                    <input
                      type="number"
                      name="price"
                      value={newItemData.price}
                      onChange={handleNewItemChange}
                      placeholder="Ví dụ: 25000"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Danh mục:</label>
                    <select
                      name="category"
                      value={newItemData.category}
                      onChange={handleNewItemChange}
                      required
                    >
                      <option value="">Chọn danh mục</option>
                      <option value="Coffee">Cà phê</option>
                      <option value="Tea">Trà</option>
                      <option value="Juice">Nước ép</option>
                      <option value="Smoothie">Sinh tố</option>
                      <option value="Dessert">Tráng miệng</option>
                      <option value="Snack">Đồ ăn nhẹ</option>
                      <option value="Other">Khác</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Hình ảnh:</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleNewItemChange}
                      accept="image/*"
                      className="file-input"
                    />
                    <small className="file-note">Chọn hình ảnh cho món ăn/thức uống</small>
                  </div>
                </div>

                {addItemMessage && (
                  <div className={`update-message ${addItemMessage.includes('thành công') ? 'success' : 'error'}`}>
                    {addItemMessage}
                  </div>
                )}

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowAddItemModal(false)}>
                    Hủy
                  </button>
                  <button type="submit" className="save-btn" disabled={addItemLoading}>
                    {addItemLoading ? 'Đang thêm...' : 'Thêm món'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAccount; 
