'use client';

import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

export const processGetTests = async (classId: string) => {
  try {
    const response = await fetch(`${urlEnum.test}?classId=${classId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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


export const processCreateTest = async (data: object, classId: string) => {
  try{
  const response = await fetch(`${urlEnum.test}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
export const processRemoveTest = async (testId: number) => {
  try {
    const response = await fetch(`${urlEnum.test}?id=${testId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
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
