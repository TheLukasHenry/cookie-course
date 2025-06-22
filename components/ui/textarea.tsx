import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-white/20 placeholder:text-white/50 focus-visible:border-blue-400/50 focus-visible:ring-blue-400/20 aria-invalid:ring-red-400/20 aria-invalid:border-red-400/50 bg-white/5 backdrop-blur-sm text-white flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow,background-color] outline-none focus-visible:ring-[3px] focus-visible:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
