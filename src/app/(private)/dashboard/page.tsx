"use client"
import { Cloud, Sparkles, Search, Command } from "lucide-react";
import StatsPanel from "@/app/(private)/dashboard/_components/StatsCard";
import RecentActivity from "@/app/(private)/dashboard/_components/RecentActivity";
import MimeTypeOverview from "@/app/(private)/dashboard/_components/MimitypeOverview";
import { useGoogleDriveStatus, useUserId } from "@/app/(private)/hooks/useAuthStatus";
import { PageHeader } from "@/app/components/ui/CloudBackground";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const {userId} = useUserId()
  const {accounts} = useGoogleDriveStatus();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto">
      <div className="flex flex-col gap-8 md:gap-10">
        {/* Header Section */}
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's an overview of your connected drives and cloud storage."
        >
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-sm">
              <Cloud size={14} />
              <span>{accounts?.length || 0} Drives</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-sm">
              <Sparkles size={14} />
              <span>AI Ready</span>
            </div>
          </div>
        </PageHeader>

        {/* AI Search Bar */}
        <section>
          <form onSubmit={handleSearch} className="relative">
            <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/20 focus-within:border-primary/30 focus-within:shadow-glow transition-all duration-300">
              <div className="flex items-center px-5 py-3.5">
                <Sparkles size={18} className="mr-3 text-primary/50" />
                <input
                  type="text"
                  placeholder="Search across all your drives with AI..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground text-xs border border-border rounded-lg px-2 py-1">
                  <Command size={12} />
                  <span>K</span>
                </div>
              </div>
            </div>
          </form>
        </section>

        {/* Stats Cards */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-semibold text-foreground">Overview</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
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
