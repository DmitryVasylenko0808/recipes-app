import { SignInForm } from './ui/sign-in-form';

export const SignInPage = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="bg-card border-ring/30 text-card-foreground rounded-xl border shadow-xl">
        <SignInForm />
      </div>
    </div>
  );
};
