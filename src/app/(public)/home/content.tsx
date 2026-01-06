'use client';

import React from 'react';
import Image from 'next/image';
import {
    Cloud,
    Zap,
    Shield,
    Search,
    BarChart3,
    FileSearch,
    Sparkles,
    ArrowRight,
    Check,
    Users,
    TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import {FeatureCard} from "@/app/(public)/home/components/FeatureCard";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { GlassmorphicBackground } from "@/app/components/layout/GlassmorphicBackground";
import { FloatingIcons } from "@/app/components/decorative/FloatingIcons";
import { DecorativeShapes } from "@/app/components/decorative/DecorativeShapes";

export default function HomePage() {
    return (
        <GlassmorphicBackground>
            <FloatingIcons />
            <DecorativeShapes />

            {/* Hero Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <div className="flex flex-col gap-8 lg:gap-10">
                        <Badge className="w-fit text-white border-none font-semibold backdrop-blur-md px-6 py-3 bg-gradient-to-r from-primary to-purple-600 shadow-lg">
                            <Sparkles className="inline mr-2" size={16} />
                            All-in-One Cloud Solution
                        </Badge>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                            Unify & Master Your{' '}
                            <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Multi-Cloud
                            </span>{' '}
                            Drives
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                            Centralize, organize, and optimize all your Google Drive accounts
                            from one powerful dashboard. Take control of your cloud storage with{' '}
                            <span className="font-semibold text-primary">DriveUnity</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <Button
                                asChild
                                size="lg"
                                className="h-14 text-base font-semibold bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
                            >
                                <Link href="/auth" className="flex items-center gap-2">
                                    Get Started Free
                                    <ArrowRight size={20} />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="h-14 text-base font-semibold border-2 border-primary/30 hover:bg-white/50 backdrop-blur-sm transition-all hover:scale-[1.02]"
                            >
                                <Link href="/about">Explore Features</Link>
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-8 lg:gap-12 mt-6">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-muted-foreground">Files Managed</p>
                                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">5M+</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-muted-foreground">Storage Saved</p>
                                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">40%</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-muted-foreground">Happy Users</p>
                                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">10K+</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className="flex items-center justify-center relative">
                        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

                        <div className="relative w-full max-w-xl">
                            <Image
                                src="/images/hand.png"
                                alt="Cloud storage illustration"
                                width={600}
                                height={600}
                                className="w-full h-auto drop-shadow-2xl floating"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="flex flex-col gap-8 mb-16 text-center">
                    <Badge
                        variant="outline"
                        className="mx-auto text-base font-semibold backdrop-blur-md bg-white/40 border-primary/30 px-6 py-3 shadow-lg"
                    >
                        POWERFUL FEATURES
                    </Badge>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                        Everything You Need to{' '}
                        <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Succeed
                        </span>
                    </h2>

                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Streamline your multi-cloud experience with tools designed for
                        efficiency and insight.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <FeatureCard
                        icon={Cloud}
                        title="Unified Dashboard"
                        description="Manage all your Google Drive accounts from a single, intuitive interface. Say goodbye to switching tabs."
                    />
                    <FeatureCard
                        icon={Zap}
                        title="Lightning Fast Search"
                        description="Find any file across all your drives instantly with our powerful AI-powered search engine."
                    />
                    <FeatureCard
                        icon={FileSearch}
                        title="Duplicate Detection"
                        description="Automatically find and remove redundant files across all your drives, freeing up valuable storage space."
                    />
                    <FeatureCard
                        icon={Shield}
                        title="Enterprise Security"
                        description="Bank-level encryption and security protocols to keep your data safe and compliant."
                    />
                    <FeatureCard
                        icon={BarChart3}
                        title="Smart Analytics"
                        description="Gain insights into your storage usage with beautiful, actionable analytics and reports."
                    />
                    <FeatureCard
                        icon={Search}
                        title="AI-Powered Organization"
                        description="Let our AI automatically organize and categorize your files for maximum productivity."
                    />
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 lg:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl">
                        {/* Gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-pink-600" />
                        <div className="absolute inset-0 bg-black/10" />

                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col gap-8 items-center text-center py-20 lg:py-28 px-6 lg:px-12">
                            <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-semibold px-6 py-3 text-sm">
                                ⚡ Limited Time Offer
                            </Badge>

                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
                                Ready to Unify Your Cloud Drives?
                            </h2>

                            <p className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
                                Join thousands of professionals who are simplifying their cloud
                                storage management with DriveUnity. Get started today!
                            </p>

                            <Button
                                asChild
                                size="lg"
                                className="h-16 px-10 text-lg font-bold bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.05] mt-4"
                            >
                                <Link href="/auth" className="flex items-center gap-3">
                                    Start Your Free Trial
                                    <ArrowRight size={24} />
                                </Link>
                            </Button>

                            <div className="flex flex-wrap justify-center gap-8 mt-8">
                                <div className="flex items-center gap-2 text-white/90">
                                    <Check size={20} className="text-white" strokeWidth={3} />
                                    <span className="text-sm font-medium">No credit card required</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/90">
                                    <Check size={20} className="text-white" strokeWidth={3} />
                                    <span className="text-sm font-medium">14-day free trial</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/90">
                                    <Check size={20} className="text-white" strokeWidth={3} />
                                    <span className="text-sm font-medium">Cancel anytime</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Proof Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl backdrop-blur-sm bg-white/40 border border-white/30 shadow-lg">
                        <Users className="text-primary" size={32} />
                        <div className="text-center">
                            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">10K+</p>
                            <p className="text-sm text-muted-foreground font-medium">Active Users</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl backdrop-blur-sm bg-white/40 border border-white/30 shadow-lg">
                        <Cloud className="text-primary" size={32} />
                        <div className="text-center">
                            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">5M+</p>
                            <p className="text-sm text-muted-foreground font-medium">Files Managed</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl backdrop-blur-sm bg-white/40 border border-white/30 shadow-lg">
                        <TrendingUp className="text-primary" size={32} />
                        <div className="text-center">
                            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">40%</p>
                            <p className="text-sm text-muted-foreground font-medium">Storage Saved</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl backdrop-blur-sm bg-white/40 border border-white/30 shadow-lg">
                        <Shield className="text-primary" size={32} />
                        <div className="text-center">
                            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">99.9%</p>
                            <p className="text-sm text-muted-foreground font-medium">Uptime SLA</p>
                        </div>
                    </div>
                </div>
            </div>
        </GlassmorphicBackground>
    );
}
