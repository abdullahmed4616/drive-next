"use client"
import { Container, SimpleGrid, Stack } from "@mantine/core";
import StatsPanel from "@/app/(private)/dashboard/_components/StatsCard";
import RecentActivity from "@/app/(private)/dashboard/_components/RecentActivity";
import MimeTypeOverview from "@/app/(private)/dashboard/_components/MimitypeOverview";
import { useGoogleDriveStatus, useUserId } from "@/app/(private)/hooks/useAuthStatus";

const Dashboard = () => {
  const {userId} = useUserId()
  const {accounts} = useGoogleDriveStatus();
  
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">    
        <SimpleGrid
          cols={{ base: 1, xs: 2, sm: 2, md: 4 }}
          spacing={{ base: "sm", sm: "md" }}
        >
          <StatsPanel />
        </SimpleGrid>

        <MimeTypeOverview userId={userId} accounts={accounts || []} />

        <RecentActivity />
      </Stack>
    </Container>
  );
};

export default Dashboard;