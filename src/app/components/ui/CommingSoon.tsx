import React from 'react';
import { Rocket } from 'lucide-react';

export default function ComingSoonPage() {
    return (
        <div
            className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            }}
        >
            <div
                className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full blur-[60px]"
                style={{
                    background: 'rgba(107, 154, 223, 0.1)',
                }}
            />
            <div
                className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full blur-[80px]"
                style={{
                    background: 'rgba(107, 154, 223, 0.08)',
                }}
            />

            <div className="container max-w-2xl relative z-10">
                <div className="flex flex-col items-center gap-8">
                    <div
                        className="w-[100px] h-[100px] rounded-full flex items-center justify-center border"
                        style={{
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            borderColor: 'rgba(255, 255, 255, 0.18)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
                        }}
                    >
                        <Rocket size={50} color="#6B9ADF" />
                    </div>

                    <h1
                        className="text-6xl md:text-7xl font-extrabold text-center"
                        style={{
                            color: '#6B9ADF',
                            letterSpacing: '-2px',
                            textShadow: '0 4px 20px rgba(107, 154, 223, 0.2)'
                        }}
                    >
                        Coming Soon
                    </h1>

                    <p
                        className="text-xl text-center max-w-[600px] leading-relaxed"
                        style={{
                            color: '#718096',
                        }}
                    >
                        We're working on something amazing. Stay tuned!
                    </p>
                </div>
            </div>
        </div>
    );
}
