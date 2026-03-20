import { RegisterForm } from './ui';

export const RegisterPage = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="bg-card border-ring/30 text-card-foreground rounded-xl border shadow-xl">
        <RegisterForm />
      </div>
    </div>
  );
};
