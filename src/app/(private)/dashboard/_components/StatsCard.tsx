"use client";

import React from "react";
import useSWR from "swr";
import { File, Folder, Lightbulb, Save } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

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
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <Card
            className="h-full border transition-all duration-200 cursor-default"
            style={{
                borderColor: isHovered ? color : 'hsl(var(--border))',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.05)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{
                                backgroundColor: `${color}15`,
                            }}
                        >
                            {icon}
                        </div>
                        <div
                            className="w-1 h-10 rounded"
                            style={{
                                backgroundColor: color,
                            }}
                        />
                    </div>

                    <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase mb-2">
                            {title}
                        </p>
                        {loading ? (
                            <Skeleton className="h-9 w-3/5 mb-1.5" />
                        ) : (
                            <p
                                className="text-4xl font-bold leading-none mb-1.5"
                                style={{ color }}
                            >
                                {value}
                            </p>
                        )}
                        <p className="text-sm text-muted-foreground leading-tight">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function StatsPanel() {
    const { data, isLoading, error } = useSWR<DashboardStats>(
        "/api/googleDrive/dashboard",
        fetchDashboardStats,
        {
            revalidateOnFocus: false,
            dedupingInterval: 1000 * 60 * 5,
        }
    );
    const isError = !!error;

    const stats = [
        {
            title: "Total Files",
            value: data?.fileCount ?? 0,
            subtitle: "Across all clouds",
            icon: <File size={22} strokeWidth={2} style={{ color: "#3b82f6" }} />,
            color: "#3b82f6",
        },
        {
            title: "Total Folders",
            value: data?.folderCount ?? 0,
            subtitle: "Across all clouds",
            icon: <Folder size={22} strokeWidth={2} style={{ color: "#8b5cf6" }} />,
            color: "#8b5cf6",
        },
        {
            title: "AI Insights",
            value: "0 new",
            subtitle: "Suggestions available",
            icon: <Lightbulb size={22} strokeWidth={2} style={{ color: "#f59e0b" }} />,
            color: "#f59e0b",
        },
        {
            title: "Potential Savings",
            value: "0 GB",
            subtitle: "From duplicates & unused files",
            icon: <Save size={22} strokeWidth={2} style={{ color: "#10b981" }} />,
            color: "#10b981",
        },
    ];

    if (isError) {
        return (
            <Card className="border">
                <CardContent className="p-4">
                    <p className="text-sm text-destructive">
                        Failed to load statistics
                    </p>
                </CardContent>
            </Card>
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
