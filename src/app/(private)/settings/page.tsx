'use client'

import { Container, Grid, Title, Text, Stack } from '@mantine/core'
import { SettingsSidebar } from '@/app/(private)/settings/_components/sidebar'

const PRIMARY_COLOR = '#6B9ADF'

export default function Page() {
    return (
        <Container size="xl" py="xl">
            <Stack gap="xl">
                <div>
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
                        Settings
                    </Title>
                    <Text size="lg" c="dimmed" mt="xs">
                        Manage your account settings and preferences
                    </Text>
                </div>

                <Grid gutter="lg">
                    <Grid.Col span={{ base: 12, md: 3 }}>
                        <SettingsSidebar />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 9 }}>
                        <Stack
                            gap="md"
                            style={{
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '12px',
                                padding: '32px',
                                border: '1px solid rgba(107, 154, 223, 0.3)',
                                boxShadow: '0 4px 16px rgba(107, 154, 223, 0.12)',
                                minHeight: '400px',
                            }}
                        >
                            <Text size="lg" fw={600} c="dimmed">
                                Select a setting from the sidebar
                            </Text>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    )
}