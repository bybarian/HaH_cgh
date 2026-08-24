/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HelpCircle, ClipboardCheck } from 'lucide-react';
import { db } from '../services/store';
import { TranslationData } from '../i18n';
import { ModuleHeaderBanner } from './ModuleHeaderBanner';

export function PreTestSection({ 
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
  const [step, setStep] = useState<'quiz' | 'confidence'>('quiz');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [finished, setFinished] = useState(false);

  const handleQuizSubmit = () => {
    setStep('confidence');
  };

  const handleConfidenceSubmit = () => {
    const sName = localStorage.getItem('cgh_student_name') || 'test-user';
    db.saveResult({
      userId: sName,
      testId: 'pre-quiz',
      answers,
      timestamp: Date.now()
    });
    setFinished(true);
  };

  const preMeta = t.preTest;

  if (finished) {
    return (
      <div className="text-center py-12 space-y-6 bg-white border border-[#008d3e]/10 rounded-2xl p-8 max-w-xl mx-auto shadow-sm">
        <div className="inline-block p-4 bg-[#f4f9f4] text-[#008d3e] rounded-full mb-2 shadow-sm border border-[#008d3e]/10 animate-bounce">
          <ClipboardCheck size={48} />
        </div>
        <h2 className="text-2xl font-bold text-[#008d3e]">{preMeta.completeTitle}</h2>
        <p className="text-[#2d3a31]/60 text-sm max-w-sm mx-auto leading-relaxed">
          {preMeta.completeDesc}
        </p>
        <button 
          onClick={() => setView('checklist')}
          className="bg-[#008d3e] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#007031] shadow-lg shadow-[#008d3e]/20 transition-all text-sm"
        >
          {preMeta.proceedChecklist}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => setView('dashboard')} className="text-[#008d3e] font-bold hover:underline text-sm flex items-center gap-1">
          {t.backToHome}
        </button>
      </div>

      <ModuleHeaderBanner 
        moduleId="module-3"
        title={t.modules.m3.title}
        desc={t.modules.m3.desc}
        icon={<HelpCircle size={24} />}
        customBanners={customBanners}
        onUploadBanner={onUploadBanner}
        onClearBanner={onClearBanner}
      />

      <div className="max-w-2xl mx-auto space-y-8 bg-white border border-[#008d3e]/10 rounded-2xl p-8 shadow-sm">
        {step === 'quiz' ? (
          <>
            <div className="border-b border-[#008d3e]/10 pb-4">
              <h2 className="text-2xl font-bold text-[#008d3e]">{preMeta.quizTitle}</h2>
              <p className="text-xs text-gray-500 mt-1">{preMeta.quizDesc}</p>
            </div>
            <div className="space-y-6">
              {t.preQuizQuestions.map((q, i) => (
                <div key={q.id} className="space-y-3">
                  <p className="font-bold text-[#2d3a31] text-sm">{i + 1}. {q.text}</p>
                  <div className="space-y-2">
                    {q.options?.map(opt => (
                      <label key={opt} className="flex items-center gap-3 p-4 border border-[#008d3e]/10 rounded-lg hover:bg-[#f4f9f4] cursor-pointer transition shadow-sm">
                        <input 
                          type="radio" 
                          name={q.id} 
                          value={opt} 
                          checked={answers[q.id] === opt}
                          onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                          className="w-4 h-4 text-[#008d3e] accent-[#008d3e]"
                        />
                        <span className="text-[#2d3a31] text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button 
                onClick={handleQuizSubmit} 
                className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold hover:bg-[#007031] transition-colors shadow-md text-sm"
              >
                {preMeta.nextConfidence}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="border-b border-[#008d3e]/10 pb-4">
              <h2 className="text-2xl font-bold text-[#008d3e]">{preMeta.confTitle}</h2>
              <p className="text-xs text-[#2d3a31]/60 italic font-semibold mt-1">{preMeta.confDesc}</p>
            </div>
            <div className="space-y-6">
              {t.confidenceQuestions.map((q) => (
                <div key={q.id} className="space-y-3">
                  <p className="font-bold text-[#2d3a31] text-sm leading-relaxed">{q.text}</p>
                  <div className="flex justify-between gap-1.5 md:gap-2">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAnswers({...answers, [q.id]: val})}
                        className={`flex-1 py-3.5 rounded-lg border border-[#008d3e]/10 font-bold transition text-sm ${
                          answers[q.id] === val ? 'bg-[#008d3e] border-[#008d3e] text-white shadow-md' : 'hover:bg-[#8ec31f]/10 bg-gray-50 text-[#2d3a31]/60'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-semibold px-1">
                    <span>{preMeta.confScale1}</span>
                    <span>{preMeta.confScale5}</span>
                  </div>
                </div>
              ))}
              <button 
                onClick={handleConfidenceSubmit} 
                className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold hover:bg-[#007031] shadow-lg shadow-[#008d3e]/20 transition-all text-sm"
              >
                {preMeta.submitBtn}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
