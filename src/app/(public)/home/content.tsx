'use client';

import { Button } from "@/app/components/ui/Button";
import {
    Cloud,
    HardDrive,
    Search,
    Copy,
    BarChart3,
    FolderTree,
    Shield,
    ArrowRight,
    Check,
    Star,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";

const features = [
    {
        icon: HardDrive,
        title: "Multi-Drive Connection",
        description: "Connect and manage multiple Google Drive accounts from a single, unified dashboard.",
        gradient: "from-blue-500/20 to-indigo-500/20",
        iconColor: "text-blue-400",
    },
    {
        icon: Search,
        title: "Smart File Search",
        description: "AI-powered search that finds files across all your connected drives instantly.",
        gradient: "from-cyan-500/20 to-blue-500/20",
        iconColor: "text-cyan-400",
    },
    {
        icon: Copy,
        title: "Duplicate Detection",
        description: "Automatically identify duplicate files and free up valuable storage space.",
        gradient: "from-amber-500/20 to-orange-500/20",
        iconColor: "text-amber-400",
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        description: "Get insights into your storage usage with comprehensive analytics and reports.",
        gradient: "from-emerald-500/20 to-teal-500/20",
        iconColor: "text-emerald-400",
    },
    {
        icon: FolderTree,
        title: "File Organization",
        description: "Organize files effortlessly with smart tagging, folders, and custom categories.",
        gradient: "from-purple-500/20 to-violet-500/20",
        iconColor: "text-purple-400",
    },
    {
        icon: Shield,
        title: "Secure Access",
        description: "Enterprise-grade security with OAuth authentication and encrypted connections.",
        gradient: "from-teal-500/20 to-cyan-500/20",
        iconColor: "text-teal-400",
    },
];

const steps = [
    {
        number: "01",
        title: "Connect Your Drives",
        description: "Link your Google Drive accounts with secure OAuth authentication in seconds.",
    },
    {
        number: "02",
        title: "Analyze & Organize",
        description: "Let our AI analyze your files, find duplicates, and suggest optimizations.",
    },
    {
        number: "03",
        title: "Manage Efficiently",
        description: "Search, organize, and manage all your files from one powerful dashboard.",
    },
];

const stats = [
    { value: "50K+", label: "Connected Drives" },
    { value: "10M+", label: "Files Managed" },
    { value: "25K+", label: "Happy Users" },
    { value: "99.9%", label: "Uptime" },
];

const testimonials = [
    {
        quote: "DriveUnity has completely transformed how I manage my cloud storage. I can finally find files across all my accounts instantly!",
        author: "Sarah Chen",
        role: "Freelance Designer",
    },
    {
        quote: "The duplicate detection alone saved us over 200GB of storage. This is a must-have for any team using multiple Google accounts.",
        author: "Michael Torres",
        role: "Marketing Director",
    },
    {
        quote: "As someone managing 5 different client drives, DriveUnity is an absolute lifesaver. Clean, fast, and incredibly intuitive.",
        author: "Emily Watson",
        role: "Project Manager",
    },
];

export default function HomePage() {
    return (
        <div className="flex flex-col bg-[#0a0f1a]">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-28 lg:pt-32 lg:pb-40">
                {/* Background effects */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-blue-600/[0.07] blur-[120px]" />
                    <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/[0.05] blur-[100px]" />
                </div>

                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-white/70 mb-8 backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Trusted by 25,000+ users worldwide
                        </div>

                        <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                            All your cloud drives,{" "}
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
                                one workspace
                            </span>
                        </h1>

                        <p className="mx-auto mb-10 max-w-xl text-lg text-white/50 leading-relaxed">
                            Connect multiple Google Drive accounts, search across all files, detect duplicates, and get actionable insights — from a single dashboard.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="h-13 px-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold shadow-xl shadow-blue-500/25 transition-all duration-300 border-0 text-base"
                            >
                                <Link href="/auth">
                                    Start for Free
                                    <span className="ml-2 text-xs font-normal bg-white/20 px-2 py-0.5 rounded-full">No card required</span>
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="h-13 px-8 font-semibold border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.06] bg-transparent text-base"
                            >
                                <Link href="/price">View Pricing</Link>
                            </Button>
                        </div>

                        <p className="mt-5 text-xs text-white/30">
                            No credit card required &middot; Free forever with 2 drives
                        </p>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="relative mx-auto mt-20 max-w-4xl">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 rounded-3xl blur-xl" />
                        <div className="relative rounded-2xl border border-white/[0.08] bg-[#0d1321]/90 p-3 shadow-2xl backdrop-blur-sm">
                            <div className="flex items-center gap-1.5 px-1 pb-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                                <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                                <div className="ml-3 h-5 flex-1 rounded-md bg-white/[0.04]" />
                            </div>
                            <div className="grid gap-3 md:grid-cols-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 hover:bg-white/[0.05] transition-colors">
                                        <div className="mb-3 flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                                <Cloud className="h-4 w-4 text-blue-400" />
                                            </div>
                                            <span className="font-semibold text-sm text-white/90">Drive {i}</span>
                                            <span className="ml-auto text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">
                                                Active
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${30 + i * 20}%` }} />
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between text-xs text-white/40">
                                            <span>{100 + i * 150} files</span>
                                            <span>{i * 3 + 2} GB used</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 lg:py-20 border-y border-white/[0.06]">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl font-extrabold text-white md:text-4xl">
                                    {stat.value}
                                </div>
                                <div className="mt-1.5 text-sm text-white/40">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 lg:py-28" id="features">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-14 max-w-xl text-center">
                        <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Features</p>
                        <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl tracking-tight">
                            Everything you need to manage your drives
                        </h2>
                        <p className="text-white/50 text-lg leading-relaxed">
                            Powerful tools designed to simplify your cloud storage workflow.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
                            >
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient}`}>
                                    <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-white/45 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 lg:py-28 border-y border-white/[0.06]">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-14 max-w-xl text-center">
                        <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">How It Works</p>
                        <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl tracking-tight">
                            Get started in minutes
                        </h2>
                        <p className="text-white/50 text-lg leading-relaxed">
                            Three simple steps to unified cloud storage management.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative">
                                {index < steps.length - 1 && (
                                    <div className="absolute left-full top-12 hidden h-px w-full bg-gradient-to-r from-white/[0.08] to-transparent md:block" style={{ width: 'calc(100% - 2rem)' }} />
                                )}
                                <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                                    <div className="mb-3 text-5xl font-extrabold bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent">
                                        {step.number}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-sm text-white/45 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-14 max-w-xl text-center">
                        <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Testimonials</p>
                        <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl tracking-tight">
                            Loved by thousands of users
                        </h2>
                        <p className="text-white/50 text-lg leading-relaxed">
                            See what our customers have to say about DriveUnity.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.author} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                                <div className="mb-4 flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="mb-6 text-sm text-white/50 leading-relaxed">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">{testimonial.author}</p>
                                        <p className="text-xs text-white/40">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden py-20 lg:py-24">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-blue-600/[0.08] blur-[100px]" />
                    <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-indigo-600/[0.08] blur-[100px]" />
                </div>

                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-12 backdrop-blur-sm">
                        <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl tracking-tight">
                            Ready to simplify your cloud storage?
                        </h2>
                        <p className="mx-auto mb-8 max-w-lg text-lg text-white/50">
                            Join 25,000+ users who manage their drives smarter with DriveUnity.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="h-13 px-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold shadow-xl shadow-blue-500/25 border-0 text-base"
                            >
                                <Link href="/auth">
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/35">
                            <span className="flex items-center gap-2">
                                <Check className="h-3.5 w-3.5 text-emerald-400/70" /> No credit card required
                            </span>
                            <span className="flex items-center gap-2">
                                <Check className="h-3.5 w-3.5 text-emerald-400/70" /> Free forever with 2 drives
                            </span>
                            <span className="flex items-center gap-2">
                                <Check className="h-3.5 w-3.5 text-emerald-400/70" /> Cancel anytime
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
