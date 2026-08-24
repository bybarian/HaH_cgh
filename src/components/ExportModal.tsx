/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Mail } from 'lucide-react';
import { db } from '../services/store';
import { TranslationData, Language } from '../i18n';

export function ExportModal({
  isOpen,
  onClose,
  studentName,
  visitDate,
  fileName,
  mailSubject,
  mailBody,
  t,
  lang
}: {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  visitDate: string;
  fileName: string;
  mailSubject: string;
  mailBody: string;
  t: TranslationData;
  lang: Language;
}) {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const chartNumber = localStorage.getItem('cgh_patient_chart_number') || 'P123';
  const preResult = db.getResults().filter((r: any) => r.testId === 'pre-quiz').pop()?.answers || {};
  const chData = db.getChecklists().pop()?.items || {};
  const latestNotes = db.getChecklists().pop()?.notes || (lang === 'en' ? 'None' : '無');
  const postResult = db.getResults().filter((r: any) => r.testId === 'post-reflection').pop()?.answers || {};

  const handleCopyRawBackup = () => {
    const text = `=== CGH Home Care Learning Portfolio Plain Text Backup ===
Student Name: ${studentName}
Patient Chart Number: ${chartNumber}
Visit Date: ${visitDate}
Export Timestamp: ${new Date().toLocaleString()}

--- 1. Pre-Visit Evaluation ---
Q1: ${preResult['q1'] || 'N/A'}
Q2: ${preResult['q2'] || 'N/A'}
Q3: ${preResult['q3'] || 'N/A'}
Q4: ${preResult['q4'] || 'N/A'}
Q5: ${preResult['q5'] || 'N/A'}
Confidence C1: ${preResult['c1'] || 'N/A'}
Confidence C2: ${preResult['c2'] || 'N/A'}
Confidence C3: ${preResult['c3'] || 'N/A'}

--- 2. HOME BASIC Checklist ---
H - Health: ${chData['health'] || 'N/A'}
O - Outlook: ${chData['outlook'] || 'N/A'}
M - Medication: ${chData['medication'] || 'N/A'}
E - Environment: ${chData['environment'] || 'N/A'}
B - Basic ADL: ${chData['basicADL'] || 'N/A'}
A - Access: ${chData['access'] || 'N/A'}
S - Social: ${chData['social'] || 'N/A'}
I - Instability: ${chData['instability'] || 'N/A'}
C - Caregiver: ${chData['caregiver'] || 'N/A'}
Clinical Notes: ${latestNotes}

--- 3. Post-Visit Reflection ---
Post-Confidence C1: ${postResult['c1'] || 'N/A'}
Post-Confidence C2: ${postResult['c2'] || 'N/A'}
Post-Confidence C3: ${postResult['c3'] || 'N/A'}
Tech Integration: ${postResult['eval_tech'] || 'N/A'}
Teamwork & Comm: ${postResult['eval_team'] || 'N/A'}
Patient/Family Comm: ${postResult['eval_comm'] || 'N/A'}
System & Resources: ${postResult['eval_system'] || 'N/A'}
Role Identity: ${postResult['eval_role'] || 'N/A'}
Free Reflection: ${postResult['free_reflection'] || 'N/A'}
One-Sentence Summary: ${postResult['one_sentence_summary'] || 'N/A'}
`;
    navigator.clipboard.writeText(text);
    setCopySuccess('full_raw');
    setTimeout(() => setCopySuccess(null), 3000);
  };

  const isEn = lang === 'en';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#008d3e]/20 space-y-4 my-8">
        <div className="flex items-center gap-3 text-[#008d3e]">
          <div className="bg-[#008d3e]/10 p-2 rounded-full text-[#008d3e]">
            <CheckCircle size={28} />
          </div>
          <h3 className="text-xl font-bold">
            {isEn ? '🎉 Portfolio Excel Exported Successfully!' : '🎉 學習歷程 Excel 彙整成功！'}
          </h3>
        </div>
        
        <p className="text-sm text-[#2d3a31]/80 leading-relaxed">
          {isEn
            ? `The system has generated a dedicated Excel learning portfolio for trainee ${studentName} (including pre-test, HOME BASIC assessment, and reflections) and initiated download in your browser.`
            : `系統已為學員 ${studentName} 彙整產生專屬的 Excel 學習歷程檔案（包含前測、家訪 HOME BASIC 紀錄及反思心得），並已自動在瀏覽器中啟動下載。`
          }
        </p>

        {/* Sandbox Notice */}
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2">
          <p className="text-xs font-bold text-amber-700 flex items-center gap-1">
            <AlertTriangle size={14} className="text-amber-500" />
            <span>{isEn ? '⚠️ Download blocked or preview sandbox restriction?' : '⚠️ 下載無反應或遭遇安全限制？ (沙箱保護提示)'}</span>
          </p>
          <p className="text-xs text-amber-900/80 leading-relaxed">
            {isEn
              ? 'If you are previewing inside an iframe, click "Open in New Tab" at the top right to download without browser restrictions, or copy the plain text backup below.'
              : '若您是在 AI Studio 預覽視窗中，瀏覽器可能會安全阻擋砂箱 Iframe 下載。請點選畫面右上角「在新分頁開啟 (Open in New Tab)」，在新開啟的完整網頁中重新點選匯出，即可正常下載 Excel！'
            }
          </p>
          <button
            onClick={handleCopyRawBackup}
            className="w-full mt-1.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition shadow-sm border border-amber-700/20"
          >
            {copySuccess === 'full_raw'
              ? (isEn ? '✅ All data copied to clipboard!' : '✅ 全數資料已成功複製到剪貼簿！')
              : (isEn ? '📋 Copy Plain-Text Portfolio Backup' : '📋 一鍵複製全套學習資料 (純文字備份，避免沙箱流失)')
            }
          </button>
        </div>

        <div className="bg-[#f4f9f4] p-4 rounded-xl border border-[#008d3e]/10 space-y-2">
          <p className="text-xs font-bold text-[#008d3e] flex items-center gap-1">
            <AlertCircle size={14} className="text-[#8ec31f]" />
            <span>{isEn ? '📧 Email Submission Guide' : '📧 郵件交件與傳送指南'}</span>
          </p>
          <ol className="list-decimal list-inside text-xs text-[#2d3a31]/80 space-y-1.5 leading-relaxed">
            {isEn ? (
              <>
                <li>Ensure the downloaded file <strong>「{fileName}」</strong> is saved on your device.</li>
                <li>Click the <strong>「Open Mail Client」</strong> button below to prefill recipient and draft.</li>
                <li><strong>[Important]</strong> Remember to attach the downloaded <strong>Excel file</strong> manually before hitting send!</li>
              </>
            ) : (
              <>
                <li>請確認您的電腦/手機已經成功下載名為 <strong>「{fileName}」</strong> 的檔案。</li>
                <li>點擊下方 <strong>「自動喚醒信箱」</strong> 大按鈕。如果您裝有 Outlook/Mail，將自動帶入指導老師收件人與信件內文。</li>
                <li><strong>【特別提醒】</strong> 請記得點擊信件中的 <strong>「夾帶附件」</strong>，手動將剛下載的 <strong>Excel 檔案</strong> 夾帶進去，再寄送出去！</li>
              </>
            )}
          </ol>
        </div>

        {/* Manual Copy Fallbacks */}
        <div className="border border-[#008d3e]/15 rounded-xl p-3 bg-gray-50/70 space-y-2.5 text-xs">
          <p className="font-bold text-[#2d3a31] flex items-center gap-1">
            <span>{isEn ? '💡 Webmail manual copy fallback (e.g. Gmail / Outlook Web):' : '💡 若上方自動喚醒信箱無反應（例如使用 Google Webmail）：'}</span>
          </p>
          
          <div className="space-y-1.5">
            <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
              <span className="text-[#2d3a31]/70 font-mono">Recipient: bybarian@gmail.com</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('bybarian@gmail.com');
                  setCopySuccess('email');
                  setTimeout(() => setCopySuccess(null), 2000);
                }}
                className="text-xs font-bold text-[#008d3e] hover:text-[#007031] transition-colors shrink-0 pl-2"
              >
                {copySuccess === 'email' ? (isEn ? '✅ Copied' : '✅ 已複製') : (isEn ? '📋 Copy Email' : '📋 複製信箱')}
              </button>
            </div>

            <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
              <span className="text-[#2d3a31]/70 font-mono truncate max-w-[280px]">Subject: {mailSubject}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(mailSubject);
                  setCopySuccess('subject');
                  setTimeout(() => setCopySuccess(null), 2000);
                }}
                className="text-xs font-bold text-[#008d3e] hover:text-[#007031] transition-colors shrink-0 pl-2"
              >
                {copySuccess === 'subject' ? (isEn ? '✅ Copied' : '✅ 已複製') : (isEn ? '📋 Copy Subject' : '📋 複製標題')}
              </button>
            </div>

            <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
              <span className="text-[#2d3a31]/70 font-mono truncate max-w-[280px]">Body: {mailBody.slice(0, 30)}...</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(mailBody);
                  setCopySuccess('body');
                  setTimeout(() => setCopySuccess(null), 2000);
                }}
                className="text-xs font-bold text-[#008d3e] hover:text-[#007031] transition-colors shrink-0 pl-2"
              >
                {copySuccess === 'body' ? (isEn ? '✅ Copied' : '✅ 已複製') : (isEn ? '📋 Copy Body' : '📋 複製內文')}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <a
            href={`mailto:bybarian@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`}
            className="flex-1 bg-[#008d3e] hover:bg-[#007031] text-white font-bold py-2.5 rounded-xl transition text-sm flex items-center justify-center gap-2 text-center"
          >
            <Mail size={16} />
            <span>{isEn ? 'Open Mail Client' : '自動喚醒信箱'}</span>
          </a>
          <button
            onClick={onClose}
            className="flex-1 bg-white hover:bg-gray-50 text-[#2d3a31]/60 font-bold py-2.5 rounded-xl border border-gray-200 transition text-sm"
          >
            {isEn ? 'Close Notice' : '關閉提示視窗'}
          </button>
        </div>
      </div>
    </div>
  );
}
