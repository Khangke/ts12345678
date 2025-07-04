import React from 'react';

// Shopping Cart Icon
export const ShoppingCartIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

// Trophy Icon
export const TrophyIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20.38C20.77 4 21.11 4.22 21.24 4.58C21.37 4.94 21.27 5.34 21 5.62L18.5 8.12C18.22 8.4 17.78 8.4 17.5 8.12L15.62 6.24C15.22 5.84 14.78 5.84 14.38 6.24L12.5 8.12C12.22 8.4 11.78 8.4 11.5 8.12L9.62 6.24C9.22 5.84 8.78 5.84 8.38 6.24L6.5 8.12C6.22 8.4 5.78 8.4 5.5 8.12L3 5.62C2.73 5.34 2.63 4.94 2.76 4.58C2.89 4.22 3.23 4 3.62 4H7ZM5 10V18C5 19.1 5.9 20 7 20H9V22H15V20H17C18.1 20 19 19.1 19 18V10H17V18H7V10H5ZM12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14Z"/>
  </svg>
);

// Leaf Icon
export const LeafIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.45C8.66 16.7 11.14 14.63 15.54 13.93C15.19 13.39 15 12.74 15 12.05C15 10.35 16.35 9 18.05 9C19.74 9 21.09 10.35 21.09 12.05C21.09 13.74 19.74 15.09 18.05 15.09C17.36 15.09 16.71 14.9 16.17 14.55C15.47 18.95 13.4 21.43 7.65 24.38L8.76 26.27C15.83 22.85 19 19.5 21 8H17Z"/>
  </svg>
);

// Truck Delivery Icon
export const TruckIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>
);

// Chat Icon
export const ChatIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
  </svg>
);

// Phone Icon
export const PhoneIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

// Email Icon
export const EmailIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

// Location Pin Icon
export const LocationIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
  </svg>
);

// Clock Icon (for time/schedule)
export const ClockIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
  </svg>
);

// News Icon 
export const NewsIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
  </svg>
);

// Moon Icon for dark mode
export const MoonIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.34 2.02C6.59 1.82 2 6.42 2 12c0 5.52 4.48 10 10 10 3.71 0 6.93-2.02 8.66-5.02-7.51-.25-13.64-6.15-8.32-14.96z"/>
  </svg>
);

// Sun Icon for light mode  
export const SunIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
  </svg>
);

export const ShoppingBagIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z"/>
  </svg>
);

// Admin Panel Icons

// User Icon
export const UserIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H19C20.1 23 21 22.1 21 21V9H21ZM15 15C15 16.66 13.66 18 12 18C10.34 18 9 16.66 9 15C9 13.34 10.34 12 12 12C13.66 12 15 13.34 15 15ZM6 19C6 17.67 8.67 17 12 17C15.33 17 18 17.67 18 19V20H6V19Z"/>
  </svg>
);

// Package Icon
export const PackageIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12,2L13.09,8.26L22,9L17,14L18.18,23L12,19.77L5.82,23L7,14L2,9L10.91,8.26L12,2ZM12,15.4L7.59,18L9.1,13.1L5.2,9.6L10.36,9.2L12,4.6L13.64,9.2L18.8,9.6L14.9,13.1L16.41,18L12,15.4Z"/>
  </svg>
);

// Settings Icon
export const SettingsIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
  </svg>
);

// Dashboard Icon
export const DashboardIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"/>
  </svg>
);

// Search Icon
export const SearchIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
  </svg>
);

// Plus Icon
export const PlusIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
  </svg>
);

// Edit Icon
export const EditIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
  </svg>
);

// Delete Icon
export const DeleteIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"/>
  </svg>
);

// Eye Icon
export const EyeIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
  </svg>
);

// Save Icon
export const SaveIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"/>
  </svg>
);

// Close/X Icon
export const CloseIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
  </svg>
);

// Image Upload Icon
export const ImageUploadIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"/>
  </svg>
);

