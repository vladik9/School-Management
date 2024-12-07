'use client';
import { urlEnum } from '../utils/urlEnum';
export const handleGetClasses = async () => {
  const response = await fetch(`${urlEnum.class}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const handleCreateClass = async (data: object) => {
  const response = await fetch(`${urlEnum.class}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
  return response;
};
