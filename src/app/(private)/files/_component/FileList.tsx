'use client';

import { File as FileIcon, ExternalLink, FileText, Image as ImageIcon, Video, Music } from 'lucide-react';
import { FileData } from '@/app/(private)/files/types/File.types';
import { formatDate, formatFileSize, getMimeTypeColor, getMimeTypeLabel } from '../utils/helper';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Card, CardContent } from '@/app/components/ui/card';

interface FileListProps {
    files: FileData[];
}

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(107, 154, 223, 0.1)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.2)';

const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('image')) return <ImageIcon size={18} />;
    if (mimeType.includes('video')) return <Video size={18} />;
    if (mimeType.includes('audio')) return <Music size={18} />;
    if (mimeType.includes('pdf') || mimeType.includes('document')) return <FileText size={18} />;
    return <FileIcon size={18} />;
};

export const FileList: React.FC<FileListProps> = ({ files }) => {
    const handleRowClick = (file: FileData) => {
        if (file.webViewLink) {
            window.open(file.webViewLink, '_blank', 'noopener,noreferrer');
        }
    };

    if (files.length === 0) {
        return (
            <Card
                className="border-2"
                style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderColor: BORDER_COLOR,
                }}
            >
                <CardContent className="p-12 text-center">
                    <p className="text-lg text-muted-foreground font-medium">
                        No files found
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <TooltipProvider>
            <Card
                className="shadow-xl border-2 overflow-hidden"
                style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderColor: BORDER_COLOR,
                }}
            >
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow
                                className="border-none hover:bg-transparent"
                                style={{
                                    background: PRIMARY_COLOR,
                                }}
                            >
                                <TableHead className="text-white font-bold text-sm">File Name</TableHead>
                                <TableHead className="text-white font-bold text-sm">Type</TableHead>
                                <TableHead className="text-white font-bold text-sm">Size</TableHead>
                                <TableHead className="text-white font-bold text-sm">Created</TableHead>
                                <TableHead className="text-white font-bold text-sm">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {files.map((file) => (
                                <TableRow
                                    key={file.id}
                                    className="cursor-pointer transition-all hover:scale-[1.01] hover:shadow-md"
                                    style={{
                                        borderBottom: `1px solid ${BORDER_COLOR}`,
                                    }}
                                    onClick={() => handleRowClick(file)}
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                className="border-2"
                                                style={{ borderColor: BORDER_COLOR }}
                                            >
                                                {file.thumbnailLink ? (
                                                    <AvatarImage src={file.thumbnailLink} alt={file.fileName} />
                                                ) : (
                                                    <AvatarFallback style={{ background: PRIMARY_COLOR }}>
                                                        {getFileIcon(file.mimeType)}
                                                    </AvatarFallback>
                                                )}
                                            </Avatar>
                                            <p className="text-sm font-semibold line-clamp-1 max-w-[300px]">
                                                {file.fileName}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className="font-semibold px-3 py-1"
                                            style={{
                                                background: getMimeTypeColor(file.mimeType),
                                            }}
                                        >
                                            {getMimeTypeLabel(file.mimeType)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className="font-semibold"
                                            style={{
                                                color: PRIMARY_COLOR,
                                            }}
                                        >
                                            {formatFileSize(file.fileSize)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-muted-foreground font-medium">
                                            {formatDate(file.fileCreatedTime)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {file.webViewLink && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="icon"
                                                        className="rounded-lg"
                                                        style={{
                                                            background: PRIMARY_COLOR,
                                                            boxShadow: `0 4px 12px ${ACCENT_BG_COLOR}`,
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.open(file.webViewLink, '_blank', 'noopener,noreferrer');
                                                        }}
                                                    >
                                                        <ExternalLink size={18} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    Open in Drive
                                                </TooltipContent>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </TooltipProvider>
    );
};
