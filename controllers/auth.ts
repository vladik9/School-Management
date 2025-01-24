'use client';

import statusMessages from "@/lib/statusMessages";
import { urlEnum } from "@/utils/urlEnum";
import { resolve } from "path";

/**
 * Logs the user in and returns a boolean indicating whether the login was successful or not.
 * @param email The email of the user to log in
 * @param password The password of the user to log in
 * @returns A boolean indicating whether the login was successful or not
 */
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

/**
 * Logs out the user by sending a DELETE request to the server.
 * If the request is successful, it removes the authentication token
 * and authentication status from localStorage. If there is an error
 * during the process, it throws an error with a relevant message.
 *
 * @throws Will throw an error if unable to log out.
 */

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

/**
 * Checks if user is authenticated by looking at localStorage.
 * @returns {boolean} Whether the user is authenticated or not.
 */
export const checkAuth = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('token') !== null;
};
