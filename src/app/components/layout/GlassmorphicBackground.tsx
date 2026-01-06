'use client';

import React from 'react';

interface GlassmorphicBackgroundProps {
  variant?: 'primary' | 'secondary' | 'gradient';
  children: React.ReactNode;
}

export const GlassmorphicBackground: React.FC<GlassmorphicBackgroundProps> = ({
  variant = 'primary',
  children,
}) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient-shift" />

      {/* Glassmorphic orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large orb - top right */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-30 blur-3xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(107, 154, 223, 0.4), rgba(107, 154, 223, 0.1))',
            animationDelay: '0s',
            animationDuration: '20s',
          }}
        />

        {/* Medium orb - top left */}
        <div
          className="absolute top-20 -left-32 w-80 h-80 rounded-full opacity-25 blur-3xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4), rgba(168, 85, 247, 0.1))',
            animationDelay: '2s',
            animationDuration: '18s',
          }}
        />

        {/* Small orb - middle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4), rgba(236, 72, 153, 0.1))',
            animationDelay: '4s',
            animationDuration: '22s',
          }}
        />

        {/* Bottom orb */}
        <div
          className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full opacity-25 blur-3xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.1))',
            animationDelay: '6s',
            animationDuration: '24s',
          }}
        />

        {/* Decorative dots pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Global animations */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
