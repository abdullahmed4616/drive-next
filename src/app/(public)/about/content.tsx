'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import {
    Container,
    Title,
    Text,
    Button,
    Grid,
    Card,
    Stack,
    Group,
    Box,
    Badge,
    ThemeIcon,
} from '@mantine/core';
import {
    IconX,
    IconCheck,
    IconBulb,
    IconShield,
    IconTrendingUp,
    IconSparkles,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(0,0,0, 0.2)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

export default function AboutPage() {
    const router = useRouter();

    const gradientText: React.CSSProperties = {
        background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_COLOR} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    const glassCard: React.CSSProperties = {
        backdropFilter: 'blur(16px)',
        background: BORDER_COLOR,
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: '20px',
        padding: '24px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
    };

    return (
        <Box style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', paddingBottom: 100 }}>
            <Box
                style={{
                    position: 'fixed',
                    top: '-10%',
                    right: '-5%',
                    width: '600px',
                    height: '600px',
                    background: `linear-gradient(135deg, ${PRIMARY_COLOR}20 0%, ${PRIMARY_COLOR}10 100%)`,
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
                    background: `linear-gradient(135deg, ${PRIMARY_COLOR}15 0%, ${PRIMARY_COLOR}10 100%)`,
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'floating 10s ease-in-out infinite reverse',
                    zIndex: 0,
                }}
            />

            <Container size="lg" py={80}>
                <Stack gap="xl" align="center" ta="center" style={{ position: 'relative', zIndex: 1 }}>
                    <Badge
                        size="lg"
                        radius="xl"
                        style={{
                            background: PRIMARY_COLOR,
                            color: 'white',
                            border: 'none',
                            padding: '8px 20px',
                            fontWeight: 600,
                            boxShadow: `0 4px 16px ${PRIMARY_COLOR}50`,
                            animation: 'pulse 2s ease-in-out infinite',
                        }}
                    >
                        About DriveUnity
                    </Badge>

                    <Title order={1} size={52} fw={800} style={{ lineHeight: 1.2, maxWidth: 700 }}>
                        Learn About{' '}
                        <Text component="span" style={gradientText}>
                            DriveUnity
                        </Text>
                    </Title>

                    <Text size="xl" c="dimmed" ta="center" maw={700} style={{ lineHeight: 1.8 }}>
                        DriveUnity unifies all your cloud drives in one dashboard. Simplify, organize, and secure your digital world with modern automation.
                    </Text>
                </Stack>
            </Container>

            <Container size="xl" py={60}>
                <Grid gutter="xl">
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Card style={glassCard} shadow="sm">
                            <Stack gap="md">
                                <Title order={3} style={gradientText}>Our Mission & Vision</Title>
                                <Text c="dimmed">
                                    Our mission is to revolutionize how users manage multiple cloud drives efficiently.
                                </Text>
                                <Text c="dimmed">
                                    Our vision is to become the most trusted platform for unified cloud storage management.
                                </Text>
                            </Stack>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Card style={glassCard} shadow="sm">
                            <Image
                                src="/images/architecture.png"
                                alt="Cloud Unity Architecture"
                                width={500}
                                height={400}
                                style={{ width: '100%', borderRadius: '18px' }}
                            />
                        </Card>
                    </Grid.Col>
                </Grid>
            </Container>

            <Container size="xl" py={60}>
                <Stack gap="xl">
                    <Title order={2} ta="center" style={gradientText}>Challenges & Solutions</Title>
                    <Grid gutter="xl">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <GlassColumn title="The Challenges You Face">
                                <ChallengeCard icon={<IconX size={20}/>} iconColor="red" title="Fragmented Storage" description="Multiple cloud drives scattered across platforms." />
                                <ChallengeCard icon={<IconX size={20}/>} iconColor="red" title="Lost Productivity" description="Inefficient management slows down workflows." />
                                <ChallengeCard icon={<IconX size={20}/>} iconColor="red" title="Duplicate Data" description="Unnecessary file copies consume storage." />
                            </GlassColumn>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <GlassColumn title="DriveUnity's Seamless Solutions">
                                <ChallengeCard icon={<IconCheck size={20}/>} iconColor={PRIMARY_COLOR} title="Unified Access" description="One dashboard for all drives." />
                                <ChallengeCard icon={<IconCheck size={20}/>} iconColor={PRIMARY_COLOR} title="Smart Automation" description="Manage files efficiently and remove duplicates." />
                                <ChallengeCard icon={<IconCheck size={20}/>} iconColor={PRIMARY_COLOR} title="Optimized Storage" description="Maximize storage efficiency." />
                            </GlassColumn>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Container>

            <Container size="xl" py={60}>
                <Stack gap="xl">
                    <Title order={2} ta="center" style={gradientText}>Our Core Values</Title>
                    <Grid gutter="xl">
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                            <ValueCard icon={<IconBulb size={32}/>} iconColor={PRIMARY_COLOR} title="Simplicity" description="Intuitive and easy-to-use tools." />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                            <ValueCard icon={<IconShield size={32}/>} iconColor={PRIMARY_COLOR} title="Security" description="Your data is safe with us." />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                            <ValueCard icon={<IconTrendingUp size={32}/>} iconColor={PRIMARY_COLOR} title="Efficiency" description="Boost productivity and save time." />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                            <ValueCard icon={<IconSparkles size={32}/>} iconColor={PRIMARY_COLOR} title="Innovation" description="Cutting-edge features." gradient />
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Container>

            <Container size="xl" py={80}>
                <Card
                    style={{
                        background: PRIMARY_COLOR,
                        padding: 40,
                        borderRadius: 24,
                        boxShadow: `0 15px 40px ${PRIMARY_COLOR}40`,
                    }}
                >
                    <Stack gap="lg" align="center" ta="center">
                        <Title order={2} c="white">Ready to Simplify Your Cloud?</Title>
                        <Text size="lg" c="white" maw={700}>
                            Join thousands of users transforming their multi-cloud experience.
                        </Text>
                        <Group gap="md">
                            <Button size="lg" variant="white" color="dark" onClick={() => router.push('/auth')}>
                                Connect Your Drive
                            </Button>
                            <Button size="lg" variant="white" color="dark" onClick={() => router.push('/price')}>
                                Explore Plans
                            </Button>
                        </Group>
                    </Stack>
                </Card>
            </Container>

            <style jsx global>{`
                @keyframes floating {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
            `}</style>
        </Box>
    );
}

interface GlassColumnProps {
    title: string;
    children: ReactNode;
}
function GlassColumn({ title, children }: GlassColumnProps) {
    return (
        <Stack gap="md" style={{
            padding: 24,
            borderRadius: 20,
            backdropFilter: 'blur(16px)',
            background: BORDER_COLOR,
            border: `1px solid ${BORDER_COLOR}`,
        }}>
            <Title order={3} size="h4">{title}</Title>
            <Stack gap="sm">{children}</Stack>
        </Stack>
    );
}

interface ChallengeCardProps {
    icon: ReactNode;
    iconColor: string;
    title: string;
    description: string;
}
function ChallengeCard({ icon, iconColor, title, description }: ChallengeCardProps) {
    return (
        <Card withBorder shadow="sm" style={{
            backdropFilter: 'blur(14px)',
            background: BORDER_COLOR,
            border: `1px solid ${BORDER_COLOR}`,
            transition: '0.25s',
            cursor: 'pointer',
        }} onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = `0 16px 32px ${PRIMARY_COLOR}30`;
        }} onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '';
        }}>
            <Group gap="md" align="flex-start">
                <ThemeIcon size="lg" radius="xl" variant="light" color={iconColor}>{icon}</ThemeIcon>
                <Stack gap={4} style={{ flex: 1 }}>
                    <Text fw={600} size="sm">{title}</Text>
                    <Text size="sm" c="dimmed">{description}</Text>
                </Stack>
            </Group>
        </Card>
    );
}

interface ValueCardProps {
    icon: ReactNode;
    iconColor: string;
    title: string;
    description: string;
    gradient?: boolean;
}
function ValueCard({ icon, iconColor, title, description, gradient = false }: ValueCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="lg" style={{
            backdropFilter: 'blur(14px)',
            background: gradient ? `linear-gradient(135deg, ${PRIMARY_COLOR}20, ${BORDER_COLOR}, ${PRIMARY_COLOR}15)` : BORDER_COLOR,
            border: `1px solid ${BORDER_COLOR}`,
            transition: '0.3s',
            cursor: 'pointer',
        }}>
            <Stack gap="md" align="center" ta="center">
                <ThemeIcon size={60} radius="md" variant="light" color={iconColor}>{icon}</ThemeIcon>
                <Title order={4} size="h5">{title}</Title>
                <Text size="sm" c="dimmed">{description}</Text>
            </Stack>
        </Card>
    );
}