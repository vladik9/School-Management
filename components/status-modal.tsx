'use client';

import { useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusModalVariants = cva(
  "fixed top-4 right-4 p-4 rounded-md shadow-md transition-all duration-300 ease-in-out z-50",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900",
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        loading: "bg-blue-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatusModalProps extends VariantProps<typeof statusModalVariants> {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function StatusModal({ message, isVisible, variant, onClose }: StatusModalProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={cn(statusModalVariants({ variant }))}>
      <div className="flex items-center">
        {variant === 'success' && <CheckCircle className="w-5 h-5 mr-2" />}
        {variant === 'error' && <XCircle className="w-5 h-5 mr-2" />}
        {variant === 'loading' && <AlertCircle className="w-5 h-5 mr-2" />}
        <span>{message}</span>
      </div>
    </div>
  );
}
