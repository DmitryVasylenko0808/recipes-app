import {
  useAuth,
  Logo,
  Typograpghy,
  Button,
  useLogOut,
  Menu,
  MenuContent,
  MenuDivider,
  MenuItem,
  MenuSection,
  useToggleMenu,
} from '@/shared';

export const Header = () => {
  const logout = useLogOut();
  const { currentUser } = useAuth();

  const { open, ref, handleToggle } = useToggleMenu();

  return (
    <header className="bg-card border-ring/30 border">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <Logo />
            <Typograpghy tagVariant="p" className="mt-1">
              Discover delicious recipes for every occasion
            </Typograpghy>
          </div>
          <div>
            {currentUser ? (
              <Menu
                trigger={<div onClick={handleToggle}>Data</div>}
                content={
                  <MenuContent ref={ref}>
                    <MenuSection>
                      <MenuItem>My profile</MenuItem>
                      <MenuItem>Create recipe</MenuItem>
                    </MenuSection>
                    <MenuDivider />
                    <MenuSection>
                      <MenuItem variant="desctructive">Log out</MenuItem>
                    </MenuSection>
                  </MenuContent>
                }
                open={open}
              />
            ) : (
              <Button as="link" to={'/auth/sign-in'} variant="primary">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
