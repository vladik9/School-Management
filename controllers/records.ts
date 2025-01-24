'use client';

import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

/**
 * Fetches the list of records for a given interval ID from the server.
 *
 * This function sends a GET request with the provided intervalId to the server.
 * If the request is successful, it returns the list of records. If an error occurs
 * during the request, it throws an error with the message of errorFetchingRecords
 * from statusMessages.
 *
 * @param {number} intervalId The ID of the interval for which to fetch records.
 * @returns {Promise<any[]>} A promise that resolves with the list of records.
 * @throws {Error} If the fetch fails, it throws an error with the appropriate message.
 */
export const processGetRecords = async (intervalId: number) => {
  try {
    const response = await fetch(`${urlEnum.record}?intervalId=${intervalId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingRecords);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  throw new Error(statusMessages.errorFetchingRecords);

  }
};

/**
 * Creates a new record for the specified interval.
 *
 * This function sends a POST request with the provided data and intervalId to the server.
 * If the request is successful, the server's response is returned. If an error occurs during
 * the request, an error with the message of creatingRecord from statusMessages is thrown.
 *
 * @param {object} data The data to be used when creating the record.
 * @param {number} intervalId The ID of the interval to associate the new record with.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the record cannot be created, it throws an error with the message of creatingRecord
 * from statusMessages.
 */
export const processCreateRecord = async (data: object, intervalId: number) => {
  try {
  const response = await fetch(`${urlEnum.record}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, intervalId }),
  });
  if (!response.ok) {
    throw new Error(statusMessages.creatingRecord);
  }
  return response;
} catch (error) {
  console.error(error);
  throw new Error(statusMessages.creatingRecord);

}
};

/**
 * Removes a record from the server.
 *
 * This function sends a DELETE request to the server to remove the record
 * identified by the given recordId. If the request is successful, the server's
 * response is returned. If an error occurs during the request, an error with the
 * message of errorDeletingRecord from statusMessages is thrown.
 *
 * @param {number} recordId The ID of the record to be removed.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the deletion fails, it throws an error with the message of errorDeletingRecord
 * from statusMessages.
 */
export const processRemoveRecord = async (recordId: number) => {
  try {
    const response = await fetch(`${urlEnum.record}?id=${recordId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorDeletingRecord);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(statusMessages.errorDeletingRecord);
  }
};

/**
 * Updates a record on the server.
 *
 * This function sends a PUT request to the server to update the record
 * identified by the given recordId. The request body is a JSON object
 * with the updated record data. If the request is successful, the server's
 * response is returned. If an error occurs during the request, an error with
 * the message of errorUpdatingRecord from statusMessages is thrown.
 *
 * @param {object} data The updated record data.
 * @param {number} recordId The ID of the record to be updated.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the update fails, it throws an error with the message of errorUpdatingRecord
 * from statusMessages.
 */
export const processUpdateRecord = async (data: object, recordId: number) => {
  try {
    const response = await fetch(`${urlEnum.record}?id=${recordId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorUpdatingRecord);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(statusMessages.errorUpdatingRecord);
  }
};
