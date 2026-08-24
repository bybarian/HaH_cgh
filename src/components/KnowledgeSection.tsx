/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen } from 'lucide-react';
import { KnowledgeItem } from '../types';
import { TranslationData, Language } from '../i18n';
import { ModuleHeaderBanner } from './ModuleHeaderBanner';
import { HomeCareSubSection } from './HomeCareSubSection';
import { CareModelInfographic } from './CareModelInfographic';

export function KnowledgeSection({ 
  items, 
  setView,
  customBanners,
  onUploadBanner,
  onClearBanner,
  t,
  lang,
}: { 
  items: KnowledgeItem[]; 
  setView: (v: any) => void;
  customBanners: Record<string, string>;
  onUploadBanner: (id: string, url: string) => void;
  onClearBanner: (id: string) => void;
  t: TranslationData;
  lang: Language;
}) {
  const [activeTab, setActiveTab] = useState<string>('home_care');

  // If viewing default knowledge items in English, use English localized items
  const activeKnowledgeItems = lang === 'en' ? t.defaultKnowledge : items;
  const filtered = activeKnowledgeItems.filter(item => item.category === activeTab);

  const tabs = [
    { id: 'home_care', label: t.knowledgeTabs.home_care },
    { id: 'model', label: t.knowledgeTabs.model },
    { id: 'law', label: t.knowledgeTabs.law },
    { id: 'indication', label: t.knowledgeTabs.indication },
    { id: 'treatment', label: t.knowledgeTabs.treatment },
    { id: 'tool', label: t.knowledgeTabs.tool },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => setView('dashboard')} className="text-[#008d3e] font-bold hover:underline text-sm flex items-center gap-1">
          {t.backToHome}
        </button>
      </div>

      <ModuleHeaderBanner 
        moduleId="module-1"
        title={t.modules.m1.title}
        desc={t.modules.m1.desc}
        icon={<BookOpen size={24} />}
        customBanners={customBanners}
        onUploadBanner={onUploadBanner}
        onClearBanner={onClearBanner}
      />

      <div className="flex gap-1.5 p-1 bg-[#8ec31f]/10 rounded-xl overflow-x-auto border border-[#008d3e]/10 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'bg-[#008d3e] text-white shadow-sm' : 'text-[#2d3a31]/60 hover:bg-[#8ec31f]/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
        >
          {activeTab === 'model' ? (
            <CareModelInfographic t={t} />
          ) : activeTab === 'home_care' ? (
            <HomeCareSubSection t={t} />
          ) : (
            <div className="space-y-4">
              {filtered.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-xl border border-[#008d3e]/10 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-[#008d3e] mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#8ec31f] rounded-full"></span>
                    {item.title}
                  </h3>
                  <div className="text-[#2d3a31] leading-relaxed whitespace-pre-line text-sm">{item.content}</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
