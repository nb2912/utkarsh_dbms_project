import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="w-full max-w-2xl p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-6">
          Welcome to Our Project!
        </h1>
        <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8">
          This is a platform where buyers and sellers can connect. Buyers can explore a variety of products, and sellers can showcase their offerings to a wide audience. Join us to experience a seamless and efficient marketplace.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/login">
            <button className="w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-indigo-600 bg-white border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-zinc-700">
              Sign Up
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
