import { RegisterForm } from '@/features/sessions/register-user';
import { Card } from '@/shared';

export const RegisterPage = () => {
  return (
    <Card className="shadow-xl">
      <RegisterForm />
    </Card>
  );
};
