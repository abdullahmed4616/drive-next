// "use client";

// import {
//     Modal,
//     Stack,
//     Group,
//     Button,
//     TextInput,
//     MultiSelect,
//     NumberInput,
//     Text,
//     Paper,
//     Box,
//     ThemeIcon,
// } from "@mantine/core";
// import {
//     IconFilter,
//     IconCalendar,
//     IconDatabase,
//     IconFile,
// }
//     from "@tabler/icons-react";
// import { FiltersModalProps } from "@/app/(private)/files/types/File.types";

// const PRIMARY_COLOR = '#6B9ADF';
// const ACCENT_BG_COLOR = 'rgba(107, 154, 223, 0.1)';
// const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

// export const FiltersModal: React.FC<FiltersModalProps> = ({
//                                                               opened,
//                                                               onClose,
//                                                               filters,
//                                                               onFiltersChange,
//                                                               onApplyFilters,
//                                                               onClearFilters,
//                                                               mimeTypeOptions,
//                                                               isMimeTypeLoading,
//                                                               dateRangeInfo,
//                                                           }) => {
//     const handleApply = () => {
//         onApplyFilters();
//         onClose();
//     };

//     const handleClear = () => {
//         onClearFilters();
//     };

//     return (
//         <Modal
//             opened={opened}
//             onClose={onClose}
//             title={
//                 <Group gap="sm">
//                     <ThemeIcon
//                         size={40}
//                         radius="lg"
//                         variant="filled"
//                         color={PRIMARY_COLOR}
//                     >
//                         <IconFilter size={24} />
//                     </ThemeIcon>
//                     <Box>
//                         <Text
//                             size="24px"
//                             fw={700}
//                             c={PRIMARY_COLOR}
//                         >
//                             Advanced Filters
//                         </Text>
//                         <Text size="xs" c="dimmed" fw={500}>
//                             Refine your file search
//                         </Text>
//                     </Box>
//                 </Group>
//             }
//             size="lg"
//             centered
//             radius="lg"
//             styles={{
//                 content: {
//                     background: ACCENT_BG_COLOR,
//                     border: `2px solid ${BORDER_COLOR}`,
//                 },
//                 header: {
//                     background: "transparent",
//                     borderBottom: `2px solid ${BORDER_COLOR}`,
//                     paddingBottom: "16px",
//                 },
//                 body: {
//                     padding: "24px",
//                 },
//             }}
//         >
//             <Stack gap="lg">
//                 <Paper
//                     p="lg"
//                     radius="lg"
//                     style={{
//                         background: "white",
//                         border: `2px solid ${ACCENT_BG_COLOR}`,
//                         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//                     }}
//                 >
//                     <Stack gap="md">
//                         <Group gap="sm">
//                             <ThemeIcon
//                                 size="lg"
//                                 radius="lg"
//                                 variant="filled"
//                                 color={PRIMARY_COLOR}
//                             >
//                                 <IconCalendar size={20} />
//                             </ThemeIcon>
//                             <Text size="md" fw={700} c={PRIMARY_COLOR}>
//                                 Date Range
//                             </Text>
//                         </Group>
//                         <Group grow align="flex-end">
//                             <TextInput
//                                 type="date"
//                                 label="Start Date"
//                                 value={filters.dateRange?.startDate || ""}
//                                 onChange={(e) =>
//                                     onFiltersChange({
//                                         ...filters,
//                                         dateRange: { ...filters.dateRange, startDate: e.currentTarget.value },
//                                     })
//                                 }
//                                 max={filters.dateRange?.endDate || dateRangeInfo?.dateRanges?.newest}
//                                 radius="lg"
//                                 styles={{
//                                     label: { fontWeight: 600, color: PRIMARY_COLOR, marginBottom: "8px" },
//                                     input: {
//                                         border: `2px solid ${ACCENT_BG_COLOR}`,
//                                         "&:focus": {
//                                             borderColor: PRIMARY_COLOR,
//                                         },
//                                     },
//                                 }}
//                             />
//                             <TextInput
//                                 type="date"
//                                 label="End Date"
//                                 value={filters.dateRange?.endDate || ""}
//                                 onChange={(e) =>
//                                     onFiltersChange({
//                                         ...filters,
//                                         dateRange: { ...filters.dateRange, endDate: e.currentTarget.value },
//                                     })
//                                 }
//                                 min={filters.dateRange?.startDate || dateRangeInfo?.dateRanges?.oldest}
//                                 radius="lg"
//                                 styles={{
//                                     label: { fontWeight: 600, color: PRIMARY_COLOR, marginBottom: "8px" },
//                                     input: {
//                                         border: `2px solid ${ACCENT_BG_COLOR}`,
//                                         "&:focus": {
//                                             borderColor: PRIMARY_COLOR,
//                                         },
//                                     },
//                                 }}
//                             />
//                         </Group>
//                     </Stack>
//                 </Paper>

