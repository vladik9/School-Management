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

export const processRemoveDocument = async (yearId: number) => {
  try {
    const response = await fetch(`${urlEnum.year}?id=${yearId}`, {
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
