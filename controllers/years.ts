'use client';

import { urlEnum } from '../utils/urlEnum';
import statusMessages from '@/lib/statusMessages';

export const handleGetYears = async (schoolId: number) => {
  try {
    const response = await fetch(`${urlEnum.year}?schoolId=${schoolId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(statusMessages.errorFetchingYears);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: statusMessages.errorFetchingYears };
  }
};


export const handleCreateYear = async (data: object, schoolId: number) => {
console.log("🚀 ~ handleCreateYear ~ handleCreateYear:", handleCreateYear)
try {
  const response = await fetch(`${urlEnum.year}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, schoolId }),
  });
  if (!response.ok) {
    throw new Error(statusMessages.errorCreatingTest);
  }
  return response;
} catch (error) {
  console.error(error);
  return { message: statusMessages.errorCreatingTest };
}
};
