'use client';

import { useState } from 'react';
import { notifications } from '@mantine/notifications';
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
      notifications.show({
        id: 'connecting-drive',
        title: 'Connecting...',
        message: 'Redirecting to Google for authentication',
        loading: true,
        autoClose: false,
      });

      window.location.href = '/api/googleDrive/auth';

    } catch (error) {
      setIsConnecting(false);

      notifications.hide('connecting-drive');

      const errorMessage = error instanceof Error
          ? error.message
          : 'Failed to start connection process';

      notifications.show({
        title: 'Connection Failed',
        message: errorMessage,
        color: 'red',
        icon: React.createElement(IconAlertCircle, { size: 18 }),
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

      notifications.show({
        id: 'connecting-drive',
        title: 'Connecting to Google Drive',
        message: 'You will be redirected to Google for authentication',
        loading: true,
        autoClose: false,
      });

      await new Promise(resolve => setTimeout(resolve, 500));

      window.location.href = '/api/googleDrive/auth';

    } catch (err) {
      setIsConnecting(false);
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);

      notifications.hide('connecting-drive');

      notifications.show({
        title: 'Connection Failed',
        message: error.message,
        color: 'red',
        icon: React.createElement(IconAlertCircle, { size: 18 }),
        autoClose: 5000,
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

      notifications.show({
        id: 'connecting-drive',
        title: 'Connecting...',
        message: 'Redirecting to Google',
        loading: true,
        autoClose: false,
      });

      window.location.href = authUrl;

    } catch (error) {
      setIsConnecting(false);

      notifications.hide('connecting-drive');

      notifications.show({
        title: 'Error',
        message: 'Failed to initiate connection',
        color: 'red',
        icon: React.createElement(IconAlertCircle, { size: 18 }),
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
          notifications.show({
            title: 'Connection Limit Reached',
            message: `Your ${packageName} plan allows up to ${limit} Google Drive ${limit === 1 ? 'account' : 'accounts'}. Upgrade to connect more drives.`,
            color: 'orange',
            icon: React.createElement(IconAlertCircle, { size: 18 }),
            autoClose: 7000,
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
      notifications.show({
        title: 'Cannot Connect',
        message: 'You have reached the maximum number of connected drives for your subscription plan. Please upgrade to add more drives.',
        color: 'red',
        icon: React.createElement(IconAlertCircle, { size: 18 }),
        autoClose: 7000,
      });
      return;
    }

    setIsConnecting(true);

    try {
      notifications.show({
        id: 'connecting-drive',
        title: 'Connecting to Google Drive',
        message: 'Please wait...',
        loading: true,
        autoClose: false,
      });

      window.location.href = '/api/googleDrive/auth';

    } catch (error) {
      setIsConnecting(false);

      notifications.hide('connecting-drive');

      notifications.show({
        title: 'Connection Failed',
        message: 'Unable to start the connection process',
        color: 'red',
        icon: React.createElement(IconAlertCircle, { size: 18 }),
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