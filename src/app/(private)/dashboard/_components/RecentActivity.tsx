"use client";

import {
  Upload,
  FileText,
  Clock,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: "Uploaded",
      fileName: "Project_Proposal_V3.pdf",
      location: "Google Drive",
      timestamp: "2 mins ago",
      icon: <Upload size={18} strokeWidth={2} />,
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
      icon: <FileText size={18} strokeWidth={2} />,
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
      icon: <Trash2 size={18} strokeWidth={2} />,
      color: "#ef4444",
      bgColor: "#fef2f2",
      badgeColor: "red",
    },
  ];

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h3>
              <Badge variant="secondary" className="text-xs">
                Last 24 hours
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Latest changes across your drives
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="relative p-4 rounded-md border border-gray-200 transition-all duration-200 cursor-pointer overflow-hidden hover:translate-x-1 hover:shadow-md group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = activity.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(229 231 235)';
                }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ backgroundColor: activity.color }}
                />

                <div className="flex gap-4 items-start">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: activity.bgColor,
                      color: activity.color,
                    }}
                  >
                    {activity.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex gap-2 mb-1 flex-wrap">
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        style={{
                          backgroundColor: activity.bgColor,
                          color: activity.color,
                        }}
                      >
                        {activity.action}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {activity.location}
                      </span>
                    </div>

                    <p className="text-sm font-medium mb-1.5 break-words leading-tight">
                      {activity.fileName}
                    </p>

                    <div className="flex gap-1.5 items-center">
                      <Clock
                        size={14}
                        strokeWidth={2}
                        className="text-gray-500"
                      />
                      <span className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center opacity-40 group-hover:opacity-100 transition-opacity">
                    <ChevronRight
                      size={18}
                      strokeWidth={2}
                      style={{ color: activity.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-2">
            <p
              className="text-sm font-medium cursor-pointer transition-opacity hover:opacity-70"
              style={{ color: activities[0].color }}
            >
              View all activity →
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
