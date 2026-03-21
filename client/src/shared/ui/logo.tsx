import { Link } from 'react-router';
import { Typograpghy } from './typography';

export const Logo = () => (
  <Link to={'/'} className="mb-6">
    <Typograpghy tagVariant="h1" className="text-3xl font-semibold">
      Recipes App
    </Typograpghy>
  </Link>
);
