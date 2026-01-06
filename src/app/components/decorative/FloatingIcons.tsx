'use client';

import React from 'react';
import { Cloud, FileText, Folder, Image, Film, Music, FileCode, Database } from 'lucide-react';

export const FloatingIcons: React.FC = () => {
  const icons = [
    { Icon: Cloud, delay: '0s', duration: '25s', top: '10%', left: '10%' },
    { Icon: FileText, delay: '2s', duration: '22s', top: '20%', right: '15%' },
    { Icon: Folder, delay: '4s', duration: '28s', top: '60%', left: '5%' },
    { Icon: Image, delay: '1s', duration: '24s', top: '75%', right: '20%' },
    { Icon: Film, delay: '3s', duration: '26s', top: '40%', left: '85%' },
    { Icon: Music, delay: '5s', duration: '23s', top: '85%', left: '45%' },
    { Icon: FileCode, delay: '2.5s', duration: '27s', top: '30%', right: '8%' },
    { Icon: Database, delay: '4.5s', duration: '25s', top: '50%', left: '70%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map(({ Icon, delay, duration, ...position }, index) => (
        <div
          key={index}
          className="absolute opacity-10"
          style={{
            ...position,
            animation: `float-icon ${duration} ease-in-out infinite`,
            animationDelay: delay,
          }}
        >
          <Icon size={40} className="text-primary" strokeWidth={1.5} />
        </div>
      ))}

      <style jsx>{`
        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
};
