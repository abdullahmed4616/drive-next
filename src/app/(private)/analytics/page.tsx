'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Copy,
  HardDrive,
  File,
  Folder,
  Calendar,
  Download,
  Trash2,
  Eye,
  ChevronDown,
  RefreshCw,
  FileText,
  Image,
  FileVideo,
  FileAudio,
  FileSpreadsheet,
  Archive,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { Checkbox } from '@/app/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';

// Mock data
const overviewStats = {
  totalFiles: 12847,
  totalSize: '45.8 GB',
  averageFileSize: '3.56 MB',
  duplicateFiles: 234,
  duplicateSize: '2.3 GB',
};

const storageByDrive = [
  { name: 'Personal Drive', used: 18.5, total: 30, color: '#6B9ADF' },
  { name: 'Work Drive', used: 22.3, total: 50, color: '#5A8ACF' },
  { name: 'Backup Drive', used: 5.0, total: 15, color: '#4A78BF' },
];

const fileTypeDistribution = [
  { type: 'Documents', count: 4521, size: '8.2 GB', percentage: 35, color: '#3B82F6', icon: FileText },
  { type: 'Images', count: 3842, size: '15.4 GB', percentage: 30, color: '#EC4899', icon: Image },
  { type: 'Videos', count: 892, size: '18.5 GB', percentage: 7, color: '#8B5CF6', icon: FileVideo },
  { type: 'Audio', count: 1256, size: '2.1 GB', percentage: 10, color: '#10B981', icon: FileAudio },
  { type: 'Spreadsheets', count: 1521, size: '0.8 GB', percentage: 12, color: '#F59E0B', icon: FileSpreadsheet },
  { type: 'Archives', count: 815, size: '0.8 GB', percentage: 6, color: '#EF4444', icon: Archive },
];

const fileActivityData = [
  { month: 'Jan', created: 450, modified: 820 },
  { month: 'Feb', created: 380, modified: 750 },
  { month: 'Mar', created: 520, modified: 920 },
  { month: 'Apr', created: 410, modified: 680 },
  { month: 'May', created: 590, modified: 1100 },
  { month: 'Jun', created: 480, modified: 850 },
];

