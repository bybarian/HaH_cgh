/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CheckSquare, CheckCircle, Stethoscope } from 'lucide-react';
import { db } from '../services/store';
import { TranslationData } from '../i18n';
import { ModuleHeaderBanner } from './ModuleHeaderBanner';

export function VisitChecklist({ 
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
  const [items, setItems] = useState<Record<string, string>>(() => {
    const existing = db.getChecklists();
    return existing.length > 0 ? existing[existing.length - 1].items : {};
  });
  const [notes, setNotes] = useState(() => {
    const existing = db.getChecklists();
    return existing.length > 0 ? existing[existing.length - 1].notes : '';
  });
  const [saved, setSaved] = useState(false);

  const studentName = localStorage.getItem('cgh_student_name') || 'test-student';
  const patientId = localStorage.getItem('cgh_patient_chart_number') || 'P123';

  const handleSave = () => {
    db.saveChecklist({
      userId: studentName,
      patientId,
      items: {
        health: items['health'] || '',
        outlook: items['outlook'] || '',
        medication: items['medication'] || '',
        environment: items['environment'] || '',
        basicADL: items['basicADL'] || '',
        access: items['access'] || '',
        social: items['social'] || '',
        instability: items['instability'] || '',
        caregiver: items['caregiver'] || ''
      },
      notes,
      timestamp: Date.now()
    });
    setSaved(true);
  };

  const chMeta = t.checklist;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => setView('dashboard')} className="text-[#008d3e] font-bold hover:underline text-sm flex items-center gap-1">
          {t.backToHome}
        </button>
      </div>

      <ModuleHeaderBanner 
        moduleId="module-4"
        title={t.modules.m4.title}
        desc={t.modules.m4.desc}
        icon={<CheckSquare size={24} />}
        customBanners={customBanners}
        onUploadBanner={onUploadBanner}
        onClearBanner={onClearBanner}
      />

      <div className="bg-white border border-[#008d3e]/10 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="border-b border-[#008d3e]/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-[#008d3e] flex items-center gap-2">
              <Stethoscope size={22} className="text-[#8ec31f]" />
              {chMeta.title}
            </h2>
            <p className="text-xs text-[#2d3a31]/60 mt-1">{chMeta.subtitle(patientId)}</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono bg-[#f4f9f4] border border-[#008d3e]/20 px-3 py-1.5 rounded-lg text-[#008d3e]">
            <span className="font-bold">{t.studentNameLabel} {studentName}</span>
            <span>|</span>
            <span className="font-bold">{chMeta.patientIdBadge(patientId)}</span>
          </div>
        </div>

        <div className="space-y-4">
          {chMeta.items.map((dim) => {
            const char = dim.key === 'basicADL' ? 'B' : dim.key.charAt(0).toUpperCase();
            return (
              <div key={dim.key} className="border border-gray-200 rounded-xl p-4 space-y-2 hover:border-[#8ec31f] transition-all bg-gray-50/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#008d3e] text-white flex items-center justify-center text-xs font-black">
                      {char}
                    </span>
                    <span className="font-bold text-sm text-[#2d3a31]">{dim.label}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono hidden sm:inline">{dim.key}</span>
                </div>
                <input 
                  type="text"
                  value={items[dim.key] || ''}
                  onChange={(e) => setItems({...items, [dim.key]: e.target.value})}
                  placeholder={chMeta.fieldPlaceholder(dim.label)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#008d3e] bg-white transition-colors"
                />
              </div>
            );
          })}

          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-[#2d3a31] block">{chMeta.clinicalNotesLabel}</label>
            <textarea 
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={chMeta.clinicalNotesPlaceholder}
              className="w-full p-3 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#008d3e] bg-white transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <button 
            onClick={handleSave}
            className="flex-1 bg-[#008d3e] text-white py-3.5 rounded-xl font-bold hover:bg-[#007031] transition shadow-md flex items-center justify-center gap-2 text-sm"
          >
            <CheckCircle size={18} />
            {saved ? `${chMeta.saveBtn} ✔` : chMeta.saveBtn}
          </button>
          <button 
            onClick={() => setView('post-test')}
            className="bg-white border border-[#008d3e] text-[#008d3e] px-6 py-3.5 rounded-xl font-bold hover:bg-[#f4f9f4] transition text-sm"
          >
            {chMeta.proceedPostTest}
          </button>
        </div>
      </div>
    </div>
  );
}
