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
        <footer className="w-full bg-gradient-to-t from-muted/50 to-background border-t border-border">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all">
                                <Cloud size={22} className="text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                DriveUnity
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
                            Manage all your Google Drives in one place. Connect, organize, and access your files
                            effortlessly with intelligent tools.
                        </p>
                        <div className="flex items-center gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                                        aria-label={social.label}
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="mb-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} DriveUnity. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            href="/cookies"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
