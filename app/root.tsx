import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useRouteLoaderData,
} from 'react-router';

import type { Route } from "./+types/root";
import "./app.css";
import { scrollRestorationCookie } from '~/cookies.server';
import { useEffect } from 'react';

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const cookie =
    (await scrollRestorationCookie.parse(request.headers.get("Cookie"))) ??
    "auto";
  const scrollRestorationParam =
    new URL(request.url).searchParams.get("scrollRestoration") ?? cookie;
  const scrollRestoration: typeof history.scrollRestoration =
    scrollRestorationParam === "auto" || scrollRestorationParam === "manual"
    ? scrollRestorationParam
    : "auto";
  return data(
    { scrollRestoration },
    {
      headers: {
        "Set-Cookie": await scrollRestorationCookie.serialize(
          scrollRestoration
        ),
      },
    }
  );
};

export function headers({ loaderHeaders }: Route.HeadersArgs) {
  return loaderHeaders;
}

let scrollRestoration: typeof history.scrollRestoration = "auto";

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
  useEffect(() => {
    const value = data?.scrollRestoration ?? scrollRestoration;
    history.scrollRestoration = value;
    scrollRestoration = value;
  }, [data?.scrollRestoration]);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <div className="ruler">100vh marker</div>
      <Outlet/>
    </>);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
