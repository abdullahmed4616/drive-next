'use client';

import { useState } from 'react';
import { Mail, Check, X, ArrowLeft, User, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { OTPInputComponent } from '@/app/components/ui/InputOtp';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/Button';
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
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Card className="glass-card border-white/20 shadow-2xl backdrop-blur-xl">
            <CardContent className="p-8 sm:p-10">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={verifyingOtp}
                className="mb-6 hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back
              </Button>

              <div className="flex flex-col gap-6 items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                  <div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #764ba2 100%)',
                    }}
                  >
                    <Mail size={28} color="white" />
                  </div>
                </div>

                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Enter Verification Code
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    We sent a 6-digit code to{' '}
                    <span className="font-semibold text-foreground">
                      {userEmail}
                    </span>
                  </p>
                </div>

                <div className="w-full space-y-4">
                  <OTPInputComponent
                    value={otpValue}
                    onChange={setOtpValue}
                    onComplete={handleVerifyOTP}
                    disabled={verifyingOtp}
                  />
                  {verifyingOtp && (
                    <div className="flex justify-center items-center gap-2 text-primary">
                      <Loader2 className="animate-spin" size={16} />
                      <span className="text-sm font-medium">
                        Verifying...
                      </span>
                    </div>
                  )}
                </div>

                <Alert className="w-full bg-primary/5 border-primary/20">
                  <AlertDescription className="text-sm">
                    <strong className="text-foreground">Code expires in 10 minutes</strong>
                    <br />
                    <span className="text-muted-foreground">Maximum 5 attempts allowed</span>
                  </AlertDescription>
                </Alert>

                <Button
                  variant="ghost"
                  className="w-full hover:bg-white/10 transition-all hover:scale-[1.02]"
                  onClick={handleResendOTP}
                  disabled={verifyingOtp}
                >
                  Send new code
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'name') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Card className="glass-card border-white/20 shadow-2xl backdrop-blur-xl">
            <CardContent className="p-8 sm:p-10">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={loading}
                className="mb-6 hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back
              </Button>

              <div className="flex flex-col gap-6 mb-8">
                <div className="space-y-3 text-center">
                  <div className="text-5xl mb-2">👋</div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Welcome!
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    It looks like you're new here. Please enter your name to continue.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitName}>
                <div className="flex flex-col gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                        autoFocus
                        className="pl-10 h-11 bg-white/50 border-white/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <X size={14} />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" size={18} />
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
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome to DriveUnity
          </h1>
          <p className="text-base text-muted-foreground">
            Enter your email to get started
          </p>
        </div>

        <Card className="glass-card border-white/20 shadow-2xl backdrop-blur-xl">
          <CardContent className="p-8 sm:p-10">
            <form onSubmit={handleCheckEmail}>
              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      autoFocus
                      className="pl-10 h-11 bg-white/50 border-white/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <X size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={18} />
                      Loading...
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </div>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-8">
              By continuing, you agree to our{' '}
              <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
              {' '}and{' '}
              <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
