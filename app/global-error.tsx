"use client"; //Error boundary must be a client component

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
    // Send error to monitoring service here
  }, [error]);

  return (
    //global-error must return a valid HTML element
    <html>
      <body>
        <h2>Something went terribly wrong!</h2>
        <button onClick={() => reset()}>Try Again</button>
      </body>
    </html>
  );
}
