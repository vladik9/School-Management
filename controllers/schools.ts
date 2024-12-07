'use client';
export const handleGetSchools = async () => {
  const response = await fetch('/api/schools', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const handleCreateSchool = async (data: object) => {
  const response = await fetch('/api/schools', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
  return response;
};
