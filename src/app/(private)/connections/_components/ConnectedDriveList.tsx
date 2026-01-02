"use client";

import React, { useState } from "react";
import {
    Stack,
    Text,
    Alert,
    Loader,
    Center,
    Table,
    ActionIcon,
    Group,
    Tooltip,
    Menu,
    Modal,
    Button,
    Box,
    Paper,
    rem,
    Avatar,
} from "@mantine/core";
import {
    IconAlertCircle,
    IconDots,
    IconTrash,
    IconRefresh,
    IconBrandGoogle,
    IconCalendar,
    IconClock,
    IconMail,
} from "@tabler/icons-react";
import {
    useConnectedDrives,
    useDeleteDrive,
} from "@/app/(private)/connections/hooks/useConnectedDrives";

interface ConnectedDrivesListProps {
    onSync?: (driveId: string) => void;
    syncingDriveId?: string | null;
}

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(107, 154, 223, 0.1)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

export function ConnectedDrivesList({
    onSync,
    syncingDriveId = null,
}: ConnectedDrivesListProps) {
    const { data, isLoading, isError, error } = useConnectedDrives();
    const deleteDrive = useDeleteDrive();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDrive, setSelectedDrive] = useState<{
        id: string;
        email: string;
    } | null>(null);
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    const handleSync = (driveId: string) => {
        if (onSync) {
            onSync(driveId);
        }
    };

    const openDeleteModal = (driveId: string, email: string) => {
        setSelectedDrive({ id: driveId, email });
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (selectedDrive) {
            deleteDrive.mutate({ driveId: selectedDrive.id });
            setDeleteModalOpen(false);
            setSelectedDrive(null);
        }
    };

    const formatDate = (date: string | Date | null) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (isLoading) {
        return (
            <Center py={80}>
                <Stack align="center" gap="xl">
                    <Box
                        style={{
                            position: "relative",
                            width: 120,
                            height: 120,
                        }}
                    >
                        <Box
                            style={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: "50%",
                                background: ACCENT_BG_COLOR,
                                opacity: 1,
                                animation: "pulse 2s infinite",
                            }}
                        />
                        <Box
                            style={{
                                position: "absolute",
                                inset: 10,
                                borderRadius: "50%",
                                background: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Loader size="xl" color={PRIMARY_COLOR} />
                        </Box>
                    </Box>
                    <Stack align="center" gap="xs">
                        <Text fw={700} size="lg">
                            Loading Your Connected Drives
                        </Text>
                        <Text c="dimmed" size="sm">
                            Please wait while we fetch your drive information...
                        </Text>
                    </Stack>
                </Stack>
            </Center>
        );
    }

    if (isError) {
        return (
            <Paper
                shadow="lg"
                radius="lg"
                p="xl"
                style={{
                    background: ACCENT_BG_COLOR,
                    border: `2px solid ${BORDER_COLOR}`,
                }}
            >
                <Group gap="md" align="flex-start">
                    <Box
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            background: PRIMARY_COLOR,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            boxShadow: `0 8px 16px ${BORDER_COLOR}`,
                        }}
                    >
                        <IconAlertCircle size={32} color="white" />
                    </Box>
                    <Stack gap="xs" style={{ flex: 1 }}>
                        <Text fw={700} size="lg" c={PRIMARY_COLOR}>
                            Error Loading Drives
                        </Text>
                        <Text size="sm" c="dimmed">
                            {error instanceof Error
                                ? error.message
                                : "Failed to load connected drives. Please try again later."}
                        </Text>
                    </Stack>
                </Group>
            </Paper>
        );
    }

    if (!data || data.drives.length === 0) {
        return null;
    }

    return (
        <>
            <Stack gap="lg">
                <Paper
                    shadow="lg"
                    radius="lg"
                    style={{
                        overflow: "hidden",
                        border: `1px solid ${BORDER_COLOR}`,
                    }}
                >
                    <Table.ScrollContainer minWidth={800}>
                        <Table
                            verticalSpacing="md"
                            horizontalSpacing="lg"
                            highlightOnHover
                            style={{
                                borderCollapse: "separate",
                                borderSpacing: 0,
                            }}
                        >
                            <Table.Thead
                                style={{
                                    background: PRIMARY_COLOR,
                                    position: "relative",
                                }}
                            >
                                <Table.Tr>
                                    <Table.Th
                                        style={{
                                            color: "white",
                                            fontWeight: 700,
                                            fontSize: rem(13),
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            padding: "20px 24px",
                                        }}
                                    >
                                        <Group gap="xs">
                                            <IconMail size={18} />
                                            <span>Drive Account</span>
                                        </Group>
                                    </Table.Th>
                                    <Table.Th
                                        style={{
                                            color: "white",
                                            fontWeight: 700,
                                            fontSize: rem(13),
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            padding: "20px 24px",
                                        }}
                                    >
                                        <Group gap="xs">
                                            <IconCalendar size={18} />
                                            <span>Connected On</span>
                                        </Group>
                                    </Table.Th>
                                    <Table.Th
                                        style={{
                                            color: "white",
                                            fontWeight: 700,
                                            fontSize: rem(13),
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            padding: "20px 24px",
                                        }}
                                    >
                                        <Group gap="xs">
                                            <IconClock size={18} />
                                            <span>Last Updated</span>
                                        </Group>
                                    </Table.Th>
                                    <Table.Th
                                        style={{
                                            color: "white",
                                            fontWeight: 700,
                                            fontSize: rem(13),
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            textAlign: "right",
                                            padding: "20px 24px",
                                        }}
                                    >
                                        Actions
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>

                            <Table.Tbody>
                                {data.drives.map((drive) => (
                                    <Table.Tr
                                        key={drive.id}
                                        onMouseEnter={() => setHoveredRow(drive.id)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                        style={{
                                            transition: "all 0.2s ease",
                                            background:
                                                hoveredRow === drive.id
                                                    ? ACCENT_BG_COLOR
                                                    : "white",
                                            borderLeft:
                                                hoveredRow === drive.id
                                                    ? `4px solid ${PRIMARY_COLOR}`
                                                    : "4px solid transparent",
                                            transform:
                                                hoveredRow === drive.id
                                                    ? "translateX(2px)"
                                                    : "translateX(0)",
                                        }}
                                    >
                                        <Table.Td style={{ padding: "20px 24px" }}>
                                            <Group gap="md">
                                                <Avatar
                                                    size={44}
                                                    radius="md"
                                                    style={{
                                                        background: PRIMARY_COLOR,
                                                    }}
                                                >
                                                    <IconBrandGoogle size={24} color="white" />
                                                </Avatar>
                                                <div>
                                                    <Text fw={600} size="sm">
                                                        {drive.gmailAccount}
                                                    </Text>
                                                    <Text size="xs" c="dimmed">
                                                        Google Drive
                                                    </Text>
                                                </div>
                                            </Group>
                                        </Table.Td>

                                        <Table.Td style={{ padding: "20px 24px" }}>
                                            <Group gap="xs">
                                                <Box
                                                    style={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: "50%",
                                                        background: PRIMARY_COLOR,
                                                    }}
                                                />
                                                <Text size="sm" fw={500}>
                                                    {formatDate(drive.createdAt)}
                                                </Text>
                                            </Group>
                                        </Table.Td>

                                        <Table.Td style={{ padding: "20px 24px" }}>
                                            <Group gap="xs">
                                                <Box
                                                    style={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: "50%",
                                                        background: PRIMARY_COLOR,
                                                    }}
                                                />
                                                <Text size="sm" fw={500}>
                                                    {formatDate(drive.updatedAt)}
                                                </Text>
                                            </Group>
                                        </Table.Td>

                                        <Table.Td style={{ padding: "20px 24px" }}>
                                            <Group justify="flex-end" gap="xs">
                                                <Tooltip label="Sync drive">
                                                    <ActionIcon
                                                        variant="filled"
                                                        color={PRIMARY_COLOR}
                                                        size="lg"
                                                        radius="md"
                                                        onClick={() => handleSync(drive.id)}
                                                        loading={syncingDriveId === drive.id}
                                                        disabled={
                                                            syncingDriveId !== null ||
                                                            deleteDrive.isPending
                                                        }
                                                        style={{
                                                            boxShadow: `0 4px 12px ${BORDER_COLOR}`,
                                                        }}
                                                    >
                                                        <IconRefresh size={18} />
                                                    </ActionIcon>
                                                </Tooltip>

                                                <Menu shadow="xl" width={220} position="bottom-end">
                                                    <Menu.Target>
                                                        <Tooltip label="More options">
                                                            <ActionIcon
                                                                variant="subtle"
                                                                color="gray"
                                                                size="lg"
                                                                radius="md"
                                                                disabled={deleteDrive.isPending}
                                                                style={{
                                                                    transition: "all 0.2s ease",
                                                                    transform:
                                                                        hoveredRow === drive.id
                                                                            ? "rotate(90deg)"
                                                                            : "rotate(0deg)",
                                                                }}
                                                            >
                                                                <IconDots size={18} />
                                                            </ActionIcon>
                                                        </Tooltip>
                                                    </Menu.Target>

                                                    <Menu.Dropdown>
                                                        <Menu.Label>Manage Drive</Menu.Label>
                                                        <Menu.Item
                                                            color={PRIMARY_COLOR}
                                                            leftSection={<IconTrash size={18} />}
                                                            onClick={() =>
                                                                openDeleteModal(drive.id, drive.gmailAccount)
                                                            }
                                                        >
                                                            Disconnect Drive
                                                        </Menu.Item>
                                                    </Menu.Dropdown>
                                                </Menu>
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>

                    <Box
                        p="md"
                        style={{
                            background: ACCENT_BG_COLOR,
                            borderTop: `1px solid ${BORDER_COLOR}`,
                        }}
                    >
                        <Group justify="space-between">
                            <Text size="sm" c="dimmed">
                                Showing {data.drives.length}{" "}
                                {data.drives.length === 1 ? "drive" : "drives"}
                            </Text>
                        </Group>
                    </Box>
                </Paper>
            </Stack>

            <Modal
                opened={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title={
                    <Group gap="md">
                        <Box
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: "50%",
                                background: ACCENT_BG_COLOR,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: `0 4px 12px ${BORDER_COLOR}`,
                            }}
                        >
                            <IconTrash size={24} color={PRIMARY_COLOR} />
                        </Box>
                        <Text fw={700} size="xl">
                            Disconnect Google Drive
                        </Text>
                    </Group>
                }
                centered
                radius="lg"
                size="lg"
            >
                <Stack gap="xl" mt="lg">
                    <Paper
                        p="xl"
                        radius="md"
                        style={{
                            background: ACCENT_BG_COLOR,
                            border: `2px solid ${BORDER_COLOR}`,
                        }}
                    >
                        <Stack gap="md">
                            <Group gap="xs">
                                <IconAlertCircle size={20} color={PRIMARY_COLOR} />
                                <Text fw={700} size="sm" c={PRIMARY_COLOR}>
                                    WARNING: This action cannot be undone
                                </Text>
                            </Group>
                            <Text size="sm" c="dimmed">
                                Are you sure you want to disconnect{" "}
                                <Text component="span" fw={700} c={PRIMARY_COLOR}>
                                    {selectedDrive?.email}
                                </Text>
                                ? All associated files and folders will be permanently removed
                                from your dashboard.
                            </Text>
                        </Stack>
                    </Paper>

                    <Group justify="flex-end" gap="sm">
                        <Button
                            variant="light"
                            color="gray"
                            size="lg"
                            onClick={() => setDeleteModalOpen(false)}
                            radius="md"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="filled"
                            color={PRIMARY_COLOR}
                            size="lg"
                            onClick={handleDelete}
                            loading={deleteDrive.isPending}
                            leftSection={<IconTrash size={20} />}
                            radius="md"
                            style={{
                                boxShadow: `0 4px 12px ${BORDER_COLOR}`,
                            }}
                        >
                            Disconnect Drive
                        </Button>
                    </Group>
                </Stack>
            </Modal>

            <style jsx global>{`
                @keyframes pulse {
                    0%,
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.5;
                        transform: scale(0.95);
                    }
                }
            `}</style>
        </>
    );
}