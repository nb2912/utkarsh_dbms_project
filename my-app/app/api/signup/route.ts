import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { name, email, phone, address, userType, password } = await req.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database using Prisma
    const user = await prisma.users.create({
      data: {
        name,
        email,
        phone,
        address,
        user_type: userType,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}