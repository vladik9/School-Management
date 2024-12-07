import Config from './Config';

export const urlEnum = {
  login: `${Config.apiUrl}/api/auth/login`,
  logout: `${Config.apiUrl}/api/auth/logout`,
  register: `${Config.apiUrl}/api/auth/register`,
  users: `${Config.apiUrl}/user`,
  category: `${Config.apiUrl}/api/category`,
  categories: `${Config.apiUrl}/api/categories`,
};

export const basicOperationsEnum = {
  create: '/create',
  update: '/update',
  delete: '/delete',
  import: '/import',
  export: '/export',
};
