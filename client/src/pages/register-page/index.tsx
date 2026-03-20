import { Button, TextField, Typograpghy } from '@/shared';
import { Link } from 'react-router';
import { z } from 'zod';

export const signInSchema = z.object({});

export const SignInPage = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="bg-card border-ring/30 text-card-foreground rounded-xl border shadow-xl">
        <form className="max-w-110 p-6">
          <Typograpghy tagVariant="h4" className="mb-6 text-center text-2xl">
            Sign in
          </Typograpghy>
          <Typograpghy tagVariant="p" className="mb-6 text-center">
            Explore delicious recipes, share your own dishes, and bring new flavors to your kitchen.
          </Typograpghy>
          <div className="mb-4 flex gap-4">
            <TextField label="First Name" placeholder="John" />
            <TextField label="Second Name" placeholder="Doe" />
          </div>
          <TextField label="Email" placeholder="john.doe@example.com" className="mb-4" />
          <TextField
            label="Password"
            type="password"
            placeholder="********"
            caption="Must be at least 8 characters long"
            className="mb-4"
          />
          <TextField
            label="Confirm password"
            type="password"
            placeholder="********"
            className="mb-4"
          />
          <Button type="submit" variant="primary" className="mb-4" fullWidth>
            Sign in
          </Button>
          <div className="flex justify-center gap-1">
            <Typograpghy tagVariant="span">Don't have an account?</Typograpghy>
            <Link className="text-primary font-medium hover:underline" to={'/'}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
