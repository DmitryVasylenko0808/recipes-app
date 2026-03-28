import { CreateRecipeMenuItem } from '@/features/recipe/create';
import { LogOutMenuItem } from '@/features/sessions/log-out-user';
import {
  useToggleMenu,
  Menu,
  Button,
  AvatarFallback,
  MenuContent,
  MenuSection,
  MenuItem,
  MenuDivider,
  pathKeys,
  Avatar,
} from '@/shared';
import type { GetMeDto } from '@/shared/api';
import { UserRound } from 'lucide-react';
import { useNavigate } from 'react-router';

type UserMenuProps = { user: GetMeDto };

export const UserMenu = ({ user }: UserMenuProps) => {
  const { open, ref, handleToggle } = useToggleMenu();
  const navigate = useNavigate();

  const handleClickMyProfile = () => navigate(pathKeys.authors.byId(user.id));

  return (
    <Menu
      trigger={
        <Button as="button" variant="text" className="h-14" onClick={handleToggle}>
          {user.avatar ? (
            <Avatar size="sm" src={user.avatar} alt="User avatar" />
          ) : (
            <AvatarFallback firstname={user.firstname} secondname={user.secondname} />
          )}
          <span className="text-foreground text-sm font-semibold">
            {user.firstname} {user.secondname}
          </span>
        </Button>
      }
      content={
        <MenuContent ref={ref}>
          <MenuSection>
            <MenuItem icon={UserRound} onClick={handleClickMyProfile}>
              My profile
            </MenuItem>
            <CreateRecipeMenuItem />
          </MenuSection>
          <MenuDivider />
          <MenuSection>
            <LogOutMenuItem />
          </MenuSection>
        </MenuContent>
      }
      open={open}
    />
  );
};
