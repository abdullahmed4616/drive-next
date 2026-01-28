'use client';

import React, { useState } from 'react';
import {
  Settings,
  Globe,
  Clock,
  Calendar,
  Moon,
  Sun,
  Monitor,
  HardDrive,
  Save,
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

const PRIMARY_COLOR = '#6B9ADF';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

const languages = [
  { value: 'en', label: 'English (US)' },
  { value: 'en-gb', label: 'English (UK)' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh', label: 'Chinese (Simplified)' },
];

const timezones = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
];

const dateFormats = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (12/31/2024)' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (31/12/2024)' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2024-12-31)' },
  { value: 'DD MMM YYYY', label: 'DD MMM YYYY (31 Dec 2024)' },
];

const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

const mockDrives = [
  { id: '1', name: 'Personal Drive', email: 'user@gmail.com' },
  { id: '2', name: 'Work Drive', email: 'user@company.com' },
  { id: '3', name: 'Backup Drive', email: 'backup@gmail.com' },
];

export default function GeneralSettingsPage() {
  const [settings, setSettings] = useState({
    language: 'en',
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    theme: 'system',
    defaultDrive: '1',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Language & Region */}
      <Card style={{ border: `1px solid ${BORDER_COLOR}` }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe size={20} style={{ color: PRIMARY_COLOR }} />
            Language & Region
          </CardTitle>
          <CardDescription>
            Set your preferred language and regional settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language" className="flex items-center gap-2">
                <Globe size={16} />
                Language
              </Label>
              <Select
                value={settings.language}
                onValueChange={(value) =>
                  setSettings({ ...settings, language: value })
                }
              >
                <SelectTrigger style={{ borderColor: BORDER_COLOR }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone" className="flex items-center gap-2">
                <Clock size={16} />
                Timezone
              </Label>
              <Select
                value={settings.timezone}
                onValueChange={(value) =>
                  setSettings({ ...settings, timezone: value })
                }
              >
                <SelectTrigger style={{ borderColor: BORDER_COLOR }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFormat" className="flex items-center gap-2">
                <Calendar size={16} />
                Date Format
              </Label>
              <Select
                value={settings.dateFormat}
                onValueChange={(value) =>
                  setSettings({ ...settings, dateFormat: value })
                }
              >
                <SelectTrigger style={{ borderColor: BORDER_COLOR }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dateFormats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card style={{ border: `1px solid ${BORDER_COLOR}` }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun size={20} style={{ color: PRIMARY_COLOR }} />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize the look and feel of the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label className="mb-4 block">Theme</Label>
          <div className="grid grid-cols-3 gap-4">
            {themes.map((theme) => {
              const Icon = theme.icon;
              const isSelected = settings.theme === theme.value;
              return (
                <button
                  key={theme.value}
                  onClick={() => setSettings({ ...settings, theme: theme.value })}
                  className="p-4 rounded-xl text-left transition-all"
                  style={{
                    background: isSelected ? `${PRIMARY_COLOR}15` : 'transparent',
                    border: isSelected
                      ? `2px solid ${PRIMARY_COLOR}`
                      : `1px solid ${BORDER_COLOR}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: isSelected ? PRIMARY_COLOR : `${PRIMARY_COLOR}15`,
                      }}
                    >
                      <Icon
                        size={20}
                        style={{ color: isSelected ? 'white' : PRIMARY_COLOR }}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{theme.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {theme.value === 'system'
                          ? 'Match system settings'
                          : `Always use ${theme.value} mode`}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Default Drive */}
      <Card style={{ border: `1px solid ${BORDER_COLOR}` }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive size={20} style={{ color: PRIMARY_COLOR }} />
            Default Drive
          </CardTitle>
          <CardDescription>
            Select which drive to show by default when you open the app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="defaultDrive">Default Drive</Label>
            <Select
              value={settings.defaultDrive}
              onValueChange={(value) =>
                setSettings({ ...settings, defaultDrive: value })
              }
            >
              <SelectTrigger style={{ borderColor: BORDER_COLOR }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Drives</SelectItem>
                {mockDrives.map((drive) => (
                  <SelectItem key={drive.id} value={drive.id}>
                    <div className="flex flex-col">
                      <span>{drive.name}</span>
                      <span className="text-xs text-muted-foreground">{drive.email}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          style={{ background: PRIMARY_COLOR }}
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
