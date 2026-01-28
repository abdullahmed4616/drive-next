"use client";

import React from "react";
import useSWR from "swr";
import { File, Folder, Lightbulb, Save, TrendingUp } from "lucide-react";
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
    gradient,
    loading,
}: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    gradient: string;
    loading?: boolean;
}) => {
    return (
        <Card className="group h-full border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <CardContent className="p-6 relative">
                {/* Background decoration */}
                <div
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
                    style={{ background: gradient }}
                />

                <div className="relative flex flex-col gap-4">
                    {/* Icon and indicator */}
                    <div className="flex items-start justify-between">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ background: gradient }}
                        >
                            {icon}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <TrendingUp size={12} className="text-success" />
                            <span>Active</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                            {title}
                        </p>
                        {loading ? (
                            <Skeleton className="h-8 w-20" />
                        ) : (
                            <p className="text-3xl font-bold text-foreground tracking-tight">
                                {value}
                            </p>
                        )}
                        <p className="text-sm text-muted-foreground">
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
            icon: <File size={20} strokeWidth={2} className="text-white" />,
            gradient: "linear-gradient(135deg, hsl(210 100% 50%) 0%, hsl(200 80% 55%) 100%)",
        },
        {
            title: "Total Folders",
            value: data?.folderCount ?? 0,
            subtitle: "Across all clouds",
            icon: <Folder size={20} strokeWidth={2} className="text-white" />,
            gradient: "linear-gradient(135deg, hsl(200 80% 50%) 0%, hsl(195 85% 55%) 100%)",
        },
        {
            title: "AI Insights",
            value: "0 new",
            subtitle: "Suggestions available",
            icon: <Lightbulb size={20} strokeWidth={2} className="text-white" />,
            gradient: "linear-gradient(135deg, hsl(195 90% 55%) 0%, hsl(190 85% 50%) 100%)",
        },
        {
            title: "Potential Savings",
            value: "0 GB",
            subtitle: "From duplicates & unused",
            icon: <Save size={20} strokeWidth={2} className="text-white" />,
            gradient: "linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(150 70% 40%) 100%)",
        },
    ];

    if (isError) {
        return (
            <Card className="col-span-full border border-destructive/20 bg-destructive/5">
                <CardContent className="p-6">
                    <p className="text-sm text-destructive">
                        Failed to load statistics. Please try again later.
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
