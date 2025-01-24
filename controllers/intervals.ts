'use client';
import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

/**
 * Fetches the list of intervals associated with a given test ID from the server.
 *
 * @param {number} testId The ID of the test to fetch intervals for.
 * @returns {Promise<IntervalData[]>} A promise that resolves with the list of intervals, or an error with the message of errorFetchingIntervals from statusMessages if the fetch fails.
 */
export const processGetIntervals = async (testId: number) => {
  try {
    const response = await fetch(`${urlEnum.interval}?testId=${testId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingIntervals);
    }
    if (!response) return [];

    const data = await response.json();
    return data;
  } catch (error) {

    console.error(error);
    return { message: statusMessages.errorFetchingIntervals };
  }
};

/**
 * Creates a new interval for the given testId on the server.
 *
 * This function sends a POST request with the provided testId to the server.
 * If the request is successful, the server's response is returned. If an error
 * occurs during the request, an error with the message of errorCreatingInterval
 * from statusMessages is returned.
 *
 * @param {number} testId The ID of the test to create an interval for.
 * @returns {Promise<Response | {message: string}>} A promise that resolves with the server's response or an error message.
 */
export const processCreateInterval = async (testId: number) => {
  try {
   const response = await fetch(`${urlEnum.interval}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ testId }),
   });
   if (!response.ok) {
    throw new Error(statusMessages.errorCreatingInterval);
  }
    return response;
  } catch (error) {
  console.error(error);
  return { message: statusMessages.errorCreatingInterval};
}
};

/**
 * Removes an interval from the server using the provided intervalId.
 *
 * This function sends a DELETE request to the server to remove the interval
 * identified by the given intervalId. If the request is successful, the server's
 * response is returned. If an error occurs during the request, an error with the
 * message of errorDeletingInterval from statusMessages is returned.
 *
 * @param {number} intervalId The ID of the interval to be removed.
 * @returns {Promise<Response | {message: string}>} A promise that resolves with the server's response or an error message.
 */
export const processRemoveInterval = async (intervalId: number) => {
  try {
    const response = await fetch(`${urlEnum.interval}?id=${intervalId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorDeletingInterval);
    }
    return response;
  } catch (error) {
    throw new Error(statusMessages.errorDeletingInterval);
  }
}
