"use client"
import StatsPanel from "@/app/(private)/dashboard/_components/StatsCard";
import RecentActivity from "@/app/(private)/dashboard/_components/RecentActivity";
import MimeTypeOverview from "@/app/(private)/dashboard/_components/MimitypeOverview";
import { useGoogleDriveStatus, useUserId } from "@/app/(private)/hooks/useAuthStatus";
import { GlassmorphicBackground } from "@/app/components/layout/GlassmorphicBackground";
import { FloatingIcons } from "@/app/components/decorative/FloatingIcons";

const Dashboard = () => {
  const {userId} = useUserId()
  const {accounts} = useGoogleDriveStatus();

  return (
    <GlassmorphicBackground>
      <FloatingIcons />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="flex flex-col gap-8 lg:gap-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatsPanel />
          </div>

          {/* Mime Type Overview */}
          <MimeTypeOverview userId={userId} accounts={accounts || []} />

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </div>
    </GlassmorphicBackground>
  );
};

export default Dashboard;
