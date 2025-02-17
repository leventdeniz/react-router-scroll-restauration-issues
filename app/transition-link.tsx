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
    context.setTransition('page-default-forward');
  };

  return (
    <Link
      to={to}
      {...props}
      onClick={onForwardNavigation}
      viewTransition={viewTransition}
    >
      {children}
    </Link>);
};
