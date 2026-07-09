'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/auth/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth hooku mutlaka AuthProvider içerisinde kullanılmalıdır!');
  }
  return context;
};