'use client'
// Create a new file for your client component, e.g., ClientComponent.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function ClientComponent({ children }: { children: React.ReactNode; }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}