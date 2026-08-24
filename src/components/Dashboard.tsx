/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  BookOpen, 
  MapPin, 
  HelpCircle, 
  CheckSquare, 
  ClipboardCheck, 
  ChevronRight, 
  Download 
} from 'lucide-react';
import { View } from '../types';
import { TranslationData } from '../i18n';

export function Dashboard({ 
  setView,
  studentName,
  setStudentName,
  patientChartNumber,
  setPatientChartNumber,
  visitDate,
  setVisitDate,
  learningStepStatus,
  handleExportAndEmail,
  heroBg,
  t
}: { 
  setView: (v: View) => void;
  studentName: string;
  setStudentName: (v: string) => void;
  patientChartNumber: string;
  setPatientChartNumber: (v: string) => void;
  visitDate: string;
  setVisitDate: (v: string) => void;
  learningStepStatus: { preQuiz: boolean, checklist: boolean, postReflection: boolean };
  handleExportAndEmail: (name: string, date: string) => void;
  heroBg: string | null;
  t: TranslationData;
}) {
  const cards = [
    { 
      id: 'module-1', 
      title: t.modules.m1.title, 
      icon: <BookOpen className="text-[#008d3e]" />, 
      desc: t.modules.m1.desc, 
      view: 'knowledge' as View, 
      category: t.modules.m1.category, 
      completed: true 
    },
    { 
      id: 'module-2', 
      title: t.modules.m2.title, 
      icon: <MapPin className="text-[#8ec31f]" />, 
      desc: t.modules.m2.desc, 
      view: 'prep' as View, 
      category: t.modules.m2.category, 
      completed: true 
    },
    { 
      id: 'module-3', 
      title: t.modules.m3.title, 
      icon: <HelpCircle className="text-[#008d3e]" />, 
      desc: t.modules.m3.desc, 
      view: 'pre-test' as View, 
      category: t.modules.m3.category, 
      completed: learningStepStatus.preQuiz 
    },
    { 
      id: 'module-4', 
      title: t.modules.m4.title, 
      icon: <CheckSquare className="text-[#8ec31f]" />, 
      desc: t.modules.m4.desc, 
      view: 'checklist' as View, 
      category: t.modules.m4.category, 
      completed: learningStepStatus.checklist 
    },
    { 
      id: 'module-5', 
      title: t.modules.m5.title, 
      icon: <ClipboardCheck className="text-[#008d3e]" />, 
      desc: t.modules.m5.desc, 
      view: 'post-test' as View, 
      category: t.modules.m5.category, 
      completed: learningStepStatus.postReflection 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div 
        className="rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-[#008d3e]/20 transition-all duration-500 bg-slate-950"
      >
        {heroBg ? (
          <div 
            className="absolute inset-0 z-0"
            style={{ 
              backgroundImage: `url(${heroBg})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              opacity: 0.65
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#008d3e] to-[#8ec31f] z-0"></div>
        )}
        {heroBg && <div className="absolute inset-0 bg-black/15 z-0"></div>}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{t.heroTitle}</h2>
            <p className="text-[#f4f9f4] max-w-md opacity-90 text-sm leading-relaxed">
              {t.heroDesc}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/30 text-center">
            <p className="text-xs uppercase font-bold tracking-widest opacity-80 mb-1">{t.supervisorTitle}</p>
            <p className="font-bold">{t.supervisorDept}</p>
          </div>
        </div>
        {!heroBg && <div className="absolute top-0 right-0 -mr-16 -mt-16 bg-white/20 w-64 h-64 rounded-full opacity-20 blur-3xl"></div>}
      </div>

      {/* Student Profile Info Card */}
      <div className="bg-white border border-[#008d3e]/20 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[#008d3e] font-bold border-b border-[#008d3e]/10 pb-2">
          <ClipboardCheck size={20} className="text-[#8ec31f]" />
          <span>{t.studentInfoCardTitle}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#2d3a31]/70">{t.studentNameLabel}</label>
            <input 
              type="text" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder={t.studentNamePlaceholder}
              className="px-4 py-2 border border-[#008d3e]/15 rounded-xl outline-none focus:ring-1 focus:ring-[#8ec31f] transition-all bg-[#f4f9f4]/35 text-sm font-semibold"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#2d3a31]/70">{t.patientChartLabel}</label>
            <input 
              type="text" 
              value={patientChartNumber}
              onChange={(e) => setPatientChartNumber(e.target.value)}
              placeholder={t.patientChartPlaceholder}
              className="px-4 py-2 border border-[#008d3e]/15 rounded-xl outline-none focus:ring-1 focus:ring-[#8ec31f] transition-all bg-[#f4f9f4]/35 text-sm font-semibold"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#2d3a31]/70">{t.visitDateLabel}</label>
            <input 
              type="date" 
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="px-4 py-2 border border-[#008d3e]/15 rounded-xl outline-none focus:ring-1 focus:ring-[#8ec31f] transition-all bg-[#f4f9f4]/35 text-sm font-semibold"
            />
          </div>
        </div>
        {studentName ? (
           <p className="text-[11px] text-[#008d3e]/80 font-semibold flex items-center gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-[#8ec31f] animate-ping"></span>
             {t.studentBoundMsg(studentName, patientChartNumber || 'P123')}
           </p>
        ) : (
           <p className="text-[11px] text-red-500/80 font-semibold flex items-center gap-1">
             {t.studentMissingMsg}
           </p>
        )}
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            id={card.id}
            onClick={() => setView(card.view)}
            className="group flex items-start gap-4 p-5 bg-white border border-[#008d3e]/10 rounded-xl hover:border-[#008d3e] hover:shadow-lg transition-all text-left relative overflow-hidden"
          >
            <div className="p-3 bg-[#f4f9f4] rounded-lg group-hover:bg-[#008d3e]/10 transition-colors">
              {card.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200">
                  {card.category}
                </span>
                {card.completed ? (
                  <span className="text-[10px] font-bold text-[#008d3e] bg-[#f4f9f4] border border-[#008d3e]/20 px-2.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                    {t.completed}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-0.5 rounded-full">
                    {t.unfilled}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-[#008d3e] text-lg flex items-center justify-between mt-2">
                {card.title}
                <ChevronRight size={18} className="text-[#8ec31f] group-hover:text-[#008d3e] group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-[#2d3a31]/60 text-xs mt-1 leading-relaxed">{card.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Aggregate and Mail CTA Section */}
      <div className="bg-gradient-to-r from-[#008d3e]/10 to-[#8ec31f]/10 border border-[#008d3e]/20 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-lg font-bold text-[#008d3e] flex items-center justify-center md:justify-start gap-2">
            <Download size={20} className="text-[#8ec31f]" />
            <span>{t.exportBannerTitle}</span>
          </h3>
          <p className="text-xs text-[#2d3a31]/80 max-w-lg leading-relaxed">
            {t.exportBannerDesc}
          </p>
        </div>
        <button
          onClick={() => handleExportAndEmail(studentName, visitDate)}
          className="bg-[#008d3e] hover:bg-[#007031] text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#008d3e]/20 transition-all text-sm shrink-0"
        >
          <Download size={18} />
          <span>{t.exportBannerBtn}</span>
        </button>
      </div>
    </div>
  );
}
