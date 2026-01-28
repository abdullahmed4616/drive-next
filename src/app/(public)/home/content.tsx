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
import {Badge} from "@/app/components/ui/badge";
import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/components/ui/card";

const features = [
    {
        icon: HardDrive,
        title: "Multi-Drive Connection",
        description: "Connect and manage multiple Google Drive accounts from a single, unified dashboard.",
    },
    {
        icon: Search,
        title: "Smart File Search",
        description: "AI-powered search that finds files across all your connected drives instantly.",
    },
    {
        icon: Copy,
        title: "Duplicate Detection",
        description: "Automatically identify duplicate files and free up valuable storage space.",
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        description: "Get insights into your storage usage with comprehensive analytics and reports.",
    },
    {
        icon: FolderTree,
        title: "File Organization",
        description: "Organize files effortlessly with smart tagging, folders, and custom categories.",
    },
    {
        icon: Shield,
        title: "Secure Access",
        description: "Enterprise-grade security with OAuth authentication and encrypted connections.",
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
        quote: "DriveHub has completely transformed how I manage my cloud storage. I can finally find files across all my accounts instantly!",
        author: "Sarah Chen",
        role: "Freelance Designer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
    {
        quote: "The duplicate detection alone saved us over 200GB of storage. This is a must-have for any team using multiple Google accounts.",
        author: "Michael Torres",
        role: "Marketing Director",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
        quote: "As someone managing 5 different client drives, DriveHub is an absolute lifesaver. Clean, fast, and incredibly intuitive.",
        author: "Emily Watson",
        role: "Project Manager",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
];

export default function HomePage() {
    return (
        <div className="flex flex-col">
            <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
                </div>
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                            <Zap className="mr-1 h-3 w-3" />
                            Trusted by 25,000+ users worldwide
                        </Badge>
                        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                            Manage Multiple Google Drives{" "}
                            <span className="text-gradient">in One Place</span>
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                            Connect all your Google Drive accounts, search across drives, detect duplicates,
                            and gain powerful insights—all from a single, beautiful dashboard.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button variant="hero" size="xl" asChild>
                                <Link href="/signup">
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button variant="hero-outline" size="xl" asChild>
                                <Link href="/pricing">View Pricing</Link>
                            </Button>
                        </div>
                        <p className="mt-6 text-sm text-muted-foreground">
                            No credit card required • Free forever with 2 drives
                        </p>
                    </div>

                    <div className="relative mx-auto mt-16 max-w-5xl">
                        <div className="rounded-xl border border-border bg-card p-4 shadow-2xl">
                            <div className="flex items-center gap-2 border-b border-border pb-3">
                                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                                <div className="h-3 w-3 rounded-full bg-warning/60" />
                                <div className="h-3 w-3 rounded-full bg-success/60" />
                            </div>
                            <div className="grid gap-4 pt-4 md:grid-cols-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="rounded-lg bg-muted p-4">
                                        <div className="mb-3 flex items-center gap-2">
                                            <Cloud className="h-5 w-5 text-primary" />
                                            <span className="text-sm font-medium text-foreground">Drive {i}</span>
                                            <Badge variant="outline" className="ml-auto text-xs">
                                                Active
                                            </Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 w-full rounded bg-border" />
                                            <div className="h-2 w-3/4 rounded bg-border" />
                                            <div className="h-2 w-1/2 rounded bg-border" />
                                        </div>
                                        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                                            <span>{Math.floor(Math.random() * 500) + 100} files</span>
                                            <span>{Math.floor(Math.random() * 10) + 1} GB</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-primary/20 blur-2xl" />
                    </div>
                </div>
            </section>

            <section className="border-y border-border bg-card py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl font-bold text-primary md:text-4xl">
                                    {stat.value}
                                </div>
                                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 lg:py-32" id="features">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-16 max-w-2xl text-center">
                        <Badge variant="outline" className="mb-4">Features</Badge>
                        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                            Everything You Need to Manage Your Drives
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Powerful features designed to simplify your cloud storage workflow
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <Card key={feature.title} className="group hover-lift border-border bg-card">
                                <CardHeader>
                                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-muted py-20 lg:py-32">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-16 max-w-2xl text-center">
                        <Badge variant="outline" className="mb-4">How It Works</Badge>
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
                                    <div className="absolute left-full top-12 hidden h-0.5 w-full bg-border md:block" />
                                )}
                                <Card className="relative border-border bg-card">
                                    <CardHeader>
                                        <div className="mb-4 text-5xl font-bold text-primary/20">
                                            {step.number}
                                        </div>
                                        <CardTitle className="text-xl">{step.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
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
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-16 max-w-2xl text-center">
                        <Badge variant="outline" className="mb-4">Testimonials</Badge>
                        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                            Loved by Thousands of Users
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            See what our customers have to say about DriveHub
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <Card key={testimonial.author} className="border-border bg-card">
                                <CardContent className="pt-6">
                                    <div className="mb-4 flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                                        ))}
                                    </div>
                                    <p className="mb-6 text-muted-foreground">"{testimonial.quote}"</p>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.author}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-medium text-foreground">{testimonial.author}</p>
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
            <section className="relative overflow-hidden bg-gradient-primary py-20 lg:py-24">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
                </div>
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
                        Start Managing Your Drives Today
                    </h2>
                    <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/80">
                        Join 25,000+ users who simplified their cloud storage management with DriveHub.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button size="xl" variant="secondary" asChild>
                            <Link href="/signup">
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/80">
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