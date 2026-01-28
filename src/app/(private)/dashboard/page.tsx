"use client"
import { Cloud, Sparkles } from "lucide-react";
import StatsPanel from "@/app/(private)/dashboard/_components/StatsCard";
import RecentActivity from "@/app/(private)/dashboard/_components/RecentActivity";
import MimeTypeOverview from "@/app/(private)/dashboard/_components/MimitypeOverview";
import { useGoogleDriveStatus, useUserId } from "@/app/(private)/hooks/useAuthStatus";
import { PageHeader } from "@/app/components/ui/CloudBackground";

const Dashboard = () => {
  const {userId} = useUserId()
  const {accounts} = useGoogleDriveStatus();

  return (
    <div className="container max-w-7xl mx-auto">
      <div className="flex flex-col gap-8 md:gap-10">
        {/* Header Section */}
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's an overview of your connected drives and cloud storage."
        >
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-sm">
              <Cloud size={14} />
              <span>{accounts?.length || 0} Drives</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-sm">
              <Sparkles size={14} />
              <span>AI Ready</span>
            </div>
          </div>
        </PageHeader>

        {/* Stats Cards */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-semibold text-foreground">Overview</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatsPanel />
          </div>
        </section>

        {/* Mime Type Overview */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-semibold text-foreground">File Distribution</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <MimeTypeOverview userId={userId} accounts={accounts || []} />
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <RecentActivity />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
