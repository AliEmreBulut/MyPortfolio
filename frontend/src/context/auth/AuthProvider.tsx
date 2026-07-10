'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('jwt_token');
        if (token) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (token: string) => {
        Cookies.set('jwt_token', token, { 
            expires: 1, 
            path: '/',
            secure: window.location.protocol === 'https:', // Sadece HTTPS üzerinden çalışıyorsa secure yap
            sameSite: 'Strict'  // Farklı sitelerden gelen isteklerde token'ı gönderme (CSRF koruması)
        });
        setIsAuthenticated(true);
        router.push('/admin/dashboard');
        router.refresh();
    };

    const logout = () => {
        Cookies.remove('jwt_token', { path: '/' });
        setIsAuthenticated(false);
        router.push('/admin/login');
        router.refresh();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};