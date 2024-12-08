'use client';

import { urlEnum } from '../utils/urlEnum';
export const handleGetDisciplines = async (classId: string) => {
  try {
    const response = await fetch(`${urlEnum.discipline}?classId=${classId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch disciplines');
    }

    const data = await response.json();
    return data;  // This will return the list of years
  } catch (error) {
    console.error(error);
    return { message: 'Error fetching discipline' };  // Handle error gracefully
  }
};


export const handleCreateDiscipline = async (data: object, classId: string) => {
  const response = await fetch(`${urlEnum.discipline}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, classId }),
  });
  return response;
};
