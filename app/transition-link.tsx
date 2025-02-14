import { Link, type LinkProps, useNavigate } from 'react-router';
import { useTransitionContext } from '~/transition-context';
import type { MouseEvent } from 'react';

export const TransitionLink = ({ children, onClick, to, viewTransition, ...props }: LinkProps) => {
  const context = useTransitionContext();
  const navigate = useNavigate();

  const onForwardNavigation = (e: MouseEvent<HTMLAnchorElement>) => {
    if (context === null || !Boolean(document.startViewTransition) || !viewTransition) {
      return;
    }
    context.setTransition('[view-transition-name:page-default-forward]');
    document.startViewTransition(() => navigate(to));
  };

  return (
    <Link
      {...props}
      to={to}
      onClick={onForwardNavigation}
    >
      {children}
    </Link>);
};
