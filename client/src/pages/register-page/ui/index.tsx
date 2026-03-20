import { Typograpghy, TextField, Button } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { postRegisterUser } from '../api';
import { type RegisterFormFields, registerSchema } from '../validations';

export const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postRegisterUser,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const submitHandler = (fields: RegisterFormFields) => {
    const { confirmPassword, ...postRegisterUserArgs } = fields;

    mutateAsync(postRegisterUserArgs)
      .then(() => alert('Success'))
      .catch((err) => alert(err.message));
  };

  return (
    <form className="max-w-110 p-6" onSubmit={handleSubmit(submitHandler)}>
      <Typograpghy tagVariant="h4" className="mb-6 text-center text-2xl">
        Create an account
      </Typograpghy>
      <Typograpghy tagVariant="p" className="mb-6 text-center">
        Join our recipe community and start sharing your culinary creations.
      </Typograpghy>
      <div className="mb-4 flex gap-4">
        <TextField
          label="First Name"
          placeholder="John"
          error={errors.firstname?.message}
          {...register('firstname')}
        />
        <TextField
          label="Second Name"
          placeholder="Doe"
          error={errors.secondname?.message}
          {...register('secondname')}
        />
      </div>
      <TextField
        label="Email"
        placeholder="john.doe@example.com"
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
      <TextField
        label="Confirm password"
        type="password"
        placeholder="********"
        className="mb-4"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Button type="submit" variant="primary" className="mb-4" isLoading={isPending} fullWidth>
        Register
      </Button>
      <div className="flex justify-center gap-1">
        <Typograpghy tagVariant="span">Already have an account?</Typograpghy>
        <Link className="text-primary font-medium hover:underline" to={'/auth/sign-in'}>
          Sign in
        </Link>
      </div>
    </form>
  );
};
