import React, { useEffect, useCallback } from 'react';

/**
 * AlertDialog Component
 * A custom implementation of an alert dialog, designed to be compatible with Tailwind CSS
 * and mimic the behavior of shadcn/ui AlertDialog.
 *
 * It includes:
 * - A backdrop/overlay that covers the screen.
 * - The ability to close the dialog by clicking the backdrop or pressing the ESC key.
 * - Proper ARIA roles for accessibility.
 * - Basic styling using Tailwind CSS classes.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the dialog.
 * @param {boolean} props.open - Controls the visibility of the dialog.
 * @param {(open: boolean) => void} props.onOpenChange - Callback function triggered when the dialog's open state changes.
 */
export const AlertDialog = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  // Memoize the onClose function to prevent unnecessary re-renders in useEffect
  const onClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    // Handle ESC key press to close the dialog
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when the dialog is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when the dialog is closed
      document.body.style.overflow = '';
    }

    // Clean up event listener and body style when component unmounts or `open` changes
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // Ensure overflow is reset
    };
  }, [open, onClose]);

  if (!open) return null; // Only render the dialog if `open` is true

  return (
    // Overlay/Backdrop for the dialog
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in-0"
      onClick={onClose} // Close dialog when clicking on the backdrop
    >
      {/* Dialog Content Wrapper - stop propagation to prevent closing when clicking content */}
      <div
        className="relative z-50 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg duration-200 animate-in data-[state=open]:slide-in-from-bottom-5 data-[state=closed]:slide-out-to-bottom-5"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog content
      >
        {children}
      </div>
    </div>
  );
};

/**
 * AlertDialogContent Component
 * Renders the main content area of the alert dialog.
 */
export const AlertDialogContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex flex-col space-y-4">{children}</div>;
};

/**
 * AlertDialogHeader Component
 * Renders the header section of the alert dialog, typically containing the title and description.
 */
export const AlertDialogHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col space-y-2 text-center sm:text-left">
      {children}
    </div>
  );
};

/**
 * AlertDialogTitle Component
 * Renders the title of the alert dialog.
 */
export const AlertDialogTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <h2 className="text-lg font-semibold text-foreground">{children}</h2>;
};

/**
 * AlertDialogDescription Component
 * Renders the description or detailed message of the alert dialog.
 */
export const AlertDialogDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};

/**
 * AlertDialogFooter Component
 * Renders the footer section of the alert dialog, typically containing action buttons.
 */
export const AlertDialogFooter = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
      {children}
    </div>
  );
};

/**
 * AlertDialogAction Component
 * Renders a button for an action within the alert dialog footer.
 * Assumes it's a primary action.
 */
export const AlertDialogAction = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
