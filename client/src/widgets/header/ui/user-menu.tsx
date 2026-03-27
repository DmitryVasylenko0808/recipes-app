import { CreateRecipeMenuItem } from '@/features/recipe/create';
import {
  useToggleMenu,
  useLogOut,
  Menu,
  Button,
  AvatarFallback,
  MenuContent,
  MenuSection,
  MenuItem,
  MenuDivider,
  pathKeys,
} from '@/shared';
import type { GetMeDto } from '@/shared/api';
import { LogOut, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router';

type UserMenuProps = { user: GetMeDto };

export const UserMenu = ({ user }: UserMenuProps) => {
  const { open, ref, handleToggle } = useToggleMenu();
  const logout = useLogOut();
  const navigate = useNavigate();

  const handleClickMyProfile = () => navigate(pathKeys.authors.byId(user.id));

  return (
    <Menu
      trigger={
        <Button as="button" variant="text" className="h-14" onClick={handleToggle}>
          {user.avatar ? (
            <img className="h-10 w-10 rounded-full" src={user.avatar} alt="User avatar" />
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
            <MenuItem icon={LogOut} variant="desctructive" onClick={logout}>
              Log out
            </MenuItem>
          </MenuSection>
        </MenuContent>
      }
      open={open}
    />
  );
};
