'use client';
import { urlEnum } from '../utils/urlEnum';

export const handleGetIntervals = async (yearId: string) => {
  try {
    const response = await fetch(`${urlEnum.interval}?yearId=${yearId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch intervals');
    }


    const data = await response.json();
    return data;  // This will return the list of years
  } catch (error) {

    console.error(error);
    return { message: 'Error fetching intervals' };  // Handle error gracefully
  }
};


export const handleCreateInterval = async (data: object, yearId: string) => {
   const response = await fetch(`${urlEnum.interval}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, yearId }),
  });
  return response;
};
