'use client';

import { useState } from 'react';
import {
  Paper,
  Title,
  TextInput,
  Button,
  Container,
  Text,
  Stack,
  Alert,
  Loader,
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconMail, IconCheck, IconX, IconArrowLeft, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { OTPInputComponent } from '@/app/components/ui/InputOtp';

type Step = 'email' | 'name' | 'otp';

export default function AuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      name: (value) =>
        step === 'name' && !value.trim() ? 'Name is required' : null,
    },
  });

  const handleCheckEmail = async (values: { email: string }) => {
    setLoading(true);

    try {
      const checkResponse = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email }),
      });

      const checkData = await checkResponse.json();

      console.log('Check email response:', checkData);

      if (!checkResponse.ok) {
        throw new Error(checkData.error?.message || 'Failed to check email');
      }

      const userData = checkData.data || checkData;

      if (userData.exists && userData.name) {
        console.log('Existing user found:', userData.name);
        setIsNewUser(false);
        setUserEmail(values.email);
        form.setFieldValue('name', userData.name);
        await sendOTP(values.email, userData.name);
      } else if (userData.exists && !userData.name) {
        console.log('Existing user without name');
        setIsNewUser(false);
        setUserEmail(values.email);
        setStep('name');
      } else {
        console.log('New user');
        setIsNewUser(true);
        setUserEmail(values.email);
        setStep('name');
      }
    } catch (error: any) {
      console.error('Check email error:', error);
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to check email',
        color: 'red',
        icon: <IconX size={16} />,
      });
    } finally {
      setLoading(false);
      
    }
  };

  const handleSubmitName = async (values: { name: string }) => {
    await sendOTP(userEmail, values.name);
  };

  const sendOTP = async (email: string, name: string) => {
    setLoading(true);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || undefined }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || data.error || 'Failed to send verification code');
      }

      setStep('otp');
      notifications.show({
        title: 'Success',
        message: data.message || 'Verification code sent to your email',
        color: 'green',
        icon: <IconCheck size={16} />,
      });
    } catch (error: any) {
      console.error('Send OTP error:', error);
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
        icon: <IconX size={16} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (code: string) => {
    setVerifyingOtp(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || data.error || 'Invalid verification code');
      }

      notifications.show({
        title: 'Success',
        message: 'Signed in successfully',
        color: 'green',
        icon: <IconCheck size={16} />,
      });

      await checkConnectionStatusAndRedirect();
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
        icon: <IconX size={16} />,
      });
      setOtpValue('');
    } finally {
      setVerifyingOtp(false);
    }
  };

  const checkConnectionStatusAndRedirect = async () => {
    try {
      const statusResponse = await fetch('/api/googleDrive/auth/status', {
        credentials: 'include',
      });

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();

        if (statusData.connected && statusData.accountsCount > 0) {
          notifications.show({
            title: 'Welcome back!',
            message: 'Redirecting to your dashboard...',
            color: 'blue',
            icon: <IconCheck size={16} />,
          });
          
          setTimeout(() => {
            router.push('/dashboard');
          }, 500);
        } else {
          notifications.show({
            title: isNewUser ? 'Welcome!' : 'Welcome back!',
            message: isNewUser 
              ? 'Let\'s connect your first drive'
              : 'Connect a drive to get started',
            color: 'blue',
            icon: <IconCheck size={16} />,
          });
          
          setTimeout(() => {
            router.push('/connections');
          }, 500);
        }
      } else {
        router.push('/connections');
      }
    } catch (error) {
      console.error('Error checking connection status:', error);
      router.push('/connections');
    }
  };

  const handleResendOTP = async () => {
    setOtpValue('');
    await sendOTP(userEmail, form.values.name);
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep(isNewUser ? 'name' : 'email');
    } else if (step === 'name') {
      setStep('email');
    }
    setOtpValue('');
  };

  if (step === 'otp') {
    return (
      <Container size={460} my={100}>
        <Paper withBorder shadow="md" p={40} radius="md">
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={handleBack}
            mb="xl"
            disabled={verifyingOtp}
          >
            Back
          </Button>

          <Stack gap="lg" align="center">
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconMail size={28} color="white" />
            </div>

            <Title order={2} ta="center">
              Enter Verification Code
            </Title>

            <Text c="dimmed" size="sm" ta="center">
              We sent a 6-digit code to{' '}
              <Text component="span" fw={600}>
                {userEmail}
              </Text>
            </Text>

            <div style={{ width: '100%' }}>
              <OTPInputComponent
                value={otpValue}
                onChange={setOtpValue}
                onComplete={handleVerifyOTP}
                disabled={verifyingOtp}
              />
              {verifyingOtp && (
                <Center mt="md">
                  <Loader size="sm" />
                  <Text size="sm" c="dimmed" ml="sm">
                    Verifying...
                  </Text>
                </Center>
              )}
            </div>

            <Alert color="blue" variant="light" style={{ width: '100%' }}>
              <Text size="sm">
                <strong>Code expires in 10 minutes</strong>
                <br />
                Maximum 5 attempts allowed
              </Text>
            </Alert>

            <Button
              variant="subtle"
              fullWidth
              onClick={handleResendOTP}
              disabled={verifyingOtp}
            >
              Send new code
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  if (step === 'name') {
    return (
      <Container size={420} my={100}>
        <Paper withBorder shadow="md" p={30} radius="md">
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={handleBack}
            mb="lg"
            disabled={loading}
          >
            Back
          </Button>

          <Stack gap="md" mb="lg">
            <Title order={2} ta="center">
              Welcome! 👋
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              It looks like you're new here. Please enter your name to continue.
            </Text>
          </Stack>

          <form onSubmit={form.onSubmit(handleSubmitName)}>
            <Stack>
              <TextInput
                label="Name"
                placeholder="Your name"
                leftSection={<IconUser size={16} />}
                {...form.getInputProps('name')}
                disabled={loading}
                autoFocus
              />
              <Button type="submit" fullWidth loading={loading} mt="md">
                Continue
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size={420} my={100}>
      <Title ta="center" mb="md">
        Welcome to DriveUnity
      </Title>
      <Text c="dimmed" size="sm" ta="center" mb="xl">
        Enter your email to get started
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md">
        <form onSubmit={form.onSubmit(handleCheckEmail)}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              leftSection={<IconMail size={16} />}
              {...form.getInputProps('email')}
              disabled={loading}
              autoFocus
            />
            <Button type="submit" fullWidth loading={loading} mt="md">
              Continue
            </Button>
          </Stack>
        </form>

        <Text c="dimmed" size="xs" ta="center" mt="xl">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </Paper>
    </Container>
  );
}