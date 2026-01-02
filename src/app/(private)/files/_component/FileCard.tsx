import { Card, Image, Text, Badge, Group, Stack, ActionIcon, Tooltip, Box } from '@mantine/core';
import { IconFile, IconExternalLink, IconSparkles } from '@tabler/icons-react';
import { FileCardProps, FileData } from '@/app/(private)/files/types/File.types';
import { formatDate, formatFileSize, getMimeTypeColor, getMimeTypeLabel } from '@/app/(private)/files/utils/helper';

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

  const getCardGradient = (fileName: string) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    ];

    const hash = fileName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  };

  return (
      <Card
          shadow="lg"
          padding="0"
          radius="xl"
          withBorder
          style={{
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            height: '100%',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
          onClick={handleCardClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }}
      >
        <Card.Section style={{ position: 'relative', overflow: 'hidden' }}>
          {file.thumbnailLink ? (
              <>
                <Image
                    src={file.thumbnailLink}
                    height={200}
                    alt={file.fileName}
                    fit="cover"
                    fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%23f8f9fa' width='200' height='200'/%3E%3C/svg%3E"
                />
                <Box
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)',
                      pointerEvents: 'none',
                    }}
                />
              </>
          ) : (
              <Box
                  style={{
                    height: 200,
                    background: getCardGradient(file.fileName),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
              >
                <Box
                    style={{
                      position: 'absolute',
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      top: '-50px',
                      right: '-50px',
                    }}
                />
                <Box
                    style={{
                      position: 'absolute',
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      bottom: '-30px',
                      left: '-30px',
                    }}
                />
                <IconFile size={64} stroke={1.5} color="white" style={{ zIndex: 1 }} />
              </Box>
          )}

          <Box
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                zIndex: 2,
              }}
          >
            <Badge
                size="md"
                radius="lg"
                variant="filled"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: getMimeTypeColor(file.mimeType),
                  backdropFilter: 'blur(10px)',
                  fontWeight: 700,
                  padding: '8px 12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}
            >
              {getMimeTypeLabel(file.mimeType)}
            </Badge>
          </Box>
        </Card.Section>

        <Stack gap="sm" p="md">
          <Tooltip label={file.fileName} position="top" withArrow>
            <Text
                fw={600}
                size="sm"
                lineClamp={2}
                style={{
                  minHeight: '2.5em',
                  color: '#1a1a1a',
                }}
            >
              {file.fileName}
            </Text>
          </Tooltip>

          <Group justify="space-between" gap="xs">
            <Badge
                variant="light"
                size="md"
                radius="lg"
                leftSection={<IconSparkles size={12} />}
                style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  color: '#667eea',
                  fontWeight: 600,
                }}
            >
              {formatFileSize(file.fileSize)}
            </Badge>
            <Text size="xs" c="dimmed" fw={500}>
              {formatDate(file.fileCreatedTime)}
            </Text>
          </Group>

          <Group justify="flex-end" mt="xs">
            {file.webViewLink && (
                <Tooltip label="Open in Drive" withArrow>
                  <ActionIcon
                      variant="gradient"
                      gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                      size="lg"
                      radius="lg"
                      onClick={handleDownload}
                      style={{
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                      }}
                  >
                    <IconExternalLink size={18} />
                  </ActionIcon>
                </Tooltip>
            )}
          </Group>
        </Stack>
      </Card>
  );
};