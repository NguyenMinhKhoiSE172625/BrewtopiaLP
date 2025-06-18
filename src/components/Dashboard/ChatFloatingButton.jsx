import React, { useState } from 'react';
import Chat from '../Chat/Chat';
import './ChatFloatingButton.css';

const ChatFloatingButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="chat-floating-btn"
        onClick={() => setOpen(o => !o)}
        title="Trò chuyện với khách hàng"
      >
        💬
      </button>
      {open && (
        <div className="chat-floating-popup">
          <div className="chat-floating-header">
            <span>Trò chuyện với khách hàng</span>
            <button className="chat-floating-close" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chat-floating-content">
            <Chat />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatFloatingButton; 