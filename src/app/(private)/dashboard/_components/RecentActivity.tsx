"use client";

import { Stack, Text, Group, Paper, Box, Badge } from "@mantine/core";
import {
  IconUpload,
  IconFileText,
  IconClock,
  IconTrash,
  IconChevronRight,
} from "@tabler/icons-react";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: "Uploaded",
      fileName: "Project_Proposal_V3.pdf",
      location: "Google Drive",
      timestamp: "2 mins ago",
      icon: <IconUpload size={18} stroke={2} />,
      color: "#3b82f6",
      bgColor: "#eff6ff",
      badgeColor: "blue",
    },
    {
      id: 2,
      action: "Modified",
      fileName: "Budget_Report_2024.xlsx",
      location: "Google Drive",
      timestamp: "1 hour ago",
      icon: <IconFileText size={18} stroke={2} />,
      color: "#10b981",
      bgColor: "#f0fdf4",
      badgeColor: "green",
    },
    {
      id: 3,
      action: "Deleted",
      fileName: "Old_Presentation.pptx",
      location: "Google Drive",
      timestamp: "3 hours ago",
      icon: <IconTrash size={18} stroke={2} />,
      color: "#ef4444",
      bgColor: "#fef2f2",
      badgeColor: "red",
    },
  ];

  return (
      <Paper
          p={{ base: "lg", sm: "xl" }}
          radius="lg"
          withBorder
          shadow="sm"
          style={{
            borderColor: "var(--mantine-color-gray-3)",
          }}
      >
        <Stack gap="lg">
          <Box>
            <Group justify="space-between" mb={4}>
              <Text size="lg" fw={600} c="dark.8">
                Recent Activity
              </Text>
              <Badge
                  variant="light"
                  color="gray"
                  size="sm"
                  style={{ textTransform: "none" }}
              >
                Last 24 hours
              </Badge>
            </Group>
            <Text size="sm" c="dimmed">
              Latest changes across your drives
            </Text>
          </Box>

          <Stack gap="sm">
            {activities.map((activity, index) => (
                <Paper
                    key={activity.id}
                    p="md"
                    radius="md"
                    withBorder
                    style={{
                      borderColor: "var(--mantine-color-gray-2)",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateX(4px)";
                      e.currentTarget.style.borderColor = activity.color;
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateX(0)";
                      e.currentTarget.style.borderColor = "var(--mantine-color-gray-2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                >
                  <Box
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        backgroundColor: activity.color,
                      }}
                  />

                  <Group gap="md" wrap="nowrap" align="flex-start">
                    <Box
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          backgroundColor: activity.bgColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: activity.color,
                        }}
                    >
                      {activity.icon}
                    </Box>

                    <Box style={{ flex: 1, minWidth: 0 }}>
                      <Group gap="xs" mb={4} wrap="wrap">
                        <Badge
                            variant="light"
                            color={activity.badgeColor}
                            size="sm"
                            style={{ textTransform: "none" }}
                        >
                          {activity.action}
                        </Badge>
                        <Text size="xs" c="dimmed">
                          {activity.location}
                        </Text>
                      </Group>

                      <Text
                          size="sm"
                          fw={500}
                          mb={6}
                          style={{
                            wordBreak: "break-word",
                            lineHeight: 1.4,
                          }}
                      >
                        {activity.fileName}
                      </Text>

                      <Group gap={6} align="center">
                        <IconClock
                            size={14}
                            stroke={2}
                            style={{ color: "var(--mantine-color-gray-6)" }}
                        />
                        <Text size="xs" c="dimmed">
                          {activity.timestamp}
                        </Text>
                      </Group>
                    </Box>

                    {/* Arrow indicator */}
                    <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          opacity: 0.4,
                          transition: "opacity 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "0.4";
                        }}
                    >
                      <IconChevronRight
                          size={18}
                          stroke={2}
                          style={{ color: activity.color }}
                      />
                    </Box>
                  </Group>
                </Paper>
            ))}
          </Stack>

          <Group justify="center" mt="xs">
            <Text
                size="sm"
                c={activities[0].color}
                fw={500}
                style={{
                  cursor: "pointer",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
            >
              View all activity →
            </Text>
          </Group>
        </Stack>
      </Paper>
  );
}