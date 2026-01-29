'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Rocket, Crown, Zap, Shield, TrendingUp, Star, ArrowRight, Minus } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Switch } from "@/app/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table";

const pricingPlans = [
    {
        id: 'free',
        title: 'Free',
        subtitle: 'Perfect for getting started',
        monthlyPrice: 0,
        yearlyPrice: 0,
        icon: Sparkles,
        features: [
            '1 Connected Google Drive',
            'Basic File Organization',
            'Unlimited File Indexing',
            'Advanced Filtration',
            '5GB Storage Analytics',
            'Email Support',
        ],
        popular: false,
    },
    {
        id: 'basic',
        title: 'Basic',
        subtitle: 'Best for small teams',
        monthlyPrice: 9.99,
        yearlyPrice: 99.99,
        icon: Rocket,
        features: [
            'Up to 3 Connected Drives',
            'Unlimited File Indexing',
            'Advanced Filtration',
            'AI Semantic Search',
            'Move Files Between Drives',
            '1,000 File Movements/Month',
            'Priority Email Support',
            'Duplicate File Detection',
        ],
        popular: true,
        badge: 'Most Popular',
    },
    {
        id: 'pro',
        title: 'Pro',
        subtitle: 'For power users & agencies',
        monthlyPrice: 19.99,
        yearlyPrice: 199.99,
        icon: Crown,
        features: [
            'Unlimited Connected Drives',
            'Unlimited File Indexing',
            'Advanced Filtration',
            'AI Semantic Search',
            'Move Files Between Drives',
            'Unlimited File Movements',
            'Priority Support (24/7)',
            'Duplicate File Detection',
        ],
        popular: false,
    },
];

const features = [
    { icon: Zap, title: 'Lightning Fast', description: 'Instant file search across all drives' },
    { icon: Shield, title: 'Bank-Level Security', description: 'Your data is encrypted and secure' },
    { icon: TrendingUp, title: 'Smart Analytics', description: 'Detailed insights into your storage' },
    { icon: Sparkles, title: 'AI-Powered', description: 'Intelligent file organization' },
];

const faqs = [
    { question: "Can I change my plan later?", answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate the difference." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely." },
    { question: "Is there a free trial?", answer: "Yes! Our Free plan is completely free forever. You can also try Basic or Pro plans with a 14-day money-back guarantee." },
    { question: "Can I cancel anytime?", answer: "Absolutely. You can cancel your subscription at any time with no questions asked. Your data remains accessible until the end of your billing period." },
];

