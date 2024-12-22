'use client';
import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

export const processGetStudents = async (classId: string) => {
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


export const processCreateStudent = async (data: object, classId: string) => {
  try {
    const { name, studentId } = data;
    const filteredData = { name, studentId };
  const response = await fetch(`${urlEnum.student}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...filteredData, classId: classId }),
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

export const processRemoveStudent = async (studentId: number) => {
  try {
    const response = await fetch(`${urlEnum.student}?id=${studentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorDeletingStudent);
    }
    return response;
  } catch (error) {
    throw new Error(statusMessages.errorDeletingStudent);
  }
};
