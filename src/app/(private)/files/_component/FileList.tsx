import { Table, Group, Text, Badge, ActionIcon, Tooltip, Avatar, Box, Paper } from '@mantine/core';
import { IconFile, IconExternalLink, IconFileText, IconPhoto, IconVideo, IconMusic } from '@tabler/icons-react';
import { FileData } from '@/app/(private)/files/types/File.types';
import { formatDate, formatFileSize, getMimeTypeColor, getMimeTypeLabel } from '../utils/helper';

interface FileListProps {
    files: FileData[];
}

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(107, 154, 223, 0.1)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.2)';

const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('image')) return <IconPhoto size={18} />;
    if (mimeType.includes('video')) return <IconVideo size={18} />;
    if (mimeType.includes('audio')) return <IconMusic size={18} />;
    if (mimeType.includes('pdf') || mimeType.includes('document')) return <IconFileText size={18} />;
    return <IconFile size={18} />;
};

export const FileList: React.FC<FileListProps> = ({ files }) => {
    const handleRowClick = (file: FileData) => {
        if (file.webViewLink) {
            window.open(file.webViewLink, '_blank', 'noopener,noreferrer');
        }
    };

    if (files.length === 0) {
        return (
            <Paper
                p="xl"
                radius="lg"
                style={{
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${BORDER_COLOR}`,
                }}
            >
                <Text c="dimmed" size="lg" fw={500}>
                    No files found
                </Text>
            </Paper>
        );
    }

    return (
        <Paper
            shadow="xl"
            radius="lg"
            style={{
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${BORDER_COLOR}`,
            }}
        >
            <Table.ScrollContainer minWidth={800}>
                <Table
                    highlightOnHover
                    styles={{
                        table: {
                            borderCollapse: 'separate',
                            borderSpacing: 0,
                        },
                        th: {
                            background: PRIMARY_COLOR,
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '14px',
                            padding: '16px',
                            borderBottom: 'none',
                        },
                        tr: {
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                transform: 'scale(1.01)',
                                boxShadow: `0 4px 12px ${ACCENT_BG_COLOR}`,
                                background: ACCENT_BG_COLOR,
                            },
                        },
                        td: {
                            padding: '16px',
                            borderBottom: `1px solid ${BORDER_COLOR}`,
                        },
                    }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>File Name</Table.Th>
                            <Table.Th>Type</Table.Th>
                            <Table.Th>Size</Table.Th>
                            <Table.Th>Created</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {files.map((file, index) => (
                            <Table.Tr
                                key={file.id}
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleRowClick(file)}
                            >
                                <Table.Td>
                                    <Group gap="sm">
                                        {file.thumbnailLink ? (
                                            <Avatar
                                                src={file.thumbnailLink}
                                                size="md"
                                                radius="lg"
                                                style={{
                                                    border: `2px solid ${BORDER_COLOR}`,
                                                }}
                                            />
                                        ) : (
                                            <Avatar
                                                size="md"
                                                radius="lg"
                                                style={{
                                                    background: PRIMARY_COLOR,
                                                    border: `2px solid ${BORDER_COLOR}`,
                                                }}
                                            >
                                                {getFileIcon(file.mimeType)}
                                            </Avatar>
                                        )}
                                        <Box>
                                            <Text size="sm" fw={600} lineClamp={1} style={{ maxWidth: 300 }}>
                                                {file.fileName}
                                            </Text>
                                        </Box>
                                    </Group>
                                </Table.Td>
                                <Table.Td>
                                    <Badge
                                        variant="filled"
                                        color={getMimeTypeColor(file.mimeType)}
                                        size="md"
                                        radius="lg"
                                        style={{
                                            fontWeight: 600,
                                            padding: '8px 12px',
                                        }}
                                    >
                                        {getMimeTypeLabel(file.mimeType)}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Badge
                                        variant="light"
                                        color={PRIMARY_COLOR}
                                        size="md"
                                        radius="lg"
                                        style={{ fontWeight: 600 }}
                                    >
                                        {formatFileSize(file.fileSize)}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Text size="sm" c="dimmed" fw={500}>
                                        {formatDate(file.fileCreatedTime)}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        {file.webViewLink && (
                                            <Tooltip label="Open in Drive" withArrow>
                                                <ActionIcon
                                                    variant="filled"
                                                    color={PRIMARY_COLOR}
                                                    size="lg"
                                                    radius="lg"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open(file.webViewLink, '_blank', 'noopener,noreferrer');
                                                    }}
                                                    style={{
                                                        boxShadow: `0 4px 12px ${ACCENT_BG_COLOR}`,
                                                    }}
                                                >
                                                    <IconExternalLink size={18} />
                                                </ActionIcon>
                                            </Tooltip>
                                        )}
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Paper>
    );
};