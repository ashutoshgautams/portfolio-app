// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Clear the token cookie
  (await
        // Clear the token cookie
        cookies()).delete('token');
  
  return NextResponse.json({
    message: 'Logout successful',
  });
}