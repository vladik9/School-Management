'use client';
import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

/**
 * Fetches the list of schools from the server.
 *
 * This function sends a GET request to the server to retrieve the list of schools.
 * If the request is successful, the server's response is returned. If an error occurs
 * during the request, an error with the message of errorFetchingSchools from statusMessages
 * is thrown.
 *
 * @returns {Promise<SchoolData[]>} A promise that resolves with the list of schools. If an error occurs, it will throw an error with the message of errorFetchingSchools from statusMessages.
 * @throws {Error} If the fetch fails, it throws an error with the message of errorFetchingSchools from statusMessages.
 */
 export const processGetSchools = async () => {
  try {
    const response = await fetch(`${urlEnum.school}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingSchools);
    }
    if(!response) return []

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(statusMessages.errorFetchingSchools);

  }
};


/**
 * Creates a new school on the server.
 *
 * This function sends a POST request with the provided data to the server.
 * If the request is successful, the server's response is returned. If an error
 * occurs during the request, an error with the message of errorCreatingSchool
 * from statusMessages is thrown.
 *
 * @param {object} data The data to be used when creating the school. Must contain the following properties: name, city, state
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the school cannot be created, it throws an error with the message of errorCreatingSchool
 * from statusMessages.
 */
export const processCreateSchool = async (data: object) => {
  try {
  const response = await fetch(`${urlEnum.school}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
  if (!response.ok) {
    throw new Error(statusMessages.errorCreatingSchool);
  }
  return response;

  } catch (error) {
    console.log(error);
    throw new Error(statusMessages.errorCreatingSchool);

  }
};

/**
 * Removes a school from the server using the provided schoolId.
 *
 * This function sends a DELETE request to the server to remove the school
 * identified by the given schoolId. If the request is successful, the server's
 * response is returned. If an error occurs during the request, an error with the
 * message of errorDeletingSchool from statusMessages is thrown.
 *
 * @param {number} schoolId The ID of the school to be removed.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the school cannot be removed, it throws an error with the
 * message of errorDeletingSchool from statusMessages.
 */
export const processRemoveSchool = async (schoolId: number) => {
  try {
    const response = await fetch(`${urlEnum.school}?id=${schoolId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorDeletingSchool);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(statusMessages.errorDeletingSchool);
  }
};
