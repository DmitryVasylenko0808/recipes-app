import { SignInForm } from '@/features/sessions/sign-in-user';
import { Card } from '@/shared';

const SignInPage = () => {
  return (
    <Card className="shadow-xl">
      <SignInForm />
    </Card>
  );
};
export default SignInPage;
