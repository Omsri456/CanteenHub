
"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio@1.1.2";

function AspectRatio({ className = "", children, ...props }) {
  return (
    <AspectRatioPrimitive.Root
      data-slot="aspect-ratio"
      className={`overflow-hidden rounded-md ${className}`}
      {...props}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </AspectRatioPrimitive.Root>
  );
}

export { AspectRatio };

