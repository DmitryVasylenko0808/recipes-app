import { Button, pathKeys } from '@/shared';
import { SquarePen } from 'lucide-react';

type EditProfileButtonProps = { authorId: string };

export const EditProfileButton = ({ authorId }: EditProfileButtonProps) => (
  <Button as="link" icon={SquarePen} to={pathKeys.authors.byIdEdit(authorId)} variant="secondary">
    Edit profile
  </Button>
);
