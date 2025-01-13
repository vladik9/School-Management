'use client';

import statusMessages from "@/lib/statusMessages";
import { urlEnum } from "@/utils/urlEnum";
import { resolve } from "path";

export const login = async (email: string, password: string): Promise<boolean> => {

  const response = await fetch(`${urlEnum.users}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok && data.token) {
    // Successfully logged in and token received
    return new Promise((resolve) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      resolve(true);
    });
  } else {
    return new Promise((resolve, reject) => {
      localStorage.setItem('isAuthenticated', 'false');
      reject(false);
    });
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(`${urlEnum.users}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      resolve();
    }
  }
  catch (error) {
    console.error(error);
    throw new Error(statusMessages.errorSigningOut);
  }

};

export const checkAuth = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('token') !== null;
};
