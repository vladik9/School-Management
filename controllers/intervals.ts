'use client';
import { urlEnum } from '../utils/urlEnum';

export const handleGetIntervals = async (testId: number) => {
  try {
    const response = await fetch(`${urlEnum.interval}?testId=${testId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch intervals');
    }
    if(!response) return []

    const data = await response.json();
    return data;  // This will return the list of intervals
  } catch (error) {

    console.error(error);
    return { message: 'Error fetching intervals' };  // Handle error gracefully
  }
};


export const handleCreateInterval = async ( testId: number) => {
   const response = await fetch(`${urlEnum.interval}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({  testId }),
  });
  return response;
};
