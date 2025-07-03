'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // State for AlertDialog
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');

  // Function to show custom alert dialog
  const showCustomAlert = (title: string, description: string) => {
    setAlertTitle(title);
    setAlertDescription(description);
    setShowAlert(true);
  };

  const handleLogin = async () => {
    setLoading(true);
    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/profile',
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      console.log('Login failed:', result.error);
      console.log(
        'Credentials login functionality is limited without next-auth/react direct access.',
      );
      showCustomAlert(
        'Credentials Login Disabled',
        'Due to environment limitations. Please use Google sign-in instead.',
      );
    } else {
      window.location.href = result?.url || '/profile';
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await signIn('google', {
      callbackUrl: '/profile',
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      console.error('Google sign-in failed:', result.error);
      showCustomAlert(
        'Google Sign-in Failed',
        'There was an error signing in with Google. Please try again later.',
      );
    } else {
      // window.location.href = result?.url || '/profile';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">ORIGNX</h1>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-gray-400">
            Only login via email or Google
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="sr-only">
                Email address
              </Label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 py-2"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 rounded-full"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400 text-center leading-relaxed">
            By logging in, you agree to our{' '}
            <a
              href="/terms-of-service"
              className="text-indigo-400 hover:underline"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="/privacy-policy"
              className="text-indigo-400 hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>
          <Button
            onClick={handleLogin}
            className="w-full font-semibold py-2 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log in'}
          </Button>
          <div className="flex justify-between text-sm">
            <a
              href="/auth/forgot-password"
              className="text-indigo-400 hover:underline"
            >
              Forgot password?
            </a>
            <a href="/auth/signup" className="text-indigo-400 hover:underline">
              Sign up
            </a>
          </div>
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-2 transition duration-200"
            disabled={loading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z" />
              <path d="M12 6v6l4 2" />
            </svg>
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-500">
          <span>
            Need help?{' '}
            <a href="/support" className="text-indigo-400 hover:underline">
              Contact Support
            </a>
          </span>
        </CardFooter>
      </Card>

      {/* AlertDialog component */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert(false)}>
              ตกลง
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
