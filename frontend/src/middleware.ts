import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Kullanıcının gitmek istediği URL
  const { pathname } = request.nextUrl;

  // Sadece /admin ile başlayan rotaları kontrol et
  if (pathname.startsWith('/admin')) {
    // Tarayıcıdaki çerezlerden token'ı okumaya çalış
    const token = request.cookies.get('jwt_token')?.value;

    // Eğer /admin/login sayfasına gidiyorsa ve token VARSA, onu doğrudan dashboard'a at
    if (pathname === '/admin/login') {
      if (token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      // Token yoksa login sayfasını görmesine izin ver
      return NextResponse.next();
    }

    // Login sayfasında DEĞİLSE ve token YOKSA, login'e postala
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Middleware'in sadece hangi rotalarda tetikleneceğini belirliyoruz (Performans için önemli)
export const config = {
  matcher: ['/admin/:path*'],
};
