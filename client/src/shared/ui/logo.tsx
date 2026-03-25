import { Link, type LinkProps } from 'react-router';
import { Typograpghy } from './typography';
import { cn } from '../lib/utils/cn';
import { pathKeys } from '../router';

type LogoProps = Omit<LinkProps, 'to'>;

export const Logo = ({ className, ...linkProps }: LogoProps) => (
  <Link to={pathKeys.main} className={cn('inline-block', className)} {...linkProps}>
    <Typograpghy tagVariant="h1" className="text-3xl font-semibold">
      Recipes App
    </Typograpghy>
  </Link>
);
