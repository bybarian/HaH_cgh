/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, ShieldAlert } from 'lucide-react';
import { TranslationData } from '../i18n';
import { ModuleHeaderBanner } from './ModuleHeaderBanner';

export function PrepSection({ 
  setView,
  customBanners,
  onUploadBanner,
  onClearBanner,
  t
}: { 
  setView: (v: any) => void;
  customBanners: Record<string, string>;
  onUploadBanner: (id: string, url: string) => void;
  onClearBanner: (id: string) => void;
  t: TranslationData;
}) {
  const prepMeta = t.prep;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => setView('dashboard')} className="text-[#008d3e] font-bold hover:underline text-sm flex items-center gap-1">
          {t.backToHome}
        </button>
      </div>

      <ModuleHeaderBanner 
        moduleId="module-2"
        title={t.modules.m2.title}
        desc={t.modules.m2.desc}
        icon={<MapPin size={24} />}
        customBanners={customBanners}
        onUploadBanner={onUploadBanner}
        onClearBanner={onClearBanner}
      />

      <div className="bg-white border-l-4 border-[#008d3e] p-5 rounded-r-lg shadow-sm border border-[#008d3e]/10">
        <div className="flex items-center gap-2 mb-3 text-[#008d3e] font-bold">
          <ShieldAlert size={20} className="text-[#8ec31f]" />
          <span>{prepMeta.reminderTitle}</span>
        </div>
        <ul className="list-disc list-inside text-[#2d3a31]/80 text-sm space-y-2 leading-relaxed">
          {prepMeta.reminders.map((rem, idx) => (
            <li key={idx}>{rem}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#008d3e]">
          <span className="bg-[#8ec31f]/10 text-[#008d3e] p-1.5 rounded-md px-2.5 border border-[#008d3e]/20">HOME BASIC</span>
          {prepMeta.homeBasicTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prepMeta.homeBasicItems.map((item) => (
            <div key={item.char} className="bg-white p-4 rounded-xl border border-[#008d3e]/10 shadow-sm hover:border-[#8ec31f] transition-all">
              <div className="text-2xl font-black text-[#008d3e] mb-1">{item.char}</div>
              <h4 className="font-bold text-[#2d3a31] text-sm mb-1">{item.title}</h4>
              <p className="text-[#2d3a31]/60 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={() => setView('pre-test')}
        className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#007031] transition shadow-lg shadow-[#008d3e]/20"
      >
        {prepMeta.readyBtn}
      </button>
    </div>
  );
}
