'use client';

import React from 'react';
import Link from 'next/link';
import { Cloud, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { Separator } from '@/app/components/ui/separator';

const footerLinks = {
    product: [
        { label: 'Features', href: '/#features' },
        { label: 'Pricing', href: '/price' },
        { label: 'Integrations', href: '/#integrations' },
        { label: 'Changelog', href: '/changelog' },
    ],
    company: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
    ],
    resources: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Help Center', href: '/help' },
        { label: 'API Reference', href: '/api' },
        { label: 'Status', href: '/status' },
    ],
    legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
    ],
};

const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/driveunity', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/driveunity', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/driveunity', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@driveunity.com', label: 'Email' },
];

export function Footer() {
    return (
        <footer className="w-full bg-background border-t border-border/50">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 mb-10">
                    {/* Brand Section */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-5 group">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                                <Cloud size={16} className="text-white" />
                            </div>
                            <span className="text-base font-bold text-foreground">
                                DriveUnity
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-5 max-w-[240px] leading-relaxed">
                            Manage all your Google Drives in one place. Connect, organize, and access your files effortlessly.
                        </p>
                        <div className="flex items-center gap-1.5">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-lg text-muted-foreground flex items-center justify-center hover:text-foreground hover:bg-muted transition-all duration-200"
                                        aria-label={social.label}
                                    >
                                        <Icon size={16} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Product</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Company</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Resources</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Legal</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="mb-6 bg-border/50" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} DriveUnity. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        <Link
                            href="/privacy"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            href="/cookies"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
