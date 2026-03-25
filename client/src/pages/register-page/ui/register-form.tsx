import { Typograpghy, TextField, Button, pathKeys } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { type RegisterFormFields, registerSchema } from '../model/validations';
import { useRegisterUser } from '../model/hooks/use-register-user';
import { Lock, Mail, UserRound } from 'lucide-react';

export const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
  });
  const { mutateAsync, isPending } = useRegisterUser();
  const navigate = useNavigate();

  const submitHandler = (fields: RegisterFormFields) => {
    const { confirmPassword, ...postRegisterUserArgs } = fields;

    mutateAsync(postRegisterUserArgs)
      .then(() => navigate(pathKeys.main))
      .catch((err) => alert(err.message));
  };

  return (
    <form className="max-w-135 p-6" onSubmit={handleSubmit(submitHandler)}>
      <Typograpghy tagVariant="h4" className="mb-6 text-center text-2xl">
        Create an account
      </Typograpghy>
      <Typograpghy tagVariant="p" className="mb-6 text-center">
        Join our recipe community and start sharing your culinary creations.
      </Typograpghy>
      <div className="relative mb-4 flex gap-4">
        <TextField
          label="First Name"
          placeholder="John"
          className="flex-1"
          error={errors.firstname?.message}
          icon={UserRound}
          {...register('firstname')}
        />
        <TextField
          label="Second Name"
          placeholder="Doe"
          className="flex-1"
          error={errors.secondname?.message}
          icon={UserRound}
          {...register('secondname')}
        />
      </div>
      <TextField
        label="Email"
        placeholder="john.doe@example.com"
        className="mb-4"
        error={errors.email?.message}
        icon={Mail}
        {...register('email')}
      />
      <TextField
        label="Password"
        type="password"
        placeholder="********"
        caption="Must be at least 8 characters long"
        className="mb-4"
        error={errors.password?.message}
        icon={Lock}
        {...register('password')}
      />
      <TextField
        label="Confirm password"
        type="password"
        placeholder="********"
        className="mb-4"
        error={errors.confirmPassword?.message}
        icon={Lock}
        {...register('confirmPassword')}
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
        Register
      </Button>
      <div className="flex justify-center gap-1">
        <Typograpghy tagVariant="p">Already have an account?</Typograpghy>
        <Link className="text-primary font-medium hover:underline" to={pathKeys.auth.signIn}>
          Sign in
        </Link>
      </div>
    </form>
  );
};
