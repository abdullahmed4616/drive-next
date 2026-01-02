import {
    Card,
    Text,
    Button,
    Badge,
    Stack,
    Group,
    List,
    ThemeIcon,
    rem,
} from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { SubscriptionPlan, BillingCycle } from '../types/types'
import { marketingPlans } from '../config/market'

interface PricingCardProps {
    plan: SubscriptionPlan
    billingCycle: BillingCycle
    onSubscribe: (plan: SubscriptionPlan) => void
    isCurrentPlan?: boolean
    isLoading?: boolean
}

const PRIMARY_COLOR = '#6B9ADF'
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)'

export const PricingCard = ({
    plan,
    billingCycle,
    onSubscribe,
    isCurrentPlan,
    isLoading,
}: PricingCardProps) => {
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
    const marketing = marketingPlans[plan.tier as keyof typeof marketingPlans]
    const isPopular = marketing?.popular

    if (!marketing) return null

    return (
        <Card
            shadow="lg"
            padding="xl"
            radius="lg"
            withBorder
            style={{
                borderColor: isPopular ? PRIMARY_COLOR : BORDER_COLOR,
                borderWidth: isPopular ? rem(2) : rem(1),
                backgroundColor: isPopular ? '#F4F8FF' : '#FFFFFF',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.2s ease',
            }}
        >
            {isPopular && marketing.badge && (
                <Badge
                    size="lg"
                    variant="filled"
                    color={PRIMARY_COLOR}
                    style={{
                        position: 'absolute',
                        top: rem(10),
                        right: rem(10),
                        zIndex: 2,
                        textTransform: 'uppercase'
                    }}
                >
                    {marketing.badge}
                </Badge>
            )}

            <Stack gap="md" style={{ flex: 1 }}>
                <div>
                    <Text size="xl" fw={800} c={PRIMARY_COLOR} tt="uppercase">
                        {plan.packageName}
                    </Text>

                    <Text size="sm" c="dimmed" fw={500}>
                        {marketing.subtitle}
                    </Text>

                    <Group align="baseline" gap={4} mt="xl">
                        <Text size={rem(44)} fw={900} style={{ lineHeight: 1 }}>
                            ${price}
                        </Text>
                        <Text size="md" c="dimmed" fw={600}>
                            /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </Text>
                    </Group>
                </div>

                <List
                    spacing="sm"
                    size="sm"
                    mt="md"
                    style={{ flex: 1 }}
                    icon={
                        <ThemeIcon color={PRIMARY_COLOR} size={22} radius="xl" variant="light">
                            <IconCheck size={14} stroke={3} />
                        </ThemeIcon>
                    }
                >
                    {marketing.features.map((feature, idx) => (
                        <List.Item key={idx}>
                            <Text size="sm" fw={600} c="#444">
                                {feature}
                            </Text>
                        </List.Item>
                    ))}
                </List>

                <Button
                    size="lg"
                    radius="md"
                    fullWidth
                    loading={isLoading}
                    disabled={isCurrentPlan}
                    onClick={() => onSubscribe(plan)}
                    style={{
                        backgroundColor: PRIMARY_COLOR,
                        height: rem(50),
                        fontSize: rem(16),
                        marginTop: 'auto'
                    }}
                >
                    {isCurrentPlan ? 'Current Plan' : 'Get Started'}
                </Button>
            </Stack>
        </Card>
    )
}