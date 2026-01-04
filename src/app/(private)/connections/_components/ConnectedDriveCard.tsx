"use client";

import React, { useState } from "react";
import { Cloud, MoreVertical, Trash2, RefreshCw, ShieldCheck } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { ConnectedDrive } from "@/app/(private)/connections/hooks/useConnectedDrives";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";

interface ConnectedDriveCardProps {
    drive: ConnectedDrive;
    onDelete: (driveId: string) => void;
    onSync: (driveId: string) => void;
    isLoading?: boolean;
    isSyncing?: boolean;
    viewMode?: "grid" | "list";
}

const PRIMARY_COLOR = '#6B9ADF';
const GOOGLE_BLUE = '#4285F4';

export function ConnectedDriveCard({
    drive,
    onDelete,
    onSync,
    isLoading = false,
    isSyncing = false,
    viewMode = "grid",
}: ConnectedDriveCardProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        onDelete(drive.id);
        setDeleteModalOpen(false);
    };

    const handleSync = () => {
        onSync(drive.id);
    };

    if (viewMode === "grid") {
        return (
            <>
                <Card
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`overflow-hidden transition-all duration-300 border-2 ${
                        isHovered ? "-translate-y-1 shadow-lg" : ""
                    }`}
                    style={{
                        borderColor: 'rgba(107, 154, 223, 0.3)',
                        borderRadius: '1.5rem',
                    }}
                >
                    <div
                        className="p-5 relative overflow-hidden"
                        style={{ background: PRIMARY_COLOR }}
                    >
                        <div className={`absolute -top-12 -right-12 w-36 h-36 rounded-full bg-white/10 transition-transform duration-300 ${isHovered ? 'scale-120' : 'scale-100'}`} />
                        <div className={`absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/10 transition-transform duration-300 ${isHovered ? 'scale-120' : 'scale-100'}`} />

                        <div className="flex justify-between items-start relative">
                            <div className="flex gap-3">
                                <div className="w-14 h-14 rounded-2xl bg-white/95 flex items-center justify-center shadow-lg">
                                    <FcGoogle size={32} />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-white font-bold text-lg drop-shadow">
                                        Google Drive
                                    </span>
                                    <div className="flex gap-1 items-center">
                                        <Cloud className="w-3.5 h-3.5 text-white" />
                                        <span className="text-white/90 text-xs">Connected</span>
                                    </div>
                                </div>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                                    >
                                        <MoreVertical className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem
                                        onClick={handleDeleteClick}
                                        disabled={isLoading}
                                        className="text-destructive focus:text-destructive"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Disconnect Drive
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <CardContent className="p-6 space-y-4">
                        <div>
                            <div className="flex gap-2 items-center mb-2">
                                <ShieldCheck className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                    Connected Account
                                </span>
                            </div>
                            <p className="font-semibold text-sm truncate" title={drive.gmailAccount}>
                                {drive.gmailAccount}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Connected on {formatDate(drive.createdAt)}
                            </p>
                        </div>

                        <Button
                            className="w-full"
                            onClick={handleSync}
                            disabled={isLoading || isSyncing}
                            style={{ background: PRIMARY_COLOR }}
                        >
                            {isSyncing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Syncing...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Sync Drive Now
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex gap-3 items-center">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{ background: 'rgba(107, 154, 223, 0.2)' }}
                                >
                                    <Trash2 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                                </div>
                                Disconnect Drive
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <div
                                className="p-4 rounded-xl border"
                                style={{
                                    background: 'rgba(107, 154, 223, 0.1)',
                                    borderColor: 'rgba(107, 154, 223, 0.3)',
                                }}
                            >
                                <p className="text-sm">
                                    Are you sure you want to disconnect{" "}
                                    <span className="font-bold" style={{ color: PRIMARY_COLOR }}>
                                        {drive.gmailAccount}
                                    </span>
                                    ?
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    This will permanently remove all associated files and folders from your dashboard.
                                </p>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirmDelete}
                                disabled={isLoading}
                                style={{ background: PRIMARY_COLOR }}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Disconnect
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    // List view
    return (
        <>
            <Card
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`overflow-hidden transition-all duration-300 ${
                    isHovered ? 'translate-x-1' : ''
                }`}
                style={{ borderLeft: `4px solid ${PRIMARY_COLOR}` }}
            >
                <div className="p-4 flex justify-between items-center">
                    <div className="flex gap-4 flex-1 min-w-0">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                            style={{ background: PRIMARY_COLOR }}
                        >
                            <div className="w-13 h-13 rounded-xl bg-white flex items-center justify-center">
                                <FcGoogle size={32} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <span className="font-bold text-sm">Google Drive</span>
                            <span className="font-semibold text-sm text-muted-foreground truncate" title={drive.gmailAccount}>
                                {drive.gmailAccount}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Connected {formatDate(drive.createdAt)}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={handleSync}
                            disabled={isLoading || isSyncing}
                            style={{ background: PRIMARY_COLOR }}
                        >
                            {isSyncing ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <RefreshCw className="mr-2 h-4 w-4" />
                            )}
                            Sync
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MoreVertical className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem
                                    onClick={handleDeleteClick}
                                    disabled={isLoading}
                                    className="text-destructive focus:text-destructive"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Disconnect Drive
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </Card>

            <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex gap-3 items-center">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(107, 154, 223, 0.2)' }}
                            >
                                <Trash2 className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                            </div>
                            Disconnect Drive
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <div
                            className="p-4 rounded-xl border"
                            style={{
                                background: 'rgba(107, 154, 223, 0.1)',
                                borderColor: 'rgba(107, 154, 223, 0.3)',
                            }}
                        >
                            <p className="text-sm">
                                Are you sure you want to disconnect{" "}
                                <span className="font-bold" style={{ color: PRIMARY_COLOR }}>
                                    {drive.gmailAccount}
                                </span>
                                ?
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                This will permanently remove all associated files and folders from your dashboard.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            disabled={isLoading}
                            style={{ background: PRIMARY_COLOR }}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Disconnect
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
