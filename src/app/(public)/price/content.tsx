'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Rocket, Crown, Zap, Shield, TrendingUp, Star, ArrowRight, Minus } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/badge";
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
                <div className="w-6 h-6 rounded-full flex items-center justify-center mx-auto bg-emerald-500/10">
                    <Check size={14} className="text-emerald-400" />
                </div>
            ) : (
                <div className="w-6 h-6 rounded-full flex items-center justify-center mx-auto bg-white/[0.03]">
                    <Minus size={14} className="text-white/20" />
                </div>
            );
        }
        return <span className="font-medium text-white/80">{value}</span>;
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-[120px]" />
                    <div className="absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-secondary/[0.05] blur-[100px]" />
                </div>

                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center">
                        <Badge className="mb-6 px-4 py-1.5 bg-primary/10 text-primary border border-primary/20">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Simple, Transparent Pricing
                        </Badge>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            Choose the{' '}
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
                                Perfect Plan
                            </span>{' '}
                            for Your Needs
                        </h1>

                        <p className="text-lg md:text-xl text-white/40 max-w-2xl mb-10 leading-relaxed">
                            Start with a free plan and upgrade as you grow. All plans include
                            our core features with no hidden fees.
                        </p>

                        {/* Billing Toggle */}
                        <div className="flex items-center gap-4 bg-white/[0.03] p-2 px-6 rounded-full border border-white/[0.06]">
                            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-primary' : 'text-white/40'}`}>
                                Monthly
                            </span>
                            <Switch
                                checked={billingCycle === 'yearly'}
                                onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
                            />
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-primary' : 'text-white/40'}`}>
                                    Yearly
                                </span>
                                <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Save 17%</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pricingPlans.map((plan) => {
                            const Icon = plan.icon;
                            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
                            const monthlyPrice = billingCycle === 'yearly' ? (plan.yearlyPrice / 12).toFixed(0) : plan.monthlyPrice;

                            return (
                                <div
                                    key={plan.id}
                                    className={`relative overflow-hidden rounded-2xl border ${
                                        plan.popular
                                            ? 'border-primary/30 shadow-glow'
                                            : 'border-white/[0.05]'
                                    } bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 hover:-translate-y-1`}
                                >
                                    {plan.popular && (
                                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                                    )}

                                    {/* Header */}
                                    <div className="p-6 border-b border-white/[0.05]">
                                        {plan.popular && (
                                            <Badge className="absolute top-4 right-4 bg-primary/10 text-primary border border-primary/20 text-xs">
                                                {plan.badge}
                                            </Badge>
                                        )}

                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                                            plan.popular
                                                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20'
                                                : 'bg-white/[0.05]'
                                        }`}>
                                            <Icon size={24} className={plan.popular ? 'text-white' : 'text-white/50'} />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
                                        <p className="text-white/40 text-sm">{plan.subtitle}</p>

                                        <div className="mt-4 flex items-baseline gap-1">
                                            <span className="text-5xl font-bold text-white">${monthlyPrice}</span>
                                            <div className="flex flex-col ml-1">
                                                <span className="text-lg font-medium text-white/50">/month</span>
                                                {billingCycle === 'yearly' && (
                                                    <span className="text-xs text-white/30">${price}/year</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <Button
                                            asChild
                                            className={`w-full mb-6 ${
                                                plan.popular
                                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-500/20 border-0'
                                                    : 'bg-white/[0.05] text-white/70 hover:bg-white/[0.08] border border-white/[0.08]'
                                            }`}
                                        >
                                            <Link href="/auth">
                                                {plan.id === 'free' ? 'Get Started' : 'Start Free Trial'}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>

                                        <p className="text-[11px] font-semibold text-white/25 uppercase tracking-wider mb-4">
                                            What&apos;s Included
                                        </p>

                                        <ul className="space-y-3">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                        <Check size={12} className="text-primary" />
                                                    </div>
                                                    <span className="text-sm text-white/60">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section className="py-16 lg:py-24 border-y border-white/[0.05]">
                <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">COMPARE PLANS</Badge>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Detailed Feature{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                Comparison
                            </span>
                        </h2>
                    </div>

                    <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-white/[0.05] hover:bg-transparent">
                                    <TableHead className="w-[280px] font-bold text-white/70">Feature</TableHead>
                                    <TableHead className="text-center font-bold text-white/70">Free</TableHead>
                                    <TableHead className="text-center font-bold text-white/70 bg-primary/5">
                                        <div className="flex items-center justify-center gap-2">
                                            Basic
                                            <Badge className="bg-primary/10 text-primary border border-primary/20 text-xs">Popular</Badge>
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-center font-bold text-white/70">Pro</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {comparisonFeatures.map((row, idx) => (
                                    <TableRow key={idx} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                        <TableCell className="font-medium text-white/60">{row.feature}</TableCell>
                                        <TableCell className="text-center">{renderValue(row.free)}</TableCell>
                                        <TableCell className="text-center bg-primary/[0.02]">{renderValue(row.basic)}</TableCell>
                                        <TableCell className="text-center">{renderValue(row.pro)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">ALL PLANS INCLUDE</Badge>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Powerful Features for{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                Everyone
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {features.map((feature, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 text-center hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300">
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                                <p className="text-sm text-white/40">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 lg:py-24 border-t border-white/[0.05]">
                <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">FAQ</Badge>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Common{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                Questions
                            </span>
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 hover:bg-white/[0.03] hover:border-white/[0.08] transition-all">
                                <h4 className="font-bold text-lg text-white/80 mb-2">{faq.question}</h4>
                                <p className="text-white/40 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden py-16 lg:py-24">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-primary/[0.06] blur-[100px]" />
                    <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-secondary/[0.06] blur-[100px]" />
                </div>

                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                    <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-12 backdrop-blur-sm">
                        <Star className="w-10 h-10 text-primary mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                            Still Have Questions?
                        </h2>
                        <p className="text-lg text-white/40 max-w-2xl mx-auto mb-8">
                            Our team is here to help you find the perfect plan for your needs.
                            Get in touch and we&apos;ll guide you through the process.
                        </p>
                        <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-500/20 border-0">
                            <Link href="/contact">
                                Contact Sales
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
