// src/lib/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Create token
export async function createToken(user: IUser): Promise<string> {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(new TextEncoder().encode(JWT_SECRET));

  return token;
}

// // Verify token
// export async function verifyToken(token: string) {
//   try {
//     const verified = await jwtVerify(
//       token,
//       new TextEncoder().encode(JWT_SECRET)
//     );
//     return verified.payload;
//   } catch (error) { 
//     throw new Error('Token verification failed');
//   }
// }

// Authentication middleware
export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return false;
  }

  try {
    await verifyToken(token);
    return true;
  } catch {
    return false;
  }
}

// Role-based access control
export async function hasRole(request: NextRequest, allowedRoles: string[]) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return false;
  }

  try {
    const payload = await verifyToken(token);
    return allowedRoles.includes(payload.role as string);
  } catch {
    return false;
  }
}

// Auth response helpers
export function unauthorizedResponse(message: string = 'Unauthorized') {
  return NextResponse.json({ message }, { status: 401 });
}

export function forbiddenResponse(message: string = 'Forbidden') {
  return NextResponse.json({ message }, { status: 403 });
}