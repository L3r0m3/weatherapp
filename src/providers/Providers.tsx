"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "../context/SearchContext";

type TProviderType = {
  children: React.ReactNode;
};

export const Providers = ({ children }: TProviderType) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>{children}</SearchProvider>
    </QueryClientProvider>
  );
};
