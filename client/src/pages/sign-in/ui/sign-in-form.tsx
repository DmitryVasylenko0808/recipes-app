import { Button, TextField, Typograpghy } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { type SignInFormFields, signInSchema } from '../model/validations';
import { useSignInUser } from '../model/hooks/use-sign-in-user';

export const SignInForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(signInSchema),
  });
  const { mutateAsync, isPending } = useSignInUser();
  const navigate = useNavigate();

  const submitHanlder = (fields: SignInFormFields) => {
    mutateAsync(fields)
      .then(() => navigate('/'))
      .catch((err) => alert(err.message));
  };

  return (
    <form className="max-w-110 p-6" onSubmit={handleSubmit(submitHanlder)}>
      <Typograpghy tagVariant="h4" className="mb-6 text-center text-2xl">
        Sign in
      </Typograpghy>
      <Typograpghy tagVariant="p" className="mb-6 text-center">
        Explore delicious recipes, share your own dishes, and bring new flavors to your kitchen.
      </Typograpghy>
      <TextField
        label="Email"
        className="mb-4"
        error={errors.email?.message}
        {...register('email')}
      />
      <TextField
        label="Password"
        type="password"
        placeholder="********"
        caption="Must be at least 8 characters long"
        className="mb-4"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button
        as="button"
        type="submit"
        variant="primary"
        className="mb-4"
        disabled={isPending}
        isLoading={isPending}
        fullWidth
      >
        Sign in
      </Button>
      <div className="flex justify-center gap-1">
        <Typograpghy tagVariant="span">Don't have an account?</Typograpghy>
        <Link className="text-primary font-medium hover:underline" to={'/auth/register'}>
          Sign up
        </Link>
      </div>
    </form>
  );
};
