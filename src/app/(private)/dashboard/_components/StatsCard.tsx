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
            className="h-full border transition-all duration-300 cursor-default backdrop-blur-sm"
            style={{
                background: isHovered
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'rgba(255, 255, 255, 0.8)',
                borderColor: isHovered ? `${color}40` : 'rgba(107, 154, 223, 0.15)',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: isHovered
                    ? `0 12px 24px rgba(107, 154, 223, 0.2), 0 0 0 1px ${color}20`
                    : '0 2px 8px rgba(107, 154, 223, 0.08)',
                backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all duration-300"
                            style={{
                                background: `linear-gradient(135deg, ${color}15, ${color}08)`,
                                border: `1px solid ${color}20`,
                                boxShadow: isHovered ? `0 4px 12px ${color}20` : 'none',
                            }}
                        >
                            {icon}
                        </div>
                        <div
                            className="w-1 h-12 rounded-full"
                            style={{
                                background: `linear-gradient(to bottom, ${color}, ${color}80)`,
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
            icon: <File size={22} strokeWidth={2} style={{ color: "#6B9ADF" }} />,
            color: "#6B9ADF",
        },
        {
            title: "Total Folders",
            value: data?.folderCount ?? 0,
            subtitle: "Across all clouds",
            icon: <Folder size={22} strokeWidth={2} style={{ color: "#5A89CF" }} />,
            color: "#5A89CF",
        },
        {
            title: "AI Insights",
            value: "0 new",
            subtitle: "Suggestions available",
            icon: <Lightbulb size={22} strokeWidth={2} style={{ color: "#7CAAEF" }} />,
            color: "#7CAAEF",
        },
        {
            title: "Potential Savings",
            value: "0 GB",
            subtitle: "From duplicates & unused files",
            icon: <Save size={22} strokeWidth={2} style={{ color: "#4A78BF" }} />,
            color: "#4A78BF",
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
