"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Cloud, AlertCircle, Sparkles, LayoutGrid, List, Crown } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { ConnectedDriveCard } from "./_components/ConnectedDriveCard";
import { ConnectedDrivesList } from "./_components/ConnectedDriveList";
import { useConnectedDrives, useDeleteDrive } from "./hooks/useConnectedDrives";
import { useConnectDriveAdvanced } from "./hooks/useConnectDrive";
import { useSyncDrive } from "./hooks/useSyncDrive";
import { PageHeader, CloudEmptyState } from "@/app/components/ui/CloudBackground";

export default function ConnectionsContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [syncingDriveId, setSyncingDriveId] = useState<string | null>(null);

  const { data, isLoading, mutate: refetchDrives } = useConnectedDrives();
  const { deleteDrive, isDeleting } = useDeleteDrive();
  const connectDrive = useConnectDriveAdvanced();
  const { mutate: syncDriveMutation, isLoading: isSyncing } = useSyncDrive();

  useEffect(() => {
    connectDrive.checkConnectionStatus();
  }, [data]);

  const handleDelete = async (driveId: string) => {
    await deleteDrive({ driveId });
  };

  const handleSync = async (driveId: string) => {
    setSyncingDriveId(driveId);
    try {
      await syncDriveMutation({ driveId });
    } finally {
      setSyncingDriveId(null);
    }
  };

  const handleConnect = async () => {
    await connectDrive.connect();
  };

  const getTierBadgeVariant = (tier: string) => {
    switch (tier) {
      case "PRO":
        return "default";
      case "BASE":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="container max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <PageHeader
          title="Connected Drives"
          description="Manage your Google Drive connections and sync settings"
        >
          <div className="flex items-center gap-3 mt-4">
            {data?.subscription && (
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30 px-3 py-1"
              >
                <Crown className="mr-1.5" size={12} />
                {data.subscription.packageName}
              </Badge>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              {viewMode === "grid" ? (
                <>
                  <List className="mr-2" size={16} />
                  List View
                </>
              ) : (
                <>
                  <LayoutGrid className="mr-2" size={16} />
                  Grid View
                </>
              )}
            </Button>
          </div>
        </PageHeader>

        {/* Usage Stats Card */}
        {data?.subscription && (
          <Card className="border border-border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Drive Usage
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">
                      {data.totalCount}
                    </span>
                    <span className="text-xl font-medium text-muted-foreground">
                      / {data.subscription.maxConnectedDrives}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      drives connected
                    </span>
                  </div>
                </div>

                {!data.subscription.canAddMore && (
                  <Button asChild className="bg-warning text-warning-foreground hover:bg-warning/90">
                    <Link href="/settings/paddlePayment">
                      <Sparkles className="mr-2" size={16} />
                      Upgrade Plan
                    </Link>
                  </Button>
                )}
              </div>

              <div className="mt-6">
                <Progress
                  value={(data.totalCount / data.subscription.maxConnectedDrives) * 100}
                  className="h-2"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {data.subscription.remainingSlots}{" "}
                    {data.subscription.remainingSlots === 1 ? "slot" : "slots"} remaining
                  </span>
                  {!data.subscription.canAddMore && (
                    <span className="text-xs text-destructive font-medium">
                      Limit reached
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Limit Alert */}
        {data?.subscription && !data.subscription.canAddMore && (
          <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Limit Reached</AlertTitle>
            <AlertDescription className="mt-2">
              <p className="text-sm mb-3">
                You've reached the maximum of {data.subscription.maxConnectedDrives} connected{" "}
                {data.subscription.maxConnectedDrives === 1 ? "drive" : "drives"} for your{" "}
                {data.subscription.packageName} plan. Upgrade to connect more drives.
              </p>
              <Button asChild size="sm" className="bg-warning text-warning-foreground hover:bg-warning/90">
                <Link href="/settings/paddlePayment">
                  <Sparkles className="mr-2" size={14} />
                  Upgrade Plan
                </Link>
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Connect New Drive Card */}
        <Card className="border-2 border-dashed border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-colors">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Cloud size={28} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-lg">
                    Connect New Google Drive
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add another Google Drive account to manage your files
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                onClick={handleConnect}
                disabled={data?.subscription && !data.subscription.canAddMore}
                className="bg-primary hover:bg-primary/90 shadow-md"
              >
                <Plus className="mr-2" size={18} />
                Connect Drive
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Connected Drives */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.drives.map((drive) => (
              <ConnectedDriveCard
                key={drive.id}
                drive={drive}
                onDelete={handleDelete}
                onSync={handleSync}
                isLoading={isDeleting}
                isSyncing={syncingDriveId === drive.id}
                viewMode="grid"
              />
            ))}
          </div>
        ) : (
          <ConnectedDrivesList
            onSync={handleSync}
            syncingDriveId={syncingDriveId}
          />
        )}

        {/* Empty State */}
        {!isLoading && data?.drives.length === 0 && (
          <CloudEmptyState
            icon={<Cloud size={40} />}
            title="No Drives Connected"
            description="Connect your Google Drive to start managing and syncing your files across all your cloud storage."
            action={
              <Button
                size="lg"
                onClick={handleConnect}
                className="bg-primary hover:bg-primary/90 shadow-lg"
              >
                <Plus className="mr-2" size={18} />
                Connect Your First Drive
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}
