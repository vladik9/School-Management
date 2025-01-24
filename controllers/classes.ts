'use client';
import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

/**
 * Fetches the list of classes for the given yearId from the server.
 *
 * @param {string} yearId The ID of the year to fetch classes for.
 * @returns {Promise<Class[]>} A promise that resolves with the list of classes. If an error occurs, it will throw an error with the message of errorFetchingClasses from statusMessages.
 */
export const processGetClasses = async (yearId: string) => {
  try {
    const response = await fetch(`${urlEnum.class}?yearId=${yearId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingClasses);
    }
    if (!response) return [];

    const data = await response.json();
    return data;  // This will return the list of years
  } catch (error) {
    console.error(error);
    throw new Error(statusMessages.errorFetchingClasses);
  }
};

/**
 * Creates a new class for the given yearId on the server.
 *
 * @param {object} data The data to be used when creating the class. Must contain the following properties: name, teacher
 * @param {string} yearId The ID of the year to create a class for.
 * @returns {Promise<Response>} A promise that resolves with the response from the server. If an error occurs, it will throw an error with the message of errorCreatingClass from statusMessages.
 */
export const processCreateClass = async (data: object, yearId: string) => {
  try {
   const response = await fetch(`${urlEnum.class}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, yearId }),
   });
   if (!response.ok) {
    throw new Error(statusMessages.errorCreatingClass);
  }
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(statusMessages.errorCreatingClass);
  }
};

/**
 * Removes a class from the server based on the provided class ID.
 *
 * This function sends a DELETE request to the server to remove the class
 * identified by the given classId. If the request is successful, the server's
 * response is returned. If an error occurs during the request, an error
 * with the message of errorDeletingClass from statusMessages is thrown.
 *
 * @param {number} classId The ID of the class to be removed.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the deletion fails, it throws an error with the appropriate message.
 */
export const processRemoveClass = async (classId: number) => {
  try {
    const response = await fetch(`${urlEnum.class}?id=${classId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorDeletingClass);
    }
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(statusMessages.errorDeletingClass);
  }
};
