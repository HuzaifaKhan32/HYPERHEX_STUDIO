'use client';

import React, { useState } from 'react';

const ServiceCardMaster = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="w-full bg-gray-100 py-24 flex items-center justify-center">
      <div className="w-full max-w-4xl px-4">
        {/* Card Container */}
        <div
          className="relative w-full h-96 rounded-3xl bg-white shadow-xl overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Content - Left Side */}
          <div className="absolute inset-0 left-0 w-1/2 p-8 flex flex-col justify-between z-10">
            {/* Title Section */}
            <div className="flex flex-col gap-1">
              <h2 className="text-4xl font-black leading-tight text-gray-900">
                3D Product
              </h2>
              <h3 className="text-xl font-bold" style={{ color: '#15b6e8' }}>
                Visualization
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              Create stunning interactive 3D product experiences that captivate your audience
            </p>
          </div>

          {/* Right Side - 3D Object Area */}
          <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50">
            {/* 3D Placeholder */}
            <div className="w-32 h-32 rounded-2xl bg-cyan-100 border-2 border-cyan-300 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-black text-cyan-600">3D</div>
                <div className="text-xs font-bold text-cyan-500">OBJECT</div>
              </div>
            </div>
          </div>

          {/* Floating Circles - Top Right */}
          <div className="absolute top-4 right-4 w-16 h-16">
            <div className="absolute w-16 h-16 rounded-full bg-cyan-200 opacity-30"></div>
            <div className="absolute w-12 h-12 rounded-full bg-cyan-300 opacity-40 top-2 right-2"></div>
            <div className="absolute w-8 h-8 rounded-full bg-cyan-400 opacity-50 top-4 right-4 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-600"></div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="absolute bottom-6 left-8 flex items-center gap-4 z-10">
            {/* Social Buttons */}
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-900 transition-colors group">
                <div className="w-3 h-3 rounded-full bg-gray-900 group-hover:bg-white"></div>
              </button>
              <button className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-900 transition-colors group">
                <div className="w-3 h-3 rounded-full bg-gray-900 group-hover:bg-white"></div>
              </button>
              <button className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-900 transition-colors group">
                <div className="w-3 h-3 rounded-full bg-gray-900 group-hover:bg-white"></div>
              </button>
            </div>

            {/* CTA Text */}
            <button className="text-sm font-bold text-gray-900 uppercase tracking-wider hover:text-cyan-600 transition-colors">
              View More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCardMaster;
