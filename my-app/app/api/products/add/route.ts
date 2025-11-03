import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, quantity, price, description, location } = await req.json();

    // For now, we'll assume a logged-in seller with a hardcoded ID.
    // In a real application, you would get the sellerId from the session or token.
    const sellerId = 1; // Replace with actual sellerId from authentication

    const product = await prisma.products.create({
      data: {
        name,
        quantity,
        price,
        description,
        location,
        sellerId,
      },
    });

    return NextResponse.json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
