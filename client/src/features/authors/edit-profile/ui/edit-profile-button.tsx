import { Button, pathKeys } from '@/shared';

type EditProfileButtonProps = { authorId: string };

export const EditProfileButton = ({ authorId }: EditProfileButtonProps) => (
  <Button as="link" to={pathKeys.authors.byIdEdit(authorId)} variant="secondary">
    Edit profile
  </Button>
);
