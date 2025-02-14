import type { Route } from "./+types/home";
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router Scroll Restoration Test" },
    { name: "description", content: "Sample project to demonstrate the issues with scrollRestauration and Safari" },
  ];
}

export default function Home() {
  return (
    <main>
      <ul>
        <li>
          <Link viewTransition to="/step1">
            step1
          </Link>
        </li>
        <li>
          <Link viewTransition to="/step2">
            step2
          </Link>
        </li>
        <li>
          <Link viewTransition to="/step3">
            step3
          </Link>
        </li>
      </ul>
      <Link
        className="inline-block m-2 py-2 px-3 bg-blue-600 text-white rounded-lg"
        to={{ search: 'scrollRestoration=manual' }}
      >
        Manual
      </Link>
      <Link
        className="inline-block m-2 py-2 px-3 bg-blue-600 text-white rounded-lg"
        to={{ search: 'scrollRestoration=auto' }}
      >
        Auto
      </Link>
    </main>
  );
}
