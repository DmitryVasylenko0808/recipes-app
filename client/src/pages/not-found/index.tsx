import { Typograpghy } from '@/shared';
import { useLocation } from 'react-router';

const NotFoundPage = () => {
  const { state } = useLocation();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-foreground text-7xl">404</div>
      {state?.errorMessage && (
        <Typograpghy tagVariant="span" className="mt-6 text-xl">
          {state?.errorMessage}
        </Typograpghy>
      )}
    </div>
  );
};
export default NotFoundPage;
