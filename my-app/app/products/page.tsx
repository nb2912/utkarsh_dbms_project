import prisma from '@/lib/db';
import type { products, users } from '@prisma/client';

// We can define a more specific type for the product with the seller's name
type ProductWithSeller = products & {
  users: {
    name: string | null;
  } | null;
};

export default async function ProductsPage() {
  const products: ProductWithSeller[] = await prisma.products.findMany({
    include: {
      users: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="w-full max-w-2xl p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-6 text-center">
          All Products
        </h1>
        {
          products.length === 0 ? (
            <p className="text-center text-zinc-700 dark:text-zinc-300">No products found.</p>
          ) : (
            <ul className="space-y-4">
              {products.map((product: ProductWithSeller) => (
                <li
                  key={product.id}
                  className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md shadow-sm"
                >
                  <p className="text-lg font-semibold text-black dark:text-zinc-50">
                    {product.name} - ${product.price.toString()}
                  </p>
                  <p className="text-zinc-700 dark:text-zinc-300">Quantity: {product.quantity}</p>
                  <p className="text-zinc-700 dark:text-zinc-300">Description: {product.description}</p>
                  <p className="text-zinc-700 dark:text-zinc-300">Location: {product.location}</p>
                  <p className="text-zinc-700 dark:text-zinc-300">Seller: {product.users?.name || 'N/A'}</p>
                </li>
              ))}
            </ul>
          )
        }
      </main>
    </div>
  );
}
