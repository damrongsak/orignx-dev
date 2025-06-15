'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Card } from  '@/components/ui/card';	

// import { Button } from '@/components/ui/button';

// Replicating basic shadcn/ui components with Tailwind CSS for self-containment.
// In a real Next.js project, you would import these from @components/ui.

// Basic Button Component (simplified from shadcn/ui)
const Button = ({ onClick, className, children, disabled, variant = 'default', type = 'button' }) => {
    let baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    let variantStyles = "";

    if (variant === 'default') {
        variantStyles = "bg-indigo-600 hover:bg-indigo-700 text-white";
    } else if (variant === 'outline') {
        variantStyles = "border border-gray-600 bg-gray-700 hover:bg-gray-600 text-white";
    } else if (variant === 'ghost') {
        variantStyles = "hover:bg-gray-600 hover:text-white";
    }

    const sizeStyles = "h-10 px-4 py-2"; // Default size, adjust as needed

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className || ''}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

// Basic Input Component (simplified from shadcn/ui)
const Input = ({ id, type, placeholder, value, onChange, className }) => (
    <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
    />
);

// Basic Label Component (simplified from shadcn/ui)
const Label = ({ htmlFor, className, children }) => (
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ''}`}>
        {children}
    </label>
);

// Basic Card Components (simplified from shadcn/ui)
// const Card = ({ className, children }) => (
//     <div className={`rounded-xl border border-gray-700 bg-gray-800 text-gray-100 shadow-lg ${className || ''}`}>
//         {children}
//     </div>
// );
const CardHeader = ({ className, children }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className || ''}`}>
        {children}
    </div>
);
const CardTitle = ({ className, children }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className || ''}`}>
        {children}
    </h3>
);
const CardDescription = ({ className, children }) => (
    <p className={`text-sm text-gray-400 ${className || ''}`}>
        {children}
    </p>
);
const CardContent = ({ className, children }) => (
    <div className={`p-6 pt-0 ${className || ''}`}>
        {children}
    </div>
);
const CardFooter = ({ className, children }) => (
    <div className={`flex items-center p-6 pt-0 ${className || ''}`}>
        {children}
    </div>
);

// Lucide-react icons rendered as inline SVGs
const MailIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const LockIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const EyeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a1.8 1.8 0 0 1 0-.31M21 12s-3 7-10 7a10.07 10.07 0 0 1-6.22-2.19" /><path d="M1.42 2.82 2.82 1.42M9.36 9.36a3 3 0 1 0 5.27 5.27M12 12l.01.01" />
    </svg>
);

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // To show loading state on buttons

    // --- MOCKED signIn FUNCTIONALITY ---
    // In a real Next.js app, you would use `signIn` from 'next-auth/react'.
    // This mock demonstrates the UI behavior.
    const mockSignIn = (provider, options) => {
        setLoading(true);
        console.log(`Attempting to sign in with ${provider}...`);
        console.log('Credentials:', {
            email: options?.email,
            password: options?.password,
        });
        // Simulate an API call
        setTimeout(() => {
            setLoading(false);
            console.log(
                `Mock sign-in with ${provider} complete. Callback URL: ${options?.callbackUrl}`
            );
            // In a real app, you'd handle redirection or error messages here.
            // For this immersive, we just log.
        }, 1500);
    };
    // --- END MOCKED signIn FUNCTIONALITY ---

    const handleLogin = async () => {
        await signIn('credentials', {
            email,
            password,
            callbackUrl: '/dashboard', // Relative is fine now
            redirect: false, // NextAuth will handle redirect
        });
    };

    const handleGoogleSignIn = async () => {
        mockSignIn('google', { callbackUrl: '/blog' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center text-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4 text-center">
                    {/* Placeholder for your logo, similar to 'deepseek' */}
                    <h1 className="text-4xl font-bold">ORIGNX</h1>
                    <CardTitle className="text-3xl font-bold ">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Only login via email or Google
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        {/* Email Input */}
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

                        {/* Password Input */}
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="pl-10 pr-10 py-2"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
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

                    {/* Terms and Privacy Policy */}
                    <p className="text-sm text-gray-400 text-center leading-relaxed">
                        By logging in, you agree to our{' '}
                        <a href="#" className="text-indigo-400 hover:underline">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-indigo-400 hover:underline">
                            Privacy Policy
                        </a>
                        .
                    </p>

                    {/* Login Button */}
                    <Button
                        onClick={handleLogin}
                        className="w-full font-semibold py-2 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Log in'}
                    </Button>

                    {/* Forgot Password / Sign Up Links */}
                    <div className="flex justify-between text-sm">
                        <a href="/auth/forgotpassword" className="text-indigo-400 hover:underline">
                            Forgot password?
                        </a>
                        <a href="/auth/signup" className="text-indigo-400 hover:underline">
                            Sign up
                        </a>
                    </div>

                    {/* OR divider */}
                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="flex-shrink mx-4 text-gray-500">
                            OR
                        </span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    {/* Google Sign-in Button */}
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
        </div>
    );
}
