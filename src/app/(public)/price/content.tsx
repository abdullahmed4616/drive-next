'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Rocket, Crown, Zap, Shield, TrendingUp, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Card } from "@/app/components/ui/card";
import { Switch } from "@/app/components/ui/switch";

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(0,0,0, 0.2)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

const pricingPlans = [
    {
        id: 'free',
        title: 'Free',
        subtitle: 'Perfect for getting started',
        monthlyPrice: 0,
        yearlyPrice: 0,
        icon: Sparkles,
        iconColor: PRIMARY_COLOR,
        borderColor: BORDER_COLOR,
        features: [
            '1 Connected Google Drive',
            'Basic File Organization',
            'Unlimited File Indexing',
            'Advanced Filtration',
            '5GB Storage Analytics',
            'Email Support',
        ],
        limitations: ['Limited to 1 drive', 'Basic features only'],
        popular: false,
    },
    {
        id: 'basic',
        title: 'Basic',
        subtitle: 'Best for small teams',
        monthlyPrice: 9.99,
        yearlyPrice: 99.99,
        icon: Rocket,
        iconColor: PRIMARY_COLOR,
        borderColor: BORDER_COLOR,
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
        limitations: [],
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
        iconColor: PRIMARY_COLOR,
        borderColor: BORDER_COLOR,
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
        limitations: [],
        popular: false,
    },
];

