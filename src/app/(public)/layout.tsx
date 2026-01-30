import PublicNavbar from '@/app/components/layout/PublicNavbar';
import { Footer } from '@/app/components/layout/Footers';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark">
      <PublicNavbar />
      <main className="min-h-screen bg-background text-foreground pt-4 pb-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
