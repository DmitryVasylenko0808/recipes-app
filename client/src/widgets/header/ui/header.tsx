import { useAuth, Logo, Typograpghy, Button } from '@/shared';
import { UserMenu } from './user-menu';
import { CreateRecipeButton } from '@/features/recipe/create';

export const Header = () => {
  const { currentUser } = useAuth();

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
              <div className="flex items-center gap-3">
                <CreateRecipeButton />
                <UserMenu user={currentUser} />
              </div>
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
