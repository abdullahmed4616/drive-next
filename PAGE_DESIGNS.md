# 🎨 DriveUnity - Complete Page Designs
## Production-Ready UI Specifications

---

# 1. 📊 DASHBOARD PAGE

## Visual Layout Description

**Hero Section:**
- Full-width gradient background (subtle, professional)
- Welcome message with user's name + time-based greeting
- Quick action buttons (Upload, New Folder, Connect Drive)
- Storage usage overview with visual progress bar

**Stats Grid:**
- 4-column responsive grid (2 cols on tablet, 1 on mobile)
- Animated counter numbers
- Icons with brand colors
- Hover effects with slight elevation

**Content Sections:**
- Recent Files (6-8 items, grid layout)
- Recent Activity Feed (timeline design)
- Storage Breakdown (donut chart)
- Quick Access Drives (horizontal scroll on mobile)

**Layout Flow:**
```
┌─────────────────────────────────────────┐
│ Welcome Header + Quick Actions           │
├─────────────────────────────────────────┤
│ [Stat] [Stat] [Stat] [Stat]             │
├─────────────────────────────────────────┤
│ Recent Files (Grid)     │ Activity Feed │
│                          │ (Timeline)    │
├─────────────────────────────────────────┤
│ Storage Analysis        │ Connected     │
│ (Chart)                 │ Drives        │
└─────────────────────────────────────────┘
```

## Component Breakdown

### 1. Stats Card Component
**Purpose:** Display key metrics with visual hierarchy

**shadcn Components:**
- `Card`, `CardHeader`, `CardContent`
- `Badge` (for trend indicators)
- `Skeleton` (loading state)

**Tailwind Classes:**
```tsx
className="group relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/20 shadow-sm hover:shadow-md transition-all duration-300"
```

**TSX Structure:**
```tsx
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: { value: number; isPositive: boolean };
  description?: string;
  color?: 'blue' | 'green' | 'orange' | 'purple';
}

export function StatsCard({ title, value, icon: Icon, trend, description, color = 'blue' }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    green: 'bg-green-500/10 text-green-600 dark:text-green-400',
    orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  };

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/20 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
          {trend && (
            <Badge variant={trend.isPositive ? "default" : "destructive"} className="gap-1">
              {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(trend.value)}%
            </Badge>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

**UX Reasoning:**
- Icon provides instant visual recognition
- Trend indicators give context (growing/declining)
- Hover effect provides feedback without being distracting
- Gradient backgrounds add depth without clutter
- Number hierarchy (large, bold) draws attention to key data

### 2. Welcome Header Component
**Purpose:** Personalized greeting with quick actions

**TSX Structure:**
```tsx
export function DashboardWelcome({ user }: { user: { name: string; email: string } }) {
  const greeting = getTimeBasedGreeting(); // "Good morning", "Good afternoon", etc.

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 mb-8 border border-primary/10">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {greeting}, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage all your cloud drives in one place
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Files
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <FolderPlus className="h-4 w-4" />
            New Folder
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Connect Drive
          </Button>
        </div>
      </div>

      {/* Storage Usage Bar */}
      <div className="mt-6 relative">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">Storage Usage</span>
          <span className="text-muted-foreground">45.2 GB of 100 GB</span>
        </div>
        <Progress value={45.2} className="h-2" />
      </div>
    </div>
  );
}
```

**UX Reasoning:**
- Time-based greeting adds personalization
- Quick actions reduce clicks to common tasks
- Storage visibility prevents surprises
- Gradient creates visual interest without overwhelming
- Responsive layout adapts to mobile naturally

### 3. Recent Files Grid
**Purpose:** Quick access to recently modified files

**TSX Structure:**
```tsx
interface RecentFile {
  id: string;
  name: string;
  type: string;
  size: string;
  modifiedAt: string;
  thumbnailUrl?: string;
  driveType: 'google' | 'dropbox' | 'onedrive';
}

