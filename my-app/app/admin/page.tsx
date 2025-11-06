import prisma from '@/lib/db';
export const dynamic = 'force-dynamic';
import type { users, products, orders } from '@prisma/client';

export default async function AdminDashboard() {
  const allUsers = await prisma.users.findMany();
  const allProducts = await prisma.products.findMany({
    include: {
      users: { select: { name: true } },
    },
  });
  const allOrders = await prisma.orders.findMany({
    include: {
      users: { select: { name: true } },
      products: { select: { name: true } },
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="w-full max-w-4xl p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-8 text-center">
          Admin Dashboard
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">All Users</h2>
          <ul className="space-y-2">
            {allUsers.map((user) => (
              <li key={user.id} className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md">
                {user.name} ({user.email}) - {user.user_type}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">All Products</h2>
          <ul className="space-y-2">
            {allProducts.map((product) => (
              <li key={product.id} className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md">
                {product.name} by {product.users?.name || 'N/A'}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">All Orders</h2>
          <ul className="space-y-2">
            {allOrders.map((order) => (
              <li key={order.id} className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md">
                Order #{order.id}: {order.quantity} x {order.products?.name || 'N/A'} bought by {order.users?.name || 'N/A'}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}