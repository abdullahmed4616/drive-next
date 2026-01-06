'use client';

import React from 'react';
import Image from 'next/image';
import {
    Facebook,
    Twitter,
    Linkedin,
    Cloud,
    Zap,
    Shield,
    Search,
    BarChart3,
    FileSearch,
    Sparkles,
    ArrowRight,
    Check,
} from 'lucide-react';
import Link from 'next/link';
import {FeatureCard} from "@/app/(public)/home/components/FeatureCard";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(107, 154, 223, 0.1)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

export default function HomePage() {
    return (
        <div style={{ minHeight: 'auto', position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)' }}>
            <div
                style={{
                    position: 'fixed',
                    top: '-10%',
                    right: '-5%',
                    width: '600px',
                    height: '600px',
                    background: `radial-gradient(circle, ${PRIMARY_COLOR}30, ${PRIMARY_COLOR}10)`,
                    borderRadius: '50%',
                    filter: 'blur(80px)',
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
                    background: `radial-gradient(circle, ${PRIMARY_COLOR}30, ${PRIMARY_COLOR}10)`,
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    animation: 'floating 10s ease-in-out infinite reverse',
                    zIndex: 0,
                }}
            />

            <div
                style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.9) 100%)',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <div className="container mx-auto px-4 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-8 fade-in">
                            <Badge
                                className="w-fit text-white border-none font-semibold backdrop-blur-md"
                                style={{
                                    background: `linear-gradient(135deg, ${PRIMARY_COLOR}, #5A89CF)`,
                                    padding: '8px 20px',
                                    border: `1px solid ${PRIMARY_COLOR}40`,
                                    boxShadow: `0 4px 16px rgba(107, 154, 223, 0.25)`,
                                }}
                            >
                                <Sparkles className="inline mr-2" size={16} />
                                All-in-One Cloud Solution
                            </Badge>

                            <h1
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: '56px',
                                    fontWeight: 800,
                                    lineHeight: 1.2,
                                    letterSpacing: '-1px',
                                }}
                            >
                                Unify & Master Your{' '}
                                <span style={{ color: PRIMARY_COLOR }}>
                                    Multi-Cloud
                                </span>{' '}
                                Drives
                            </h1>

                            <p className="text-xl text-gray-600" style={{ lineHeight: 1.8 }}>
                                Centralize, organize, and optimize all your Google Drive accounts
                                from one powerful dashboard. Take control of your cloud storage with{' '}
                                <span className="font-semibold" style={{ color: PRIMARY_COLOR }}>DriveUnity</span>.
                            </p>

                            <div className="flex gap-4 mt-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="text-lg px-8 backdrop-blur-sm"
                                    style={{
                                        background: `linear-gradient(135deg, ${PRIMARY_COLOR}, #5A89CF)`,
                                        borderRadius: '9999px',
                                        border: `1px solid ${PRIMARY_COLOR}40`,
                                        boxShadow: `0 8px 24px rgba(107, 154, 223, 0.3)`,
                                        fontWeight: 600,
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                                        e.currentTarget.style.boxShadow = `0 12px 32px rgba(107, 154, 223, 0.4)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = `0 8px 24px rgba(107, 154, 223, 0.3)`;
                                    }}
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
                                    className="text-lg px-8 backdrop-blur-md"
                                    style={{
                                        borderRadius: '9999px',
                                        borderColor: `${PRIMARY_COLOR}40`,
                                        color: PRIMARY_COLOR,
                                        borderWidth: 2,
                                        fontWeight: 600,
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        backdropFilter: 'blur(12px)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = `${PRIMARY_COLOR}15`;
                                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                                        e.currentTarget.style.borderColor = PRIMARY_COLOR;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <Link href="/about">Explore Features</Link>
                                </Button>
                            </div>

                            <div className="flex gap-12 mt-8">
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-gray-600 font-medium">Files Managed</p>
                                    <p className="text-xl font-bold" style={{ color: PRIMARY_COLOR }}>5M+</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-gray-600 font-medium">Storage Saved</p>
                                    <p className="text-xl font-bold" style={{ color: PRIMARY_COLOR }}>40%</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center" style={{ position: 'relative' }}>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '10%',
                                    right: '10%',
                                    width: '120px',
                                    height: '120px',
                                    background: PRIMARY_COLOR,
                                    borderRadius: '50%',
                                    opacity: 0.2,
                                    animation: 'floating 4s ease-in-out infinite',
                                    zIndex: 0,
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '15%',
                                    left: '5%',
                                    width: '80px',
                                    height: '80px',
                                    background: PRIMARY_COLOR,
                                    borderRadius: '50%',
                                    opacity: 0.2,
                                    animation: 'floating 5s ease-in-out infinite reverse',
                                    zIndex: 0,
                                }}
                            />

                            <Image
                                src="/images/hand.png"
                                alt="Cloud storage illustration"
                                width={600}
                                height={600}
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    height: 'auto',
                                    borderRadius: '24px',
                                    filter: `drop-shadow(0 20px 40px ${BORDER_COLOR})`,
                                    animation: 'floating 6s ease-in-out infinite',
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20" style={{ position: 'relative', zIndex: 1 }}>
                <div className="flex flex-col gap-8 mb-16">
                    <div className="flex justify-center">
                        <Badge
                            variant="outline"
                            className="text-lg font-semibold backdrop-blur-md"
                            style={{
                                background: 'rgba(255, 255, 255, 0.8)',
                                color: PRIMARY_COLOR,
                                border: `1px solid ${PRIMARY_COLOR}40`,
                                padding: '8px 20px',
                                boxShadow: `0 4px 12px rgba(107, 154, 223, 0.15)`,
                            }}
                        >
                            POWERFUL FEATURES
                        </Badge>
                    </div>
                    <h2 className="text-center text-5xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Everything You Need to{' '}
                        <span style={{ color: PRIMARY_COLOR }}>
                            Succeed
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 text-center mx-auto max-w-2xl">
                        Streamline your multi-cloud experience with tools designed for
                        efficiency and insight.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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

            <div
                className="py-24"
                style={{
                    background: PRIMARY_COLOR,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '-20%',
                        right: '-10%',
                        width: '400px',
                        height: '400px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-20%',
                        left: '-10%',
                        width: '500px',
                        height: '500px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                    }}
                />

                <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="flex flex-col gap-8 items-center text-center">
                        <div
                            style={{
                                padding: '16px 24px',
                                borderRadius: '50px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            <p className="text-sm font-semibold text-white uppercase" style={{ letterSpacing: '1px' }}>
                                ⚡ Limited Time Offer
                            </p>
                        </div>

                        <h2 className="text-white text-5xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            Ready to Unify Your Cloud Drives?
                        </h2>
                        <p className="text-xl text-white max-w-2xl" style={{ opacity: 0.95 }}>
                            Join thousands of professionals who are simplifying their cloud
                            storage management with DriveUnity. Get started today!
                        </p>

                        <div className="flex gap-4 mt-4">
                            <Button
                                asChild
                                size="lg"
                                className="text-lg px-10"
                                style={{
                                    background: 'white',
                                    color: PRIMARY_COLOR,
                                    borderRadius: '9999px',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                    fontWeight: 700,
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
                                }}
                            >
                                <Link href="/auth" className="flex items-center gap-2">
                                    Start Your Free Trial
                                    <ArrowRight size={20} />
                                </Link>
                            </Button>
                        </div>

                        <div className="flex gap-12 mt-8 flex-wrap justify-center">
                            <div className="flex gap-2 items-center">
                                <Check size={20} color="white" />
                                <span className="text-sm text-white font-medium">No credit card required</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Check size={20} color="white" />
                                <span className="text-sm text-white font-medium">14-day free trial</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Check size={20} color="white" />
                                <span className="text-sm text-white font-medium">Cancel anytime</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer
                className="py-10 bg-white"
                style={{
                    borderTop: `1px solid ${BORDER_COLOR}`,
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center flex-wrap gap-8">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                                <div
                                    style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '8px',
                                        background: PRIMARY_COLOR,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Sparkles size={18} color="white" strokeWidth={2.5} />
                                </div>
                                <span className="font-bold text-lg" style={{ fontFamily: "'Outfit', sans-serif", color: PRIMARY_COLOR }}>
                                    DriveUnity
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">
                                © {new Date().getFullYear()} DriveUnity. All rights reserved.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="flex items-center justify-center group backdrop-blur-md"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    border: `1px solid ${PRIMARY_COLOR}30`,
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = PRIMARY_COLOR;
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = `0 8px 16px rgba(107, 154, 223, 0.3)`;
                                    const icon = e.currentTarget.querySelector('svg');
                                    if (icon) icon.setAttribute('color', 'white');
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '';
                                    const icon = e.currentTarget.querySelector('svg');
                                    if (icon) icon.setAttribute('color', PRIMARY_COLOR);
                                }}
                            >
                                <Facebook size={20} color={PRIMARY_COLOR} />
                            </a>
                            <a
                                href="#"
                                className="flex items-center justify-center group backdrop-blur-md"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    border: `1px solid ${PRIMARY_COLOR}30`,
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = PRIMARY_COLOR;
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = `0 8px 16px rgba(107, 154, 223, 0.3)`;
                                    const icon = e.currentTarget.querySelector('svg');
                                    if (icon) icon.setAttribute('color', 'white');
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '';
                                    const icon = e.currentTarget.querySelector('svg');
                                    if (icon) icon.setAttribute('color', PRIMARY_COLOR);
                                }}
                            >
                                <Twitter size={20} color={PRIMARY_COLOR} />
                            </a>
                            <a
                                href="#"
                                className="flex items-center justify-center group backdrop-blur-md"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    border: `1px solid ${PRIMARY_COLOR}30`,
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = PRIMARY_COLOR;
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = `0 8px 16px rgba(107, 154, 223, 0.3)`;
                                    const icon = e.currentTarget.querySelector('svg');
                                    if (icon) icon.setAttribute('color', 'white');
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '';
                                    const icon = e.currentTarget.querySelector('svg');
                                    if (icon) icon.setAttribute('color', PRIMARY_COLOR);
                                }}
                            >
                                <Linkedin size={20} color={PRIMARY_COLOR} />
                            </a>
                        </div>

                        <div className="flex gap-8">
                            <a
                                href="#"
                                className="text-sm text-gray-600 font-medium no-underline transition-colors"
                                onMouseEnter={(e) => { e.currentTarget.style.color = PRIMARY_COLOR; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
                            >
                                Company
                            </a>
                            <a
                                href="#"
                                className="text-sm text-gray-600 font-medium no-underline transition-colors"
                                onMouseEnter={(e) => { e.currentTarget.style.color = PRIMARY_COLOR; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
                            >
                                Resources
                            </a>
                            <a
                                href="#"
                                className="text-sm text-gray-600 font-medium no-underline transition-colors"
                                onMouseEnter={(e) => { e.currentTarget.style.color = PRIMARY_COLOR; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
                            >
                                Legal
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
                @keyframes floating {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .fade-in {
                    animation: fadeIn 0.8s ease-out;
                }
            `}</style>
        </div>
    );
}
