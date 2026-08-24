/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle, Users } from 'lucide-react';
import { TranslationData } from '../i18n';

export function HomeCareSubSection({ t }: { t: TranslationData }) {
  const meta = t.homeCareSection;
  const colors = [
    { color: 'from-green-600 to-green-500', borderColor: 'border-green-100' },
    { color: 'from-emerald-600 to-emerald-500', borderColor: 'border-emerald-100' },
    { color: 'from-teal-600 to-teal-500', borderColor: 'border-teal-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#008d3e]/10 to-[#8ec31f]/10 p-5 rounded-2xl border border-[#008d3e]/15">
        <h3 className="text-lg font-bold text-[#008d3e] flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8ec31f] animate-pulse"></span>
          {meta.badge}
        </h3>
        <p className="text-xs text-[#2d3a31]/75 mt-1 leading-relaxed">
          {meta.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {meta.categories.map((cat, idx) => {
          const style = colors[idx % colors.length];
          return (
            <div key={cat.id} className={`flex flex-col bg-white border ${style.borderColor} rounded-2xl shadow-xs hover:shadow-md transition-all overflow-hidden`}>
              <div className={`bg-gradient-to-r ${style.color} p-4 text-white flex justify-between items-center`}>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black bg-white/20 px-2.5 py-1 rounded-lg uppercase">{cat.id}</span>
                  <span className="font-extrabold text-sm">{cat.title}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black tracking-widest text-[#2d3a31]/40 uppercase">{meta.defLabel}</span>
                    <p className="text-xs font-bold text-[#2d3a31]">{cat.define}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-black tracking-widest text-emerald-600/60 uppercase">{meta.contentLabel}</span>
                    <div className="bg-[#f4f9f4]/50 border border-emerald-500/10 p-2.5 rounded-lg flex items-start gap-2">
                      <CheckCircle size={14} className="text-[#8ec31f] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#2d3a31] leading-relaxed font-semibold">{cat.desc}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black tracking-widest text-orange-600/60 uppercase">{meta.targetLabel}</span>
                    <div className="bg-orange-50/20 border border-orange-500/10 p-2.5 rounded-lg flex items-start gap-2">
                      <Users size={14} className="text-orange-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-[#2d3a31] leading-relaxed font-semibold">{cat.audience}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
