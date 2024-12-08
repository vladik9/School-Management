'use client';

import { urlEnum } from '../utils/urlEnum';
export const handleGetTests = async (classId: string) => {
  try {
    const response = await fetch(`${urlEnum.test}?classId=${classId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tests');
    }

    const data = await response.json();
    return data;  // This will return the list of years
  } catch (error) {
    console.error(error);
    return { message: 'Error fetching tests' };  // Handle error gracefully
  }
};


export const handleCreateTest = async (data: object, classId: string) => {
  const response = await fetch(`${urlEnum.test}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, classId }),
  });
  return response;
};