const comparisonFeatures = [
    { feature: "Connected Drives", free: "1", basic: "3", pro: "Unlimited" },
    { feature: "File Indexing", free: "Unlimited", basic: "Unlimited", pro: "Unlimited" },
    { feature: "Advanced Filtration", free: true, basic: true, pro: true },
    { feature: "AI Semantic Search", free: false, basic: true, pro: true },
    { feature: "Move Files Between Drives", free: false, basic: "1,000/month", pro: "Unlimited" },
    { feature: "Duplicate Detection", free: false, basic: true, pro: true },
    { feature: "Storage Analytics", free: "5 GB", basic: "Unlimited", pro: "Unlimited" },
    { feature: "API Access", free: false, basic: false, pro: true },
    { feature: "Priority Support", free: false, basic: "Email", pro: "24/7" },
    { feature: "Team Collaboration", free: false, basic: false, pro: true },
];

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const renderValue = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            return value ? (
                <div className="w-6 h-6 rounded-full flex items-center justify-center mx-auto bg-green-500/10">
                    <Check size={14} className="text-green-600" />
                </div>
            ) : (
                <div className="w-6 h-6 rounded-full flex items-center justify-center mx-auto bg-muted">
                    <Minus size={14} className="text-muted-foreground" />
                </div>
            );
        }
        return <span className="font-medium text-foreground">{value}</span>;
    };

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
                            <Sparkles className="mr-2 h-4 w-4" />
                            Simple, Transparent Pricing
                        </Badge>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            Choose the{' '}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Perfect Plan
                            </span>{' '}
                            for Your Needs
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                            Start with a free plan and upgrade as you grow. All plans include
                            our core features with no hidden fees.
                        </p>

                        {/* Billing Toggle */}
                        <div className="flex items-center gap-4 bg-card p-2 px-6 rounded-full border border-border shadow-lg">
                            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-primary' : 'text-muted-foreground'}`}>
                                Monthly
                            </span>
                            <Switch
                                checked={billingCycle === 'yearly'}
                                onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
                            />
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-primary' : 'text-muted-foreground'}`}>
                                    Yearly
                                </span>
                                <Badge className="bg-green-500 text-white">Save 17%</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan) => {
                            const Icon = plan.icon;
                            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
                            const monthlyPrice = billingCycle === 'yearly' ? (plan.yearlyPrice / 12).toFixed(0) : plan.monthlyPrice;

                            return (
                                <Card
                                    key={plan.id}
                                    className={`relative overflow-hidden border ${plan.popular ? 'border-primary shadow-xl shadow-primary/10' : 'border-border'} bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                                >
                                    {plan.popular && (
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                                    )}

                                    {/* Header */}
                                    <div className="p-6 bg-gradient-to-br from-primary to-secondary text-white">
                                        {plan.popular && (
                                            <Badge className="absolute top-4 right-4 bg-white/20 text-white border-white/30">
                                                {plan.badge}
                                            </Badge>
                                        )}

                                        <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                                            <Icon size={28} className="text-white" />
                                        </div>

                                        <h3 className="text-2xl font-bold">{plan.title}</h3>
                                        <p className="text-white/80 text-sm">{plan.subtitle}</p>

                                        <div className="mt-4 flex items-baseline gap-2">
                                            <span className="text-5xl font-bold">${monthlyPrice}</span>
                                            <div className="flex flex-col">
                                                <span className="text-lg font-medium">/month</span>
                                                {billingCycle === 'yearly' && (
                                                    <span className="text-xs text-white/70">${price}/year</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <CardContent className="p-6">
                                        <Button
                                            asChild
                                            className={`w-full mb-6 ${plan.popular ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`}
                                        >
                                            <Link href="/auth">
                                                {plan.id === 'free' ? 'Get Started' : 'Start Free Trial'}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>

                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                                            What's Included
                                        </p>

                                        <ul className="space-y-3">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                                                        <Check size={12} className="text-white" />
                                                    </div>
                                                    <span className="text-sm text-foreground">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section className="py-16 lg:py-24 bg-muted/30">
                <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">COMPARE PLANS</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            Detailed Feature{' '}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Comparison
                            </span>
                        </h2>
                    </div>

                    <Card className="border border-border bg-card overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-primary/5">
                                    <TableHead className="w-[280px] font-bold text-foreground">Feature</TableHead>
                                    <TableHead className="text-center font-bold text-foreground">Free</TableHead>
                                    <TableHead className="text-center font-bold text-foreground bg-primary/10">
                                        <div className="flex items-center justify-center gap-2">
                                            Basic
                                            <Badge className="bg-primary text-white text-xs">Popular</Badge>
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-center font-bold text-foreground">Pro</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {comparisonFeatures.map((row, idx) => (
                                    <TableRow key={idx} className="hover:bg-muted/50">
                                        <TableCell className="font-medium">{row.feature}</TableCell>
                                        <TableCell className="text-center">{renderValue(row.free)}</TableCell>
                                        <TableCell className="text-center bg-primary/5">{renderValue(row.basic)}</TableCell>
                                        <TableCell className="text-center">{renderValue(row.pro)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">ALL PLANS INCLUDE</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            Powerful Features for{' '}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Everyone
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <Card key={idx} className="border border-border bg-card p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-lg font-bold text-foreground mb-2">{feature.title}</h4>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 lg:py-24 bg-muted/30">
                <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">FAQ</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            Common{' '}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Questions
                            </span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <Card key={idx} className="border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                                <h4 className="font-bold text-lg text-foreground mb-2">{faq.question}</h4>
                                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-secondary">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <Star className="w-12 h-12 text-white mx-auto mb-6 animate-pulse" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Still Have Questions?
                    </h2>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                        Our team is here to help you find the perfect plan for your needs.
                        Get in touch and we'll guide you through the process.
                    </p>
                    <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                        <Link href="/contact">
                            Contact Sales
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
