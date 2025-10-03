'use client';

import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
  {
    variants: {
      state: {
        open: 'animate-in fade-in-from-[0%] slide-in-from-top-full zoom-in-from-[95%]',
        closed:
          'animate-out fade-out-to-[0%] slide-out-to-right-full zoom-out-to-[95%]',
      },
      swipe: {
        start: 'slide-out-to-left-full',
        end: 'slide-out-to-right-full translate-x-[var(--radix-toast-swipe-end-x)]',
        cancel: 'translate-x-0 transition-transform',
      },
      variant: {
        default: 'bg-background border-border',
        destructive: 'bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      state: 'open',
      variant: 'default',
    },
  },
);

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action> &
    VariantProps<typeof toastVariants>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-all hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

export { ToastAction, toastVariants };