//                 <Paper
//                     p="lg"
//                     radius="lg"
//                     style={{
//                         background: "white",
//                         border: `2px solid ${ACCENT_BG_COLOR}`,
//                         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//                     }}
//                 >
//                     <Stack gap="md">
//                         <Group gap="sm">
//                             <ThemeIcon
//                                 size="lg"
//                                 radius="lg"
//                                 variant="filled"
//                                 color={PRIMARY_COLOR}
//                             >
//                                 <IconDatabase size={20} />
//                             </ThemeIcon>
//                             <Text size="md" fw={700} c={PRIMARY_COLOR}>
//                                 File Size (bytes)
//                             </Text>
//                         </Group>
//                         <Group grow align="flex-end">
//                             <NumberInput
//                                 label="Minimum Size"
//                                 placeholder="e.g., 1024"
//                                 value={filters.fileSize?.minSize}
//                                 onChange={(value) =>
//                                     onFiltersChange({
//                                         ...filters,
//                                         fileSize: {
//                                             ...filters.fileSize,
//                                             minSize: typeof value === "number" ? value : undefined,
//                                         },
//                                     })
//                                 }
//                                 min={0}
//                                 radius="lg"
//                                 styles={{
//                                     label: { fontWeight: 600, color: PRIMARY_COLOR, marginBottom: "8px" },
//                                     input: {
//                                         border: `2px solid ${ACCENT_BG_COLOR}`,
//                                         "&:focus": {
//                                             borderColor: PRIMARY_COLOR,
//                                         },
//                                     },
//                                 }}
//                             />
//                             <NumberInput
//                                 label="Maximum Size"
//                                 placeholder="e.g., 1048576"
//                                 value={filters.fileSize?.maxSize}
//                                 onChange={(value) =>
//                                     onFiltersChange({
//                                         ...filters,
//                                         fileSize: {
//                                             ...filters.fileSize,
//                                             maxSize: typeof value === "number" ? value : undefined,
//                                         },
//                                     })
//                                 }
//                                 min={filters.fileSize?.minSize || 0}
//                                 radius="lg"
//                                 styles={{
//                                     label: { fontWeight: 600, color: PRIMARY_COLOR, marginBottom: "8px" },
//                                     input: {
//                                         border: `2px solid ${ACCENT_BG_COLOR}`,
//                                         "&:focus": {
//                                             borderColor: PRIMARY_COLOR,
//                                         },
//                                     },
//                                 }}
//                             />
//                         </Group>
//                     </Stack>
//                 </Paper>

//                 <Paper
//                     p="lg"
//                     radius="lg"
//                     style={{
//                         background: "white",
//                         border: `2px solid ${ACCENT_BG_COLOR}`,
//                         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//                     }}
//                 >
//                     <Stack gap="md">
//                         <Group gap="sm">
//                             <ThemeIcon
//                                 size="lg"
//                                 radius="lg"
//                                 variant="filled"
//                                 color={PRIMARY_COLOR}
//                             >
//                                 <IconFile size={20} />
//                             </ThemeIcon>
//                             <Text size="md" fw={700} c={PRIMARY_COLOR}>
//                                 File Types
//                             </Text>
//                         </Group>
//                         {isMimeTypeLoading ? (
//                             <TextInput
//                                 label="Loading..."
//                                 placeholder="Loading file types..."
//                                 disabled
//                                 radius="lg"
//                             />
//                         ) : (
//                             <MultiSelect
//                                 label="Select File Types"
//                                 placeholder="Choose one or more file types"
//                                 data={mimeTypeOptions}
//                                 value={filters.mimeTypes || []}
//                                 onChange={(value) =>
//                                     onFiltersChange({
//                                         ...filters,
//                                         mimeTypes: value,
//                                     })
//                                 }
//                                 searchable
//                                 clearable
//                                 radius="lg"
//                                 styles={{
//                                     label: { fontWeight: 600, color: PRIMARY_COLOR, marginBottom: "8px" },
//                                     input: {
//                                         border: `2px solid ${ACCENT_BG_COLOR}`,
//                                         "&:focus": {
//                                             borderColor: PRIMARY_COLOR,
//                                         },
//                                     },
//                                 }}
//                             />
//                         )}
//                     </Stack>
//                 </Paper>

