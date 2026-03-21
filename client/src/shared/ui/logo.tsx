import { Link, type LinkProps } from 'react-router';
import { Typograpghy } from './typography';
import { cn } from '../lib/utils/cn';

type LogoProps = Omit<LinkProps, 'to'>;

export const Logo = ({ className, ...linkProps }: LogoProps) => (
  <Link to={'/'} className={cn('inline-block', className)} {...linkProps}>
    <Typograpghy tagVariant="h1" className="text-3xl font-semibold">
      Recipes App
    </Typograpghy>
  </Link>
);
