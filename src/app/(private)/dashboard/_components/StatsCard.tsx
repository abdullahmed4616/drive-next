"use client";

import { useQuery } from "@tanstack/react-query";
import { Paper, Text, Stack, Group, Box, Skeleton } from "@mantine/core";
import {
    IconFile,
    IconFolder,
    IconBulb,
    IconDeviceFloppy,
} from "@tabler/icons-react";

interface DashboardStats {
    success: boolean;
    fileCount: number;
    folderCount: number;
}

const fetchDashboardStats = async (): Promise<DashboardStats> => {
    const response = await fetch("/api/googleDrive/dashboard");
    if (!response.ok) {
        throw new Error("Failed to fetch dashboard stats");
    }
    return response.json();
};

const StatCard = ({
                      title,
                      value,
                      subtitle,
                      icon,
                      color,
                      loading,
                  }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
    loading?: boolean;
}) => {
    return (
        <Paper
            p="lg"
            radius="lg"
            withBorder
            shadow="sm"
            h="100%"
            style={{
                transition: "all 0.2s ease",
                cursor: "default",
                borderColor: "var(--mantine-color-gray-3)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.08)";
                e.currentTarget.style.borderColor = color;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderColor = "var(--mantine-color-gray-3)";
            }}
        >
            <Stack gap="md">
                <Group justify="space-between" wrap="nowrap">
                    <Box
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            backgroundColor: `${color}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {icon}
                    </Box>
                    <Box
                        style={{
                            width: 4,
                            height: 40,
                            borderRadius: 2,
                            backgroundColor: color,
                        }}
                    />
                </Group>

                <Box>
                    <Text size="xs" c="dimmed" fw={500} tt="uppercase" mb={8}>
                        {title}
                    </Text>
                    {loading ? (
                        <Skeleton height={36} width="60%" mb="xs" />
                    ) : (
                        <Text size="2.25rem" fw={700} lh={1} mb={6} c={color}>
                            {value}
                        </Text>
                    )}
                    <Text size="sm" c="dimmed" lh={1.4}>
                        {subtitle}
                    </Text>
                </Box>
            </Stack>
        </Paper>
    );
};

export default function StatsPanel() {
    const { data, isLoading, isError } = useQuery<DashboardStats>({
        queryKey: ["dashboardStats"],
        queryFn: fetchDashboardStats,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const stats = [
        {
            title: "Total Files",
            value: data?.fileCount ?? 0,
            subtitle: "Across all clouds",
            icon: <IconFile size={22} stroke={2} style={{ color: "#3b82f6" }} />,
            color: "#3b82f6",
        },
        {
            title: "Total Folders",
            value: data?.folderCount ?? 0,
            subtitle: "Across all clouds",
            icon: <IconFolder size={22} stroke={2} style={{ color: "#8b5cf6" }} />,
            color: "#8b5cf6",
        },
        {
            title: "AI Insights",
            value: "0 new",
            subtitle: "Suggestions available",
            icon: <IconBulb size={22} stroke={2} style={{ color: "#f59e0b" }} />,
            color: "#f59e0b",
        },
        {
            title: "Potential Savings",
            value: "0 GB",
            subtitle: "From duplicates & unused files",
            icon: <IconDeviceFloppy size={22} stroke={2} style={{ color: "#10b981" }} />,
            color: "#10b981",
        },
    ];

    if (isError) {
        return (
            <Paper p="md" radius="md" withBorder>
                <Text c="red" size="sm">
                    Failed to load statistics
                </Text>
            </Paper>
        );
    }

    return (
        <>
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} loading={isLoading} />
            ))}
        </>
    );
}