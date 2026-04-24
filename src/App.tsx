/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  MapPin, 
  CheckSquare, 
  ClipboardCheck, 
  BarChart, 
  ShieldAlert, 
  ChevronRight,
  Settings,
  HelpCircle,
  Stethoscope
} from 'lucide-react';
import { db } from './services/store';
import { KnowledgeItem, PRE_QUIZ, CONFIDENCE_QUESTIONS, REFLECTION_QUESTIONS } from './types';

type View = 'dashboard' | 'knowledge' | 'prep' | 'pre-test' | 'checklist' | 'post-test' | 'admin';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([]);
  const [userProgress, setUserProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setKnowledge(db.getKnowledge());
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard setView={setCurrentView} />;
      case 'knowledge': return <KnowledgeSection items={knowledge} setView={setCurrentView} />;
      case 'prep': return <PrepSection setView={setCurrentView} />;
      case 'pre-test': return <PreTestSection setView={setCurrentView} />;
      case 'checklist': return <VisitChecklist setView={setCurrentView} />;
      case 'post-test': return <PostTestSection setView={setCurrentView} />;
      case 'admin': return <AdminPanel items={knowledge} setItems={setKnowledge} setView={setCurrentView} />;
      default: return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f9f4] text-[#2d3a31] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-[#008d3e]/20 sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => setCurrentView('dashboard')}
          id="brand-logo"
        >
          <div className="bg-[#008d3e] p-2 rounded-lg text-white shadow-md">
            <Stethoscope size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#008d3e]">國泰綜合醫院</h1>
            <p className="text-[10px] text-[#8ec31f] font-bold uppercase tracking-widest leading-none">Cathay General Hospital</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView('admin')}
            className="p-2 text-[#008d3e] hover:bg-[#8ec31f]/10 rounded-md transition-colors"
            id="admin-button"
            title="管理後台"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-6">
        <div className="mb-6 text-center">
          <p className="text-[#008d3e] font-bold text-sm tracking-widest bg-white inline-block px-4 py-1 rounded-full border border-[#008d3e]/20 shadow-sm">
            成為最受民眾信賴的醫學中心
          </p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Dashboard ---
