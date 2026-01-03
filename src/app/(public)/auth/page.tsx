'use client';

import { useState } from 'react';
import { Mail, Check, X, ArrowLeft, User, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { OTPInputComponent } from '@/app/components/ui/InputOtp';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { useToast } from '@/app/components/ui/use-toast';

type Step = 'email' | 'name' | 'otp';

export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('email');
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: '', name: '' });

  const validateEmail = (value: string) => {
    if (!/^\S+@\S+$/.test(value)) {
      return 'Invalid email';
    }
    return '';
  };

  const validateName = (value: string) => {
    if (step === 'name' && !value.trim()) {
      return 'Name is required';
    }
    return '';
  };

  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ ...errors, email: emailError });
      return;
    }
    setErrors({ ...errors, email: '' });
    setLoading(true);

    try {
      const checkResponse = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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
        setUserEmail(email);
        setName(userData.name);
        await sendOTP(email, userData.name);
      } else if (userData.exists && !userData.name) {
        console.log('Existing user without name');
        setIsNewUser(false);
        setUserEmail(email);
        setStep('name');
      } else {
        console.log('New user');
        setIsNewUser(true);
        setUserEmail(email);
        setStep('name');
      }
    } catch (error: any) {
      console.error('Check email error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to check email',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitName = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateName(name);
    if (nameError) {
      setErrors({ ...errors, name: nameError });
      return;
    }
    setErrors({ ...errors, name: '' });
    await sendOTP(userEmail, name);
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
      toast({
        title: 'Success',
        description: data.message || 'Verification code sent to your email',
      });
    } catch (error: any) {
      console.error('Send OTP error:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
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

      toast({
        title: 'Success',
        description: 'Signed in successfully',
      });

      await checkConnectionStatusAndRedirect();
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
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
          toast({
            title: 'Welcome back!',
            description: 'Redirecting to your dashboard...',
          });

          setTimeout(() => {
            router.push('/dashboard');
          }, 500);
        } else {
          toast({
            title: isNewUser ? 'Welcome!' : 'Welcome back!',
            description: isNewUser
              ? 'Let\'s connect your first drive'
              : 'Connect a drive to get started',
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
    await sendOTP(userEmail, name);
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
      <div className="max-w-[460px] mx-auto my-[100px] px-4">
        <Card className="border shadow-md">
          <CardContent className="p-10">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={verifyingOtp}
              className="mb-6"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back
            </Button>

            <div className="flex flex-col gap-6 items-center">
              <div
                className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                <Mail size={28} color="white" />
              </div>

              <h2 className="text-2xl font-bold text-center">
                Enter Verification Code
              </h2>

              <p className="text-sm text-muted-foreground text-center">
                We sent a 6-digit code to{' '}
                <span className="font-semibold">
                  {userEmail}
                </span>
              </p>

              <div className="w-full">
                <OTPInputComponent
                  value={otpValue}
                  onChange={setOtpValue}
                  onComplete={handleVerifyOTP}
                  disabled={verifyingOtp}
                />
                {verifyingOtp && (
                  <div className="flex justify-center items-center mt-4">
                    <Loader2 className="animate-spin" size={16} />
                    <span className="text-sm text-muted-foreground ml-2">
                      Verifying...
                    </span>
                  </div>
                )}
              </div>

              <Alert className="w-full">
                <AlertDescription>
                  <strong>Code expires in 10 minutes</strong>
                  <br />
                  Maximum 5 attempts allowed
                </AlertDescription>
              </Alert>

              <Button
                variant="ghost"
                className="w-full"
                onClick={handleResendOTP}
                disabled={verifyingOtp}
              >
                Send new code
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'name') {
    return (
      <div className="max-w-[420px] mx-auto my-[100px] px-4">
        <Card className="border shadow-md">
          <CardContent className="p-8">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={loading}
              className="mb-4"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back
            </Button>

            <div className="flex flex-col gap-4 mb-6">
              <h2 className="text-2xl font-bold text-center">
                Welcome! 👋
              </h2>
              <p className="text-sm text-muted-foreground text-center">
                It looks like you're new here. Please enter your name to continue.
              </p>
            </div>

            <form onSubmit={handleSubmitName}>
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      autoFocus
                      className="pl-9"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
                <Button type="submit" className="w-full mt-4" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={16} />
                      Loading...
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-[420px] mx-auto my-[100px] px-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        Welcome to DriveUnity
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-8">
        Enter your email to get started
      </p>

      <Card className="border shadow-md">
        <CardContent className="p-8">
          <form onSubmit={handleCheckEmail}>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    autoFocus
                    className="pl-9"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    Loading...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-8">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
