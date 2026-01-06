import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { Content } from '@/app/(private)/files/content';
import { GlassmorphicBackground } from '@/app/components/layout/GlassmorphicBackground';
import { FloatingIcons } from '@/app/components/decorative/FloatingIcons';

export default async function FilesPage() {
  const session = await getSession();

  if (!session) {
    redirect('/auth');
  }

  return (
    <GlassmorphicBackground>
      <FloatingIcons />
      <Content userId={session.id} />
    </GlassmorphicBackground>
  );
}
