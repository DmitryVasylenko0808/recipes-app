import { MenuItem } from '@/shared';
import { LogOut } from 'lucide-react';
import { useLogOut } from '../model/hooks/use-log-out';

export const LogOutMenuItem = () => {
  const logout = useLogOut();

  return (
    <MenuItem icon={LogOut} variant="desctructive" onClick={logout}>
      Log out
    </MenuItem>
  );
};
