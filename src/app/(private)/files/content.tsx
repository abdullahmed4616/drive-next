'use client';

import { useState, useEffect, useMemo } from 'react';
import {
    Container,
    Stack,
    Group,
    Button,
    TextInput,
    MultiSelect,
    Paper,
    Text,
    Loader,
    Alert,
    Pagination,
    NumberInput,
    Badge,
    Box,
    ThemeIcon,
    ScrollArea,
    Tooltip,
} from '@mantine/core';
import {
    IconSearch,
    IconFilter,
    IconAlertCircle,
    IconCopy,
    IconSparkles,
    IconFileStack,
    IconBrandGoogle,
    IconCheck,
} from '@tabler/icons-react';

import { FileList } from '@/app/(private)/files/_component/FileList';
import { FiltersModal } from '@/app/(private)/files/_component/FilterModal';
import { useFilterData } from '@/app/(private)/files/hooks/useFilterData';
import { useMimeType } from '@/app/(private)/files/hooks/useMimeType';
import { useDateRangeInfo } from '@/app/(private)/files/hooks/useDateRange';
import { usePagination } from '@/app/(private)/files/hooks/usePagination';
import { FilterState, ViewMode } from '@/app/(private)/files/types/File.types';
import { checkDuplicates } from './hooks/useDuplicates';
import { useConnectedDrives } from '@/app/(private)/connections/hooks/useConnectedDrives';

interface ContentProps {
    userId: string;
}

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(107, 154, 223, 0.1)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

