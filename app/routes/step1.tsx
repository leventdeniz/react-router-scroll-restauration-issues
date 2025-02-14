import { Link } from 'react-router';

export const loader = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {};
};

export default function Step1() {
  return (
    <main>
      <ul className="p-2 gap-2 flex flex-col">
        {Array.from({ length: 30 }).map((_, i) => (
          <li key={i} className="h-64 bg-gray-400 odd:bg-gray-300 rounded block">
            <Link className="size-full flex justify-center items-center text-7xl" viewTransition to="/step2">
              2
              <span className="text-lg text-gray-500">{i + 1}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
