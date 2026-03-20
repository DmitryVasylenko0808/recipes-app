import { Route, Routes } from 'react-router';
import { SignInPage } from '../pages/sign-in';

function App() {
  return (
    <Routes>
      <Route index element={<div>Home Page</div>} />
      <Route path="auth/sign-in" element={<SignInPage />}></Route>
    </Routes>
  );
}

export default App;
