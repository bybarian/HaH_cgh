/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { resolveUrl } from '../utils/resolveUrl';

export function ModuleHeaderBanner({
  moduleId,
  title,
  desc,
  icon,
  customBanners,
}: {
  moduleId: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  customBanners: Record<string, string>;
  onUploadBanner?: (id: string, url: string) => void;
  onClearBanner?: (id: string) => void;
}) {
  const customImg = customBanners[moduleId];
  const [publicFallback, setPublicFallback] = useState<string | null>(null);

  useEffect(() => {
    const probeBanner = async () => {
      const num = moduleId.replace('module-', '');
      const candidates = [
        `/banner-module-${num}.png`,
        `/banner-module-${num}.jpg`,
        `/banner-module-${num}.jpeg`,
        `/banner-module-${num}.svg`,
        `/banner-module-${num}.webp`,
        `/banner-${num}.png`,
        `/banner-${num}.jpg`,
        `/banner-${num}.jpeg`,
        `/banner-${num}.svg`,
        `/banner-${num}.webp`,
      ];
      
      for (const src of candidates) {
        try {
          const resolvedSrc = resolveUrl(src);
          const exists = await new Promise<boolean>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = resolvedSrc;
          });
          if (exists) {
            setPublicFallback(resolvedSrc);
            return;
          }
        } catch (e) {
          // ignore
        }
      }
      setPublicFallback(null);
    };
    probeBanner();
  }, [moduleId]);

  const activeBanner = customImg || publicFallback;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#008d3e]/15 shadow-xs group mb-6">
      {activeBanner ? (
        <div className="relative w-full h-44 sm:h-52 bg-gray-100">
          <img 
            src={activeBanner} 
            alt={`${title} Banner`} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-all flex items-end p-6 justify-between">
            <div className="text-white drop-shadow">
              {customImg && (
                <span className="text-[10px] font-black tracking-widest bg-[#8ec31f] text-white px-2 py-0.5 rounded uppercase mb-1 inline-block">
                  Custom Banner Active
                </span>
              )}
              <h1 className="text-xl md:text-2xl font-black">{title}</h1>
              <p className="text-xs text-white/90 mt-1 font-semibold">{desc}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-[#008d3e] to-[#8ec31f] p-6 sm:p-8 text-white relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative z-10 flex items-center gap-4">
            <div className="p-3 bg-white/15 backdrop-blur-md rounded-xl border border-white/20 text-white hidden sm:block">
              {icon}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">{title}</h1>
              <p className="text-xs sm:text-sm text-white/90 font-medium mt-1">{desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
