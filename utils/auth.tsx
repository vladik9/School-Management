'use client';
export const login = async (email: string, password: string): Promise<boolean> => {

  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    // Successfully logged in
    return new Promise((resolve) => {
      localStorage.setItem('isAuthenticated', 'true');
      resolve(true);
    });
  } else {
    return new Promise((resolve) => {
      localStorage.setItem('isAuthenticated', 'false');
      resolve(false);
    });
  }

  // // This is a mock login function. In a real app, you'd validate against a backend.
  // if (email === 'test99@em.com' && password === 'test99') {
  //   localStorage.setItem('isAuthenticated', 'true');
  //   return true;
  // }
  // return false;
};

export const logout = (): void => {
  localStorage.removeItem('isAuthenticated');
};

export const checkAuth = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};
