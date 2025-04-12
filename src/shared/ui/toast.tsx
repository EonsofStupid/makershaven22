
import * as React from "react";

// Re-export the toast function from sonner
import { toast as sonnerToast } from "sonner";

export type ToastProps = {
  id?: string | number;
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactElement;
  closeButton?: boolean;
  className?: string;
  variant?: "default" | "destructive";
};

export type ToastActionElement = React.ReactElement<{
  onClick?: () => void;
  altText?: string;
}>;

export function toast(message: string, options: any = {}) {
  return sonnerToast(message, {
    ...options,
    className: "bg-black border border-white/10 text-white",
  });
}

// Export a hook for consuming our toast
export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
    error: (message: string, options?: any) => 
      sonnerToast.error(message, { ...options, className: "bg-red-950 border border-red-500/50 text-white" }),
    success: (message: string, options?: any) => 
      sonnerToast.success(message, { ...options, className: "bg-green-950 border border-green-500/50 text-white" }),
    warning: (message: string, options?: any) => 
      sonnerToast.warning(message, { ...options, className: "bg-yellow-950 border border-yellow-500/50 text-white" }),
    info: (message: string, options?: any) => 
      sonnerToast.info(message, { ...options, className: "bg-blue-950 border border-blue-500/50 text-white" }),
  };
}

export const Toast = ({ id, title, description, action, variant, className }: ToastProps) => {
  return (
    <div className={cn("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
      variant === "destructive" ? "destructive border-destructive bg-destructive text-destructive-foreground" : "border-border bg-background text-foreground",
      className
    )}>
      <div className="grid gap-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      {action}
    </div>
  );
};

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

export const ToastClose = ({ className, onClick }: { className?: string; onClick?: () => void }) => {
  return (
    <button className={cn("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100", className)} onClick={onClick}>
      <span className="sr-only">Close</span>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export const ToastDescription = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("text-sm opacity-90", className)} {...props} />;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const ToastTitle = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("text-sm font-semibold", className)} {...props} />;
};

export const ToastViewport = ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => {
  return (
    <ol 
      className={cn("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 gap-2 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className)}
      {...props}
    />
  );
};
