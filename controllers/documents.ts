'use client';

import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

/**
 * Fetches the list of documents for the given classId from the server.
 *
 * @param {number} classId The ID of the class to fetch documents for.
 * @returns {Promise<DocumentData[]>} A promise that resolves with the list of documents. If an error occurs, it will throw an error with the message of errorFetchingDocuments from statusMessages.
 */
export const processGetDocuments = async (classId: number) => {
  try {
    const response = await fetch(`${urlEnum.documents}?classId=${classId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingDocuments);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(statusMessages.errorFetchingDocuments );
  }
};

/**
 * Fetches and downloads a document from the server using the provided document ID.
 *
 * This function sends a GET request to the server to retrieve the document
 * associated with the given documentId. It then creates a downloadable link
 * for the document blob and triggers the download on the client-side.
 *
 * @param {number} documentId The ID of the document to fetch and download.
 * @throws {Error} If the document cannot be fetched, it throws an error with the message of errorFetchingDocument from statusMessages.
 */
export const processGetDocument = async (documentId: number) => {
  try {
    const response = await fetch(`${urlEnum.documents}?id=${documentId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingDocument);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = response.headers.get('Content-Disposition')?.split('filename=')[1] || 'document';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    throw new Error(statusMessages.errorFetchingDocument);
  }
};

/**
 * Creates a new document on the server for the specified class.
 *
 * This function sends a POST request with the provided formData, which includes
 * the document details, to the server. The classId is appended to the formData
 * before being sent. Upon successful creation, the server's response is returned.
 * If an error occurs during the request, an error with the message of
 * errorCreatingDocument from statusMessages is thrown.
 *
 * @param {FormData} formData The form data containing the document's name and file.
 * @param {number} classId The ID of the class to associate the document with.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the document cannot be created, it throws an error with the
 * message of errorCreatingDocument from statusMessages.
 */
export const processCreateDocument = async (formData: FormData, classId: number) => {
  try {
    formData.append('classId', classId.toString());

    const response = await fetch(`${urlEnum.documents}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(statusMessages.errorCreatingDocument);
    }

    return response;
  } catch (error) {
    console.error(error);
    throw new Error(statusMessages.errorCreatingDocument);
  }
};

/**
 * Removes a document from the server based on the provided document ID.
 *
 * This function sends a DELETE request to the server to remove the document
 * associated with the given documentId. If the request is successful, the
 * server's response is returned. If an error occurs during the request, an
 * error with the message of errorDeletingDocument from statusMessages is thrown.
 *
 * @param {number} documentId The ID of the document to be removed.
 * @returns {Promise<Response>} A promise that resolves with the server's response.
 * @throws {Error} If the deletion fails, it throws an error with the appropriate message.
 */

export const processRemoveDocument = async (documentId: number) => {
  try {
    const response = await fetch(`${urlEnum.documents}?id=${documentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorDeletingDocument);
    }
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(statusMessages.errorDeletingDocument);
  }
};
