export default function SellerDashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="w-full max-w-2xl p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-6">
          Seller Dashboard
        </h1>
        <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8">
          Welcome, Seller! Manage your products and view your sales here.
        </p>
      </main>
    </div>
  );
}
