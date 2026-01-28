"use client";

import { Filter, Calendar, Database, File as FileIcon, Copy } from "lucide-react";
import { FiltersModalProps } from "@/app/(private)/files/types/File.types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent } from "@/app/components/ui/card";
import { Switch } from "@/app/components/ui/switch";
import { Badge } from "@/app/components/ui/badge";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/app/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/app/components/ui/popover";

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
    const [open, setOpen] = useState(false);

    const handleApply = () => {
        onApplyFilters();
        onClose();
    };

    const handleClear = () => {
        onClearFilters();
    };

    const toggleMimeType = (value: string) => {
        const currentMimeTypes = filters.mimeTypes || [];
        const newMimeTypes = currentMimeTypes.includes(value)
            ? currentMimeTypes.filter((v) => v !== value)
            : [...currentMimeTypes, value];
        onFiltersChange({
            ...filters,
            mimeTypes: newMimeTypes,
        });
    };

    return (
        <Dialog open={opened} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" style={{ background: ACCENT_BG_COLOR, border: `2px solid ${BORDER_COLOR}` }}>
                <DialogHeader style={{ borderBottom: `2px solid ${BORDER_COLOR}`, paddingBottom: '16px' }}>
                    <DialogTitle>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: PRIMARY_COLOR }}>
                                <Filter size={24} color="white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold" style={{ color: PRIMARY_COLOR }}>
                                    Advanced Filters
                                </h2>
                                <p className="text-xs text-muted-foreground font-medium">
                                    Refine your file search
                                </p>
                            </div>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-6 p-6">
                    {/* Duplicate Files Filter */}
                    <Card style={{ background: "white", border: `2px solid ${ACCENT_BG_COLOR}`, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-500">
                                        <Copy size={20} color="white" />
                                    </div>
                                    <h3 className="text-md font-bold text-orange-500">
                                        Duplicate Files
                                    </h3>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="duplicates"
                                        checked={showDuplicatesOnly}
                                        onCheckedChange={onShowDuplicatesChange}
                                        disabled={isDuplicatesLoading || duplicateInfo.duplicateCount === 0}
                                    />
                                    <div className="flex flex-col">
                                        <Label htmlFor="duplicates" className="font-semibold text-sm">
                                            Show duplicate files only
                                        </Label>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {isDuplicatesLoading
                                                ? "Loading duplicates..."
                                                : duplicateInfo.duplicateCount > 0
                                                    ? `${duplicateInfo.duplicateCount} duplicate files in ${duplicateInfo.duplicateGroups} groups`
                                                    : "No duplicates found"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Date Range Filter */}
                    <Card style={{ background: "white", border: `2px solid ${ACCENT_BG_COLOR}`, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: PRIMARY_COLOR }}>
                                        <Calendar size={20} color="white" />
                                    </div>
                                    <h3 className="text-md font-bold" style={{ color: PRIMARY_COLOR }}>
                                        Date Range
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="startDate" className="font-semibold" style={{ color: PRIMARY_COLOR }}>
                                            Start Date
                                        </Label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            value={filters.dateRange?.startDate || ""}
                                            onChange={(e) =>
                                                onFiltersChange({
                                                    ...filters,
                                                    dateRange: { ...filters.dateRange, startDate: e.target.value },
                                                })
                                            }
                                            max={filters.dateRange?.endDate || dateRangeInfo?.dateRanges?.newest}
                                            className="rounded-lg"
                                            style={{ border: `2px solid ${ACCENT_BG_COLOR}` }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="endDate" className="font-semibold" style={{ color: PRIMARY_COLOR }}>
                                            End Date
                                        </Label>
                                        <Input
                                            id="endDate"
                                            type="date"
                                            value={filters.dateRange?.endDate || ""}
                                            onChange={(e) =>
                                                onFiltersChange({
                                                    ...filters,
                                                    dateRange: { ...filters.dateRange, endDate: e.target.value },
                                                })
                                            }
                                            min={filters.dateRange?.startDate || dateRangeInfo?.dateRanges?.oldest}
                                            className="rounded-lg"
                                            style={{ border: `2px solid ${ACCENT_BG_COLOR}` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* File Size Filter */}
                    <Card style={{ background: "white", border: `2px solid ${ACCENT_BG_COLOR}`, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: PRIMARY_COLOR }}>
                                        <Database size={20} color="white" />
                                    </div>
                                    <h3 className="text-md font-bold" style={{ color: PRIMARY_COLOR }}>
                                        File Size (bytes)
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="minSize" className="font-semibold" style={{ color: PRIMARY_COLOR }}>
                                            Minimum Size
                                        </Label>
                                        <Input
                                            id="minSize"
                                            type="number"
                                            placeholder="e.g., 1024"
                                            value={filters.fileSize?.minSize || ""}
                                            onChange={(e) =>
                                                onFiltersChange({
                                                    ...filters,
                                                    fileSize: {
                                                        ...filters.fileSize,
                                                        minSize: e.target.value ? Number(e.target.value) : undefined,
                                                    },
                                                })
                                            }
                                            min={0}
                                            className="rounded-lg"
                                            style={{ border: `2px solid ${ACCENT_BG_COLOR}` }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="maxSize" className="font-semibold" style={{ color: PRIMARY_COLOR }}>
                                            Maximum Size
                                        </Label>
                                        <Input
                                            id="maxSize"
                                            type="number"
                                            placeholder="e.g., 1048576"
                                            value={filters.fileSize?.maxSize || ""}
                                            onChange={(e) =>
                                                onFiltersChange({
                                                    ...filters,
                                                    fileSize: {
                                                        ...filters.fileSize,
                                                        maxSize: e.target.value ? Number(e.target.value) : undefined,
                                                    },
                                                })
                                            }
                                            min={filters.fileSize?.minSize || 0}
                                            className="rounded-lg"
                                            style={{ border: `2px solid ${ACCENT_BG_COLOR}` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* File Types Filter */}
                    <Card style={{ background: "white", border: `2px solid ${ACCENT_BG_COLOR}`, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: PRIMARY_COLOR }}>
                                        <FileIcon size={20} color="white" />
                                    </div>
                                    <h3 className="text-md font-bold" style={{ color: PRIMARY_COLOR }}>
                                        File Types
                                    </h3>
                                </div>
                                {isMimeTypeLoading ? (
                                    <div className="space-y-2">
                                        <Label className="font-semibold" style={{ color: PRIMARY_COLOR }}>Loading...</Label>
                                        <Input
                                            placeholder="Loading file types..."
                                            disabled
                                            className="rounded-lg"
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Label className="font-semibold" style={{ color: PRIMARY_COLOR }}>
                                            Select File Types
                                        </Label>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="w-full justify-between rounded-lg"
                                                    style={{ border: `2px solid ${ACCENT_BG_COLOR}` }}
                                                >
                                                    {filters.mimeTypes && filters.mimeTypes.length > 0
                                                        ? `${filters.mimeTypes.length} selected`
                                                        : "Choose one or more file types"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search file types..." />
                                                    <CommandEmpty>No file type found.</CommandEmpty>
                                                    <CommandGroup className="max-h-64 overflow-auto">
                                                        {mimeTypeOptions.map((option) => {
                                                            const value = typeof option === 'string' ? option : option.value;
                                                            const label = typeof option === 'string' ? option : option.label;
                                                            const isSelected = filters.mimeTypes?.includes(value);
                                                            return (
                                                                <CommandItem
                                                                    key={value}
                                                                    value={value}
                                                                    onSelect={() => toggleMimeType(value)}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            isSelected ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {label}
                                                                </CommandItem>
                                                            );
                                                        })}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        {filters.mimeTypes && filters.mimeTypes.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {filters.mimeTypes.map((mimeType) => (
                                                    <Badge
                                                        key={mimeType}
                                                        variant="secondary"
                                                        className="cursor-pointer"
                                                        onClick={() => toggleMimeType(mimeType)}
                                                    >
                                                        {mimeTypeOptions.find(opt =>
                                                            (typeof opt === 'string' ? opt : opt.value) === mimeType
                                                        ) ? (typeof mimeTypeOptions.find(opt =>
                                                            (typeof opt === 'string' ? opt : opt.value) === mimeType
                                                        ) === 'string'
                                                            ? mimeTypeOptions.find(opt =>
                                                                (typeof opt === 'string' ? opt : opt.value) === mimeType
                                                            )
                                                            : (mimeTypeOptions.find(opt =>
                                                                (typeof opt === 'string' ? opt : opt.value) === mimeType
                                                            ) as any).label) : mimeType}
                                                        <button
                                                            className="ml-1 hover:text-destructive"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleMimeType(mimeType);
                                                            }}
                                                        >
                                                            ×
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            variant="default"
                            onClick={handleClear}
                            className="rounded-lg"
                            style={{ background: PRIMARY_COLOR, color: 'white' }}
                        >
                            Clear All Filters
                        </Button>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="rounded-lg"
                                style={{ border: `2px solid ${BORDER_COLOR}` }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleApply}
                                className="rounded-lg"
                                style={{ background: PRIMARY_COLOR, color: 'white', boxShadow: `0 4px 14px 0 rgba(107, 154, 223, 0.4)` }}
                            >
                                <Filter className="mr-2" size={18} />
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
