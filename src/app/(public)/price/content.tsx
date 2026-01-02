'use client';

import React, { useState } from 'react';
import {
    Container,
    Title,
    Text,
    Button,
    Grid,
    Card,
    Stack,
    Group,
    List,
    Box,
    Badge,
    Center,
    Switch,
} from '@mantine/core';
import {
    IconCheck,
    IconSparkles,
    IconRocket,
    IconCrown,
    IconBolt,
    IconShield,
    IconTrendingUp,
    IconStar,
    IconArrowRight,
    IconBrandZapier,
} from '@tabler/icons-react';
import Link from 'next/link';

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
        icon: IconSparkles,
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
        icon: IconRocket,
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
        icon: IconCrown,
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
        icon: IconBolt,
        title: 'Lightning Fast',
        description: 'Instant file search across all drives',
    },
    {
        icon: IconShield,
        title: 'Bank-Level Security',
        description: 'Your data is encrypted and secure',
    },
    {
        icon: IconTrendingUp,
        title: 'Smart Analytics',
        description: 'Detailed insights into your storage',
    },
    {
        icon: IconBrandZapier,
        title: 'AI-Powered',
        description: 'Intelligent file organization',
    },
];

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <Box style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            <Box
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
            <Box
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

            <Box
                py={80}
                style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.9) 100%)',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Container size="lg">
                    <Stack gap="xl" align="center">
                        <Badge
                            size="lg"
                            radius="xl"
                            leftSection={<IconSparkles size={16} />}
                            style={{
                                background: PRIMARY_COLOR,
                                color: 'white',
                                border: 'none',
                                padding: '8px 20px',
                                fontWeight: 600,
                                boxShadow: `0 4px 16px ${BORDER_COLOR}`,
                                animation: 'pulse 2s ease-in-out infinite',
                            }}
                        >
                            Simple, Transparent Pricing
                        </Badge>

                        <Title
                            order={1}
                            size={52}
                            fw={800}
                            ta="center"
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                lineHeight: 1.2,
                                maxWidth: 700,
                            }}
                        >
                            Choose the{' '}
                            <Text
                                component="span"
                                style={{
                                    color: PRIMARY_COLOR,
                                }}
                            >
                                Perfect Plan
                            </Text>{' '}
                            for Your Needs
                        </Title>

                        <Text size="xl" c="dimmed" ta="center" maw={600} style={{ lineHeight: 1.8 }}>
                            Start with a free plan and upgrade as you grow. All plans include
                            our core features with no hidden fees.
                        </Text>

                        <Group
                            gap="md"
                            style={{
                                background: 'white',
                                padding: '8px 24px',
                                borderRadius: '50px',
                                border: `1px solid ${BORDER_COLOR}`,
                                boxShadow: `0 4px 16px ${BORDER_COLOR}`,
                            }}
                        >
                            <Text
                                fw={billingCycle === 'monthly' ? 700 : 500}
                                c={billingCycle === 'monthly' ? PRIMARY_COLOR : 'dimmed'}
                                size="sm"
                            >
                                Monthly
                            </Text>
                            <Switch
                                size="lg"
                                checked={billingCycle === 'yearly'}
                                onChange={(event) =>
                                    setBillingCycle(event.currentTarget.checked ? 'yearly' : 'monthly')
                                }
                                styles={{
                                    track: {
                                        background: billingCycle === 'yearly'
                                            ? PRIMARY_COLOR
                                            : '#e9ecef',
                                        cursor: 'pointer',
                                    },
                                }}
                            />
                            <Group gap="xs">
                                <Text
                                    fw={billingCycle === 'yearly' ? 700 : 500}
                                    c={billingCycle === 'yearly' ? PRIMARY_COLOR : 'dimmed'}
                                    size="sm"
                                >
                                    Yearly
                                </Text>
                                <Badge
                                    size="sm"
                                    radius="xl"
                                    style={{
                                        background: PRIMARY_COLOR,
                                        color: 'white',
                                        border: 'none',
                                    }}
                                >
                                    Save 17%
                                </Badge>
                            </Group>
                        </Group>
                    </Stack>
                </Container>
            </Box>

            {/* Pricing Cards */}
            <Container size="xl" py={60} style={{ position: 'relative', zIndex: 1 }}>
                <Grid gutter="xl">
                    {pricingPlans.map((plan, index) => (
                        <Grid.Col key={plan.id} span={{ base: 12, sm: 6, md: 4 }}>
                            <PricingCard
                                plan={plan}
                                billingCycle={billingCycle}
                                index={index}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>

            {/* Features Grid */}
            <Box
                py={80}
                style={{
                    background: ACCENT_BG_COLOR,
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Container size="xl">
                    <Stack gap="xl" mb={60}>
                        <Center>
                            <Badge
                                size="lg"
                                radius="xl"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    color: PRIMARY_COLOR,
                                    border: `1px solid ${BORDER_COLOR}`,
                                    fontWeight: 600,
                                }}
                            >
                                ALL PLANS INCLUDE
                            </Badge>
                        </Center>
                        <Title order={2} ta="center" size={42} fw={800} style={{ fontFamily: "'Outfit', sans-serif" }}>
                            Powerful Features for{' '}
                            <Text
                                component="span"
                                style={{
                                    color: PRIMARY_COLOR,
                                }}
                            >
                                Everyone
                            </Text>
                        </Title>
                    </Stack>

                    <Grid gutter="xl">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
                                    <Card
                                        shadow="sm"
                                        padding="xl"
                                        radius="xl"
                                        withBorder
                                        h="100%"
                                        style={{
                                            border: `1px solid ${BORDER_COLOR}`,
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer',
                                            background: 'white',
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
                                        <Stack gap="lg" align="center" ta="center">
                                            <Box
                                                style={{
                                                    width: 70,
                                                    height: 70,
                                                    borderRadius: '18px',
                                                    background: PRIMARY_COLOR,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: `0 8px 24px ${BORDER_COLOR}`,
                                                }}
                                            >
                                                <Icon size={32} color="white" stroke={2} />
                                            </Box>
                                            <Title order={4} size="h5" fw={700} style={{ fontFamily: "'Outfit', sans-serif" }}>
                                                {feature.title}
                                            </Title>
                                            <Text size="sm" c="dimmed">
                                                {feature.description}
                                            </Text>
                                        </Stack>
                                    </Card>
                                </Grid.Col>
                            );
                        })}
                    </Grid>
                </Container>
            </Box>

            <Container size="md" py={80} style={{ position: 'relative', zIndex: 1 }}>
                <Stack gap="xl">
                    <Center>
                        <Badge
                            size="lg"
                            radius="xl"
                            style={{
                                background: ACCENT_BG_COLOR,
                                color: PRIMARY_COLOR,
                                border: `1px solid ${BORDER_COLOR}`,
                                fontWeight: 600,
                            }}
                        >
                            FAQ
                        </Badge>
                    </Center>
                    <Title order={2} ta="center" size={42} fw={800} style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Common{' '}
                        <Text
                            component="span"
                            style={{
                                color: PRIMARY_COLOR,
                            }}
                        >
                            Questions
                        </Text>
                    </Title>

                    <Stack gap="md" mt="xl">
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
                    </Stack>
                </Stack>
            </Container>

            <Box
                py={100}
                style={{
                    background: PRIMARY_COLOR,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
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

                <Container size="md" style={{ position: 'relative', zIndex: 1 }}>
                    <Stack gap="xl" align="center" ta="center">
                        <IconStar size={48} color="white" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                        <Title order={2} c="white" size={48} fw={800} style={{ fontFamily: "'Outfit', sans-serif" }}>
                            Still Have Questions?
                        </Title>
                        <Text size="xl" c="white" maw={600} style={{ opacity: 0.95 }}>
                            Our team is here to help you find the perfect plan for your needs.
                            Get in touch and we'll guide you through the process.
                        </Text>

                        <Group gap="md" mt="md">
                            <Button
                                component={Link}
                                href="/contact"
                                size="xl"
                                radius="xl"
                                rightSection={<IconArrowRight size={20} />}
                                style={{
                                    background: 'white',
                                    color: PRIMARY_COLOR,
                                    border: 'none',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                    fontWeight: 700,
                                    padding: '0 40px',
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
                                Contact Sales
                            </Button>
                        </Group>
                    </Stack>
                </Container>
            </Box>

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
        </Box>
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
            shadow="sm"
            padding={0}
            radius="xl"
            withBorder
            h="100%"
            style={{
                border: plan.popular ? `2px solid ${plan.borderColor}` : `1px solid ${BORDER_COLOR}`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                background: 'white',
                overflow: 'hidden',
                position: 'relative',
                animationDelay: `${index * 0.1}s`,
            }}
            className="fade-in"
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 24px 48px ${BORDER_COLOR}`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '';
            }}
        >
            {/* Header */}
            <Box
                style={{
                    background: PRIMARY_COLOR,
                    padding: '32px 24px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Shimmer Effect */}
                {plan.popular && (
                    <Box
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
                        size="sm"
                        radius="xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.3)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            backdropFilter: 'blur(10px)',
                            fontWeight: 700,
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            zIndex: 1,
                        }}
                    >
                        ⭐ {plan.badge}
                    </Badge>
                )}

                <Stack gap="md" style={{ position: 'relative', zIndex: 1 }}>
                    <Box
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: '16px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        <Icon size={32} color="white" stroke={2} />
                    </Box>

                    <Stack gap={4}>
                        <Title order={3} c="white" fw={800} size="h2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            {plan.title}
                        </Title>
                        <Text size="sm" c="white" style={{ opacity: 0.9 }}>
                            {plan.subtitle}
                        </Text>
                    </Stack>

                    <Group gap={8} align="baseline">
                        <Text size="3.5rem" c="white" fw={800} lh={1} style={{ fontFamily: "'Outfit', sans-serif" }}>
                            ${monthlyPrice}
                        </Text>
                        <Stack gap={0}>
                            <Text size="lg" c="white" fw={600}>
                                /month
                            </Text>
                            {billingCycle === 'yearly' && (
                                <Text size="xs" c="white" style={{ opacity: 0.8 }}>
                                    ${price}/year
                                </Text>
                            )}
                        </Stack>
                    </Group>
                </Stack>
            </Box>

            {/* Card Body */}
            <Stack gap="xl" p="xl">
                <Button
                    component={Link}
                    href="/auth"
                    size="lg"
                    radius="xl"
                    fullWidth
                    rightSection={<IconArrowRight size={18} />}
                    style={{
                        background: plan.popular ? PRIMARY_COLOR : 'white',
                        color: plan.popular ? 'white' : plan.iconColor,
                        border: plan.popular ? 'none' : `2px solid ${plan.iconColor}`,
                        fontWeight: 700,
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
                    {plan.id === 'free' ? 'Get Started' : 'Start Free Trial'}
                </Button>

                <Stack gap="md">
                    <Text size="sm" fw={700} tt="uppercase" c="dimmed" style={{ letterSpacing: '0.5px' }}>
                        What's Included
                    </Text>
                    <List
                        spacing="sm"
                        size="sm"
                        icon={
                            <Box
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    background: PRIMARY_COLOR,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <IconCheck size={12} color="white" stroke={3} />
                            </Box>
                        }
                    >
                        {plan.features.map((feature, idx) => (
                            <List.Item key={idx}>
                                <Text size="sm" fw={500}>
                                    {feature}
                                </Text>
                            </List.Item>
                        ))}
                    </List>
                </Stack>
            </Stack>
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
            shadow="sm"
            padding="xl"
            radius="xl"
            withBorder
            style={{
                border: `1px solid ${BORDER_COLOR}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                background: 'white',
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
            <Stack gap="sm">
                <Text fw={700} size="lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {question}
                </Text>
                <Text size="sm" c="dimmed" style={{ lineHeight: 1.7 }}>
                    {answer}
                </Text>
            </Stack>
        </Card>
    );
}