export function RecentFilesGrid({ files, isLoading }: { files: RecentFile[]; isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <FileX className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No recent files</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          Files you access will appear here for quick access.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Recent Files</h2>
        <Button variant="ghost" size="sm" className="gap-2">
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((file) => (
          <Card
            key={file.id}
            className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Thumbnail or Icon */}
            <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
              {file.thumbnailUrl ? (
                <img
                  src={file.thumbnailUrl}
                  alt={file.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <FileIcon type={file.type} className="h-12 w-12 text-muted-foreground group-hover:scale-110 transition-transform" />
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Drive Badge */}
              <div className="absolute top-2 right-2">
                <DriveTypeBadge type={file.driveType} />
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold truncate mb-1 group-hover:text-primary transition-colors">
                {file.name}
              </h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{file.size}</span>
                <span>{formatRelativeTime(file.modifiedAt)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

**UX Reasoning:**
- Grid layout maximizes space efficiency
- Hover reveals actions (clean default state)
- Drive badges show file location at a glance
- Thumbnails provide visual recognition
- Smooth transitions feel polished
- Empty state guides next action

### 4. Activity Feed Timeline
**Purpose:** Show recent file operations and system events

**TSX Structure:**
```tsx
interface Activity {
  id: string;
  type: 'upload' | 'download' | 'delete' | 'share' | 'connect';
  description: string;
  timestamp: string;
  user?: string;
  metadata?: Record<string, any>;
}

export function ActivityFeed({ activities, isLoading }: { activities: Activity[]; isLoading?: boolean }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest actions across all drives</CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex gap-3 group">
                  {/* Timeline connector */}
                  {index !== activities.length - 1 && (
                    <div className="absolute left-[20px] top-[40px] bottom-[-16px] w-px bg-border" />
                  )}

                  {/* Icon */}
                  <div className={`
                    relative z-10 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0
                    ${getActivityColor(activity.type)}
                    group-hover:scale-110 transition-transform
                  `}>
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium leading-relaxed">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

function getActivityIcon(type: Activity['type']) {
  const icons = {
    upload: <Upload className="h-4 w-4" />,
    download: <Download className="h-4 w-4" />,
    delete: <Trash2 className="h-4 w-4" />,
    share: <Share2 className="h-4 w-4" />,
    connect: <Link className="h-4 w-4" />,
  };
  return icons[type];
}

function getActivityColor(type: Activity['type']) {
  const colors = {
    upload: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    download: 'bg-green-500/10 text-green-600 dark:text-green-400',
    delete: 'bg-red-500/10 text-red-600 dark:text-red-400',
    share: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    connect: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  };
  return colors[type];
}
```

**UX Reasoning:**
- Timeline layout shows chronology naturally
- Color-coded icons provide instant recognition
- Scrollable area keeps height manageable
- Relative timestamps are more meaningful
- Hover effects add polish
- Empty state prevents confusion

### 5. Storage Breakdown Chart
**Purpose:** Visualize storage usage by file type

**TSX Structure:**
```tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface StorageData {
  name: string;
  value: number;
  color: string;
}

export function StorageBreakdown({ data, isLoading }: { data: StorageData[]; isLoading?: boolean }) {
  const totalStorage = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Storage Breakdown
        </CardTitle>
        <CardDescription>Usage by file type</CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <div className="space-y-6">
            {/* Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${(value / 1024 / 1024 / 1024).toFixed(2)} GB`}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend with details */}
            <div className="space-y-3">
              {data.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {(item.value / 1024 / 1024 / 1024).toFixed(2)} GB
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {((item.value / totalStorage) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

**UX Reasoning:**
- Donut chart is modern and space-efficient
- Legend doubles as detailed breakdown
- Percentages provide context
- Color-coding matches file type conventions
- Responsive container adapts to screen size

---

# 2. 📁 FILE MANAGEMENT PAGE

## Visual Layout Description

**Command Bar:**
- Sticky top bar with breadcrumbs navigation
- Search input (prominent, with keyboard shortcuts)
- View toggles (Grid/List)
- Sort dropdown
- Filter button with badge (active filter count)
- Bulk action buttons (appear when items selected)

**Sidebar Filters:**
- Collapsible on mobile
- File type checkboxes
- Date range picker
- Size range slider
- Drive source multi-select
- Tags/labels filter
- "Clear All" button

**Main Content Area:**
- Dynamic grid/list view
- Virtual scrolling for large lists
- Drag-and-drop upload zone (shown when dragging)
- Selection checkboxes
- Context menus on right-click

**Layout Flow:**
```
┌─────────────────────────────────────────┐
│ Breadcrumb | Search | View | Sort |Filter│
├──────┬──────────────────────────────────┤
│Filter│  File Grid/List                   │
│Panel │  (Virtual Scroll)                 │
│      │                                    │
│      │  [Select] [File] [File] [File]    │
│      │  [File] [File] [File] [File]      │
└──────┴──────────────────────────────────┘
```

## Component Breakdown

### 1. File Command Bar
**Purpose:** Primary navigation and quick actions

**TSX Structure:**
```tsx
export function FileCommandBar({
  path,
  onSearch,
  view,
  onViewChange,
  sortBy,
  onSortChange,
  activeFilters,
  onFilterClick,
  selectedCount,
  onBulkAction
}: FileCommandBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-3">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/files">All Files</BreadcrumbLink>
            </BreadcrumbItem>
            {path.split('/').filter(Boolean).map((segment, index, arr) => (
              <React.Fragment key={segment}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index === arr.length - 1 ? (
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={`/files/${arr.slice(0, index + 1).join('/')}`}>
                      {segment}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files... (⌘K)"
                className="pl-10 pr-4"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={view === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="h-8"
              onClick={() => onViewChange('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="h-8"
              onClick={() => onViewChange('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="modified">Modified Date</SelectItem>
              <SelectItem value="size">Size</SelectItem>
              <SelectItem value="type">Type</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Button */}
          <Button
            variant="outline"
            className="gap-2 relative"
            onClick={onFilterClick}
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilters > 0 && (
              <Badge variant="default" className="ml-1 h-5 min-w-5 flex items-center justify-center p-0 text-xs">
                {activeFilters}
              </Badge>
            )}
          </Button>
        </div>

        {/* Bulk Actions (when items selected) */}
        {selectedCount > 0 && (
          <div className="mt-3 flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <span className="font-medium">{selectedCount} items selected</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Move className="h-4 w-4" />
                Move
              </Button>
              <Button variant="destructive" size="sm" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

**UX Reasoning:**
- Sticky positioning keeps controls accessible
- Breadcrumbs provide context and navigation
- Keyboard shortcut hint (⌘K) teaches power users
- View toggles give user control
- Filter badge shows applied filters at a glance
- Bulk actions appear contextually
- Glassmorphism effect adds depth

### 2. File Grid View
**Purpose:** Visual file browsing (optimal for images/videos)

**TSX Structure:**
```tsx
interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  modifiedAt: string;
  thumbnailUrl?: string;
  driveType: 'google' | 'dropbox' | 'onedrive';
  starred?: boolean;
  shared?: boolean;
}

export function FileGridView({
  files,
  selectedIds,
  onSelect,
  onOpen,
  isLoading
}: FileGridViewProps) {
  const [dragTarget, setDragTarget] = useState<string | null>(null);

  return (
    <div className="p-6">
      {/* Drag-drop Upload Zone */}
      <div
        className={`
          mb-6 border-2 border-dashed rounded-xl p-8 text-center transition-all
          ${dragTarget ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-muted'}
        `}
        onDragOver={(e) => {
          e.preventDefault();
          setDragTarget('upload');
        }}
        onDragLeave={() => setDragTarget(null)}
        onDrop={(e) => {
          e.preventDefault();
          // Handle file upload
          setDragTarget(null);
        }}
      >
        <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm font-medium mb-1">Drop files to upload</p>
        <p className="text-xs text-muted-foreground">or click to browse</p>
      </div>

      {/* File Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      ) : files.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No files found"
          description="Try adjusting your filters or upload your first file"
          action={<Button>Upload Files</Button>}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {files.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              isSelected={selectedIds.includes(file.id)}
              onSelect={() => onSelect(file.id)}
              onOpen={() => onOpen(file)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FileCard({ file, isSelected, onSelect, onOpen }: FileCardProps) {
  return (
    <div
      className={`
        group relative rounded-xl border-2 transition-all cursor-pointer
        ${isSelected ? 'border-primary bg-primary/5' : 'border-transparent hover:border-border'}
      `}
      onClick={onOpen}
    >
      {/* Selection Checkbox */}
      <div
        className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <Checkbox checked={isSelected} className="bg-background/80 backdrop-blur" />
      </div>

      {/* Quick Actions */}
      <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {file.starred && <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />}
        {file.shared && <Users className="h-4 w-4 text-blue-500" />}
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button size="icon" variant="secondary" className="h-6 w-6">
              <MoreVertical className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Thumbnail */}
      <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-t-xl flex items-center justify-center overflow-hidden relative">
        {file.thumbnailUrl ? (
          <img
            src={file.thumbnailUrl}
            alt={file.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <FileIcon type={file.type} className="h-12 w-12 text-muted-foreground" />
        )}

        {/* Drive Badge */}
        <div className="absolute bottom-2 right-2">
          <DriveTypeBadge type={file.driveType} size="sm" />
        </div>
      </div>

      {/* File Info */}
      <div className="p-3 space-y-1">
        <p className="font-medium text-sm truncate" title={file.name}>
          {file.name}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatFileSize(file.size)}</span>
          <span>{formatRelativeTime(file.modifiedAt)}</span>
        </div>
      </div>
    </div>
  );
}
```

**UX Reasoning:**
- Grid maximizes visual scanning
- Checkboxes appear on hover (clean default)
- Thumbnails provide quick recognition
- Actions accessible but not intrusive
- Drag-drop zone has clear feedback
- Selection state is visually distinct
- Responsive grid adapts to screen size

### 3. File List View
**Purpose:** Detailed file browsing (optimal for power users)

**TSX Structure:**
```tsx
export function FileListView({
  files,
  selectedIds,
  onSelect,
  onOpen,
  sortBy,
  sortOrder,
  onSort,
  isLoading
}: FileListViewProps) {
  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedIds.length === files.length && files.length > 0}
                onCheckedChange={(checked) => {
                  // Select all logic
                }}
              />
            </TableHead>
            <TableHead className="w-[40%]">
              <SortableHeader
                label="Name"
                field="name"
                active={sortBy === 'name'}
                direction={sortOrder}
                onSort={onSort}
              />
            </TableHead>
            <TableHead>
              <SortableHeader
                label="Modified"
                field="modifiedAt"
                active={sortBy === 'modifiedAt'}
                direction={sortOrder}
                onSort={onSort}
              />
            </TableHead>
            <TableHead>
              <SortableHeader
                label="Size"
                field="size"
                active={sortBy === 'size'}
                direction={sortOrder}
                onSort={onSort}
              />
            </TableHead>
            <TableHead>Drive</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={6}>
                  <Skeleton className="h-12 w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : files.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-16">
                <EmptyState
                  icon={FolderOpen}
                  title="No files found"
                  description="Try adjusting your filters"
                />
              </TableCell>
            </TableRow>
          ) : (
            files.map((file) => (
              <TableRow
                key={file.id}
                className={`
                  cursor-pointer hover:bg-muted/50 transition-colors
                  ${selectedIds.includes(file.id) ? 'bg-primary/5' : ''}
                `}
                onClick={() => onOpen(file)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedIds.includes(file.id)}
                    onCheckedChange={() => onSelect(file.id)}
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    {file.thumbnailUrl ? (
                      <img
                        src={file.thumbnailUrl}
                        alt={file.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                        <FileIcon type={file.type} className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.type}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {file.starred && (
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      )}
                      {file.shared && (
                        <Users className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatRelativeTime(file.modifiedAt)}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)}
                  </span>
                </TableCell>

                <TableCell>
                  <DriveTypeBadge type={file.driveType} size="sm" />
                </TableCell>

                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function SortableHeader({ label, field, active, direction, onSort }: SortableHeaderProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 -ml-3 font-semibold"
      onClick={() => onSort(field)}
    >
      {label}
      {active && (
        direction === 'asc' ?
          <ChevronUp className="ml-2 h-4 w-4" /> :
          <ChevronDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
```

**UX Reasoning:**
- Table format shows more metadata
- Sortable columns give power users control
- Row selection is intuitive
- Inline thumbnails aid recognition
- Hover state provides clear feedback
- Actions menu reduces visual clutter
- Select-all checkbox saves time

---

# 3. 🔗 CONNECTIONS PAGE

## Visual Layout Description

**Header Section:**
- Page title with icon
- Quick stats (Total Drives, Total Storage, Active Connections)
- "Add Connection" button (prominent CTA)

**Connection Cards Grid:**
- 2-3 column grid (responsive)
- Each card shows: Drive logo, status badge, storage usage, file count, last sync time
- Action buttons: Sync, Settings, Disconnect
- Visual status indicators (animated for syncing)

**Connection Flow Modal:**
- Multi-step wizard
- Drive selection (logo grid)
- OAuth flow
- Permission selection
- Success confirmation

**Layout Flow:**
```
┌─────────────────────────────────────────┐
│ Connections Header + Quick Stats         │
├─────────────────────────────────────────┤
│ [Add Connection Button]                  │
├─────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│ │ Google   │ │ Dropbox  │ │ OneDrive ││
│ │ Drive    │ │          │ │          ││
│ │ Card     │ │ Card     │ │ Card     ││
│ └──────────┘ └──────────┘ └──────────┘│
└─────────────────────────────────────────┘
```

## Component Breakdown

### 1. Connection Stats Header
**Purpose:** Overview of all connected drives

**TSX Structure:**
```tsx
export function ConnectionsHeader({ stats }: { stats: ConnectionStats }) {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Link2 className="h-8 w-8 text-primary" />
            Drive Connections
          </h1>
          <p className="text-muted-foreground">
            Manage all your cloud storage providers in one place
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Add Connection
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <AddConnectionWizard />
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-500/10 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Cloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Drives</p>
                <p className="text-2xl font-bold">{stats.totalDrives}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-500/10 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/10">
                <HardDrive className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Storage</p>
                <p className="text-2xl font-bold">{formatStorage(stats.totalStorage)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-500/10 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10">
                <CheckCircle2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Connections</p>
                <p className="text-2xl font-bold">{stats.activeConnections}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

### 2. Connection Card
**Purpose:** Display individual drive connection details

**TSX Structure:**
```tsx
interface DriveConnection {
  id: string;
  type: 'google' | 'dropbox' | 'onedrive';
  email: string;
  status: 'connected' | 'syncing' | 'error' | 'disconnected';
  storageUsed: number;
  storageTotal: number;
  fileCount: number;
  lastSync: string;
  syncErrors?: number;
}

export function ConnectionCard({ connection, onSync, onDisconnect }: ConnectionCardProps) {
  const driveConfig = {
    google: {
      name: 'Google Drive',
      logo: <img src="/logos/google-drive.svg" alt="Google Drive" className="h-10 w-10" />,
      color: 'blue',
      bgClass: 'from-blue-500/10 to-blue-500/5'
    },
    dropbox: {
      name: 'Dropbox',
      logo: <img src="/logos/dropbox.svg" alt="Dropbox" className="h-10 w-10" />,
      color: 'cyan',
      bgClass: 'from-cyan-500/10 to-cyan-500/5'
    },
    onedrive: {
      name: 'OneDrive',
      logo: <img src="/logos/onedrive.svg" alt="OneDrive" className="h-10 w-10" />,
      color: 'indigo',
      bgClass: 'from-indigo-500/10 to-indigo-500/5'
    }
  };

  const config = driveConfig[connection.type];
  const storagePercent = (connection.storageUsed / connection.storageTotal) * 100;

  return (
    <Card className={`
      group relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300
      bg-gradient-to-br ${config.bgClass}
    `}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              {config.logo}
              {/* Status Indicator */}
              <div className={`
                absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background
                ${connection.status === 'connected' ? 'bg-green-500' : ''}
                ${connection.status === 'syncing' ? 'bg-blue-500 animate-pulse' : ''}
                ${connection.status === 'error' ? 'bg-red-500' : ''}
                ${connection.status === 'disconnected' ? 'bg-gray-500' : ''}
              `} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{config.name}</h3>
              <p className="text-sm text-muted-foreground">{connection.email}</p>
            </div>
          </div>

          {/* Status Badge */}
          <Badge variant={connection.status === 'connected' ? 'default' : 'secondary'}>
            {connection.status === 'syncing' && (
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            )}
            {connection.status === 'error' && (
              <AlertCircle className="h-3 w-3 mr-1" />
            )}
            {connection.status === 'connected' && (
              <CheckCircle2 className="h-3 w-3 mr-1" />
            )}
            {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Storage Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Storage Usage</span>
            <span className="text-muted-foreground">
              {formatStorage(connection.storageUsed)} / {formatStorage(connection.storageTotal)}
            </span>
          </div>
          <Progress value={storagePercent} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {storagePercent.toFixed(1)}% used
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Files</p>
            <p className="text-lg font-semibold">{connection.fileCount.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Last Sync</p>
            <p className="text-sm font-medium">{formatRelativeTime(connection.lastSync)}</p>
          </div>
        </div>

        {/* Error Alert */}
        {connection.syncErrors && connection.syncErrors > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {connection.syncErrors} sync {connection.syncErrors === 1 ? 'error' : 'errors'} detected
            </AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2"
          onClick={onSync}
          disabled={connection.status === 'syncing'}
        >
          <RefreshCw className={`h-4 w-4 ${connection.status === 'syncing' ? 'animate-spin' : ''}`} />
          Sync Now
        </Button>
        <Button variant="outline" size="sm" className="flex-1 gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <RefreshCw className="h-4 w-4 mr-2" />
              Force Sync
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={onDisconnect}>
              <Unplug className="h-4 w-4 mr-2" />
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
```

**UX Reasoning:**
- Visual drive logos aid recognition
- Status indicators show connection health at a glance
- Storage usage prominently displayed
- Action buttons are contextual
- Error states are clear and actionable
- Hover effects add polish

### 3. Add Connection Wizard
**Purpose:** Guide users through connecting a new drive

**TSX Structure:**
```tsx
export function AddConnectionWizard() {
  const [step, setStep] = useState<'select' | 'connecting' | 'success'>('select');
  const [selectedDrive, setSelectedDrive] = useState<DriveType | null>(null);

  const driveOptions = [
    { type: 'google', name: 'Google Drive', icon: '/logos/google-drive.svg', color: 'blue' },
    { type: 'dropbox', name: 'Dropbox', icon: '/logos/dropbox.svg', color: 'cyan' },
    { type: 'onedrive', name: 'OneDrive', icon: '/logos/onedrive.svg', color: 'indigo' },
  ];

  return (
    <DialogHeader>
      <DialogTitle>Add Cloud Drive Connection</DialogTitle>
      <DialogDescription>
        Connect your cloud storage to manage all files in one place
      </DialogDescription>

      {step === 'select' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
          {driveOptions.map((drive) => (
            <button
              key={drive.type}
              className={`
                group relative p-6 rounded-xl border-2 transition-all text-center
                ${selectedDrive === drive.type
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-accent'
                }
              `}
              onClick={() => setSelectedDrive(drive.type)}
            >
              <img
                src={drive.icon}
                alt={drive.name}
                className="h-16 w-16 mx-auto mb-3 group-hover:scale-110 transition-transform"
              />
              <p className="font-semibold">{drive.name}</p>
            </button>
          ))}
        </div>
      )}

      {step === 'connecting' && (
        <div className="py-12 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="font-medium">Connecting to {selectedDrive}...</p>
          <p className="text-sm text-muted-foreground mt-2">
            You'll be redirected to authenticate
          </p>
        </div>
      )}

      {step === 'success' && (
        <div className="py-12 text-center">
          <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <p className="font-semibold text-lg mb-2">Successfully Connected!</p>
          <p className="text-sm text-muted-foreground">
            Your {selectedDrive} is now connected and syncing
          </p>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        {step === 'select' && (
          <>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => setStep('connecting')}
              disabled={!selectedDrive}
            >
              Continue
            </Button>
          </>
        )}
        {step === 'success' && (
          <DialogClose asChild>
            <Button>Done</Button>
          </DialogClose>
        )}
      </div>
    </DialogHeader>
  );
}
```

**UX Reasoning:**
- Multi-step wizard reduces cognitive load
- Visual drive selection is intuitive
- Loading states manage expectations
- Success confirmation provides closure
- Modal keeps user in context

---

# 4. 🔍 AI SEARCH PAGE

## Visual Layout Description

**Search Header:**
- Large, centered search input (hero element)
- Search suggestions/recent searches dropdown
- Advanced filters toggle
- Search type tabs (Files, Content, People)

**Results Section:**
- Group by relevance, date, or type
- Rich result cards with preview
- Inline file actions
- Load more / infinite scroll

**Sidebar Filters:**
- File type
- Date modified
- Drive source
- Size
- AI-powered suggestions

**Layout Flow:**
```
┌─────────────────────────────────────────┐
│    [Large Search Input + AI Icon]       │
│    "Search across all your drives"      │
├─────────────────────────────────────────┤
│ Filter │ Results                         │
│ Panel  │ ┌─────────────────────┐        │
│        │ │ Result Card         │        │
│        │ └─────────────────────┘        │
│        │ ┌─────────────────────┐        │
│        │ │ Result Card         │        │
│        │ └─────────────────────┘        │
└─────────────────────────────────────────┘
```

## Component Breakdown

### 1. AI Search Hero
**Purpose:** Powerful search interface with AI assistance

**TSX Structure:**
```tsx
export function AISearchHero({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="relative">
      <div className="max-w-3xl mx-auto mb-12">
        {/* Hero Text */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered Search</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Find anything, instantly
          </h1>
          <p className="text-lg text-muted-foreground">
            Search across all your cloud drives with natural language
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder='Try "presentation from last week" or "photos of vacation"'
              className="h-16 pl-16 pr-32 text-lg rounded-2xl border-2 shadow-lg focus:shadow-xl transition-shadow"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearch(query);
                  setShowSuggestions(false);
                }
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuery('')}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="lg"
                onClick={() => onSearch(query)}
                className="gap-2"
                disabled={!query}
              >
                <Sparkles className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && recentSearches.length > 0 && (
            <Card className="absolute top-full mt-2 w-full z-50 border-2 shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Recent Searches</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => setRecentSearches([])}
                  >
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors text-left"
                      onClick={() => {
                        setQuery(search);
                        onSearch(search);
                        setShowSuggestions(false);
                      }}
                    >
                      <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm flex-1">{search}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRecentSearches(prev => prev.filter((_, i) => i !== index));
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Search Tips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Try:</span>
          {['Documents about budget', 'Images from 2024', 'Shared with John'].map((tip) => (
            <Button
              key={tip}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                setQuery(tip);
                onSearch(tip);
              }}
            >
              {tip}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 2. Search Result Card
**Purpose:** Display search results with rich context

**TSX Structure:**
```tsx
interface SearchResult {
  id: string;
  name: string;
  type: string;
  path: string;
  driveType: 'google' | 'dropbox' | 'onedrive';
  relevanceScore: number;
  snippet?: string;
  thumbnailUrl?: string;
  modifiedAt: string;
  size: number;
  highlights?: string[];
}

export function SearchResultCard({ result, onOpen }: SearchResultCardProps) {
  return (
    <Card
      className="group cursor-pointer hover:shadow-md transition-all duration-300 overflow-hidden"
      onClick={() => onOpen(result)}
    >
      <div className="flex gap-4 p-4">
        {/* Thumbnail/Icon */}
        <div className="flex-shrink-0">
          {result.thumbnailUrl ? (
            <img
              src={result.thumbnailUrl}
              alt={result.name}
              className="h-16 w-16 rounded-lg object-cover"
            />
          ) : (
            <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <FileIcon type={result.type} className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate group-hover:text-primary transition-colors mb-1">
                {result.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                <DriveTypeBadge type={result.driveType} size="xs" />
                <span>•</span>
                <span>{result.path}</span>
                <span>•</span>
                <span>{formatRelativeTime(result.modifiedAt)}</span>
              </div>
            </div>

            {/* Relevance Score */}
            <Badge variant="secondary" className="gap-1 flex-shrink-0">
              <Zap className="h-3 w-3" />
              {(result.relevanceScore * 100).toFixed(0)}%
            </Badge>
          </div>

          {/* Snippet with highlights */}
          {result.snippet && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {result.snippet}
            </p>
          )}

          {/* Highlighted matches */}
          {result.highlights && result.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {result.highlights.map((highlight, index) => (
                <Badge key={index} variant="outline" className="text-xs font-normal">
                  {highlight}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              // Download action
            }}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              // Share action
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FolderOpen className="h-4 w-4 mr-2" />
                Open Location
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="h-4 w-4 mr-2" />
                Add to Favorites
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
```

**UX Reasoning:**
- Large, prominent search input encourages use
- Natural language hints teach users
- Recent searches save time
- Relevance scores build trust in AI
- Rich result cards provide context
- Snippet highlights show why result matched
- Quick actions reduce clicks

---

# 5. 📈 ANALYTICS PAGE

## Visual Layout Description

**Dashboard Header:**
- Date range selector (prominent)
- Export button
- Quick filters (drive, file type)

**Key Metrics Row:**
- 4 stat cards (uploads, downloads, storage trend, active users)
- Trend indicators

**Charts Section:**
- Storage usage over time (area chart)
- File type distribution (donut chart)
- Activity heatmap (calendar view)
- Top files accessed (list with bar indicators)

**Layout Flow:**
```
┌─────────────────────────────────────────┐
│ Analytics | Date Range | Export           │
├─────────────────────────────────────────┤
│ [Stat] [Stat] [Stat] [Stat]             │
├─────────────────────────────────────────┤
│ Storage Trend Chart (Full Width)        │
├──────────────────────┬──────────────────┤
│ File Type Chart      │ Activity Heatmap │
├──────────────────────┴──────────────────┤
│ Top Files List                           │
└─────────────────────────────────────────┘
```

## Component Breakdown

### 1. Analytics Header
**Purpose:** Control analytics view and export data

**TSX Structure:**
```tsx
import { DatePickerWithRange } from '@/components/ui/date-picker';

export function AnalyticsHeader({ dateRange, onDateChange, onExport }: AnalyticsHeaderProps) {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your usage and gain insights into your cloud storage
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DatePickerWithRange
            date={dateRange}
            onDateChange={onDateChange}
          />
          <Button variant="outline" className="gap-2" onClick={onExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Drives</SelectItem>
            <SelectItem value="google">Google Drive</SelectItem>
            <SelectItem value="dropbox">Dropbox</SelectItem>
            <SelectItem value="onedrive">OneDrive</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="documents">Documents</SelectItem>
            <SelectItem value="images">Images</SelectItem>
            <SelectItem value="videos">Videos</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
```

### 2. Storage Trend Chart
**Purpose:** Visualize storage usage over time

**TSX Structure:**
```tsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StorageTrendData {
  date: string;
  total: number;
  google: number;
  dropbox: number;
  onedrive: number;
}

export function StorageTrendChart({ data, isLoading }: { data: StorageTrendData[]; isLoading?: boolean }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Storage Usage Trend
        </CardTitle>
        <CardDescription>Total storage used across all drives over time</CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis
                className="text-xs"
                tickFormatter={(value) => `${(value / 1024 / 1024 / 1024).toFixed(0)}GB`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload) return null;
                  return (
                    <Card className="shadow-lg">
                      <CardContent className="p-3">
                        <p className="text-sm font-medium mb-2">
                          {new Date(payload[0].payload.date).toLocaleDateString()}
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs text-muted-foreground">Total:</span>
                            <span className="text-xs font-semibold">
                              {(payload[0].payload.total / 1024 / 1024 / 1024).toFixed(2)} GB
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorTotal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
```

### 3. Activity Heatmap
**Purpose:** Show usage patterns by day/time

**TSX Structure:**
```tsx
export function ActivityHeatmap({ data }: { data: ActivityData[] }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Activity Heatmap
        </CardTitle>
        <CardDescription>Your activity patterns over the last 90 days</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Days of week */}
          <div className="grid grid-cols-13 gap-1">
            {data.map((day, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={`
                      aspect-square rounded-sm transition-all hover:scale-110 cursor-pointer
                      ${getActivityColor(day.count)}
                    `}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs font-medium">{day.date}</p>
                  <p className="text-xs text-muted-foreground">{day.count} activities</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-3 w-3 rounded-sm ${getActivityColor(level * 25)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getActivityColor(count: number): string {
  if (count === 0) return 'bg-muted';
  if (count < 25) return 'bg-green-200 dark:bg-green-900';
  if (count < 50) return 'bg-green-300 dark:bg-green-700';
  if (count < 75) return 'bg-green-400 dark:bg-green-600';
  return 'bg-green-500 dark:bg-green-500';
}
```

**UX Reasoning:**
- Date range selector provides flexibility
- Export allows offline analysis
- Area chart shows trends clearly
- Heatmap reveals usage patterns
- Interactive tooltips provide details
- Color gradients are visually appealing
- Responsive charts adapt to screen size

---

# 6. ⚙️ SETTINGS PAGE

## Visual Layout Description

**Sidebar Navigation:**
- Profile
- Account
- Billing
- Security
- Notifications
- Integrations
- Preferences

**Content Area:**
- Section-based layout
- Clear headings and descriptions
- Inline editing where possible
- Save indicators (auto-save or explicit buttons)

**Layout Flow:**
```
┌─────────────────────────────────────────┐
│ Settings Title                           │
├───────┬─────────────────────────────────┤
│ Nav   │ Setting Section                  │
│ ─────│ ┌─────────────────────────────┐ │
│Profile│ │ Form Fields                 │ │
│Account│ │                             │ │
│Billing│ └─────────────────────────────┘ │
│Secure │                                  │
└───────┴─────────────────────────────────┘
```

## Component Breakdown

### 1. Settings Navigation
**Purpose:** Organize settings into logical sections

**TSX Structure:**
```tsx
export function SettingsNav({ activeSection, onSectionChange }: SettingsNavProps) {
  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Settings },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Puzzle },
    { id: 'preferences', label: 'Preferences', icon: Sliders },
  ];

  return (
    <nav className="space-y-1">
      {sections.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${isActive
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
              }
            `}
          >
            <Icon className="h-4 w-4" />
            {section.label}
          </button>
        );
      })}
    </nav>
  );
}
```

### 2. Profile Settings Section
**Purpose:** Manage user profile information

**TSX Structure:**
```tsx
export function ProfileSettings({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Profile</h2>
        <p className="text-muted-foreground">
          Manage your public profile information
        </p>
      </div>

      {/* Avatar Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Your profile picture is visible to other users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="text-2xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div className="flex gap-2">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New
                </Button>
                <Button variant="ghost">Remove</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF. Max size 2MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                value={formData.email}
                disabled
              />
              <Badge variant="secondary" className="flex-shrink-0">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={4}
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              {formData.bio?.length || 0} / 500 characters
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
```

### 3. Billing & Plans Section
**Purpose:** Manage subscription and payment

**TSX Structure:**
```tsx
export function BillingSettings({ subscription }: { subscription: Subscription }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Billing & Plans</h2>
        <p className="text-muted-foreground">
          Manage your subscription and payment methods
        </p>
      </div>

      {/* Current Plan */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/10 to-transparent">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{subscription.plan} Plan</CardTitle>
              <CardDescription className="mt-2">
                {subscription.storage} storage • {subscription.users} users
              </CardDescription>
            </div>
            <Badge variant="default" className="text-base px-4 py-1">
              ${subscription.price}/month
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Usage Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Storage Used</span>
              <span className="text-muted-foreground">
                {subscription.used} / {subscription.storage}
              </span>
            </div>
            <Progress value={(subscription.used / subscription.storage) * 100} />
          </div>

          {/* Billing Date */}
          <div className="flex items-center justify-between text-sm pt-4 border-t">
            <span className="text-muted-foreground">Next billing date</span>
            <span className="font-medium">{subscription.nextBillingDate}</span>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline" className="flex-1">
            <ArrowUpCircle className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
          <Button variant="ghost">Change Plan</Button>
        </CardFooter>
      </Card>

      {/* Payment Methods */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Credit Card */}
            <div className="flex items-center justify-between p-4 rounded-lg border-2 border-primary bg-primary/5">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-background">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge>Default</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Download your invoices</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((invoice) => (
                <TableRow key={invoice}>
                  <TableCell className="font-medium">Jan 1, 2024</TableCell>
                  <TableCell>Pro Plan - Monthly</TableCell>
                  <TableCell>$29.00</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
```

**UX Reasoning:**
- Sidebar navigation is scannable
- Sections are clearly separated
- Inline editing reduces friction
- Current plan prominently displayed
- Payment methods are visual
- Billing history is accessible
- CTAs are contextual

---

# 7. 🏠 HOME (LANDING PAGE)

## Visual Layout Description

**Hero Section:**
- Full viewport height
- Animated gradient background
- Headline + subheadline
- CTA buttons (Sign Up, Watch Demo)
- Hero illustration/mockup

**Features Section:**
- 3-column grid
- Icon + title + description
- Subtle animations on scroll

**Integration Section:**
- Logos of supported drives
- Animated connection lines
- "Connect Everything" messaging

**Social Proof:**
- User testimonials (carousel)
- Usage statistics (animated counters)
- Trust badges

**Pricing Teaser:**
- 3 plan cards (brief)
- "See all plans" CTA

**Footer:**
- Links (Product, Company, Resources, Legal)
- Social media icons
- Newsletter signup

## Component Breakdown

### 1. Hero Section
**Purpose:** Capture attention and communicate value proposition

**TSX Structure:**
```tsx
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-purple-500/20">
        <div className="absolute inset-0 bg-grid-white/5" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">The future of cloud storage management</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
            All your cloud drives,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              unified in one place
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            Connect Google Drive, Dropbox, OneDrive and more.
            Search, manage, and share files across all your cloud storage providers instantly.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up animation-delay-200">
            <Button size="lg" className="gap-2 text-lg px-8 py-6 h-auto">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 h-auto">
              <Play className="h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up animation-delay-300">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={`/avatars/user-${i}.jpg`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span>Trusted by 10,000+ users</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Mockup */}
        <div className="mt-16 max-w-6xl mx-auto animate-fade-in-up animation-delay-400">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 backdrop-blur">
            <img
              src="/mockups/dashboard-preview.png"
              alt="DriveUnity Dashboard"
              className="w-full h-auto"
            />
            {/* Floating Feature Cards */}
            <div className="absolute top-8 -left-8 animate-float">
              <Card className="shadow-xl border-0 bg-background/95 backdrop-blur">
                <CardContent className="p-4 flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-semibold">File Synced</p>
                    <p className="text-xs text-muted-foreground">presentation.pdf</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 2. Features Section
**Purpose:** Highlight key features and benefits

**TSX Structure:**
```tsx
export function FeaturesSection() {
  const features = [
    {
      icon: Link2,
      title: 'Unified Access',
      description: 'Connect all your cloud drives and access files from a single, intuitive dashboard.',
      color: 'blue'
    },
    {
      icon: Search,
      title: 'AI-Powered Search',
      description: 'Find anything instantly with natural language search across all your connected drives.',
      color: 'purple'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures quick file operations and seamless synchronization.',
      color: 'orange'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your data is encrypted end-to-end. We never store your files, only metadata.',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Easy Collaboration',
      description: 'Share files and folders across different platforms with team members effortlessly.',
      color: 'cyan'
    },
    {
      icon: BarChart3,
      title: 'Insightful Analytics',
      description: 'Track storage usage, file activities, and get AI-powered suggestions.',
      color: 'pink'
    }
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    green: 'from-green-500 to-green-600',
    cyan: 'from-cyan-500 to-cyan-600',
    pink: 'from-pink-500 to-pink-600'
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need to manage cloud storage
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful features designed for individuals, teams, and enterprises
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className={`
                    h-12 w-12 rounded-xl bg-gradient-to-br ${colorClasses[feature.color]}
                    flex items-center justify-center mb-6
                    group-hover:scale-110 transition-transform
                  `}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Effect */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${colorClasses[feature.color]}
                    opacity-0 group-hover:opacity-5 transition-opacity -z-10
                  `} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

### 3. Integration Showcase
**Purpose:** Show supported platforms

**TSX Structure:**
```tsx
export function IntegrationSection() {
  const integrations = [
    { name: 'Google Drive', logo: '/logos/google-drive.svg' },
    { name: 'Dropbox', logo: '/logos/dropbox.svg' },
    { name: 'OneDrive', logo: '/logos/onedrive.svg' },
    { name: 'Box', logo: '/logos/box.svg', comingSoon: true },
    { name: 'iCloud', logo: '/logos/icloud.svg', comingSoon: true },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Connect everything you use
          </h2>
          <p className="text-xl text-muted-foreground">
            We support all major cloud storage providers with more coming soon
          </p>
        </div>

        {/* Integration Logos */}
        <div className="flex flex-wrap items-center justify-center gap-12">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="relative group"
            >
              <div className={`
                p-8 rounded-2xl bg-background border-2 transition-all
                ${integration.comingSoon
                  ? 'border-dashed border-muted opacity-50'
                  : 'border-border hover:border-primary hover:shadow-lg'
                }
              `}>
                <img
                  src={integration.logo}
                  alt={integration.name}
                  className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              {integration.comingSoon && (
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 text-xs"
                >
                  Soon
                </Badge>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Request Integration
          </Button>
        </div>
      </div>
    </section>
  );
}
```

**UX Reasoning:**
- Hero immediately communicates value
- Animated elements add energy
- Social proof builds trust
- Features are scannable
- Integration logos are recognizable
- CTAs are clear and prominent
- Responsive layout adapts beautifully

---

# 8. 📧 CONTACT US PAGE

## Visual Layout Description

**Hero Section:**
- Headline: "Get in Touch"
- Subheadline about support

**Two-Column Layout:**
- Left: Contact form
- Right: Contact methods + FAQ links

**Alternative Contact Methods:**
- Email, Twitter, Discord
- Office locations (if applicable)

## Component Breakdown

**TSX Structure:**
```tsx
export function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Form */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>
              Fill out the form below and our team will get back to you within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us how we can help..."
                />
              </div>

              <Button size="lg" className="w-full">
                Send Message
                <Send className="h-4 w-4 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Other ways to reach us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href="mailto:support@driveunity.com"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-xs text-muted-foreground">support@driveunity.com</p>
                </div>
              </a>

              <a
                href="https://twitter.com/driveunity"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <Twitter className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Twitter</p>
                  <p className="text-xs text-muted-foreground">@driveunity</p>
                </div>
              </a>

              <a
                href="https://discord.gg/driveunity"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10">
                  <MessageCircle className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Discord</p>
                  <p className="text-xs text-muted-foreground">Join our community</p>
                </div>
              </a>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Help</CardTitle>
              <CardDescription>Find answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-between" asChild>
                <a href="/faq">
                  View FAQ
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

**UX Reasoning:**
- Form is prominent and easy to fill
- Alternative contact methods reduce friction
- Subject dropdown helps routing
- Visual icons aid recognition
- Responsive layout works on all devices

---

# 9. ℹ️ ABOUT US PAGE

## Visual Layout Description

**Hero Section:**
- Mission statement
- Company values

**Story Section:**
- Founder story / company journey
- Timeline (optional)

**Team Section:**
- Team member cards with photos
- Roles and social links

**Stats Section:**
- Company metrics (users, files, countries)

## Component Breakdown

**TSX Structure:**
```tsx
export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-24">
        <Badge variant="secondary" className="mb-4">About Us</Badge>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Building the future of
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
            cloud storage management
          </span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          We believe managing files across multiple cloud providers shouldn't be complicated.
          DriveUnity makes it simple, fast, and secure.
        </p>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto mb-24">
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-purple-500/20" />
            <CardContent className="p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                DriveUnity was founded in 2024 by a team of developers frustrated with managing files across multiple cloud storage providers.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What started as a simple tool for ourselves quickly grew into a platform used by thousands of professionals and teams worldwide.
              </p>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Values */}
      <div className="max-w-6xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Privacy First', description: 'Your data security is our top priority' },
            { icon: Zap, title: 'Speed & Simplicity', description: 'Powerful features, intuitive design' },
            { icon: Users, title: 'User-Centric', description: 'Built with your feedback and needs in mind' }
          ].map((value, i) => {
            const Icon = value.icon;
            return (
              <Card key={i} className="border-0 shadow-sm text-center">
                <CardContent className="p-8">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary/5 rounded-3xl p-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '10,000+', label: 'Active Users' },
            { value: '5M+', label: 'Files Managed' },
            { value: '50+', label: 'Countries' },
            { value: '99.9%', label: 'Uptime' }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

# 10. 💰 PRICING PAGE

## Visual Layout Description

**Header:**
- "Simple, transparent pricing"
- Billing toggle (Monthly/Yearly with discount badge)

**Plan Cards:**
- 3 columns (Free, Pro, Enterprise)
- Highlighted "Popular" plan
- Feature lists with checkmarks
- Clear CTAs

**FAQ Section:**
- Accordion of common questions

## Component Breakdown

**TSX Structure:**
```tsx
export function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for personal use',
      features: [
        '2 connected drives',
        '10 GB unified storage',
        'Basic search',
        'Mobile app access',
        'Email support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: { monthly: 29, yearly: 290 },
      description: 'For power users and professionals',
      features: [
        'Unlimited connected drives',
        '1 TB unified storage',
        'AI-powered search',
        'Priority support',
        'Advanced analytics',
        'Team collaboration',
        'API access'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 'Custom', yearly: 'Custom' },
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'SSO & SAML',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee',
        'Advanced security controls'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Choose the plan that works best for you
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-3 p-1 bg-muted rounded-lg">
          <Button
            variant={billingPeriod === 'monthly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingPeriod('monthly')}
          >
            Monthly
          </Button>
          <Button
            variant={billingPeriod === 'yearly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingPeriod('yearly')}
            className="gap-2"
          >
            Yearly
            <Badge variant="secondary" className="text-xs">Save 17%</Badge>
          </Button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`
              relative overflow-hidden
              ${plan.popular
                ? 'border-2 border-primary shadow-xl scale-105'
                : 'border-0 shadow-sm'
              }
            `}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
            )}

            <CardHeader className="text-center pb-8 pt-12">
              <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-6">
                {typeof plan.price.monthly === 'number' ? (
                  <>
                    <span className="text-5xl font-bold">
                      ${billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </>
                ) : (
                  <span className="text-5xl font-bold">{plan.price.monthly}</span>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <Button
                size="lg"
                className="w-full"
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>

              <div className="space-y-3 pt-6 border-t">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        {/* Use Accordion component here */}
      </div>
    </div>
  );
}
```

**UX Reasoning:**
- Clear pricing hierarchy
- Billing toggle shows savings
- Popular plan is highlighted
- Feature lists are scannable
- CTAs are action-oriented
- FAQ reduces support load

---

# ✅ IMPLEMENTATION CHECKLIST

## Design Tokens
- [ ] Set up CSS variables for all colors
- [ ] Define typography scale
- [ ] Create spacing utilities
- [ ] Set up animation keyframes

## Shared Components
- [ ] Empty state component
- [ ] Loading skeleton variants
- [ ] File icon component with type mapping
- [ ] Drive type badge component
- [ ] Search input with suggestions
- [ ] Date picker with range

## Page Components
- [ ] Dashboard page (5 components)
- [ ] File Management (3 view types)
- [ ] Connections (3 components)
- [ ] AI Search (2 components)
- [ ] Analytics (4 chart types)
- [ ] Settings (7 sections)
- [ ] Home/Landing (4 sections)
- [ ] Contact (form + info)
- [ ] About (story + team)
- [ ] Pricing (3 tiers + FAQ)

## Responsive Behavior
- [ ] Mobile navigation
- [ ] Tablet layouts
- [ ] Desktop optimization
- [ ] Touch interactions

## Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader labels
- [ ] Focus indicators
- [ ] Color contrast check

---

# 🎯 KEY DESIGN DECISIONS

1. **No Spinners**: Use skeleton loaders for better perceived performance
2. **Glassmorphism**: Subtle backdrop blur for modern feel
3. **Micro-interactions**: Hover, focus, and active states on everything
4. **Consistent Icons**: Lucide icons throughout
5. **Color Semantics**: Blue (primary), Green (success), Red (error), Orange (warning)
6. **Card-Based**: Cards for everything (elevation creates hierarchy)
7. **Progressive Disclosure**: Show details on hover/click
8. **Empty States**: Always provide guidance
9. **Contextual Actions**: Bulk actions appear when needed
10. **Mobile-First**: Build mobile, enhance for desktop

---

**END OF PAGE DESIGNS DOCUMENT**
