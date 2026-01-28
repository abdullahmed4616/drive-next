"use client"
import StatsPanel from "@/app/(private)/dashboard/_components/StatsCard";
import RecentActivity from "@/app/(private)/dashboard/_components/RecentActivity";
import MimeTypeOverview from "@/app/(private)/dashboard/_components/MimitypeOverview";
import QuickActions from "@/app/(private)/dashboard/_components/QuickActions";
import { useGoogleDriveStatus, useUserId } from "@/app/(private)/hooks/useAuthStatus";

const PRIMARY_COLOR = '#6B9ADF';

const Dashboard = () => {
  const {userId} = useUserId()
  const {accounts} = useGoogleDriveStatus();

  return (
    <div className="container max-w-7xl py-6 md:py-8">
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Header */}
        <div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{
              background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5080C8 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your connected drives.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatsPanel />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Mime Type Overview */}
        <MimeTypeOverview userId={userId} accounts={accounts || []} />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;