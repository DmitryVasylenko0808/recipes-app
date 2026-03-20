import { Route, Routes } from 'react-router';
import { SignInPage } from '../pages/sign-in';
import { RegisterPage } from '@/pages/register-page';
import { useAuth } from '@/shared';
import { useEffect } from 'react';
import { MainPage } from '@/pages/main-page';
import { AuthLayout } from './layouts/auth-layout';

function App() {
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) console.log('401');
  }, [accessToken]);

  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />}></Route>
        <Route path="register" element={<RegisterPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
