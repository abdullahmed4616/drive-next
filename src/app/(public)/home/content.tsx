'use client';

import React from 'react';
import Image from 'next/image';
import {
    Container,
    Title,
    Text,
    Button,
    Grid,
    Group,
    Stack,
    Box,
    Center,
    Anchor,
    Badge,
} from '@mantine/core';
import {
    IconBrandFacebook,
    IconBrandTwitter,
    IconBrandLinkedin,
    IconCloud,
    IconBolt,
    IconShield,
    IconSearch,
    IconChartBar,
    IconFileSearch,
    IconSparkles,
    IconArrowRight,
    IconCheck,
} from '@tabler/icons-react';
import Link from 'next/link';
import {FeatureCard} from "@/app/(public)/home/components/FeatureCard";

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(0,0,0, 0.2)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

export default function HomePage() {
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
                style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.9) 100%)',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Container size="xl" py={80}>
                    <Grid gutter="xl" align="center">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Stack gap="xl" className="fade-in">
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
                                        width: 'fit-content',
                                    }}
                                >
                                    All-in-One Cloud Solution
                                </Badge>

                                <Title
                                    order={1}
                                    size={56}
                                    fw={800}
                                    style={{
                                        fontFamily: "'Outfit', sans-serif",
                                        lineHeight: 1.2,
                                        letterSpacing: '-1px',
                                    }}
                                >
                                    Unify & Master Your{' '}
                                    <Text
                                        component="span"
                                        style={{
                                            color: PRIMARY_COLOR,
                                        }}
                                    >
                                        Multi-Cloud
                                    </Text>{' '}
                                    Drives
                                </Title>

                                <Text size="xl" c="dimmed" style={{ lineHeight: 1.8 }}>
                                    Centralize, organize, and optimize all your Google Drive accounts
                                    from one powerful dashboard. Take control of your cloud storage with{' '}
                                    <Text component="span" fw={600} style={{ color: PRIMARY_COLOR }}>DriveUnity</Text>.
                                </Text>

                                <Group gap="md" mt="md">
                                    <Button
                                        component={Link}
                                        href="/auth"
                                        size="xl"
                                        radius="xl"
                                        rightSection={<IconArrowRight size={20} />}
                                        style={{
                                            background: PRIMARY_COLOR,
                                            border: 'none',
                                            boxShadow: `0 8px 24px ${BORDER_COLOR}`,
                                            fontWeight: 600,
                                            padding: '0 32px',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.boxShadow = `0 12px 32px ${BORDER_COLOR}`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = `0 8px 24px ${BORDER_COLOR}`;
                                        }}
                                    >
                                        Get Started Free
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/about"
                                        size="xl"
                                        radius="xl"
                                        variant="outline"
                                        style={{
                                            borderColor: PRIMARY_COLOR,
                                            color: PRIMARY_COLOR,
                                            borderWidth: 2,
                                            fontWeight: 600,
                                            padding: '0 32px',
                                            transition: 'all 0.3s ease',
                                            background: 'white',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = ACCENT_BG_COLOR;
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'white';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        Explore Features
                                    </Button>
                                </Group>

                                <Group gap="xl" mt="xl">
                                    <Stack gap={4}>
                                        <Text size="sm" c="dimmed" fw={500}>Files Managed</Text>
                                        <Text size="xl" fw={700} style={{ color: PRIMARY_COLOR }}>5M+</Text>
                                    </Stack>
                                    <Stack gap={4}>
                                        <Text size="sm" c="dimmed" fw={500}>Storage Saved</Text>
                                        <Text size="xl" fw={700} style={{ color: PRIMARY_COLOR }}>40%</Text>
                                    </Stack>
                                </Group>
                            </Stack>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Center style={{ position: 'relative' }}>
                                <Box
                                    style={{
                                        position: 'absolute',
                                        top: '10%',
                                        right: '10%',
                                        width: '120px',
                                        height: '120px',
                                        background: PRIMARY_COLOR,
                                        borderRadius: '50%',
                                        opacity: 0.2,
                                        animation: 'floating 4s ease-in-out infinite',
                                        zIndex: 0,
                                    }}
                                />
                                <Box
                                    style={{
                                        position: 'absolute',
                                        bottom: '15%',
                                        left: '5%',
                                        width: '80px',
                                        height: '80px',
                                        background: PRIMARY_COLOR,
                                        borderRadius: '50%',
                                        opacity: 0.2,
                                        animation: 'floating 5s ease-in-out infinite reverse',
                                        zIndex: 0,
                                    }}
                                />

                                <Image
                                    src="/images/hand.png"
                                    alt="Cloud storage illustration"
                                    width={600}
                                    height={600}
                                    style={{
                                        width: '100%',
                                        maxWidth: '500px',
                                        height: 'auto',
                                        borderRadius: '24px',
                                        filter: `drop-shadow(0 20px 40px ${BORDER_COLOR})`,
                                        animation: 'floating 6s ease-in-out infinite',
                                        position: 'relative',
                                        zIndex: 1,
                                    }}
                                    priority
                                />
                            </Center>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            <Container size="xl" py={80} style={{ position: 'relative', zIndex: 1 }}>
                <Stack gap="xl" mb={60}>
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
                            POWERFUL FEATURES
                        </Badge>
                    </Center>
                    <Title order={2} ta="center" size={42} fw={800} style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Everything You Need to{' '}
                        <Text
                            component="span"
                            style={{
                                color: PRIMARY_COLOR,
                            }}
                        >
                            Succeed
                        </Text>
                    </Title>
                    <Text size="lg" c="dimmed" ta="center" maw={700} mx="auto">
                        Streamline your multi-cloud experience with tools designed for
                        efficiency and insight.
                    </Text>
                </Stack>

                <Grid gutter="xl">
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <FeatureCard
                            icon={IconCloud}
                            title="Unified Dashboard"
                            description="Manage all your Google Drive accounts from a single, intuitive interface. Say goodbye to switching tabs."
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <FeatureCard
                            icon={IconBolt}
                            title="Lightning Fast Search"
                            description="Find any file across all your drives instantly with our powerful AI-powered search engine."
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <FeatureCard
                            icon={IconFileSearch}
                            title="Duplicate Detection"
                            description="Automatically find and remove redundant files across all your drives, freeing up valuable storage space."
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <FeatureCard
                            icon={IconShield}
                            title="Enterprise Security"
                            description="Bank-level encryption and security protocols to keep your data safe and compliant."
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <FeatureCard
                            icon={IconChartBar}
                            title="Smart Analytics"
                            description="Gain insights into your storage usage with beautiful, actionable analytics and reports."
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                        <FeatureCard
                            icon={IconSearch}
                            title="AI-Powered Organization"
                            description="Let our AI automatically organize and categorize your files for maximum productivity."
                        />
                    </Grid.Col>
                </Grid>
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
                <Box
                    style={{
                        position: 'absolute',
                        bottom: '-20%',
                        left: '-10%',
                        width: '500px',
                        height: '500px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                    }}
                />

                <Container size="md" style={{ position: 'relative', zIndex: 1 }}>
                    <Stack gap="xl" align="center" ta="center">
                        <Box
                            style={{
                                padding: '16px 24px',
                                borderRadius: '50px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            <Text size="sm" fw={600} c="white" tt="uppercase" style={{ letterSpacing: '1px' }}>
                                ⚡ Limited Time Offer
                            </Text>
                        </Box>

                        <Title order={2} c="white" size={48} fw={800} style={{ fontFamily: "'Outfit', sans-serif" }}>
                            Ready to Unify Your Cloud Drives?
                        </Title>
                        <Text size="xl" c="white" maw={600} style={{ opacity: 0.95 }}>
                            Join thousands of professionals who are simplifying their cloud
                            storage management with DriveUnity. Get started today!
                        </Text>

                        <Group gap="md" mt="md">
                            <Button
                                component={Link}
                                href="/auth"
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
                                Start Your Free Trial
                            </Button>
                        </Group>

                        <Group gap="xl" mt="xl">
                            <Group gap="xs">
                                <IconCheck size={20} color="white" />
                                <Text size="sm" c="white" fw={500}>No credit card required</Text>
                            </Group>
                            <Group gap="xs">
                                <IconCheck size={20} color="white" />
                                <Text size="sm" c="white" fw={500}>14-day free trial</Text>
                            </Group>
                            <Group gap="xs">
                                <IconCheck size={20} color="white" />
                                <Text size="sm" c="white" fw={500}>Cancel anytime</Text>
                            </Group>
                        </Group>
                    </Stack>
                </Container>
            </Box>

            <Box
                component="footer"
                py={40}
                style={{
                    borderTop: `1px solid ${BORDER_COLOR}`,
                    background: 'white',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Container size="xl">
                    <Group justify="space-between" align="center" wrap="wrap" gap="xl">
                        <Stack gap="sm">
                            <Group gap="xs">
                                <Box
                                    style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '8px',
                                        background: PRIMARY_COLOR,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <IconSparkles size={18} color="white" stroke={2.5} />
                                </Box>
                                <Text fw={800} size="lg" style={{ fontFamily: "'Outfit', sans-serif", color: PRIMARY_COLOR }}>
                                    DriveUnity
                                </Text>
                            </Group>
                            <Text size="sm" c="dimmed">
                                © {new Date().getFullYear()} DriveUnity. All rights reserved.
                            </Text>
                        </Stack>

                        <Group gap="md">
                            <Anchor
                                href="#"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: ACCENT_BG_COLOR,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = PRIMARY_COLOR;
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = ACCENT_BG_COLOR;
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <IconBrandFacebook size={20} color={PRIMARY_COLOR} />
                            </Anchor>
                            <Anchor
                                href="#"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: ACCENT_BG_COLOR,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = PRIMARY_COLOR;
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = ACCENT_BG_COLOR;
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <IconBrandTwitter size={20} color={PRIMARY_COLOR} />
                            </Anchor>
                            <Anchor
                                href="#"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: ACCENT_BG_COLOR,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = PRIMARY_COLOR;
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = ACCENT_BG_COLOR;
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <IconBrandLinkedin size={20} color={PRIMARY_COLOR} />
                            </Anchor>
                        </Group>

                        <Group gap="xl">
                            <Anchor
                                href="#"
                                size="sm"
                                c="dimmed"
                                fw={500}
                                style={{ textDecoration: 'none', transition: 'color 0.3s ease' }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = PRIMARY_COLOR; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--mantine-color-dimmed)'; }}
                            >
                                Company
                            </Anchor>
                            <Anchor
                                href="#"
                                size="sm"
                                c="dimmed"
                                fw={500}
                                style={{ textDecoration: 'none', transition: 'color 0.3s ease' }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = PRIMARY_COLOR; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--mantine-color-dimmed)'; }}
                            >
                                Resources
                            </Anchor>
                            <Anchor
                                href="#"
                                size="sm"
                                c="dimmed"
                                fw={500}
                                style={{ textDecoration: 'none', transition: 'color 0.3s ease' }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = PRIMARY_COLOR; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--mantine-color-dimmed)'; }}
                            >
                                Legal
                            </Anchor>
                        </Group>
                    </Group>
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

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .fade-in {
                    animation: fadeIn 0.8s ease-out;
                }
            `}</style>
        </Box>
    );
}