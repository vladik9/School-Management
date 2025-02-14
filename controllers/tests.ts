'use client';

import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

/**
 * Fetches the list of tests for the given classId from the server.
 *
 * This function sends a GET request with the provided classId to the server.
 * If the request is successful, it returns the list of tests. If an error
 * occurs during the request, an error with the message of errorFetchingTests
 * from statusMessages is thrown.
 *
 * @param {string} classId The ID of the class to fetch tests for.
 * @returns {Promise<any[]>} A promise that resolves with the list of tests.
 * @throws {Error} If the tests cannot be fetched, it throws an error with the message of errorFetchingTests.
 */
export const processGetTests = async (classId: string) => {
  try {
    const response = await fetch(`${urlEnum.test}?classId=${classId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingTests);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(statusMessages.errorFetchingTests);
  }
};

/**
 * Creates a new test on the server for the specified class.
 *
 * This function sends a POST request with the provided data and classId to the server.
 * If the request is successful, the server's response is returned. If an error occurs during
 * the request, an error with the message of creatingTest from statusMessages is thrown.
 *
 * @param {object} data The data to be used when creating the test.
 * @param {string} classId The ID of the class to associate the new test with.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the test cannot be created, it throws an error with the message of creatingTest
 * from statusMessages.
 */
export const processCreateTest = async (data: object, classId: string) => {
  try{
  const response = await fetch(`${urlEnum.test}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ ...data, classId }),
  });
  if (!response.ok) {
    throw new Error(statusMessages.errorCreatingTest);
  }
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(statusMessages.errorCreatingTest);

  }
};

/**
 * Removes a test from the server using the provided testId.
 *
 * This function sends a DELETE request to the server to remove the test
 * identified by the given testId. If the request is successful, the server's
 * response is returned. If an error occurs during the request, an error with
 * the message of errorDeletingTest from statusMessages is thrown.
 *
 * @param {number} testId The ID of the test to be removed.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the test cannot be removed, it throws an error with the
 * message of errorDeletingTest from statusMessages.
 */
export const processRemoveTest = async (testId: number) => {
  try {
    const response = await fetch(`${urlEnum.test}?id=${testId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorDeletingTest);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(statusMessages.errorDeletingTest);
  }
};
