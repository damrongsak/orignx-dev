import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    animated?: boolean; // Optional prop for animation (not used now)
}

const Separator: React.FC<SeparatorProps> = ({ className, ...props }) => {
    return (
        <div
            className={cn(
                'w-full h-[1px] bg-neutral-200 dark:bg-neutral-700 transition-all',
                className
            )}
            {...props}
        />
    );
};

export { Separator };
