import { AuthorPage } from '@/pages/author';
import { CreateRecipePage } from '@/pages/create-recipe';
import { EditProfilePage } from '@/pages/edit-profile';
import { MainPage } from '@/pages/main';
import { NotFoundPage } from '@/pages/not-found';
import { RecipePage } from '@/pages/recipe';
import { RegisterPage } from '@/pages/register';
import { SignInPage } from '@/pages/sign-in';
import { UpdateRecipePage } from '@/pages/update-recipe';
import { Routes, Route } from 'react-router';
import { AuthLayout } from '../layouts/auth-layout';
import { BaseLayout } from '../layouts/base-layout';
import { AuthGuard } from './auth-guard';

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
