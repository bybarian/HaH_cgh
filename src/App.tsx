/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope,
  Globe,
  Languages
} from 'lucide-react';
import { db } from './services/store';
import { KnowledgeItem, View } from './types';
import { resolveUrl } from './utils/resolveUrl';
import { exportExcelWorkbook } from './utils/exportExcel';
import { Language, translations } from './i18n';

// Modular Components
import { Dashboard } from './components/Dashboard';
import { KnowledgeSection } from './components/KnowledgeSection';
import { PrepSection } from './components/PrepSection';
import { PreTestSection } from './components/PreTestSection';
import { VisitChecklist } from './components/VisitChecklist';
import { PostTestSection } from './components/PostTestSection';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('cgh_language') as Language) || 'zh';
  });
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([]);

  // Hero custom background state
  const [heroBg, setHeroBg] = useState<string | null>(null);

  // Logo customization states
  const [logoUrl, setLogoUrl] = useState<string | null>(() => localStorage.getItem('cgh_custom_logo_url') || null);
  const [logoBase64, setLogoBase64] = useState<string | null>(() => localStorage.getItem('cgh_custom_logo_base64') || null);

  // Student specific persist states
  const [studentName, setStudentName] = useState(() => localStorage.getItem('cgh_student_name') || '');
  const [patientChartNumber, setPatientChartNumber] = useState(() => localStorage.getItem('cgh_patient_chart_number') || '');
  const [visitDate, setVisitDate] = useState(() => localStorage.getItem('cgh_visit_date') || new Date().toISOString().split('T')[0]);
  const [learningStepStatus, setLearningStepStatus] = useState({
    preQuiz: false,
    checklist: false,
    postReflection: false
  });

  // Export Modal State
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportData, setExportData] = useState<{ fileName: string; mailSubject: string; mailBody: string }>({
    fileName: '',
    mailSubject: '',
    mailBody: ''
  });

  // Custom Banners
  const [customBanners, setCustomBanners] = useState<Record<string, string>>(() => {
    return {
      'module-1': localStorage.getItem('cgh_banner_module-1') || '',
      'module-2': localStorage.getItem('cgh_banner_module-2') || '',
      'module-3': localStorage.getItem('cgh_banner_module-3') || '',
      'module-4': localStorage.getItem('cgh_banner_module-4') || '',
      'module-5': localStorage.getItem('cgh_banner_module-5') || '',
    };
  });

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('cgh_language', newLang);
  };

  const handleUploadBanner = (id: string, url: string) => {
    localStorage.setItem(`cgh_banner_${id}`, url);
    setCustomBanners(prev => ({ ...prev, [id]: url }));
  };

  const handleClearBanner = (id: string) => {
    localStorage.removeItem(`cgh_banner_${id}`);
    setCustomBanners(prev => ({ ...prev, [id]: '' }));
  };

  useEffect(() => {
    setKnowledge(db.getKnowledge());
  }, []);

  useEffect(() => {
    const probeHeroBg = async () => {
      const candidates = [
        '/hero-background.png',
        '/hero-background.jpg',
        '/hero-background.jpeg',
        '/hero-background.webp',
        '/hero-background.svg',
        '/background.png',
        '/background.jpg',
        '/background.jpeg',
        '/background.webp',
        '/background.svg',
        '/banner-hero.png',
        '/banner-hero.jpg',
        '/banner-hero.jpeg',
        '/banner-hero.webp',
        '/banner-hero.svg',
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
            setHeroBg(resolvedSrc);
            return;
          }
        } catch (e) {
          // ignore
        }
      }
      setHeroBg(null);
    };
    probeHeroBg();
  }, []);

  useEffect(() => {
    if (logoBase64) return;
    const customUrl = localStorage.getItem('cgh_custom_logo_url');
    if (customUrl) {
      setLogoUrl(customUrl);
      return;
    }

    const probeCandidates = async () => {
      const candidates = [
        '/logo.png',
        '/logo.svg',
        '/logo.jpg',
        '/logo.jpeg',
        '/platform-logo.png',
        '/platform-logo.svg',
        '/platform-logo.jpg',
        '/cgh-logo.png',
        '/cgh-logo.svg',
        '/cgh-logo.jpg',
        '/favicon.ico'
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
            setLogoUrl(resolvedSrc);
            return;
          }
        } catch (e) {
          // ignore
        }
      }
    };
    
    probeCandidates();
  }, [logoBase64]);

  useEffect(() => {
    localStorage.setItem('cgh_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('cgh_patient_chart_number', patientChartNumber);
  }, [patientChartNumber]);

  useEffect(() => {
    localStorage.setItem('cgh_visit_date', visitDate);
  }, [visitDate]);

  useEffect(() => {
    const results = db.getResults();
    const checklists = db.getChecklists();
    setLearningStepStatus({
      preQuiz: results.some(r => r.testId === 'pre-quiz'),
      checklist: checklists.length > 0,
      postReflection: results.some(r => r.testId === 'post-reflection')
    });
  }, [currentView]);

  const t = translations[lang];

  const handleExportAndEmail = (name: string, date: string) => {
    if (!name.trim()) {
      alert(t.studentMissingMsg);
      return;
    }

    try {
      const { blob, fileName, mailSubject, mailBody } = exportExcelWorkbook(name, date, t, lang);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setExportData({ fileName, mailSubject, mailBody });
      setShowExportModal(true);

      setTimeout(() => {
        try {
          const mailtoUri = `mailto:bybarian@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
          window.location.href = mailtoUri;
        } catch (e) {
          console.warn('Auto mailto triggered failed: ', e);
        }
      }, 1200);

    } catch (err) {
      console.error(err);
      alert('Export Excel error: ' + String(err));
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return (
        <Dashboard 
          setView={setCurrentView} 
          studentName={studentName}
          setStudentName={setStudentName}
          patientChartNumber={patientChartNumber}
          setPatientChartNumber={setPatientChartNumber}
          visitDate={visitDate}
          setVisitDate={setVisitDate}
          learningStepStatus={learningStepStatus}
          handleExportAndEmail={handleExportAndEmail}
          heroBg={heroBg}
          t={t}
        />
      );
      case 'knowledge': return (
        <KnowledgeSection 
          items={knowledge} 
          setView={setCurrentView} 
          customBanners={customBanners}
          onUploadBanner={handleUploadBanner}
          onClearBanner={handleClearBanner}
          t={t}
          lang={lang}
        />
      );
      case 'prep': return (
        <PrepSection 
          setView={setCurrentView} 
          customBanners={customBanners}
          onUploadBanner={handleUploadBanner}
          onClearBanner={handleClearBanner}
          t={t}
        />
      );
      case 'pre-test': return (
        <PreTestSection 
          setView={setCurrentView} 
          customBanners={customBanners}
          onUploadBanner={handleUploadBanner}
          onClearBanner={handleClearBanner}
          t={t}
        />
      );
      case 'checklist': return (
        <VisitChecklist 
          setView={setCurrentView} 
          customBanners={customBanners}
          onUploadBanner={handleUploadBanner}
          onClearBanner={handleClearBanner}
          t={t}
        />
      );
      case 'post-test': return (
        <PostTestSection 
          setView={setCurrentView} 
          customBanners={customBanners}
          onUploadBanner={handleUploadBanner}
          onClearBanner={handleClearBanner}
          t={t}
        />
      );
      default: return (
        <Dashboard 
          setView={setCurrentView} 
          studentName={studentName}
          setStudentName={setStudentName}
          patientChartNumber={patientChartNumber}
          setPatientChartNumber={setPatientChartNumber}
          visitDate={visitDate}
          setVisitDate={setVisitDate}
          learningStepStatus={learningStepStatus}
          handleExportAndEmail={handleExportAndEmail}
          heroBg={heroBg}
          t={t}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f9f4] text-[#2d3a31] font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b border-[#008d3e]/20 sticky top-0 z-10 px-4 sm:px-6 py-4 flex items-center justify-between shadow-sm">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => setCurrentView('dashboard')}
          id="brand-logo"
        >
          <div className="flex items-center justify-center bg-white border border-[#008d3e]/15 p-1.5 rounded-2xl shadow-sm min-w-[4rem] min-h-[4rem] w-16 h-16 sm:w-18 sm:h-18">
            {logoBase64 ? (
              <img src={logoBase64} alt="Custom Logo" className="w-14 h-14 object-contain" referrerPolicy="no-referrer" />
            ) : logoUrl ? (
              <img src={logoUrl} alt="Custom Logo" className="w-14 h-14 object-contain" referrerPolicy="no-referrer" />
            ) : (
              <div className="bg-[#008d3e] p-2.5 sm:p-3 rounded-xl text-white">
                <Stethoscope size={32} />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold tracking-tight text-[#008d3e]">
              {t.appTitle}
            </h1>
            <p className="text-[9px] sm:text-[10px] text-[#8ec31f] font-bold uppercase tracking-widest leading-none">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector Switch */}
          <div className="flex items-center bg-[#f4f9f4] border border-[#008d3e]/20 rounded-xl p-1 gap-1 shadow-2xs">
            <button
              type="button"
              onClick={() => handleSetLang('zh')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'zh' 
                  ? 'bg-[#008d3e] text-white shadow-xs' 
                  : 'text-[#2d3a31]/60 hover:text-[#008d3e] hover:bg-[#8ec31f]/10'
              }`}
              title="切換至繁體中文"
            >
              <Globe size={13} />
              <span>中文</span>
            </button>
            <button
              type="button"
              onClick={() => handleSetLang('en')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'en' 
                  ? 'bg-[#008d3e] text-white shadow-xs' 
                  : 'text-[#2d3a31]/60 hover:text-[#008d3e] hover:bg-[#8ec31f]/10'
              }`}
              title="Switch to English"
            >
              <Languages size={13} />
              <span>EN</span>
            </button>
          </div>

          {studentName && (
            <div className="hidden md:flex items-center gap-2 bg-[#8ec31f]/10 border border-[#008d3e]/15 px-3 py-1.5 rounded-full text-xs font-bold text-[#008d3e]">
              <span className="w-2 h-2 rounded-full bg-[#8ec31f] animate-pulse"></span>
              {studentName} ({t.loggedInStudent})
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <div className="mb-6 text-center">
          <p className="text-[#008d3e] font-bold text-xs sm:text-sm tracking-widest bg-white inline-block px-4 py-1.5 rounded-full border border-[#008d3e]/20 shadow-sm">
            {t.motto}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentView}-${lang}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto py-8 px-6 text-center text-xs text-[#2d3a31]/50 border-t border-[#008d3e]/10 mt-12 bg-white/40 rounded-t-xl">
        {t.footerText}
      </footer>

      {/* Export Modal Explanation */}
      <ExportModal 
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        studentName={studentName}
        visitDate={visitDate}
        fileName={exportData.fileName}
        mailSubject={exportData.mailSubject}
        mailBody={exportData.mailBody}
        t={t}
        lang={lang}
      />
    </div>
  );
}
