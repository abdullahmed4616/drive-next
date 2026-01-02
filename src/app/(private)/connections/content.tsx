"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Container,
  Stack,
  Title,
  Text,
  Button,
  Group,
  Paper,
  Badge,
  Box,
  Progress,
  Alert,
  SimpleGrid,
} from "@mantine/core";
import {
  IconPlus,
  IconBrandGoogle,
  IconAlertCircle,
  IconSparkles,
  IconLayoutGrid,
  IconList,
  IconCrown,
} from "@tabler/icons-react";
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

  const { data, isLoading, refetch } = useConnectedDrives();
  const deleteDrive = useDeleteDrive();
  const connectDrive = useConnectDriveAdvanced();
  const syncDrive = useSyncDrive();

  useEffect(() => {
    connectDrive.checkConnectionStatus();
  }, [data]);

  const handleDelete = (driveId: string) => {
    deleteDrive.mutate({ driveId });
  };

  const handleSync = (driveId: string) => {
    setSyncingDriveId(driveId);
    syncDrive.mutate(
      { driveId },
      {
        onSettled: () => {
          setSyncingDriveId(null);
        },
      }
    );
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
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Paper
          shadow="lg"
          radius="xl"
          p="xl"
          style={{
            background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5A8ACF 100%)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
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
          <Box
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

          <Stack gap="lg" style={{ position: "relative" }}>
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs">
                <Group gap="sm">
                  <Title
                    order={1}
                    c="white"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                  >
                    Connected Drives
                  </Title>
                  {data?.subscription && (
                    <Badge
                      size="lg"
                      variant="filled"
                      color={getTierBadgeColor(data.subscription.tier)}
                      leftSection={<IconCrown size={14} />}
                      style={{
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      {data.subscription.packageName}
                    </Badge>
                  )}
                </Group>
                <Text c="white" size="lg" opacity={0.9}>
                  Manage your Google Drive connections and sync settings
                </Text>
              </Stack>

              <Group gap="sm">
                <Button
                  variant="subtle"
                  color="white"
                  leftSection={
                    viewMode === "grid" ? (
                      <IconList size={18} />
                    ) : (
                      <IconLayoutGrid size={18} />
                    )
                  }
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {viewMode === "grid" ? "List View" : "Grid View"}
                </Button>
              </Group>
            </Group>

            {data?.subscription && (
              <Paper
                p="lg"
                radius="lg"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Stack gap="md">
                  <Group justify="space-between">
                    <div>
                      <Text
                        fw={700}
                        size="sm"
                        c="dimmed"
                        tt="uppercase"
                        style={{ letterSpacing: "0.5px" }}
                      >
                        Drive Usage
                      </Text>
                      <Group gap="xs" mt={4}>
                        <Text fw={700} size="xl" c={PRIMARY_COLOR}>
                          {data.totalCount}
                        </Text>
                        <Text fw={500} size="lg" c="dimmed">
                          / {data.subscription.maxConnectedDrives}
                        </Text>
                        <Text size="sm" c="dimmed">
                          drives connected
                        </Text>
                      </Group>
                    </div>

                    {!data.subscription.canAddMore && (
                      <Button
                        component={Link}
                        href="/settings/paddlePayment"
                        variant="filled"
                        color="yellow"
                        leftSection={<IconSparkles size={18} />}
                        size="md"
                        radius="xl"
                      >
                        Upgrade Plan
                      </Button>
                    )}
                  </Group>

                  <Box>
                    <Progress
                      value={
                        (data.totalCount /
                          data.subscription.maxConnectedDrives) *
                        100
                      }
                      color={getProgressColor()}
                      size="lg"
                      radius="xl"
                      style={{
                        boxShadow: `0 2px 8px ${BORDER_COLOR}`,
                      }}
                    />
                    <Group justify="space-between" mt="xs">
                      <Text size="xs" c="dimmed">
                        {data.subscription.remainingSlots}{" "}
                        {data.subscription.remainingSlots === 2
                          ? "slot"
                          : "slots"}{" "}
                        remaining
                      </Text>
                      {!data.subscription.canAddMore && (
                        <Text size="xs" c="red" fw={600}>
                          Limit reached
                        </Text>
                      )}
                    </Group>
                  </Box>
                </Stack>
              </Paper>
            )}
          </Stack>
        </Paper>

        {data?.subscription && !data.subscription.canAddMore && (
          <Alert
            icon={<IconAlertCircle size={20} />}
            title="Connection Limit Reached"
            color="orange"
            radius="lg"
            variant="light"
          >
            <Stack gap="xs">
              <Text size="sm">
                You've reached the maximum of{" "}
                {data.subscription.maxConnectedDrives} connected{" "}
                {data.subscription.maxConnectedDrives === 1
                  ? "drive"
                  : "drives"}{" "}
                for your {data.subscription.packageName} plan.
              </Text>
              <Text size="sm">
                Upgrade to a higher plan to connect more Google Drive accounts
                and unlock additional features.
              </Text>
              <Group mt="xs">
                <Button
                  component={Link}
                  href="/settings/paddlePayment"
                  variant="filled"
                  color="yellow"
                  leftSection={<IconSparkles size={18} />}
                  size="md"
                  radius="xl"
                >
                  Upgrade Plan
                </Button>
              </Group>
            </Stack>
          </Alert>
        )}

        <Paper
          shadow="sm"
          radius="lg"
          p="lg"
          style={{ border: `2px dashed ${BORDER_COLOR}` }}
        >
          <Group justify="space-between">
            <Stack gap="xs">
              <Group gap="sm">
                <IconBrandGoogle size={32} color={PRIMARY_COLOR} />
                <div>
                  <Text fw={700} size="lg">
                    Connect New Google Drive
                  </Text>
                  <Text size="sm" c="dimmed">
                    Add another Google Drive account to manage your files
                  </Text>
                </div>
              </Group>
            </Stack>
            <Button
              size="lg"
              leftSection={<IconPlus size={20} />}
              onClick={handleConnect}
              loading={connectDrive.isConnecting}
              disabled={data?.subscription && !data.subscription.canAddMore}
              radius="xl"
              style={{
                background: PRIMARY_COLOR,
                boxShadow: `0 4px 12px ${BORDER_COLOR}`,
              }}
            >
              Connect Drive
            </Button>
          </Group>
        </Paper>

        {viewMode === "grid" ? (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {data?.drives.map((drive) => (
              <ConnectedDriveCard
                key={drive.id}
                drive={drive}
                onDelete={handleDelete}
                onSync={handleSync}
                isLoading={deleteDrive.isPending}
                isSyncing={syncingDriveId === drive.id}
                viewMode="grid"
              />
            ))}
          </SimpleGrid>
        ) : (
          <ConnectedDrivesList
            onSync={handleSync}
            syncingDriveId={syncingDriveId}
          />
        )}

        {!isLoading && data?.drives.length === 0 && (
          <Paper
            shadow="lg"
            radius="xl"
            p={80}
            style={{
              textAlign: "center",
              border: `2px dashed ${BORDER_COLOR}`,
            }}
          >
            <Stack align="center" gap="lg">
              <Box
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: ACCENT_BG_COLOR,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconBrandGoogle size={60} color={PRIMARY_COLOR} />
              </Box>
              <Stack align="center" gap="xs">
                <Title order={2} c={PRIMARY_COLOR}>
                  No Drives Connected
                </Title>
                <Text c="dimmed" size="lg" maw={500}>
                  Connect your Google Drive to start managing and syncing your
                  files
                </Text>
              </Stack>
              <Button
                size="xl"
                leftSection={<IconPlus size={24} />}
                onClick={handleConnect}
                loading={connectDrive.isConnecting}
                radius="xl"
                style={{
                  background: PRIMARY_COLOR,
                  boxShadow: `0 8px 16px ${BORDER_COLOR}`,
                }}
              >
                Connect Your First Drive
              </Button>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
