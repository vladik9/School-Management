'use client';
import { urlEnum } from '../utils/urlEnum';

export const handleGetClasses = async (yearId: string) => {
  try {
    const response = await fetch(`${urlEnum.class}?schoolId=${yearId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch classes');
    }

    const data = await response.json();
    return data;  // This will return the list of years
  } catch (error) {
    console.error(error);
    return { message: 'Error fetching classes' };  // Handle error gracefully
  }
};


export const handleCreateClass = async (data: object, yearId: string) => {
  const response = await fetch(`${urlEnum.class}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, yearId }),
  });
  return response;
};
