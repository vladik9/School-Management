export const login = (email: string, password: string): boolean => {
  // This is a mock login function. In a real app, you'd validate against a backend.
  if (email === 'test99@em.com' && password === 'test99') {
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem('isAuthenticated');
};

export const checkAuth = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};
