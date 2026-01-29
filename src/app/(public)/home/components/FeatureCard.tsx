import React from "react";

interface FeatureCardProps {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    description: string;
    gradient?: string;
    iconColor?: string;
}

export function FeatureCard({ icon: Icon, title, description, gradient = "from-blue-500/20 to-indigo-500/20", iconColor = "text-blue-400" }: FeatureCardProps) {
    return (
        <div className="group rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300">
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}>
                <Icon size={22} className={iconColor} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-white/40 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
