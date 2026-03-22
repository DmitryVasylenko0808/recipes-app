import { Button } from '@/shared';

type EditProfileButtonProps = { authorId: string };

export const EditProfileButton = ({ authorId }: EditProfileButtonProps) => (
  <Button as="link" to={`/authors/${authorId}/edit`} variant="secondary">
    Edit profile
  </Button>
);
