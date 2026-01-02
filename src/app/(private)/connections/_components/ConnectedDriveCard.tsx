"use client";

import React, { useState } from "react";
import {
    Card,
    Group,
    Text,
    Button,
    Stack,
    ActionIcon,
    Menu,
    Modal,
    Box,
    Tooltip,
} from "@mantine/core";
import {
    IconBrandGoogle,
    IconDots,
    IconTrash,
    IconRefresh,
    IconCloud,
    IconShieldCheck,
} from "@tabler/icons-react";
import { ConnectedDrive } from "@/app/(private)/connections/hooks/useConnectedDrives";

interface ConnectedDriveCardProps {
    drive: ConnectedDrive;
    onDelete: (driveId: string) => void;
    onSync: (driveId: string) => void;
    isLoading?: boolean;
    isSyncing?: boolean;
    viewMode?: "grid" | "list";
}

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(107, 154, 223, 0.2)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';
const GOOGLE_BLUE = '#4285F4';
const WARNING_BG = 'rgba(107, 154, 223, 0.1)';

export function ConnectedDriveCard({
    drive,
    onDelete,
    onSync,
    isLoading = false,
    isSyncing = false,
    viewMode = "grid",
}: ConnectedDriveCardProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        onDelete(drive.id);
        setDeleteModalOpen(false);
    };

    const handleSync = () => {
        onSync(drive.id);
    };

    if (viewMode === "grid") {
        return (
            <>
                <Card
                    shadow="md"
                    padding="0"
                    radius="xl"
                    withBorder
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        overflow: "hidden",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                        borderColor: BORDER_COLOR,
                        borderWidth: 2,
                    }}
                >
                    <Box
                        style={{
                            background: PRIMARY_COLOR,
                            padding: "20px",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            style={{
                                position: "absolute",
                                top: -50,
                                right: -50,
                                width: 150,
                                height: 150,
                                borderRadius: "50%",
                                background: "rgba(255, 255, 255, 0.1)",
                                transition: "transform 0.3s ease",
                                transform: isHovered ? "scale(1.2)" : "scale(1)",
                            }}
                        />
                        <Box
                            style={{
                                position: "absolute",
                                bottom: -30,
                                left: -30,
                                width: 100,
                                height: 100,
                                borderRadius: "50%",
                                background: "rgba(255, 255, 255, 0.1)",
                                transition: "transform 0.3s ease",
                                transform: isHovered ? "scale(1.2)" : "scale(1)",
                            }}
                        />

                        <Group justify="space-between" wrap="nowrap" style={{ position: "relative" }}>
                            <Group gap="sm">
                                <Box
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: "16px",
                                        background: "rgba(255, 255, 255, 0.95)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                                        position: "relative",
                                    }}
                                >
                                    <IconBrandGoogle size={32} color={GOOGLE_BLUE} />
                                </Box>

                                <Stack gap={4}>
                                    <Text fw={700} size="lg" c="white" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                                        Google Drive
                                    </Text>
                                    <Group gap="xs">
                                        <IconCloud size={14} color="white" />
                                        <Text size="xs" c="white" opacity={0.9}>
                                            Connected
                                        </Text>
                                    </Group>
                                </Stack>
                            </Group>

                            <Menu shadow="xl" width={220} position="bottom-end">
                                <Menu.Target>
                                    <ActionIcon
                                        variant="subtle"
                                        size="lg"
                                        style={{
                                            background: "rgba(255, 255, 255, 0.2)",
                                            backdropFilter: "blur(10px)",
                                            color: "white",
                                        }}
                                    >
                                        <IconDots size={20} />
                                    </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item
                                        color={PRIMARY_COLOR}
                                        leftSection={<IconTrash size={18} />}
                                        onClick={handleDeleteClick}
                                        disabled={isLoading}
                                    >
                                        Disconnect Drive
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Box>

                    <Stack gap="md" p="xl">
                        <Box>
                            <Group gap="xs" mb={8}>
                                <IconShieldCheck size={16} color={PRIMARY_COLOR} />
                                <Text size="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.5px" }}>
                                    Connected Account
                                </Text>
                            </Group>
                            <Text
                                fw={600}
                                size="md"
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                                title={drive.gmailAccount}
                            >
                                {drive.gmailAccount}
                            </Text>
                            <Text size="sm" c="dimmed" mt={4}>
                                Connected on {formatDate(drive.createdAt)}
                            </Text>
                        </Box>

                        <Button
                            fullWidth
                            variant="filled"
                            color={PRIMARY_COLOR}
                            size="md"
                            onClick={handleSync}
                            loading={isSyncing}
                            disabled={isLoading}
                            leftSection={<IconRefresh size={18} />}
                            radius="xl"
                            style={{
                                boxShadow: `0 4px 12px ${BORDER_COLOR}`,
                            }}
                        >
                            Sync Drive Now
                        </Button>
                    </Stack>
                </Card>

                <Modal
                    opened={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    title={
                        <Group gap="sm">
                            <Box
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    background: ACCENT_BG_COLOR,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <IconTrash size={20} color={PRIMARY_COLOR} />
                            </Box>
                            <Text fw={700} size="lg">
                                Disconnect Drive
                            </Text>
                        </Group>
                    }
                    centered
                    radius="lg"
                    size="md"
                >
                    <Stack gap="lg" mt="md">
                        <Box
                            p="md"
                            style={{
                                background: WARNING_BG,
                                borderRadius: "12px",
                                border: `1px solid ${BORDER_COLOR}`,
                            }}
                        >
                            <Text size="sm" c="dark">
                                Are you sure you want to disconnect{" "}
                                <Text component="span" fw={700} c={PRIMARY_COLOR}>
                                    {drive.gmailAccount}
                                </Text>
                                ?
                            </Text>
                            <Text size="sm" c="dimmed" mt="xs">
                                This will permanently remove all associated files and folders from your dashboard.
                            </Text>
                        </Box>

                        <Group justify="flex-end" gap="sm">
                            <Button
                                variant="subtle"
                                color="gray"
                                onClick={() => setDeleteModalOpen(false)}
                                radius="lg"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="filled"
                                color={PRIMARY_COLOR}
                                onClick={handleConfirmDelete}
                                loading={isLoading}
                                radius="lg"
                            >
                                Disconnect
                            </Button>
                        </Group>
                    </Stack>
                </Modal>
            </>
        );
    }

    // List view
    return (
        <>
            <Card
                shadow="md"
                padding="0"
                radius="lg"
                withBorder
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    overflow: "hidden",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    borderLeft: `4px solid ${PRIMARY_COLOR}`,
                    transform: isHovered ? "translateX(4px)" : "translateX(0)",
                }}
            >
                <Group justify="space-between" wrap="nowrap" align="center" p="lg">
                    <Group gap="lg" style={{ flex: 1, minWidth: 0 }}>
                        <Box
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: "16px",
                                background: PRIMARY_COLOR,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                                position: "relative",
                                flexShrink: 0,
                            }}
                        >
                            <Box
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: "12px",
                                    background: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <IconBrandGoogle size={32} color={GOOGLE_BLUE} />
                            </Box>
                        </Box>

                        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                            <Text fw={700} size="md">
                                Google Drive
                            </Text>
                            <Text
                                fw={600}
                                size="sm"
                                c="dimmed"
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                                title={drive.gmailAccount}
                            >
                                {drive.gmailAccount}
                            </Text>
                            <Text size="xs" c="dimmed">
                                Connected {formatDate(drive.createdAt)}
                            </Text>
                        </Stack>
                    </Group>

                    <Group gap="sm" wrap="nowrap">
                        <Button
                            variant="filled"
                            color={PRIMARY_COLOR}
                            size="md"
                            onClick={handleSync}
                            loading={isSyncing}
                            disabled={isLoading}
                            leftSection={<IconRefresh size={18} />}
                            radius="xl"
                        >
                            Sync
                        </Button>

                        <Menu shadow="xl" width={220} position="bottom-end">
                            <Menu.Target>
                                <ActionIcon variant="light" color="gray" size="lg" radius="xl">
                                    <IconDots size={20} />
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    color={PRIMARY_COLOR}
                                    leftSection={<IconTrash size={18} />}
                                    onClick={handleDeleteClick}
                                    disabled={isLoading}
                                >
                                    Disconnect Drive
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
            </Card>

            <Modal
                opened={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title={
                    <Group gap="sm">
                        <Box
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: ACCENT_BG_COLOR,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <IconTrash size={20} color={PRIMARY_COLOR} />
                        </Box>
                        <Text fw={700} size="lg">
                            Disconnect Drive
                        </Text>
                    </Group>
                }
                centered
                radius="lg"
                size="md"
            >
                <Stack gap="lg" mt="md">
                    <Box
                        p="md"
                        style={{
                            background: WARNING_BG,
                            borderRadius: "12px",
                            border: `1px solid ${BORDER_COLOR}`,
                        }}
                    >
                        <Text size="sm" c="dark">
                            Are you sure you want to disconnect{" "}
                            <Text component="span" fw={700} c={PRIMARY_COLOR}>
                                {drive.gmailAccount}
                            </Text>
                            ?
                        </Text>
                        <Text size="sm" c="dimmed" mt="xs">
                            This will permanently remove all associated files and folders from your dashboard.
                        </Text>
                    </Box>

                    <Group justify="flex-end" gap="sm">
                        <Button
                            variant="subtle"
                            color="gray"
                            onClick={() => setDeleteModalOpen(false)}
                            radius="lg"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="filled"
                            color={PRIMARY_COLOR}
                            onClick={handleConfirmDelete}
                            loading={isLoading}
                            radius="lg"
                        >
                            Disconnect
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
}