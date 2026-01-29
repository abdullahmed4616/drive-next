'use client';

import React, { useState } from 'react';
import { Check, Mail, MapPin, Clock, Twitter, Linkedin, MessageSquare, Send } from 'lucide-react';
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent } from "@/app/components/ui/card";
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
            <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background py-20 lg:py-28">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-secondary/10 blur-3xl" />
                </div>

                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <Badge className="mb-6 px-4 py-2 bg-primary text-white">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contact Us
                        </Badge>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            Get in <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Have questions, feedback, or want to collaborate? Fill out the form below
                            and we'll get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <Card className="border border-border bg-card shadow-xl">
                        <CardContent className="p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Your Name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            placeholder="your@email.com"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="h-12"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="What's this about?"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us more about your inquiry..."
                                        name="message"
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={loading}
                                    className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
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
                                <Alert className="mt-6 bg-green-500/10 border-green-500/30 text-green-600">
                                    <Check className="h-4 w-4" />
                                    <AlertDescription>
                                        <span className="font-semibold">Success!</span> Your message has been sent. We'll get back to you soon!
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>

                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        {contactInfo.map((info, idx) => (
                            <Card key={idx} className="border border-border bg-card text-center p-6 hover:shadow-lg transition-shadow">
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <info.icon className="w-6 h-6 text-primary" />
                                </div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                    {info.title}
                                </p>
                                <p className="font-bold text-lg text-foreground">{info.content}</p>
                                <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                            </Card>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-4 mt-8">
                        <a
                            href="https://twitter.com/driveunity"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            <Twitter size={22} />
                        </a>
                        <a
                            href="https://linkedin.com/company/driveunity"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            <Linkedin size={22} />
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 lg:py-24 bg-muted/30">
                <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">FAQ</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground">
                            Quick answers to common questions
                        </p>
                    </div>

                    <Card className="border border-border bg-card">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, idx) => (
                                <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-border last:border-b-0 px-6">
                                    <AccordionTrigger className="text-left hover:no-underline py-6">
                                        <span className="font-semibold text-foreground">{faq.question}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Card>
                </div>
            </section>
        </div>
    );
}
