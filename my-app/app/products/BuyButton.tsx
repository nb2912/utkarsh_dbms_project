 'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function BuyButton({ productId, availableQuantity }: { productId: number; availableQuantity: number; }) {
  const router = useRouter();
  const [qty, setQty] = React.useState<number>(availableQuantity > 0 ? 1 : 0);
  const [loading, setLoading] = React.useState(false);

  const handleBuy = async () => {
    if (qty <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    if (qty > availableQuantity) {
      alert('Requested quantity exceeds available stock');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/orders/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: qty }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Product purchased successfully!');
        router.refresh();
      } else {
        alert(data.error || 'An error occurred');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while placing the order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 flex items-center gap-2">
      <input
        type="number"
        min={0}
        max={availableQuantity}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="w-20 p-1 rounded border"
      />
      <button
        onClick={handleBuy}
        disabled={availableQuantity <= 0 || loading}
        className={`py-2 px-4 rounded-md text-sm font-medium text-white ${availableQuantity > 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        {loading ? 'Processing...' : (availableQuantity > 0 ? 'Buy' : 'Out of stock')}
      </button>
    </div>
  );
}