//                 <Group justify="space-between" mt="md">
//                     <Button
//                         variant="filled"
//                         color={PRIMARY_COLOR}
//                         onClick={handleClear}
//                         size="md"
//                         radius="lg"
//                     >
//                         Clear All Filters
//                     </Button>
//                     <Group gap="xs">
//                         <Button
//                             variant="default"
//                             onClick={onClose}
//                             size="md"
//                             radius="lg"
//                             styles={{
//                                 root: {
//                                     border: `2px solid ${BORDER_COLOR}`,
//                                     "&:hover": {
//                                         background: ACCENT_BG_COLOR,
//                                     },
//                                 },
//                             }}
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             variant="filled"
//                             color={PRIMARY_COLOR}
//                             onClick={handleApply}
//                             size="md"
//                             radius="lg"
//                             leftSection={<IconFilter size={18} />}
//                             style={{
//                                 boxShadow: `0 4px 14px 0 rgba(107, 154, 223, 0.4)`,
//                             }}
//                         >
//                             Apply Filters
//                         </Button>
//                     </Group>
//                 </Group>
//             </Stack>
//         </Modal>
//     );
// };



"use client";

import {
    Modal,
    Stack,
    Group,
    Button,
    TextInput,
    MultiSelect,
    NumberInput,
    Text,
    Paper,
    Box,
    ThemeIcon,
    Switch,
} from "@mantine/core";
import {
    IconFilter,
    IconCalendar,
    IconDatabase,
    IconFile,
    IconCopy,
}
    from "@tabler/icons-react";
import { FiltersModalProps } from "@/app/(private)/files/types/File.types";

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(107, 154, 223, 0.1)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

interface ExtendedFiltersModalProps extends FiltersModalProps {
    showDuplicatesOnly: boolean;
    onShowDuplicatesChange: (value: boolean) => void;
    duplicateInfo: {
        duplicateCount: number;
        duplicateGroups: number;
    };
    isDuplicatesLoading: boolean;
}

