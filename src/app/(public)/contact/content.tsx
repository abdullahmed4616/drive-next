'use client';

import React, { useState } from 'react';
import { Check, Mail, MapPin, Clock, Twitter, Linkedin, MessageSquare, Send, Search } from 'lucide-react';
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/Accordion";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

const contactInfo = [
    {
        icon: Mail,
        title: "Email",
        content: "contact@driveunity.com",
        subtitle: "We respond within 24 hours",
    },
    {
        icon: MapPin,
        title: "Office",
        content: "San Francisco, CA",
        subtitle: "United States",
    },
    {
        icon: Clock,
        title: "Business Hours",
        content: "Mon - Fri: 9AM - 6PM",
        subtitle: "Pacific Time (PT)",
    },
];

const faqs = [
    {
        question: "How do I connect my Google Drive?",
        answer: "After signing up, click \"Connect Drive\" on your dashboard. You'll be redirected to Google's authentication page where you can safely authorize DriveUnity to access your Drive. We only request necessary permissions and never store your files on our servers.",
    },
    {
        question: "Is my data secure with DriveUnity?",
        answer: "Absolutely. We use industry-standard encryption for all data transfers. Your files remain on Google's servers - we only store metadata to provide our features. We're also SOC 2 Type II compliant and undergo regular security audits.",
    },
    {
        question: "Can I connect multiple Google accounts?",
        answer: "Yes! That's exactly what DriveUnity is designed for. Depending on your plan, you can connect 2 to unlimited Google Drive accounts and manage them all from a single dashboard.",
    },
    {
        question: "How does the AI search work?",
        answer: "Our AI-powered search understands natural language queries. Instead of searching for exact file names, you can search for concepts like \"budget documents from last month\" or \"images from the marketing folder.\" The AI analyzes your query and finds the most relevant files across all your connected drives.",
    },
    {
        question: "What happens if I cancel my subscription?",
        answer: "If you cancel, your account will be downgraded to the free plan at the end of your billing period. You'll keep your data and connected drives (up to the free plan limit). You can export all your data at any time from the Settings page.",
    },
];

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form data submitted:', formData);
        setSubmitted(true);
        setLoading(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-28">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/[0.06] blur-[120px]" />
                    <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-secondary/[0.05] blur-[100px]" />
                </div>

                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <Badge className="mb-6 px-4 py-1.5 bg-primary/10 text-primary border border-primary/20">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contact Us
                        </Badge>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            Get in{' '}
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">Touch</span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/40 leading-relaxed">
                            Have questions, feedback, or want to collaborate? Fill out the form below
                            and we&apos;ll get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] shadow-xl">
                        <div className="p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-white/70">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Your Name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="h-12 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/25 focus:border-primary/40"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-white/70">Email</Label>
                                        <Input
                                            id="email"
                                            placeholder="your@email.com"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="h-12 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/25 focus:border-primary/40"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-white/70">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="What's this about?"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="h-12 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/25 focus:border-primary/40"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-white/70">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us more about your inquiry..."
                                        name="message"
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="resize-none bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/25 focus:border-primary/40"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={loading}
                                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold border-0 shadow-lg shadow-blue-500/20"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Send className="h-4 w-4" />
                                            Send Message
                                        </span>
                                    )}
                                </Button>
                            </form>

                            {submitted && (
                                <Alert className="mt-6 bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                                    <Check className="h-4 w-4" />
                                    <AlertDescription>
                                        <span className="font-semibold">Success!</span> Your message has been sent. We&apos;ll get back to you soon!
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                        {contactInfo.map((info, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] text-center p-6 hover:bg-white/[0.04] transition-colors">
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <info.icon className="w-6 h-6 text-primary" />
                                </div>
                                <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-1">
                                    {info.title}
                                </p>
                                <p className="font-bold text-lg text-white/85">{info.content}</p>
                                <p className="text-sm text-white/40">{info.subtitle}</p>
                            </div>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3 mt-8">
                        <a
                            href="https://twitter.com/driveunity"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/40 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300"
                        >
                            <Twitter size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/company/driveunity"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/40 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 lg:py-24 border-t border-white/[0.05]">
                <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">FAQ</Badge>
                        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2 tracking-tight">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-white/40">
                            Quick answers to common questions
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02]">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, idx) => (
                                <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-white/[0.05] last:border-b-0 px-6">
                                    <AccordionTrigger className="text-left hover:no-underline py-6">
                                        <span className="font-semibold text-white/80">{faq.question}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 text-white/40 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>
        </div>
    );
}
