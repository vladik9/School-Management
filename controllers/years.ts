'use client';

import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

export const processGetYears = async (schoolId: number) => {
  try {
    const response = await fetch(`${urlEnum.year}?schoolId=${schoolId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingYears);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: statusMessages.errorFetchingYears };
  }
};


export const processCreateYear = async (data: object, schoolId: number) => {
try {
  const response = await fetch(`${urlEnum.year}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, schoolId }),
  });
  if (!response.ok) {
    throw new Error(statusMessages.errorCreatingTest);
  }
  return response;
} catch (error) {
  console.error(error);
  return { message: statusMessages.errorCreatingTest };
}
};

export const processRemoveYear = async (yearId: number) => {
  try {
    const response = await fetch(`${urlEnum.year}?id=${yearId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorDeletingYear);
    }
    return response;
  } catch (error) {
    console.error(error);
    return { message: statusMessages.errorDeletingYear };
  }
};
