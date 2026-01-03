"use client";

import React, { useState } from "react";
import { AlertCircle, MoreVertical, Trash2, RefreshCw, Calendar, Clock, Mail, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import {
    useConnectedDrives,
    useDeleteDrive,
} from "@/app/(private)/connections/hooks/useConnectedDrives";
import { Card } from "@/app/components/ui/card";
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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Avatar } from "@/app/components/ui/avatar";
import {  Tooltip, TooltipContent, TooltipTrigger } from "@/app/components/ui/tooltip";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

interface ConnectedDrivesListProps {
    onSync?: (driveId: string) => void;
    syncingDriveId?: string | null;
}

const PRIMARY_COLOR = '#6B9ADF';

export function ConnectedDrivesList({
    onSync,
    syncingDriveId = null,
}: ConnectedDrivesListProps) {
    const { data, isLoading, error } = useConnectedDrives();
    const { deleteDrive, isDeleting } = useDeleteDrive();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDrive, setSelectedDrive] = useState<{
        id: string;
        email: string;
    } | null>(null);
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    const handleSync = (driveId: string) => {
        if (onSync) {
            onSync(driveId);
        }
    };

    const openDeleteModal = (driveId: string, email: string) => {
        setSelectedDrive({ id: driveId, email });
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (selectedDrive) {
            deleteDrive({ driveId: selectedDrive.id });
            setDeleteModalOpen(false);
            setSelectedDrive(null);
        }
    };

    const formatDate = (date: string | Date | null) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-8">
                <div className="relative w-30 h-30">
                    <div className="absolute inset-0 rounded-full opacity-100 animate-pulse" style={{ background: 'rgba(107, 154, 223, 0.2)' }} />
                    <div className="absolute inset-2.5 rounded-full bg-white flex items-center justify-center">
                        <Loader2 className="w-12 h-12 animate-spin" style={{ color: PRIMARY_COLOR }} />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <h3 className="font-bold text-lg">Loading Your Connected Drives</h3>
                    <p className="text-sm text-muted-foreground">Please wait while we fetch your drive information...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <Alert className="border-2" style={{ background: 'rgba(107, 154, 223, 0.1)', borderColor: 'rgba(107, 154, 223, 0.3)' }}>
                <AlertCircle className="h-4 w-4" style={{ color: PRIMARY_COLOR }} />
                <AlertDescription>
                    {error instanceof Error
                        ? error.message
                        : "Failed to load connected drives. Please try again later."}
                </AlertDescription>
            </Alert>
        );
    }

    if (!data || data.drives.length === 0) {
        return null;
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <Card className="overflow-hidden border" style={{ borderColor: 'rgba(107, 154, 223, 0.3)' }}>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader style={{ background: PRIMARY_COLOR }}>
                                <TableRow>
                                    <TableHead className="text-white font-bold text-xs uppercase tracking-wide">
                                        <div className="flex gap-2 items-center">
                                            <Mail className="w-4 h-4" />
                                            <span>Drive Account</span>
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-white font-bold text-xs uppercase tracking-wide">
                                        <div className="flex gap-2 items-center">
                                            <Calendar className="w-4 h-4" />
                                            <span>Connected On</span>
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-white font-bold text-xs uppercase tracking-wide">
                                        <div className="flex gap-2 items-center">
                                            <Clock className="w-4 h-4" />
                                            <span>Last Updated</span>
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-white font-bold text-xs uppercase tracking-wide text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {data.drives.map((drive) => (
                                    <TableRow
                                        key={drive.id}
                                        onMouseEnter={() => setHoveredRow(drive.id)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                        className="transition-all"
                                        style={{
                                            background: hoveredRow === drive.id ? 'rgba(107, 154, 223, 0.1)' : 'white',
                                            borderLeft: hoveredRow === drive.id ? `4px solid ${PRIMARY_COLOR}` : '4px solid transparent',
                                            transform: hoveredRow === drive.id ? 'translateX(2px)' : 'translateX(0)',
                                        }}
                                    >
                                        <TableCell>
                                            <div className="flex gap-3 items-center">
                                                <Avatar className="w-11 h-11 rounded-md" style={{ background: PRIMARY_COLOR }}>
                                                    <FcGoogle size={24} />
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-sm">{drive.gmailAccount}</p>
                                                    <p className="text-xs text-muted-foreground">Google Drive</p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex gap-2 items-center">
                                                <div className="w-2 h-2 rounded-full" style={{ background: PRIMARY_COLOR }} />
                                                <span className="text-sm font-medium">{formatDate(drive.createdAt)}</span>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex gap-2 items-center">
                                                <div className="w-2 h-2 rounded-full" style={{ background: PRIMARY_COLOR }} />
                                                <span className="text-sm font-medium">{formatDate(drive.updatedAt)}</span>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex justify-end gap-2">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="default"
                                                            size="icon"
                                                            onClick={() => handleSync(drive.id)}
                                                            disabled={syncingDriveId !== null || isDeleting}
                                                            style={{ background: PRIMARY_COLOR }}
                                                        >
                                                            {syncingDriveId === drive.id ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <RefreshCw className="h-4 w-4" />
                                                            )}
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Sync drive</TooltipContent>
                                                </Tooltip>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    disabled={isDeleting}
                                                                    className={`transition-transform ${hoveredRow === drive.id ? 'rotate-90' : 'rotate-0'}`}
                                                                >
                                                                    <MoreVertical className="h-4 w-4" />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>More options</TooltipContent>
                                                        </Tooltip>
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent align="end" className="w-56">
                                                        <DropdownMenuLabel>Manage Drive</DropdownMenuLabel>
                                                        <DropdownMenuItem
                                                            onClick={() => openDeleteModal(drive.id, drive.gmailAccount)}
                                                            className="text-destructive focus:text-destructive"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Disconnect Drive
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="p-4 border-t" style={{ background: 'rgba(107, 154, 223, 0.1)', borderColor: 'rgba(107, 154, 223, 0.3)' }}>
                        <p className="text-sm text-muted-foreground">
                            Showing {data.drives.length} {data.drives.length === 1 ? "drive" : "drives"}
                        </p>
                    </div>
                </Card>
            </div>

            <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="flex gap-3 items-center">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                                style={{ background: 'rgba(107, 154, 223, 0.2)' }}
                            >
                                <Trash2 className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />
                            </div>
                            Disconnect Google Drive
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 mt-4">
                        <div className="p-6 rounded-md border-2" style={{ background: 'rgba(107, 154, 223, 0.1)', borderColor: 'rgba(107, 154, 223, 0.3)' }}>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2 items-center">
                                    <AlertCircle className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                                    <span className="font-bold text-sm" style={{ color: PRIMARY_COLOR }}>
                                        WARNING: This action cannot be undone
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Are you sure you want to disconnect{" "}
                                    <span className="font-bold" style={{ color: PRIMARY_COLOR }}>
                                        {selectedDrive?.email}
                                    </span>
                                    ? All associated files and folders will be permanently removed from your dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" size="lg" onClick={() => setDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            size="lg"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            style={{ background: PRIMARY_COLOR }}
                        >
                            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Trash2 className="mr-2 h-5 w-5" />
                            Disconnect Drive
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
