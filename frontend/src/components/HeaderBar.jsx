// src/components/HeaderBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderBar.css';  // ใช้ไฟล์ CSS ที่เราได้สร้างขึ้น

const HeaderBar = () => {
  return (
    <header className="header-bar">
      <div className="header-content">
        <h1>Welcome to ShopStore</h1>
      </div>
    </header>
  );
};

export default HeaderBar;
