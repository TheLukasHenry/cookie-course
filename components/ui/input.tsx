import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-white placeholder:text-white/50 selection:bg-blue-500/30 selection:text-white bg-white/5 border-white/20 text-white flex h-9 w-full min-w-0 rounded-md border backdrop-blur-sm px-3 py-1 text-base shadow-xs transition-[color,box-shadow,background-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-blue-400/50 focus-visible:ring-blue-400/20 focus-visible:ring-[3px] focus-visible:bg-white/10",
        "aria-invalid:ring-red-400/20 aria-invalid:border-red-400/50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