const features = [
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Instant file search across all drives',
    },
    {
        icon: Shield,
        title: 'Bank-Level Security',
        description: 'Your data is encrypted and secure',
    },
    {
        icon: TrendingUp,
        title: 'Smart Analytics',
        description: 'Detailed insights into your storage',
    },
    {
        icon: Zap,
        title: 'AI-Powered',
        description: 'Intelligent file organization',
    },
];

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            <div
                style={{
                    position: 'fixed',
                    top: '-10%',
                    right: '-5%',
                    width: '600px',
                    height: '600px',
                    background: ACCENT_BG_COLOR,
                    borderRadius: '50%',
                    filter: 'blur(60px)',
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
                    background: ACCENT_BG_COLOR,
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'floating 10s ease-in-out infinite reverse',
                    zIndex: 0,
                }}
            />

            <div
                className="py-20"
                style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.9) 100%)',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex flex-col gap-8 items-center">
                        <Badge
                            className="text-white border-none font-semibold"
                            style={{
                                background: PRIMARY_COLOR,
                                padding: '8px 20px',
                                boxShadow: `0 4px 16px ${BORDER_COLOR}`,
                                animation: 'pulse 2s ease-in-out infinite',
                            }}
                        >
                            <Sparkles className="inline mr-2" size={16} />
                            Simple, Transparent Pricing
                        </Badge>

                        <h1
                            className="text-5xl font-bold text-center max-w-2xl"
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                lineHeight: 1.2,
                            }}
                        >
                            Choose the{' '}
                            <span style={{ color: PRIMARY_COLOR }}>
                                Perfect Plan
                            </span>{' '}
                            for Your Needs
                        </h1>

                        <p className="text-xl text-gray-600 text-center max-w-2xl" style={{ lineHeight: 1.8 }}>
                            Start with a free plan and upgrade as you grow. All plans include
                            our core features with no hidden fees.
                        </p>

                        <div
                            className="flex items-center gap-4 bg-white p-2 px-6 rounded-full border"
                            style={{
                                border: `1px solid ${BORDER_COLOR}`,
                                boxShadow: `0 4px 16px ${BORDER_COLOR}`,
                            }}
                        >
                            <span
                                className="text-sm"
                                style={{
                                    fontWeight: billingCycle === 'monthly' ? 700 : 500,
                                    color: billingCycle === 'monthly' ? PRIMARY_COLOR : '#9ca3af',
                                }}
                            >
                                Monthly
                            </span>
                            <Switch
                                checked={billingCycle === 'yearly'}
                                onCheckedChange={(checked) =>
                                    setBillingCycle(checked ? 'yearly' : 'monthly')
                                }
                            />
                            <div className="flex items-center gap-2">
                                <span
                                    className="text-sm"
                                    style={{
                                        fontWeight: billingCycle === 'yearly' ? 700 : 500,
                                        color: billingCycle === 'yearly' ? PRIMARY_COLOR : '#9ca3af',
                                    }}
                                >
                                    Yearly
                                </span>
                                <Badge
                                    className="text-white border-none"
                                    style={{
                                        background: PRIMARY_COLOR,
                                    }}
                                >
                                    Save 17%
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16" style={{ position: 'relative', zIndex: 1 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard
                            key={plan.id}
                            plan={plan}
                            billingCycle={billingCycle}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            <div
                className="py-20"
                style={{
                    background: ACCENT_BG_COLOR,
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col gap-8 mb-16">
                        <div className="flex justify-center">
                            <Badge
                                variant="outline"
                                className="text-lg font-semibold"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    color: PRIMARY_COLOR,
                                    border: `1px solid ${BORDER_COLOR}`,
                                    padding: '8px 20px',
                                }}
                            >
                                ALL PLANS INCLUDE
                            </Badge>
                        </div>
                        <h2 className="text-center text-5xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            Powerful Features for{' '}
                            <span style={{ color: PRIMARY_COLOR }}>
                                Everyone
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card
                                    key={index}
                                    className="shadow-sm p-8 rounded-xl border bg-white"
                                    style={{
                                        border: `1px solid ${BORDER_COLOR}`,
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = `0 20px 40px ${BORDER_COLOR}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '';
                                    }}
                                >
                                    <div className="flex flex-col gap-6 items-center text-center">
                                        <div
                                            className="flex items-center justify-center rounded-2xl"
                                            style={{
                                                width: 70,
                                                height: 70,
                                                background: PRIMARY_COLOR,
                                                boxShadow: `0 8px 24px ${BORDER_COLOR}`,
                                            }}
                                        >
                                            <Icon size={32} color="white" strokeWidth={2} />
                                        </div>
                                        <h4 className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20" style={{ position: 'relative', zIndex: 1 }}>
                <div className="flex flex-col gap-8 max-w-3xl mx-auto">
                    <div className="flex justify-center">
                        <Badge
                            variant="outline"
                            className="text-lg font-semibold"
                            style={{
                                background: ACCENT_BG_COLOR,
                                color: PRIMARY_COLOR,
                                border: `1px solid ${BORDER_COLOR}`,
                                padding: '8px 20px',
                            }}
                        >
                            FAQ
                        </Badge>
                    </div>
                    <h2 className="text-center text-5xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Common{' '}
                        <span style={{ color: PRIMARY_COLOR }}>
                            Questions
                        </span>
                    </h2>

                    <div className="flex flex-col gap-4 mt-8">
                        <FAQItem
                            question="Can I change my plan later?"
                            answer="Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate the difference."
                        />
                        <FAQItem
                            question="What payment methods do you accept?"
                            answer="We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely."
                        />
                        <FAQItem
                            question="Is there a free trial?"
                            answer="Yes! Our Free plan is completely free forever. You can also try Basic or Pro plans with a 14-day money-back guarantee."
                        />
                        <FAQItem
                            question="Can I cancel anytime?"
                            answer="Absolutely. You can cancel your subscription at any time with no questions asked. Your data remains accessible until the end of your billing period."
                        />
                    </div>
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

                <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="flex flex-col gap-8 items-center text-center">
                        <Star size={48} color="white" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                        <h2 className="text-white text-5xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            Still Have Questions?
                        </h2>
                        <p className="text-xl text-white max-w-2xl" style={{ opacity: 0.95 }}>
                            Our team is here to help you find the perfect plan for your needs.
                            Get in touch and we'll guide you through the process.
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
                                <Link href="/contact" className="flex items-center gap-2">
                                    Contact Sales
                                    <ArrowRight size={20} />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes floating {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.05);
                    }
                }

                @keyframes shimmer {
                    0% {
                        background-position: -200% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }
            `}</style>
        </div>
    );
}

interface PricingCardProps {
    plan: typeof pricingPlans[0];
    billingCycle: 'monthly' | 'yearly';
    index: number;
}

