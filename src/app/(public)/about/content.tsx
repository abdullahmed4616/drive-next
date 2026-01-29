'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X, Check, Lightbulb, Shield, TrendingUp, Sparkles, Target } from 'lucide-react';
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";

const values = [
    {
        icon: Lightbulb,
        title: "Simplicity",
        description: "Intuitive and easy-to-use tools that anyone can master.",
        color: "from-yellow-500 to-orange-500",
    },
    {
        icon: Shield,
        title: "Security",
        description: "Your data is protected with enterprise-grade encryption.",
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: TrendingUp,
        title: "Efficiency",
        description: "Boost productivity and save valuable time every day.",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: Sparkles,
        title: "Innovation",
        description: "Cutting-edge features powered by the latest technology.",
        color: "from-purple-500 to-pink-500",
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
            <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background py-20 lg:py-28">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-3xl" />
                </div>

                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center">
                        <Badge className="mb-6 px-4 py-2 bg-primary text-white">
                            About DriveUnity
                        </Badge>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            Learn About{' '}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                DriveUnity
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                            DriveUnity unifies all your cloud drives in one dashboard. Simplify, organize,
                            and secure your digital world with modern automation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <Card className="border border-border bg-card p-8">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                                Our Mission & Vision
                            </h3>
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                                Our mission is to revolutionize how users manage multiple cloud drives efficiently.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Our vision is to become the most trusted platform for unified cloud storage management.
                            </p>
                        </Card>

                        <Card className="border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-8 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <Target className="w-10 h-10 text-white" />
                                </div>
                                <p className="text-lg font-semibold text-foreground">Building the future of</p>
                                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Cloud Management
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Challenges & Solutions Section */}
            <section className="py-16 lg:py-24 bg-muted/30">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            Challenges & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Solutions</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Challenges */}
                        <Card className="border border-border bg-card p-6">
                            <h3 className="text-xl font-bold text-foreground mb-6">The Challenges You Face</h3>
                            <div className="space-y-4">
                                {challenges.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                                        <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                                            <X className="w-4 h-4 text-destructive" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{item.title}</p>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Solutions */}
                        <Card className="border border-border bg-card p-6">
                            <h3 className="text-xl font-bold text-foreground mb-6">DriveUnity's Seamless Solutions</h3>
                            <div className="space-y-4">
                                {solutions.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Check className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{item.title}</p>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            Our Core <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Values</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, idx) => (
                            <Card key={idx} className="border border-border bg-card p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                    <value.icon className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-lg font-bold text-foreground mb-2">{value.title}</h4>
                                <p className="text-sm text-muted-foreground">{value.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 lg:py-24 bg-muted/30">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            The passionate people behind DriveUnity working to simplify your cloud experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, idx) => (
                            <Card key={idx} className="border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 text-center">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <h4 className="font-bold text-lg text-foreground">{member.name}</h4>
                                    <p className="text-sm font-medium text-primary mb-2">{member.role}</p>
                                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge className="mb-4 bg-primary text-white">Our Story</Badge>
                            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                                Born from Frustration, Built with Purpose
                            </h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
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
                                    efficiently. We're just getting started on our mission to make cloud storage
                                    management effortless for everyone.
                                </p>
                            </div>
                        </div>

                        <Card className="border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
                            <div className="grid grid-cols-2 gap-6">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="text-center p-4">
                                        <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                            {stat.value}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Card className="bg-gradient-to-r from-primary to-secondary p-8 md:p-12 rounded-2xl text-center border-0">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Simplify Your Cloud?
                        </h2>
                        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                            Join thousands of users transforming their multi-cloud experience.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-primary hover:bg-white/90"
                                onClick={() => router.push('/auth')}
                            >
                                Connect Your Drive
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white/10"
                                onClick={() => router.push('/price')}
                            >
                                Explore Plans
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}
