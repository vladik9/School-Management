'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/controllers/auth';

/**
 * A Next.js component that wraps a page component and ensures that the user
 * is logged in before rendering the page.
 *
 * If the user is not logged in, the component redirects them to the login page.
 *
 * @param children A React component to render if the user is logged in.
 */
export default function ProtectedRoute({ children }: { children: React.ReactNode; }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!checkAuth()) {
      router.push('/');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
