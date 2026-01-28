'use client';

import React, { useState } from 'react';
import { Bell, Mail, Smartphone, RefreshCw, Shield, TrendingUp, Save } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';

const PRIMARY_COLOR = '#6B9ADF';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  email: boolean;
  push: boolean;
}

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'sync',
      title: 'Drive Sync Alerts',
      description: 'Get notified when your drives sync successfully or encounter issues',
      icon: RefreshCw,
      email: true,
      push: true,
    },
    {
      id: 'security',
      title: 'Security Alerts',
      description: 'Important security notifications about your account',
      icon: Shield,
      email: true,
      push: true,
    },
    {
      id: 'weekly',
      title: 'Weekly Reports',
      description: 'Receive a weekly summary of your storage usage and activity',
      icon: TrendingUp,
      email: true,
      push: false,
    },
    {
      id: 'marketing',
      title: 'Product Updates & News',
      description: 'Learn about new features, tips, and product announcements',
      icon: Bell,
      email: false,
      push: false,
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const toggleSetting = (id: string, type: 'email' | 'push') => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, [type]: !setting[type] } : setting
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <Card style={{ border: `1px solid ${BORDER_COLOR}` }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={20} style={{ color: PRIMARY_COLOR }} />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Header Row */}
          <div className="flex items-center justify-end gap-8 mb-4 pr-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail size={16} />
              Email
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Smartphone size={16} />
              Push
            </div>
          </div>

          <div className="space-y-1">
            {settings.map((setting, index) => {
              const Icon = setting.icon;
              return (
                <React.Fragment key={setting.id}>
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${PRIMARY_COLOR}15` }}
                      >
                        <Icon size={20} style={{ color: PRIMARY_COLOR }} />
                      </div>
                      <div>
                        <Label className="font-medium">{setting.title}</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <Switch
                        checked={setting.email}
                        onCheckedChange={() => toggleSetting(setting.id, 'email')}
                      />
                      <Switch
                        checked={setting.push}
                        onCheckedChange={() => toggleSetting(setting.id, 'push')}
                      />
                    </div>
                  </div>
                  {index < settings.length - 1 && <Separator />}
                </React.Fragment>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Email Preferences */}
      <Card style={{ border: `1px solid ${BORDER_COLOR}` }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail size={20} style={{ color: PRIMARY_COLOR }} />
            Email Digest
          </CardTitle>
          <CardDescription>
            Configure how often you receive email summaries
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EmailFrequencyCard
              title="Instant"
              description="Get notified immediately"
              selected={false}
            />
            <EmailFrequencyCard
              title="Daily Digest"
              description="Once per day summary"
              selected={true}
            />
            <EmailFrequencyCard
              title="Weekly Digest"
              description="Once per week summary"
              selected={false}
            />
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
              Save Preferences
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

interface EmailFrequencyCardProps {
  title: string;
  description: string;
  selected: boolean;
}

function EmailFrequencyCard({ title, description, selected }: EmailFrequencyCardProps) {
  return (
    <div
      className="p-4 rounded-lg cursor-pointer transition-all"
      style={{
        background: selected ? `${PRIMARY_COLOR}15` : 'transparent',
        border: selected ? `2px solid ${PRIMARY_COLOR}` : `1px solid ${BORDER_COLOR}`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
          style={{
            borderColor: selected ? PRIMARY_COLOR : BORDER_COLOR,
          }}
        >
          {selected && (
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: PRIMARY_COLOR }}
            />
          )}
        </div>
        <div>
          <p className="font-medium text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
