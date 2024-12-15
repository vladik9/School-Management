'use client';
import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';
export const handleGetIntervals = async (testId: number) => {
  try {
    const response = await fetch(`${urlEnum.interval}?testId=${testId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingIntervals);
    }
    if (!response) return [];

    const data = await response.json();
    return data;
  } catch (error) {

    console.error(error);
    return { message: statusMessages.errorFetchingIntervals };
  }
};


export const handleCreateInterval = async (testId: number) => {
  try {
   const response = await fetch(`${urlEnum.interval}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ testId }),
   });
   if (!response.ok) {
    throw new Error(statusMessages.errorCreatingInterval);
  }
    return response;
  } catch (error) {
  console.error(error);
  return { message: statusMessages.errorCreatingInterval};
}
};
