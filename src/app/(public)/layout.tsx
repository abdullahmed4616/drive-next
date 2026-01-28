import PublicNavbar from '@/app/components/layout/PublicNavbar';
import { Footer } from '@/app/components/layout/Footers';

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
      <Footer />
    </>
  );
}
