'use client';

import React, { useState } from 'react';
import {
  Shield,
  Key,
  Smartphone,
  Monitor,
  Globe,
  Download,
  Trash2,
  LogOut,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/components/ui/alert-dialog';

const PRIMARY_COLOR = '#6B9ADF';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

const activeSessions = [
  {
    id: '1',
    device: 'Chrome on MacOS',
    location: 'San Francisco, CA',
    lastActive: 'Now',
    current: true,
  },
  {
    id: '2',
    device: 'Safari on iPhone',
    location: 'San Francisco, CA',
    lastActive: '2 hours ago',
    current: false,
  },
  {
    id: '3',
    device: 'Firefox on Windows',
    location: 'New York, NY',
    lastActive: '1 day ago',
    current: false,
  },
];

const apiKeys = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'dk_live_••••••••••••1234',
    created: '2024-01-10',
    lastUsed: '2024-01-20',
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'dk_test_••••••••••••5678',
    created: '2024-01-15',
    lastUsed: '2024-01-18',
  },
];

const connectedApps = [
  {
    id: '1',
    name: 'Slack',
    description: 'Workspace notifications',
    connected: '2024-01-05',
    permissions: ['Read files', 'Send notifications'],
  },
  {
    id: '2',
    name: 'Zapier',
    description: 'Automation workflows',
    connected: '2024-01-12',
    permissions: ['Read files', 'Write files'],
  },
];

export default function PrivacySecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showApiKey, setShowApiKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Two-Factor Authentication */}
      <Card style={{ border: `1px solid ${BORDER_COLOR}` }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield size={20} style={{ color: PRIMARY_COLOR }} />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: twoFactorEnabled ? 'rgba(16, 185, 129, 0.15)' : `${PRIMARY_COLOR}15` }}
              >
                <Smartphone
                  size={24}
                  style={{ color: twoFactorEnabled ? '#10B981' : PRIMARY_COLOR }}
                />
              </div>
              <div>
                <p className="font-medium">Authenticator App</p>
                <p className="text-sm text-muted-foreground">
                  {twoFactorEnabled
                    ? 'Two-factor authentication is enabled'
                    : 'Use an authenticator app for additional security'}
                </p>
              </div>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card style={{ border: `1px solid ${BORDER_COLOR}` }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Monitor size={20} style={{ color: PRIMARY_COLOR }} />
                Active Sessions
              </CardTitle>
              <CardDescription>
                Manage your active login sessions across devices
              </CardDescription>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                  <LogOut size={16} className="mr-2" />
                  Sign Out All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sign out all sessions?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will sign you out from all devices except the current one.
                    You will need to sign in again on those devices.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground">
                    Sign Out All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{
                  background: session.current ? `${PRIMARY_COLOR}08` : 'transparent',
                  border: `1px solid ${session.current ? PRIMARY_COLOR : BORDER_COLOR}`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${PRIMARY_COLOR}15` }}
                  >
                    <Monitor size={20} style={{ color: PRIMARY_COLOR }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{session.device}</p>
                      {session.current && (
                        <Badge variant="secondary" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Globe size={12} />
                      {session.location} • {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <Button variant="ghost" size="sm" className="text-destructive">
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card style={{ border: `1px solid ${BORDER_COLOR}` }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Key size={20} style={{ color: PRIMARY_COLOR }} />
                API Keys
              </CardTitle>
              <CardDescription>
                Manage API keys for programmatic access
              </CardDescription>
            </div>
            <Button size="sm" style={{ background: PRIMARY_COLOR }}>
              <Plus size={16} className="mr-2" />
              Create Key
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 font-mono text-sm">
                      {showApiKey === key.id ? key.key : key.key}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() =>
                          setShowApiKey(showApiKey === key.id ? null : key.id)
                        }
                      >
                        {showApiKey === key.id ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleCopyKey(key.key)}
                      >
                        {copiedKey === key.key ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{key.created}</TableCell>
                  <TableCell>{key.lastUsed}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Connected Applications */}
      <Card style={{ border: `1px solid ${BORDER_COLOR}` }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe size={20} style={{ color: PRIMARY_COLOR }} />
            Connected Applications
          </CardTitle>
          <CardDescription>
            Third-party applications with access to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {connectedApps.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ border: `1px solid ${BORDER_COLOR}` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold"
                    style={{ background: `${PRIMARY_COLOR}15`, color: PRIMARY_COLOR }}
                  >
                    {app.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{app.name}</p>
                    <p className="text-sm text-muted-foreground">{app.description}</p>
                    <div className="flex gap-1 mt-1">
                      {app.permissions.map((perm, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-destructive">
                  Disconnect
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card style={{ border: `1px solid ${BORDER_COLOR}` }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download size={20} style={{ color: PRIMARY_COLOR }} />
            Export Your Data
          </CardTitle>
          <CardDescription>
            Download a copy of all your data stored in DriveUnity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium">Request Data Export</p>
              <p className="text-sm text-muted-foreground">
                We'll prepare a downloadable archive of your account data
              </p>
            </div>
            <Button variant="outline" style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}>
              <Download size={16} className="mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
