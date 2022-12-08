import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // React.useEffect(() => {
  //   const resultUser = localStorage.getItem('persist:user');
  //   if (resultUser) setUser(JSON.parse(resultUser));
  // }, []);
  // console.log(user);
  //checks go here

  return NextResponse.redirect(new URL('/login', req.url));
}

// Supports both a single string value or an array of matchers
export const config = {
  //matcher: ['/about/:path*', '/dashboard/:path*'],
  matcher: ['/middleware'],
};
