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
    Sparkles,
} from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";

const features = [
    {
        icon: HardDrive,
        title: "Multi-Drive Connection",
        description: "Connect and manage multiple Google Drive accounts from a single, unified dashboard.",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: Search,
        title: "Smart File Search",
        description: "AI-powered search that finds files across all your connected drives instantly.",
        color: "from-purple-500 to-pink-500",
    },
    {
        icon: Copy,
        title: "Duplicate Detection",
        description: "Automatically identify duplicate files and free up valuable storage space.",
        color: "from-orange-500 to-red-500",
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        description: "Get insights into your storage usage with comprehensive analytics and reports.",
        color: "from-green-500 to-emerald-500",
    },
    {
        icon: FolderTree,
        title: "File Organization",
        description: "Organize files effortlessly with smart tagging, folders, and custom categories.",
        color: "from-indigo-500 to-purple-500",
    },
    {
        icon: Shield,
        title: "Secure Access",
        description: "Enterprise-grade security with OAuth authentication and encrypted connections.",
        color: "from-teal-500 to-cyan-500",
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
            <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background py-20 lg:py-32">
                {/* Background decorations */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 blur-3xl" />
                </div>

                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <Badge variant="secondary" className="mb-6 px-4 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Trusted by 25,000+ users worldwide
                        </Badge>

                        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                            Manage Multiple Google Drives{" "}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                in One Place
                            </span>
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
                            Connect all your Google Drive accounts, search across drives, detect duplicates,
                            and gain powerful insights—all from a single, beautiful dashboard.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                            >
                                <Link href="/auth">
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="h-12 px-8 border-2"
                            >
                                <Link href="/price">View Pricing</Link>
                            </Button>
                        </div>

                        <p className="mt-6 text-sm text-muted-foreground">
                            No credit card required • Free forever with 2 drives
                        </p>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="relative mx-auto mt-16 max-w-5xl">
                        <div className="rounded-2xl border border-border bg-card p-4 shadow-2xl shadow-primary/10">
                            <div className="flex items-center gap-2 border-b border-border pb-3">
                                <div className="h-3 w-3 rounded-full bg-red-400" />
                                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                <div className="h-3 w-3 rounded-full bg-green-400" />
                            </div>
                            <div className="grid gap-4 pt-4 md:grid-cols-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="rounded-xl bg-muted/50 p-5 hover:bg-muted transition-colors">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                                <Cloud className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="font-semibold text-foreground">Drive {i}</span>
                                            <Badge variant="outline" className="ml-auto text-xs border-green-500/30 text-green-600 bg-green-500/10">
                                                Active
                                            </Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${30 + i * 20}%` }} />
                                            </div>
                                            <div className="h-2 w-3/4 rounded bg-border" />
                                            <div className="h-2 w-1/2 rounded bg-border" />
                                        </div>
                                        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                                            <span>{100 + i * 150} files</span>
                                            <span>{i * 3 + 2} GB</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 h-12 w-3/4 -translate-x-1/2 rounded-full bg-primary/20 blur-2xl" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-border bg-card py-16">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent md:text-5xl">
                                    {stat.value}
                                </div>
                                <div className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 lg:py-32" id="features">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-16 max-w-2xl text-center">
                        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Features</Badge>
                        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                            Everything You Need to Manage Your Drives
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Powerful features designed to simplify your cloud storage workflow
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <Card key={feature.title} className="group border border-border bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                                <CardHeader>
                                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                                        <feature.icon className="h-7 w-7" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-muted/50 py-20 lg:py-32">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-16 max-w-2xl text-center">
                        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">How It Works</Badge>
                        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                            Get Started in Minutes
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Three simple steps to unified cloud storage management
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative">
                                {index < steps.length - 1 && (
                                    <div className="absolute left-full top-12 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent md:block" />
                                )}
                                <Card className="relative border border-border bg-card hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="mb-4 text-6xl font-bold text-primary/20">
                                            {step.number}
                                        </div>
                                        <CardTitle className="text-xl">{step.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base leading-relaxed">
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
            <section className="py-20 lg:py-32">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-16 max-w-2xl text-center">
                        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Testimonials</Badge>
                        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                            Loved by Thousands of Users
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            See what our customers have to say about DriveUnity
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <Card key={testimonial.author} className="border border-border bg-card">
                                <CardContent className="pt-6">
                                    <div className="mb-4 flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="mb-6 text-muted-foreground leading-relaxed">"{testimonial.quote}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                                            {testimonial.author.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{testimonial.author}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary py-20 lg:py-24">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                </div>

                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                        Start Managing Your Drives Today
                    </h2>
                    <p className="mx-auto mb-8 max-w-xl text-lg text-white/90">
                        Join 25,000+ users who simplified their cloud storage management with DriveUnity.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            className="h-12 px-8 bg-white text-primary hover:bg-white/90 shadow-lg"
                        >
                            <Link href="/auth">
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
                        <span className="flex items-center gap-2">
                            <Check className="h-4 w-4" /> No credit card required
                        </span>
                        <span className="flex items-center gap-2">
                            <Check className="h-4 w-4" /> Free forever with 2 drives
                        </span>
                        <span className="flex items-center gap-2">
                            <Check className="h-4 w-4" /> Cancel anytime
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}
