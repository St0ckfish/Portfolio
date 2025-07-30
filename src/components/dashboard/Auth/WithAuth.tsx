'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getAuthToken } from './auth';
import Spinner from '@/components/Spinner';

interface WithAuthProps {
  children: React.ReactNode;
  excludePaths?: string[];
}

export default function WithAuth({ children, excludePaths = ['/admin/login', '/admin/signup'] }: WithAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkAuth = () => {
      const token = getAuthToken();
      
      if (excludePaths.includes(pathname)) {
        if (token) {
          router.push('/admin');
        } else {
          setIsAuthorized(true);
        }
      } else {
        if (!token) {
          router.push('/admin/login');
        } else {
          setIsAuthorized(true);
        }
      }
    };

    checkAuth();
  }, [router, excludePaths, pathname]);

  // Don't render anything until mounted (client-side)
  if (!mounted) {
    return null;
  }

  // Show loading spinner while checking authorization
  if (isAuthorized === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Only render children if authorized
  return isAuthorized ? <>{children}</> : null;
}