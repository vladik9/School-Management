'use client';
import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';
export const processGetIntervals = async (testId: number) => {
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


export const processCreateInterval = async (testId: number) => {
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
export const processRemoveInterval = async (intervalId: number) => {
  try {
    const response = await fetch(`${urlEnum.interval}?id=${intervalId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorDeletingInterval);
    }
    return response;
  } catch (error) {
    console.error(error);
    return { message: statusMessages.errorDeletingInterval };
  }
}
