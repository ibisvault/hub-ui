import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { type LucideIcon, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const iconVariants = cva("inline-flex items-center justify-center", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
      "2xl": "h-10 w-10",
    },
    variant: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      danger: "text-destructive",
      muted: "text-muted-foreground",
      accent: "text-leica-red",
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "default",
  },
});

export interface IconProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof iconVariants> {
  icon?: LucideIcon;
  clickable?: boolean;
}

const Icon = React.forwardRef<HTMLElement, IconProps>(
  ({ className, size, variant, icon, clickable, ...props }, ref) => {
    const IconComponent = icon || HelpCircle;

    return (
      <IconComponent
        className={cn(
          iconVariants({ size, variant }),
          clickable && "cursor-pointer hover:opacity-80 transition-opacity",
          className,
        )}
        ref={ref as React.Ref<SVGSVGElement>}
        {...props}
      />
    );
  },
);
Icon.displayName = "Icon";

export { Icon, iconVariants };
