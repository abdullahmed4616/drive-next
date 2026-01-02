interface MarketingContent {
    subtitle: string;
    features: string[];
    popular: boolean;
    badge?: string;
}

export const marketingPlans: Record<string, MarketingContent> = {
    BASE: {
        subtitle: 'Best for small teams',
        features: [
            'Up to 3 Connected Drives',
            'Unlimited File Indexing',
            'Advanced Filtration',
            'AI Semantic Search',
            'Move Files Between Drives',
            '1,000 File Movements/Month',
            'Priority Email Support',
            'Storage Analytics Dashboard',
            'Duplicate File Detection',
        ],
        popular: true,
        badge: 'Most Popular',
    },
    PRO: {
        subtitle: 'For power users & agencies',
        features: [
            'Unlimited Connected Drives',
            'Unlimited File Indexing',
            'Advanced Filtration',
            'AI Semantic Search',
            'Move Files Between Drives',
            'Unlimited File Movements',
            'Priority Support (24/7)',
            'Advanced Analytics & Reports',
            'Duplicate File Detection',
            'Automated Organization',
            'API Access',
            'White-Label Option',
        ],
        popular: false,
    },
}