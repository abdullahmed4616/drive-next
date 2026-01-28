'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Sparkles,
  File,
  Image,
  FileText,
  FileSpreadsheet,
  FileVideo,
  FileAudio,
  Archive,
  Filter,
  X,
  Clock,
  TrendingUp,
  Folder,
  Download,
  ExternalLink,
  ChevronDown,
  SlidersHorizontal,
  HardDrive,
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { Skeleton } from '@/app/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/app/components/ui/collapsible';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Separator } from '@/app/components/ui/separator';

const PRIMARY_COLOR = '#6B9ADF';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

interface SearchResult {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  modifiedTime: string;
  driveId: string;
  driveName: string;
  thumbnail?: string;
  relevanceScore: number;
  matchedTerms: string[];
  path: string;
}

interface SearchFilters {
  fileTypes: string[];
  drives: string[];
  dateRange: string;
  sizeRange: string;
}

const exampleQueries = [
  'Find all PDF documents from last month',
  'Show images larger than 5MB',
  'Search for spreadsheets with "budget"',
  'Find duplicate files in my drives',
  'Show recently modified presentations',
];

const fileTypeOptions = [
  { value: 'documents', label: 'Documents', icon: FileText },
  { value: 'images', label: 'Images', icon: Image },
  { value: 'spreadsheets', label: 'Spreadsheets', icon: FileSpreadsheet },
  { value: 'videos', label: 'Videos', icon: FileVideo },
  { value: 'audio', label: 'Audio', icon: FileAudio },
  { value: 'archives', label: 'Archives', icon: Archive },
  { value: 'folders', label: 'Folders', icon: Folder },
];

const dateRangeOptions = [
  { value: 'any', label: 'Any time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Past week' },
  { value: 'month', label: 'Past month' },
  { value: 'year', label: 'Past year' },
];

const sizeRangeOptions = [
  { value: 'any', label: 'Any size' },
  { value: 'small', label: 'Less than 1 MB' },
  { value: 'medium', label: '1 MB - 100 MB' },
  { value: 'large', label: 'More than 100 MB' },
];

