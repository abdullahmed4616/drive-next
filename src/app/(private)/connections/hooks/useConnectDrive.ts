'use client';

import { useState } from 'react';
import { toast } from '@/app/components/ui/use-toast';
import { IconAlertCircle } from '@tabler/icons-react';
import React from 'react';

interface UseConnectDriveOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectTo?: string;
}

export function useConnectDrive(options?: UseConnectDriveOptions) {
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    setIsConnecting(true);

    try {
      toast({
        title: 'Connecting...',
        description: 'Redirecting to Google for authentication',
      });

      window.location.href = '/api/googleDrive/auth';

    } catch (error) {
      setIsConnecting(false);

      const errorMessage = error instanceof Error
          ? error.message
          : 'Failed to start connection process';

      toast({
        title: 'Connection Failed',
        description: errorMessage,
        variant: 'destructive',
      });

      if (options?.onError) {
        options.onError(error instanceof Error ? error : new Error(errorMessage));
      }
    }
  };

  return {
    connect,
    isConnecting,
  };
}

export function useConnectDriveWithStatus() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const sessionCheck = await fetch('/api/auth/session', {
        credentials: 'include',
      });

      if (!sessionCheck.ok) {
        throw new Error('Please log in first');
      }

      toast({
        title: 'Connecting to Google Drive',
        description: 'You will be redirected to Google for authentication',
      });

      await new Promise(resolve => setTimeout(resolve, 500));

      window.location.href = '/api/googleDrive/auth';

    } catch (err) {
      setIsConnecting(false);
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);

      toast({
        title: 'Connection Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const reset = () => {
    setIsConnecting(false);
    setError(null);
  };

  return {
    connect,
    isConnecting,
    error,
    reset,
  };
}

export function useConnectDriveWithCallback() {
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async (callbackUrl?: string) => {
    setIsConnecting(true);

    try {
      const params = new URLSearchParams();
      if (callbackUrl) {
        params.append('callback', callbackUrl);
      }

      const authUrl = `/api/googleDrive/auth${params.toString() ? `?${params.toString()}` : ''}`;

      toast({
        title: 'Connecting...',
        description: 'Redirecting to Google',
      });

      window.location.href = authUrl;

    } catch (error) {
      setIsConnecting(false);

      toast({
        title: 'Error',
        description: 'Failed to initiate connection',
        variant: 'destructive',
      });
    }
  };

  return {
    connect,
    isConnecting,
  };
}

export function useConnectDriveAdvanced() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [canConnect, setCanConnect] = useState(true);
  const [connectionLimit, setConnectionLimit] = useState<number | null>(null);
  const [subscriptionTier, setSubscriptionTier] = useState<string>('FREE');

  const checkConnectionStatus = async () => {
    setIsCheckingStatus(true);

    try {
      const response = await fetch('/api/googleDrive/connect', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();

        const limit = data.subscription.maxConnectedDrives;
        const tier = data.subscription.tier;
        const packageName = data.subscription.packageName;

        setConnectionLimit(limit);
        setSubscriptionTier(tier);
        setCanConnect(data.subscription.canAddMore);

        if (!data.subscription.canAddMore) {
          toast({
            title: 'Connection Limit Reached',
            description: `Your ${packageName} plan allows up to ${limit} Google Drive ${limit === 1 ? 'account' : 'accounts'}. Upgrade to connect more drives.`,
          });
        }
      }
    } catch (error) {
      console.error('Failed to check connection status:', error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const connect = async () => {
    await checkConnectionStatus();

    if (!canConnect) {
      toast({
        title: 'Cannot Connect',
        description: 'You have reached the maximum number of connected drives for your subscription plan. Please upgrade to add more drives.',
        variant: 'destructive',
      });
      return;
    }

    setIsConnecting(true);

    try {
      toast({
        title: 'Connecting to Google Drive',
        description: 'Please wait...',
      });

      window.location.href = '/api/googleDrive/auth';

    } catch (error) {
      setIsConnecting(false);

      toast({
        title: 'Connection Failed',
        description: 'Unable to start the connection process',
        variant: 'destructive',
      });
    }
  };

  return {
    connect,
    isConnecting,
    canConnect,
    connectionLimit,
    subscriptionTier,
    checkConnectionStatus,
    isCheckingStatus,
  };
}