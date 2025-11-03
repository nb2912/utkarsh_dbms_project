'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('0');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        description,
        location,
      }),
    });

    if (response.ok) {
      router.push('/seller'); // Redirect to seller dashboard after adding product
    } else {
      const error = await response.json();
      alert(error.error || 'An error occurred');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-black dark:text-zinc-50 mb-6">
          Add Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              min="1"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Product
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}