import { Button } from '@/shared';
import { useLogOut } from '@/shared/lib/hooks/use-log-out';

export const MainPage = () => {
  const logout = useLogOut();

  return (
    <Button variant="secondary" onClick={logout}>
      Logout
    </Button>
  );
};