function Dashboard({ setView }: { setView: (v: View) => void }) {
  const cards = [
    { id: 'module-1', title: '在宅知識庫', icon: <BookOpen className="text-[#008d3e]" />, desc: '國泰在宅訓練：法規、適應症與模式', view: 'knowledge' as View },
    { id: 'module-2', title: '訪視前準備', icon: <MapPin className="text-[#8ec31f]" />, desc: '注意事項與 HOME BASIC 介紹', view: 'prep' as View },
    { id: 'module-3', title: '前測：知識與信心', icon: <HelpCircle className="text-[#008d3e]" />, desc: '國泰參訪前自我檢核', view: 'pre-test' as View },
    { id: 'module-4', title: '訪視中：HOME BASIC', icon: <CheckSquare className="text-[#8ec31f]" />, desc: '核檢表與 POCT 評估記錄', view: 'checklist' as View },
    { id: 'module-5', title: '後測：反思問卷', icon: <ClipboardCheck className="text-[#008d3e]" />, desc: '反思記錄與學習歷程整理', view: 'post-test' as View },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#008d3e] to-[#8ec31f] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-[#008d3e]/20 transition-all duration-500">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">在宅急症照護教育訓練</h2>
            <p className="text-[#f4f9f4] max-w-md opacity-90 text-sm">
              本平台導引您完成國泰醫院在宅醫療核心訓練，從訪視前的知識準備，到訪視後的深入反思記錄。
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/30 text-center">
            <p className="text-xs uppercase font-bold tracking-widest opacity-80 mb-1">培訓單位</p>
            <p className="font-bold">國泰醫院 教學部/急診部</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 bg-white/20 w-64 h-64 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            id={card.id}
            onClick={() => setView(card.view)}
            className="group flex items-start gap-4 p-5 bg-white border border-[#008d3e]/10 rounded-xl hover:border-[#008d3e] hover:shadow-lg transition-all text-left"
          >
            <div className="p-3 bg-[#f4f9f4] rounded-lg group-hover:bg-[#008d3e]/10 transition-colors">
              {card.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#008d3e] text-lg flex items-center justify-between">
                {card.title}
                <ChevronRight size={18} className="text-[#8ec31f] group-hover:text-[#008d3e] group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-[#2d3a31]/60 text-sm mt-1 leading-relaxed">{card.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Knowledge Section ---
function KnowledgeSection({ items, setView }: { items: KnowledgeItem[], setView: (v: View) => void }) {
  const [activeTab, setActiveTab] = useState<string>('law');
  const filtered = items.filter(item => item.category === activeTab);

  const tabs = [
    { id: 'law', label: '法規政策' },
    { id: 'indication', label: '適應症' },
    { id: 'treatment', label: '治療策略' },
    { id: 'tool', label: '評估工具' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => setView('dashboard')} className="text-[#008d3e] font-bold hover:underline">回首頁</button>
        <span className="text-[#008d3e]/30">/</span>
        <h2 className="text-2xl font-bold text-[#008d3e]">在宅急症照護知識庫</h2>
      </div>

      <div className="flex gap-2 p-1 bg-[#8ec31f]/10 rounded-lg w-fit border border-[#008d3e]/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
              activeTab === tab.id ? 'bg-[#008d3e] text-white shadow-sm' : 'text-[#2d3a31]/60 hover:bg-[#8ec31f]/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

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
    </div>
  );
}

// --- Prep Section ---
function PrepSection({ setView }: { setView: (v: View) => void }) {
  const homeBasic = [
    { char: 'H', title: 'Health 健康狀態', desc: '目前的病況、過去病史、生命徵象。' },
    { char: 'O', title: 'Outlook 心理/展望', desc: '病患情緒、對未來醫療目標的看法。' },
    { char: 'M', title: 'Medication 用藥狀況', desc: '用藥清單、遵醫囑性、是否有多重用藥。' },
    { char: 'E', title: 'Environment 環境安全', desc: '家宅空間、無障礙設施、通風與衛生。' },
    { char: 'B', title: 'Basic ADL 生活功能', desc: '能不能自行進食、沐浴、走動。' },
    { char: 'A', title: 'Access 輔具/近便', desc: '輪椅、助行器、醫療器材的可及性。' },
    { char: 'S', title: 'Social 支持系統', desc: '家人支持、鄰里關係、經濟資源。' },
    { char: 'I', title: 'Instability 不穩定性', desc: '急性惡化的風險、跌倒風險。' },
    { char: 'C', title: 'Caregiver 照護者', desc: '主要照護者的壓力、健康狀況、有無喘息服務。' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => setView('dashboard')} className="text-[#008d3e] font-bold hover:underline">回首頁</button>
        <span className="text-[#008d3e]/30">/</span>
        <h2 className="text-2xl font-bold text-[#008d3e]">訪視前準備與注意事項</h2>
      </div>

      <div className="bg-white border-l-4 border-[#008d3e] p-5 rounded-r-lg shadow-sm border border-[#008d3e]/10">
        <div className="flex items-center gap-2 mb-3 text-[#008d3e] font-bold">
          <ShieldAlert size={20} className="text-[#8ec31f]" />
          <span>國泰醫院出發前提醒</span>
        </div>
        <ul className="list-disc list-inside text-[#2d3a31]/80 text-sm space-y-2">
          <li>請確保通訊設備 (Line) 電量充足，隨時保持與團隊聯繫</li>
          <li>與家長/病人聯絡確認時間，確認是否需攜帶 IoT 監測設備</li>
          <li>攜帶必要的隨身藥包、診斷工具與 POCT 儀器</li>
          <li>注意個人防護與洗手衛生</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#008d3e]">
          <span className="bg-[#8ec31f]/10 text-[#008d3e] p-1 rounded-md px-2 border border-[#008d3e]/20">HOME BASIC</span>
          核檢心法
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {homeBasic.map((item) => (
            <div key={item.char} className="bg-white p-4 rounded-xl border border-[#008d3e]/10 shadow-sm hover:border-[#8ec31f] transition-all">
              <div className="text-2xl font-black text-[#008d3e] mb-1">{item.char}</div>
              <h4 className="font-bold text-[#2d3a31] text-sm mb-1">{item.title}</h4>
              <p className="text-[#2d3a31]/60 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={() => setView('pre-test')}
        className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#007031] transition shadow-lg shadow-[#008d3e]/20"
      >
        準備好了，進行前測測驗
      </button>
    </div>
  );
}

// --- Pre-Test Section ---
function PreTestSection({ setView }: { setView: (v: View) => void }) {
  const [step, setStep] = useState<'quiz' | 'confidence'>('quiz');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [finished, setFinished] = useState(false);

  const handleQuizSubmit = () => {
    setStep('confidence');
  };

  const handleConfidenceSubmit = () => {
    db.saveResult({
      userId: 'test-user',
      testId: 'pre-quiz',
      answers,
      timestamp: Date.now()
    });
    setFinished(true);
  };

  if (finished) {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="inline-block p-4 bg-[#f4f9f4] text-[#008d3e] rounded-full mb-4 shadow-sm border border-[#008d3e]/10">
          <ClipboardCheck size={48} />
        </div>
        <h2 className="text-2xl font-bold text-[#008d3e]">國泰參訪測驗完成！</h2>
        <p className="text-[#2d3a31]/60">您已完成出發前的信心與知識檢測，現在可以進行實際家訪紀錄了。</p>
        <button 
          onClick={() => setView('checklist')}
          className="bg-[#008d3e] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#007031] shadow-lg shadow-[#008d3e]/20 transition-all"
        >
          前往家訪核檢表
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {step === 'quiz' ? (
        <>
          <h2 className="text-2xl font-bold border-b border-[#008d3e]/10 pb-4 text-[#008d3e]">參訪前知識測驗</h2>
          <div className="space-y-6">
            {PRE_QUIZ.map((q, i) => (
              <div key={q.id} className="space-y-3">
                <p className="font-bold text-[#2d3a31]">{i+1}. {q.text}</p>
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
            <button onClick={handleQuizSubmit} className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold hover:bg-[#007031] transition-colors shadow-md">下一步：信心測驗</button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold border-b border-[#008d3e]/10 pb-4 text-[#008d3e]">參訪前信心評核</h2>
          <p className="text-[#2d3a31]/60 italic text-sm">請評分 1-5 分 (1:非常沒信心, 5:非常有信心)</p>
          <div className="space-y-6">
            {CONFIDENCE_QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-3">
                <p className="font-bold text-[#2d3a31]">{q.text}</p>
                <div className="flex justify-between gap-2">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      onClick={() => setAnswers({...answers, [q.id]: val})}
                      className={`flex-1 py-4 rounded-lg border border-[#008d3e]/10 font-bold transition ${
                        answers[q.id] === val ? 'bg-[#008d3e] border-[#008d3e] text-white shadow-md' : 'hover:bg-[#8ec31f]/10 text-[#2d3a31]/60'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleConfidenceSubmit} className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold hover:bg-[#007031] shadow-lg shadow-[#008d3e]/20 transition-all">提交並開始訪視</button>
          </div>
        </>
      )}
    </div>
  );
}

// --- Visit Checklist ---
function VisitChecklist({ setView }: { setView: (v: View) => void }) {
  const [data, setData] = useState<Record<string, string>>({
    health: '', outlook: '', medication: '', environment: '',
    basicADL: '', access: '', social: '', instability: '', caregiver: ''
  });
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const homeBasic = [
    { key: 'health', label: 'Health 健康狀態' },
    { key: 'outlook', label: 'Outlook 心理/展望' },
    { key: 'medication', label: 'Medication 用藥狀況' },
    { key: 'environment', label: 'Environment 環境安全' },
    { key: 'basicADL', label: 'Basic ADL 生活功能' },
    { key: 'access', label: 'Access 輔具/近便' },
    { key: 'social', label: 'Social 支持系統' },
    { key: 'instability', label: 'Instability 不穩定性' },
    { key: 'caregiver', label: 'Caregiver 照護者' },
  ];

  const handleSave = () => {
    db.saveChecklist({
      userId: 'test-user',
      patientId: 'P123',
      items: data as any,
      notes,
      timestamp: Date.now()
    });
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="inline-block p-4 bg-[#f4f9f4] text-[#008d3e] rounded-full mb-4 shadow-sm border border-[#008d3e]/10">
          <ClipboardCheck size={48} />
        </div>
        <h2 className="text-2xl font-bold text-[#008d3e]">訪視紀錄也已儲存</h2>
        <p className="text-[#2d3a31]/60">辛苦了！國泰在宅團隊感謝您的付出。完成訪視後，請進入最後的反思回饋階段。</p>
        <button 
          onClick={() => setView('post-test')}
          className="bg-[#008d3e] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#007031] shadow-lg shadow-[#008d3e]/20 transition-all"
        >
          前往反思回饋
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-[#008d3e]/10 pb-4">
        <h2 className="text-2xl font-bold text-[#008d3e]">訪視實務：HOME BASIC 評估</h2>
        <div className="text-xs font-bold text-[#008d3e] bg-[#8ec31f]/10 px-3 py-1 rounded-full border border-[#008d3e]/10">患者編號：P123</div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {homeBasic.map((item) => (
          <div key={item.key} className="space-y-2">
            <label className="block font-bold text-[#2d3a31] text-sm">{item.label}</label>
            <textarea 
              value={data[item.key]}
              onChange={(e) => setData({...data, [item.key]: e.target.value})}
              className="w-full p-4 bg-white border border-[#008d3e]/10 rounded-xl focus:ring-2 focus:ring-[#8ec31f] outline-none text-[#2d3a31] transition-shadow shadow-sm placeholder:text-[#2d3a31]/30"
              placeholder={`請輸入國泰對 ${item.label} 的觀察重點...`}
              rows={2}
            />
          </div>
        ))}

        <div className="pt-4 space-y-2 border-t border-[#008d3e]/10">
          <label className="block font-bold text-[#2d3a31]">綜合備註</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-4 bg-white border border-[#008d3e]/10 rounded-xl focus:ring-2 focus:ring-[#8ec31f] outline-none text-[#2d3a31] transition-shadow shadow-sm placeholder:text-[#2d3a31]/30"
            placeholder="其他需要記錄的臨床細節..."
            rows={4}
          />
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#007031] transition shadow-lg shadow-[#008d3e]/20"
        >
          儲存國泰訪視紀錄
        </button>
      </div>
    </div>
  );
}

// --- Post-Test Section ---
function PostTestSection({ setView }: { setView: (v: View) => void }) {
  const [step, setStep] = useState<'confidence' | 'reflection'>('confidence');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [finished, setFinished] = useState(false);

  const handleConfidenceSubmit = () => {
    setStep('reflection');
  };

  const handleReflectionSubmit = () => {
    db.saveResult({
      userId: 'test-user',
      testId: 'post-reflection',
      answers,
      timestamp: Date.now()
    });
    setFinished(true);
  };

  if (finished) {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="inline-block p-4 bg-[#f4f9f4] text-[#008d3e] rounded-full mb-4 shadow-sm border border-[#008d3e]/10">
          <BarChart size={48} />
        </div>
        <h2 className="text-2xl font-bold text-[#008d3e]">學習歷程已記錄！</h2>
        <p className="text-[#2d3a31]/60">感謝您的反思回饋，這將是提升您臨床專業身份（PIF）的重要一步。期待在國泰在宅醫療團隊再見！</p>
        <button 
          onClick={() => setView('dashboard')}
          className="bg-[#008d3e] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#007031] shadow-lg shadow-[#008d3e]/20 transition-all"
        >
          回到首頁
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {step === 'confidence' ? (
        <>
          <h2 className="text-2xl font-bold border-b border-[#008d3e]/10 pb-4 text-[#008d3e]">參訪後信心評估</h2>
          <div className="space-y-6">
            {CONFIDENCE_QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-3">
                <p className="font-bold text-[#2d3a31]">{q.text}</p>
                <div className="flex justify-between gap-2">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      onClick={() => setAnswers({...answers, [q.id]: val})}
                      className={`flex-1 py-4 rounded-lg border border-[#008d3e]/10 font-bold transition ${
                        answers[q.id] === val ? 'bg-[#008d3e] border-[#008d3e] text-white shadow-md' : 'hover:bg-[#8ec31f]/10 text-[#2d3a31]/60'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleConfidenceSubmit} className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold hover:bg-[#007031] transition-colors shadow-md">進入深入反思階段</button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold border-b border-[#008d3e]/10 pb-4 text-[#008d3e]">反思記錄 (Kolb Cycle)</h2>
          <div className="space-y-6">
            {REFLECTION_QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-3">
                <p className="font-bold text-[#008d3e]">{q.text}</p>
                <textarea 
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                  className="w-full p-4 bg-white border border-[#008d3e]/10 rounded-xl focus:ring-2 focus:ring-[#8ec31f] outline-none text-[#2d3a31] transition-shadow shadow-sm placeholder:text-[#2d3a31]/30"
                  rows={4}
                  placeholder="請輸入您的思考..."
                />
              </div>
            ))}
            <button onClick={handleReflectionSubmit} className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#007031] shadow-lg shadow-[#008d3e]/20 transition-all">送出反思並完成培訓</button>
          </div>
        </>
      )}
    </div>
  );
}

// --- Admin Panel ---
function AdminPanel({ items, setItems, setView }: { items: KnowledgeItem[], setItems: (items: KnowledgeItem[]) => void, setView: (v: View) => void }) {
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);

  const handleSave = () => {
    if (!editingItem) return;
    const newItems = items.map(item => item.id === editingItem.id ? editingItem : item);
    setItems(newItems);
    db.saveKnowledge(newItems);
    setEditingItem(null);
  };

  const handleAddItem = () => {
    const newItem: KnowledgeItem = {
      id: `item-${Date.now()}`,
      category: 'law',
      title: '新知識項目',
      content: ''
    };
    const newItems = [newItem, ...items];
    setItems(newItems);
    db.saveKnowledge(newItems);
    setEditingItem(newItem);
  };

  const handleDelete = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    db.saveKnowledge(newItems);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between border-b border-[#008d3e]/10 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('dashboard')} className="text-[#008d3e] font-bold hover:underline">回首頁</button>
          <span className="text-[#008d3e]/30">/</span>
          <h2 className="text-2xl font-bold text-[#008d3e]">國泰培訓內容管理</h2>
        </div>
        <button 
          onClick={handleAddItem}
          className="bg-[#008d3e] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#007031] flex items-center gap-2 shadow-sm transition-colors"
        >
          新增培訓項目
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-xl border border-[#008d3e]/10 shadow-sm flex flex-col gap-4 hover:border-[#8ec31f] transition-all">
            {editingItem?.id === item.id ? (
              <div className="space-y-4">
                <input 
                  value={editingItem.title} 
                  onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                  className="w-full text-lg font-bold border-b border-[#008d3e]/10 pb-1 focus:border-[#8ec31f] outline-none text-[#008d3e]"
                />
                <select 
                  value={editingItem.category}
                  onChange={e => setEditingItem({...editingItem, category: e.target.value as any})}
                  className="p-2 text-sm border border-[#008d3e]/10 rounded bg-[#f4f9f4] text-[#2d3a31]"
                >
                  <option value="law">模式與法規</option>
                  <option value="indication">收案適應症</option>
                  <option value="treatment">訪視策略</option>
                  <option value="tool">檢測工具</option>
                </select>
                <textarea 
                  value={editingItem.content} 
                  onChange={e => setEditingItem({...editingItem, content: e.target.value})}
                  className="w-full p-3 border border-[#008d3e]/10 rounded-xl min-h-[150px] text-[#2d3a31] focus:ring-1 focus:ring-[#8ec31f] outline-none"
                />
                <div className="flex gap-2">
                  <button onClick={handleSave} className="bg-[#008d3e] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#007031] shadow-sm">儲存內容</button>
                  <button onClick={() => setEditingItem(null)} className="bg-white text-[#2d3a31]/60 px-6 py-2 rounded-lg text-sm font-bold border border-[#008d3e]/10">取消</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest bg-[#8ec31f]/10 text-[#008d3e] px-3 py-1 rounded-full mb-3 inline-block border border-[#008d3e]/10">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#008d3e]">{item.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingItem(item)}
                      className="px-4 py-2 text-xs font-bold text-[#008d3e] hover:bg-[#f4f9f4] rounded-lg border border-[#008d3e]/20 transition-colors"
                    >
                      編輯
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg border border-red-100 transition-colors"
                    >
                      刪除
                    </button>
                  </div>
                </div>
                <p className="text-[#2d3a31]/80 text-sm leading-relaxed line-clamp-3">{item.content}</p>
              </>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-12 pt-8 border-t border-[#008d3e]/10 text-center">
        <button 
          onClick={() => db.clearAll()}
          className="text-[#2d3a31]/30 text-xs hover:text-red-500 underline transition-colors"
        >
          重置所有內容與國泰訓練資料
        </button>
      </div>
    </div>
  );
}