const duplicateGroups = [
  {
    id: '1',
    name: 'Project_Report_Final.pdf',
    copies: 4,
    size: '2.5 MB',
    totalSize: '10 MB',
    locations: ['Personal Drive', 'Work Drive', 'Backup Drive'],
    lastModified: '2024-01-15',
  },
  {
    id: '2',
    name: 'Company_Logo.png',
    copies: 6,
    size: '450 KB',
    totalSize: '2.7 MB',
    locations: ['Personal Drive', 'Work Drive'],
    lastModified: '2024-01-20',
  },
  {
    id: '3',
    name: 'Budget_2024.xlsx',
    copies: 3,
    size: '1.2 MB',
    totalSize: '3.6 MB',
    locations: ['Work Drive', 'Backup Drive'],
    lastModified: '2024-01-18',
  },
  {
    id: '4',
    name: 'Meeting_Notes.docx',
    copies: 5,
    size: '340 KB',
    totalSize: '1.7 MB',
    locations: ['Personal Drive', 'Work Drive', 'Backup Drive'],
    lastModified: '2024-01-22',
  },
  {
    id: '5',
    name: 'Presentation_Deck.pptx',
    copies: 3,
    size: '8.5 MB',
    totalSize: '25.5 MB',
    locations: ['Work Drive'],
    lastModified: '2024-01-19',
  },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30days');
  const [selectedDuplicates, setSelectedDuplicates] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const toggleDuplicateSelection = (id: string) => {
    setSelectedDuplicates((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const selectAllDuplicates = () => {
    if (selectedDuplicates.length === duplicateGroups.length) {
      setSelectedDuplicates([]);
    } else {
      setSelectedDuplicates(duplicateGroups.map((d) => d.id));
    }
  };

  const totalPotentialSavings = duplicateGroups.reduce((acc, group) => {
    const sizeNum = parseFloat(group.totalSize.replace(/[^\d.]/g, ''));
    const unit = group.totalSize.replace(/[\d.]/g, '').trim();
    const multiplier = unit === 'GB' ? 1024 : unit === 'KB' ? 0.001 : 1;
    return acc + sizeNum * multiplier * ((group.copies - 1) / group.copies);
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              Comprehensive insights into your storage usage and file management
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px] border-border">
                <Calendar size={16} className="mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="border-border"
            >
              <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Files"
            value={overviewStats.totalFiles.toLocaleString()}
            icon={<File size={22} />}
            color="#6B9ADF"
          />
          <StatCard
            title="Total Storage"
            value={overviewStats.totalSize}
            icon={<HardDrive size={22} />}
            color="#5A8ACF"
          />
          <StatCard
            title="Average File Size"
            value={overviewStats.averageFileSize}
            icon={<BarChart3 size={22} />}
            color="#4A78BF"
          />
          <StatCard
            title="Duplicate Files"
            value={overviewStats.duplicateFiles.toString()}
            icon={<Copy size={22} />}
            color="#F59E0B"
            warning
          />
          <StatCard
            title="Potential Savings"
            value={overviewStats.duplicateSize}
            icon={<TrendingUp size={22} />}
            color="#10B981"
            positive
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex bg-primary/5">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">
              <PieChart size={16} className="mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="storage" className="data-[state=active]:bg-white">
              <HardDrive size={16} className="mr-2" />
              Storage
            </TabsTrigger>
            <TabsTrigger value="duplicates" className="data-[state=active]:bg-white">
              <Copy size={16} className="mr-2" />
              Duplicates
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* File Type Distribution */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart size={20} className="text-primary" />
                    File Type Distribution
                  </CardTitle>
                  <CardDescription>Breakdown of files by type across all drives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fileTypeDistribution.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.type} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ background: `${item.color}20` }}
                              >
                                <Icon size={16} style={{ color: item.color }} />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{item.type}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item.count.toLocaleString()} files
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-sm">{item.size}</p>
                              <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                            </div>
                          </div>
                          <Progress
                            value={item.percentage}
                            className="h-2"
                            style={
                              {
                                '--progress-color': item.color,
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* File Activity Chart */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 size={20} className="text-primary" />
                    File Activity
                  </CardTitle>
                  <CardDescription>Files created and modified over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Legend */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-primary" />
                        <span className="text-sm text-muted-foreground">Created</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-primary/40" />
                        <span className="text-sm text-muted-foreground">Modified</span>
                      </div>
                    </div>

                    {/* Simple Bar Chart */}
                    <div className="space-y-3">
                      {fileActivityData.map((item) => (
                        <div key={item.month} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium w-8">{item.month}</span>
                            <span className="text-muted-foreground">
                              {item.created + item.modified} total
                            </span>
                          </div>
                          <div className="flex gap-1 h-6">
                            <div
                              className="rounded-l transition-all bg-primary"
                              style={{
                                width: `${(item.created / 1200) * 100}%`,
                              }}
                            />
                            <div
                              className="rounded-r transition-all bg-primary/40"
                              style={{
                                width: `${(item.modified / 1200) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Insights */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-primary" />
                  Quick Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InsightCard
                    icon={<AlertTriangle size={20} className="text-amber-500" />}
                    title="Large Files"
                    description="23 files over 100MB detected"
                    action="Review files"
                  />
                  <InsightCard
                    icon={<Copy size={20} className="text-blue-500" />}
                    title="Duplicates Found"
                    description={`${duplicateGroups.length} duplicate groups found`}
                    action="Manage duplicates"
                  />
                  <InsightCard
                    icon={<Folder size={20} className="text-green-500" />}
                    title="Empty Folders"
                    description="12 empty folders can be removed"
                    action="Clean up"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Storage Tab */}
          <TabsContent value="storage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Storage by Drive */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive size={20} className="text-primary" />
                    Storage by Drive
                  </CardTitle>
                  <CardDescription>Storage usage across your connected drives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {storageByDrive.map((drive) => {
                      const percentage = (drive.used / drive.total) * 100;
                      return (
                        <div key={drive.name} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ background: `${drive.color}20` }}
                              >
                                <HardDrive size={20} style={{ color: drive.color }} />
                              </div>
                              <div>
                                <p className="font-medium">{drive.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {drive.used} GB of {drive.total} GB used
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant={percentage > 80 ? 'destructive' : 'secondary'}
                              className="font-semibold"
                            >
                              {percentage.toFixed(0)}%
                            </Badge>
                          </div>
                          <Progress value={percentage} className="h-3" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Storage Summary */}
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart size={20} className="text-primary" />
                    Storage Summary
                  </CardTitle>
                  <CardDescription>Total storage across all drives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center py-6">
                      <div className="relative inline-flex items-center justify-center">
                        <svg className="w-40 h-40 transform -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            className="stroke-primary/20"
                            strokeWidth="12"
                            fill="none"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            className="stroke-primary"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${(45.8 / 95) * 440} 440`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute text-center">
                          <p className="text-3xl font-bold text-primary">
                            45.8 GB
                          </p>
                          <p className="text-sm text-muted-foreground">of 95 GB</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b">
                        <span className="text-muted-foreground">Total Capacity</span>
                        <span className="font-semibold">95 GB</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <span className="text-muted-foreground">Used Storage</span>
                        <span className="font-semibold">45.8 GB</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <span className="text-muted-foreground">Available Storage</span>
                        <span className="font-semibold text-green-600">49.2 GB</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-muted-foreground">Recoverable Space</span>
                        <span className="font-semibold text-amber-600">2.3 GB</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Size Distribution */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 size={20} className="text-primary" />
                  File Size Distribution
                </CardTitle>
                <CardDescription>Distribution of files by size ranges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <SizeRangeCard label="< 1 MB" count={8542} percentage={66} />
                  <SizeRangeCard label="1-10 MB" count={2841} percentage={22} />
                  <SizeRangeCard label="10-100 MB" count={1205} percentage={9} />
                  <SizeRangeCard label="100 MB - 1 GB" count={236} percentage={2} />
                  <SizeRangeCard label="> 1 GB" count={23} percentage={1} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Duplicates Tab */}
          <TabsContent value="duplicates" className="space-y-6">
            {/* Duplicates Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10">
                      <Copy size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duplicate Groups</p>
                      <p className="text-2xl font-bold">{duplicateGroups.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-500/15"
                    >
                      <HardDrive size={24} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Space Used by Duplicates</p>
                      <p className="text-2xl font-bold">2.3 GB</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500/15"
                    >
                      <TrendingUp size={24} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Potential Savings</p>
                      <p className="text-2xl font-bold text-green-600">
                        {totalPotentialSavings.toFixed(1)} MB
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Duplicates Table */}
            <Card className="border border-border">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Copy size={20} className="text-primary" />
                      Duplicate Files
                    </CardTitle>
                    <CardDescription>
                      Files with multiple copies across your drives
                    </CardDescription>
                  </div>
                  {selectedDuplicates.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{selectedDuplicates.length} selected</Badge>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteDialogOpen(true)}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete Duplicates
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={selectedDuplicates.length === duplicateGroups.length}
                          onCheckedChange={selectAllDuplicates}
                        />
                      </TableHead>
                      <TableHead>File Name</TableHead>
                      <TableHead className="text-center">Copies</TableHead>
                      <TableHead className="text-right">Size Each</TableHead>
                      <TableHead className="text-right">Total Size</TableHead>
                      <TableHead>Locations</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {duplicateGroups.map((group) => (
                      <TableRow key={group.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedDuplicates.includes(group.id)}
                            onCheckedChange={() => toggleDuplicateSelection(group.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <File size={16} className="text-muted-foreground" />
                            {group.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="secondary"
                            className={`font-semibold ${
                              group.copies > 3
                                ? 'bg-red-500/15 text-red-500'
                                : 'bg-amber-500/15 text-amber-500'
                            }`}
                          >
                            {group.copies}x
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{group.size}</TableCell>
                        <TableCell className="text-right font-semibold">{group.totalSize}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {group.locations.slice(0, 2).map((loc, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {loc}
                              </Badge>
                            ))}
                            {group.locations.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{group.locations.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <ChevronDown size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye size={16} className="mr-2" />
                                View All Copies
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download size={16} className="mr-2" />
                                Download Original
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 size={16} className="mr-2" />
                                Delete Duplicates
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Duplicate Files</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the duplicate copies of {selectedDuplicates.length}{' '}
              file(s)? This will keep the original file and remove all duplicate copies.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 rounded-lg bg-primary/5 border border-border">
            <p className="text-sm">
              <strong>Space to be recovered:</strong>{' '}
              <span className="text-green-600">
                ~{(totalPotentialSavings * (selectedDuplicates.length / duplicateGroups.length)).toFixed(1)} MB
              </span>
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setSelectedDuplicates([]);
                setDeleteDialogOpen(false);
              }}
            >
              Delete Duplicates
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  warning?: boolean;
  positive?: boolean;
}

function StatCard({ title, value, icon, color, warning, positive }: StatCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1 border border-border bg-card">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `${color}15` }}
          >
            {React.cloneElement(icon as React.ReactElement, { style: { color } })}
          </div>
          {warning && (
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
              Action needed
            </Badge>
          )}
          {positive && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Recoverable
            </Badge>
          )}
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}

function InsightCard({ icon, title, description, action }: InsightCardProps) {
  return (
    <div className="p-4 rounded-xl transition-all hover:shadow-md bg-primary/5 border border-primary/20">
      <div className="flex items-start gap-3">
        {icon}
        <div className="flex-1">
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-muted-foreground mb-2">{description}</p>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
            {action} &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}

interface SizeRangeCardProps {
  label: string;
  count: number;
  percentage: number;
}

function SizeRangeCard({ label, count, percentage }: SizeRangeCardProps) {
  return (
    <div className="p-4 rounded-xl text-center bg-primary/5 border border-border">
      <p className="text-2xl font-bold text-primary">
        {count.toLocaleString()}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xs text-muted-foreground mt-1">{percentage}% of total</p>
    </div>
  );
}
