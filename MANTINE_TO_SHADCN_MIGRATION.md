# Mantine to shadcn/ui Migration Summary

## Migration Status: **IN PROGRESS**

**Completed:** 12 files
**Remaining:** 19 files
**Total:** 31 files

---

## ✅ **COMPLETED MIGRATIONS**

### 1. **Layout Components** (100% Complete)
- ✅ `/src/app/components/layout/PrivateNavbar.tsx`
  - Replaced `Menu` → `DropdownMenu`
  - Replaced `Drawer` → `Sheet`
  - Replaced `Avatar`, `Badge`, `Tooltip` with shadcn equivalents
  - Replaced `notifications.show()` → `toast()`
  - Replaced `useDisclosure` → `useState`
  - Icons: `@tabler/icons-react` → `lucide-react`

- ✅ `/src/app/components/layout/PublicNavbar.tsx`
  - Replaced `Drawer` → `Sheet`
  - Replaced `Burger` → `Menu` icon with button
  - Replaced `Container`, `Group`, `Stack` → Tailwind flex/grid
  - Replaced `useWindowScroll` → custom `useEffect` with window scroll listener

- ✅ `/src/app/components/layout/Sidebar.tsx`
  - Complete rewrite using shadcn components
  - Navigation links with `Tooltip` and `Badge`
  - Replaced `Box`, `Stack`, `Group` → Tailwind classes
  - Custom hover states and animations

### 2. **Layout Files** (100% Complete)
- ✅ `/src/app/(public)/layout.tsx`
  - Removed `Container` import

- ✅ `/src/app/(private)/layout.tsx`
  - Complete migration from `AppShell` to custom layout
  - Used `Skeleton` for loading states
  - Mobile/Desktop sidebar toggle with Tailwind

### 3. **Dashboard Components** (40% Complete)
- ✅ `/src/app/(private)/dashboard/page.tsx`
  - Replaced `Container`, `SimpleGrid`, `Stack` → Tailwind grid/flex

- ✅ `/src/app/(private)/dashboard/_components/StatsCard.tsx`
  - Replaced `Paper` → `Card`/`CardContent`
  - Replaced `Skeleton` → shadcn `Skeleton`
  - Icons: `@tabler/icons-react` → `lucide-react`

### 4. **Public Page Components** (30% Complete)
- ✅ `/src/app/(public)/home/components/FeatureCard.tsx`
  - Replaced `Card` → shadcn `Card`/`CardContent`
  - Custom hover states with React state

- ✅ `/src/app/components/ui/CommingSoon.tsx`
  - Complete migration to Tailwind
  - Icons: `@tabler/icons-react` → `lucide-react`

---

## 🔄 **REMAINING MIGRATIONS** (19 files)

### Priority 1: Authentication & Forms
1. **`/src/app/(public)/auth/page.tsx`** ⚠️ COMPLEX
   - Components to replace:
     - `Paper` → `Card`
     - `TextInput` → `Input` with `Label`
     - `Button` → `Button`
     - `Stack` → `<div className="flex flex-col gap-{size}">`
     - `Alert` → `Alert`
     - `Loader` + `Center` → `Skeleton` or custom spinner
     - `useForm` from `@mantine/form` → `react-hook-form` or native state
     - `notifications.show()` → `toast()`
   - Icons: All `@tabler/icons-react` → `lucide-react`

### Priority 2: File Management Components
2. **`/src/app/(private)/files/content.tsx`** ⚠️ VERY COMPLEX
3. **`/src/app/(private)/files/_component/FileList.tsx`**
4. **`/src/app/(private)/files/_component/FileCard.tsx`**
5. **`/src/app/(private)/files/_component/FilterModal.tsx`**
   - Components to replace:
     - `Paper` → `Card`
     - `Table` → `Table` (shadcn)
     - `Modal` → `Dialog`
     - `TextInput` → `Input`
     - `MultiSelect` → Custom multi-select or `Select` with multiple
     - `NumberInput` → `Input` with type="number"
     - `Pagination` → Custom pagination or library
     - `ThemeIcon` → Custom styled div
     - `ScrollArea` → `ScrollArea` (shadcn)
     - `Badge`, `Button`, `Tooltip` → shadcn equivalents