// Dollar Sign Icon
export const DollarIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
  </svg>
);

// Calendar Icon
export const CalendarIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
  </svg>
);

// Filter Icon
export const FilterIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z"/>
  </svg>
);

// Store Icon
export const StoreIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M12,10H6V8H12V10Z"/>
  </svg>
);

// Orders Icon  
export const OrdersIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M16,9H19L14,16M10,9H13L8,16M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,2L13.09,8.26L22,9L17,14L18.18,23L12,19.77L5.82,23L7,14L2,9L10.91,8.26L12,2Z"/>
  </svg>
);

// Customers Icon
export const CustomersIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4M16 14C20.4 14 24 15.8 24 18V20H8V18C8 15.8 11.6 14 16 14M8.5 4C10.4 4 12 5.6 12 7.5S10.4 11 8.5 11 5 9.4 5 7.5 6.6 4 8.5 4M8.5 13C11.5 13 14 14.2 14 15.7V17H3V15.7C3 14.2 5.5 13 8.5 13Z"/>
  </svg>
);

// File Text Icon
export const FileTextIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

// Tag Icon
export const TagIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4C2.89,2 2,2.89 2,4V11C2,11.55 2.22,12.05 2.59,12.42L11.58,21.41C11.95,21.78 12.45,22 13,22C13.55,22 14.05,21.78 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.45 21.78,11.95 21.41,11.58Z"/>
  </svg>
);

// Hash Icon
export const HashIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.41,21L6.12,17H2.12L2.47,15H6.47L7.53,9H3.53L3.88,7H7.88L8.59,3H10.59L9.88,7H15.88L16.59,3H18.59L17.88,7H21.88L21.53,9H17.53L16.47,15H20.47L20.12,17H16.12L15.41,21H13.41L14.12,17H8.12L7.41,21H5.41M9.53,9L8.47,15H14.47L15.53,9H9.53Z"/>
  </svg>
);

// Ruler Icon
export const RulerIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.39,18.36L3.16,16.6L4.58,18L5.64,16.95L4.22,15.54L5.64,14.12L8.11,16.6L9.17,15.54L6.7,13.06L8.11,11.65L9.53,13.06L10.59,12L9.17,10.59L10.59,9.17L13.06,11.65L14.12,10.59L11.65,8.11L13.06,6.7L14.47,8.11L15.54,7.05L14.12,5.64L15.54,4.22L18,6.7L19.07,5.64L16.6,3.16L18.36,1.39L22.61,5.64L5.64,22.61L1.39,18.36Z"/>
  </svg>
);

// Bell Icon
export const BellIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/>
  </svg>
);

// Shield Icon
export const ShieldIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);



// Globe Icon
export const GlobeIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.36,14C16.44,13.3 16.5,12.66 16.5,12S16.44,10.7 16.36,10H19.74C19.9,10.64 20,11.31 20,12S19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12S9.56,10.66 9.66,10H14.34C14.43,10.66 14.5,13.34 14.5,12S14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12S4.1,10.64 4.26,10H7.64C7.56,10.7 7.5,11.34 7.5,12S7.56,13.3 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
  </svg>
);

// Check Circle Icon
export const CheckCircleIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
  </svg>
);

// Home Icon
export const HomeIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
  </svg>
);

// Book Icon
export const BookIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V7H5V5H19M5,19V9H19V19H5Z"/>
  </svg>
);

// User Circle Icon
export const UserCircleIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z"/>
  </svg>
);

// Credit Card Icon
export const CreditCardIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,18H4V12H20V18M20,8H4V6H20V8Z"/>
  </svg>
);

// Message Circle Icon
export const MessageCircleIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12,2C6.48,2 2,6.48 2,12C2,13.54 2.36,14.98 3,16.24V22L8.76,19C9.82,19.64 11.05,20 12.38,20H12C17.52,20 22,15.52 22,10C22,4.48 17.52,0 12,0V2Z"/>
  </svg>
);

