import ConnectionsContent from '@/app/(private)/connections/content';
import { GlassmorphicBackground } from '@/app/components/layout/GlassmorphicBackground';
import { FloatingIcons } from '@/app/components/decorative/FloatingIcons';

export default function Page() {
  return (
    <GlassmorphicBackground>
      <FloatingIcons />
      <ConnectionsContent />
    </GlassmorphicBackground>
  );
}
