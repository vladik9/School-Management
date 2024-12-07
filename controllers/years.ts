'use client';

import { urlEnum } from '../utils/urlEnum';
export const handleGetYears = async (schoolId: string) => {
  try {
    const response = await fetch(`${urlEnum.year}?schoolId=${schoolId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch years');
    }

    const data = await response.json();
    return data;  // This will return the list of years
  } catch (error) {
    console.error(error);
    return { message: 'Error fetching years' };  // Handle error gracefully
  }
};


export const handleCreateYear = async (data: object, schoolId: string) => {
  const response = await fetch(`${urlEnum.year}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, schoolId }),
  });
  return response;
};
