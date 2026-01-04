'use client';

import { File as FileIcon, ExternalLink, Sparkles } from 'lucide-react';
import { FileCardProps } from '@/app/(private)/files/types/File.types';
import { formatDate, formatFileSize, getMimeTypeColor, getMimeTypeLabel } from '@/app/(private)/files/utils/helper';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import Image from 'next/image';

export const FileCard: React.FC<FileCardProps> = ({ file, onClick }) => {
  const handleCardClick = () => {
    if (file.webViewLink) {
      window.open(file.webViewLink, '_blank', 'noopener,noreferrer');
    } else if (onClick) {
      onClick();
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (file.webViewLink) {
      window.open(file.webViewLink, '_blank', 'noopener,noreferrer');
    }
  };

  const PRIMARY_COLOR = '#6B9ADF';

  const getCardGradient = (fileName: string) => {
    const gradients = [
      `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #5A89CF 100%)`,
      `linear-gradient(135deg, #7CAAEF 0%, ${PRIMARY_COLOR} 100%)`,
      `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #4A78BF 100%)`,
      `linear-gradient(135deg, #8BB5F0 0%, #5A89CF 100%)`,
    ];

    const hash = fileName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  };

  return (
    <TooltipProvider>
      <Card
        className="cursor-pointer transition-all duration-300 h-full overflow-hidden backdrop-blur-md hover:-translate-y-2"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          border: `1px solid rgba(107, 154, 223, 0.2)`,
          boxShadow: '0 2px 12px rgba(107, 154, 223, 0.1)',
        }}
        onClick={handleCardClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${PRIMARY_COLOR}60`;
          e.currentTarget.style.boxShadow = `0 12px 32px rgba(107, 154, 223, 0.2)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(107, 154, 223, 0.2)';
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(107, 154, 223, 0.1)';
        }}
      >
        <div className="relative overflow-hidden">
          {file.thumbnailLink ? (
            <>
              <div className="relative w-full h-[200px]">
                <Image
                  src={file.thumbnailLink}
                  alt={file.fileName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)',
                }}
              />
            </>
          ) : (
            <div
              className="h-[200px] flex items-center justify-center relative overflow-hidden"
              style={{
                background: getCardGradient(file.fileName),
              }}
            >
              <div
                className="absolute w-[150px] h-[150px] rounded-full -top-[50px] -right-[50px]"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                }}
              />
              <div
                className="absolute w-[100px] h-[100px] rounded-full -bottom-[30px] -left-[30px]"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                }}
              />
              <FileIcon size={64} strokeWidth={1.5} color="white" className="z-10" />
            </div>
          )}

          <div className="absolute top-3 right-3 z-20">
            <Badge
              className="text-white font-bold px-3 py-2 shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                color: getMimeTypeColor(file.mimeType),
                backdropFilter: 'blur(10px)',
              }}
            >
              {getMimeTypeLabel(file.mimeType)}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <p
                  className="font-semibold text-sm line-clamp-2 min-h-[2.5em]"
                  style={{ color: '#1a1a1a' }}
                >
                  {file.fileName}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                {file.fileName}
              </TooltipContent>
            </Tooltip>

            <div className="flex justify-between items-center gap-2">
              <Badge
                variant="secondary"
                className="font-semibold"
                style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  color: '#667eea',
                }}
              >
                <Sparkles className="mr-1" size={12} />
                {formatFileSize(file.fileSize)}
              </Badge>
              <span className="text-xs text-muted-foreground font-medium">
                {formatDate(file.fileCreatedTime)}
              </span>
            </div>

            <div className="flex justify-end mt-2">
              {file.webViewLink && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      className="rounded-lg shadow-md"
                      style={{
                        background: 'linear-gradient(45deg, indigo, cyan)',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                      }}
                      onClick={handleDownload}
                    >
                      <ExternalLink size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Open in Drive
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
