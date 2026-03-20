import { Route, Routes } from 'react-router';
import { SignInPage } from '../pages/sign-in';
import { RegisterPage } from '@/pages/register-page';
import { useAuth } from '@/shared';
import { useEffect } from 'react';
import { MainPage } from '@/pages/main-page';

function App() {
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) console.log('401');
  }, [accessToken]);

  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="auth/sign-in" element={<SignInPage />}></Route>
      <Route path="auth/register" element={<RegisterPage />}></Route>
    </Routes>
  );
}

export default App;
