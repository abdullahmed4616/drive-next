'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/app/components/ui/sheet';

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(107, 154, 223, 0.1)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

const navItems = [
    { label: 'Home', href: '/' },
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
                className="sticky top-0 z-50 transition-all duration-300"
                style={{
                    background: scrolled
                        ? 'rgba(255, 255, 255, 0.8)'
                        : 'transparent',
                    backdropFilter: scrolled ? 'blur(12px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
                    borderBottom: scrolled
                        ? `1px solid ${BORDER_COLOR}`
                        : '1px solid transparent',
                    boxShadow: scrolled
                        ? `0 4px 24px ${BORDER_COLOR}`
                        : 'none',
                }}
            >
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="flex h-[70px] items-center justify-between">
                        <Link href="/" className="no-underline">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center animate-floating"
                                    style={{
                                        background: PRIMARY_COLOR,
                                        boxShadow: `0 4px 16px ${BORDER_COLOR}`,
                                    }}
                                >
                                    <Sparkles size={24} color="white" strokeWidth={2.5} />
                                </div>
                                <span
                                    className="text-xl font-extrabold"
                                    style={{
                                        color: PRIMARY_COLOR,
                                        fontFamily: "'Outfit', sans-serif",
                                        letterSpacing: '-0.5px',
                                    }}
                                >
                                    DriveUnity
                                </span>
                            </div>
                        </Link>

                        <div className="hidden sm:flex items-center gap-6">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="nav-link text-sm font-medium relative transition-colors hover:text-[#6B9ADF]"
                                    style={{
                                        textDecoration: 'none',
                                        animationDelay: `${index * 0.1}s`,
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <Button
                                asChild
                                size="default"
                                className="rounded-full font-semibold transition-all hover:-translate-y-0.5"
                                style={{
                                    background: PRIMARY_COLOR,
                                    boxShadow: `0 4px 16px ${BORDER_COLOR}`,
                                }}
                            >
                                <Link href="/auth">
                                    Sign In
                                </Link>
                            </Button>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="sm:hidden rounded-xl transition-transform hover:scale-105"
                            style={{
                                background: PRIMARY_COLOR,
                                boxShadow: `0 4px 12px ${BORDER_COLOR}`,
                            }}
                            onClick={() => setOpened(!opened)}
                        >
                            <Menu size={20} color="white" />
                        </Button>
                    </div>
                </div>
            </header>

            <Sheet open={opened} onOpenChange={setOpened}>
                <SheetContent side="right" className="sm:hidden">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="flex items-center gap-2">
                            <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center"
                                style={{
                                    background: PRIMARY_COLOR,
                                    boxShadow: `0 4px 16px ${BORDER_COLOR}`,
                                }}
                            >
                                <Sparkles size={20} color="white" strokeWidth={2.5} />
                            </div>
                            <span
                                className="text-lg font-extrabold"
                                style={{
                                    color: PRIMARY_COLOR,
                                    fontFamily: "'Outfit', sans-serif",
                                }}
                            >
                                DriveUnity
                            </span>
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col gap-4">
                        {navItems.map((item, index) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpened(false)}
                                className="p-4 rounded-2xl bg-white transition-all hover:translate-x-1 fade-in"
                                style={{
                                    textDecoration: 'none',
                                    border: `1px solid ${BORDER_COLOR}`,
                                    boxShadow: `0 2px 8px ${BORDER_COLOR}`,
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                <span className="font-medium text-foreground">
                                    {item.label}
                                </span>
                            </Link>
                        ))}

                        <Button
                            asChild
                            size="lg"
                            className="w-full rounded-full mt-4 font-semibold"
                            style={{
                                background: PRIMARY_COLOR,
                                boxShadow: `0 4px 16px ${BORDER_COLOR}`,
                            }}
                        >
                            <Link href="/auth">
                                Sign In
                            </Link>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            <style jsx global>{`
                @keyframes floating {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-6px);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
}