### Priority 3: Public Content Pages
6. **`/src/app/(public)/home/content.tsx`** ⚠️ COMPLEX
7. **`/src/app/(public)/about/content.tsx`**
8. **`/src/app/(public)/contact/content.tsx`**
9. **`/src/app/(public)/price/content.tsx`**
   - Common replacements:
     - `Container` → `<div className="container mx-auto max-w-{size}">`
     - `Grid` → Tailwind grid
     - `Title` → `<h1-h6>` with Tailwind
     - `Text` → `<p>` or `<span>`
     - `Button` → shadcn `Button`
     - `Badge` → shadcn `Badge`
     - `Anchor` → Next.js `Link`

### Priority 4: Dashboard Components
10. **`/src/app/(private)/dashboard/_components/RecentActivity.tsx`**
11. **`/src/app/(private)/dashboard/_components/MimitypeOverview.tsx`**

### Priority 5: Connection Components
12. **`/src/app/(private)/connections/content.tsx`**
13. **`/src/app/(private)/connections/_components/ConnectedDriveList.tsx`**
14. **`/src/app/(private)/connections/_components/ConnectedDriveCard.tsx`**

### Priority 6: Settings Components
15. **`/src/app/(private)/settings/page.tsx`**
16. **`/src/app/(private)/settings/_components/sidebar.tsx`**
17. **`/src/app/(private)/settings/paddlePayment/page.tsx`**
18. **`/src/app/(private)/settings/paddlePayment/_components/PricingCard.tsx`**

### Priority 7: Provider Files
19. **`/src/app/providers/MantainProvider.tsx`**
20. **`/src/styles/mantine-theme.ts`**

---

## 📋 **MIGRATION PATTERNS & REFERENCE**

### Layout Components Replacement

#### Stack → Flex Column
```tsx
// Before
<Stack spacing="md">...</Stack>

// After
<div className="flex flex-col gap-4">...</div>
```

#### Group → Flex Row
```tsx
// Before
<Group position="apart" spacing="sm">...</Group>

// After
<div className="flex items-center justify-between gap-2">...</div>
```

#### Container → Tailwind Container
```tsx
// Before
<Container size="xl" py="xl">...</Container>

// After
<div className="container max-w-7xl mx-auto py-6 md:py-8">...</div>
```

### Component Replacements

#### Paper/Card → Card
```tsx
// Before
<Paper shadow="sm" p="md" withBorder>...</Paper>

// After
<Card className="border">
  <CardContent className="p-6">...</CardContent>
</Card>
```

#### Button
```tsx
// Before
<Button variant="filled" color="blue" size="md">Click</Button>

// After
<Button variant="default" size="default">Click</Button>
```

#### TextInput → Input
```tsx
// Before
<TextInput
  label="Email"
  placeholder="your@email.com"
  leftSection={<IconMail size={16} />}
/>

// After
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <div className="relative">
    <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={16} />
    <Input
      id="email"
      placeholder="your@email.com"
      className="pl-10"
    />
  </div>
</div>
```

#### Modal → Dialog
```tsx
// Before
<Modal opened={opened} onClose={close} title="Title">
  <Text>Content</Text>
</Modal>

// After
<Dialog open={opened} onOpenChange={(open) => !open && close()}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    <p>Content</p>
  </DialogContent>
</Dialog>
```

#### Menu → DropdownMenu
```tsx
// Before
<Menu>
  <Menu.Target><Button>Menu</Button></Menu.Target>
  <Menu.Dropdown>
    <Menu.Item leftSection={<IconUser />}>Profile</Menu.Item>
  </Menu.Dropdown>
</Menu>

// After
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <User className="mr-2" size={16} />
      Profile
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### Drawer → Sheet
```tsx
// Before
<Drawer opened={opened} onClose={close} position="right">
  <Text>Content</Text>
</Drawer>

// After
<Sheet open={opened} onOpenChange={setOpened}>
  <SheetContent side="right">
    <p>Content</p>
  </SheetContent>
</Sheet>
```

#### Table → Table
```tsx
// Before
<Table>
  <thead>
    <tr>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Value</td>
    </tr>
  </tbody>
</Table>

// After
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Value</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Hook Replacements

#### useDisclosure → useState
```tsx
// Before
const [opened, { toggle, open, close }] = useDisclosure(false);

// After
const [opened, setOpened] = useState(false);
const toggle = () => setOpened(!opened);
const open = () => setOpened(true);
const close = () => setOpened(false);
```

#### useWindowScroll → Custom Hook
```tsx
// Before
const [scroll] = useWindowScroll();
const scrolled = scroll.y > 20;

// After
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Notification Replacements

#### notifications.show() → toast()
```tsx
// Before
notifications.show({
  title: 'Success',
  message: 'Operation completed',
  color: 'green',
  icon: <IconCheck size={16} />,
});

