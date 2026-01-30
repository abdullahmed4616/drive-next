'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, AlertCircle, Copy, Sparkles, Layers, Chrome, Check } from 'lucide-react';
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
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
        <div
            style={{
                minHeight: "100vh",
                position: "relative",
            }}
        >
            <div
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

            <div className="container mx-auto px-6 py-10" style={{ position: "relative", zIndex: 1 }}>
                <div className="flex flex-col gap-8">

                    <Card
                        className="shadow-xl p-8 rounded-lg"
                        style={{
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            border: `1px solid ${BORDER_COLOR}`,
                        }}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="flex items-center gap-4">
                                    <div
                                        className="flex items-center justify-center rounded-lg"
                                        style={{
                                            width: 48,
                                            height: 48,
                                            background: PRIMARY_COLOR,
                                        }}
                                    >
                                        <Layers size={28} color="white" />
                                    </div>
                                    <div>
                                        <h1
                                            className="text-4xl font-bold"
                                            style={{ color: PRIMARY_COLOR }}
                                        >
                                            My Files
                                        </h1>
                                        <div className="flex gap-2 mt-1">
                                            <Badge
                                                className="text-white"
                                                style={{ background: PRIMARY_COLOR }}
                                            >
                                                <Sparkles className="inline mr-1" size={14} />
                                                {totalFiles} files
                                            </Badge>
                                            {!isDuplicatesLoading && duplicateInfo.duplicateCount > 0 && (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-orange-500 text-white"
                                                >
                                                    <Copy className="inline mr-1" size={14} />
                                                    {duplicateInfo.duplicateCount} duplicates
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {!isDrivesLoading && drivesData?.drives && drivesData.drives.length > 0 && (
                        <Card
                            className="shadow-xl p-6 rounded-lg"
                            style={{
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                                border: `1px solid ${BORDER_COLOR}`,
                            }}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <Chrome size={24} color={PRIMARY_COLOR} />
                                    <h2 className="text-lg font-bold" style={{ color: PRIMARY_COLOR }}>
                                        Select Drive Account
                                    </h2>
                                    <Badge variant="outline" style={{ color: PRIMARY_COLOR }}>
                                        {drivesData.drives.length} connected
                                    </Badge>
                                </div>

                                <div className="overflow-x-auto">
                                    <div className="flex gap-2">
                                        {drivesData.drives.map((drive) => (
                                            <Button
                                                key={drive.id}
                                                variant={selectedDriveId === drive.id ? "default" : "outline"}
                                                size="sm"
                                                className="min-w-[200px] rounded-lg"
                                                style={{
                                                    background: selectedDriveId === drive.id ? PRIMARY_COLOR : undefined,
                                                    boxShadow: selectedDriveId === drive.id
                                                        ? `0 4px 14px 0 rgba(107, 154, 223, 0.4)`
                                                        : undefined,
                                                }}
                                                onClick={() => setSelectedDriveId(drive.id)}
                                            >
                                                <Chrome className="mr-2" size={18} />
                                                <span className="truncate max-w-[150px]">
                                                    {drive.gmailAccount}
                                                </span>
                                                {selectedDriveId === drive.id && (
                                                    <Check className="ml-2" size={16} />
                                                )}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {selectedDrive && (
                                    <Card
                                        className="p-3 rounded-md"
                                        style={{
                                            background: ACCENT_BG_COLOR,
                                            border: `1px solid ${BORDER_COLOR}`,
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600">
                                                Viewing files from:
                                            </span>
                                            <span className="text-sm font-semibold" style={{ color: PRIMARY_COLOR }}>
                                                {selectedDrive.gmailAccount}
                                            </span>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        </Card>
                    )}

                    {!isDuplicatesLoading && duplicateInfo.duplicateCount > 0 && (
                        <Alert
                            className="rounded-lg"
                            style={{
                                background: ACCENT_BG_COLOR,
                                border: `2px solid ${BORDER_COLOR}`,
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <Copy className="h-5 w-5" style={{ color: "orange" }} />
                            <AlertTitle className="text-lg font-bold">Duplicate Files Detected</AlertTitle>
                            <AlertDescription>
                                <p className="text-sm font-medium">
                                    Found {duplicateInfo.duplicateGroups} groups of duplicate files with{" "}
                                    {duplicateInfo.duplicateCount} total duplicate files.
                                </p>
                            </AlertDescription>
                        </Alert>
                    )}

                    <Card
                        className="shadow-xl p-6 rounded-lg"
                        style={{
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            border: `1px solid ${BORDER_COLOR}`,
                        }}
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-2 items-end flex-grow">
                                <div className="flex-grow">
                                    <Input
                                        placeholder="Search your files..."
                                        value={tempFilters.searchQuery}
                                        onChange={(e) => handleSearchChange(e.currentTarget.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleSearchSubmit();
                                        }}
                                        className="h-12"
                                        style={{
                                            border: `2px solid ${ACCENT_BG_COLOR}`,
                                        }}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        className="h-12"
                                        style={{
                                            background: PRIMARY_COLOR,
                                            boxShadow: `0 4px 14px 0 rgba(107, 154, 223, 0.4)`,
                                        }}
                                        onClick={handleSearchSubmit}
                                    >
                                        <Search className="mr-2" size={20} />
                                        Search
                                    </Button>
                                    <Button
                                        className="h-12"
                                        style={{
                                            background: PRIMARY_COLOR,
                                            boxShadow: `0 4px 14px 0 rgba(107, 154, 223, 0.4)`,
                                        }}
                                        onClick={() => setFiltersModalOpened(true)}
                                    >
                                        <Filter className="mr-2" size={20} />
                                        Filters
                                        {activeFiltersCount > 0 && (
                                            <Badge
                                                variant="secondary"
                                                className="ml-2 bg-white"
                                                style={{ color: PRIMARY_COLOR }}
                                            >
                                                {activeFiltersCount}
                                            </Badge>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>

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
                        showDuplicatesOnly={showDuplicatesOnly}
                        onShowDuplicatesChange={setShowDuplicatesOnly}
                        duplicateInfo={duplicateInfo}
                        isDuplicatesLoading={isDuplicatesLoading}
                    />

                    {isLoading && (
                        <Card
                            className="shadow-xl p-12 rounded-lg"
                            style={{
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <div className="flex flex-col items-center gap-4">
                                <div
                                    className="rounded-full p-5"
                                    style={{
                                        background: PRIMARY_COLOR,
                                    }}
                                >
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                                </div>
                                <p className="text-lg font-semibold">
                                    Loading your files...
                                </p>
                            </div>
                        </Card>
                    )}

                    {isError && (
                        <Alert
                            variant="destructive"
                            className="rounded-lg"
                            style={{
                                background: "rgba(250, 82, 82, 0.15)",
                                border: "2px solid rgba(250, 82, 82, 0.3)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <AlertCircle className="h-5 w-5" />
                            <AlertTitle>Oops! Something went wrong</AlertTitle>
                            <AlertDescription>
                                <p className="font-medium">{error?.message || "Failed to load files. Please try again."}</p>
                            </AlertDescription>
                        </Alert>
                    )}

                    {!isLoading && !isError && displayFiles.length === 0 && (
                        <Card
                            className="shadow-xl p-12 rounded-lg"
                            style={{
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <div className="flex flex-col items-center gap-6 py-8">
                                <div
                                    className="flex items-center justify-center rounded-xl"
                                    style={{
                                        width: 120,
                                        height: 120,
                                        background: PRIMARY_COLOR,
                                        opacity: 0.8,
                                    }}
                                >
                                    <Layers size={60} color="white" />
                                </div>
                                <h2
                                    className="text-3xl font-bold"
                                    style={{ color: PRIMARY_COLOR }}
                                >
                                    No files found
                                </h2>
                                <p className="text-gray-600 text-center max-w-md">
                                    {showDuplicatesOnly
                                        ? "No duplicate files match your current filters"
                                        : "Try adjusting your filters or search query to find what you're looking for"}
                                </p>
                                <Button
                                    onClick={handleClearFilters}
                                    className="mt-4 rounded-lg"
                                    style={{ background: PRIMARY_COLOR }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        </Card>
                    )}

                    {!isLoading && !isError && paginatedData.length > 0 && (
                        <>
                            <div className="flex justify-between">
                                <Badge
                                    variant="outline"
                                    className="p-3 text-sm"
                                    style={{
                                        color: PRIMARY_COLOR,
                                    }}
                                >
                                    Showing {startIndex} - {endIndex} of {totalItems} files
                                    {showDuplicatesOnly && " (duplicates only)"}
                                </Badge>
                            </div>

                            <FileList files={paginatedData} />

                            {totalPages > 1 && (
                                <div className="flex justify-center mt-8">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => goToPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </Button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                                            .filter(page => {
                                                return page === 1 ||
                                                       page === totalPages ||
                                                       (page >= currentPage - 1 && page <= currentPage + 1);
                                            })
                                            .map((page, idx, arr) => {
                                                if (idx > 0 && page - arr[idx - 1] > 1) {
                                                    return (
                                                        <React.Fragment key={page}>
                                                            <span className="px-2 py-2">...</span>
                                                            <Button
                                                                variant={currentPage === page ? "default" : "outline"}
                                                                onClick={() => goToPage(page)}
                                                                style={{
                                                                    background: currentPage === page ? PRIMARY_COLOR : undefined,
                                                                }}
                                                            >
                                                                {page}
                                                            </Button>
                                                        </React.Fragment>
                                                    );
                                                }
                                                return (
                                                    <Button
                                                        key={page}
                                                        variant={currentPage === page ? "default" : "outline"}
                                                        onClick={() => goToPage(page)}
                                                        style={{
                                                            background: currentPage === page ? PRIMARY_COLOR : undefined,
                                                        }}
                                                    >
                                                        {page}
                                                    </Button>
                                                );
                                            })}
                                        <Button
                                            variant="outline"
                                            onClick={() => goToPage(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
