'use client';

import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

export const processGetRecords = async (intervalId: number) => {
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
  throw new Error(statusMessages.errorFetchingRecords);

  }
};


export const processCreateRecord = async (data: object, intervalId: number) => {
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
  throw new Error(statusMessages.creatingRecord);

}
};


export const processRemoveRecord = async (recordId: number) => {
  try {
    const response = await fetch(`${urlEnum.record}?id=${recordId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(statusMessages.errorDeletingRecord);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(statusMessages.errorDeletingRecord);
  }
};
