import React from "react";
import { Card, CardContent } from "@/app/components/ui/card";

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(0,0,0, 0.2)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

interface FeatureCardProps {
    icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
    title: string;
    description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <Card
            className="h-full cursor-pointer relative overflow-hidden backdrop-blur-md"
            style={{
                border: `1px solid ${isHovered ? `${PRIMARY_COLOR}40` : 'rgba(107, 154, 223, 0.15)'}`,
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: isHovered
                    ? `0 20px 40px rgba(107, 154, 223, 0.25), 0 0 0 1px ${PRIMARY_COLOR}20`
                    : '0 2px 12px rgba(107, 154, 223, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '1.5rem',
                background: isHovered
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `linear-gradient(135deg, ${PRIMARY_COLOR}08, transparent)`,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                }}
            />

            <CardContent className="p-8 relative z-10">
                <div className="flex flex-col items-center text-center gap-6">
                    <div
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '24px',
                            background: `linear-gradient(135deg, ${PRIMARY_COLOR}15, ${PRIMARY_COLOR}08)`,
                            border: `1px solid ${PRIMARY_COLOR}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)',
                            boxShadow: isHovered ? `0 8px 20px ${PRIMARY_COLOR}20` : 'none',
                        }}
                    >
                        <Icon size={36} color={PRIMARY_COLOR} strokeWidth={1.5} />
                    </div>
                    <h3
                        className="font-bold"
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: '1.25rem',
                            fontWeight: 700
                        }}
                    >
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
