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
  Stethoscope,
  CheckCircle,
  AlertCircle,
  Mail,
  Download,
  ArrowRight,
  Activity,
  Heart,
  Target,
  Users,
  Phone,
  Home,
  Shield,
  Upload,
  Trash2,
  Image as LucideImage
} from 'lucide-react';
import { db } from './services/store';
import { KnowledgeItem, PRE_QUIZ, CONFIDENCE_QUESTIONS, REFLECTION_QUESTIONS } from './types';
import * as XLSX from 'xlsx';

type View = 'dashboard' | 'knowledge' | 'prep' | 'pre-test' | 'checklist' | 'post-test' | 'admin';

const getConfidenceLabel = (val: any) => {
  if (!val) return '未填寫';
  return `${val} 分 (1-5)`;
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([]);
  const [userProgress, setUserProgress] = useState<Record<string, boolean>>({});
  const [isAdmin, setIsAdmin] = useState(false);

  // Student specific persist states
  const [studentName, setStudentName] = useState(() => localStorage.getItem('cgh_student_name') || '');
  const [patientChartNumber, setPatientChartNumber] = useState(() => localStorage.getItem('cgh_patient_chart_number') || '');
  const [visitDate, setVisitDate] = useState(() => localStorage.getItem('cgh_visit_date') || new Date().toISOString().split('T')[0]);
  const [learningStepStatus, setLearningStepStatus] = useState({
    preQuiz: false,
    checklist: false,
    postReflection: false
  });
  const [showExportModal, setShowExportModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  useEffect(() => {
    setKnowledge(db.getKnowledge());
  }, []);

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

  const handleExportAndEmail = (name: string, date: string) => {
    if (!name.trim()) {
      alert('【資料未完整】請先填寫學員姓名，以利將學籍與作答資料正確彙編入 Excel 檔案中！');
      return;
    }

    const chartNumber = localStorage.getItem('cgh_patient_chart_number') || 'P123';

    try {
      const wb = XLSX.utils.book_new();
      
      // 1. Overview sheet
      const overview = [
        ['國泰綜合醫院在宅急症照護學習歷程彙整表'],
        [],
        ['核心資料項目', '填寫內容', '備註說明'],
        ['學員姓名 (Student Name)', name, '核對學員身分'],
        ['病人病歷號 (Patient Chart Number)', chartNumber, '核對病患個案病歷號'],
        ['參訪/填寫日期 (Visit Date)', date || '未填寫', '核對學習時效'],
        ['系統整合彙整時間 (Export Time)', new Date().toLocaleString(), '自動日期戳記'],
        [],
        ['重要說明', '請將此 Excel 檔以電子郵件附件方式寄給指導老師作為學習評分依據。', ''],
      ];
      const wsOverview = XLSX.utils.aoa_to_sheet(overview);
      XLSX.utils.book_append_sheet(wb, wsOverview, '1. 個人資料與說明');
      
      // 2. Pre-quiz sheet
      const results = db.getResults();
      const preQuizResult = results.filter(r => r.testId === 'pre-quiz').pop();
      const preQuizAnswers = preQuizResult?.answers || {};
      
      const preQuizData = [
        ['一、參訪前測 - 知識與信心評估'],
        [],
        ['題目編號', '題目敘述', '您的作答', '標準答案 / 信心指標'],
        ['Q1', '在宅急症照護目前主要針對哪三種感染？', preQuizAnswers['q1'] || '未填寫', '肺炎、尿路感染、軟組織感染'],
        ['Q2', '哪一項不屬於 HOME BASIC 的評估範圍？', preQuizAnswers['q2'] || '未填寫', 'Income 收入狀況'],
        [],
        ['C1', '我覺得我對在宅急症照護的法規與知識有充分了解。', getConfidenceLabel(preQuizAnswers['c1']), '1-5 級分尺度評量'],
        ['C2', '我有信心能獨立完成 HOME BASIC 居家評估。', getConfidenceLabel(preQuizAnswers['c2']), '1-5 級分尺度評量'],
        ['C3', '我有信心能與病患及其家屬進行有效的溝通。', getConfidenceLabel(preQuizAnswers['c3']), '1-5 級分尺度評量'],
      ];
      const wsPreQuiz = XLSX.utils.aoa_to_sheet(preQuizData);
      XLSX.utils.book_append_sheet(wb, wsPreQuiz, '2. 參訪前測');
      
      // 3. HOME BASIC Checklist Sheet
      const checklists = db.getChecklists();
      const latestChecklist = checklists.pop();
      const chData = latestChecklist?.items || {};
      
      const checklistData = [
        [`二、訪視中實務評估 - HOME BASIC 紀錄（患者 ID: ${chartNumber}）`],
        [],
        ['評估維度字元', '評估項目名稱', '訪視觀察紀錄與細節觀察'],
        ['H', 'Health 健康狀態 (病況/生命徵象)', chData['health'] || '未填寫'],
        ['O', 'Outlook 心理/展望 (情緒與意願)', chData['outlook'] || '未填寫'],
        ['M', 'Medication 用藥狀況 (醫囑性/多重用藥)', chData['medication'] || '未填寫'],
        ['E', 'Environment 環境安全 (無障礙與家宅衛生)', chData['environment'] || '未填寫'],
        ['B', 'Basic ADL 生活功能 (進食、扶行能力)', chData['basicADL'] || '未填寫'],
        ['A', 'Access 輔具/近便 (醫療耗材與器材)', chData['access'] || '未填寫'],
        ['S', 'Social 支持系統 (家屬照護力及鄰里關係)', chData['social'] || '未填寫'],
        ['I', 'Instability 不穩定性 (急性跌倒/惡化危險)', chData['instability'] || '未填寫'],
        ['C', 'Caregiver 照護者 (主要照護者壓力與喘息需求)', chData['caregiver'] || '未填寫'],
        [],
        ['備註', '綜合臨床觀察備註', latestChecklist?.notes || '無'],
      ];
      const wsChecklist = XLSX.utils.aoa_to_sheet(checklistData);
      XLSX.utils.book_append_sheet(wb, wsChecklist, '3. 居家訪視評估');
      
      // 4. Post-Reflection Sheet
      const postResult = results.filter(r => r.testId === 'post-reflection').pop();
      const postAnswers = postResult?.answers || {};
      
      const reflectionData = [
        ['三、參訪後反思及 Kolb 學習環節記錄'],
        [],
        ['題目編號／維度', '導引問題敘述', '學生填寫之反思與反饋心得'],
        ['C1 (後測信心)', '我覺得我對在宅急症照護的法規與知識有充分了解。', getConfidenceLabel(postAnswers['c1'])],
        ['C2 (後測信心)', '我有信心能獨立完成 HOME BASIC 居家評估。', getConfidenceLabel(postAnswers['c2'])],
        ['C3 (後測信心)', '我有信心能與病患及其家屬進行有效的溝通。', getConfidenceLabel(postAnswers['c3'])],
        [],
        ['R1 (觀察階段)', '「我看見了什麼」：請簡述今日訪視的觀察。', postAnswers['r1'] || '未填寫'],
        ['R2 (理解階段)', '「我怎麼理解」：這些觀察對您有什麼臨床意義？', postAnswers['r2'] || '未填寫'],
        ['R3 (能力評估)', '對於五大能力（病人照護、溝通等），您覺得今日最有收穫的是哪一部分？', postAnswers['r3'] || '未填寫'],
        ['R4 (展望行動)', '「下一次我會如何做」：未來若有類似個案，您的行動計畫？', postAnswers['r4'] || '未填寫'],
      ];
      const wsReflection = XLSX.utils.aoa_to_sheet(reflectionData);
      XLSX.utils.book_append_sheet(wb, wsReflection, '4. 參訪後反思問卷');
      
      // Fit widths
      wsOverview['!cols'] = [{ wch: 30 }, { wch: 55 }, { wch: 20 }];
      wsPreQuiz['!cols'] = [{ wch: 15 }, { wch: 45 }, { wch: 30 }, { wch: 30 }];
      wsChecklist['!cols'] = [{ wch: 20 }, { wch: 35 }, { wch: 80 }];
      wsReflection['!cols'] = [{ wch: 20 }, { wch: 45 }, { wch: 85 }];
      
      // Save
      XLSX.writeFile(wb, `國泰在宅醫療學習歷程-${name}-${date || '未填日期'}.xlsx`);
      
      // Open modal
      setShowExportModal(true);

      // Auto trigger mail link fallback via standard href navigation
      const subject = `【國泰在宅醫療參訪】${name} 的學習心得與 HOME BASIC 評估核檢表 (病歷號: ${chartNumber}) - ${date || '未填日期'}`;
      const body = `老師您好：\n\n我是國泰醫院培訓學生 ${name}。\n\n我已順利完成了在宅急症照護的參訪學習歷程，並填寫了完整的評估表單（病歷號：${chartNumber}）與反思問卷。\n\n隨信附上我所彙整的 Excel 學習歷程檔案（請將剛下載的「國泰在宅醫療學習歷程-${name}-${date}.xlsx」檔案附加於本信件中）。\n\n此致\n國泰綜合醫院 教學部/急診部\n\n---\n學生姓名：${name}\n病歷號：${chartNumber}\n填寫日期：${date}\n匯出系統：國泰在宅醫療數位學習平台`;
      
      setTimeout(() => {
        try {
          const mailtoUri = `mailto:bybarian@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          window.location.href = mailtoUri;
        } catch (e) {
          console.warn('Auto mailto triggered failed under sandboxed environment: ', e);
        }
      }, 1200);

    } catch (err) {
      console.error(err);
      alert('匯出 Excel 發生錯誤：' + String(err));
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
        />
      );
      case 'knowledge': return <KnowledgeSection items={knowledge} setView={setCurrentView} />;
      case 'prep': return <PrepSection setView={setCurrentView} />;
      case 'pre-test': return <PreTestSection setView={setCurrentView} />;
      case 'checklist': return <VisitChecklist setView={setCurrentView} />;
      case 'post-test': return <PostTestSection setView={setCurrentView} />;
      case 'admin': 
        if (!isAdmin) {
          return (
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
            />
          );
        }
        return <AdminPanel items={knowledge} setItems={setKnowledge} setView={setCurrentView} />;
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
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f9f4] text-[#2d3a31] font-sans pb-12">
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
          {studentName && (
            <div className="hidden sm:flex items-center gap-2 bg-[#8ec31f]/10 border border-[#008d3e]/15 px-3 py-1.5 rounded-full text-xs font-bold text-[#008d3e]">
              <span className="w-2 h-2 rounded-full bg-[#8ec31f] animate-pulse"></span>
              {studentName} (已登入學員)
            </div>
          )}
          <button 
            onClick={() => {
              if (isAdmin) {
                setCurrentView('admin');
              } else {
                const pin = window.prompt('【國泰管理端】請輸入管理密碼：');
                if (pin === 'cgh888') { // Simple password
                  setIsAdmin(true);
                  setCurrentView('admin');
                } else if (pin !== null) {
                  alert('權限驗證失敗。');
                }
              }
            }}
            className={`p-2 rounded-md transition-colors ${isAdmin ? 'bg-[#008d3e] text-white' : 'text-[#008d3e] hover:bg-[#8ec31f]/10'}`}
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

      {/* Export Modal Explanation */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#008d3e]/20 space-y-4 my-8">
            <div className="flex items-center gap-3 text-[#008d3e]">
              <div className="bg-[#008d3e]/10 p-2 rounded-full text-[#008d3e]">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-xl font-bold">🎉 學習歷程 Excel 彙整成功！</h3>
            </div>
            
            <p className="text-sm text-[#2d3a31]/80 leading-relaxed">
              系統已為學員 <strong>{studentName}</strong> 彙整產生專屬的 Excel 學習歷程檔案（包含前測、家訪 HOME BASIC 紀錄及反思心得），並已自動在瀏覽器中啟動下載。
            </p>

            <div className="bg-[#f4f9f4] p-4 rounded-xl border border-[#008d3e]/10 space-y-2">
              <p className="text-xs font-bold text-[#008d3e] flex items-center gap-1">
                <AlertCircle size={14} className="text-[#8ec31f]" />
                <span>📧 郵件交件與傳送指南</span>
              </p>
              <ol className="list-decimal list-inside text-xs text-[#2d3a31]/80 space-y-1.5 leading-relaxed">
                <li>請確認您的電腦/手機已經成功下載名為 <strong>「國泰在宅醫療學習歷程-{studentName}-{visitDate}.xlsx」</strong> 的檔案。</li>
                <li>點擊下方 <strong>「自動喚醒信箱」</strong> 大按鈕。如果您裝有 Outlook/Mail，將自動帶入指導老師收件人與信件內文。</li>
                <li><strong>【特別提醒】</strong> 請記得點擊信件中的 <strong>「夾帶附件」</strong>，手動將剛下載的 <strong>Excel 檔案</strong> 夾帶進去，再寄送出去！</li>
              </ol>
            </div>

            {/* Manual Copy Clipboard Fallbacks */}
            <div className="border border-[#008d3e]/15 rounded-xl p-3 bg-gray-50/70 space-y-2.5 text-xs">
              <p className="font-bold text-[#2d3a31] flex items-center gap-1">
                <span>💡 若上方自動喚醒信箱無反應（例如使用 Google Webmail）：</span>
              </p>
              <p className="text-[#2d3a31]/60 leading-normal">
                請直接點選下方各項一鍵複製，再開啟您的網頁型 Email (如 Gmail 網頁版)，手動貼上並夾帶剛才下載的 Excel 檔案！
              </p>
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                  <span className="text-[#2d3a31]/70 font-mono">收件人：bybarian@gmail.com</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('bybarian@gmail.com');
                      setCopySuccess('email');
                      setTimeout(() => setCopySuccess(null), 2000);
                    }}
                    className="text-xs font-bold text-[#008d3e] hover:text-[#007031] transition-colors shrink-0 pl-2"
                  >
                    {copySuccess === 'email' ? '✅ 已複製' : '📋 複製信箱'}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                  <span className="text-[#2d3a31]/70 font-mono truncate max-w-[280px]">標題：【國泰在宅醫療參訪】{studentName}...</span>
                  <button 
                    onClick={() => {
                      const chartNum = localStorage.getItem('cgh_patient_chart_number') || 'P123';
                      const subject = `【國泰在宅醫療參訪】${studentName} 的學習心得與 HOME BASIC 評估核檢表 (病歷號: ${chartNum}) - ${visitDate}`;
                      navigator.clipboard.writeText(subject);
                      setCopySuccess('subject');
                      setTimeout(() => setCopySuccess(null), 2000);
                    }}
                    className="text-xs font-bold text-[#008d3e] hover:text-[#007031] transition-colors shrink-0 pl-2"
                  >
                    {copySuccess === 'subject' ? '✅ 已複製' : '📋 複製標題'}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                  <span className="text-[#2d3a31]/70 font-mono truncate max-w-[280px]">內文：老師您好，我是學員...</span>
                  <button 
                    onClick={() => {
                      const chartNum = localStorage.getItem('cgh_patient_chart_number') || 'P123';
                      const body = `老師您好：\n\n我是國泰醫院培訓學生 ${studentName}。\n\n我已順利完成了在宅急症照護的參訪學習歷程，並填寫了完整的評估表單（病歷號：${chartNum}）與反思問卷。\n\n隨信附上我所彙整的 Excel 學習歷程檔案（請將剛下載的「國泰在宅醫療學習歷程-${studentName}-${visitDate}.xlsx」檔案附加於本信件中）。\n\n此致\n國泰綜合醫院 教學部/急診部\n\n---\n學生姓名：${studentName}\n病歷號：${chartNum}\n填寫日期：${visitDate}\n匯出系統：國泰在宅醫療數位學習平台`;
                      navigator.clipboard.writeText(body);
                      setCopySuccess('body');
                      setTimeout(() => setCopySuccess(null), 2000);
                    }}
                    className="text-xs font-bold text-[#008d3e] hover:text-[#007031] transition-colors shrink-0 pl-2"
                  >
                    {copySuccess === 'body' ? '✅ 已複製' : '📋 複製內文'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href={`mailto:bybarian@gmail.com?subject=${encodeURIComponent(
                  `【國泰在宅醫療參訪】${studentName} 的學習心得與 HOME BASIC 評估核檢表 (病歷號: ${localStorage.getItem('cgh_patient_chart_number') || 'P123'}) - ${visitDate}`
                )}&body=${encodeURIComponent(
                  `老師您好：\n\n我是國泰醫院培訓學生 ${studentName}。\n\n我已順利完成了在宅急症照護的參訪學習歷程，並填寫了完整的評估表單（病歷號：${localStorage.getItem('cgh_patient_chart_number') || 'P123'}）與反思問卷。\n\n隨信附上我所彙整的 Excel 學習歷程檔案（請將剛下載的「國泰在宅醫療學習歷程-${studentName}-${visitDate}.xlsx」檔案附加於本信件中）。\n\n此致\n國泰綜合醫院 教學部/急診部\n\n---\n學生姓名：${studentName}\n病歷號：${localStorage.getItem('cgh_patient_chart_number') || 'P123'}\n填寫日期：${visitDate}\n匯出系統：國泰在宅醫療數位學習平台`
                )}`}
                className="flex-1 bg-[#008d3e] hover:bg-[#007031] text-white font-bold py-2.5 rounded-xl transition text-sm flex items-center justify-center gap-2 text-center"
              >
                <Mail size={16} />
                <span>自動喚醒信箱</span>
              </a>
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 bg-white hover:bg-gray-50 text-[#2d3a31]/60 font-bold py-2.5 rounded-xl border border-gray-200 transition text-sm"
              >
                關閉提示視窗
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Dashboard ---
function Dashboard({ 
  setView,
  studentName,
  setStudentName,
  patientChartNumber,
  setPatientChartNumber,
  visitDate,
  setVisitDate,
  learningStepStatus,
  handleExportAndEmail
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
}) {
  const cards = [
    { id: 'module-1', title: '在宅知識庫', icon: <BookOpen className="text-[#008d3e]" />, desc: '在宅訓練：法規、適應症與模式', view: 'knowledge' as View, category: '必讀核心', completed: true },
    { id: 'module-2', title: '訪視前準備', icon: <MapPin className="text-[#8ec31f]" />, desc: '注意事項與 HOME BASIC 介紹', view: 'prep' as View, category: '臨床必讀', completed: true },
    { id: 'module-3', title: '前測：知識與信心', icon: <HelpCircle className="text-[#008d3e]" />, desc: '國泰參訪前自我檢核', view: 'pre-test' as View, category: '學生自檢', completed: learningStepStatus.preQuiz },
    { id: 'module-4', title: '訪視中：HOME BASIC', icon: <CheckSquare className="text-[#8ec31f]" />, desc: '核檢表與 POCT 評估記錄', view: 'checklist' as View, category: '實踐記錄', completed: learningStepStatus.checklist },
    { id: 'module-5', title: '後測：反思問卷', icon: <ClipboardCheck className="text-[#008d3e]" />, desc: '反思記錄與學習歷程整理', view: 'post-test' as View, category: '深度反思', completed: learningStepStatus.postReflection },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#008d3e] to-[#8ec31f] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-[#008d3e]/20 transition-all duration-500">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">在宅急症照護教育訓練</h2>
            <p className="text-[#f4f9f4] max-w-md opacity-90 text-sm leading-relaxed">
              本平台專為國泰醫院在宅參訪之培訓學生/學員設計，引導您完成各階段學習，並可自動彙整為 Excel 歷程檔案。
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/30 text-center">
            <p className="text-xs uppercase font-bold tracking-widest opacity-80 mb-1">培訓指導</p>
            <p className="font-bold">國泰醫院 教學部/急診部</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 bg-white/20 w-64 h-64 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Student Profile Info Card */}
      <div className="bg-white border border-[#008d3e]/20 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[#008d3e] font-bold border-b border-[#008d3e]/10 pb-2">
          <ClipboardCheck size={20} className="text-[#8ec31f]" />
          <span>學員與訪視資料登錄欄</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#2d3a31]/70">學員姓名：</label>
            <input 
              type="text" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="請輸入您的姓名 (例如: 王大同)"
              className="px-4 py-2 border border-[#008d3e]/15 rounded-xl outline-none focus:ring-1 focus:ring-[#8ec31f] transition-all bg-[#f4f9f4]/35 text-sm font-semibold"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#2d3a31]/70">病人病歷號：</label>
            <input 
              type="text" 
              value={patientChartNumber}
              onChange={(e) => setPatientChartNumber(e.target.value)}
              placeholder="請輸入個案病歷號 (預設為 P123)"
              className="px-4 py-2 border border-[#008d3e]/15 rounded-xl outline-none focus:ring-1 focus:ring-[#8ec31f] transition-all bg-[#f4f9f4]/35 text-sm font-semibold"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#2d3a31]/70">參訪/填寫日期：</label>
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
             學員身分與病歷號已綁定中：系統將會以「{studentName}」(病歷號: {patientChartNumber || 'P123'}) 產製歷程檔案。
           </p>
        ) : (
           <p className="text-[11px] text-red-500/80 font-semibold flex items-center gap-1">
             ⚠️ 請先於上方填寫您的姓名、病歷號與參訪日期，以利後續彙整 Excel 資料！
           </p>
        )}
      </div>

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
                    ✔️ 已完成
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-0.5 rounded-full">
                    未填寫
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
          <h4 className="font-bold text-[#008d3e] text-lg flex items-center justify-center md:justify-start gap-1.5">
            <Mail size={18} className="text-[#8ec31f]" />
            <span>彙整問卷 Excel 並寄送老師</span>
          </h4>
          <p className="text-xs text-[#2d3a31]/80 leading-relaxed max-w-md">
            點擊右側按鈕即刻將您的前測作答、訪視 HOME BASIC 紀錄、反思問券與學籍資料一鍵彙編為標準 Excel 檔案，並自動產生傳送至 <strong>指導老師信箱</strong> 的預裝郵件。
          </p>
        </div>
        <button
          onClick={() => handleExportAndEmail(studentName, visitDate)}
          className="bg-[#008d3e] hover:bg-[#007031] text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all text-sm shrink-0"
        >
          <Download size={16} />
          <span>彙整 Excel 並寄送</span>
        </button>
      </div>
    </div>
  );
}

// --- Knowledge Section ---
function KnowledgeSection({ items, setView }: { items: KnowledgeItem[], setView: (v: View) => void }) {
  const [activeTab, setActiveTab] = useState<string>('model');
  const filtered = items.filter(item => item.category === activeTab);

  const tabs = [
    { id: 'model', label: '在宅照護模式圖 (Model)' },
    { id: 'law', label: '法規政策 (Law)' },
    { id: 'indication', label: '收案適應症 (Indication)' },
    { id: 'treatment', label: '治療策略 (Treatment)' },
    { id: 'tool', label: '檢測工具 (Tool)' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => setView('dashboard')} className="text-[#008d3e] font-bold hover:underline text-sm flex items-center gap-1">← 回首頁</button>
        <span className="text-[#008d3e]/30">/</span>
        <h2 className="text-2xl font-bold text-[#008d3e]">在宅急症照護知識庫</h2>
      </div>

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
            <CareModelInfographic />
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

// --- Interactive Care Model Infographic Component ---
function CareModelInfographic() {
  const [selectedPathway, setSelectedPathway] = useState<'traditional' | 'inhome'>('inhome');
  const [activeStep, setActiveStep] = useState<number>(0);

  const [uploadedImage, setUploadedImage] = useState<string>(() => {
    return localStorage.getItem('cgh_care_model_uploaded_image') || '';
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxW = 1000;
        const scale = Math.min(1, maxW / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
          try {
            localStorage.setItem('cgh_care_model_uploaded_image', dataUrl);
            setUploadedImage(dataUrl);
          } catch (err) {
            console.error('Storage quota exceeded:', err);
            const smallCanvas = document.createElement('canvas');
            const smallerScale = Math.min(1, 600 / img.width);
            smallCanvas.width = img.width * smallerScale;
            smallCanvas.height = img.height * smallerScale;
            const smallCtx = smallCanvas.getContext('2d');
            if (smallCtx) {
              smallCtx.drawImage(img, 0, 0, smallCanvas.width, smallCanvas.height);
              const smallDataUrl = smallCanvas.toDataURL('image/jpeg', 0.5);
              try {
                localStorage.setItem('cgh_care_model_uploaded_image', smallDataUrl);
                setUploadedImage(smallDataUrl);
              } catch (retryErr) {
                alert('圖片檔案超出預期容量，無法寫入瀏覽器快取，請使用較小的圖檔。');
              }
            }
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removeUploadedImage = () => {
    localStorage.removeItem('cgh_care_model_uploaded_image');
    setUploadedImage('');
  };

  const objectives = [
    '提供住院的替代服務，增加醫療體系韌性',
    '減少居家失能或機構住民因急性症往返醫院',
    '強化各層級醫療院所垂直轉銜合作'
  ];

  const benefits = [
    '尊重病人在家接受治療的意願',
    '減少病人及家屬往返醫院與照顧負擔',
    '降低住院期間交叉感染的風險'
  ];

  const traditionalPathway = [
    { 
      title: '1. 個案急性健康問題', 
      desc: '個案在家突發感染或慢性病急性惡化', 
      icon: <AlertCircle size={18} className="text-red-500" /> 
    },
    { 
      title: '2. 急診 (ER)', 
      desc: '呼叫救護車緊急送往各大醫院急診部進行篩檢檢傷', 
      icon: <ShieldAlert size={18} className="text-orange-500" /> 
    },
    { 
      title: '3. 醫院常規住院', 
      desc: '在普通病房或高壓環境接受 7-14 天點滴抗生素治療', 
      icon: <Activity size={18} className="text-pink-600" /> 
    },
    { 
      title: '4. 出院辦理', 
      desc: '生命徵象穩定，病況改善，辦理繁瑣結帳與出院手續', 
      icon: <CheckCircle size={18} className="text-blue-500" /> 
    },
    { 
      title: '5. 出院準備計畫', 
      desc: '出院後家屬自行接送返家、適應藥物，面臨照護交接期', 
      icon: <ClipboardCheck size={18} className="text-[#8ec31f]" /> 
    }
  ];

  const inhomePathway = [
    { 
      title: '1. 個案急性發作', 
      desc: '個案突發三大感染症（肺炎、尿路感染、軟組織感染）急性徵兆',
      details: '病患在家出現發燒、寒顫、咳嗽加劇、小便疼痛或皮膚發紅、壓痛、腫脹等急性不急症。',
      icon: <AlertCircle size={18} className="text-[#8ec31f]" />
    },
    { 
      title: '2. 評估篩選收治模式與提早出院', 
      desc: '評估患者符合模式 A、B、C 或是提早出院個案等適應症',
      details: '● 模式A：居家醫療個案 (通常收治肺炎、敗血症前期、給予呼吸支持個案)\n● 模式B：照護機構住民個案 (配合機構就醫方案、控制局部尿路感染與投藥)\n● 模式C：急診失能個案 (Barthel 評估 < 60 分且出門就醫極度不便之肺炎/軟組織感染案)\n● 提早出院個案：限失能（巴氏量表小於60分）或因疾病特性致外出就醫不便且因感染症住院，經醫師評估病情穩定及確認細菌菌株適合提早出院於家中/機構接受靜脈抗生素治療。不限感染症類別，即肺炎、尿路感染、軟組織感染及其他感染症。',
      icon: <Users size={18} className="text-[#8ec31f]" />
    },
    { 
      title: '3. 在宅急症照護小組啟動', 
      desc: '專科臨床醫療團隊親自到府、配置往診藥物與ASUS遠端設備',
      details: '醫師、師資級護理師與往診合作藥師攜帶床側生理儀器，24小時視訊診察，搭配實地首劑抗生素給藥與衛教指導。',
      icon: <Activity size={18} className="text-[#8ec31f]" />
    },
    { 
      title: '4. 在宅住院監測與精準治療', 
      desc: '執行遠端監護，隨時開啟綠色通道及床邊 POCT 檢驗治療',
      details: '● 遠端監測：ASUS 科技盒子與手持式超音波定時評估。\n● 床側 POCT：在宅即可檢測 CRP、血液等定量數據、確認病原與發炎指標。\n● 綠色通道：隨時暢通緊急後送，急診端保留保留床位，確保隨時可直通、免等待。',
      icon: <Shield size={18} className="text-[#8ec31f]" />
    },
    { 
      title: '5. 康復結案與回歸追蹤', 
      desc: '完成抗生素療程，病況好轉康復，回歸常態居家照護或家庭醫師追蹤',
      details: '病原菌穩定消除，經照護組評估後，撤除在宅住院設備，回歸日常家庭醫師、居家醫療整合照護計畫。',
      icon: <Home size={18} className="text-[#8ec31f]" />
    },
  ];

  const teamFeatures = [
    {
      title: '綠色通道後送醫院',
      desc: '當在宅患者病況有任何突發不穩定或惡化跡象，在宅急症小組會立即與醫院急診對接，透過專屬綠色通道快速收回住院，省去繁瑣檢傷與排床等待機制。',
      sub: '🏥 24H 聯防與預留床位保障'
    },
    {
      title: '遠距醫療 / 遠端監測',
      desc: '運用手持式超音波，搭配智慧生理監控手環、ASUS Telehealth 科技平台。家屬/護理師隨時回傳血壓、心跳、SpO2 等參數，雲端醫療中心能全時全天候防守病歷變化。',
      sub: '🖥️ 智慧 IoT 照護黑科技儀器整合'
    },
    {
      title: '24小時急診諮詢服務',
      desc: '急診與在宅 24h Call Center 後勤團隊全時備戰。無論深夜或清晨，當患者出現病況惡化或緊急疑難，醫護人員隨時透過雲端連線、電話進行即時臨床答詢與用藥調度指示。',
      sub: '📞 急診部專屬 Call Center 雲端聯防'
    },
    {
      title: '協助連結長照資源',
      desc: '深入家庭客群，除了治病更整合社會與長照社政資源，協調照護喘息支援、居家藥事諮詢，大幅減輕主要在宅家屬的 24h 精神與生活陪伴壓力。',
      sub: '🤝 照顧者壓力調適與長照銜接'
    },
    {
      title: '專業感染急症照護團隊',
      desc: '跨域整合專科醫師、專科護理師、在宅特配師資級居家藥師。現場往診評估後直接給予首劑靜脈抗生素治療，搭配臨床床邊 POCT 即時抽血檢出定量評估，做出最適臨床藥學共享決策。',
      sub: '🩺 專科醫師 + 護理師 + 藥師跨域親訪'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#008d3e]/15 p-6 md:p-8 shadow-sm space-y-8 overflow-hidden">
      
      {/* Visual Header Banner */}
      <div className="bg-[#008d3e]/5 rounded-2xl border border-[#008d3e]/15 p-6 text-center space-y-2 relative overflow-hidden">
        <div className="absolute top-0 left-0 bg-[#8ec31f]/20 w-32 h-32 rounded-full -ml-10 -mt-10 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 bg-[#008d3e]/10 w-44 h-44 rounded-full -mr-12 -mb-12 blur-2xl"></div>
        <div className="inline-flex items-center justify-center gap-1.5 p-1 bg-white border border-[#008d3e]/20 text-[#008d3e] text-xs font-black px-3 py-1 rounded-full shadow-sm mb-1 uppercase tracking-wider relative z-10">
          <Shield size={14} className="text-[#8ec31f]" />
          <span>全民健保政策 • 照護體系創新</span>
        </div>
        <h3 className="text-2xl font-black text-[#008d3e] relative z-10 flex items-center justify-center gap-2">
          <span>在宅急症照護模式</span>
        </h3>
        <p className="text-sm font-bold text-[#8ec31f] tracking-widest relative z-10 mb-1">
          實 規 劃 實 現 在 地 老 化 目 標
        </p>
        <p className="text-xs text-[#2d3a31]/65 max-w-lg mx-auto relative z-10 leading-relaxed">
          全民健康保險署全力推廣的「在宅急症照護模式」，讓三大急性感染症（肺炎、尿路感染、軟組織感染）患者得在熟悉的宅家環境中替代常規住院，達到更佳的尊嚴照護。
        </p>
      </div>

      {/* Target and engagement summary block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Objectives card */}
        <div className="bg-[#f4f9f4]/35 border border-[#008d3e]/20 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-[#008d3e] font-black border-b border-[#008d3e]/10 pb-2 text-sm leading-none">
            <div className="bg-[#008d3e] text-white p-1.5 rounded-lg">
              <Target size={16} />
            </div>
            <span>在宅照護之發展目的</span>
          </div>
          <ul className="space-y-2.5">
            {objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#2d3a31]/90 font-medium leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008d3e] mt-1.5 shrink-0"></span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Patient benefits card */}
        <div className="bg-[#8ec31f]/5 border border-[#8ec31f]/25 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-[#008d3e] font-black border-b border-[#8ec31f]/20 pb-2 text-sm leading-none">
            <div className="bg-[#8ec31f] text-white p-1.5 rounded-lg">
              <Heart size={16} />
            </div>
            <span>尊重病人與家庭參與福利</span>
          </div>
          <ul className="space-y-2.5">
            {benefits.map((ben, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#2d3a31]/90 font-medium leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8ec31f] mt-1.5 shrink-0"></span>
                <span>{ben}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pathways comparison slider */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <h4 className="font-bold text-[#008d3e] text-base flex items-center gap-1.5">
            <Activity size={18} className="text-[#8ec31f]" />
            <span>臨床流程對比：傳統住院 vs. 在宅急症照護</span>
          </h4>
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 self-start">
            <button
              onClick={() => setSelectedPathway('traditional')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                selectedPathway === 'traditional' ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              傳統住院
            </button>
            <button
              onClick={() => setSelectedPathway('inhome')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                selectedPathway === 'inhome' ? 'bg-[#008d3e] text-white shadow-sm' : 'text-gray-400 hover:text-[#008d3e]'
              }`}
            >
              在宅急症照護 (新模式)
            </button>
          </div>
        </div>

        {selectedPathway === 'traditional' ? (
          /* Traditional Flow */
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
            <p className="text-xs font-semibold text-gray-500 italic">傳統普通疾病住院流程：容易造成跨科等候、急診雍塞與交叉感染危險</p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {traditionalPathway.map((p, i) => (
                <div key={i} className="bg-white border border-gray-200 p-4 rounded-lg relative flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-center p-1.5 bg-gray-150/45 rounded-md border border-gray-200 w-8 h-8 text-semibold">
                      {p.icon}
                    </div>
                    <p className="text-xs font-bold text-gray-600">{p.title}</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{p.desc}</p>
                  </div>
                  {i < 4 && (
                    <div className="hidden md:block absolute top-[43%] -right-3 transform z-10 bg-white border border-gray-200 p-1 rounded-full">
                      <ArrowRight size={10} className="text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* In-Home Flow with Interactive Click Details */
          <div className="bg-gradient-to-br from-[#008d3e]/5 to-[#8ec31f]/5 border border-[#008d3e]/15 rounded-xl p-5 space-y-5">
            <div className="flex justify-between items-center bg-[#8ec31f]/10 p-2.5 rounded-lg border border-[#008d3e]/10 text-[11px] font-bold text-[#008d3e]">
              <span>💡 臨床導引：請點擊各流程節點，觀看國泰學員到府之實地評估指南</span>
              <span className="text-[10px] bg-white border border-[#008d3e]/15 px-2 py-0.5 rounded text-[#8ec31f]">點擊流程查看詳情</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {inhomePathway.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-lg text-left transition-all relative flex flex-col justify-between border ${
                    activeStep === idx 
                      ? 'bg-[#008d3e] text-white border-[#008d3e] shadow-md ring-2 ring-[#8ec31f]/55 translate-y-[-2px]' 
                      : 'bg-white border-[#008d3e]/10 text-[#2d3a31] hover:border-[#008d3e]'
                  }`}
                >
                  <div className="space-y-1.5 w-full">
                    <div className={`p-1.5 rounded-md w-8 h-8 flex items-center justify-center border ${
                      activeStep === idx 
                        ? 'bg-white/10 border-white/20 text-[#8ec31f]' 
                        : 'bg-[#f4f9f4] border-[#008d3e]/10 text-[#008d3e]'
                    }`}>
                      {p.icon}
                    </div>
                    <p className={`text-xs font-black uppercase tracking-wider ${activeStep === idx ? 'text-[#8ec31f]' : 'text-[#008d3e]'}`}>
                      流程：STEP 0{idx + 1}
                    </p>
                    <p className="text-xs font-black leading-snug line-clamp-2">{p.title}</p>
                    <p className={`text-[10px] leading-relaxed line-clamp-3 ${activeStep === idx ? 'text-white/80' : 'text-[#2d3a31]/60'}`}>
                      {p.desc}
                    </p>
                  </div>
                  {idx < 4 && (
                    <div className={`hidden md:block absolute top-[43%] -right-3 transform z-10 border p-1 rounded-full hover:scale-105 ${
                      activeStep === idx ? 'bg-[#008d3e] text-white border-white' : 'bg-white text-[#008d3e] border-[#008d3e]/20'
                    }`}>
                      <ArrowRight size={10} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Path step details panel */}
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-[#008d3e]/15 rounded-lg p-5 space-y-2.5 relative"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-black tracking-widest bg-[#008d3e] text-white px-2 py-0.5 rounded leading-none">
                  STEP 0{activeStep + 1} 詳情
                </span>
                <span className="font-bold text-sm text-[#008d3e]">{inhomePathway[activeStep].title}</span>
              </div>
              <p className="text-xs text-[#2d3a31]/80 leading-relaxed whitespace-pre-line font-medium bg-[#f4f9f4]/45 p-3 rounded-md border border-[#008d3e]/10">
                {inhomePathway[activeStep].details}
              </p>
              <div className="text-[10px] text-gray-400 font-bold flex items-center justify-between">
                <span>📚 培訓學生任務：在進行「訪視中 HOME BASIC」填寫時，須確實檢核本期對應健康細項。</span>
                <span>在宅急症學習網 • CGH Clinical Case Office</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Upload Zone */}
      <div className="border border-[#008d3e]/15 rounded-2xl p-5 md:p-6 bg-[#f4f9f4]/20 space-y-4">
        <div className="flex items-center justify-between border-b border-[#008d3e]/10 pb-3">
          <h4 className="font-bold text-[#008d3e] text-base flex items-center gap-1.5">
            <LucideImage size={18} className="text-[#8ec31f]" />
            <span>在宅急症照護模式與參考圖檔 (上傳區區塊)</span>
          </h4>
          {uploadedImage && (
            <button
              onClick={removeUploadedImage}
              className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <Trash2 size={13} />
              移除圖片
            </button>
          )}
        </div>

        {uploadedImage ? (
          <div className="space-y-2">
            <div className="bg-white border text-center p-3 rounded-xl group relative overflow-hidden flex items-center justify-center max-h-[550px] shadow-sm">
              <img
                src={uploadedImage}
                alt="在宅急症照護模式參考圖"
                className="max-h-[520px] object-contain rounded-lg shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[11px] text-[#2d3a31]/60 text-center font-medium">
              💡 自訂圖檔已安全緩存。若要更換新圖片，請點擊右上角移除後，即可重新上傳。
            </p>
          </div>
        ) : (
          <div className="relative border-2 border-dashed border-[#008d3e]/20 hover:border-[#008d3e]/50 rounded-xl p-8 text-center bg-white transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="p-3 bg-[#f4f9f4] rounded-full text-[#008d3e]">
                <Upload size={24} />
              </div>
              <p className="text-sm font-bold text-[#2d3a31]">點擊此處或拖曳圖片檔案至此上傳</p>
              <p className="text-xs text-[#2d3a31]/65 max-w-sm">
                可自行將在宅急症模式 A/B/C、提早出院指引或其他流程圖片上傳，以便在參訪或核對時作為即時參考。
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// --- Prep Section ---
function PrepSection({ setView }: { setView: (v: View) => void }) {
  const homeBasic = [
    { char: 'H', title: 'Health 健康狀態', desc: '目、前病史、急性不適、疼痛情形、心跳、血壓、血 SpO2、生理檢測 POCT 定量數值。' },
    { char: 'O', title: 'Outlook 心理/展望', desc: '病患意志、有無對生命的強烈失落、及對本次在宅醫療共享決策 (SDM) 同意性與看法。' },
    { char: 'M', title: 'Medication 用藥狀況', desc: '是否有多重用藥重複、藥物交互作用，往診藥師送藥與服藥醫囑遵循程度。' },
    { char: 'E', title: 'Environment 環境安全', desc: '家宅防跌無障礙配置、採光、生活通風與長照社會衛生保障情形。' },
    { char: 'B', title: 'Basic ADL 生活功能', desc: '日常生活維持度，包括自行進食流體、能否獨立排泄或是否需外力翻身等。' },
    { char: 'A', title: 'Access 輔具/近便', desc: '輪椅、助行器、以及遠端實地使用的醫療儀器、在宅床邊即時檢驗的檢出可及性。' },
    { char: 'S', title: 'Social 支持系統', desc: '家屬及鄰里的實際介入照護頻率、在宅照護下的社政與長照福利諮詢連結度。' },
    { char: 'I', title: 'Instability 不穩定性', desc: '病況惡化或再轉院/急診指標風險（qSOFA 器官衰竭表），是否可能突然生發跌倒、昏厥危險。' },
    { char: 'C', title: 'Caregiver 照護者', desc: '主要家屬照護者在 24 小時在宅陪護之身心高壓狀態、是否有安排在宅長照喘息支援。' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => setView('dashboard')} className="text-[#008d3e] font-bold hover:underline text-sm flex items-center gap-1">← 回首頁</button>
        <span className="text-[#008d3e]/30">/</span>
        <h2 className="text-2xl font-bold text-[#008d3e]">訪視前準備與注意事項</h2>
      </div>

      <div className="bg-white border-l-4 border-[#008d3e] p-5 rounded-r-lg shadow-sm border border-[#008d3e]/10">
        <div className="flex items-center gap-2 mb-3 text-[#008d3e] font-bold">
          <ShieldAlert size={20} className="text-[#8ec31f]" />
          <span>國泰醫院急急症出發前提醒</span>
        </div>
        <ul className="list-disc list-inside text-[#2d3a31]/80 text-sm space-y-2 leading-relaxed">
          <li>請確保隨身通訊設備 (Line) 電量充足，隨時保持與 24h Call Center 聯防網絡連線。</li>
          <li>與家長/病人對聯確認往診到府時間，主動確認是否需配置/攜帶 ASUS 遠端 Telehealth 設備。</li>
          <li>攜有必要的臨床隨身藥包、POCT 檢測器、手持式超音波等要件。</li>
          <li>嚴守個人防範操作、攜帶速乾洗手劑，落實嚴格的無菌無菌防範操作。</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#008d3e]">
          <span className="bg-[#8ec31f]/10 text-[#008d3e] p-1.5 rounded-md px-2.5 border border-[#008d3e]/20">HOME BASIC</span>
          核檢心法架構
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {homeBasic.map((item) => (
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
    const sName = localStorage.getItem('cgh_student_name') || 'test-user';
    db.saveResult({
      userId: sName,
      testId: 'pre-quiz',
      answers,
      timestamp: Date.now()
    });
    setFinished(true);
  };

  if (finished) {
    return (
      <div className="text-center py-12 space-y-6 bg-white border border-[#008d3e]/10 rounded-2xl p-8 max-w-xl mx-auto shadow-sm">
        <div className="inline-block p-4 bg-[#f4f9f4] text-[#008d3e] rounded-full mb-2 shadow-sm border border-[#008d3e]/10 animate-bounce">
          <ClipboardCheck size={48} />
        </div>
        <h2 className="text-2xl font-bold text-[#008d3e]">國泰參訪測驗完成！</h2>
        <p className="text-[#2d3a31]/60 text-sm max-w-sm mx-auto leading-relaxed">
          您已完成國泰在宅參訪出發前的信心與知識自評檢測。現在可以進行實地訪視核檢紀錄了。
        </p>
        <button 
          onClick={() => setView('checklist')}
          className="bg-[#008d3e] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#007031] shadow-lg shadow-[#008d3e]/20 transition-all text-sm"
        >
          前往家訪 HOME BASIC 紀錄
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 bg-white border border-[#008d3e]/10 rounded-2xl p-8 shadow-sm">
      {step === 'quiz' ? (
        <>
          <div className="border-b border-[#008d3e]/10 pb-4">
            <h2 className="text-2xl font-bold text-[#008d3e]">參訪前知識測驗</h2>
            <p className="text-xs text-gray-500 mt-1">出發前先確認您對在宅急症核心法規的掌握</p>
          </div>
          <div className="space-y-6">
            {PRE_QUIZ.map((q, i) => (
              <div key={q.id} className="space-y-3">
                <p className="font-bold text-[#2d3a31] text-sm">{i+1}. {q.text}</p>
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
            <button onClick={handleQuizSubmit} className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold hover:bg-[#007031] transition-colors shadow-md text-sm">下一步：信心自評</button>
          </div>
        </>
      ) : (
        <>
          <div className="border-b border-[#008d3e]/10 pb-4">
            <h2 className="text-2xl font-bold text-[#008d3e]">參訪前信心指標自評</h2>
            <p className="text-xs text-[#2d3a31]/60 italic font-semibold mt-1">請依據 1-5 級分對應作答 (1:極無信心, 5:極有信心)</p>
          </div>
          <div className="space-y-6">
            {CONFIDENCE_QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-3">
                <p className="font-bold text-[#2d3a31] text-sm leading-relaxed">{q.text}</p>
                <div className="flex justify-between gap-1.5 md:gap-2">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      onClick={() => setAnswers({...answers, [q.id]: val})}
                      className={`flex-1 py-3.5 rounded-lg border border-[#008d3e]/10 font-bold transition text-sm ${
                        answers[q.id] === val ? 'bg-[#008d3e] border-[#008d3e] text-white shadow-md' : 'hover:bg-[#8ec31f]/10 bg-gray-50 text-[#2d3a31]/60'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleConfidenceSubmit} className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold hover:bg-[#007031] shadow-lg shadow-[#008d3e]/20 transition-all text-sm">提交測驗並開啟訪視</button>
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
    { key: 'health', label: 'Health 健康狀態 (生命徵象與病況)' },
    { key: 'outlook', label: 'Outlook 心理/展望 (情緒與意願)' },
    { key: 'medication', label: 'Medication 用藥狀況 (重合用藥與醫囑性)' },
    { key: 'environment', label: 'Environment 環境安全 (無障礙安全)' },
    { key: 'basicADL', label: 'Basic ADL 生活功能 (自理能力/翻身狀況)' },
    { key: 'access', label: 'Access 輔具/近便 (醫療耗材儀器配置)' },
    { key: 'social', label: 'Social 支持系統 (照護負擔及鄰里支持)' },
    { key: 'instability', label: 'Instability 不穩定性 (快速器官衰竭風險)' },
    { key: 'caregiver', label: 'Caregiver 照護者 (陪護精神狀態/喘息需求)' },
  ];

  const [patientId] = useState(() => localStorage.getItem('cgh_patient_chart_number') || 'P123');

  const handleSave = () => {
    const sName = localStorage.getItem('cgh_student_name') || 'test-user';
    db.saveChecklist({
      userId: sName,
      patientId: patientId,
      items: data as any,
      notes,
      timestamp: Date.now()
    });
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="text-center py-12 space-y-6 bg-white border border-[#008d3e]/10 rounded-2xl p-8 max-w-xl mx-auto shadow-sm">
        <div className="inline-block p-4 bg-[#f4f9f4] text-[#008d3e] rounded-full mb-2 shadow-sm border border-[#008d3e]/10 animate-pulse">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-2xl font-bold text-[#008d3e]">訪視評估紀錄已成功儲存</h2>
        <p className="text-[#2d3a31]/60 text-sm max-w-sm mx-auto leading-relaxed">
          辛苦了！國泰急症在宅醫療團隊感謝您的熱心記錄。完成此階段後，請進入最後的反思回饋。
        </p>
        <button 
          onClick={() => setView('post-test')}
          className="bg-[#008d3e] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#007031] shadow-lg shadow-[#008d3e]/20 transition-all text-sm"
        >
          前往最後反思回饋
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-white border border-[#008d3e]/10 rounded-2xl p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#008d3e]/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#008d3e]">訪視實務：HOME BASIC 臨床評估</h2>
          <p className="text-xs text-[#2d3a31]/60 mt-1">請在此詳實紀錄您與國泰醫療往診時對在宅住院患者({patientId})之家庭觀察</p>
        </div>
        <div className="text-xs font-bold text-[#008d3e] bg-[#8ec31f]/10 px-3.5 py-1.5 rounded-full border border-[#008d3e]/15 self-start">患者ID：{patientId}</div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {homeBasic.map((item) => (
          <div key={item.key} className="space-y-2">
            <label className="block font-bold text-[#2d3a31] text-sm">{item.label}</label>
            <textarea 
              value={data[item.key]}
              onChange={(e) => setData({...data, [item.key]: e.target.value})}
              className="w-full p-4 bg-[#f4f9f4]/15 border border-[#008d3e]/10 rounded-xl focus:ring-2 focus:ring-[#8ec31f] outline-none text-[#2d3a31] text-sm transition-shadow shadow-sm placeholder:text-[#2d3a31]/30"
              placeholder={`請輸入關於 ${item.label} 的到府實地觀察與細部記錄細節...`}
              rows={2}
            />
          </div>
        ))}

        <div className="pt-4 space-y-2 border-t border-[#008d3e]/10">
          <label className="block font-bold text-[#2d3a31] text-sm">綜合臨床備註 (如：床側 POCT 或餘尿超音波之數據紀錄)</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-4 bg-[#f4f9f4]/15 border border-[#008d3e]/10 rounded-xl focus:ring-2 focus:ring-[#8ec31f] outline-none text-[#2d3a31] text-sm transition-shadow shadow-sm placeholder:text-[#2d3a31]/30"
            placeholder="補充其它需要附註之在宅醫療細節、POCT CRP / pH / 滲透壓量測數據等臨床紀錄..."
            rows={3}
          />
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#007031] transition shadow-lg shadow-[#008d3e]/20 text-sm"
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
    const sName = localStorage.getItem('cgh_student_name') || 'test-user';
    db.saveResult({
      userId: sName,
      testId: 'post-reflection',
      answers,
      timestamp: Date.now()
    });
    setFinished(true);
  };

  if (finished) {
    return (
      <div className="text-center py-12 space-y-6 bg-white border border-[#008d3e]/10 rounded-2xl p-8 max-w-xl mx-auto shadow-sm">
        <div className="inline-block p-4 bg-[#f4f9f4] text-[#008d3e] rounded-full mb-2 shadow-sm border border-[#008d3e]/10 animate-bounce">
          <BarChart size={48} />
        </div>
        <h2 className="text-2xl font-bold text-[#008d3e]">學習歷程已圓滿完成！</h2>
        <p className="text-[#2d3a31]/60 text-sm max-w-sm mx-auto leading-relaxed">
          非常感謝您的深度思考與高質量反思，這將是發展您為稱職醫事人員自我人格（PIF）的重要核心！請點選下方返回首頁，並在首頁點選「彙整 Excel」寄信送交您的成果給老師。
        </p>
        <button 
          onClick={() => setView('dashboard')}
          className="bg-[#008d3e] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#007031] shadow-lg shadow-[#008d3e]/20 transition-all text-sm"
        >
          回到首頁彙整 Excel 成果
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 bg-white border border-[#008d3e]/10 rounded-2xl p-8 shadow-sm">
      {step === 'confidence' ? (
        <>
          <div className="border-b border-[#008d3e]/10 pb-4">
            <h2 className="text-2xl font-bold text-[#008d3e]">在宅參訪後信心評核</h2>
            <p className="text-xs text-gray-500 mt-1">參訪後自檢，評分 1-5 分 (1:非常不合適/無信心, 5:極度有信心)</p>
          </div>
          <div className="space-y-6">
            {CONFIDENCE_QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-3">
                <p className="font-bold text-[#2d3a31] text-sm leading-relaxed">{q.text}</p>
                <div className="flex justify-between gap-1.5 md:gap-2">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      onClick={() => setAnswers({...answers, [q.id]: val})}
                      className={`flex-1 py-3.5 rounded-lg border border-[#008d3e]/10 font-bold transition text-sm ${
                        answers[q.id] === val ? 'bg-[#008d3e] border-[#008d3e] text-white shadow-md' : 'hover:bg-[#8ec31f]/10 bg-gray-50 text-[#2d3a31]/60'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleConfidenceSubmit} className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold hover:bg-[#007031] transition-colors shadow-md text-sm">進入 Kolb 臨床反思撰寫</button>
          </div>
        </>
      ) : (
        <>
          <div className="border-b border-[#008d3e]/10 pb-4">
            <h2 className="text-2xl font-bold text-[#008d3e]">深度反思與學習札記 (Kolb Cycle)</h2>
            <p className="text-xs text-gray-400 mt-1">用心記錄今日的寶貴經驗，能讓您的臨床成長更加深刻紮實</p>
          </div>
          <div className="space-y-6">
            {REFLECTION_QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-3">
                <p className="font-bold text-[#008d3e] text-sm">{q.text}</p>
                <textarea 
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                  className="w-full p-4 bg-[#f4f9f4]/15 border border-[#008d3e]/10 rounded-xl focus:ring-2 focus:ring-[#8ec31f] outline-none text-[#2d3a31] text-sm transition-shadow shadow-sm placeholder:text-[#2d3a31]/30"
                  rows={4}
                  placeholder="請在此詳細抒寫您的臨床體認、醫病交往感觸與思考..."
                />
              </div>
            ))}
            <button onClick={handleReflectionSubmit} className="w-full bg-[#008d3e] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#007031] shadow-lg shadow-[#008d3e]/20 transition-all text-sm">提交所有反思並完成本套培訓</button>
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
    <div className="space-y-8 pb-20 bg-white border border-[#008d3e]/10 rounded-2xl p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#008d3e]/10 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('dashboard')} className="text-[#008d3e] font-bold hover:underline text-sm flex items-center gap-1">← 回首頁</button>
          <span className="text-[#008d3e]/30">/</span>
          <h2 className="text-2xl font-bold text-[#008d3e]">培訓內容管理 (管理端)</h2>
        </div>
        <button 
          onClick={handleAddItem}
          className="bg-[#008d3e] text-white px-4 py-2.5 rounded-lg font-bold hover:bg-[#007031] flex items-center gap-2 shadow-sm transition-colors text-xs self-start"
        >
          新增培訓項目 +
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
                  className="p-2 text-xs border border-[#008d3e]/10 rounded bg-[#f4f9f4] text-[#2d3a31]"
                >
                  <option value="law">法規政策</option>
                  <option value="indication">收案適應症</option>
                  <option value="treatment">治療策略</option>
                  <option value="tool">評估與檢測工具</option>
                </select>
                <textarea 
                  value={editingItem.content} 
                  onChange={e => setEditingItem({...editingItem, content: e.target.value})}
                  className="w-full p-3 border border-[#008d3e]/10 rounded-xl min-h-[150px] text-sm text-[#2d3a31] focus:ring-1 focus:ring-[#8ec31f] outline-none"
                />
                <div className="flex gap-2">
                  <button onClick={handleSave} className="bg-[#008d3e] text-white px-6 py-2 rounded-lg text-xs font-bold hover:bg-[#007031] shadow-sm">儲存內容</button>
                  <button onClick={() => setEditingItem(null)} className="bg-white text-[#2d3a31]/60 px-6 py-2 rounded-lg text-xs font-bold border border-[#008d3e]/10">取消</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[9px] uppercase font-black tracking-widest bg-[#8ec31f]/15 text-[#008d3e] px-3 py-1 rounded-full mb-3 inline-block border border-[#008d3e]/10">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#008d3e]">{item.title}</h3>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button 
                      onClick={() => setEditingItem(item)}
                      className="px-3 py-1.5 text-xs font-bold text-[#008d3e] hover:bg-[#f4f9f4] rounded-lg border border-[#008d3e]/20 transition-colors"
                    >
                      編輯
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg border border-red-100 transition-colors"
                    >
                      刪除
                    </button>
                  </div>
                </div>
                <p className="text-[#2d3a31]/80 text-xs leading-relaxed line-clamp-3 whitespace-pre-line">{item.content}</p>
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
          重置與還復初始國泰在宅常規教材
        </button>
      </div>
    </div>
  );
}
