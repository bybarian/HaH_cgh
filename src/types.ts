/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KnowledgeItem {
  id: string;
  category: 'law' | 'indication' | 'treatment' | 'tool';
  title: string;
  content: string;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'scale' | 'text';
  text: string;
  options?: string[];
  correctAnswer?: string; // For quiz
}

export interface TestResult {
  userId: string;
  testId: 'pre-quiz' | 'pre-confidence' | 'post-confidence' | 'post-reflection';
  answers: Record<string, any>;
  score?: number;
  timestamp: number;
}

export interface HomeBasicChecklist {
  userId: string;
  patientId: string;
  items: {
    health: string;
    outlook: string;
    medication: string;
    environment: string;
    basicADL: string;
    access: string;
    social: string;
    instability: string;
    caregiver: string;
  };
  notes: string;
  timestamp: number;
}

export const INITIAL_KNOWLEDGE: KnowledgeItem[] = [
  {
    id: 'law-1',
    category: 'law',
    title: '國泰在宅急症模式 A/B/C',
    content: '模式A（居家個案）：原參與居家整合醫藥計畫者。\n模式B（機構住民）：由參與「減少照護機構住民至醫療機構就醫方案」之照護機構住民。\n模式C（急診個案）：經ER評估為肺炎、尿路感染或軟組織感染，且符合「失能（巴氏量表<60分）」或「因疾病特性就醫不便者」。'
  },
  {
    id: 'law-2',
    category: 'law',
    title: '收案程序與規定',
    content: '1. 向病人詳細說明並取得同意書。\n2. 收案後24小時內至VPN登打收案申請書。\n3. 主治醫師同一時段收案上限為20人。\n4. 若有藥事或呼吸照護需求，得連結藥師或呼吸治療師。'
  },
  {
    id: 'ind-1',
    category: 'indication',
    title: '肺炎：詳細收案適應症 (需符合3/4項)',
    content: '1. 臨床症狀：明顯下呼吸道症狀（濃痰、氣促、喘鳴、肺部聽診異常-囉音/喘鳴音）；或全身症狀（發燒、心跳快、血壓偏低、意識改變如嗜睡或不安、食慾差）。\n2. 實驗室檢查：WBC/Neutrophil上升、CRP上升、流感/COVID-19快篩陽性、肺炎鏈球菌/退伍軍人尿液抗原陽性。\n3. 影像學：X光或超音波發現（影像備查）。\n4. 細菌學：痰液或血液有意義發現。'
  },
  {
    id: 'ind-2',
    category: 'indication',
    title: '尿路感染：詳細收案適應症 (需符合2/4項)',
    content: '1. 局部症狀：解尿灼熱、疼痛、尿少、膿尿且過去一週口服藥失敗、或腰側敲擊痛。\n2. 全身症狀：發燒、心跳快、血壓偏低、意識改變（嗜睡/混亂）、食慾差。\n3. 實驗室檢查：WBC/Neutrophil上升、CRP上升、尿液常規白血球上升、Bacteria/Nitrit呈陽性。\n4. 細菌學：尿液或血液有意義發現。'
  },
  {
    id: 'ind-3',
    category: 'indication',
    title: '軟組織感染：詳細收案適應症 (需符合3/4項)',
    content: '1. 局部症狀：如紅腫熱痛，且過去一週經口服抗生素治療失敗。\n2. 全身症狀：發燒、心跳快、血壓偏低、意識改變、食慾差。\n3. 理學檢查：皮膚紅腫、傷口或化膿表現（影像備查）。\n4. 實驗室檢查：白血球/Neutrophil上升、CRP上升、或細菌培養有意義發現。'
  },
  {
    id: 'treatment-1',
    category: 'treatment',
    title: '目標天數與給付上限',
    content: '各疾病目標住院天數（點數）：\n- 肺炎：目標9天（2800-4929點/日），上限14天。\n- 尿路感染：目標7天（2050-3608點/日），上限9天。\n- 軟組織感染：目標6天（2329-4099點/日），上限8天。'
  },
  {
    id: 'treatment-2',
    category: 'treatment',
    title: '後送與監測指標',
    content: '結案條件：完成治療、死亡、遷居、拒絕訪視、轉急診或轉住院。\n重要監測指標：\n1. 結案後14天內轉住院率。\n2. 結案後14天內轉急診率。\n3. 緩解完治率。\n4. 超出計畫目標天數案件比率。'
  },
  {
    id: 'tool-1',
    category: 'tool',
    title: '床邊即時檢測 (POCT)',
    content: '國泰在宅團隊配備：\n- EPOC/i-STAT：Blood gas, Hct, Ca++, Na/K/Cl, Glucose, BUN, Lactate, Creatinine。\n- iProtin/Roche Cobas：CRP, Cardia enzyme。\n- 攜帶式設備：12 Lead ECG (QT Medical), CXR (ERI), Ultrasound (64通道)。'
  },
  {
    id: 'treatment-3',
    category: 'treatment',
    title: '照護內容與團隊職責',
    content: '1. 24小時諮詢專線與緊急訪視服務。\n2. 通訊診療與綠色通道後送機制。\n3. 協助連結長照資源與個案健康管理。\n4. 醫師應於收案3天內完成實地訪視，護理師則需每日實地訪視。'
  },
  {
    id: 'law-3',
    category: 'law',
    title: '部分負擔與費用計算',
    content: '比照居家照護收取 5% 部分負擔費用。\n計算方式：(每日醫療費 + 每日護理費) * 5%。\n註：特約醫事機構對同一病人於相同照護期間，僅可擇一最適疾病（主診斷）進行申報。'
  }
];

export const PRE_QUIZ: Question[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    text: '在宅急症照護目前主要針對哪三種感染？',
    options: ['肺炎、尿路感染、軟組織感染', '腸胃炎、骨折、肺炎', '腦中風、糖尿病、氣喘', '流感、新冠、感冒'],
    correctAnswer: '肺炎、尿路感染、軟組織感染'
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    text: '哪一項不屬於 HOME BASIC 的評估範圍？',
    options: ['Environment 環境安全', 'Income 收入狀況', 'Outlook 心理展望', 'Basic ADL 日常生活'],
    correctAnswer: 'Income 收入狀況'
  }
];

export const CONFIDENCE_QUESTIONS: Question[] = [
  { id: 'c1', type: 'scale', text: '我覺得我對在宅急症照護的法規與知識有充分了解。' },
  { id: 'c2', type: 'scale', text: '我有信心能獨立完成 HOME BASIC 居家評估。' },
  { id: 'c3', type: 'scale', text: '我有信心能與病患及其家屬進行有效的溝通。' }
];

export const REFLECTION_QUESTIONS: Question[] = [
  { id: 'r1', type: 'text', text: '「我看見了什麼」：請簡述今日訪視的觀察。' },
  { id: 'r2', type: 'text', text: '「我怎麼理解」：這些觀察對您有什麼臨床意義？' },
  { id: 'r3', type: 'text', text: '對於五大能力（病人照護、溝通等），您覺得今日最有收穫的是哪一部分？' },
  { id: 'r4', type: 'text', text: '「下一次我會如何做」：未來若有類似個案，您的行動計畫？' }
];