export const FiltersModal: React.FC<ExtendedFiltersModalProps> = ({
    opened,
    onClose,
    filters,
    onFiltersChange,
    onApplyFilters,
    onClearFilters,
    mimeTypeOptions,
    isMimeTypeLoading,
    dateRangeInfo,
    showDuplicatesOnly,
    onShowDuplicatesChange,
    duplicateInfo,
    isDuplicatesLoading,
}) => {
    const handleApply = () => {
        onApplyFilters();
        onClose();
    };

    const handleClear = () => {
        onClearFilters();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Group gap="sm">
                    <ThemeIcon
                        size={40}
                        radius="lg"
                        variant="filled"
                        color={PRIMARY_COLOR}
                    >
                        <IconFilter size={24} />
                    </ThemeIcon>
                    <Box>
                        <Text
                            size="24px"
                            fw={700}
                            c={PRIMARY_COLOR}
                        >
                            Advanced Filters
                        </Text>
                        <Text size="xs" c="dimmed" fw={500}>
                            Refine your file search
                        </Text>
                    </Box>
                </Group>
            }
            size="lg"
            centered
            radius="lg"
            styles={{
                content: {
                    background: ACCENT_BG_COLOR,
                    border: `2px solid ${BORDER_COLOR}`,
                },
                header: {
                    background: "transparent",
                    borderBottom: `2px solid ${BORDER_COLOR}`,
                    paddingBottom: "16px",
                },
                body: {
                    padding: "24px",
                },
            }}
        >
            <Stack gap="lg">
                {/* Duplicate Files Filter */}
                <Paper
                    p="lg"
                    radius="lg"
                    style={{
                        background: "white",
                        border: `2px solid ${ACCENT_BG_COLOR}`,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    }}
                >
                    <Stack gap="md">
                        <Group gap="sm">
                            <ThemeIcon
                                size="lg"
                                radius="lg"
                                variant="filled"
                                color="orange"
                            >
                                <IconCopy size={20} />
                            </ThemeIcon>
                            <Text size="md" fw={700} c="orange">
                                Duplicate Files
                            </Text>
                        </Group>
                        <Switch
                            label="Show duplicate files only"
                            description={
                                isDuplicatesLoading
                                    ? "Loading duplicates..."
                                    : duplicateInfo.duplicateCount > 0
                                        ? `${duplicateInfo.duplicateCount} duplicate files in ${duplicateInfo.duplicateGroups} groups`
                                        : "No duplicates found"
                            }
                            checked={showDuplicatesOnly}
                            onChange={(e) => onShowDuplicatesChange(e.currentTarget.checked)}
                            disabled={isDuplicatesLoading || duplicateInfo.duplicateCount === 0}
                            color="orange"
                            size="md"
                            styles={{
                                label: { fontWeight: 600, fontSize: "14px" },
                                description: { marginTop: "4px" },
                            }}
                        />
                    </Stack>
                </Paper>

                {/* Date Range Filter */}
                <Paper
                    p="lg"
                    radius="lg"
                    style={{
                        background: "white",
                        border: `2px solid ${ACCENT_BG_COLOR}`,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    }}
                >
                    <Stack gap="md">
                        <Group gap="sm">
                            <ThemeIcon
                                size="lg"
                                radius="lg"
                                variant="filled"
                                color={PRIMARY_COLOR}
                            >
                                <IconCalendar size={20} />
                            </ThemeIcon>
                            <Text size="md" fw={700} c={PRIMARY_COLOR}>
                                Date Range
                            </Text>
                        </Group>
                        <Group grow align="flex-end">
                            <TextInput
                                type="date"
                                label="Start Date"
                                value={filters.dateRange?.startDate || ""}
                                onChange={(e) =>
                                    onFiltersChange({
                                        ...filters,
                                        dateRange: { ...filters.dateRange, startDate: e.currentTarget.value },
                                    })
                                }
                                max={filters.dateRange?.endDate || dateRangeInfo?.dateRanges?.newest}
                                radius="lg"
                                styles={{
                                    label: { fontWeight: 600, color: PRIMARY_COLOR, marginBottom: "8px" },
                                    input: {
                                        border: `2px solid ${ACCENT_BG_COLOR}`,
                                        "&:focus": {
                                            borderColor: PRIMARY_COLOR,
                                        },
                                    },
                                }}
                            />
                            <TextInput
                                type="date"
                                label="End Date"
                                value={filters.dateRange?.endDate || ""}
                                onChange={(e) =>
                                    onFiltersChange({
                                        ...filters,
                                        dateRange: { ...filters.dateRange, endDate: e.currentTarget.value },
                                    })
                                }
                                min={filters.dateRange?.startDate || dateRangeInfo?.dateRanges?.oldest}
                                radius="lg"
                                styles={{
                                    label: { fontWeight: 600, color: PRIMARY_COLOR, marginBottom: "8px" },
                                    input: {
                                        border: `2px solid ${ACCENT_BG_COLOR}`,
                                        "&:focus": {
                                            borderColor: PRIMARY_COLOR,
                                        },
                                    },
                                }}
                            />
                        </Group>
                    </Stack>
                </Paper>

                {/* File Size Filter */}
                <Paper
                    p="lg"
                    radius="lg"
                    style={{
                        background: "white",
                        border: `2px solid ${ACCENT_BG_COLOR}`,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    }}
                >
                    <Stack gap="md">
                        <Group gap="sm">
                            <ThemeIcon
                                size="lg"
                                radius="lg"
                                variant="filled"
                                color={PRIMARY_COLOR}
                            >
                                <IconDatabase size={20} />
                            </ThemeIcon>
                            <Text size="md" fw={700} c={PRIMARY_COLOR}>
                                File Size (bytes)
                            </Text>
                        </Group>
                        <Group grow align="flex-end">
                            <NumberInput
                                label="Minimum Size"
                                placeholder="e.g., 1024"
                                value={filters.fileSize?.minSize}
                                onChange={(value) =>
                                    onFiltersChange({
                                        ...filters,
                                        fileSize: {
                                            ...filters.fileSize,
                                            minSize: typeof value === "number" ? value : undefined,
                                        },
                                    })
                                }
                                min={0}
                                radius="lg"
                                styles={{
                                    label: { fontWeight: 600, color: PRIMARY_COLOR, marginBottom: "8px" },
                                    input: {
                                        border: `2px solid ${ACCENT_BG_COLOR}`,
                                        "&:focus": {
                                            borderColor: PRIMARY_COLOR,
                                        },
                                    },
                                }}
                            />
                            <NumberInput
                                label="Maximum Size"
                                placeholder="e.g., 1048576"
                                value={filters.fileSize?.maxSize}
                                onChange={(value) =>
                                    onFiltersChange({
                                        ...filters,
                                        fileSize: {
                                            ...filters.fileSize,
                                            maxSize: typeof value === "number" ? value : undefined,
                                        },
                                    })
                                }
                                min={filters.fileSize?.minSize || 0}
                                radius="lg"
                                styles={{
                                    label: { fontWeight: 600, color: PRIMARY_COLOR, marginBottom: "8px" },
                                    input: {
                                        border: `2px solid ${ACCENT_BG_COLOR}`,
                                        "&:focus": {
                                            borderColor: PRIMARY_COLOR,
                                        },
                                    },
                                }}
                            />
                        </Group>
                    </Stack>
                </Paper>

                {/* File Types Filter */}
                <Paper
                    p="lg"
                    radius="lg"
                    style={{
                        background: "white",
                        border: `2px solid ${ACCENT_BG_COLOR}`,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    }}
                >
                    <Stack gap="md">
                        <Group gap="sm">
                            <ThemeIcon
                                size="lg"
                                radius="lg"
                                variant="filled"
                                color={PRIMARY_COLOR}
                            >
                                <IconFile size={20} />
                            </ThemeIcon>
                            <Text size="md" fw={700} c={PRIMARY_COLOR}>
                                File Types
                            </Text>
                        </Group>
                        {isMimeTypeLoading ? (
                            <TextInput
                                label="Loading..."
                                placeholder="Loading file types..."
                                disabled
                                radius="lg"
                            />
                        ) : (
                            <MultiSelect
                                label="Select File Types"
                                placeholder="Choose one or more file types"
                                data={mimeTypeOptions}
                                value={filters.mimeTypes || []}
                                onChange={(value) =>
                                    onFiltersChange({
                                        ...filters,
                                        mimeTypes: value,
                                    })
                                }
                                searchable
                                clearable
                                radius="lg"
                                styles={{
                                    label: { fontWeight: 600, color: PRIMARY_COLOR, marginBottom: "8px" },
                                    input: {
                                        border: `2px solid ${ACCENT_BG_COLOR}`,
                                        "&:focus": {
                                            borderColor: PRIMARY_COLOR,
                                        },
                                    },
                                }}
                            />
                        )}
                    </Stack>
                </Paper>

                {/* Action Buttons */}
                <Group justify="space-between" mt="md">
                    <Button
                        variant="filled"
                        color={PRIMARY_COLOR}
                        onClick={handleClear}
                        size="md"
                        radius="lg"
                    >
                        Clear All Filters
                    </Button>
                    <Group gap="xs">
                        <Button
                            variant="default"
                            onClick={onClose}
                            size="md"
                            radius="lg"
                            styles={{
                                root: {
                                    border: `2px solid ${BORDER_COLOR}`,
                                    "&:hover": {
                                        background: ACCENT_BG_COLOR,
                                    },
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="filled"
                            color={PRIMARY_COLOR}
                            onClick={handleApply}
                            size="md"
                            radius="lg"
                            leftSection={<IconFilter size={18} />}
                            style={{
                                boxShadow: `0 4px 14px 0 rgba(107, 154, 223, 0.4)`,
                            }}
                        >
                            Apply Filters
                        </Button>
                    </Group>
                </Group>
            </Stack>
        </Modal>
    );
};