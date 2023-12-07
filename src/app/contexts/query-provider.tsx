"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ReactQueryProvider({
  children,
}: React.PropsWithChildren) {
  const qc = new QueryClient();

  return (
    <QueryClientProvider client={qc}>
      <ReactQueryDevtools initialIsOpen buttonPosition="bottom-left" />
      {children}
    </QueryClientProvider>
  );
}
