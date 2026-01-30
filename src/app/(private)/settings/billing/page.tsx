'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Download,
  Crown,
  Check,
  ArrowUpRight,
  Calendar,
  Receipt,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';

const PRIMARY_COLOR = '#6B9ADF';
const BORDER_COLOR = 'rgba(107, 154, 223, 0.3)';

const currentPlan = {
  name: 'Pro',
  price: '$9.99',
  period: 'month',
  features: [
    'Up to 5 connected drives',
    'Advanced analytics',
    '100,000 files limit',
    'AI-powered search',
    'Priority support',
  ],
  usage: {
    drives: { used: 3, limit: 5 },
    files: { used: 45000, limit: 100000 },
  },
  nextBillingDate: '2024-02-15',
};

const billingHistory = [
  {
    id: '1',
    date: '2024-01-15',
    description: 'Pro Plan - Monthly',
    amount: '$9.99',
    status: 'paid',
    invoice: '#INV-2024-001',
  },
  {
    id: '2',
    date: '2023-12-15',
    description: 'Pro Plan - Monthly',
    amount: '$9.99',
    status: 'paid',
    invoice: '#INV-2023-012',
  },
  {
    id: '3',
    date: '2023-11-15',
    description: 'Pro Plan - Monthly',
    amount: '$9.99',
    status: 'paid',
    invoice: '#INV-2023-011',
  },
  {
    id: '4',
    date: '2023-10-15',
    description: 'Basic to Pro Upgrade',
    amount: '$5.00',
    status: 'paid',
    invoice: '#INV-2023-010',
  },
];

const paymentMethods = [
  {
    id: '1',
    type: 'card',
    brand: 'Visa',
    last4: '4242',
    expiry: '12/25',
    isDefault: true,
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <Card
        style={{
          border: `1px solid ${BORDER_COLOR}`,
          background: `linear-gradient(135deg, ${PRIMARY_COLOR}10 0%, ${PRIMARY_COLOR}05 100%)`,
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Crown size={20} style={{ color: PRIMARY_COLOR }} />
                Current Plan
              </CardTitle>
              <CardDescription>
                Manage your subscription and billing details
              </CardDescription>
            </div>
            <Badge
              className="text-white font-semibold px-4 py-1"
              style={{ background: PRIMARY_COLOR }}
            >
              <Sparkles size={14} className="mr-1" />
              {currentPlan.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-4xl font-bold" style={{ color: PRIMARY_COLOR }}>
                {currentPlan.price}
                <span className="text-lg font-normal text-muted-foreground">
                  /{currentPlan.period}
                </span>
              </p>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <Calendar size={14} />
                Next billing date: {currentPlan.nextBillingDate}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" style={{ borderColor: BORDER_COLOR }}>
                Cancel Subscription
              </Button>
              <Button asChild style={{ background: PRIMARY_COLOR }}>
                <Link href="/price">
                  <ArrowUpRight size={16} className="mr-2" />
                  Upgrade Plan
                </Link>
              </Button>
            </div>
          </div>

          {/* Plan Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
            <div>
              <p className="text-sm font-semibold mb-3">Plan Features</p>
              <ul className="space-y-2">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check size={16} style={{ color: PRIMARY_COLOR }} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold">Usage</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Connected Drives</span>
                    <span className="font-medium">
                      {currentPlan.usage.drives.used}/{currentPlan.usage.drives.limit}
                    </span>
                  </div>
                  <Progress
                    value={
                      (currentPlan.usage.drives.used / currentPlan.usage.drives.limit) * 100
                    }
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Indexed Files</span>
                    <span className="font-medium">
                      {currentPlan.usage.files.used.toLocaleString()}/
                      {currentPlan.usage.files.limit.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={
                      (currentPlan.usage.files.used / currentPlan.usage.files.limit) * 100
                    }
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card style={{ border: `1px solid ${BORDER_COLOR}` }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard size={20} style={{ color: PRIMARY_COLOR }} />
                Payment Methods
              </CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </div>
            <Button variant="outline" size="sm" style={{ borderColor: BORDER_COLOR }}>
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 rounded-lg"
              style={{
                background: `${PRIMARY_COLOR}08`,
                border: `1px solid ${BORDER_COLOR}`,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-8 rounded flex items-center justify-center"
                  style={{ background: PRIMARY_COLOR }}
                >
                  <CreditCard size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">
                    {method.brand} ending in {method.last4}
                  </p>
                  <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {method.isDefault && (
                  <Badge variant="secondary">Default</Badge>
                )}
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card style={{ border: `1px solid ${BORDER_COLOR}` }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt size={20} style={{ color: PRIMARY_COLOR }} />
            Billing History
          </CardTitle>
          <CardDescription>View and download your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="font-mono text-sm">{item.invoice}</TableCell>
                  <TableCell className="text-right font-semibold">{item.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 capitalize"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
