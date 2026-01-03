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
        <div
            style={{
                borderColor: isPopular ? PRIMARY_COLOR : BORDER_COLOR,
                borderWidth: isPopular ? '2px' : '1px',
                borderStyle: 'solid',
                backgroundColor: isPopular ? '#F4F8FF' : '#FFFFFF',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.2s ease',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
        >
            {isPopular && marketing.badge && (
                <span
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 2,
                        textTransform: 'uppercase',
                        backgroundColor: PRIMARY_COLOR,
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '999px',
                        fontSize: '14px',
                        fontWeight: 700,
                    }}
                >
                    {marketing.badge}
                </span>
            )}

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: PRIMARY_COLOR, textTransform: 'uppercase' }}>
                        {plan.packageName}
                    </div>

                    <div style={{ fontSize: '14px', color: '#868e96', fontWeight: 500, marginTop: '4px' }}>
                        {marketing.subtitle}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '24px' }}>
                        <span style={{ fontSize: '44px', fontWeight: 900, lineHeight: 1 }}>
                            ${price}
                        </span>
                        <span style={{ fontSize: '16px', color: '#868e96', fontWeight: 600 }}>
                            /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                    </div>
                </div>

                <ul
                    style={{
                        flex: 1,
                        listStyle: 'none',
                        padding: 0,
                        margin: '16px 0 0 0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}
                >
                    {marketing.features.map((feature, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <div
                                style={{
                                    width: '22px',
                                    height: '22px',
                                    borderRadius: '999px',
                                    backgroundColor: `${PRIMARY_COLOR}20`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <IconCheck size={14} stroke={3} color={PRIMARY_COLOR} />
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#444', lineHeight: '22px' }}>
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={() => onSubscribe(plan)}
                    disabled={isCurrentPlan || isLoading}
                    style={{
                        backgroundColor: isCurrentPlan || isLoading ? '#e9ecef' : PRIMARY_COLOR,
                        color: isCurrentPlan || isLoading ? '#868e96' : 'white',
                        height: '50px',
                        fontSize: '16px',
                        marginTop: 'auto',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: isCurrentPlan || isLoading ? 'not-allowed' : 'pointer',
                        width: '100%',
                        transition: 'all 0.2s ease',
                    }}
                >
                    {isLoading ? 'Loading...' : isCurrentPlan ? 'Current Plan' : 'Get Started'}
                </button>
            </div>
        </div>
    )
}