'use client';

import React, { useState } from 'react';
import {
  Container,
  Flex,
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  Notification,
  Paper,
} from '@mantine/core';
import { IconCheck, IconMail } from '@tabler/icons-react';

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
      <Flex
          direction="column"
          align="center"
          style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 80 }}
      >
        <Container size="lg">
          <Flex direction="column" align="center" gap="md" mb={60} style={{ textAlign: 'center' }}>
            <Title order={1} style={{ fontSize: 48, fontWeight: 800 }}>
              Get in <span style={gradientText}>Touch</span>
            </Title>
            <Text size="lg" c="dimmed" maw={700}>
              Have questions, feedback, or want to collaborate? Fill out the form below and we'll get back to you
              as soon as possible.
            </Text>
          </Flex>

          <Paper
              shadow="xl"
              radius="md"
              p="xl"
              style={{
                backdropFilter: 'blur(16px)',
                background: BORDER_COLOR,
                border: `1px solid ${BORDER_COLOR}`,
              }}
          >
            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="md">
                <TextInput
                    placeholder="Your Name"
                    label="Name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    styles={{
                      input: {
                        borderColor: BORDER_COLOR,
                        '&:focus': {
                          borderColor: PRIMARY_COLOR,
                        }
                      }
                    }}
                />
                <TextInput
                    placeholder="Your Email"
                    label="Email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    styles={{
                      input: {
                        borderColor: BORDER_COLOR,
                        '&:focus': {
                          borderColor: PRIMARY_COLOR,
                        }
                      }
                    }}
                />
                <TextInput
                    placeholder="Subject"
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    styles={{
                      input: {
                        borderColor: BORDER_COLOR,
                        '&:focus': {
                          borderColor: PRIMARY_COLOR,
                        }
                      }
                    }}
                />
                <Textarea
                    placeholder="Your Message"
                    label="Message"
                    name="message"
                    minRows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    styles={{
                      input: {
                        borderColor: BORDER_COLOR,
                        '&:focus': {
                          borderColor: PRIMARY_COLOR,
                        }
                      }
                    }}
                />
                <Group justify="center" mt="xl">
                  <Button
                      type="submit"
                      size="lg"
                      style={{
                        backgroundColor: PRIMARY_COLOR,
                        '&:hover': {
                          backgroundColor: PRIMARY_COLOR,
                          opacity: 0.9,
                        }
                      }}
                  >
                    Send Message
                  </Button>
                </Group>
              </Flex>
            </form>

            {submitted && (
                <Notification
                    icon={<IconCheck size={18} />}
                    color="teal"
                    mt="md"
                    onClose={() => setSubmitted(false)}
                    style={{
                      borderColor: BORDER_COLOR,
                    }}
                >
                  Your message has been sent successfully!
                </Notification>
            )}
          </Paper>

          <Flex direction="column" align="center" gap="sm" mt={60} style={{ textAlign: 'center' }}>
            <Text size="lg" fw={600} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconMail size={24} style={{ color: PRIMARY_COLOR }} /> Email us at contact@driveunity.com
            </Text>
            <Text c="dimmed">We aim to respond within 24 hours.</Text>
          </Flex>
        </Container>
      </Flex>
  );
}