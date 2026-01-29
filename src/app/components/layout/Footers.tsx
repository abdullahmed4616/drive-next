'use client';

import React from 'react';
import Link from 'next/link';
import { Cloud, Twitter, Github, Linkedin, Mail } from 'lucide-react';

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
        <footer className="w-full border-t border-white/[0.04]">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 mb-10">
                    {/* Brand Section */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-5 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <Cloud size={16} className="text-white" />
                            </div>
                            <span className="text-base font-bold text-white">
                                DriveUnity
                            </span>
                        </Link>
                        <p className="text-sm text-white/30 mb-5 max-w-[240px] leading-relaxed">
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
                                        className="w-8 h-8 rounded-lg text-white/25 flex items-center justify-center hover:text-white/60 hover:bg-white/[0.04] transition-all duration-200"
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
                        <h4 className="text-sm font-semibold text-white/60 mb-3">Product</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/25 hover:text-white/55 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white/60 mb-3">Company</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/25 hover:text-white/55 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white/60 mb-3">Resources</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/25 hover:text-white/55 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white/60 mb-3">Legal</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/25 hover:text-white/55 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/[0.04] pt-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-white/20">
                            &copy; {new Date().getFullYear()} DriveUnity. All rights reserved.
                        </p>
                        <div className="flex items-center gap-5">
                            <Link
                                href="/privacy"
                                className="text-xs text-white/20 hover:text-white/40 transition-colors"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-xs text-white/20 hover:text-white/40 transition-colors"
                            >
                                Terms
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-xs text-white/20 hover:text-white/40 transition-colors"
                            >
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
