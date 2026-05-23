import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-butter-cream-100 text-center px-6">
      
      <h1 className="text-6xl font-bold text-deep-lavender-500">
        Oops!
      </h1>

      <p className="mt-4 text-xl text-soft-lavender-500">
        Something went wrong or page not found
      </p>

      <div className="mt-6 text-gray-600">
        {error?.statusText || error?.message}
      </div>

      <Link
        to="/"
        className="mt-8 px-6 py-3 rounded-lg bg-light-violet-400 text-white hover:bg-light-violet-500"
      >
        Go Home
      </Link>
    </div>
  );
}