import { PrismaClient } from '@prisma/client';

// Helpful runtime validation for the environment variable so Vercel logs show
// a clear message when DATABASE_URL is missing or malformed.
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
	// Keep the log message non-sensitive (don't print the URL).
	// This will make the runtime error explicit in Vercel logs.
	console.error(
		'Missing DATABASE_URL environment variable. Set DATABASE_URL in your deployment (format: mysql://USER:PASS@HOST:PORT/DB_NAME)'
	);
	throw new Error('Missing DATABASE_URL environment variable');
}

if (!dbUrl.startsWith('mysql://')) {
	console.error('Invalid DATABASE_URL protocol. It must start with "mysql://"');
	throw new Error('Invalid DATABASE_URL protocol');
}

const prisma = new PrismaClient();

export default prisma;