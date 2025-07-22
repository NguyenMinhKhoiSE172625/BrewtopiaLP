// Service xử lý tải APK từ Google Drive
export const downloadAPK = () => {
  // Hiển thị thông báo bắt đầu tải
  const toastId = showToast("Đang chuẩn bị tải file APK...", "info");

  try {
    // Sử dụng link Google Drive mới
    const directDownloadLink = "https://drive.google.com/file/d/1uICm1vmXNBpR_U5mnNTiBD30Xi6iM4_A/view?usp=sharing";
    // Tạo element link ẩn và trigger download
    const link = document.createElement('a');
    link.href = directDownloadLink;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Hiển thị thông báo thành công
    setTimeout(() => {
      hideToast(toastId);
      showToast("Chuyển hướng đến trang tải APK trên Google Drive!", "success");
    }, 1000);

  } catch (error) {
    console.error('Lỗi khi tải APK:', error);
    hideToast(toastId);
    showToast("Có lỗi xảy ra khi tải file APK. Vui lòng thử lại.", "error");
  }
};

// Hàm hiển thị toast notification
export const showToast = (message, type = "info") => {
  const toastId = Date.now();
  const toast = document.createElement('div');
  toast.id = `toast-${toastId}`;
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      font-size: 14px;
      max-width: 350px;
      animation: slideInRight 0.3s ease-out;
    ">
      ${message}
    </div>
  `;
  document.body.appendChild(toast);

  // Tự động ẩn toast sau 5 giây
  setTimeout(() => {
    hideToast(toastId);
  }, 5000);

  return toastId;
};

// Hàm ẩn toast notification
export const hideToast = (toastId) => {
  const toast = document.getElementById(`toast-${toastId}`);
  if (toast) {
    toast.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }
}; 