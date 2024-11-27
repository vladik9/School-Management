'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/utils/auth';

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