function PricingCard({ plan, billingCycle, index }: PricingCardProps) {
    const Icon = plan.icon;
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const monthlyPrice = billingCycle === 'yearly' ? (plan.yearlyPrice / 12).toFixed(0) : plan.monthlyPrice;

    return (
        <Card
            className="shadow-sm rounded-xl border overflow-hidden bg-white"
            style={{
                border: plan.popular ? `2px solid ${plan.borderColor}` : `1px solid ${BORDER_COLOR}`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                animationDelay: `${index * 0.1}s`,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 24px 48px ${BORDER_COLOR}`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '';
            }}
        >
            <div
                style={{
                    background: PRIMARY_COLOR,
                    padding: '32px 24px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {plan.popular && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 3s infinite',
                        }}
                    />
                )}

                {plan.popular && (
                    <Badge
                        className="absolute top-4 right-4 z-10 text-white border-white/50"
                        style={{
                            background: 'rgba(255, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                            fontWeight: 700,
                        }}
                    >
                        ⭐ {plan.badge}
                    </Badge>
                )}

                <div className="flex flex-col gap-4 relative z-10">
                    <div
                        className="flex items-center justify-center rounded-2xl border-2 border-white/30"
                        style={{
                            width: 60,
                            height: 60,
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <Icon size={32} color="white" strokeWidth={2} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <h3 className="text-white text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            {plan.title}
                        </h3>
                        <p className="text-sm text-white" style={{ opacity: 0.9 }}>
                            {plan.subtitle}
                        </p>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-white text-6xl font-bold leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            ${monthlyPrice}
                        </span>
                        <div className="flex flex-col">
                            <span className="text-lg text-white font-semibold">
                                /month
                            </span>
                            {billingCycle === 'yearly' && (
                                <span className="text-xs text-white" style={{ opacity: 0.8 }}>
                                    ${price}/year
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8 p-8">
                <Button
                    asChild
                    size="lg"
                    className="w-full rounded-xl font-bold"
                    style={{
                        background: plan.popular ? PRIMARY_COLOR : 'white',
                        color: plan.popular ? 'white' : plan.iconColor,
                        border: plan.popular ? 'none' : `2px solid ${plan.iconColor}`,
                        boxShadow: plan.popular ? `0 8px 24px ${BORDER_COLOR}` : 'none',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        if (!plan.popular) {
                            e.currentTarget.style.background = PRIMARY_COLOR;
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.borderColor = 'transparent';
                        }
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 12px 32px ${BORDER_COLOR}`;
                    }}
                    onMouseLeave={(e) => {
                        if (!plan.popular) {
                            e.currentTarget.style.background = 'white';
                            e.currentTarget.style.color = plan.iconColor;
                            e.currentTarget.style.borderColor = plan.iconColor;
                        }
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = plan.popular ? `0 8px 24px ${BORDER_COLOR}` : 'none';
                    }}
                >
                    <Link href="/auth" className="flex items-center justify-center gap-2">
                        {plan.id === 'free' ? 'Get Started' : 'Start Free Trial'}
                        <ArrowRight size={18} />
                    </Link>
                </Button>

                <div className="flex flex-col gap-4">
                    <p className="text-sm font-bold text-gray-500 uppercase" style={{ letterSpacing: '0.5px' }}>
                        What's Included
                    </p>
                    <ul className="flex flex-col gap-3">
                        {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <div
                                    className="flex items-center justify-center rounded-full flex-shrink-0"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        background: PRIMARY_COLOR,
                                    }}
                                >
                                    <Check size={12} color="white" strokeWidth={3} />
                                </div>
                                <span className="text-sm font-medium">
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
}

interface FAQItemProps {
    question: string;
    answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
    return (
        <Card
            className="shadow-sm p-8 rounded-xl border bg-white"
            style={{
                border: `1px solid ${BORDER_COLOR}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 12px 32px ${BORDER_COLOR}`;
                e.currentTarget.style.borderColor = PRIMARY_COLOR;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.borderColor = BORDER_COLOR;
            }}
        >
            <div className="flex flex-col gap-2">
                <p className="font-bold text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {question}
                </p>
                <p className="text-sm text-gray-600" style={{ lineHeight: 1.7 }}>
                    {answer}
                </p>
            </div>
        </Card>
    );
}
