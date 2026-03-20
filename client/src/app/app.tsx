import { Route, Routes } from 'react-router';
import { SignInPage } from '../pages/sign-in';
import { RegisterPage } from '@/pages/register-page';
import { useAuth } from '@/shared';
import { useEffect } from 'react';

function App() {
  const { accessToken, authenticate } = useAuth();

  useEffect(() => {
    if (accessToken) authenticate(accessToken);
    else console.log('401');
  }, []);

  return (
    <Routes>
      <Route index element={<div>Home Page</div>} />
      <Route path="auth/sign-in" element={<SignInPage />}></Route>
      <Route path="auth/register" element={<RegisterPage />}></Route>
    </Routes>
  );
}

export default App;
