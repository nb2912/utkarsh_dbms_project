import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { productId, quantity } = await req.json();

    // For now, we'll assume a logged-in buyer with a hardcoded ID.
    // In a real application, you would get the buyerId from the session or token.
    const buyerId = 2; // Make sure a user with this ID and user_type 'buyer' exists.

    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (product.quantity < quantity) {
      return NextResponse.json({ error: 'Not enough stock' }, { status: 400 });
    }

    const [order, updatedProduct] = await prisma.$transaction([
      prisma.orders.create({
        data: {
          buyerId,
          productId,
          quantity,
        },
      }),
      prisma.products.update({
        where: { id: productId },
        data: { quantity: product.quantity - quantity },
      }),
    ]);

    return NextResponse.json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
