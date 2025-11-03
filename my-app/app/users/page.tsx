import prisma from '@/lib/db';
import type { users_user_type } from '@prisma/client';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  user_type: users_user_type;
  password: string;
};

export default async function UsersPage() {
  const users: User[] = await prisma.users.findMany();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="w-full max-w-2xl p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-6 text-center">
          All Users
        </h1>
        {
          users.length === 0 ? (
            <p className="text-center text-zinc-700 dark:text-zinc-300">No users found.</p>
          ) : (
            <ul className="space-y-4">
              {users.map((user: User) => (
                <li
                  key={user.id}
                  className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md shadow-sm"
                >
                  <p className="text-lg font-semibold text-black dark:text-zinc-50">
                    {user.name} ({user.user_type})
                  </p>
                  <p className="text-zinc-700 dark:text-zinc-300">Email: {user.email}</p>
                  <p className="text-zinc-700 dark:text-zinc-300">Phone: {user.phone}</p>
                  <p className="text-zinc-700 dark:text-zinc-300">Address: {user.address}</p>
                </li>
              ))}
            </ul>
          )
        }
      </main>
    </div>
  );
}