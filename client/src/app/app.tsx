import { Route, Routes } from 'react-router';
import { SignInPage } from '../pages/sign-in';
import { RegisterPage } from '@/pages/register-page';

function App() {
  return (
    <Routes>
      <Route index element={<div>Home Page</div>} />
      <Route path="auth/sign-in" element={<SignInPage />}></Route>
      <Route path="auth/register" element={<RegisterPage />}></Route>
    </Routes>
  );
}

export default App;
