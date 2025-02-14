import { Link } from 'react-router';
import { useContext } from 'react';
import { TransitionContext } from '~/root';

export const loader = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {};
};

export default function Step2() {
  const context = useContext(TransitionContext);

  const onForwardNavigation = () => {
    if (context === null) {
      return
    }
    context('[view-transition-name:page-default-forward]');
  }

  return (
    <main>
      <ul className="p-2 gap-2 flex flex-col text-white">
        {Array.from({ length: 20 }).map((_, i) => (
          <li key={i} className="h-64 bg-gray-600 odd:bg-gray-500 rounded block">
            <Link className="size-full flex justify-center items-center text-7xl" viewTransition to="/step3" onClick={onForwardNavigation}>
              3
              <span className="text-lg text-gray-200">{i + 1}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
