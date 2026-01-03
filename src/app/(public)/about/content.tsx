'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import { X, Check, Lightbulb, Shield, TrendingUp, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card } from "@/app/components/ui/card";

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(0,0,0, 0.2)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

export default function AboutPage() {
    const router = useRouter();

    const gradientText: React.CSSProperties = {
        background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_COLOR} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    const glassCard: React.CSSProperties = {
        backdropFilter: 'blur(16px)',
        background: BORDER_COLOR,
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: '20px',
        padding: '24px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
    };

    return (
        <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', paddingBottom: 100 }}>
            <div
                style={{
                    position: 'fixed',
                    top: '-10%',
                    right: '-5%',
                    width: '600px',
                    height: '600px',
                    background: `linear-gradient(135deg, ${PRIMARY_COLOR}20 0%, ${PRIMARY_COLOR}10 100%)`,
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'floating 8s ease-in-out infinite',
                    zIndex: 0,
                }}
            />
            <div
                style={{
                    position: 'fixed',
                    bottom: '-10%',
                    left: '-5%',
                    width: '500px',
                    height: '500px',
                    background: `linear-gradient(135deg, ${PRIMARY_COLOR}15 0%, ${PRIMARY_COLOR}10 100%)`,
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'floating 10s ease-in-out infinite reverse',
                    zIndex: 0,
                }}
            />

            <div className="container mx-auto px-4 py-20">
                <div className="flex flex-col gap-8 items-center text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <Badge
                        className="text-white border-none font-semibold"
                        style={{
                            background: PRIMARY_COLOR,
                            padding: '8px 20px',
                            boxShadow: `0 4px 16px ${PRIMARY_COLOR}50`,
                            animation: 'pulse 2s ease-in-out infinite',
                        }}
                    >
                        About DriveUnity
                    </Badge>

                    <h1 className="text-5xl font-bold max-w-2xl" style={{ lineHeight: 1.2 }}>
                        Learn About{' '}
                        <span style={gradientText}>
                            DriveUnity
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 text-center max-w-2xl" style={{ lineHeight: 1.8 }}>
                        DriveUnity unifies all your cloud drives in one dashboard. Simplify, organize, and secure your digital world with modern automation.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="shadow-sm" style={glassCard}>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl font-bold" style={gradientText}>Our Mission & Vision</h3>
                            <p className="text-gray-600">
                                Our mission is to revolutionize how users manage multiple cloud drives efficiently.
                            </p>
                            <p className="text-gray-600">
                                Our vision is to become the most trusted platform for unified cloud storage management.
                            </p>
                        </div>
                    </Card>

                    <Card className="shadow-sm" style={glassCard}>
                        <Image
                            src="/images/architecture.png"
                            alt="Cloud Unity Architecture"
                            width={500}
                            height={400}
                            style={{ width: '100%', borderRadius: '18px' }}
                        />
                    </Card>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col gap-8">
                    <h2 className="text-center text-4xl font-bold" style={gradientText}>Challenges & Solutions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <GlassColumn title="The Challenges You Face">
                            <ChallengeCard icon={<X size={20}/>} iconColor="red" title="Fragmented Storage" description="Multiple cloud drives scattered across platforms." />
                            <ChallengeCard icon={<X size={20}/>} iconColor="red" title="Lost Productivity" description="Inefficient management slows down workflows." />
                            <ChallengeCard icon={<X size={20}/>} iconColor="red" title="Duplicate Data" description="Unnecessary file copies consume storage." />
                        </GlassColumn>

                        <GlassColumn title="DriveUnity's Seamless Solutions">
                            <ChallengeCard icon={<Check size={20}/>} iconColor={PRIMARY_COLOR} title="Unified Access" description="One dashboard for all drives." />
                            <ChallengeCard icon={<Check size={20}/>} iconColor={PRIMARY_COLOR} title="Smart Automation" description="Manage files efficiently and remove duplicates." />
                            <ChallengeCard icon={<Check size={20}/>} iconColor={PRIMARY_COLOR} title="Optimized Storage" description="Maximize storage efficiency." />
                        </GlassColumn>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col gap-8">
                    <h2 className="text-center text-4xl font-bold" style={gradientText}>Our Core Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <ValueCard icon={<Lightbulb size={32}/>} iconColor={PRIMARY_COLOR} title="Simplicity" description="Intuitive and easy-to-use tools." />
                        <ValueCard icon={<Shield size={32}/>} iconColor={PRIMARY_COLOR} title="Security" description="Your data is safe with us." />
                        <ValueCard icon={<TrendingUp size={32}/>} iconColor={PRIMARY_COLOR} title="Efficiency" description="Boost productivity and save time." />
                        <ValueCard icon={<Sparkles size={32}/>} iconColor={PRIMARY_COLOR} title="Innovation" description="Cutting-edge features." gradient />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <Card
                    style={{
                        background: PRIMARY_COLOR,
                        padding: 40,
                        borderRadius: 24,
                        boxShadow: `0 15px 40px ${PRIMARY_COLOR}40`,
                    }}
                >
                    <div className="flex flex-col gap-6 items-center text-center">
                        <h2 className="text-white text-4xl font-bold">Ready to Simplify Your Cloud?</h2>
                        <p className="text-lg text-white max-w-2xl">
                            Join thousands of users transforming their multi-cloud experience.
                        </p>
                        <div className="flex gap-4">
                            <Button size="lg" variant="secondary" onClick={() => router.push('/auth')}>
                                Connect Your Drive
                            </Button>
                            <Button size="lg" variant="secondary" onClick={() => router.push('/price')}>
                                Explore Plans
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            <style jsx global>{`
                @keyframes floating {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
            `}</style>
        </div>
    );
}

