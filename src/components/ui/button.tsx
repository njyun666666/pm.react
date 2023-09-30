import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/lib/utils';
import { Check, Loader2, X } from 'lucide-react';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors ',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonStateType = 'loading' | 'success' | 'error' | undefined;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  state?: ButtonStateType;
  setState?: React.Dispatch<React.SetStateAction<ButtonStateType>>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled, className, variant, size, state, setState, children, ...props }, ref) => {
    React.useEffect(() => {
      if (state && setState && ['success', 'error'].includes(state)) {
        setTimeout(() => {
          setState(undefined);
        }, 2000);
      }
    }, [state]);

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || !!state}
        {...props}
      >
        <>
          {!state && children}
          {state === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
          {state === 'success' && <Check className="h-4 w-4" />}
          {state === 'error' && <X className="h-4 w-4" />}
        </>
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
