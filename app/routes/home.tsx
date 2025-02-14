import type { Route } from "./+types/home";
import { Link, type LinkProps } from 'react-router';
import { useContext } from 'react';
import { TransitionContext } from '~/root';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router Scroll Restoration Test" },
    { name: "description", content: "Sample project to demonstrate the issues with scrollRestauration and Safari" },
  ];
}

const StyledLink = ({ children, ...props }: LinkProps) => {
  const context = useContext(TransitionContext);

  const onForwardNavigation = () => {
    if (context === null) {
      return
    }
    context('[view-transition-name:page-default-forward]');
  }

  return(
    <Link
      {...props}
      className="inline-block m-2 py-2 px-3 bg-blue-600 text-white rounded-lg"
      onClick={onForwardNavigation}
    >
      {children}
    </Link>
  )
}

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <ul>
        <li>
          <StyledLink viewTransition to="/step1">
            step1
          </StyledLink>
        </li>
        <li>
          <StyledLink viewTransition to="/step2">
            step2
          </StyledLink>
        </li>
        <li>
          <StyledLink viewTransition to="/step3">
            step3
          </StyledLink>
        </li>
      </ul>
      <div className="mt-4">
        Scroll Restoration:
      </div>
      <StyledLink to={{ search: 'scrollRestoration=manual' }}>
        Manual
      </StyledLink>
      <StyledLink to={{ search: 'scrollRestoration=auto' }}>
        Auto
      </StyledLink>
    </main>
  );
}
