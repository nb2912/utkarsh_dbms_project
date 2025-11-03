'use client';

import { useRouter } from 'next/navigation';

export default function BuyButton({ productId }: { productId: number }) {
  const router = useRouter();

  const handleBuy = async () => {
    const response = await fetch('/api/orders/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity: 1 }), // Assuming quantity of 1 for now
    });

    if (response.ok) {
      alert('Product purchased successfully!');
      router.refresh(); // Refresh the page to show updated data
    } else {
      const error = await response.json();
      alert(error.error || 'An error occurred');
    }
  };

  return (
    <button
      onClick={handleBuy}
      className="mt-2 w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      Buy
    </button>
  );
}
