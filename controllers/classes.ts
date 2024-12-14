'use client';
import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';
export const handleGetClasses = async (yearId: string) => {
  try {
    const response = await fetch(`${urlEnum.class}?yearId=${yearId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingClasses);
    }
    if (!response) return [];

    const data = await response.json();
    return data;  // This will return the list of years
  } catch (error) {

    console.error(error);
    return { message: statusMessages.errorFetchingClasses};
  }
};


export const handleCreateClass = async (data: object, yearId: string) => {
  try {
   const response = await fetch(`${urlEnum.class}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, yearId }),
   });
   if (!response.ok) {
    throw new Error(statusMessages.errorCreatingClass);
  }
    return response;
  } catch (error) {
    console.error(error);
    return { message: statusMessages.errorCreatingClass};
  }
};
