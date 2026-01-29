'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cloud, Menu, X, ArrowRight } from 'lucide-react';
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
                        ? 'bg-background/90 backdrop-blur-2xl border-b border-border/60 shadow-sm'
                        : 'bg-transparent border-b border-transparent'
                }`}
            >
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="no-underline group flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                                <Cloud size={18} className="text-white" />
                            </div>
                            <span className="text-lg font-bold text-foreground tracking-tight">
                                DriveUnity
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center gap-2">
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground font-medium"
                            >
                                <Link href="/auth">Sign In</Link>
                            </Button>
                            <Button
                                asChild
                                size="sm"
                                className="bg-primary hover:bg-primary/90 text-white font-medium px-5 shadow-none"
                            >
                                <Link href="/auth">
                                    Get Started
                                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                </Link>
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden h-9 w-9"
                            onClick={() => setOpened(!opened)}
                        >
                            <Menu size={20} className="text-foreground" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Sheet */}
            <Sheet open={opened} onOpenChange={setOpened}>
                <SheetContent side="right" className="w-full max-w-xs p-0">
                    <SheetHeader className="p-5 border-b border-border">
                        <SheetTitle className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                                <Cloud size={18} className="text-white" />
                            </div>
                            <span className="text-lg font-bold text-foreground">
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
                                className="flex items-center px-3 py-2.5 rounded-lg text-sm text-foreground font-medium hover:bg-muted transition-colors duration-200"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="border-t border-border my-3" />

                        <Button
                            asChild
                            variant="outline"
                            className="w-full justify-center font-medium"
                        >
                            <Link href="/auth" onClick={() => setOpened(false)}>
                                Sign In
                            </Link>
                        </Button>

                        <Button
                            asChild
                            className="w-full justify-center bg-primary text-white font-medium mt-1.5"
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
