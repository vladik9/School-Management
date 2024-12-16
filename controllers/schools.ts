'use client';
import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

 export const processGetSchools = async () => {
  try {
    const response = await fetch(`${urlEnum.school}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingSchools);
    }
    if(!response) return []

    const data = await response.json();
    return data;  // This will return the list of schools
  } catch (error) {

    console.error(error);
    return { message: statusMessages.errorFetchingSchools };
  }
};




export const processCreateSchool = async (data: object) => {
  try {
  const response = await fetch(`${urlEnum.school}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
  if (!response.ok) {
    throw new Error(statusMessages.errorCreatingSchool);
  }
  return response;

  } catch (error) {
    return { message: statusMessages.errorCreatingSchool };
  }
};
