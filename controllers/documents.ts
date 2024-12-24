'use client';

import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

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
