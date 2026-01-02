import { Container } from '@mantine/core';
import PublicNavbar from '@/app/components/layout/PublicNavbar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}