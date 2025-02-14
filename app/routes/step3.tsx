import { Link } from 'react-router';
import { useContext } from 'react';
import { useTransitionContext } from '~/transition-context';

export const loader = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {};
};

export default function Step2() {
  const context = useTransitionContext();

  const onForwardNavigation = () => {
    console.log("TEST", context);
    if (context === null) {
      return
    }
    context.setTransition('[view-transition-name:page-default-forward]');
  }

  return (
    <main>
      <ul className="p-2 gap-2 flex flex-col text-white">
        {Array.from({ length: 20 }).map((_, i) => (
          <li key={i} className="h-64 bg-gray-600 odd:bg-gray-500 rounded block">
            <Link className="size-full flex justify-center items-center text-7xl" viewTransition to="/step1" onClick={onForwardNavigation}>
              1
              <span className="text-lg text-gray-200">{i + 1}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
