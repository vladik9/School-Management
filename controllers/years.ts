'use client';

import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

/**
 * Fetches the list of years associated with the given schoolId from the server.
 *
 * @param {number} schoolId The ID of the school to fetch years for.
 * @returns {Promise<YearData[]>} A promise that resolves with the list of years,
 * or an error with the message of errorFetchingYears from statusMessages if the
 * fetch fails.
 */
export const processGetYears = async (schoolId: number) => {
  try {
    const response = await fetch(`${urlEnum.year}?schoolId=${schoolId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingYears);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  throw new Error(statusMessages.errorFetchingYears);

  }
};


/**
 * Creates a new year for the specified school.
 *
 * This function sends a POST request with the provided data and schoolId to the server.
 * If the request is successful, the server's response is returned. If an error occurs during
 * the request, an error with the message of creatingYear from statusMessages is thrown.
 *
 * @param {object} data The data to be used when creating the year. Must contain the following properties: name, startDate, endDate
 * @param {number} schoolId The ID of the school to associate the new year with.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the year cannot be created, it throws an error with the message of creatingYear
 * from statusMessages.
 */
export const processCreateYear = async (data: object, schoolId: number) => {
try {
  const response = await fetch(`${urlEnum.year}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ ...data, schoolId }),
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
 * Removes a year from the server based on the provided yearId.
 *
 * This function sends a DELETE request to the server to remove the year
 * identified by the given yearId. If the request is successful, the server's
 * response is returned. If an error occurs during the request, an error with
 * the message of errorDeletingYear from statusMessages is thrown.
 *
 * @param {number} yearId The ID of the year to be removed.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the year cannot be removed, it throws an error with the
 * message of errorDeletingYear from statusMessages.
 */
export const processRemoveYear = async (yearId: number) => {
  try {
    const response = await fetch(`${urlEnum.year}?id=${yearId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorDeletingYear);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(statusMessages.errorDeletingYear);
  }
};
