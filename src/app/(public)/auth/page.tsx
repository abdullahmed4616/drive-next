'use client';

import { useState } from 'react';
import { Mail, ArrowLeft, User, Loader2, Sparkles, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { OTPInputComponent } from '@/app/components/ui/InputOtp';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { useToast } from '@/app/components/ui/use-toast';
import { GlassmorphicBackground } from '@/app/components/layout/GlassmorphicBackground';
import { FloatingIcons } from '@/app/components/decorative/FloatingIcons';
import { DecorativeShapes } from '@/app/components/decorative/DecorativeShapes';

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

      if (!checkResponse.ok) {
        throw new Error(checkData.error?.message || 'Failed to check email');
      }

      const userData = checkData.data || checkData;

      if (userData.exists && userData.name) {
        setIsNewUser(false);
        setUserEmail(email);
        setName(userData.name);
        await sendOTP(email, userData.name);
      } else if (userData.exists && !userData.name) {
        setIsNewUser(false);
        setUserEmail(email);
        setStep('name');
      } else {
        setIsNewUser(true);
        setUserEmail(email);
        setStep('name');
      }
    } catch (error: any) {
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
      <GlassmorphicBackground>
        <FloatingIcons />
        <DecorativeShapes />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-screen items-center justify-center py-12 sm:py-16 lg:py-20">
            <div className="w-full max-w-lg">
              {/* Back button with proper spacing */}
              <div className="mb-8">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={verifyingOtp}
                  className="group hover:bg-white/20 backdrop-blur-sm border border-white/10 px-6 py-3 h-auto transition-all duration-300"
                >
                  <ArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform" size={18} />
                  <span className="font-medium">Back</span>
                </Button>
              </div>

              <Card className="glass-card border-white/30 shadow-2xl backdrop-blur-2xl bg-white/40 overflow-hidden">
                <CardContent className="p-8 sm:p-12">
                  <div className="flex flex-col gap-8 items-center">
                    {/* Icon with animation */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse" />
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-xl">
                        <Mail size={32} color="white" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Heading section with proper spacing */}
                    <div className="space-y-3 text-center w-full">
                      <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                        Enter Verification Code
                      </h2>
                      <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                        We sent a 6-digit code to{' '}
                        <span className="font-semibold text-foreground block mt-2">
                          {userEmail}
                        </span>
                      </p>
                    </div>

                    {/* OTP Input with spacing */}
                    <div className="w-full space-y-6 mt-4">
                      <OTPInputComponent
                        value={otpValue}
                        onChange={setOtpValue}
                        onComplete={handleVerifyOTP}
                        disabled={verifyingOtp}
                      />
                      {verifyingOtp && (
                        <div className="flex justify-center items-center gap-3 text-primary py-2">
                          <Loader2 className="animate-spin" size={20} />
                          <span className="text-base font-medium">
                            Verifying your code...
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Alert with proper spacing */}
                    <Alert className="w-full bg-primary/5 border-primary/30 backdrop-blur-sm mt-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <AlertDescription className="text-sm leading-relaxed ml-2">
                        <strong className="text-foreground block mb-1">Security Notice</strong>
                        <span className="text-muted-foreground">
                          Code expires in 10 minutes • Maximum 5 attempts
                        </span>
                      </AlertDescription>
                    </Alert>

                    {/* Resend button with spacing */}
                    <Button
                      variant="ghost"
                      className="w-full hover:bg-white/20 backdrop-blur-sm border border-white/10 h-12 text-base font-medium transition-all hover:scale-[1.02] mt-4"
                      onClick={handleResendOTP}
                      disabled={verifyingOtp}
                    >
                      Didn't receive the code? <span className="ml-1 text-primary font-semibold">Send new code</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </GlassmorphicBackground>
    );
  }

  if (step === 'name') {
    return (
      <GlassmorphicBackground>
        <FloatingIcons />
        <DecorativeShapes />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-screen items-center justify-center py-12 sm:py-16 lg:py-20">
            <div className="w-full max-w-lg">
              {/* Back button with proper spacing */}
              <div className="mb-8">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={loading}
                  className="group hover:bg-white/20 backdrop-blur-sm border border-white/10 px-6 py-3 h-auto transition-all duration-300"
                >
                  <ArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform" size={18} />
                  <span className="font-medium">Back</span>
                </Button>
              </div>

              <Card className="glass-card border-white/30 shadow-2xl backdrop-blur-2xl bg-white/40 overflow-hidden">
                <CardContent className="p-8 sm:p-12">
                  {/* Welcome header with proper spacing */}
                  <div className="flex flex-col gap-6 mb-10 text-center">
                    <div className="text-6xl mb-4 animate-bounce-slow">👋</div>
                    <div className="space-y-4">
                      <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                        Welcome to DriveUnity!
                      </h2>
                      <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                        We're excited to have you here. Please enter your name to personalize your experience.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitName}>
                    <div className="flex flex-col gap-8">
                      {/* Input field with proper spacing */}
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-base font-semibold text-foreground flex items-center gap-2">
                          <User size={18} className="text-primary" />
                          Full Name
                        </Label>
                        <div className="relative group">
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                            autoFocus
                            className="h-14 text-base px-5 bg-white/60 border-2 border-white/30 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all backdrop-blur-sm placeholder:text-muted-foreground/50"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-sm text-destructive font-medium flex items-center gap-2 px-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Submit button with proper spacing */}
                      <Button
                        type="submit"
                        className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] mt-4"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-3 animate-spin" size={20} />
                            Setting up your account...
                          </>
                        ) : (
                          <>
                            Continue to DriveUnity
                            <Sparkles className="ml-3" size={20} />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }
        `}</style>
      </GlassmorphicBackground>
    );
  }

  return (
    <GlassmorphicBackground>
      <FloatingIcons />
      <DecorativeShapes />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen items-center justify-center py-12 sm:py-16 lg:py-20">
          <div className="w-full max-w-2xl">
            {/* Hero header with proper spacing */}
            <div className="text-center mb-12 space-y-6">
              <div className="inline-block">
                <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 shadow-lg">
                  <Sparkles className="text-primary" size={20} />
                  <span className="text-sm font-semibold text-foreground">Unified Cloud Storage</span>
                </div>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight px-4">
                Welcome to DriveUnity
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed px-4">
                Manage all your cloud drives in one beautiful, unified dashboard
              </p>
            </div>

            <Card className="glass-card border-white/30 shadow-2xl backdrop-blur-2xl bg-white/40 overflow-hidden">
              <CardContent className="p-8 sm:p-12">
                <form onSubmit={handleCheckEmail}>
                  <div className="flex flex-col gap-8">
                    {/* Email input with proper spacing */}
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-base font-semibold text-foreground flex items-center gap-2">
                        <Mail size={18} className="text-primary" />
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={loading}
                          autoFocus
                          className="h-14 text-base px-5 bg-white/60 border-2 border-white/30 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all backdrop-blur-sm placeholder:text-muted-foreground/50"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-destructive font-medium flex items-center gap-2 px-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Submit button with proper spacing */}
                    <Button
                      type="submit"
                      className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] mt-4"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-3 animate-spin" size={20} />
                          Checking your email...
                        </>
                      ) : (
                        <>
                          Continue with Email
                          <ArrowLeft className="ml-3 rotate-180" size={20} />
                        </>
                      )}
                    </Button>

                    {/* Terms text with proper spacing */}
                    <p className="text-sm text-muted-foreground text-center leading-relaxed mt-6 px-4">
                      By continuing, you agree to our{' '}
                      <span className="text-primary hover:underline cursor-pointer font-medium transition-colors">
                        Terms of Service
                      </span>
                      {' '}and{' '}
                      <span className="text-primary hover:underline cursor-pointer font-medium transition-colors">
                        Privacy Policy
                      </span>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Trust indicators with proper spacing */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-8 px-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="text-primary" size={18} />
                <span className="font-medium">Bank-level Security</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="text-primary" size={18} />
                <span className="font-medium">No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="text-primary" size={18} />
                <span className="font-medium">10,000+ Happy Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassmorphicBackground>
  );
}
