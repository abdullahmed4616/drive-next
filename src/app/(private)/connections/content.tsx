"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Chrome, AlertCircle, Sparkles, LayoutGrid, List, Crown } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/badge";
import { Card } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { ConnectedDriveCard } from "./_components/ConnectedDriveCard";
import { ConnectedDrivesList } from "./_components/ConnectedDriveList";
import { useConnectedDrives, useDeleteDrive } from "./hooks/useConnectedDrives";
import { useConnectDriveAdvanced } from "./hooks/useConnectDrive";
import { useSyncDrive } from "./hooks/useSyncDrive";

const PRIMARY_COLOR = "#6B9ADF";
const ACCENT_BG_COLOR = "rgba(0,0,0, 0.2)";
const BORDER_COLOR = "rgba(107, 154, 223, 0.3)";

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

  const getProgressColor = () => {
    if (!data?.subscription) return PRIMARY_COLOR;
    const percentage =
      (data.totalCount / data.subscription.maxConnectedDrives) * 100;
    if (percentage >= 100) return "red";
    if (percentage >= 75) return "orange";
    return PRIMARY_COLOR;
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "PRO":
        return "yellow";
      case "BASE":
        return PRIMARY_COLOR;
      default:
        return "gray";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <Card
          className="shadow-lg rounded-xl p-8 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5A8ACF 100%)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
            }}
          />

          <div className="flex flex-col gap-6 relative">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <h1
                    className="text-white text-4xl font-bold"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                  >
                    Connected Drives
                  </h1>
                  {data?.subscription && (
                    <Badge
                      className="text-xs font-bold uppercase"
                      style={{
                        backgroundColor: getTierBadgeColor(data.subscription.tier),
                      }}
                    >
                      <Crown className="inline mr-1" size={14} />
                      {data.subscription.packageName}
                    </Badge>
                  )}
                </div>
                <p className="text-white text-lg" style={{ opacity: 0.9 }}>
                  Manage your Google Drive connections and sync settings
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                  }}
                >
                  {viewMode === "grid" ? (
                    <>
                      <List className="mr-2" size={18} />
                      List View
                    </>
                  ) : (
                    <>
                      <LayoutGrid className="mr-2" size={18} />
                      Grid View
                    </>
                  )}
                </Button>
              </div>
            </div>

            {data?.subscription && (
              <Card
                className="p-6 rounded-lg"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p
                        className="text-sm font-bold text-gray-600 uppercase"
                        style={{ letterSpacing: "0.5px" }}
                      >
                        Drive Usage
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-bold" style={{ color: PRIMARY_COLOR }}>
                          {data.totalCount}
                        </span>
                        <span className="text-xl font-medium text-gray-600">
                          / {data.subscription.maxConnectedDrives}
                        </span>
                        <span className="text-sm text-gray-600">
                          drives connected
                        </span>
                      </div>
                    </div>

                    {!data.subscription.canAddMore && (
                      <Button
                        asChild
                        variant="default"
                        size="sm"
                        style={{ background: "#fbbf24" }}
                      >
                        <Link href="/settings/paddlePayment">
                          <Sparkles className="mr-2" size={18} />
                          Upgrade Plan
                        </Link>
                      </Button>
                    )}
                  </div>

                  <div>
                    <Progress
                      value={
                        (data.totalCount /
                          data.subscription.maxConnectedDrives) *
                        100
                      }
                      className="h-3 rounded-xl"
                      style={{
                        boxShadow: `0 2px 8px ${BORDER_COLOR}`,
                      }}
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-gray-600">
                        {data.subscription.remainingSlots}{" "}
                        {data.subscription.remainingSlots === 1
                          ? "slot"
                          : "slots"}{" "}
                        remaining
                      </span>
                      {!data.subscription.canAddMore && (
                        <span className="text-xs text-red-600 font-semibold">
                          Limit reached
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>

        {data?.subscription && !data.subscription.canAddMore && (
          <Alert variant="destructive" className="rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Connection Limit Reached</AlertTitle>
            <AlertDescription>
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  You've reached the maximum of{" "}
                  {data.subscription.maxConnectedDrives} connected{" "}
                  {data.subscription.maxConnectedDrives === 1
                    ? "drive"
                    : "drives"}{" "}
                  for your {data.subscription.packageName} plan.
                </p>
                <p className="text-sm">
                  Upgrade to a higher plan to connect more Google Drive accounts
                  and unlock additional features.
                </p>
                <div className="mt-2">
                  <Button
                    asChild
                    size="sm"
                    style={{ background: "#fbbf24" }}
                  >
                    <Link href="/settings/paddlePayment">
                      <Sparkles className="mr-2" size={18} />
                      Upgrade Plan
                    </Link>
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Card
          className="shadow-sm rounded-lg p-6"
          style={{ border: `2px dashed ${BORDER_COLOR}` }}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Chrome size={32} color={PRIMARY_COLOR} />
                <div>
                  <p className="font-bold text-lg">
                    Connect New Google Drive
                  </p>
                  <p className="text-sm text-gray-600">
                    Add another Google Drive account to manage your files
                  </p>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              onClick={handleConnect}
              disabled={data?.subscription && !data.subscription.canAddMore}
              className="rounded-xl"
              style={{
                background: PRIMARY_COLOR,
                boxShadow: `0 4px 12px ${BORDER_COLOR}`,
              }}
            >
              <Plus className="mr-2" size={20} />
              Connect Drive
            </Button>
          </div>
        </Card>

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

        {!isLoading && data?.drives.length === 0 && (
          <Card
            className="shadow-lg rounded-xl p-20 text-center"
            style={{
              border: `2px dashed ${BORDER_COLOR}`,
            }}
          >
            <div className="flex flex-col items-center gap-6">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 120,
                  height: 120,
                  background: ACCENT_BG_COLOR,
                }}
              >
                <Chrome size={60} color={PRIMARY_COLOR} />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-3xl font-bold" style={{ color: PRIMARY_COLOR }}>
                  No Drives Connected
                </h2>
                <p className="text-gray-600 text-lg max-w-md">
                  Connect your Google Drive to start managing and syncing your
                  files
                </p>
              </div>
              <Button
                size="lg"
                onClick={handleConnect}
                className="rounded-xl text-lg px-8"
                style={{
                  background: PRIMARY_COLOR,
                  boxShadow: `0 8px 16px ${BORDER_COLOR}`,
                }}
              >
                <Plus className="mr-2" size={24} />
                Connect Your First Drive
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