export const Content: React.FC<ContentProps> = ({ userId }) => {
    const viewMode: ViewMode = 'table';
    const [filtersModalOpened, setFiltersModalOpened] = useState(false);
    const [showDuplicatesOnly, setShowDuplicatesOnly] = useState(false);
    const [selectedDriveId, setSelectedDriveId] = useState<string | null>(null);
    
    const [filters, setFilters] = useState<FilterState>({
        dateRange: {},
        fileSize: {},
        mimeTypes: [],
        searchQuery: "",
    });
    const [tempFilters, setTempFilters] = useState<FilterState>({
        dateRange: {},
        fileSize: {},
        mimeTypes: [],
        searchQuery: "",
    });

    
    const { data: drivesData, isLoading: isDrivesLoading } = useConnectedDrives();

    
    useEffect(() => {
        if (drivesData?.drives && drivesData.drives.length > 0 && !selectedDriveId) {
            setSelectedDriveId(drivesData.drives[0].id);
        }
    }, [drivesData, selectedDriveId]);

    const { files, isLoading, isError, error, totalFiles } = useFilterData(
        userId,
        filters,
        selectedDriveId
    );

    const { data: duplicateData, isLoading: isDuplicatesLoading } = checkDuplicates(userId, selectedDriveId);

    const { data: mimeTypeData, isLoading: isMimeTypeLoading } = useMimeType(userId, selectedDriveId);

    const { data: dateRangeInfo } = useDateRangeInfo(userId, selectedDriveId);

    const duplicateInfo = useMemo(() => {
        if (!duplicateData?.data || !duplicateData?.duplicateGroups) {
            return {
                duplicateChecksums: new Set<string>(),
                duplicateFiles: [],
                duplicateCount: 0,
                duplicateGroups: 0,
            };
        }

        const duplicateFileIds = new Set(duplicateData.data.map((file) => file.id));
        const duplicateFiles = files.filter((file) => duplicateFileIds.has(file.id));
        const duplicateChecksums = new Set(
            duplicateData.duplicateGroups.map((group) => group.md5Checksum)
        );

        return {
            duplicateChecksums,
            duplicateFiles,
            duplicateCount: duplicateData.count,
            duplicateGroups: duplicateData.duplicateGroups.length,
        };
    }, [duplicateData, files]);

    const displayFiles = showDuplicatesOnly
        ? duplicateInfo.duplicateFiles
        : files;

    const {
        paginatedData,
        currentPage,
        totalPages,
        goToPage,
        startIndex,
        endIndex,
        totalItems,
    } = usePagination({ data: displayFiles, pageSize: 20 });

    const handleSearchChange = (value: string) =>
        setTempFilters((prev) => ({ ...prev, searchQuery: value }));

    const handleSearchSubmit = () =>
        setFilters((prev) => ({ ...prev, searchQuery: tempFilters.searchQuery }));

    const handleApplyFilters = () => {
        setFilters(tempFilters);
        setFiltersModalOpened(false);
    };

    const handleClearFilters = () => {
        const emptyFilters: FilterState = {
            dateRange: {},
            fileSize: {},
            mimeTypes: [],
            searchQuery: "",
        };
        setTempFilters(emptyFilters);
        setFilters(emptyFilters);
        setShowDuplicatesOnly(false);
    };

    useEffect(() => {
        goToPage(1);
    }, [filters, showDuplicatesOnly, selectedDriveId]);

    const mimeTypeOptions =
        mimeTypeData?.mimeTypes?.map((mt) => ({
            value: mt.value,
            label: mt.label,
            category: mt.category,
        })) || [];

    const activeFiltersCount = [
        filters.dateRange?.startDate || filters.dateRange?.endDate ? 1 : 0,
        filters.fileSize?.minSize || filters.fileSize?.maxSize ? 1 : 0,
        filters.mimeTypes?.length || 0,
        showDuplicatesOnly ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    const selectedDrive = drivesData?.drives.find(d => d.id === selectedDriveId);

    return (
        <Box
            style={{
                minHeight: "100vh",
                position: "relative",
            }}
        >
            <Box
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(107, 154, 223, 0.05)",
                    pointerEvents: "none",
                }}
            />

            <Container size="xl" py="xl" style={{ position: "relative", zIndex: 1 }}>
                <Stack gap="lg">
                    
                    <Paper
                        shadow="xl"
                        p="xl"
                        radius="lg"
                        style={{
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            border: `1px solid ${BORDER_COLOR}`,
                        }}
                    >
                        <Group justify="space-between" align="center">
                            <Box>
                                <Group gap="sm" align="center">
                                    <ThemeIcon
                                        size={48}
                                        radius="lg"
                                        variant="filled"
                                        color={PRIMARY_COLOR}
                                    >
                                        <IconFileStack size={28} />
                                    </ThemeIcon>
                                    <div>
                                        <Text
                                            size="32px"
                                            fw={700}
                                            c={PRIMARY_COLOR}
                                        >
                                            My Files
                                        </Text>
                                        <Group gap="xs" mt={4}>
                                            <Badge
                                                size="lg"
                                                variant="filled"
                                                color={PRIMARY_COLOR}
                                                leftSection={<IconSparkles size={14} />}
                                            >
                                                {totalFiles} files
                                            </Badge>
                                            {!isDuplicatesLoading && duplicateInfo.duplicateCount > 0 && (
                                                <Badge
                                                    size="lg"
                                                    variant="filled"
                                                    color="orange"
                                                    leftSection={<IconCopy size={14} />}
                                                >
                                                    {duplicateInfo.duplicateCount} duplicates
                                                </Badge>
                                            )}
                                        </Group>
                                    </div>
                                </Group>
                            </Box>
                        </Group>
                    </Paper>

                    {/* Drive Selector Section */}
                    {!isDrivesLoading && drivesData?.drives && drivesData.drives.length > 0 && (
                        <Paper
                            shadow="xl"
                            p="lg"
                            radius="lg"
                            style={{
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                                border: `1px solid ${BORDER_COLOR}`,
                            }}
                        >
                            <Stack gap="md">
                                <Group gap="sm">
                                    <IconBrandGoogle size={24} color={PRIMARY_COLOR} />
                                    <Text size="lg" fw={700} c={PRIMARY_COLOR}>
                                        Select Drive Account
                                    </Text>
                                    <Badge size="sm" variant="light" color={PRIMARY_COLOR}>
                                        {drivesData.drives.length} connected
                                    </Badge>
                                </Group>
                                
                                <ScrollArea>
                                    <Group gap="sm" wrap="nowrap">
                                        {drivesData.drives.map((drive) => (
                                            <Tooltip 
                                                key={drive.id} 
                                                label={drive.gmailAccount}
                                                position="bottom"
                                            >
                                                <Button
                                                    variant={selectedDriveId === drive.id ? "filled" : "light"}
                                                    color={PRIMARY_COLOR}
                                                    size="md"
                                                    radius="lg"
                                                    leftSection={<IconBrandGoogle size={18} />}
                                                    rightSection={
                                                        selectedDriveId === drive.id && (
                                                            <IconCheck size={16} />
                                                        )
                                                    }
                                                    onClick={() => setSelectedDriveId(drive.id)}
                                                    style={{
                                                        minWidth: '200px',
                                                        boxShadow: selectedDriveId === drive.id 
                                                            ? `0 4px 14px 0 rgba(107, 154, 223, 0.4)` 
                                                            : undefined,
                                                    }}
                                                >
                                                    <Text
                                                        size="sm"
                                                        fw={600}
                                                        style={{
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                            maxWidth: '150px',
                                                        }}
                                                    >
                                                        {drive.gmailAccount}
                                                    </Text>
                                                </Button>
                                            </Tooltip>
                                        ))}
                                    </Group>
                                </ScrollArea>

                                {selectedDrive && (
                                    <Paper
                                        p="sm"
                                        radius="md"
                                        style={{
                                            background: ACCENT_BG_COLOR,
                                            border: `1px solid ${BORDER_COLOR}`,
                                        }}
                                    >
                                        <Group gap="xs">
                                            <Text size="sm" c="dimmed">
                                                Viewing files from:
                                            </Text>
                                            <Text size="sm" fw={600} c={PRIMARY_COLOR}>
                                                {selectedDrive.gmailAccount}
                                            </Text>
                                        </Group>
                                    </Paper>
                                )}
                            </Stack>
                        </Paper>
                    )}

                    {!isDuplicatesLoading && duplicateInfo.duplicateCount > 0 && (
                        <Alert
                            icon={<IconCopy size={20} />}
                            title="Duplicate Files Detected"
                            color="orange"
                            radius="lg"
                            variant="light"
                            styles={{
                                root: {
                                    background: ACCENT_BG_COLOR,
                                    border: `2px solid ${BORDER_COLOR}`,
                                    backdropFilter: "blur(10px)",
                                },
                                title: {
                                    fontSize: "18px",
                                    fontWeight: 700,
                                },
                            }}
                        >
                            <Text size="sm" fw={500}>
                                Found {duplicateInfo.duplicateGroups} groups of duplicate files with{" "}
                                {duplicateInfo.duplicateCount} total duplicate files.
                            </Text>
                        </Alert>
                    )}

                    <Paper
                        shadow="xl"
                        p="lg"
                        radius="lg"
                        style={{
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            border: `1px solid ${BORDER_COLOR}`,
                        }}
                    >
                        <Stack gap="md">
                            <Group align="flex-end" grow>
                                <TextInput
                                    placeholder="Search your files..."
                                    leftSection={<IconSearch size={20} />}
                                    value={tempFilters.searchQuery}
                                    onChange={(e) => handleSearchChange(e.currentTarget.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSearchSubmit();
                                    }}
                                    size="md"
                                    radius="lg"
                                    styles={{
                                        input: {
                                            border: `2px solid ${ACCENT_BG_COLOR}`,
                                            "&:focus": {
                                                borderColor: PRIMARY_COLOR,
                                            },
                                        },
                                    }}
                                    rightSection={
                                        tempFilters.searchQuery && (
                                            <Button
                                                size="xs"
                                                variant="subtle"
                                                radius="lg"
                                                onClick={() => {
                                                    setTempFilters((prev) => ({ ...prev, searchQuery: "" }));
                                                    setFilters((prev) => ({ ...prev, searchQuery: "" }));
                                                }}
                                            >
                                                Clear
                                            </Button>
                                        )
                                    }
                                />
                                <Group gap="xs" wrap="nowrap">
                                    <Button
                                        variant="filled"
                                        color={PRIMARY_COLOR}
                                        leftSection={<IconSearch size={20} />}
                                        onClick={handleSearchSubmit}
                                        size="md"
                                        radius="lg"
                                        style={{
                                            boxShadow: `0 4px 14px 0 rgba(107, 154, 223, 0.4)`,
                                        }}
                                    >
                                        Search
                                    </Button>
                                    <Button
                                        variant="filled"
                                        color={PRIMARY_COLOR}
                                        leftSection={<IconFilter size={20} />}
                                        onClick={() => setFiltersModalOpened(true)}
                                        size="md"
                                        radius="lg"
                                        style={{
                                            boxShadow: `0 4px 14px 0 rgba(107, 154, 223, 0.4)`,
                                        }}
                                        rightSection={
                                            activeFiltersCount > 0 && (
                                                <Badge
                                                    size="sm"
                                                    variant="filled"
                                                    color="white"
                                                    style={{ color: PRIMARY_COLOR }}
                                                >
                                                    {activeFiltersCount}
                                                </Badge>
                                            )
                                        }
                                    >
                                        Filters
                                    </Button>
                                </Group>
                            </Group>
                        </Stack>
                    </Paper>

                    <FiltersModal
                        opened={filtersModalOpened}
                        onClose={() => setFiltersModalOpened(false)}
                        filters={tempFilters}
                        onFiltersChange={setTempFilters}
                        onApplyFilters={handleApplyFilters}
                        onClearFilters={handleClearFilters}
                        mimeTypeOptions={mimeTypeOptions}
                        isMimeTypeLoading={isMimeTypeLoading}
                        dateRangeInfo={dateRangeInfo}
                        // New props for duplicate handling
                        showDuplicatesOnly={showDuplicatesOnly}
                        onShowDuplicatesChange={setShowDuplicatesOnly}
                        duplicateInfo={duplicateInfo}
                        isDuplicatesLoading={isDuplicatesLoading}
                    />

                    {isLoading && (
                        <Paper
                            shadow="xl"
                            p="xl"
                            radius="lg"
                            style={{
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <Stack align="center" gap="md">
                                <Box
                                    style={{
                                        background: PRIMARY_COLOR,
                                        borderRadius: "50%",
                                        padding: "20px",
                                    }}
                                >
                                    <Loader size="xl" color="white" />
                                </Box>
                                <Text size="lg" fw={600}>
                                    Loading your files...
                                </Text>
                            </Stack>
                        </Paper>
                    )}

                    {isError && (
                        <Alert
                            icon={<IconAlertCircle size={20} />}
                            title="Oops! Something went wrong"
                            color="red"
                            variant="light"
                            radius="lg"
                            styles={{
                                root: {
                                    background: "rgba(250, 82, 82, 0.15)",
                                    border: "2px solid rgba(250, 82, 82, 0.3)",
                                    backdropFilter: "blur(10px)",
                                },
                            }}
                        >
                            <Text fw={500}>{error?.message || "Failed to load files. Please try again."}</Text>
                        </Alert>
                    )}

                    {!isLoading && !isError && displayFiles.length === 0 && (
                        <Paper
                            shadow="xl"
                            p="xl"
                            radius="lg"
                            style={{
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <Stack align="center" gap="md" py="xl">
                                <ThemeIcon
                                    size={120}
                                    radius="xl"
                                    variant="filled"
                                    color={PRIMARY_COLOR}
                                    style={{ opacity: 0.8 }}
                                >
                                    <IconFileStack size={60} />
                                </ThemeIcon>
                                <Text
                                    size="24px"
                                    fw={700}
                                    c={PRIMARY_COLOR}
                                >
                                    No files found
                                </Text>
                                <Text size="md" c="dimmed" ta="center" maw={400}>
                                    {showDuplicatesOnly
                                        ? "No duplicate files match your current filters"
                                        : "Try adjusting your filters or search query to find what you're looking for"}
                                </Text>
                                <Button
                                    variant="filled"
                                    color={PRIMARY_COLOR}
                                    onClick={handleClearFilters}
                                    size="md"
                                    radius="lg"
                                    mt="md"
                                >
                                    Clear Filters
                                </Button>
                            </Stack>
                        </Paper>
                    )}

                    {!isLoading && !isError && paginatedData.length > 0 && (
                        <>
                            <Group justify="space-between">
                                <Badge
                                    size="lg"
                                    variant="light"
                                    color={PRIMARY_COLOR}
                                    radius="lg"
                                    style={{
                                        padding: "12px 20px",
                                        fontSize: "14px",
                                    }}
                                >
                                    Showing {startIndex} - {endIndex} of {totalItems} files
                                    {showDuplicatesOnly && " (duplicates only)"}
                                </Badge>
                            </Group>

                            <FileList files={paginatedData} />

                            {totalPages > 1 && (
                                <Group justify="center" mt="xl">
                                    <Pagination
                                        value={currentPage}
                                        onChange={goToPage}
                                        total={totalPages}
                                        siblings={1}
                                        boundaries={1}
                                        size="lg"
                                        radius="lg"
                                        styles={{
                                            control: {
                                                "&[data-active]": {
                                                    background: PRIMARY_COLOR,
                                                    border: "none",
                                                },
                                            },
                                        }}
                                    />
                                </Group>
                            )}
                        </>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};