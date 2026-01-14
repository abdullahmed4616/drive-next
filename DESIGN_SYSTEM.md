# DriveUnity - Professional Design System
## Enterprise-Level Multi-Drive Cloud Provider

---

## 📐 DESIGN PRINCIPLES

### Core Philosophy
1. **Clarity Over Complexity** - Every element serves a purpose
2. **Speed & Performance** - Fast interactions, instant feedback
3. **Progressive Disclosure** - Show what matters, hide what doesn't
4. **Accessibility First** - WCAG 2.1 AA compliance minimum
5. **Consistent Patterns** - Learn once, use everywhere

### Visual Language
- **Spacing**: 8px base unit (0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24)
- **Typography Scale**: 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px, 48px
- **Border Radius**: sm(4px), md(6px), lg(8px), xl(12px), 2xl(16px)
- **Shadows**: Subtle elevation (never harsh)
- **Animations**: 150ms fast, 250ms base, 400ms slow

---

## 🎨 COLOR SYSTEM

### Semantic Colors (Already Defined)
```css
--primary: #6B9ADF (Professional Blue)
--success: #2E7D32 (Green)
--warning: #F57C00 (Orange)
--destructive: #E53935 (Red)
--info: #0288D1 (Cyan)
```

### Extended Palette (For UI Richness)
```css
--accent-purple: #8B5CF6
--accent-pink: #EC4899
--accent-amber: #F59E0B
--accent-teal: #14B8A6
--neutral-50 to --neutral-950 (Gray scale)
```

### Usage Guidelines
- **Primary**: CTAs, active states, focus indicators
- **Success**: Confirmations, uploads complete, connection success
- **Warning**: Storage warnings, trial ending, update available
- **Destructive**: Delete actions, errors, disconnections
- **Neutrals**: Text, borders, backgrounds (60-30-10 rule)

---

## 🧩 COMPONENT LIBRARY

### Button Hierarchy
```tsx
// Primary: Main actions (Connect Drive, Upload Files)
<Button size="default" variant="default">Primary Action</Button>

// Secondary: Alternative actions (Cancel, Go Back)
<Button size="default" variant="outline">Secondary Action</Button>

// Ghost: Subtle actions (Dropdown items, nav items)
<Button size="default" variant="ghost">Ghost Action</Button>

// Destructive: Delete, disconnect
<Button size="default" variant="destructive">Delete File</Button>

// Icon Only: Toolbar buttons
<Button size="icon" variant="ghost"><MoreHorizontal /></Button>
```

### Card Patterns
```tsx
// Elevated Card (for important content)
<Card className="shadow-lg border-0">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Actions</CardFooter>
</Card>

// Flat Card (for lists, grids)
<Card className="shadow-sm hover:shadow-md transition-shadow">
  {/* Content */}
</Card>

// Glass Card (for overlays, hero sections)
<Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  {/* Content */}
</Card>
```

### Empty States Pattern
```tsx
<div className="flex flex-col items-center justify-center py-16 text-center">
  <div className="rounded-full bg-muted p-4 mb-4">
    <Icon className="h-8 w-8 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-semibold mb-2">No files yet</h3>
  <p className="text-sm text-muted-foreground mb-6 max-w-md">
    Connect your first drive to start managing files across all your cloud storage providers.
  </p>
  <Button>Connect Drive</Button>
</div>
```

### Loading States Pattern
```tsx
// Use Skeleton, never spinners
<div className="space-y-4">
  <Skeleton className="h-12 w-full" />
  <Skeleton className="h-12 w-full" />
  <Skeleton className="h-12 w-3/4" />
</div>
```

---

## 📱 RESPONSIVE BREAKPOINTS

```tsx
// Mobile First Approach
sm: 640px   // Large phones
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Desktops
2xl: 1536px // Large screens

// Usage Pattern
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
```

---

## 🎭 MICRO-INTERACTIONS

### Hover Effects
```tsx
className="transition-all hover:scale-[1.02] hover:shadow-lg"
className="transition-colors hover:bg-accent hover:text-accent-foreground"
className="group relative hover:border-primary"
```

### Active States
```tsx
className="active:scale-[0.98] transition-transform"
```

### Focus States
```tsx
className="focus:ring-2 focus:ring-ring focus:ring-offset-2"
```

---

