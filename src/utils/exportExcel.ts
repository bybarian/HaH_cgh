/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as XLSX from 'xlsx';
import { db } from '../services/store';
import { TranslationData, Language } from '../i18n';

export function exportExcelWorkbook(
  name: string,
  date: string,
  t: TranslationData,
  lang: Language
): { blob: Blob; fileName: string; mailSubject: string; mailBody: string } {
  const chartNumber = localStorage.getItem('cgh_patient_chart_number') || 'P123';
  const wb = XLSX.utils.book_new();

  const getConfidenceLabel = (val: any) => {
    if (!val) return lang === 'en' ? 'Unfilled' : '未填寫';
    return `${val} ${lang === 'en' ? 'Points' : '分'}`;
  };

  const getFrequencyLabel = (val: any) => {
    const item = t.emotionFrequency.find(f => f.val === Number(val));
    return item ? item.label : (lang === 'en' ? 'Unfilled' : '未填寫');
  };

  const getEvalLabel = (val: any) => {
    if (!val) return lang === 'en' ? 'Unfilled' : '未填寫';
    if (Number(val) === 1) return lang === 'en' ? '1 (Novice)' : '1 (尚未)';
    if (Number(val) === 5) return lang === 'en' ? '5 (Independent under supervision)' : '5 (可在監督下獨立執行)';
    return `${val} ${lang === 'en' ? 'Points' : '分'}`;
  };

  // Sheet 1: Overview
  const overview = [
    [lang === 'en' ? 'Cathay General Hospital Home Care Training Report' : '國泰綜合醫院在宅照護學習歷程彙整表'],
    [],
    [
      lang === 'en' ? 'Data Field' : '核心資料項目', 
      lang === 'en' ? 'Content' : '填寫內容', 
      lang === 'en' ? 'Note' : '備註說明'
    ],
    [
      lang === 'en' ? 'Student Name' : '學員姓名 (Student Name)', 
      name, 
      lang === 'en' ? 'Student Identity' : '核對學員身分'
    ],
    [
      lang === 'en' ? 'Patient Chart Number' : '病人病歷號 (Patient Chart Number)', 
      chartNumber, 
      lang === 'en' ? 'Patient Medical Record' : '核對病患個案病歷號'
    ],
    [
      lang === 'en' ? 'Visit / Record Date' : '參訪/填寫日期 (Visit Date)', 
      date || (lang === 'en' ? 'Unfilled' : '未填寫'), 
      lang === 'en' ? 'Visit Timeline' : '核對學習時效'
    ],
    [
      lang === 'en' ? 'Export Timestamp' : '系統整合彙整時間 (Export Time)', 
      new Date().toLocaleString(), 
      lang === 'en' ? 'Auto Timestamp' : '自動日期戳記'
    ],
    [],
    [
      lang === 'en' ? 'Notice' : '重要說明', 
      lang === 'en' 
        ? 'Please email this Excel report as an attachment to your supervisor for academic grading.' 
        : '請將此 Excel 檔以電子郵件附件方式寄給指導老師作為學習評分依據。', 
      ''
    ],
  ];
  const wsOverview = XLSX.utils.aoa_to_sheet(overview);
  XLSX.utils.book_append_sheet(wb, wsOverview, lang === 'en' ? '1. Student Profile' : '1. 個人資料與說明');

  // Sheet 2: Pre-Quiz
  const results = db.getResults();
  const preQuizResult = results.filter(r => r.testId === 'pre-quiz').pop();
  const preQuizAnswers = preQuizResult?.answers || {};

  const preQuizData = [
    [lang === 'en' ? '1. Pre-Visit Evaluation - Knowledge & Confidence Assessment' : '一、參訪前測 - 知識與信心評估'],
    [],
    [
      lang === 'en' ? 'Question ID' : '題目編號', 
      lang === 'en' ? 'Question Prompt' : '題目敘述', 
      lang === 'en' ? 'Your Response' : '您的作答', 
      lang === 'en' ? 'Reference / Metric' : '標準答案 / 信心指標'
    ],
    ...t.preQuizQuestions.map((q, idx) => [
      `Q${idx + 1}`,
      q.text,
      preQuizAnswers[q.id] || (lang === 'en' ? 'Unfilled' : '未填寫'),
      q.options?.[0] || ''
    ]),
    [],
    ...t.confidenceQuestions.map((q, idx) => [
      `C${idx + 1}`,
      q.text,
      getConfidenceLabel(preQuizAnswers[q.id]),
      lang === 'en' ? '1-5 Likert Scale' : '1-5 級分尺度評量'
    ])
  ];
  const wsPreQuiz = XLSX.utils.aoa_to_sheet(preQuizData);
  XLSX.utils.book_append_sheet(wb, wsPreQuiz, lang === 'en' ? '2. Pre-Test' : '2. 參訪前測');

  // Sheet 3: HOME BASIC Checklist
  const checklists = db.getChecklists();
  const latestChecklist = checklists.pop();
  const chData = latestChecklist?.items || ({} as any);

  const checklistData = [
    [lang === 'en' ? `2. In-Visit Clinical Evaluation - HOME BASIC (Patient: ${chartNumber})` : `二、訪視中實務評估 - HOME BASIC 紀錄（患者 ID: ${chartNumber}）`],
    [],
    [
      lang === 'en' ? 'Domain' : '評估維度字元', 
      lang === 'en' ? 'Dimension Title' : '評估項目名稱', 
      lang === 'en' ? 'Observations & Clinical Findings' : '訪視觀察紀錄與細節觀察'
    ],
    ...t.checklist.items.map(dim => {
      const char = dim.key === 'basicADL' ? 'B' : dim.key.charAt(0).toUpperCase();
      return [
        char,
        dim.label,
        chData[dim.key] || (lang === 'en' ? 'Unfilled' : '未填寫')
      ];
    }),
    [],
    [
      lang === 'en' ? 'Notes' : '備註', 
      lang === 'en' ? 'Comprehensive Clinical Notes' : '綜合臨床觀察備註', 
      latestChecklist?.notes || (lang === 'en' ? 'None' : '無')
    ]
  ];
  const wsChecklist = XLSX.utils.aoa_to_sheet(checklistData);
  XLSX.utils.book_append_sheet(wb, wsChecklist, lang === 'en' ? '3. HOME BASIC Record' : '3. 居家訪視評估');

  // Sheet 4: Post-Reflection
  const postResult = results.filter(r => r.testId === 'post-reflection').pop();
  const postAnswers = postResult?.answers || {};

  const reflectionData: any[][] = [
    [lang === 'en' ? '3. Hospital-at-Home Post-Visit Reflection Report' : '三、在宅急症照護反思紀錄 (Hospital-at-Home reflection report)'],
    [],
    [lang === 'en' ? '【Post-Visit Confidence Self-Assessment】 (1-5 Likert Scale)' : '【參訪後信心指標自評】 (1-5 級分尺度量評)'],
    [
      lang === 'en' ? 'Metric' : '評估指標', 
      lang === 'en' ? 'Statement' : '自我意向描述', 
      lang === 'en' ? 'Post-Test Score' : '後測分數結果'
    ],
    ...t.confidenceQuestions.map((q, idx) => [
      `C${idx + 1} (${lang === 'en' ? 'Post-Visit' : '後測信心'})`,
      q.text,
      getConfidenceLabel(postAnswers[q.id])
    ]),
    [],
    [lang === 'en' ? '【Part 1: 5 Core Competencies Evaluation】 (1: Novice, 5: Independent under supervision)' : '【第一部分：五大領域自我評估】 (1分:尚未, 5分:可在監督下獨立執行)'],
    [
      lang === 'en' ? 'Domain' : '評估領域', 
      lang === 'en' ? 'Score' : '自我評估得分與描述', 
      lang === 'en' ? 'Description' : '說明'
    ],
    ...t.evalDomains.map((dom, idx) => [
      `${idx + 1}. ${dom.label}`,
      getEvalLabel(postAnswers[dom.id]),
      ''
    ]),
    [],
    [lang === 'en' ? '【Part 2: Selected Domain Deep Reflection】' : '【第二部分：選擇領域進行深度反思】'],
    [
      lang === 'en' ? 'Domain' : '反思領域', 
      lang === 'en' ? 'Prompt' : '問題導引', 
      lang === 'en' ? 'Reflection Log' : '您填寫的 reflection 反思詳述'
    ]
  ];

  const selected = postAnswers['selected_domains'] || ['tech', 'team', 'comm'];
  selected.forEach((domId: string) => {
    const domObj = t.deepReflectionDomains.find(d => d.id === domId);
    const domName = domObj?.label || domId;
    t.deepReflectionQuestions.forEach(q => {
      reflectionData.push([
        domName,
        q.label,
        postAnswers[`deep_${domId}_${q.id}`] || ''
      ]);
    });
  });

  reflectionData.push(
    [],
    [lang === 'en' ? '【Part 3: Free Reflection & Most Challenging Moment】' : '【第三部分：自由反思與最具挑戰片段】'],
    [
      lang === 'en' ? 'Prompt' : '自由描述題目', 
      lang === 'en' ? 'Student Reflections' : '詳細記錄內容', 
      ''
    ],
    [
      t.postTest.qFreeReflection, 
      postAnswers['free_reflection'] || (lang === 'en' ? 'Unfilled' : '未填寫'), 
      ''
    ],
    [],
    [lang === 'en' ? '【Part 4: One-Sentence Summary of Physician Role】' : '【第四部分：一句話總結醫師角色理解】'],
    [
      t.postTest.qOneSentence, 
      postAnswers['one_sentence_summary'] || (lang === 'en' ? 'Unfilled' : '未填寫'), 
      ''
    ],
    [],
    [lang === 'en' ? '【Part 5: Emotional & Cognitive Load Assessment】' : '【第五部分：情緒與心理狀態檢視】 (評分尺度: 從未 -> 始終存在)'],
    [
      lang === 'en' ? 'Emotional / Psychological Metric' : '情緒/心理指標狀態', 
      lang === 'en' ? 'Frequency' : '感受頻率得分', 
      lang === 'en' ? 'Description' : '感受描述'
    ],
    ...t.emotionItems.map(emo => [
      emo.label,
      getFrequencyLabel(postAnswers[`emotion_${emo.id}`] || postAnswers[emo.id]),
      ''
    ])
  );

  const wsReflection = XLSX.utils.aoa_to_sheet(reflectionData);
  XLSX.utils.book_append_sheet(wb, wsReflection, lang === 'en' ? '4. Post-Reflection' : '4. 參訪後反思問卷');

  wsOverview['!cols'] = [{ wch: 30 }, { wch: 55 }, { wch: 25 }];
  wsPreQuiz['!cols'] = [{ wch: 15 }, { wch: 50 }, { wch: 35 }, { wch: 30 }];
  wsChecklist['!cols'] = [{ wch: 20 }, { wch: 35 }, { wch: 80 }];
  wsReflection['!cols'] = [{ wch: 25 }, { wch: 50 }, { wch: 85 }];

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  const s2ab = (s: string) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  };

  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  const fileName = lang === 'en' 
    ? `CGH_Home_Care_Learning_Portfolio-${name}-${date || 'Undated'}.xlsx`
    : `國泰在宅醫療學習歷程-${name}-${date || '未填日期'}.xlsx`;

  const mailSubject = lang === 'en'
    ? `[CGH Home Care Visit] ${name}'s Learning Portfolio & HOME BASIC Checklist (Chart: ${chartNumber}) - ${date || 'Undated'}`
    : `【國泰在宅醫療參訪】${name} 的學習心得與 HOME BASIC 評估核檢表 (病歷號: ${chartNumber}) - ${date || '未填日期'}`;

  const mailBody = lang === 'en'
    ? `Dear Supervisor,\n\nI am ${name}, a trainee student at Cathay General Hospital.\n\nI have successfully completed the Home-Based Care training program, including the pre-test, in-visit HOME BASIC assessment (Chart No: ${chartNumber}), and post-visit reflection portfolio.\n\nPlease find attached my compiled Excel learning report (${fileName}) for your academic review.\n\nSincerely,\nCathay General Hospital - Department of Medical Education / Emergency Medicine\n\n---\nStudent Name: ${name}\nChart Number: ${chartNumber}\nVisit Date: ${date || 'Undated'}\nGenerated via: CGH Home-Based Care Education Platform`
    : `老師您好：\n\n我是國泰醫院培訓學生 ${name}。\n\n我已順利完成了在宅照護的參訪學習歷程，並填寫了完整的評估表單（病歷號：${chartNumber}）與反思問卷。\n\n隨信附上我所彙整的 Excel 學習歷程檔案（請將剛下載的「${fileName}」檔案附加於本信件中）。\n\n此致\n國泰綜合醫院 教學部/急診部\n\n---\n學生姓名：${name}\n病歷號：${chartNumber}\n填寫日期：${date}\n匯出系統：國泰在宅醫療數位學習平台`;

  return { blob, fileName, mailSubject, mailBody };
}
