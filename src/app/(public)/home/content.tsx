'use client';

import { useState } from "react";
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
    Sparkles,
    Command,
    FileText,
    Image,
    FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/app/components/ui/badge";

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
        title: "AI-Powered Search",
        description: "Natural language search that understands intent and finds files across all your connected drives.",
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

const searchSuggestions = [
    "budget reports from last quarter",
    "marketing assets shared with me",
    "presentation files over 10MB",
];

export default function HomePage() {
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-44">
                {/* Background effects */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-primary/[0.06] blur-[120px]" />
                    <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/[0.04] blur-[100px]" />
                    <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/[0.03] blur-[80px]" />
                </div>

                <div className="container content-wide space-container">
                    <div className="content-default text-center">
                        <div className="inline-flex items-center inline-sm rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-white/60 mb-10 backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Trusted by 25,000+ users worldwide
                        </div>

                        <h1 className="mb-8 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                            All your cloud drives,{" "}
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
                                one workspace
                            </span>
                        </h1>

                        <p className="content-narrow mb-12 text-lg text-white/45 leading-relaxed">
                            Connect multiple Google Drive accounts, search across all files, detect duplicates, and get actionable insights — from a single dashboard.
                        </p>

                        {/* AI Search Bar */}
                        <div className="mx-auto max-w-2xl mb-10">
                            <div
                                className={`relative rounded-2xl border transition-all duration-300 ${
                                    searchFocused
                                        ? 'border-primary/40 shadow-glow bg-white/[0.06]'
                                        : 'border-white/[0.08] bg-white/[0.03]'
                                }`}
                            >
                                <div className="flex items-center px-5 py-4">
                                    <Sparkles size={20} className={`mr-3 transition-colors ${searchFocused ? 'text-primary' : 'text-white/30'}`} />
                                    <input
                                        type="text"
                                        placeholder="Search across all your drives with AI..."
                                        className="flex-1 bg-transparent text-white/90 placeholder:text-white/30 outline-none text-base"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setSearchFocused(true)}
                                        onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                                    />
                                    <div className="hidden sm:flex items-center gap-1.5 text-white/20 text-xs border border-white/[0.08] rounded-lg px-2 py-1">
                                        <Command size={12} />
                                        <span>K</span>
                                    </div>
                                </div>

                                {/* Search suggestions dropdown */}
                                {searchFocused && (
                                    <div className="border-t border-white/[0.06] px-5 py-3 stack-sm">
                                        <p className="text-[11px] font-medium text-white/25 uppercase tracking-wider mb-2">Try asking</p>
                                        {searchSuggestions.map((suggestion) => (
                                            <button
                                                key={suggestion}
                                                className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-colors flex items-center gap-2.5"
                                                onClick={() => setSearchQuery(suggestion)}
                                            >
                                                <Search size={14} className="text-white/20" />
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center inline-md sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="h-13 px-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold shadow-xl shadow-blue-500/20 transition-all duration-300 border-0 text-base"
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
                                className="h-13 px-8 font-semibold border-white/[0.1] text-white/60 hover:text-white hover:bg-white/[0.04] bg-transparent text-base"
                            >
                                <Link href="/price">View Pricing</Link>
                            </Button>
                        </div>

                        <p className="mt-6 text-xs text-white/25">
                            No credit card required &middot; Free forever with 2 drives
                        </p>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="relative mx-auto mt-24 max-w-4xl">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/8 via-secondary/8 to-primary/8 rounded-3xl blur-xl" />
                        <div className="relative rounded-2xl border border-white/[0.06] bg-card/80 p-4 shadow-2xl backdrop-blur-sm">
                            {/* Browser chrome */}
                            <div className="flex items-center inline-sm px-2 pb-4">
                                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                <div className="ml-3 h-6 flex-1 rounded-lg bg-white/[0.03] flex items-center px-3">
                                    <Search size={12} className="text-white/20 mr-2" />
                                    <span className="text-xs text-white/20">Search files across all drives...</span>
                                </div>
                            </div>

                            {/* Dashboard content mockup */}
                            <div className="grid gap-grid md:grid-cols-3">
                                {[
                                    { name: "Personal Drive", files: 250, used: 5, pct: 50, color: "from-blue-500 to-blue-600" },
                                    { name: "Work Drive", files: 1200, used: 12, pct: 70, color: "from-indigo-500 to-indigo-600" },
                                    { name: "Client Drive", files: 480, used: 8, pct: 40, color: "from-cyan-500 to-cyan-600" },
                                ].map((drive) => (
                                    <div key={drive.name} className="rounded-xl bg-white/[0.02] border border-white/[0.05] space-card-sm hover:bg-white/[0.04] transition-colors">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${drive.color} flex items-center justify-center`}>
                                                <Cloud className="h-4 w-4 text-white" />
                                            </div>
                                            <span className="font-semibold text-sm text-white/85">{drive.name}</span>
                                            <span className="ml-auto text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                                                Active
                                            </span>
                                        </div>
                                        <div className="stack-sm">
                                            <div className="h-1.5 w-full rounded-full bg-white/[0.05] overflow-hidden">
                                                <div className={`h-full bg-gradient-to-r ${drive.color} rounded-full`} style={{ width: `${drive.pct}%` }} />
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between text-xs text-white/35">
                                            <span>{drive.files} files</span>
                                            <span>{drive.used} GB used</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Recent files row */}
                            <div className="mt-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-card-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Recent Files</span>
                                    <span className="text-xs text-primary/60">View all</span>
                                </div>
                                <div className="stack-sm">
                                    {[
                                        { name: "Q4 Budget Report.xlsx", icon: FileSpreadsheet, color: "text-emerald-400", size: "2.4 MB" },
                                        { name: "Brand Guidelines.pdf", icon: FileText, color: "text-red-400", size: "8.1 MB" },
                                        { name: "Hero Banner.png", icon: Image, color: "text-blue-400", size: "3.7 MB" },
                                    ].map((file) => (
                                        <div key={file.name} className="flex items-center gap-3 py-2">
                                            <file.icon size={16} className={file.color} />
                                            <span className="text-sm text-white/60 flex-1">{file.name}</span>
                                            <span className="text-xs text-white/25">{file.size}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="space-section border-y border-white/[0.05]">
                <div className="container content-wide space-container">
                    <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-12">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl font-extrabold text-white md:text-4xl">
                                    {stat.value}
                                </div>
                                <div className="mt-2 text-sm text-white/35">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="space-section-lg" id="features">
                <div className="container content-wide space-container">
                    <div className="content-narrow space-heading text-center">
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Features</p>
                        <h2 className="mb-5 text-3xl font-extrabold text-white md:text-4xl tracking-tight">
                            Everything you need to manage your drives
                        </h2>
                        <p className="text-white/40 text-lg leading-relaxed">
                            Powerful tools designed to simplify your cloud storage workflow.
                        </p>
                    </div>

                    <div className="grid gap-grid-lg md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="group rounded-2xl border border-white/[0.05] bg-white/[0.02] space-card hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                            >
                                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient}`}>
                                    <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="space-section-lg border-y border-white/[0.05]">
                <div className="container content-wide space-container">
                    <div className="content-narrow space-heading text-center">
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">How It Works</p>
                        <h2 className="mb-5 text-3xl font-extrabold text-white md:text-4xl tracking-tight">
                            Get started in minutes
                        </h2>
                        <p className="text-white/40 text-lg leading-relaxed">
                            Three simple steps to unified cloud storage management.
                        </p>
                    </div>

                    <div className="grid gap-grid-lg md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative">
                                {index < steps.length - 1 && (
                                    <div className="absolute left-full top-12 hidden h-px w-full bg-gradient-to-r from-white/[0.06] to-transparent md:block" style={{ width: 'calc(100% - 3rem)' }} />
                                )}
                                <div className="relative rounded-2xl border border-white/[0.05] bg-white/[0.02] space-card hover:bg-white/[0.04] transition-colors">
                                    <div className="mb-4 text-5xl font-extrabold bg-gradient-to-b from-white/8 to-transparent bg-clip-text text-transparent">
                                        {step.number}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-sm text-white/40 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="space-section-lg">
                <div className="container content-wide space-container">
                    <div className="content-narrow space-heading text-center">
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Testimonials</p>
                        <h2 className="mb-5 text-3xl font-extrabold text-white md:text-4xl tracking-tight">
                            Loved by thousands of users
                        </h2>
                        <p className="text-white/40 text-lg leading-relaxed">
                            See what our customers have to say about DriveUnity.
                        </p>
                    </div>

                    <div className="grid gap-grid-lg md:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.author} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] space-card hover:bg-white/[0.03] transition-colors">
                                <div className="mb-5 flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-amber-400/80 text-amber-400/80" />
                                    ))}
                                </div>
                                <p className="mb-8 text-sm text-white/45 leading-relaxed">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-5 border-t border-white/[0.05]">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary text-xs font-bold">
                                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white/85">{testimonial.author}</p>
                                        <p className="text-xs text-white/35 mt-0.5">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden space-section-lg">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-primary/[0.06] blur-[100px]" />
                    <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-secondary/[0.06] blur-[100px]" />
                </div>

                <div className="container content-wide space-container">
                    <div className="mx-auto max-w-2xl text-center rounded-3xl border border-white/[0.06] bg-white/[0.02] space-card-lg backdrop-blur-sm">
                        <h2 className="mb-5 text-3xl font-extrabold text-white md:text-4xl tracking-tight">
                            Ready to simplify your cloud storage?
                        </h2>
                        <p className="content-narrow mb-10 text-lg text-white/40">
                            Join 25,000+ users who manage their drives smarter with DriveUnity.
                        </p>

                        <div className="flex flex-col items-center justify-center inline-md sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="h-13 px-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold shadow-xl shadow-blue-500/20 border-0 text-base"
                            >
                                <Link href="/auth">
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="mt-10 flex flex-wrap items-center justify-center inline-lg text-sm text-white/30">
                            <span className="flex items-center inline-sm">
                                <Check className="h-3.5 w-3.5 text-emerald-400/60" /> No credit card required
                            </span>
                            <span className="flex items-center inline-sm">
                                <Check className="h-3.5 w-3.5 text-emerald-400/60" /> Free forever with 2 drives
                            </span>
                            <span className="flex items-center inline-sm">
                                <Check className="h-3.5 w-3.5 text-emerald-400/60" /> Cancel anytime
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
