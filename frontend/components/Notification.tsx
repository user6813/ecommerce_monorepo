'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { clearNotification } from '../store/features/cartSlice';

export default function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.cart.notification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg transform transition-all duration-300 ease-in-out">
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>{notification}</span>
      </div>
    </div>
  );
} 