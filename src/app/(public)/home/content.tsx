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
    Users,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";

const features = [
    {
        icon: HardDrive,
        title: "Multi-Drive Connection",
        description: "Connect and manage multiple Google Drive accounts from a single, unified dashboard.",
        iconBg: "bg-indigo-50 text-indigo-600",
    },
    {
        icon: Search,
        title: "Smart File Search",
        description: "AI-powered search that finds files across all your connected drives instantly.",
        iconBg: "bg-blue-50 text-blue-600",
    },
    {
        icon: Copy,
        title: "Duplicate Detection",
        description: "Automatically identify duplicate files and free up valuable storage space.",
        iconBg: "bg-amber-50 text-amber-600",
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        description: "Get insights into your storage usage with comprehensive analytics and reports.",
        iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
        icon: FolderTree,
        title: "File Organization",
        description: "Organize files effortlessly with smart tagging, folders, and custom categories.",
        iconBg: "bg-purple-50 text-purple-600",
    },
    {
        icon: Shield,
        title: "Secure Access",
        description: "Enterprise-grade security with OAuth authentication and encrypted connections.",
        iconBg: "bg-teal-50 text-teal-600",
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
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-hero pt-16 pb-24 lg:pt-28 lg:pb-36">
                {/* Subtle background decoration */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/[0.03] blur-3xl" />
                </div>

                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8">
                            <Zap className="h-3.5 w-3.5" />
                            Trusted by 25,000+ users worldwide
                        </div>

                        <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            All your cloud drives,{" "}
                            <span className="text-gradient">
                                one workspace
                            </span>
                        </h1>

                        <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground leading-relaxed">
                            Connect multiple Google Drive accounts, search across all files, detect duplicates, and get actionable insights — from a single dashboard.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 px-7 bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 transition-all duration-300"
                            >
                                <Link href="/auth">
                                    Start for Free
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="h-12 px-7 font-semibold border-border/80 text-foreground hover:bg-muted/50"
                            >
                                <Link href="/price">View Pricing</Link>
                            </Button>
                        </div>

                        <p className="mt-5 text-xs text-muted-foreground">
                            No credit card required &middot; Free forever with 2 drives
                        </p>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="relative mx-auto mt-20 max-w-4xl">
                        <div className="rounded-2xl border border-border/60 bg-card p-3 shadow-xl">
                            <div className="flex items-center gap-1.5 px-1 pb-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                                <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                                <div className="ml-3 h-5 flex-1 rounded-md bg-muted/60" />
                            </div>
                            <div className="grid gap-3 md:grid-cols-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="rounded-xl bg-muted/40 p-4 hover:bg-muted/60 transition-colors">
                                        <div className="mb-3 flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Cloud className="h-4 w-4 text-primary" />
                                            </div>
                                            <span className="font-semibold text-sm text-foreground">Drive {i}</span>
                                            <span className="ml-auto text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                                                Active
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: `${30 + i * 20}%` }} />
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
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
            <section className="py-16 lg:py-20 border-b border-border/40">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl font-extrabold text-foreground md:text-4xl">
                                    {stat.value}
                                </div>
                                <div className="mt-1.5 text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 lg:py-28" id="features">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-14 max-w-xl text-center">
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Features</p>
                        <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl tracking-tight">
                            Everything you need to manage your drives
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Powerful tools designed to simplify your cloud storage workflow.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <Card key={feature.title} className="group border border-border/50 bg-card hover:shadow-lg hover:border-border transition-all duration-300">
                                <CardHeader className="pb-3">
                                    <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconBg}`}>
                                        <feature.icon className="h-5 w-5" />
                                    </div>
                                    <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-muted/30 py-20 lg:py-28">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-14 max-w-xl text-center">
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How It Works</p>
                        <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl tracking-tight">
                            Get started in minutes
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Three simple steps to unified cloud storage management.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative">
                                {index < steps.length - 1 && (
                                    <div className="absolute left-full top-12 hidden h-px w-full bg-border md:block" style={{ width: 'calc(100% - 2rem)' }} />
                                )}
                                <Card className="relative border border-border/50 bg-card">
                                    <CardHeader>
                                        <div className="mb-2 text-5xl font-extrabold text-primary/10">
                                            {step.number}
                                        </div>
                                        <CardTitle className="text-lg font-bold">{step.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm leading-relaxed">
                                            {step.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-14 max-w-xl text-center">
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Testimonials</p>
                        <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl tracking-tight">
                            Loved by thousands of users
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            See what our customers have to say about DriveUnity.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <Card key={testimonial.author} className="border border-border/50 bg-card">
                                <CardContent className="pt-6">
                                    <div className="mb-4 flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                            {testimonial.author.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
                                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden bg-foreground py-20 lg:py-24">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
                </div>

                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl tracking-tight">
                        Ready to simplify your cloud storage?
                    </h2>
                    <p className="mx-auto mb-8 max-w-lg text-lg text-white/70">
                        Join 25,000+ users who manage their drives smarter with DriveUnity.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            className="h-12 px-7 bg-white text-foreground hover:bg-white/90 font-semibold shadow-lg"
                        >
                            <Link href="/auth">
                                Get Started Free
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
                        <span className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5" /> No credit card required
                        </span>
                        <span className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5" /> Free forever with 2 drives
                        </span>
                        <span className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5" /> Cancel anytime
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}
