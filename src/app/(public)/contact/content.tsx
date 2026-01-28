'use client';

import React, { useState } from 'react';
import { Check, Mail, MapPin, Phone, Clock, Twitter, Linkedin, ChevronDown } from 'lucide-react';
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Card } from "@/app/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

const PRIMARY_COLOR = '#6B9ADF';
const ACCENT_BG_COLOR = 'rgba(0,0,0, 0.2)';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const gradientText: React.CSSProperties = {
    background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_COLOR} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
      <div
          className="flex flex-col items-center"
          style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 80 }}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex flex-col items-center gap-4 mb-16 text-center">
            <h1 className="text-5xl font-bold">
              Get in <span style={gradientText}>Touch</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Have questions, feedback, or want to collaborate? Fill out the form below and we'll get back to you
              as soon as possible.
            </p>
          </div>

          <Card
              className="shadow-xl p-8"
              style={{
                backdropFilter: 'blur(16px)',
                background: BORDER_COLOR,
                border: `1px solid ${BORDER_COLOR}`,
              }}
          >
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                      id="name"
                      placeholder="Your Name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2"
                      style={{
                        borderColor: BORDER_COLOR,
                      }}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                      id="email"
                      placeholder="Your Email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2"
                      style={{
                        borderColor: BORDER_COLOR,
                      }}
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                      id="subject"
                      placeholder="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-2"
                      style={{
                        borderColor: BORDER_COLOR,
                      }}
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                      id="message"
                      placeholder="Your Message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2"
                      style={{
                        borderColor: BORDER_COLOR,
                      }}
                  />
                </div>
                <div className="flex justify-center mt-6">
                  <Button
                      type="submit"
                      size="lg"
                      style={{
                        backgroundColor: PRIMARY_COLOR,
                      }}
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </form>

            {submitted && (
                <div
                    className="flex items-start gap-3 mt-6 p-4 rounded-lg border"
                    style={{
                      backgroundColor: 'rgba(134, 239, 172, 0.1)',
                      borderColor: 'rgba(34, 197, 94, 0.3)',
                    }}
                >
                  <Check size={20} className="mt-0.5" style={{ color: 'rgb(34, 197, 94)' }} />
                  <div className="flex-1">
                    <p className="font-semibold" style={{ color: 'rgb(34, 197, 94)' }}>Success!</p>
                    <p className="text-sm mt-1">Your message has been sent successfully!</p>
                  </div>
                  <button
                      onClick={() => setSubmitted(false)}
                      className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
            )}
          </Card>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <ContactInfoCard
              icon={<Mail size={24} style={{ color: PRIMARY_COLOR }} />}
              title="Email"
              content="contact@driveunity.com"
              subtitle="We respond within 24 hours"
            />
            <ContactInfoCard
              icon={<MapPin size={24} style={{ color: PRIMARY_COLOR }} />}
              title="Office"
              content="San Francisco, CA"
              subtitle="United States"
            />
            <ContactInfoCard
              icon={<Clock size={24} style={{ color: PRIMARY_COLOR }} />}
              title="Business Hours"
              content="Mon - Fri: 9AM - 6PM"
              subtitle="Pacific Time (PT)"
            />
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-8">
            <a
              href="https://twitter.com/driveunity"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: `${PRIMARY_COLOR}15` }}
            >
              <Twitter size={22} style={{ color: PRIMARY_COLOR }} />
            </a>
            <a
              href="https://linkedin.com/company/driveunity"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: `${PRIMARY_COLOR}15` }}
            >
              <Linkedin size={22} style={{ color: PRIMARY_COLOR }} />
            </a>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2" style={gradientText}>
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Quick answers to common questions
              </p>
            </div>

            <Card
              className="shadow-lg"
              style={{
                backdropFilter: 'blur(16px)',
                background: BORDER_COLOR,
                border: `1px solid ${BORDER_COLOR}`,
              }}
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b px-6" style={{ borderColor: BORDER_COLOR }}>
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold">How do I connect my Google Drive?</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-gray-600">
                    After signing up, click "Connect Drive" on your dashboard. You'll be redirected to
                    Google's authentication page where you can safely authorize DriveUnity to access
                    your Drive. We only request necessary permissions and never store your files on
                    our servers.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-b px-6" style={{ borderColor: BORDER_COLOR }}>
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold">Is my data secure with DriveUnity?</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-gray-600">
                    Absolutely. We use industry-standard encryption for all data transfers. Your files
                    remain on Google's servers - we only store metadata to provide our features. We're
                    also SOC 2 Type II compliant and undergo regular security audits.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b px-6" style={{ borderColor: BORDER_COLOR }}>
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold">Can I connect multiple Google accounts?</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-gray-600">
                    Yes! That's exactly what DriveUnity is designed for. Depending on your plan, you
                    can connect 2 to unlimited Google Drive accounts and manage them all from a
                    single dashboard.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-b px-6" style={{ borderColor: BORDER_COLOR }}>
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold">How does the AI search work?</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-gray-600">
                    Our AI-powered search understands natural language queries. Instead of searching
                    for exact file names, you can search for concepts like "budget documents from
                    last month" or "images from the marketing folder." The AI analyzes your query
                    and finds the most relevant files across all your connected drives.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold">What happens if I cancel my subscription?</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-gray-600">
                    If you cancel, your account will be downgraded to the free plan at the end of
                    your billing period. You'll keep your data and connected drives (up to the free
                    plan limit). You can export all your data at any time from the Settings page.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>
        </div>
      </div>
  );
}

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  subtitle: string;
}

function ContactInfoCard({ icon, title, content, subtitle }: ContactInfoCardProps) {
  return (
    <Card
      className="p-6 text-center"
      style={{
        backdropFilter: 'blur(16px)',
        background: BORDER_COLOR,
        border: `1px solid ${BORDER_COLOR}`,
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: `${PRIMARY_COLOR}15` }}
        >
          {icon}
        </div>
        <div>
          <p className="font-semibold text-sm text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="font-bold text-lg mt-1">{content}</p>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </Card>
  );
}
