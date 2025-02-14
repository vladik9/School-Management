'use client';
import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

/**
 * Fetches the list of students for a given classId from the server.
 *
 * This function sends a GET request with the provided classId to the server.
 * If the request is successful, it returns the list of students. If an error
 * occurs during the request, an error with the message of errorFetchingStudents
 * from statusMessages is thrown.
 *
 * @param {string} classId The ID of the class to fetch students for.
 * @returns {Promise<StudentData[]>} A promise that resolves with the list of students. If an error occurs, it will throw an error with the message of errorFetchingStudents from statusMessages.
 * @throws {Error} If the students cannot be fetched, it throws an error with the message of errorFetchingStudents from statusMessages.
 */
export const processGetStudents = async (classId: string) => {
  try {
    const response = await fetch(`${urlEnum.student}?classId=${classId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingStudents);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(statusMessages.errorFetchingStudents);

  }
};

/**
 * Creates a new student for the specified class.
 *
 * This function sends a POST request with the provided data and classId to the server.
 * If the request is successful, the server's response is returned. If an error occurs during
 * the request, an error with the message of errorCreatingStudent from statusMessages is thrown.
 *
 * @param {object} data The data to be used when creating the student. Must contain the following properties: name, studentId
 * @param {string} classId The ID of the class to associate the new student with.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the student cannot be created, it throws an error with the message of errorCreatingStudent
 * from statusMessages.
 */
export const processCreateStudent = async (data: object, classId: string) => {
  try {
    const { name, studentId } :any = data;
    const filteredData = { name, studentId };
  const response = await fetch(`${urlEnum.student}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ ...filteredData, classId: classId }),
  });
  if (!response.ok) {
    throw new Error(statusMessages.errorCreatingStudent);
  }
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(statusMessages.errorCreatingStudent);

  }
};

/**
 * Removes a student from the server based on the provided student ID.
 *
 * This function sends a DELETE request to the server to remove the student
 * identified by the given studentId. If the request is successful, the server's
 * response is returned. If an error occurs during the request, an error with
 * the message of errorDeletingStudent from statusMessages is thrown.
 *
 * @param {number} studentId The ID of the student to be removed.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the student cannot be removed, it throws an error with the message of errorDeletingStudent.
 */
export const processRemoveStudent = async (studentId: number) => {
  try {
    const response = await fetch(`${urlEnum.student}?id=${studentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorDeletingStudent);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(statusMessages.errorDeletingStudent);
  }
};


/**
 * Updates a student's information on the server.
 *
 * This function sends a PUT request to update the student details identified by the given studentId.
 * The request body includes a JSON object with the updated student data. If the request is successful,
 * the server's response is returned. If an error occurs during the request, an error with the message
 * of errorUpdatingStudent from statusMessages is thrown.
 *
 * @param {object} data The updated student data.
 * @param {number} studentId The ID of the student to be updated.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the update fails, it throws an error with the message of errorUpdatingStudent
 * from statusMessages.
 */
export const processUpdateStudent = async (data: object, studentId: number) => {
  try {
    const response = await fetch(`${urlEnum.student}?id=${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorUpdatingStudent);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(statusMessages.errorUpdatingStudent);
  }
};
