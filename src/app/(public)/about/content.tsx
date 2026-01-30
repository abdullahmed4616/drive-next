'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X, Check, Lightbulb, Shield, TrendingUp, Sparkles, Target, ArrowRight } from 'lucide-react';
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/badge";

const values = [
    {
        icon: Lightbulb,
        title: "Simplicity",
        description: "Intuitive and easy-to-use tools that anyone can master.",
        gradient: "from-yellow-500/20 to-orange-500/20",
        iconColor: "text-yellow-400",
    },
    {
        icon: Shield,
        title: "Security",
        description: "Your data is protected with enterprise-grade encryption.",
        gradient: "from-green-500/20 to-emerald-500/20",
        iconColor: "text-green-400",
    },
    {
        icon: TrendingUp,
        title: "Efficiency",
        description: "Boost productivity and save valuable time every day.",
        gradient: "from-blue-500/20 to-cyan-500/20",
        iconColor: "text-blue-400",
    },
    {
        icon: Sparkles,
        title: "Innovation",
        description: "Cutting-edge features powered by the latest technology.",
        gradient: "from-purple-500/20 to-pink-500/20",
        iconColor: "text-purple-400",
    },
];

const challenges = [
    { title: "Fragmented Storage", description: "Multiple cloud drives scattered across platforms." },
    { title: "Lost Productivity", description: "Inefficient management slows down workflows." },
    { title: "Duplicate Data", description: "Unnecessary file copies consume storage." },
];

const solutions = [
    { title: "Unified Access", description: "One dashboard for all drives." },
    { title: "Smart Automation", description: "Manage files efficiently and remove duplicates." },
    { title: "Optimized Storage", description: "Maximize storage efficiency." },
];

const team = [
    { name: "Sarah Chen", role: "CEO & Co-founder", bio: "10+ years in cloud technology and product leadership" },
    { name: "Michael Rodriguez", role: "CTO & Co-founder", bio: "Former Google engineer, cloud infrastructure expert" },
    { name: "Emily Watson", role: "Head of Design", bio: "Award-winning UX designer focused on simplicity" },
    { name: "David Kim", role: "Head of Engineering", bio: "Scaling distributed systems for millions of users" },
];

const stats = [
    { value: "2023", label: "Founded" },
    { value: "50K+", label: "Active Users" },
    { value: "1M+", label: "Files Managed" },
    { value: "15+", label: "Team Members" },
];

export default function AboutPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 lg:py-32">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-[120px]" />
                    <div className="absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-secondary/[0.05] blur-[100px]" />
                </div>

                <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
                    <div className="flex flex-col items-center text-center">
                        <Badge className="mb-6 px-4 py-1.5 bg-primary/10 text-primary border border-primary/20">
                            About DriveUnity
                        </Badge>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            Learn About{' '}
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
                                DriveUnity
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/40 max-w-2xl leading-relaxed">
                            DriveUnity unifies all your cloud drives in one dashboard. Simplify, organize,
                            and secure your digital world with modern automation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-8">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
                                Our Mission & Vision
                            </h3>
                            <p className="text-white/40 mb-4 leading-relaxed">
                                Our mission is to revolutionize how users manage multiple cloud drives efficiently.
                            </p>
                            <p className="text-white/40 leading-relaxed">
                                Our vision is to become the most trusted platform for unified cloud storage management.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/[0.05] bg-gradient-to-br from-primary/5 to-secondary/5 p-8 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                                    <Target className="w-10 h-10 text-white" />
                                </div>
                                <p className="text-lg font-semibold text-white/70">Building the future of</p>
                                <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                    Cloud Management
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenges & Solutions Section */}
            <section className="py-20 lg:py-28 border-y border-white/[0.05]">
                <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Challenges &{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Solutions</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Challenges */}
                        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6">
                            <h3 className="text-xl font-bold text-white mb-6">The Challenges You Face</h3>
                            <div className="space-y-3">
                                {challenges.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-red-500/[0.04] border border-red-500/10">
                                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                                            <X className="w-4 h-4 text-red-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white/80">{item.title}</p>
                                            <p className="text-sm text-white/40">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Solutions */}
                        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6">
                            <h3 className="text-xl font-bold text-white mb-6">DriveUnity&apos;s Seamless Solutions</h3>
                            <div className="space-y-3">
                                {solutions.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-primary/[0.04] border border-primary/10">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Check className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white/80">{item.title}</p>
                                            <p className="text-sm text-white/40">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Our Core{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Values</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {values.map((value, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 text-center hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300">
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-4`}>
                                    <value.icon className={`w-8 h-8 ${value.iconColor}`} />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">{value.title}</h4>
                                <p className="text-sm text-white/40">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 lg:py-28 border-y border-white/[0.05]">
                <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4 tracking-tight">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-white/40 max-w-2xl mx-auto">
                            The passionate people behind DriveUnity working to simplify your cloud experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {team.map((member, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] overflow-hidden hover:bg-white/[0.04] transition-colors">
                                <div className="p-6 text-center">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <h4 className="font-bold text-lg text-white/85">{member.name}</h4>
                                    <p className="text-sm font-medium text-primary mb-2">{member.role}</p>
                                    <p className="text-sm text-white/40">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20">Our Story</Badge>
                            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6 tracking-tight">
                                Born from Frustration, Built with Purpose
                            </h2>
                            <div className="space-y-4 text-white/40 leading-relaxed">
                                <p>
                                    In 2023, our founders experienced firsthand the chaos of managing multiple cloud drives
                                    across personal and work accounts. Switching between tabs, losing track of files,
                                    and dealing with duplicate storage became daily frustrations.
                                </p>
                                <p>
                                    That frustration sparked an idea: What if there was one platform to unify them all?
                                    DriveUnity was born from that vision—a simple, powerful solution that brings all
                                    your cloud storage together in one intelligent dashboard.
                                </p>
                                <p>
                                    Today, thousands of users trust DriveUnity to manage their digital lives more
                                    efficiently. We&apos;re just getting started on our mission to make cloud storage
                                    management effortless for everyone.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/[0.05] bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
                            <div className="grid grid-cols-2 gap-6">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="text-center p-4">
                                        <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                            {stat.value}
                                        </p>
                                        <p className="text-sm text-white/40 mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
                    <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-r from-primary/10 to-secondary/10 p-8 md:p-12 text-center">
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-primary/[0.08] blur-[100px]" />
                            <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-secondary/[0.08] blur-[100px]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                            Ready to Simplify Your Cloud?
                        </h2>
                        <p className="text-lg text-white/45 max-w-2xl mx-auto mb-8">
                            Join thousands of users transforming their multi-cloud experience.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold shadow-xl shadow-blue-500/20 border-0"
                                onClick={() => router.push('/auth')}
                            >
                                Connect Your Drive
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/[0.1] text-white/60 hover:text-white hover:bg-white/[0.04] bg-transparent"
                                onClick={() => router.push('/price')}
                            >
                                Explore Plans
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
