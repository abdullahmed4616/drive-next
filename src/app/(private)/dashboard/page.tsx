"use client"
import StatsPanel from "@/app/(private)/dashboard/_components/StatsCard";
import RecentActivity from "@/app/(private)/dashboard/_components/RecentActivity";
import MimeTypeOverview from "@/app/(private)/dashboard/_components/MimitypeOverview";
import { useGoogleDriveStatus, useUserId } from "@/app/(private)/hooks/useAuthStatus";

const Dashboard = () => {
  const {userId} = useUserId()
  const {accounts} = useGoogleDriveStatus();

  return (
    <div className="container max-w-7xl py-6 md:py-8">
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatsPanel />
        </div>

        <MimeTypeOverview userId={userId} accounts={accounts || []} />

        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;