interface GlassColumnProps {
    title: string;
    children: ReactNode;
}
function GlassColumn({ title, children }: GlassColumnProps) {
    return (
        <div className="flex flex-col gap-4" style={{
            padding: 24,
            borderRadius: 20,
            backdropFilter: 'blur(16px)',
            background: BORDER_COLOR,
            border: `1px solid ${BORDER_COLOR}`,
        }}>
            <h3 className="text-xl font-bold">{title}</h3>
            <div className="flex flex-col gap-2">{children}</div>
        </div>
    );
}

interface ChallengeCardProps {
    icon: ReactNode;
    iconColor: string;
    title: string;
    description: string;
}
function ChallengeCard({ icon, iconColor, title, description }: ChallengeCardProps) {
    return (
        <Card className="border shadow-sm" style={{
            backdropFilter: 'blur(14px)',
            background: BORDER_COLOR,
            border: `1px solid ${BORDER_COLOR}`,
            transition: '0.25s',
            cursor: 'pointer',
        }} onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = `0 16px 32px ${PRIMARY_COLOR}30`;
        }} onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '';
        }}>
            <div className="flex gap-4 items-start p-4">
                <div
                    className="flex items-center justify-center rounded-full p-2"
                    style={{
                        backgroundColor: `${iconColor}20`,
                        color: iconColor
                    }}
                >
                    {icon}
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <p className="font-semibold text-sm">{title}</p>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
            </div>
        </Card>
    );
}

interface ValueCardProps {
    icon: ReactNode;
    iconColor: string;
    title: string;
    description: string;
    gradient?: boolean;
}
function ValueCard({ icon, iconColor, title, description, gradient = false }: ValueCardProps) {
    return (
        <Card className="shadow-sm p-6 rounded-lg" style={{
            backdropFilter: 'blur(14px)',
            background: gradient ? `linear-gradient(135deg, ${PRIMARY_COLOR}20, ${BORDER_COLOR}, ${PRIMARY_COLOR}15)` : BORDER_COLOR,
            border: `1px solid ${BORDER_COLOR}`,
            transition: '0.3s',
            cursor: 'pointer',
        }}>
            <div className="flex flex-col gap-4 items-center text-center">
                <div
                    className="flex items-center justify-center rounded-lg"
                    style={{
                        width: 60,
                        height: 60,
                        backgroundColor: `${iconColor}20`,
                        color: iconColor
                    }}
                >
                    {icon}
                </div>
                <h4 className="text-lg font-bold">{title}</h4>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </Card>
    );
}
