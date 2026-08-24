/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ClipboardCheck, Sparkles, CheckCircle } from 'lucide-react';
import { db } from '../services/store';
import { TranslationData } from '../i18n';
import { ModuleHeaderBanner } from './ModuleHeaderBanner';

export function PostTestSection({ 
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
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, any>>({
    selected_domains: ['tech', 'team', 'comm']
  });
  const [completed, setCompleted] = useState(false);

  const handleDomainToggle = (id: string) => {
    const current = answers['selected_domains'] || [];
    if (current.includes(id)) {
      if (current.length <= 1) {
        alert('Please select at least 1 domain.');
        return;
      }
      setAnswers({ ...answers, selected_domains: current.filter((d: string) => d !== id) });
    } else {
      if (current.length >= 3) {
        alert('You can select up to 3 domains.');
        return;
      }
      setAnswers({ ...answers, selected_domains: [...current, id] });
    }
  };

  const handleSubmit = () => {
    const sName = localStorage.getItem('cgh_student_name') || 'test-student';
    db.saveResult({
      userId: sName,
      testId: 'post-reflection',
      answers,
      timestamp: Date.now()
    });
    setCompleted(true);
  };

  const postMeta = t.postTest;

  const stepTitles = [
    postMeta.step1Title,
    postMeta.step2Title,
    postMeta.step3Title,
    postMeta.step4Title,
    postMeta.step5Title
  ];

  if (completed) {
    return (
      <div className="text-center py-12 space-y-6 bg-white border border-[#008d3e]/10 rounded-2xl p-8 max-w-xl mx-auto shadow-sm">
        <div className="inline-block p-4 bg-[#f4f9f4] text-[#008d3e] rounded-full mb-2 shadow-sm border border-[#008d3e]/10 animate-bounce">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-2xl font-bold text-[#008d3e]">{postMeta.completeTitle}</h2>
        <p className="text-[#2d3a31]/70 text-sm max-w-md mx-auto leading-relaxed">
          {postMeta.completeDesc}
        </p>
        <button 
          onClick={() => setView('dashboard')}
          className="bg-[#008d3e] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#007031] shadow-lg shadow-[#008d3e]/20 transition-all text-sm"
        >
          {postMeta.backToDashboardBtn}
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
        moduleId="module-5"
        title={t.modules.m5.title}
        desc={t.modules.m5.desc}
        icon={<ClipboardCheck size={24} />}
        customBanners={customBanners}
        onUploadBanner={onUploadBanner}
        onClearBanner={onClearBanner}
      />

      <div className="max-w-2xl mx-auto bg-white border border-[#008d3e]/10 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Step Wizard Nav */}
        <div className="flex items-center justify-between border-b border-[#008d3e]/10 pb-4 overflow-x-auto gap-2 no-scrollbar">
          {stepTitles.map((st, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setStep(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                step === idx
                  ? 'bg-[#008d3e] text-white shadow-sm'
                  : 'bg-[#f4f9f4] text-[#2d3a31]/60 hover:bg-[#8ec31f]/20'
              }`}
            >
              <span>{idx + 1}.</span>
              <span>{st}</span>
            </button>
          ))}
        </div>

        {/* Step 0: Confidence Questions */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="border-b border-[#008d3e]/10 pb-3">
              <span className="text-[10px] font-black tracking-widest bg-[#008d3e]/10 text-[#008d3e] px-2 py-0.5 rounded-full uppercase">
                {postMeta.step1Tag}
              </span>
              <h3 className="text-lg font-bold text-[#008d3e] mt-1">{postMeta.step1Title}</h3>
              <p className="text-xs text-[#2d3a31]/60">{postMeta.step1Desc}</p>
            </div>
            <div className="space-y-5">
              {t.confidenceQuestions.map((q) => (
                <div key={q.id} className="space-y-2">
                  <p className="font-bold text-[#2d3a31] text-sm leading-relaxed">{q.text}</p>
                  <div className="flex justify-between gap-1.5 md:gap-2">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAnswers({...answers, [q.id]: val})}
                        className={`flex-1 py-3 rounded-lg border border-[#008d3e]/10 font-bold transition text-sm ${
                          answers[q.id] === val ? 'bg-[#008d3e] border-[#008d3e] text-white shadow-md' : 'hover:bg-[#8ec31f]/10 bg-gray-50 text-[#2d3a31]/60'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-semibold px-1">
                    <span>{t.preTest.confScale1}</span>
                    <span>{t.preTest.confScale5}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: 5 Core Competencies Evaluation */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="border-b border-[#008d3e]/10 pb-3">
              <span className="text-[10px] font-black tracking-widest bg-[#008d3e]/10 text-[#008d3e] px-2 py-0.5 rounded-full uppercase">
                {postMeta.step2Tag}
              </span>
              <h3 className="text-lg font-bold text-[#008d3e] mt-1">{postMeta.step2Title}</h3>
              <p className="text-xs text-[#2d3a31]/60">{postMeta.step2Desc}</p>
            </div>
            <div className="space-y-5">
              {t.evalDomains.map((dom) => (
                <div key={dom.id} className="space-y-2 border border-gray-100 p-4 rounded-xl bg-gray-50/50">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-xs text-[#2d3a31]">{dom.label}</p>
                    <span className="text-[11px] font-bold text-[#008d3e] bg-[#f4f9f4] px-2 py-0.5 rounded">
                      {answers[dom.id] ? `${answers[dom.id]} pts` : t.unfilled}
                    </span>
                  </div>
                  <div className="flex justify-between gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAnswers({...answers, [dom.id]: val})}
                        className={`flex-1 py-2 rounded-lg border font-bold transition text-xs ${
                          answers[dom.id] === val
                            ? 'bg-[#008d3e] border-[#008d3e] text-white shadow-sm'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-[#8ec31f]'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-semibold px-1">
                    <span>1: {postMeta.step2NotYet}</span>
                    <span>5: {postMeta.step2Independent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Deep Reflection */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="border-b border-[#008d3e]/10 pb-3">
              <span className="text-[10px] font-black tracking-widest bg-[#008d3e]/10 text-[#008d3e] px-2 py-0.5 rounded-full uppercase">
                {postMeta.step3Tag}
              </span>
              <h3 className="text-lg font-bold text-[#008d3e] flex items-center gap-2 mt-1">
                <Sparkles size={18} className="text-[#8ec31f]" />
                {postMeta.step3Title}
              </h3>
              <p className="text-xs text-[#2d3a31]/60 mt-1">{postMeta.step3Desc}</p>
            </div>

            {/* Domain Selection Badges */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2d3a31] block">{postMeta.step3PickerLabel}</label>
              <div className="flex flex-wrap gap-2">
                {t.deepReflectionDomains.map(dom => {
                  const isSelected = (answers['selected_domains'] || []).includes(dom.id);
                  return (
                    <button
                      key={dom.id}
                      type="button"
                      onClick={() => handleDomainToggle(dom.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? 'bg-[#008d3e] text-white border-[#008d3e] shadow-sm'
                          : 'bg-white text-[#2d3a31]/70 border-gray-200 hover:border-[#8ec31f]'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '} {dom.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Questions for Selected Domains */}
            <div className="space-y-6 pt-2">
              {(answers['selected_domains'] || []).map((domId: string) => {
                const domObj = t.deepReflectionDomains.find(d => d.id === domId);
                return (
                  <div key={domId} className="border border-[#008d3e]/20 rounded-2xl p-5 bg-[#f4f9f4]/30 space-y-4">
                    <h4 className="font-bold text-sm text-[#008d3e] border-b border-[#008d3e]/10 pb-2">
                      ✦ {domObj?.label}
                    </h4>
                    {t.deepReflectionQuestions.map((q) => {
                      const fieldKey = `deep_${domId}_${q.id}`;
                      return (
                        <div key={q.id} className="space-y-1.5">
                          <label className="text-xs font-bold text-[#2d3a31] block">
                            {q.label}
                          </label>
                          <textarea
                            rows={3}
                            value={answers[fieldKey] || ''}
                            onChange={(e) => setAnswers({...answers, [fieldKey]: e.target.value})}
                            placeholder={postMeta.step3Placeholder}
                            className="w-full p-3 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#008d3e] bg-white transition-colors"
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Free Reflection & One-Sentence Summary */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="border-b border-[#008d3e]/10 pb-3">
              <span className="text-[10px] font-black tracking-widest bg-[#008d3e]/10 text-[#008d3e] px-2 py-0.5 rounded-full uppercase">
                {postMeta.step4Tag}
              </span>
              <h3 className="text-lg font-bold text-[#008d3e] mt-1">{postMeta.step4Title}</h3>
              <p className="text-xs text-[#2d3a31]/60">{postMeta.step4Desc}</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2d3a31] block">
                  {postMeta.qFreeReflection}
                </label>
                <textarea
                  rows={4}
                  value={answers['free_reflection'] || ''}
                  onChange={(e) => setAnswers({...answers, free_reflection: e.target.value})}
                  placeholder={postMeta.qFreeReflectionPlaceholder}
                  className="w-full p-3 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#008d3e] bg-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2d3a31] block">
                  {postMeta.qOneSentence}
                </label>
                <textarea
                  rows={3}
                  value={answers['one_sentence_summary'] || ''}
                  onChange={(e) => setAnswers({...answers, one_sentence_summary: e.target.value})}
                  placeholder={postMeta.qOneSentencePlaceholder}
                  className="w-full p-3 border border-gray-300 rounded-lg text-xs outline-none focus:border-[#008d3e] bg-white transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Emotional & Cognitive Load */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="border-b border-[#008d3e]/10 pb-3">
              <span className="text-[10px] font-black tracking-widest bg-[#008d3e]/10 text-[#008d3e] px-2 py-0.5 rounded-full uppercase">
                {postMeta.step5Tag}
              </span>
              <h3 className="text-lg font-bold text-[#008d3e] mt-1">{postMeta.step5Title}</h3>
              <p className="text-xs text-[#2d3a31]/60">{postMeta.step5Desc}</p>
            </div>
            <div className="space-y-5">
              <p className="text-xs font-bold text-[#008d3e]">{postMeta.step5FreqPrompt}</p>
              {t.emotionItems.map((emo) => (
                <div key={emo.id} className="space-y-2 border border-gray-100 p-4 rounded-xl bg-gray-50/50">
                  <p className="font-bold text-xs text-[#2d3a31]">{emo.label}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {t.emotionFrequency.map(freq => (
                      <button
                        key={freq.val}
                        type="button"
                        onClick={() => setAnswers({...answers, [`emotion_${emo.id}`]: freq.val})}
                        className={`py-2 px-1 rounded-lg border text-xs font-bold transition text-center ${
                          (answers[`emotion_${emo.id}`] || 3) === freq.val
                            ? 'bg-[#008d3e] border-[#008d3e] text-white shadow-sm'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-[#8ec31f]'
                        }`}
                      >
                        {freq.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition ${
              step === 0 
                ? 'border-gray-200 text-gray-300 bg-gray-100 cursor-not-allowed opacity-50' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            ← {t.prevStep}
          </button>

          <span className="text-xs font-bold text-[#2d3a31]/40">
            {postMeta.stepsIndicator(step + 1, 5)}
          </span>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="bg-[#008d3e] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#007031] transition shadow-md"
            >
              {postMeta.nextPageBtn} →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#008d3e] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#007031] transition shadow-lg shadow-[#008d3e]/20"
            >
              {postMeta.submitTrainingBtn}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
