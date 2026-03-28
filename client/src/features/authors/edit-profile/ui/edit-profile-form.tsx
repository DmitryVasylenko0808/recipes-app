import { ProfileAvatarPreview, type Author } from '@/entities/authors';
import { Button, Card, FileUploader, TextArea, TextField, Typograpghy } from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { editProfileSchema, type EditProfileFormFields } from '../model/validations';
import { useEditProfile } from '../model/hooks/use-edit-profile';

type EditProfileFormProps = { author: Author; onSubmit?: (author?: Author) => void };

export const EditProfileForm = ({ author, onSubmit }: EditProfileFormProps) => {
  const {
    handleSubmit,
    register,
    watch,
    control,
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

  const avatar = watch('avatar');

  return (
    <Card className="w-3xl p-6">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-6">
          <Typograpghy tagVariant="h2" className="mb-1.5">
            Edit profile
          </Typograpghy>
          <Typograpghy tagVariant="p">Update your profile information and bio</Typograpghy>
        </div>

        <ProfileAvatarPreview initialImageSrc={author.avatar} image={avatar} />

        <div className="mb-4 flex gap-4">
          <TextField
            label="First name"
            className="flex-1"
            error={errors.firstname?.message}
            {...register('firstname')}
          />
          <TextField
            label="Second name"
            className="flex-1"
            error={errors.secondname?.message}
            {...register('secondname')}
          />
        </div>
        <Controller
          name="avatar"
          control={control}
          render={({ field, fieldState }) => (
            <FileUploader
              label="Avatar"
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              onChange={(e) => field.onChange(e.target.files?.[0])}
              error={fieldState.error?.message}
              caption="Only supports image formats (.jpg, .jpeg, .png)"
              accept="image/*"
              className="mb-4"
            />
          )}
        />
        <TextArea
          label="Bio"
          rows={5}
          className="mb-4"
          error={errors.bio?.message}
          {...register('bio')}
        />
        <Button
          as="button"
          type="submit"
          variant="primary"
          disabled={isPending}
          isLoading={isPending}
          fullWidth
        >
          Save changes
        </Button>
      </form>
    </Card>
  );
};
