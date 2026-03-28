import { RegisterForm } from '@/features/sessions/register-user';
import { Card } from '@/shared';

const RegisterPage = () => {
  return (
    <Card className="shadow-xl">
      <RegisterForm />
    </Card>
  );
};
export default RegisterPage;
