export const pathKeys = {
  main: '/',
  authors: {
    byId: (id?: string) => `/authors/${id}`,
    byIdEdit: (id?: string) => `/authors/${id}/edit`,
  },
  recipes: {
    create: `/recipes/create`,
    byId: (id?: string) => `/recipes/${id}`,
    byIdUpdate: (id?: string) => `/recipes/${id}/update`,
  },
  auth: {
    signIn: `/auth/sign-in`,
    register: `/auth/register`,
  },
} as const;
