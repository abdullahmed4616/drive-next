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
    Sparkles,
    Bell,
    Menu as MenuIcon,
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/app/components/ui/use-toast';
import { useSession } from '@/app/providers/SessionProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
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
    SheetTrigger,
} from '@/app/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';

export default function PrivateNavbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [opened, setOpened] = useState(false);
    const { toast } = useToast();

    const { user, logout } = useSession();

    const [isConnected, setIsConnected] = useState(false);
    const [accountsCount, setAccountsCount] = useState(0);
    const [checkingConnection, setCheckingConnection] = useState(true);

    useEffect(() => {
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

    const PRIMARY_COLOR = '#6B9ADF';

    if (checkingConnection) {
        return (
            <div
                className="w-full backdrop-blur-md border-b"
                style={{
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(12px)',
                    borderColor: 'rgba(107, 154, 223, 0.15)',
                    boxShadow: '0 2px 12px rgba(107, 154, 223, 0.08)',
                }}
            >
                <div className="flex h-[70px] items-center justify-between w-full px-6">
                    <div className="flex items-center gap-3">
                        <div
                            className="p-2 rounded-xl backdrop-blur-sm"
                            style={{
                                background: `linear-gradient(135deg, ${PRIMARY_COLOR}20, ${PRIMARY_COLOR}10)`,
                                border: `1px solid ${PRIMARY_COLOR}30`,
                            }}
                        >
                            <Cloud size={28} color={PRIMARY_COLOR} />
                        </div>
                        <span className="text-xl font-extrabold" style={{ letterSpacing: '0.5px', color: PRIMARY_COLOR }}>
                            DriveUnity
                        </span>
                    </div>
                    <Avatar>
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        );
    }

    return (
        <TooltipProvider>
            <div
                className="relative w-full backdrop-blur-md border-b"
                style={{
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(12px)',
                    borderColor: 'rgba(107, 154, 223, 0.15)',
                    boxShadow: '0 2px 12px rgba(107, 154, 223, 0.08)',
                }}
            >
                <div className="flex h-[70px] items-center justify-between w-full px-6">
                    <div className="flex items-center gap-3">
                        <div
                            className="p-2 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                            style={{
                                background: `linear-gradient(135deg, ${PRIMARY_COLOR}20, ${PRIMARY_COLOR}10)`,
                                border: `1px solid ${PRIMARY_COLOR}30`,
                                boxShadow: `0 2px 8px ${PRIMARY_COLOR}15`,
                            }}
                        >
                            <Cloud size={28} color={PRIMARY_COLOR} />
                        </div>
                        <div>
                            <h1
                                className="text-xl font-extrabold"
                                style={{
                                    letterSpacing: '0.5px',
                                    color: PRIMARY_COLOR,
                                }}
                            >
                                DriveUnity
                            </h1>
                            <p className="text-xs font-medium" style={{ color: `${PRIMARY_COLOR}CC` }}>
                                Unified Cloud Storage
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:flex gap-4">
                        {isConnected ? (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Badge
                                        className="cursor-pointer hover:scale-105 transition-all px-4 py-2 text-sm font-semibold backdrop-blur-sm"
                                        style={{
                                            background: `linear-gradient(135deg, ${PRIMARY_COLOR}20, ${PRIMARY_COLOR}10)`,
                                            border: `1px solid ${PRIMARY_COLOR}30`,
                                            color: PRIMARY_COLOR,
                                            boxShadow: `0 2px 8px ${PRIMARY_COLOR}15`,
                                        }}
                                        onClick={() => router.push('/connections')}
                                    >
                                        <PlugZap className="mr-1.5" size={16} />
                                        {accountsCount} Connected
                                    </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {`${accountsCount} drive${accountsCount > 1 ? 's' : ''} connected`}
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Badge
                                        className="cursor-pointer animate-pulse px-4 py-2 text-base"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.95)',
                                            color: '#fa5252',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                        }}
                                        onClick={() => router.push('/connections')}
                                    >
                                        <AlertCircle className="mr-1" size={14} />
                                        Not Connected
                                    </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Connect your first drive
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>

                    <div className="hidden sm:flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="hover:scale-105 transition-all flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                    }}
                                >
                                    <Avatar className="border-2 border-white shadow-md">
                                        <AvatarImage src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt={user?.name || 'User'} />
                                        <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <div className="hidden sm:block text-left">
                                        <p className="text-sm font-semibold text-black">
                                            {user?.name || 'User'}
                                        </p>
                                        <p className="text-xs text-black">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <ChevronDown size={16} color="black" />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-[280px]" align="end">
                                <DropdownMenuLabel>
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={16} />
                                        <span>Account</span>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
                                    <User className="mr-2" size={18} />
                                    <div>
                                        <p className="text-sm font-medium">Profile</p>
                                        <p className="text-xs text-muted-foreground">View and edit your profile</p>
                                    </div>
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
                                    <Settings className="mr-2" size={18} />
                                    <div>
                                        <p className="text-sm font-medium">Settings</p>
                                        <p className="text-xs text-muted-foreground">Manage preferences</p>
                                    </div>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuLabel>
                                    <div className="flex items-center gap-2">
                                        <Cloud size={16} />
                                        <span>Storage</span>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuItem onClick={() => router.push('/connections')}>
                                    <PlugZap className="mr-2" size={18} />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Connections</p>
                                        <p className="text-xs text-muted-foreground">Manage your drives</p>
                                    </div>
                                    <Badge variant={isConnected ? 'default' : 'secondary'} className="ml-2">
                                        {isConnected ? `${accountsCount} Active` : 'Setup'}
                                    </Badge>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                    <LogOut className="mr-2" size={18} />
                                    <span className="text-sm font-medium">Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="sm:hidden"
                        onClick={() => setOpened(!opened)}
                    >
                        <MenuIcon size={20} color={PRIMARY_COLOR} />
                    </Button>
                </div>

                <Sheet open={opened} onOpenChange={setOpened}>
                    <SheetContent side="right" className="sm:hidden">
                        <SheetHeader
                            className="p-4 rounded-t-lg"
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            }}
                        >
                            <SheetTitle className="flex items-center gap-2 text-white">
                                <Avatar className="border-2 border-[#667eea]">
                                    <AvatarImage src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt={user?.name || 'User'} />
                                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-semibold">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-200">
                                        {user?.email}
                                    </p>
                                </div>
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 mt-6">
                            <div
                                onClick={() => {
                                    router.push('/connections');
                                    setOpened(false);
                                }}
                                className="p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform"
                                style={{
                                    background: isConnected
                                        ? 'linear-gradient(135deg, #51cf66 0%, #37b24d 100%)'
                                        : 'linear-gradient(135deg, #ffd43b 0%, #fd7e14 100%)',
                                }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <PlugZap size={20} color="white" />
                                        <span className="text-sm font-semibold text-white">Connections</span>
                                    </div>
                                    <Badge variant="secondary">
                                        {isConnected ? accountsCount : '0'}
                                    </Badge>
                                </div>
                                <p className="text-xs text-white/90">
                                    {isConnected
                                        ? `${accountsCount} drive${accountsCount > 1 ? 's' : ''} connected`
                                        : 'Connect your first drive'}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => handleNavigation('/settings')}
                                    className="p-3.5 rounded-xl border-2 border-gray-200 transition-all hover:bg-gray-50 hover:border-blue-300"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="p-2 rounded-lg flex items-center justify-center"
                                            style={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            }}
                                        >
                                            <User size={18} color="white" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="text-sm font-medium">Profile</p>
                                            <p className="text-xs text-muted-foreground">View and edit profile</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleNavigation('/settings')}
                                    className="p-3.5 rounded-xl border-2 border-gray-200 transition-all hover:bg-gray-50 hover:border-blue-300"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="p-2 rounded-lg flex items-center justify-center"
                                            style={{
                                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                            }}
                                        >
                                            <Settings size={18} color="white" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="text-sm font-medium">Settings</p>
                                            <p className="text-xs text-muted-foreground">Manage preferences</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setOpened(false);
                                    }}
                                    className="p-3.5 rounded-xl text-white mt-4 hover:scale-105 transition-transform"
                                    style={{
                                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <LogOut size={18} />
                                        <span className="text-sm font-semibold">Logout</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                <style jsx global>{`
                    @keyframes pulse {
                        0%, 100% {
                            opacity: 1;
                        }
                        50% {
                            opacity: 0.7;
                        }
                    }
                `}</style>
            </div>
        </TooltipProvider>
    );
}