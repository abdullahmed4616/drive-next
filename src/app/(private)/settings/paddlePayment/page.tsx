'use client'

import { useState } from 'react'
import { Container, Grid, Title, Text, Stack, SegmentedControl, Center, Loader, Alert, Group, Badge, Card } from '@mantine/core'
import { IconInfoCircle, IconCrown } from '@tabler/icons-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SettingsSidebar } from '@/app/(private)/settings/_components/sidebar'
import { PricingCard } from '@/app/(private)/settings/paddlePayment/_components/PricingCard'
import { PaddleLoader, usePaddle } from '@/app/(private)/settings/paddlePayment/_components/Loader'
import { useSubscriptionData, useCurrentSubscription } from '@/app/(private)/settings/paddlePayment/hooks/usePaddleHooks'
import { SubscriptionPlan, BillingCycle } from '@/app/(private)/settings/paddlePayment/types/types'
import {useUserId} from "@/app/(private)/hooks/useAuthStatus";

const PRIMARY_COLOR = '#6B9ADF'
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)'

const queryClient = new QueryClient()

function SubscriptionPageContent() {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
    const [subscribingTo, setSubscribingTo] = useState<string | null>(null)
    const user = useUserId()
    const userId = user.userId || ''
    const userEmail = user.email || ''

    const { data: subscriptionData, isLoading, error } = useSubscriptionData(userId, userEmail)
    const { data: currentSub } = useCurrentSubscription(userId)
    const { Paddle, isReady: paddleReady } = usePaddle()

    const handleSubscribe = async (plan: SubscriptionPlan) => {
        if (!Paddle || !paddleReady) {
            alert('Payment system is loading. Please try again.')
            return
        }

        setSubscribingTo(plan.uuid)

        try {
            const priceId = billingCycle === 'monthly'
                ? subscriptionData?.paddleConfig.gettingStartedPkg
                : subscriptionData?.paddleConfig.extendedCleaningPkg

            Paddle.Checkout.open({
                items: [{ priceId }],
                customData: {
                    user_id: userId,
                    package_uuid: plan.uuid,
                },
                customer: {
                    email: userEmail,
                },
                successUrl: subscriptionData?.paddleConfig.successUrl,
            })
        } catch (error) {
            console.error('Checkout error:', error)
            alert('Failed to open checkout. Please try again.')
        } finally {
            setSubscribingTo(null)
        }
    }

    const paidPlans = subscriptionData?.subscription_plans.filter(
        (plan) => plan.tier !== 'FREE'
    ) || []
    console.log(paidPlans)
    if (isLoading) {
        return (
            <Center h={400}>
                <Stack align="center" gap="md">
                    <Loader size="lg" color={PRIMARY_COLOR} />
                    <Text c="dimmed">Loading subscription plans...</Text>
                </Stack>
            </Center>
        )
    }

    if (error) {
        return (
            <Alert icon={<IconInfoCircle />} title="Error" color="red">
                Failed to load subscription plans. Please try again later.
            </Alert>
        )
    }

    return (
        <>
            {subscriptionData && (
                <PaddleLoader
                    token={subscriptionData.paddleConfig.clientToken}
                />
            )}

            <Container size="xl" py="xl">
                <Stack gap="xl">
                    <div>
                        <Group gap="md" align="center">
                            <Title
                                order={1}
                                size="h1"
                                fw={700}
                                style={{
                                    background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5080C8 100%)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                Subscription & Billing
                            </Title>
                            <IconCrown size={32} color={PRIMARY_COLOR} />
                        </Group>
                        <Text size="lg" c="dimmed" mt="xs">
                            Choose the perfect plan for your needs
                        </Text>
                    </div>

                    <Grid gutter="lg">
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SettingsSidebar />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 9 }}>
                            <Stack gap="xl">
                                {currentSub && (
                                    <Card
                                        shadow="md"
                                        padding="lg"
                                        radius="md"
                                        style={{
                                            border: `2px solid ${PRIMARY_COLOR}`,
                                            background: 'rgba(107, 154, 223, 0.05)',
                                        }}
                                    >
                                        <Group justify="space-between">
                                            <div>
                                                <Text size="sm" c="dimmed" fw={500}>
                                                    Current Plan
                                                </Text>
                                                <Text size="xl" fw={700} c={PRIMARY_COLOR}>
                                                    {currentSub.subscriptionPlan.packageName}
                                                </Text>
                                            </div>
                                            <Badge
                                                size="lg"
                                                variant="gradient"
                                                gradient={{ from: PRIMARY_COLOR, to: '#5080C8' }}
                                            >
                                                Active
                                            </Badge>
                                        </Group>
                                        {currentSub.subEndTime && (
                                            <Text size="sm" c="dimmed" mt="sm">
                                                Renews on {new Date(currentSub.subEndTime).toLocaleDateString()}
                                            </Text>
                                        )}
                                    </Card>
                                )}

                                <Center>
                                    <SegmentedControl
                                        size="md"
                                        radius="md"
                                        value={billingCycle}
                                        onChange={(value) => setBillingCycle(value as BillingCycle)}
                                        data={[
                                            { label: 'Monthly', value: 'monthly' },
                                            { label: 'Yearly (Save 20%)', value: 'yearly' },
                                        ]}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            border: `1px solid ${BORDER_COLOR}`,
                                        }}
                                        styles={{
                                            indicator: {
                                                background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5080C8 100%)`,
                                            },
                                        }}
                                    />
                                </Center>

                                <Grid gutter="lg">
                                    {paidPlans.map((plan) => (
                                        <Grid.Col key={plan.uuid} span={{ base: 12, sm: 6 }}>
                                            <PricingCard
                                                plan={plan}
                                                billingCycle={billingCycle}
                                                onSubscribe={handleSubscribe}
                                                isCurrentPlan={currentSub?.subscriptionPlanId === plan.uuid}
                                                isLoading={subscribingTo === plan.uuid}
                                            />
                                        </Grid.Col>
                                    ))}
                                </Grid>

                                <Alert icon={<IconInfoCircle />} color="blue" variant="light">
                                    All plans include automatic backups and 24/7 customer support.
                                    You can upgrade or downgrade your plan at any time.
                                </Alert>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Container>
        </>
    )
}

export default function SubscriptionPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <SubscriptionPageContent />
        </QueryClientProvider>
    )
}