// After
toast({
  title: 'Success',
  description: 'Operation completed',
  variant: 'default',
});

// For errors
toast({
  title: 'Error',
  description: 'Operation failed',
  variant: 'destructive',
});
```

### Icon Replacements

Common icon migrations from `@tabler/icons-react` to `lucide-react`:

| Tabler Icon | Lucide Icon |
|-------------|-------------|
| `IconLogout` | `LogOut` |
| `IconSettings` | `Settings` |
| `IconUser` | `User` |
| `IconChevronDown` | `ChevronDown` |
| `IconPlugConnected` | `PlugZap` |
| `IconAlertCircle` | `AlertCircle` |
| `IconCloud` | `Cloud` |
| `IconSparkles` | `Sparkles` |
| `IconBell` | `Bell` |
| `IconFile` | `File` |
| `IconFolder` | `Folder` |
| `IconSearch` | `Search` |
| `IconDashboard` | `LayoutDashboard` |
| `IconChartBar` | `BarChart3` |
| `IconMail` | `Mail` |
| `IconCheck` | `Check` |
| `IconX` | `X` |
| `IconArrowLeft` | `ArrowLeft` |
| `IconArrowRight` | `ArrowRight` |

---

## 🔧 **NEXT STEPS**

### 1. Complete Priority 1 (Auth Page)
The auth page is critical and complex. It needs:
- Form validation migration (consider `react-hook-form`)
- OTP input component (already exists)
- Multi-step form handling
- All notification calls → toast

### 2. Migrate File Management (Priority 2)
These components handle the core file browsing functionality:
- Large tables with pagination
- Complex filtering modals
- File cards with actions
- Drive selection UI

### 3. Update Content Pages (Priority 3)
Public-facing pages with marketing content:
- Grid layouts
- Feature sections
- CTA buttons
- Contact forms

### 4. Dashboard & Analytics (Priority 4)
- Chart components
- Recent activity lists
- Mime type visualizations

### 5. Connection Management (Priority 5)
- Drive connection cards
- OAuth flow UI
- Connected account management

### 6. Settings Pages (Priority 6)
- Settings navigation
- Payment/pricing cards
- User preferences forms

### 7. Clean Up Provider Files (Priority 7)
- Remove `MantineProvider`
- Clean up theme configuration
- Update root layout if needed

---

## 🧪 **TESTING CHECKLIST**

After completing all migrations:

### Visual Testing
- [ ] All pages render correctly
- [ ] Responsive layouts work on mobile/tablet/desktop
- [ ] Dark mode (if implemented) works correctly
- [ ] Hover states and animations work
- [ ] Loading states display properly

### Functional Testing
- [ ] Authentication flow works (login, OTP, logout)
- [ ] File browsing and filtering works
- [ ] Drive connections can be added/removed
- [ ] Settings can be updated
- [ ] Toasts display for success/error states
- [ ] Forms validate correctly
- [ ] Navigation (sidebar, navbar) works on all screen sizes

### Component Testing
- [ ] All shadcn components are properly imported
- [ ] No Mantine imports remain (except in node_modules)
- [ ] All icons are from lucide-react
- [ ] Tailwind classes are used consistently
- [ ] Accessibility (keyboard navigation, ARIA labels) maintained

### Performance Testing
- [ ] Page load times are acceptable
- [ ] No console errors or warnings
- [ ] Bundle size hasn't increased significantly

---

## 📦 **DEPENDENCIES TO REMOVE**

After migration is complete, remove these dependencies:

```bash
npm uninstall @mantine/core @mantine/hooks @mantine/notifications @mantine/form @tabler/icons-react
```

Also remove:
- `/src/styles/mantine-theme.ts`
- `/src/app/providers/MantainProvider.tsx`

Update root layout to remove `MantineProvider`.

---

## 🎯 **KEY PRINCIPLES**

1. **Preserve Business Logic** - Only change UI components, not functionality
2. **Maintain Accessibility** - Keep or improve accessibility features
3. **Consistent Styling** - Use Tailwind utilities consistently
4. **Component Reusability** - Create reusable patterns for repeated UI elements
5. **Type Safety** - Maintain TypeScript types throughout
6. **Performance** - Ensure no performance regression

---

## 📝 **NOTES**

- All migrated components maintain the same visual design and color scheme (#6B9ADF)
- Mobile responsiveness is preserved or improved
- All toast notifications use the shadcn toast system
- Custom animations are preserved using Tailwind/CSS
- Loading states use Skeleton components where appropriate
