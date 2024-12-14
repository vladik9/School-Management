'use client';
import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

export const handleGetStudents = async (classId: string) => {
  try {
    const response = await fetch(`${urlEnum.student}?classId=${classId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingStudents);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: statusMessages.errorFetchingStudents };
  }
};


export const handleCreateStudent = async (data: object, classId: string) => {
  try{
  const response = await fetch(`${urlEnum.student}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, classId: classId }),
  });
  if (!response.ok) {
    throw new Error(statusMessages.errorCreatingStudent);
  }
    return response;
  } catch (error) {
    console.error(error);
    return { message: statusMessages.errorCreatingStudent };
  }
};
