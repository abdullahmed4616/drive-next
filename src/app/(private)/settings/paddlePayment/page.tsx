'use client'

import { useState } from 'react'
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        border: `4px solid ${PRIMARY_COLOR}`,
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <div style={{ color: '#868e96' }}>Loading subscription plans...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div style={{
                backgroundColor: '#fff5f5',
                border: '1px solid #ffc9c9',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                gap: '12px'
            }}>
                <IconInfoCircle color="#fa5252" />
                <div>
                    <div style={{ fontWeight: 600, color: '#fa5252' }}>Error</div>
                    <div style={{ color: '#868e96', marginTop: '4px' }}>
                        Failed to load subscription plans. Please try again later.
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {subscriptionData && (
                <PaddleLoader
                    token={subscriptionData.paddleConfig.clientToken}
                />
            )}

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <h1
                                style={{
                                    fontSize: '48px',
                                    fontWeight: 700,
                                    background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5080C8 100%)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    margin: 0,
                                }}
                            >
                                Subscription & Billing
                            </h1>
                            <IconCrown size={32} color={PRIMARY_COLOR} />
                        </div>
                        <div style={{ fontSize: '18px', color: '#868e96', marginTop: '8px' }}>
                            Choose the perfect plan for your needs
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '24px' }}>
                        <div style={{ gridColumn: 'span 1' }}>
                            <SettingsSidebar />
                        </div>

                        <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {currentSub && (
                                <div
                                    style={{
                                        border: `2px solid ${PRIMARY_COLOR}`,
                                        background: 'rgba(107, 154, 223, 0.05)',
                                        borderRadius: '8px',
                                        padding: '24px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ fontSize: '14px', color: '#868e96', fontWeight: 500 }}>
                                                Current Plan
                                            </div>
                                            <div style={{ fontSize: '20px', fontWeight: 700, color: PRIMARY_COLOR }}>
                                                {currentSub.subscriptionPlan.packageName}
                                            </div>
                                        </div>
                                        <span
                                            style={{
                                                background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5080C8 100%)`,
                                                color: 'white',
                                                padding: '8px 16px',
                                                borderRadius: '999px',
                                                fontSize: '14px',
                                                fontWeight: 700,
                                                height: 'fit-content',
                                            }}
                                        >
                                            Active
                                        </span>
                                    </div>
                                    {currentSub.subEndTime && (
                                        <div style={{ fontSize: '14px', color: '#868e96', marginTop: '12px' }}>
                                            Renews on {new Date(currentSub.subEndTime).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        border: `1px solid ${BORDER_COLOR}`,
                                        borderRadius: '8px',
                                        display: 'inline-flex',
                                        padding: '4px',
                                    }}
                                >
                                    <button
                                        onClick={() => setBillingCycle('monthly')}
                                        style={{
                                            padding: '8px 24px',
                                            border: 'none',
                                            borderRadius: '6px',
                                            background: billingCycle === 'monthly' ? `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5080C8 100%)` : 'transparent',
                                            color: billingCycle === 'monthly' ? 'white' : '#868e96',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        onClick={() => setBillingCycle('yearly')}
                                        style={{
                                            padding: '8px 24px',
                                            border: 'none',
                                            borderRadius: '6px',
                                            background: billingCycle === 'yearly' ? `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5080C8 100%)` : 'transparent',
                                            color: billingCycle === 'yearly' ? 'white' : '#868e96',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        Yearly (Save 20%)
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                                {paidPlans.map((plan) => (
                                    <div key={plan.uuid}>
                                        <PricingCard
                                            plan={plan}
                                            billingCycle={billingCycle}
                                            onSubscribe={handleSubscribe}
                                            isCurrentPlan={currentSub?.subscriptionPlanId === plan.uuid}
                                            isLoading={subscribingTo === plan.uuid}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div
                                style={{
                                    backgroundColor: '#e7f5ff',
                                    border: '1px solid #74c0fc',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    display: 'flex',
                                    gap: '12px',
                                }}
                            >
                                <IconInfoCircle color={PRIMARY_COLOR} />
                                <div style={{ color: '#1971c2', fontSize: '14px' }}>
                                    All plans include automatic backups and 24/7 customer support.
                                    You can upgrade or downgrade your plan at any time.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
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
