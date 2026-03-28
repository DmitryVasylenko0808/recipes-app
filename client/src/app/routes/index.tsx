import { lazy } from 'react';

import { AuthGuard } from './auth-guard';
import { Routes, Route } from 'react-router';
import { AuthLayout } from '../layouts/auth-layout';
import { BaseLayout } from '../layouts/base-layout';

const MainPage = lazy(() => import('@/pages/main'));
const RecipePage = lazy(() => import('@/pages/recipe'));
const AuthorPage = lazy(() => import('@/pages/author'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));
const CreateRecipePage = lazy(() => import('@/pages/create-recipe'));
const UpdateRecipePage = lazy(() => import('@/pages/update-recipe'));
const EditProfilePage = lazy(() => import('@/pages/edit-profile'));
const SignInPage = lazy(() => import('@/pages/sign-in'));
const RegisterPage = lazy(() => import('@/pages/register'));

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<MainPage />} />
      <Route path="/recipes/:id" element={<RecipePage />} />
      <Route path="/authors/:id" element={<AuthorPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route element={<AuthGuard />}>
        <Route path="/recipes/:id/update" element={<UpdateRecipePage />} />
        <Route path="/recipes/create" element={<CreateRecipePage />} />
        <Route path="/authors/:id/edit" element={<EditProfilePage />} />
      </Route>
    </Route>
    <Route path="auth" element={<AuthLayout />}>
      <Route path="sign-in" element={<SignInPage />}></Route>
      <Route path="register" element={<RegisterPage />}></Route>
    </Route>
  </Routes>
);
