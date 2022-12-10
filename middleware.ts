import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isInBeta = req.cookies.get('user');
  if (!isInBeta) {
    return NextResponse.next();
  }
  // console.log(user);
  //checks go here

  return NextResponse.redirect(new URL('/login', req.url));
}

// Supports both a single string value or an array of matchers
export const config = {
  //matcher: ['/about/:path*', '/dashboard/:path*'],
  matcher: ['/login', '/middleware'],
};
