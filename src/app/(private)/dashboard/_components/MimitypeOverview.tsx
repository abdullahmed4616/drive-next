"use client";

import { useQuery } from "@tanstack/react-query";
import {
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  Code,
  Table as TableIcon,
  Presentation,
  Folder,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Skeleton } from "@/app/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

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
    Documents: <FileText size={18} strokeWidth={2} />,
    Images: <ImageIcon size={18} strokeWidth={2} />,
    Videos: <Video size={18} strokeWidth={2} />,
    Audio: <Music size={18} strokeWidth={2} />,
    Archives: <Archive size={18} strokeWidth={2} />,
    Code: <Code size={18} strokeWidth={2} />,
    Spreadsheets: <TableIcon size={18} strokeWidth={2} />,
    Presentations: <Presentation size={18} strokeWidth={2} />,
    Folders: <Folder size={18} strokeWidth={2} />,
    Other: <HelpCircle size={18} strokeWidth={2} />,
  };
  return iconMap[category] || <FileText size={18} strokeWidth={2} />;
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
      <Card className="border-2" style={{ borderColor: payload[0].fill }}>
        <CardContent className="p-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-2 items-center">
              <div
                className="w-3.5 h-3.5 rounded-full"
                style={{
                  backgroundColor: payload[0].fill,
                  boxShadow: `0 0 12px ${payload[0].fill}60`,
                }}
              />
              <span className="text-sm font-semibold">
                {payload[0].name}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {payload[0].value} types ({payload[0].payload.percentage}%)
            </p>
          </div>
        </CardContent>
      </Card>
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
      <Card className="border shadow-sm h-full">
        <CardContent className="p-6">
          <p className="text-sm text-destructive">
            Failed to load file types
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading || !selectedDriveId) {
    return (
      <Card className="border shadow-sm h-full">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[300px]" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <Skeleton className="h-15" />
              <Skeleton className="h-15" />
              <Skeleton className="h-15" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const categories = Object.keys(groupedData);
  const totalTypes = data?.totalTypes || 0;
  const hasData = categories.length > 0;

  if (!hasData) {
    return (
      <Card className="border shadow-sm h-full">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            {driveOptions.length > 1 && (
              <Select value={selectedDriveId} onValueChange={setSelectedDriveId}>
                <SelectTrigger className="font-medium">
                  <SelectValue placeholder="Select a drive" />
                </SelectTrigger>
                <SelectContent>
                  {driveOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <div className="flex items-center justify-center h-[300px]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <FileText size={32} strokeWidth={1.5} className="text-gray-400" />
                </div>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  No file type data available yet.
                  <br />
                  Connect a drive and sync files to see the distribution.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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

  return (
    <Card className="border shadow-sm h-full">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                File Type Distribution
              </h3>
              <p className="text-sm text-muted-foreground">
                {totalTypes} different types across {categories.length} categories
              </p>
            </div>
            <div className="flex gap-2 items-center">
              {driveOptions.length > 1 && (
                <Select value={selectedDriveId} onValueChange={setSelectedDriveId}>
                  <SelectTrigger className="w-[220px] font-medium">
                    <SelectValue placeholder="Select a drive" />
                  </SelectTrigger>
                  <SelectContent>
                    {driveOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Badge variant="secondary">
                {categories.length} Categories
              </Badge>
            </div>
          </div>

          <div className="relative">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={130}
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

            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="flex items-center justify-center">
                <div className="flex flex-col gap-0.5 items-center">
                  {activeData ? (
                    <>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
                        style={{
                          backgroundColor: `${activeData.color}15`,
                          color: activeData.color,
                        }}
                      >
                        {getCategoryIcon(activeData.name)}
                      </div>
                      <p className="text-3xl font-bold leading-none" style={{ color: activeData.color }}>
                        {activeData.value}
                      </p>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        {activeData.name}
                      </p>
                      <Badge
                        variant="secondary"
                        className="text-xs mt-1"
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
                      <p className="text-4xl font-bold leading-none text-blue-600">
                        {totalTypes}
                      </p>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        Total Types
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {chartData.map((item, index) => (
              <div
                key={item.name}
                className="p-2 rounded-md border transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: activeIndex === index ? item.color : 'rgb(229 231 235)',
                  backgroundColor: activeIndex === index ? `${item.color}08` : 'transparent',
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex gap-2 items-start">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: activeIndex === index ? `0 0 8px ${item.color}80` : 'none',
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-medium truncate"
                      style={{ color: activeIndex === index ? item.color : 'rgb(55 65 81)' }}
                    >
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.value} ({item.percentage}%)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