const getFileIcon = (mimeType: string) => {
  if (mimeType.includes('image')) return <Image size={20} className="text-pink-500" />;
  if (mimeType.includes('video')) return <FileVideo size={20} className="text-purple-500" />;
  if (mimeType.includes('audio')) return <FileAudio size={20} className="text-green-500" />;
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel'))
    return <FileSpreadsheet size={20} className="text-emerald-500" />;
  if (mimeType.includes('document') || mimeType.includes('word') || mimeType.includes('pdf'))
    return <FileText size={20} className="text-blue-500" />;
  if (mimeType.includes('zip') || mimeType.includes('archive'))
    return <Archive size={20} className="text-orange-500" />;
  if (mimeType.includes('folder')) return <Folder size={20} className="text-yellow-500" />;
  return <File size={20} className="text-gray-500" />;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const highlightMatch = (text: string, terms: string[]) => {
  if (!terms.length) return text;
  const regex = new RegExp(`(${terms.join('|')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    terms.some((term) => part.toLowerCase() === term.toLowerCase()) ? (
      <span key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">
        {part}
      </span>
    ) : (
      part
    )
  );
};

// Mock data for demonstration
const mockDrives = [
  { id: '1', name: 'Personal Drive', email: 'user@gmail.com' },
  { id: '2', name: 'Work Drive', email: 'user@company.com' },
];

const mockSearchHistory = [
  'quarterly reports',
  'project images',
  'meeting notes',
  'budget spreadsheet',
];

export default function AISearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    fileTypes: [],
    drives: [],
    dateRange: 'any',
    sizeRange: 'any',
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock results
    const mockResults: SearchResult[] = [
      {
        id: '1',
        name: 'Q4 Budget Report 2024.xlsx',
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: 2456000,
        modifiedTime: '2024-01-15T10:30:00Z',
        driveId: '1',
        driveName: 'Personal Drive',
        relevanceScore: 95,
        matchedTerms: searchQuery.split(' ').filter((t) => t.length > 2),
        path: '/Documents/Finance/',
      },
      {
        id: '2',
        name: 'Project Presentation Final.pptx',
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        size: 15600000,
        modifiedTime: '2024-01-20T14:45:00Z',
        driveId: '2',
        driveName: 'Work Drive',
        relevanceScore: 88,
        matchedTerms: searchQuery.split(' ').filter((t) => t.length > 2),
        path: '/Projects/2024/',
      },
      {
        id: '3',
        name: 'Meeting Notes January.docx',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: 45000,
        modifiedTime: '2024-01-22T09:15:00Z',
        driveId: '1',
        driveName: 'Personal Drive',
        relevanceScore: 82,
        matchedTerms: searchQuery.split(' ').filter((t) => t.length > 2),
        path: '/Documents/Notes/',
      },
      {
        id: '4',
        name: 'Product Screenshot.png',
        mimeType: 'image/png',
        size: 890000,
        modifiedTime: '2024-01-18T16:20:00Z',
        driveId: '2',
        driveName: 'Work Drive',
        relevanceScore: 75,
        matchedTerms: searchQuery.split(' ').filter((t) => t.length > 2),
        path: '/Images/Products/',
      },
      {
        id: '5',
        name: 'Annual Report 2023.pdf',
        mimeType: 'application/pdf',
        size: 4500000,
        modifiedTime: '2023-12-28T11:00:00Z',
        driveId: '1',
        driveName: 'Personal Drive',
        relevanceScore: 70,
        matchedTerms: searchQuery.split(' ').filter((t) => t.length > 2),
        path: '/Documents/Reports/',
      },
    ];

    setResults(mockResults);
    setIsSearching(false);
  }, [searchQuery]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setFilters({
      fileTypes: [],
      drives: [],
      dateRange: 'any',
      sizeRange: 'any',
    });
  };

  const toggleFileType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      fileTypes: prev.fileTypes.includes(type)
        ? prev.fileTypes.filter((t) => t !== type)
        : [...prev.fileTypes, type],
    }));
  };

  const toggleDrive = (driveId: string) => {
    setFilters((prev) => ({
      ...prev,
      drives: prev.drives.includes(driveId)
        ? prev.drives.filter((d) => d !== driveId)
        : [...prev.drives, driveId],
    }));
  };

  const activeFiltersCount =
    filters.fileTypes.length +
    filters.drives.length +
    (filters.dateRange !== 'any' ? 1 : 0) +
    (filters.sizeRange !== 'any' ? 1 : 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5A8ACF 100%)`,
                boxShadow: `0 8px 24px ${BORDER_COLOR}`,
              }}
            >
              <Sparkles size={28} className="text-white" />
            </div>
          </div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{
              background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5080C8 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AI-Powered Search
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Search across all your connected drives using natural language. Find files faster with
            intelligent search powered by AI.
          </p>
        </div>

        {/* Search Bar */}
        <Card
          className="shadow-lg"
          style={{
            border: `1px solid ${BORDER_COLOR}`,
            background: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <CardContent className="p-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <Input
                  placeholder="Search for files, folders, or ask a question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 pr-4 h-14 text-lg rounded-xl"
                  style={{
                    border: `2px solid ${BORDER_COLOR}`,
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <Button
                size="lg"
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                className="h-14 px-8 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5A8ACF 100%)`,
                  boxShadow: `0 4px 12px ${BORDER_COLOR}`,
                }}
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="mr-2" />
                    Smart Search
                  </>
                )}
              </Button>

              {/* Mobile Filter Button */}
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-4 rounded-xl md:hidden relative"
                    style={{ borderColor: BORDER_COLOR }}
                  >
                    <SlidersHorizontal size={20} />
                    {activeFiltersCount > 0 && (
                      <span
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs text-white flex items-center justify-center"
                        style={{ background: PRIMARY_COLOR }}
                      >
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Search Filters</SheetTitle>
                  </SheetHeader>
                  <FilterContent
                    filters={filters}
                    setFilters={setFilters}
                    toggleFileType={toggleFileType}
                    toggleDrive={toggleDrive}
                    clearFilters={clearFilters}
                    mockDrives={mockDrives}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Example Queries */}
            {!hasSearched && (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-3">Try searching for:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleQueries.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(query);
                        setTimeout(() => handleSearch(), 100);
                      }}
                      className="px-4 py-2 rounded-full text-sm transition-all hover:scale-105"
                      style={{
                        background: `${PRIMARY_COLOR}15`,
                        color: PRIMARY_COLOR,
                        border: `1px solid ${BORDER_COLOR}`,
                      }}
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block">
            <Card
              className="sticky top-24"
              style={{
                border: `1px solid ${BORDER_COLOR}`,
                background: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter size={18} />
                    Filters
                  </CardTitle>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear all
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <FilterContent
                  filters={filters}
                  setFilters={setFilters}
                  toggleFileType={toggleFileType}
                  toggleDrive={toggleDrive}
                  clearFilters={clearFilters}
                  mockDrives={mockDrives}
                />
              </CardContent>
            </Card>
          </div>

          {/* Results Area */}
          <div className="md:col-span-3">
            {!hasSearched ? (
              /* Initial State */
              <Card
                className="text-center py-16"
                style={{
                  border: `2px dashed ${BORDER_COLOR}`,
                  background: 'rgba(255, 255, 255, 0.5)',
                }}
              >
                <CardContent>
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ background: `${PRIMARY_COLOR}15` }}
                  >
                    <Search size={40} style={{ color: PRIMARY_COLOR }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Start Your Search</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Use natural language to search across all your connected drives. Our AI
                    understands context and finds exactly what you need.
                  </p>

                  {mockSearchHistory.length > 0 && (
                    <div className="mt-8">
                      <p className="text-sm text-muted-foreground mb-3 flex items-center justify-center gap-2">
                        <Clock size={14} />
                        Recent searches
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {mockSearchHistory.map((query, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSearchQuery(query);
                              setTimeout(() => handleSearch(), 100);
                            }}
                            className="px-3 py-1.5 rounded-lg text-sm hover:bg-muted transition-colors"
                            style={{ background: 'rgba(0,0,0,0.05)' }}
                          >
                            {query}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : isSearching ? (
              /* Loading State */
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} style={{ border: `1px solid ${BORDER_COLOR}` }}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Skeleton className="w-12 h-12 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-3 w-1/4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : results.length > 0 ? (
              /* Results */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Found <span className="font-semibold text-foreground">{results.length}</span>{' '}
                    results for "{searchQuery}"
                  </p>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]" style={{ borderColor: BORDER_COLOR }}>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Most relevant</SelectItem>
                      <SelectItem value="date-desc">Newest first</SelectItem>
                      <SelectItem value="date-asc">Oldest first</SelectItem>
                      <SelectItem value="size-desc">Largest first</SelectItem>
                      <SelectItem value="size-asc">Smallest first</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {results.map((result) => (
                  <Card
                    key={result.id}
                    className="group hover:shadow-lg transition-all cursor-pointer"
                    style={{
                      border: `1px solid ${BORDER_COLOR}`,
                      background: 'rgba(255, 255, 255, 0.95)',
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* File Icon/Thumbnail */}
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${PRIMARY_COLOR}10` }}
                        >
                          {result.thumbnail ? (
                            <img
                              src={result.thumbnail}
                              alt=""
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            getFileIcon(result.mimeType)
                          )}
                        </div>

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                {highlightMatch(result.name, result.matchedTerms)}
                              </h4>
                              <p className="text-sm text-muted-foreground truncate">
                                {result.path}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="flex-shrink-0"
                              style={{
                                borderColor: PRIMARY_COLOR,
                                color: PRIMARY_COLOR,
                              }}
                            >
                              <TrendingUp size={12} className="mr-1" />
                              {result.relevanceScore}%
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <HardDrive size={12} />
                              {result.driveName}
                            </span>
                            <span>{formatFileSize(result.size)}</span>
                            <span>{formatDate(result.modifiedTime)}</span>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="outline" size="sm" style={{ borderColor: BORDER_COLOR }}>
                              <Download size={14} className="mr-1" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm" style={{ borderColor: BORDER_COLOR }}>
                              <ExternalLink size={14} className="mr-1" />
                              Open
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* No Results */
              <Card
                className="text-center py-16"
                style={{
                  border: `1px solid ${BORDER_COLOR}`,
                  background: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                <CardContent>
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ background: 'rgba(239, 68, 68, 0.1)' }}
                  >
                    <Search size={40} className="text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    We couldn't find any files matching "{searchQuery}". Try adjusting your search
                    or filters.
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                    <Button
                      onClick={() => setSearchQuery('')}
                      style={{ background: PRIMARY_COLOR }}
                    >
                      New Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FilterContentProps {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  toggleFileType: (type: string) => void;
  toggleDrive: (driveId: string) => void;
  clearFilters: () => void;
  mockDrives: { id: string; name: string; email: string }[];
}

function FilterContent({
  filters,
  setFilters,
  toggleFileType,
  toggleDrive,
  mockDrives,
}: FilterContentProps) {
  return (
    <ScrollArea className="h-[calc(100vh-200px)] md:h-auto">
      <div className="space-y-6 pr-4">
        {/* File Types */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold">
            File Type
            <ChevronDown size={16} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-2">
            {fileTypeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div key={option.value} className="flex items-center space-x-3">
                  <Checkbox
                    id={option.value}
                    checked={filters.fileTypes.includes(option.value)}
                    onCheckedChange={() => toggleFileType(option.value)}
                  />
                  <Label
                    htmlFor={option.value}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <Icon size={16} />
                    {option.label}
                  </Label>
                </div>
              );
            })}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Drives */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold">
            Drives
            <ChevronDown size={16} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-2">
            {mockDrives.map((drive) => (
              <div key={drive.id} className="flex items-center space-x-3">
                <Checkbox
                  id={`drive-${drive.id}`}
                  checked={filters.drives.includes(drive.id)}
                  onCheckedChange={() => toggleDrive(drive.id)}
                />
                <Label
                  htmlFor={`drive-${drive.id}`}
                  className="flex flex-col cursor-pointer text-sm"
                >
                  <span>{drive.name}</span>
                  <span className="text-xs text-muted-foreground">{drive.email}</span>
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Date Range */}
        <div>
          <Label className="text-sm font-semibold">Modified Date</Label>
          <Select
            value={filters.dateRange}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, dateRange: value }))}
          >
            <SelectTrigger className="mt-2" style={{ borderColor: BORDER_COLOR }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dateRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Size Range */}
        <div>
          <Label className="text-sm font-semibold">File Size</Label>
          <Select
            value={filters.sizeRange}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, sizeRange: value }))}
          >
            <SelectTrigger className="mt-2" style={{ borderColor: BORDER_COLOR }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sizeRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </ScrollArea>
  );
}
