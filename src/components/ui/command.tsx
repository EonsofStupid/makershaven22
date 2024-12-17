import * as React from "react"
import { DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface CommandProps extends React.ComponentProps<typeof CommandPrimitive> {
  className?: string;
}

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, ...props }, ref) => {
    return (
      <CommandPrimitive
        ref={ref}
        className={cn("relative z-50", className)}
        {...props}
      />
    )
  }
)

Command.displayName = "Command"

export { Command }
