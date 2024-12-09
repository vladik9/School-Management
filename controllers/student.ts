'use client';
//TODO - WORK FORM HERE IMPLEMENT STUDENTS and API
import { urlEnum } from '../utils/urlEnum';
export const handleGetStudents = async (classId: string) => {
  try {
    const response = await fetch(`${urlEnum.student}?classId=${classId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }

    const data = await response.json();
    return data;  // This will return the list of years
  } catch (error) {
    console.error(error);
    return { message: 'Error fetching students' };  // Handle error gracefully
  }
};


export const handleCreateStudent = async (data: object, classId: string) => {
  const response = await fetch(`${urlEnum.student}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, classId: classId }),
  });
  return response;
};