// Map Pin Icon
export const MapPinIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19S6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6Z"/>
  </svg>
);

// Mail Icon
export const MailIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z"/>
  </svg>
);

// Sticky Note Icon
export const StickyNoteIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18,3H6A2,2 0 0,0 4,5V19A2,2 0 0,0 6,21H14L20,15V5A2,2 0 0,0 18,3M18,14H14V18H6V5H18V14Z"/>
  </svg>
);

// Social Media Icons

// Facebook Icon
export const FacebookIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Instagram Icon
export const InstagramIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// YouTube Icon
export const YouTubeIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// TikTok Icon
export const TikTokIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

// Zalo Icon
export const ZaloIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 16.28c-1.015 1.018-2.37 1.58-3.816 1.58-1.446 0-2.801-.562-3.816-1.58-1.015-1.017-1.577-2.37-1.577-3.816s.562-2.799 1.577-3.816c1.015-1.018 2.37-1.58 3.816-1.58 1.446 0 2.801.562 3.816 1.58 1.015 1.017 1.577 2.37 1.577 3.816s-.562 2.799-1.577 3.816zm-6.316-2.316h2.844v1.422H9.156v-2.844h1.422v1.422z"/>
  </svg>
);

// WhatsApp Icon
export const WhatsAppIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

// Telegram Icon
export const TelegramIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

// Twitter/X Icon
export const TwitterIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// LinkedIn Icon
export const LinkedInIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Maps Icon
export const MapsIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
  </svg>
);

// Download Icon
export const DownloadIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
  </svg>
);

// Contact Icons

// Contact Support Icon
export const ContactSupportIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5,2C6,2 1.5,6.5 1.5,12C1.5,17.5 6,22 11.5,22C17,22 21.5,17.5 21.5,12C21.5,6.5 17,2 11.5,2M11.5,20C7.1,20 3.5,16.4 3.5,12C3.5,7.6 7.1,4 11.5,4C15.9,4 19.5,7.6 19.5,12C19.5,16.4 15.9,20 11.5,20M11.5,6C9,6 7,8 7,10.5H9C9,9.1 10.1,8 11.5,8C12.9,8 14,9.1 14,10.5C14,12 11.5,11.75 11.5,15H13.5C13.5,12.75 16,12.5 16,10.5C16,8 14,6 11.5,6M11,16V18H13V16H11Z"/>
  </svg>
);

// Support Agent Icon
export const SupportAgentIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21,12.22C21,6.73 16.74,3 12,3C7.26,3 3,6.73 3,12.22C3,17.71 7.26,21.44 12,21.44C16.74,21.44 21,17.71 21,12.22M8,17.05L8.91,16.14C9.58,16.47 10.26,16.64 11,16.64C11.74,16.64 12.42,16.47 13.09,16.14L14,17.05C13.04,17.65 12.04,17.95 11,17.95C9.96,17.95 8.96,17.65 8,17.05M16,13A1,1 0 0,1 15,14A1,1 0 0,1 14,13A1,1 0 0,1 15,12A1,1 0 0,1 16,13M10,13A1,1 0 0,1 9,14A1,1 0 0,1 8,13A1,1 0 0,1 9,12A1,1 0 0,1 10,13Z"/>
  </svg>
);

// Live Help Icon
export const LiveHelpIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19,2H5A3,3 0 0,0 2,5V19A3,3 0 0,0 5,22H19A3,3 0 0,0 22,19V5A3,3 0 0,0 19,2M12,18A2,2 0 0,1 10,16A2,2 0 0,1 12,14A2,2 0 0,1 14,16A2,2 0 0,1 12,18M14,12H10C10,10.89 10.9,10 12,10C13.11,10 14,10.89 14,12Z"/>
  </svg>
);

// Chevron Down Icon for Dropdown
export const ChevronDownIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);