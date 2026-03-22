import { type Author } from '@/entities/authors';
import { Button, Card, TextArea, TextField, Typograpghy } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { editProfileSchema, type EditProfileFormFields } from '../model/validations';
import { useEditProfile } from '../model/hooks/use-edit-profile';

type EditProfileFormProps = { author: Author; onSubmit?: (author?: Author) => void };
export const EditProfileForm = ({ author, onSubmit }: EditProfileFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditProfileFormFields>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstname: author.firstname,
      secondname: author.secondname,
      bio: author.bio ? author.bio : undefined,
    },
  });
  const { mutateAsync, isPending } = useEditProfile();

  const submitHandler = (fields: EditProfileFormFields) => {
    mutateAsync(fields)
      .then(onSubmit)
      .catch((err) => alert(err.message));
  };

  return (
    <Card className="w-3xl p-6">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-6">
          <Typograpghy tagVariant="h2" className="mb-1.5">
            Edit profile
          </Typograpghy>
          <Typograpghy tagVariant="p">Update your profile information and bio</Typograpghy>
        </div>
        <div className="mb-4 flex gap-4">
          <TextField
            label="First name"
            error={errors.firstname?.message}
            {...register('firstname')}
          />
          <TextField
            label="Second name"
            error={errors.secondname?.message}
            {...register('secondname')}
          />
        </div>
        <TextArea
          label="Bio"
          rows={5}
          className="mb-4"
          error={errors.bio?.message}
          {...register('bio')}
        />
        <Button as="button" type="submit" variant="primary" isLoading={isPending} fullWidth>
          Save changes
        </Button>
      </form>
    </Card>
  );
};
