'use client';

import { useEffect, useState } from 'react';

interface CloudProps {
  className?: string;
  style?: React.CSSProperties;
}

// Decorative cloud SVG component
const CloudShape = ({ className = '', style = {} }: CloudProps) => (
  <svg
    viewBox="0 0 200 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M165 90H45c-22.091 0-40-17.909-40-40 0-19.33 13.716-35.465 31.946-39.203C42.254 4.525 51.334 0 61.5 0c13.807 0 25.686 8.062 31.295 19.73C98.136 16.15 104.819 14 112 14c18.225 0 33.266 13.612 35.503 31.217A35.108 35.108 0 0 1 155 44c22.091 0 40 17.909 40 40s-17.909 46-40 46H45"
      fill="currentColor"
      fillOpacity="0.08"
    />
  </svg>
);

const SmallCloud = ({ className = '', style = {} }: CloudProps) => (
  <svg
    viewBox="0 0 120 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M97.5 60H26.25c-13.255 0-24-10.745-24-24 0-11.598 8.23-21.279 19.168-23.522C24.252 5.535 30.39 0 37.2 0c8.284 0 15.412 4.838 18.777 11.838C58.882 9.69 63.191 8.4 67.8 8.4c10.935 0 19.96 8.168 21.302 18.73A21.065 21.065 0 0 1 93 27.6c13.255 0 24 10.745 24 24s-10.745 27.6-24 27.6H26.25"
      fill="currentColor"
      fillOpacity="0.06"
    />
  </svg>
);

interface CloudBackgroundProps {
  variant?: 'default' | 'subtle' | 'hero' | 'minimal';
  className?: string;
  showFloatingClouds?: boolean;
}

export function CloudBackground({
  variant = 'default',
  className = '',
  showFloatingClouds = true
}: CloudBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const variants = {
    default: {
      opacity: 1,
      blur: 'blur-3xl',
    },
    subtle: {
      opacity: 0.5,
      blur: 'blur-3xl',
    },
    hero: {
      opacity: 1,
      blur: 'blur-2xl',
    },
    minimal: {
      opacity: 0.3,
      blur: 'blur-3xl',
    },
  };

  const config = variants[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary gradient orb - top right */}
      <div
        className={`absolute -top-32 -right-32 w-96 h-96 rounded-full ${config.blur} opacity-20`}
        style={{
          background: 'hsl(var(--primary))',
        }}
      />

      {/* Secondary gradient orb - bottom left */}
      <div
        className={`absolute -bottom-24 -left-24 w-80 h-80 rounded-full ${config.blur} opacity-15`}
        style={{
          background: 'hsl(var(--secondary))',
        }}
      />

      {/* Accent orb - center */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full ${config.blur} opacity-10`}
        style={{
          background: 'hsl(var(--primary))',
        }}
      />

      {/* Floating cloud decorations */}
      {showFloatingClouds && (
        <>
          <CloudShape
            className="absolute top-20 right-10 w-48 h-28 text-primary/30 animate-float-slow"
            style={{ animationDelay: '0s' }}
          />
          <SmallCloud
            className="absolute bottom-32 left-20 w-32 h-20 text-secondary/25 animate-float"
            style={{ animationDelay: '2s' }}
          />
          <CloudShape
            className="absolute top-1/3 left-10 w-24 h-14 text-primary/20 animate-float-fast"
            style={{ animationDelay: '1s' }}
          />
          <SmallCloud
            className="absolute bottom-20 right-32 w-40 h-24 text-secondary/20 animate-float-slow"
            style={{ animationDelay: '3s' }}
          />
        </>
      )}

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

// Page header with cloud theme
interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, children, className = '' }: PageHeaderProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-cloud p-8 md:p-10 ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
        <CloudShape className="absolute top-4 right-8 w-32 h-20 text-white/20 animate-float-slow" />
        <SmallCloud className="absolute bottom-4 left-8 w-24 h-14 text-white/15 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-white/90 text-lg max-w-2xl">
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}

// Card with cloud decoration
interface CloudCardProps {
  children: React.ReactNode;
  className?: string;
  showDecoration?: boolean;
}

export function CloudCard({ children, className = '', showDecoration = true }: CloudCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm ${className}`}>
      {showDecoration && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-secondary/5 blur-2xl" />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Empty state with cloud illustration
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function CloudEmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-border bg-muted/30 p-12 text-center ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <CloudShape className="absolute top-8 right-12 w-24 h-14 text-muted-foreground/20 animate-float-slow" />
        <SmallCloud className="absolute bottom-8 left-12 w-20 h-12 text-muted-foreground/15 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {icon && (
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
        </div>
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}

export default CloudBackground;
