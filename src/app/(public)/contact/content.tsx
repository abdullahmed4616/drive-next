'use client';

import React, { useState } from 'react';
import { Check, Mail } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Card } from "@/app/components/ui/card";

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

          <div className="flex flex-col items-center gap-2 mt-16 text-center">
            <p className="text-lg font-semibold flex items-center gap-2">
              <Mail size={24} style={{ color: PRIMARY_COLOR }} /> Email us at contact@driveunity.com
            </p>
            <p className="text-gray-600">We aim to respond within 24 hours.</p>
          </div>
        </div>
      </div>
  );
}
