'use client';

import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

export const handleGetRecords = async (intervalId: number) => {
  try {
    const response = await fetch(`${urlEnum.record}?intervalId=${intervalId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingRecords);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: statusMessages.errorFetchingRecords };
  }
};


export const handleCreateRecord = async (data: object, intervalId: number) => {
try {
  const response = await fetch(`${urlEnum.record}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, intervalId }),
  });
  if (!response.ok) {
    throw new Error(statusMessages.creatingRecord);
  }
  return response;
} catch (error) {
  console.error(error);
  return { message: statusMessages.creatingRecord };
}
};
