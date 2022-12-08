import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { store } from 'store';

export function middleware(req: NextRequest) {
  const { user } = store.getState();
  console.log(user);
  //checks go here
  if (user) {
    return NextResponse.next();
  }
  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Supports both a single string value or an array of matchers
export const config = {
  //matcher: ['/about/:path*', '/dashboard/:path*'],
  matcher: ['/', '/profile/:id*'],
};
