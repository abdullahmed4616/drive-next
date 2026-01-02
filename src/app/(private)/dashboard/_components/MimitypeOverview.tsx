"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Paper,
  Text,
  Stack,
  Group,
  Badge,
  Skeleton,
  Box,
  Center,
  SimpleGrid,
  Select,
} from "@mantine/core";
import {
  IconFileText,
  IconPhoto,
  IconVideo,
  IconMusic,
  IconArchive,
  IconCode,
  IconTable,
  IconPresentation,
  IconFolder,
  IconQuestionMark,
  IconChevronDown,
} from "@tabler/icons-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect, useMemo } from "react";
import { useMediaQuery } from "@mantine/hooks";

interface MimeTypeInfo {
  value: string;
  label: string;
  category: string;
}

interface MimeTypeResponse {
  success: boolean;
  mimeTypes: MimeTypeInfo[];
  groupedByCategory?: Record<string, MimeTypeInfo[]>;
  totalTypes: number;
}

interface DriveAccount {
  id: string;
  gmailAccount: string;
  createdAt: string;
}

const fetchMimeTypes = async (userId: string, driveId: string): Promise<MimeTypeResponse> => {
  const response = await fetch(`/api/googleDrive/filters/mimetype?userId=${userId}&driveId=${driveId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch mime types");
  }
  return response.json();
};

const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    Documents: <IconFileText size={18} stroke={2} />,
    Images: <IconPhoto size={18} stroke={2} />,
    Videos: <IconVideo size={18} stroke={2} />,
    Audio: <IconMusic size={18} stroke={2} />,
    Archives: <IconArchive size={18} stroke={2} />,
    Code: <IconCode size={18} stroke={2} />,
    Spreadsheets: <IconTable size={18} stroke={2} />,
    Presentations: <IconPresentation size={18} stroke={2} />,
    Folders: <IconFolder size={18} stroke={2} />,
    Other: <IconQuestionMark size={18} stroke={2} />,
  };
  return iconMap[category] || <IconFileText size={18} stroke={2} />;
};

const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    Documents: "#6B9ADF",
    Images: "#ec4899",
    Videos: "#8b5cf6",
    Audio: "#14b8a6",
    Archives: "#f59e0b",
    Code: "#10b981",
    Spreadsheets: "#06b6d4",
    Presentations: "#ef4444",
    Folders: "#f97316",
    Other: "#6b7280",
  };
  return colorMap[category] || "#6b7280";
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        p="md"
        shadow="xl"
        withBorder
        radius="md"
        style={{
          borderColor: payload[0].fill,
          borderWidth: 2,
        }}
      >
        <Stack gap={6}>
          <Group gap="xs" align="center">
            <Box
              w={14}
              h={14}
              style={{
                borderRadius: "50%",
                backgroundColor: payload[0].fill,
                boxShadow: `0 0 12px ${payload[0].fill}60`,
              }}
            />
            <Text size="sm" fw={600}>
              {payload[0].name}
            </Text>
          </Group>
          <Text size="xs" c="dimmed">
            {payload[0].value} types ({payload[0].payload.percentage}%)
          </Text>
        </Stack>
      </Paper>
    );
  }
  return null;
};

export default function MimeTypeOverview({ 
  userId, 
  accounts 
}: { 
  userId: any;
  accounts: DriveAccount[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedDriveId, setSelectedDriveId] = useState<string>("");

  const isMobile = useMediaQuery("(max-width: 576px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  
  useEffect(() => {
    if (accounts && accounts.length > 0 && !selectedDriveId) {
      setSelectedDriveId(accounts[0].id);
    }
  }, [accounts, selectedDriveId]);

  const { data, isLoading, isError } = useQuery<MimeTypeResponse>({
    queryKey: ["mimeTypes", userId, selectedDriveId],
    queryFn: () => fetchMimeTypes(userId, selectedDriveId),
    enabled: !!userId && !!selectedDriveId,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const groupedData = useMemo(() => {
    if (data?.groupedByCategory && Object.keys(data.groupedByCategory).length > 0) {
      return data.groupedByCategory;
    }

    if (data?.mimeTypes && data.mimeTypes.length > 0) {
      const grouped: Record<string, MimeTypeInfo[]> = {};

      data.mimeTypes.forEach(mimeType => {
        const category = mimeType.category;
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(mimeType);
      });

      return grouped;
    }

    return {};
  }, [data]);

  
  const driveOptions = accounts.map(account => ({
    value: account.id,
    label: account.gmailAccount,
  }));

  if (isError) {
    return (
      <Paper p="xl" radius="lg" withBorder shadow="sm" h="100%">
        <Text c="red" size="sm">
          Failed to load file types
        </Text>
      </Paper>
    );
  }

  if (isLoading || !selectedDriveId) {
    return (
      <Paper p="xl" radius="lg" withBorder shadow="sm" h="100%">
        <Stack gap="md">
          <Skeleton height={24} width="50%" />
          <Skeleton height={40} width="100%" />
          <Skeleton height={isMobile ? 200 : 350} />
          <SimpleGrid cols={isMobile ? 2 : 3}>
            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
          </SimpleGrid>
        </Stack>
      </Paper>
    );
  }

  const categories = Object.keys(groupedData);
  const totalTypes = data?.totalTypes || 0;
  const hasData = categories.length > 0;

  if (!hasData) {
    return (
      <Paper p={isMobile ? "md" : "xl"} radius="lg" withBorder shadow="sm" h="100%">
        <Stack gap="md">
          {driveOptions.length > 1 && (
            <Select
              placeholder="Select a drive"
              data={driveOptions}
              value={selectedDriveId}
              onChange={(value) => setSelectedDriveId(value || "")}
              rightSection={<IconChevronDown size={16} />}
              styles={{
                input: {
                  fontWeight: 500,
                },
              }}
            />
          )}
          <Center h={isMobile ? 200 : 300}>
            <Stack align="center" gap="md">
              <Box
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconFileText size={32} stroke={1.5} color="#9ca3af" />
              </Box>
              <Text size="sm" c="dimmed" ta="center">
                No file type data available yet.
                <br />
                Connect a drive and sync files to see the distribution.
              </Text>
            </Stack>
          </Center>
        </Stack>
      </Paper>
    );
  }

  const chartData = categories.map((category) => {
    const count = groupedData[category].length;
    const percentage = totalTypes > 0 ? ((count / totalTypes) * 100).toFixed(1) : 0;
    return {
      name: category,
      value: count,
      percentage,
      color: getCategoryColor(category),
    };
  });

  chartData.sort((a, b) => b.value - a.value);

  const activeData = activeIndex !== null ? chartData[activeIndex] : null;

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const chartHeight = isMobile ? 240 : isTablet ? 280 : 320;
  const innerRadius = isMobile ? 60 : isTablet ? 70 : 85;
  const outerRadius = isMobile ? 95 : isTablet ? 110 : 130;

  return (
    <Paper
      p={isMobile ? "md" : "xl"}
      radius="lg"
      withBorder
      shadow="sm"
      h="100%"
      style={{
        borderColor: "var(--mantine-color-gray-3)",
      }}
    >
      <Stack gap={isMobile ? "lg" : "xl"}>
        <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
          <Box style={{ flex: 1 }}>
            <Text size={isMobile ? "md" : "lg"} fw={600} mb={4} c="dark.8">
              File Type Distribution
            </Text>
            <Text size="sm" c="dimmed">
              {totalTypes} different types across {categories.length} categories
            </Text>
          </Box>
          <Group gap="sm" align="center">
            {driveOptions.length > 1 && (
              <Select
                placeholder="Select a drive"
                data={driveOptions}
                value={selectedDriveId}
                onChange={(value) => setSelectedDriveId(value || "")}
                rightSection={<IconChevronDown size={16} />}
                styles={{
                  input: {
                    fontWeight: 500,
                  },
                }}
                w={isMobile ? "100%" : 220}
              />
            )}
            <Badge
              size={isMobile ? "md" : "lg"}
              variant="light"
              color="blue"
              style={{ textTransform: "none" }}
            >
              {categories.length} Categories
            </Badge>
          </Group>
        </Group>

        <Box pos="relative">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                animationDuration={800}
                animationBegin={0}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                    style={{
                      cursor: "pointer",
                      filter: activeIndex === index ? `drop-shadow(0 0 8px ${entry.color}80)` : 'none',
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <Box
            pos="absolute"
            top="50%"
            left="50%"
            style={{
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          >
            <Center>
              <Stack gap={2} align="center">
                {activeData ? (
                  <>
                    <Box
                      style={{
                        width: isMobile ? 40 : 48,
                        height: isMobile ? 40 : 48,
                        borderRadius: 12,
                        backgroundColor: `${activeData.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 8,
                        color: activeData.color,
                      }}
                    >
                      {getCategoryIcon(activeData.name)}
                    </Box>
                    <Text size={isMobile ? "xl" : "1.75rem"} fw={700} c={activeData.color} lh={1}>
                      {activeData.value}
                    </Text>
                    <Text size="xs" c="dimmed" fw={600} tt="uppercase" style={{ letterSpacing: 1 }}>
                      {activeData.name}
                    </Text>
                    <Badge
                      variant="light"
                      size="sm"
                      style={{
                        backgroundColor: `${activeData.color}15`,
                        color: activeData.color,
                        border: `1px solid ${activeData.color}30`,
                      }}
                    >
                      {activeData.percentage}%
                    </Badge>
                  </>
                ) : (
                  <>
                    <Text size={isMobile ? "2rem" : "2.5rem"} fw={700} c="blue.6" lh={1}>
                      {totalTypes}
                    </Text>
                    <Text size="xs" c="dimmed" fw={600} tt="uppercase" style={{ letterSpacing: 1 }}>
                      Total Types
                    </Text>
                  </>
                )}
              </Stack>
            </Center>
          </Box>
        </Box>

        <SimpleGrid cols={isMobile ? 2 : isTablet ? 3 : 4} spacing="xs">
          {chartData.map((item, index) => (
            <Paper
              key={item.name}
              p="xs"
              radius="md"
              withBorder
              style={{
                borderColor: activeIndex === index ? item.color : "var(--mantine-color-gray-2)",
                backgroundColor: activeIndex === index ? `${item.color}08` : "transparent",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <Group gap="xs" wrap="nowrap">
                <Box
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    flexShrink: 0,
                    boxShadow: activeIndex === index ? `0 0 8px ${item.color}80` : 'none',
                  }}
                />
                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Text size="xs" fw={500} truncate c={activeIndex === index ? item.color : "dark.7"}>
                    {item.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {item.value} ({item.percentage}%)
                  </Text>
                </Box>
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    </Paper>
  );
}