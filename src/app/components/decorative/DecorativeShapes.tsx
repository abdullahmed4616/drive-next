'use client';

import React from 'react';

export const DecorativeShapes: React.FC = () => {
  return (
    <>
      {/* Abstract shapes for visual interest */}
      <svg
        className="absolute top-20 right-10 opacity-10 animate-spin-slow"
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 0C100 55.2285 55.2285 100 0 100C55.2285 100 100 144.772 100 200C100 144.772 144.772 100 200 100C144.772 100 100 55.2285 100 0Z"
          fill="url(#gradient1)"
        />
        <defs>
          <linearGradient id="gradient1" x1="0" y1="0" x2="200" y2="200">
            <stop offset="0%" stopColor="#6B9ADF" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Organic blob shape */}
      <svg
        className="absolute bottom-20 left-10 opacity-10 animate-pulse-slow"
        width="250"
        height="250"
        viewBox="0 0 250 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M125 0C194.036 0 250 55.9644 250 125C250 194.036 194.036 250 125 250C55.9644 250 0 194.036 0 125C0 55.9644 55.9644 0 125 0Z"
          fill="url(#gradient2)"
        />
        <defs>
          <radialGradient id="gradient2">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
          </radialGradient>
        </defs>
      </svg>

      {/* Hexagon pattern */}
      <svg
        className="absolute top-1/2 right-20 opacity-5 animate-float-slow"
        width="150"
        height="150"
        viewBox="0 0 150 150"
      >
        <path
          d="M75 0L145 37.5V112.5L75 150L5 112.5V37.5L75 0Z"
          fill="currentColor"
          className="text-purple-500"
        />
      </svg>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.15;
            transform: scale(1.05);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};
