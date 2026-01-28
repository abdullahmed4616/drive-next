'use client';

import { useState, useEffect } from 'react';
import {
    LogOut,
    Settings,
    User,
    ChevronDown,
    PlugZap,
    AlertCircle,
    Cloud,
    Menu as MenuIcon,
    Moon,
    Sun,
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useToast } from '@/app/components/ui/use-toast';
import { useSession } from '@/app/providers/SessionProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/app/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';

export default function PrivateNavbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [opened, setOpened] = useState(false);
    const { toast } = useToast();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const { user, logout } = useSession();

    const [isConnected, setIsConnected] = useState(false);
    const [accountsCount, setAccountsCount] = useState(0);
    const [checkingConnection, setCheckingConnection] = useState(true);

    useEffect(() => {
        setMounted(true);
        checkConnectionStatus();
    }, []);

    const checkConnectionStatus = async () => {
        try {
            const response = await fetch('/api/googleDrive/auth/status', {
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setIsConnected(data.connected && data.accountsCount > 0);
                setAccountsCount(data.accountsCount || 0);
            }
        } catch (error) {
            console.error('Connection check failed:', error);
        } finally {
            setCheckingConnection(false);
        }
    };

    const handleNavigation = (path: string) => {
        const allowedRoutes = ['/connections', '/settings'];

        if (!isConnected && !allowedRoutes.includes(path)) {
            toast({
                title: 'Connection Required',
                description: 'Please connect a drive first to access this feature',
                variant: 'default',
            });
            router.push('/connections');
            return;
        }

        router.push(path);
        setOpened(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
            toast({
                title: 'Error',
                description: 'Failed to logout. Please try again.',
                variant: 'destructive',
            });
        }
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    if (checkingConnection) {
        return (
            <header className="w-full bg-card/80 backdrop-blur-xl border-b border-border">
                <div className="flex h-[72px] items-center justify-between w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-cloud flex items-center justify-center shadow-md">
                            <Cloud size={22} className="text-white" />
                        </div>
                        <div>
                            <span className="text-lg font-bold text-foreground">
                                DriveUnity
                            </span>
                            <p className="text-xs text-muted-foreground">
                                Unified Cloud Storage
                            </p>
                        </div>
                    </div>
                    <Avatar className="border-2 border-border">
                        <AvatarFallback className="bg-muted">U</AvatarFallback>
                    </Avatar>
                </div>
            </header>
        );
    }

    return (
        <TooltipProvider>
            <header className="relative w-full bg-card/80 backdrop-blur-xl border-b border-border">
                <div className="flex h-[72px] items-center justify-between w-full px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-cloud flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer">
                            <Cloud size={22} className="text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-lg font-bold text-foreground">
                                DriveUnity
                            </h1>
                            <p className="text-xs text-muted-foreground">
                                Unified Cloud Storage
                            </p>
                        </div>
                    </div>

                    {/* Center - Connection Status */}
                    <div className="hidden md:flex items-center gap-3">
                        {isConnected ? (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Badge
                                        className="cursor-pointer hover:scale-105 transition-all px-4 py-2 text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                                        onClick={() => router.push('/connections')}
                                    >
                                        <PlugZap className="mr-2" size={14} />
                                        {accountsCount} Drive{accountsCount > 1 ? 's' : ''} Connected
                                    </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Manage your connected drives
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Badge
                                        className="cursor-pointer animate-pulse px-4 py-2 text-sm font-medium bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20"
                                        onClick={() => router.push('/connections')}
                                    >
                                        <AlertCircle className="mr-2" size={14} />
                                        Not Connected
                                    </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Connect your first drive to get started
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>

                    {/* Right - Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Theme Toggle */}
                        {mounted && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={toggleTheme}
                                        className="h-9 w-9 rounded-lg hover:bg-accent"
                                    >
                                        {theme === 'dark' ? (
                                            <Sun size={18} className="text-muted-foreground" />
                                        ) : (
                                            <Moon size={18} className="text-muted-foreground" />
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                                </TooltipContent>
                            </Tooltip>
                        )}

                        {/* User Menu - Desktop */}
                        <div className="hidden sm:block">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-accent transition-colors">
                                        <Avatar className="h-9 w-9 border-2 border-border">
                                            <AvatarImage src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt={user?.name || 'User'} />
                                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                                {user?.name?.charAt(0) || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="hidden lg:block text-left">
                                            <p className="text-sm font-medium text-foreground">
                                                {user?.name || 'User'}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                                                {user?.email}
                                            </p>
                                        </div>
                                        <ChevronDown size={16} className="text-muted-foreground" />
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-[280px]" align="end">
                                    <DropdownMenuLabel className="pb-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt={user?.name || 'User'} />
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {user?.name?.charAt(0) || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">{user?.name}</p>
                                                <p className="text-xs text-muted-foreground">{user?.email}</p>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem onClick={() => handleNavigation('/settings')} className="py-3">
                                        <User className="mr-3" size={16} />
                                        <div>
                                            <p className="text-sm font-medium">Profile</p>
                                            <p className="text-xs text-muted-foreground">View and edit your profile</p>
                                        </div>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={() => handleNavigation('/settings')} className="py-3">
                                        <Settings className="mr-3" size={16} />
                                        <div>
                                            <p className="text-sm font-medium">Settings</p>
                                            <p className="text-xs text-muted-foreground">Manage preferences</p>
                                        </div>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem onClick={() => router.push('/connections')} className="py-3">
                                        <Cloud className="mr-3" size={16} />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Connections</p>
                                            <p className="text-xs text-muted-foreground">Manage your drives</p>
                                        </div>
                                        <Badge variant={isConnected ? 'default' : 'secondary'} className="ml-2 text-xs">
                                            {isConnected ? `${accountsCount} Active` : 'Setup'}
                                        </Badge>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem onClick={handleLogout} className="py-3 text-destructive focus:text-destructive">
                                        <LogOut className="mr-3" size={16} />
                                        <span className="text-sm font-medium">Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="sm:hidden h-9 w-9"
                            onClick={() => setOpened(!opened)}
                        >
                            <MenuIcon size={20} className="text-muted-foreground" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Sheet */}
                <Sheet open={opened} onOpenChange={setOpened}>
                    <SheetContent side="right" className="w-full max-w-sm p-0">
                        <SheetHeader className="p-6 bg-gradient-cloud text-white">
                            <SheetTitle className="flex items-center gap-3 text-white">
                                <Avatar className="h-12 w-12 border-2 border-white/30">
                                    <AvatarImage src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt={user?.name || 'User'} />
                                    <AvatarFallback className="bg-white/20 text-white">
                                        {user?.name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-base font-semibold">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-sm text-white/80">
                                        {user?.email}
                                    </p>
                                </div>
                            </SheetTitle>
                        </SheetHeader>

                        <div className="p-6 space-y-4">
                            {/* Connection Status Card */}
                            <div
                                onClick={() => {
                                    router.push('/connections');
                                    setOpened(false);
                                }}
                                className={`
                                    p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.02]
                                    ${isConnected
                                        ? 'bg-primary/10 border border-primary/20'
                                        : 'bg-warning/10 border border-warning/20'
                                    }
                                `}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <PlugZap size={18} className={isConnected ? 'text-primary' : 'text-warning'} />
                                        <span className="text-sm font-semibold text-foreground">Connections</span>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                        {isConnected ? accountsCount : '0'}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {isConnected
                                        ? `${accountsCount} drive${accountsCount > 1 ? 's' : ''} connected`
                                        : 'Connect your first drive'}
                                </p>
                            </div>

                            {/* Navigation Links */}
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleNavigation('/settings')}
                                    className="w-full p-4 rounded-xl border border-border bg-card hover:bg-accent transition-colors text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <User size={18} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">Profile</p>
                                            <p className="text-xs text-muted-foreground">View and edit profile</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleNavigation('/settings')}
                                    className="w-full p-4 rounded-xl border border-border bg-card hover:bg-accent transition-colors text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                                            <Settings size={18} className="text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">Settings</p>
                                            <p className="text-xs text-muted-foreground">Manage preferences</p>
                                        </div>
                                    </div>
                                </button>

                                {/* Theme Toggle Mobile */}
                                {mounted && (
                                    <button
                                        onClick={toggleTheme}
                                        className="w-full p-4 rounded-xl border border-border bg-card hover:bg-accent transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                                {theme === 'dark' ? (
                                                    <Sun size={18} className="text-warning" />
                                                ) : (
                                                    <Moon size={18} className="text-muted-foreground" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Switch appearance
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                )}
                            </div>

                            {/* Logout */}
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setOpened(false);
                                }}
                                className="w-full p-4 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <LogOut size={18} />
                                    <span className="text-sm font-semibold">Logout</span>
                                </div>
                            </button>
                        </div>
                    </SheetContent>
                </Sheet>
            </header>
        </TooltipProvider>
    );
}
