'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp, signIn } from '@/lib/auth-client';
import { Github, Mail, Loader2 } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signUp.email({ name, email, password });
            if (result.error) {
                setError(result.error.message || 'Registration failed');
            } else {
                router.push('/');
                router.refresh();
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: 'github' | 'google') => {
        setSocialLoading(provider);
        try {
            await signIn.social({
                provider,
                callbackURL: '/',
            });
        } catch {
            setError(`Failed to sign in with ${provider}`);
            setSocialLoading(null);
        }
    };

    return (
        <div className="w-full max-w-sm">
            <div className="bg-dark-900 border border-dark-700/50 rounded-2xl p-8">
                <h1 className="text-xl font-bold text-dark-300 text-center mb-6">
                    Create your account
                </h1>

                {/* Social login buttons */}
                <div className="space-y-3 mb-6">
                    <button
                        onClick={() => handleSocialLogin('github')}
                        disabled={!!socialLoading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg bg-dark-800 border border-dark-700 text-sm font-medium text-dark-300 hover:bg-dark-700 hover:border-dark-600 transition-colors disabled:opacity-50"
                    >
                        {socialLoading === 'github' ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Github className="w-5 h-5" />
                        )}
                        Continue with GitHub
                    </button>
                    <button
                        onClick={() => handleSocialLogin('google')}
                        disabled={!!socialLoading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg bg-dark-800 border border-dark-700 text-sm font-medium text-dark-300 hover:bg-dark-700 hover:border-dark-600 transition-colors disabled:opacity-50"
                    >
                        {socialLoading === 'google' ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Mail className="w-5 h-5" />
                        )}
                        Continue with Google
                    </button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-dark-700" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-dark-900 px-3 text-dark-400">or</span>
                    </div>
                </div>

                {/* Registration form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    {error && (
                        <div className="px-3 py-2 rounded-lg bg-err-400/10 border border-err-400/20 text-xs text-err-400">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="block text-xs font-medium text-dark-400 mb-1.5">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm text-dark-300 placeholder:text-dark-500 focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25 transition-colors"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-dark-400 mb-1.5">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm text-dark-300 placeholder:text-dark-500 focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25 transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs font-medium text-dark-400 mb-1.5">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm text-dark-300 placeholder:text-dark-500 focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25 transition-colors"
                            placeholder="Min. 8 characters"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2.5 rounded-lg bg-accent-500 text-sm font-medium text-white hover:bg-accent-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Create Account
                    </button>
                </form>
            </div>

            <p className="text-center text-xs text-dark-400 mt-4">
                Already have an account?{' '}
                <Link href="/login" className="text-accent-400 hover:text-accent-300 transition-colors">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
