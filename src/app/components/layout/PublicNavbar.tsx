'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cloud, Menu, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/app/components/ui/sheet';

const navItems = [
    { label: 'Home', href: '/home' },
    { label: 'Pricing', href: '/price' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
];

export default function PublicNavbar() {
    const [opened, setOpened] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`sticky top-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-[#0a0f1a]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/20'
                        : 'bg-transparent border-b border-transparent'
                }`}
            >
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="no-underline group flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-lg shadow-blue-500/20">
                                <Cloud size={18} className="text-white" />
                            </div>
                            <span className="text-lg font-bold text-white tracking-tight">
                                DriveUnity
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="px-3.5 py-2 text-sm font-medium text-white/60 hover:text-white rounded-lg transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="text-white/60 hover:text-white hover:bg-white/[0.06] font-medium"
                            >
                                <Link href="/auth">Sign in</Link>
                            </Button>
                            <Button
                                asChild
                                size="sm"
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-medium px-5 shadow-lg shadow-blue-500/25 border-0"
                            >
                                <Link href="/auth">
                                    Get started free
                                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                </Link>
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden h-9 w-9 text-white/70 hover:text-white hover:bg-white/[0.06]"
                            onClick={() => setOpened(!opened)}
                        >
                            <Menu size={20} />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Sheet */}
            <Sheet open={opened} onOpenChange={setOpened}>
                <SheetContent side="right" className="w-full max-w-xs p-0 bg-[#0d1321] border-l border-white/[0.06]">
                    <SheetHeader className="p-5 border-b border-white/[0.06]">
                        <SheetTitle className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <Cloud size={18} className="text-white" />
                            </div>
                            <span className="text-lg font-bold text-white">
                                DriveUnity
                            </span>
                        </SheetTitle>
                    </SheetHeader>

                    <div className="p-5 flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpened(false)}
                                className="flex items-center px-3 py-2.5 rounded-lg text-sm text-white/70 font-medium hover:bg-white/[0.06] hover:text-white transition-colors duration-200"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="border-t border-white/[0.06] my-3" />

                        <Button
                            asChild
                            variant="outline"
                            className="w-full justify-center font-medium border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.06]"
                        >
                            <Link href="/auth" onClick={() => setOpened(false)}>
                                Sign In
                            </Link>
                        </Button>

                        <Button
                            asChild
                            className="w-full justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium mt-1.5 border-0"
                        >
                            <Link href="/auth" onClick={() => setOpened(false)}>
                                Get Started
                                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                            </Link>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
