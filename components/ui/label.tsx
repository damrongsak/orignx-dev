import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    {
        variants: {
            size: {
                sm: "text-xs",
                md: "text-sm",
                lg: "text-lg",
            },
            color: {
                default: "text-gray-900 dark:text-gray-100",
                primary: "text-blue-600 dark:text-blue-400",
                secondary: "text-gray-600 dark:text-gray-400",
            },
        },
        defaultVariants: {
            size: "md",
            color: "default",
        },
    }
);

export interface LabelProps
    extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "color">,
        VariantProps<typeof labelVariants> {}

const Label: React.FC<LabelProps> = ({ className, size, color, ...props }) => {
    return (
        <label
            className={cn(labelVariants({ size, color }), className)}
            {...props}
        />
    );
};

export { Label };