'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cloud, Menu, X } from 'lucide-react';
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
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg'
                        : 'bg-transparent border-b border-transparent'
                }`}
            >
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 md:h-20 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="no-underline group">
                            <div className="flex items-center gap-3 cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
                                    <Cloud size={22} className="text-white" />
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    DriveUnity
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-200"
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
                                className="text-muted-foreground hover:text-primary"
                            >
                                <Link href="/auth">Sign In</Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                            >
                                <Link href="/auth">Get Started</Link>
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setOpened(!opened)}
                        >
                            <Menu size={24} className="text-foreground" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Sheet */}
            <Sheet open={opened} onOpenChange={setOpened}>
                <SheetContent side="right" className="w-full max-w-sm p-0">
                    <SheetHeader className="p-6 bg-gradient-to-br from-primary to-secondary">
                        <SheetTitle className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                <Cloud size={22} className="text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                DriveUnity
                            </span>
                        </SheetTitle>
                    </SheetHeader>

                    <div className="p-6 flex flex-col gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpened(false)}
                                className="flex items-center px-4 py-3 rounded-xl text-foreground font-medium hover:bg-primary/5 hover:text-primary transition-all duration-200"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="border-t border-border my-4" />

                        <Button
                            asChild
                            variant="outline"
                            className="w-full justify-center"
                        >
                            <Link href="/auth" onClick={() => setOpened(false)}>
                                Sign In
                            </Link>
                        </Button>

                        <Button
                            asChild
                            className="w-full justify-center bg-gradient-to-r from-primary to-secondary text-white"
                        >
                            <Link href="/auth" onClick={() => setOpened(false)}>
                                Get Started
                            </Link>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
