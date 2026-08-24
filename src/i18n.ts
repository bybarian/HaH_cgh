/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'zh' | 'en';

export interface TranslationData {
  // Brand & Header
  appTitle: string;
  appSubtitle: string;
  motto: string;
  loggedInStudent: string;
  adminTitle: string;
  adminPrompt: string;
  adminAuthFailed: string;
  backToHome: string;
  footerText: string;

  // Navigation & Common
  stepLabel: string;
  completed: string;
  unfilled: string;
  nextStep: string;
  prevStep: string;
  save: string;
  submit: string;
  cancel: string;
  edit: string;
  delete: string;
  close: string;
  required: string;

  // Dashboard
  heroTitle: string;
  heroDesc: string;
  supervisorTitle: string;
  supervisorDept: string;
  studentInfoCardTitle: string;
  studentNameLabel: string;
  studentNamePlaceholder: string;
  patientChartLabel: string;
  patientChartPlaceholder: string;
  visitDateLabel: string;
  studentBoundMsg: (name: string, chart: string) => string;
  studentMissingMsg: string;
  exportBannerTitle: string;
  exportBannerDesc: string;
  exportBannerBtn: string;
  modules: {
    m1: { title: string; desc: string; category: string };
    m2: { title: string; desc: string; category: string };
    m3: { title: string; desc: string; category: string };
    m4: { title: string; desc: string; category: string };
    m5: { title: string; desc: string; category: string };
  };

  // Export Modal
  exportModalTitle: string;
  exportModalDesc: string;
  excelDownloaded: string;
  emailSubjectPrompt: string;
  autoOpenMail: string;
  closeModal: string;

  // Module 1: Knowledge
  knowledgeTabs: {
    home_care: string;
    model: string;
    law: string;
    indication: string;
    treatment: string;
    tool: string;
  };
  homeCareSection: {
    badge: string;
    desc: string;
    defLabel: string;
    contentLabel: string;
    targetLabel: string;
    categories: {
      id: string;
      title: string;
      define: string;
      desc: string;
      audience: string;
    }[];
  };
  careModel: {
    comparisonTitle: string;
    traditionalPathway: string;
    inhomePathway: string;
    stepDetailTitle: (step: number) => string;
    studentTaskNote: string;
    cghOffice: string;
    keyFeaturesTitle: string;
    uploadZoneTitle: string;
    removeImage: string;
    uploadHint: string;
    uploadSubHint: string;
    imageCachedHint: string;
    traditionalSteps: { title: string; desc: string }[];
    inhomeSteps: { title: string; desc: string; details: string }[];
    teamFeatures: { title: string; desc: string; sub: string }[];
  };

  // Module 2: Prep
  prep: {
    reminderTitle: string;
    reminders: string[];
    homeBasicTitle: string;
    readyBtn: string;
    homeBasicItems: { char: string; title: string; desc: string }[];
  };

  // Module 3: Pre-Test
  preTest: {
    quizTitle: string;
    quizDesc: string;
    nextConfidence: string;
    confTitle: string;
    confDesc: string;
    confScale1: string;
    confScale5: string;
    submitBtn: string;
    completeTitle: string;
    completeDesc: string;
    proceedChecklist: string;
  };

  // Module 4: Checklist
  checklist: {
    title: string;
    subtitle: (id: string) => string;
    patientIdBadge: (id: string) => string;
    clinicalNotesLabel: string;
    clinicalNotesPlaceholder: string;
    saveBtn: string;
    successTitle: string;
    successDesc: string;
    proceedPostTest: string;
    fieldPlaceholder: (label: string) => string;
    items: { key: string; label: string }[];
  };

  // Module 5: Post-Test Reflection
  postTest: {
    step1Tag: string;
    step1Title: string;
    step1Desc: string;
    step2Tag: string;
    step2Title: string;
    step2Desc: string;
    step2NotYet: string;
    step2Independent: string;
    step3Tag: string;
    step3Title: string;
    step3Desc: string;
    step3PickerLabel: string;
    step3Fallback: string;
    step3DynamicTag: string;
    step3Placeholder: string;
    step4Tag: string;
    step4Title: string;
    step4Desc: string;
    qFreeReflection: string;
    qFreeReflectionPlaceholder: string;
    qOneSentence: string;
    qOneSentencePlaceholder: string;
    step5Tag: string;
    step5Title: string;
    step5Desc: string;
    step5FreqPrompt: string;
    submitTrainingBtn: string;
    nextPageBtn: string;
    completeTitle: string;
    completeDesc: string;
    backToDashboardBtn: string;
    stepsIndicator: (current: number, total: number) => string;
  };

  // Admin
  admin: {
    title: string;
    addItem: string;
    newItemTitle: string;
    logoConfigTag: string;
    logoConfigTitle: string;
    logoConfigDesc: string;
    method1Title: string;
    method1Desc: string;
    uploadBtn: string;
    resetLogo: string;
    method2Title: string;
    method2Desc: string;
    currentLogoPreview: string;
    defaultStethoscope: string;
    bannerGuideTitle: string;
    bannerGuideDesc: string;
    bannerFormat1: string;
    bannerFormat2: string;
    saveContent: string;
    categoryLaw: string;
    categoryIndication: string;
    categoryTreatment: string;
    categoryTool: string;
    resetAllData: string;
  };

  // Dynamic Questions & Content
  preQuizQuestions: {
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
  }[];
  confidenceQuestions: { id: string; text: string }[];
  evalDomains: { id: string; label: string }[];
  deepReflectionDomains: { id: string; label: string }[];
  deepReflectionQuestions: { id: string; label: string }[];
  emotionItems: { id: string; label: string }[];
  emotionFrequency: { val: number; label: string }[];
  defaultKnowledge: {
    id: string;
    category: 'law' | 'indication' | 'treatment' | 'tool';
    title: string;
    content: string;
  }[];
}

export const translations: Record<Language, TranslationData> = {
  zh: {
    appTitle: '國泰綜合醫院在宅照護教育訓練平台',
    appSubtitle: 'Cathay General Hospital Home-Based Care Education Platform',
    motto: '成為最受民眾信賴的醫學中心',
    loggedInStudent: '已登入學員',
    adminTitle: '管理後台',
    adminPrompt: '【國泰管理端】請輸入管理密碼：',
    adminAuthFailed: '權限驗證失敗。',
    backToHome: '← 回首頁',
    footerText: '2026 國泰綜合醫院教學部 數位科技暨網路資源中心',

    stepLabel: '步驟',
    completed: '✔️ 已完成',
    unfilled: '未填寫',
    nextStep: '下一步',
    prevStep: '上一步',
    save: '儲存',
    submit: '提交',
    cancel: '取消',
    edit: '編輯',
    delete: '刪除',
    close: '關閉',
    required: '*',

    heroTitle: '國泰綜合醫院在宅照護教育訓練平台',
    heroDesc: '本平台專為國泰醫院在宅參訪之培訓學生/學員設計，引導您完成各階段學習，並可自動彙整為 Excel 歷程檔案。',
    supervisorTitle: '培訓指導',
    supervisorDept: '國泰醫院 教學部/急診部',
    studentInfoCardTitle: '學員與訪視資料登錄欄',
    studentNameLabel: '學員姓名：',
    studentNamePlaceholder: '請輸入您的姓名 (例如: 王大同)',
    patientChartLabel: '病人病歷號：',
    patientChartPlaceholder: '請輸入個案病歷號 (預設為 P123)',
    visitDateLabel: '參訪/填寫日期：',
    studentBoundMsg: (name, chart) => `學員身分與病歷號已綁定中：系統將會以「${name}」(病歷號: ${chart || 'P123'}) 產製歷程檔案。`,
    studentMissingMsg: '⚠️ 請先於上方填寫您的姓名、病歷號與參訪日期，以利後續彙整 Excel 資料！',
    exportBannerTitle: '彙整問卷 Excel 並寄送老師',
    exportBannerDesc: '點擊右側按鈕即刻將您的前測作答、訪視 HOME BASIC 紀錄、反思問券與學籍資料一鍵彙編為標準 Excel 檔案，並自動產生傳送至 指導老師信箱 的預裝郵件。',
    exportBannerBtn: '彙整 Excel 並寄送',

    modules: {
      m1: { title: '1. 在宅醫療知識庫', desc: '在宅訓練：法規、適應症與模式', category: '必讀核心' },
      m2: { title: '2. 訪視前準備', desc: '注意事項與 HOME BASIC 介紹', category: '臨床必讀' },
      m3: { title: '3. 前測：知識與信心', desc: '國泰參訪前自我檢核', category: '學生自檢' },
      m4: { title: '4. 訪視中：HOME BASIC', desc: '核檢表與 POCT 評估記錄', category: '實踐記錄' },
      m5: { title: '5. 後測：反思問卷', desc: '反思記錄與學習歷程整理', category: '深度反思' },
    },

    exportModalTitle: '學習歷程 Excel 彙整成功！',
    exportModalDesc: '系統已自動下載您的學習歷程 Excel 檔案。請透過下方按鈕啟動預設電子郵件軟體，並手動將剛下載的檔案附加至信件中寄出。',
    excelDownloaded: '已下載檔案：',
    emailSubjectPrompt: '信件主旨與內容已為您預先填寫好',
    autoOpenMail: '自動喚醒信箱',
    closeModal: '關閉提示視窗',

    knowledgeTabs: {
      home_care: '1. 居家醫療 (S1/S2/S3)',
      model: '2. 在宅照護模式圖 (Model)',
      law: '3. 法規政策 (Law)',
      indication: '4. 收案適應症 (Indication)',
      treatment: '5. 治療策略 (Treatment)',
      tool: '6. 檢測工具 (Tool)',
    },
    homeCareSection: {
      badge: '居家醫療三大分類 (S1, S2, S3) 核心說明',
      desc: '依據病患之生理功能狀態及臨床需求，提供分級在宅整合照護計畫。',
      defLabel: '計畫定義',
      contentLabel: '內容說明',
      targetLabel: '適用對象',
      categories: [
        {
          id: 'S1',
          title: '一般居家醫療',
          define: '一般居家醫療',
          desc: '單純病況穩定、需定期醫療評估與基本處置',
          audience: '行動不便、高齡、慢性病者',
        },
        {
          id: 'S2',
          title: '複雜居家醫療',
          define: '複雜居家醫療',
          desc: '病情較複雜，需多專業介入，包含藥事、護理、營養等',
          audience: '多重共病、失能、需多重專業支持者',
        },
        {
          id: 'S3',
          title: '整合式居家醫療',
          define: '整合式居家醫療',
          desc: '以安寧緩和醫療或重症慢性病照護為主，需跨專業整合團隊持續介入',
          audience: '癌末、失智末期、神經退化末期、呼吸器依賴者等',
        },
      ]
    },
    careModel: {
      comparisonTitle: '在宅急症照護 vs 傳統急診住院 流程對比',
      traditionalPathway: '傳統急診常規住院路徑 (Traditional Pathway)',
      inhomePathway: '在宅急症照護綠色路徑 (Hospital-at-Home Pathway)',
      stepDetailTitle: (step) => `STEP 0${step} 詳情`,
      studentTaskNote: '📚 培訓學生任務：在進行「訪視中 HOME BASIC」填寫時，須確實檢核本期對應健康細項。',
      cghOffice: '在宅急症學習網 • CGH Clinical Case Office',
      keyFeaturesTitle: '國泰在宅急症醫療核心優勢與多專科聯防',
      uploadZoneTitle: '在宅急症照護模式與參考圖檔 (上傳區區塊)',
      removeImage: '移除圖片',
      uploadHint: '點擊此處或拖曳圖片檔案至此上傳',
      uploadSubHint: '可自行將在宅急症模式 A/B/C、提早出院指引或其他流程圖片上傳，以便在參訪或核對時作為即時參考。',
      imageCachedHint: '💡 自訂圖檔已安全緩存。若要更換新圖片，請點擊右上角移除後，即可重新上傳。',
      traditionalSteps: [
        { title: '1. 個案急性健康問題', desc: '個案在家突發感染或慢性病急性惡化' },
        { title: '2. 急診 (ER)', desc: '呼叫救護車緊急送往各大醫院急診部進行篩檢檢傷' },
        { title: '3. 醫院常規住院', desc: '在普通病房或高壓環境接受 7-14 天點滴抗生素治療' },
        { title: '4. 出院辦理', desc: '生命徵象穩定，病況改善，辦理繁瑣結帳與出院手續' },
        { title: '5. 出院準備計畫', desc: '出院後家屬自行接送返家、適應藥物，面臨照護交接期' }
      ],
      inhomeSteps: [
        {
          title: '1. 個案急性發作',
          desc: '個案突發三大感染症（肺炎、尿路感染、軟組織感染）急性徵兆',
          details: '病患在家出現發燒、寒顫、咳嗽加劇、小便疼痛或皮膚發紅、壓痛、腫脹等急性不急症。'
        },
        {
          title: '2. 評估篩選收治模式與提早出院',
          desc: '評估患者符合模式 A、B、C 或是提早出院個案等適應症',
          details: '● 模式A：居家醫療個案 (通常收治肺炎、敗血症前期、給予呼吸支持個案)\n● 模式B：照護機構住民個案 (配合機構就醫方案、控制局部尿路感染與投藥)\n● 模式C：急診失能個案 (Barthel 評估 < 60 分且出門就醫極度不便之肺炎/軟組織感染案)\n● 提早出院個案：限失能（巴氏量表小於60分）或因疾病特性致外出就醫不便且因感染症住院，經醫師評估病情穩定及確認細菌菌株適合提早出院於家中/機構接受靜脈抗生素治療。不限感染症類別，即肺炎、尿路感染、軟組織感染及其他感染症。'
        },
        {
          title: '3. 在宅急症照護小組啟動',
          desc: '專科臨床醫療團隊親自到府、配置往診藥物與ASUS遠端設備',
          details: '醫師、師資級護理師與往診合作藥師攜帶床側生理儀器，24小時視訊診察，搭配實地首劑抗生素給藥與衛教指導。'
        },
        {
          title: '4. 在宅住院監測與精準治療',
          desc: '執行遠端監護，隨時開啟綠色通道及床邊 POCT 檢驗治療',
          details: '● 遠端監測：ASUS 科技盒子與手持式超音波定時評估。\n● 床側 POCT：在宅即可檢測 CRP、血液等定量數據、確認病原與發炎指標。\n● 綠色通道：隨時暢通緊急後送，急診端保留保留床位，確保隨時可直通、免等待。'
        },
        {
          title: '5. 康復結案與回歸追蹤',
          desc: '完成抗生素療程，病況好轉康復，回歸常態居家照護或家庭醫師追蹤',
          details: '病原菌穩定消除，經照護組評估後，撤除在宅住院設備，回歸日常家庭醫師、居家醫療整合照護計畫。'
        }
      ],
      teamFeatures: [
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
      ]
    },

    prep: {
      reminderTitle: '國泰醫院急症出發前提醒',
      reminders: [
        '請確保隨身通訊設備電量充足。',
        '與家長/病人確認訪視時間，主動確認是否需攜帶遠端 Telehealth 設備。',
        '攜有必要的臨床隨身藥包、POCT 檢測器、手持式超音波等要件。',
        '嚴守個人防範操作、攜帶速乾洗手劑，落實嚴格的無菌無菌防範操作。'
      ],
      homeBasicTitle: '核檢心法架構',
      readyBtn: '準備好了，進行前測測驗',
      homeBasicItems: [
        { char: 'H', title: 'Health 健康狀態', desc: '病歷個案前史、急性不適、疼痛情形、心跳、血壓、體溫、SpO2 等生理量測與定量數據。' },
        { char: 'O', title: 'Outlook 心理/展望', desc: '病患精神志向、生命意志、有沒有嚴重失落感，以及對在宅醫療之共享決策 (SDM) 共識與接受度。' },
        { char: 'M', title: 'Medication 用藥狀況', desc: '審核是否有多重藥物不當或重合開立，及往診中服藥的依從性。' },
        { char: 'E', title: 'Environment 環境安全', desc: '家無障礙防滑設置、生活動線、採光，及社会福利或社區長照之支援。' },
        { char: 'B', title: 'Basic ADL 生活功能', desc: '進食、排尿/解便自理度、扶行移動力 or 是否需要他人定時協助翻身。' },
        { char: 'A', title: 'Access 輔具/近便', desc: '各式生活輔具、在宅使用的遠端監護設備以及手持式臨床檢驗之便利性。' },
        { char: 'S', title: 'Social 支持系統', desc: '同住與非同住家屬的介入支持度、鄰里鄰托可及性及相關福利連結。' },
        { char: 'I', title: 'Instability 不穩定性', desc: '是否有近期重跌昏迷或生命徵象急性轉差傾向（qSOFA評量等急速惡化風險）。' },
        { char: 'C', title: 'Caregiver 照護者', desc: '主要隨侍家屬的每日身心情緒承載限度，以及在宅長照喘息資源之諮詢與調配度。' }
      ]
    },

    preTest: {
      quizTitle: '參訪前知識測驗',
      quizDesc: '出發前先確認您對在宅急症核心法規的掌握',
      nextConfidence: '下一步：信心自評',
      confTitle: '參訪前信心指標自評',
      confDesc: '請依據 1-5 級分對應作答 (1:極無信心, 5:極有信心)',
      confScale1: '1: 極無信心',
      confScale5: '5: 極有信心',
      submitBtn: '提交測驗並開啟訪視',
      completeTitle: '國泰參訪測驗完成！',
      completeDesc: '您已完成國泰在宅參訪出發前的信心與知識自評檢測。現在可以進行實地訪視核檢紀錄了。',
      proceedChecklist: '前往家訪 HOME BASIC 紀錄'
    },

    checklist: {
      title: '訪視實務：HOME BASIC 臨床評估',
      subtitle: (id) => `請在此詳實紀錄您與國泰醫療往診時對在宅住院患者(${id})之家庭觀察`,
      patientIdBadge: (id) => `患者ID：${id}`,
      clinicalNotesLabel: '綜合臨床備註 (如：床側 POCT 或餘尿超音波之數據紀錄)',
      clinicalNotesPlaceholder: '補充其它需要附註之在宅醫療細節、POCT CRP / pH / 滲透壓量測數據等臨床紀錄...',
      saveBtn: '儲存國泰訪視紀錄',
      successTitle: '訪視評估紀錄已成功儲存',
      successDesc: '辛苦了！國泰急症在宅醫療團隊感謝您的熱心記錄。完成此階段後，請進入最後的反思回饋。',
      proceedPostTest: '前往最後反思回饋',
      fieldPlaceholder: (label) => `請輸入關於 ${label} 的到府實地觀察與細部記錄細節...`,
      items: [
        { key: 'health', label: 'Health 健康狀態 (生命徵象與病況)' },
        { key: 'outlook', label: 'Outlook 心理/展望 (情緒與意願)' },
        { key: 'medication', label: 'Medication 用藥狀況 (重合用藥與醫囑性)' },
        { key: 'environment', label: 'Environment 環境安全 (無障礙安全)' },
        { key: 'basicADL', label: 'Basic ADL 生活功能 (自理能力/翻身狀況)' },
        { key: 'access', label: 'Access 輔具/近便 (醫療耗材儀器配置)' },
        { key: 'social', label: 'Social 支持系統 (照護負擔及鄰里支持)' },
        { key: 'instability', label: 'Instability 不穩定性 (快速器官衰竭風險)' },
        { key: 'caregiver', label: 'Caregiver 照護者 (陪護精神狀態/喘息需求)' },
      ]
    },

    postTest: {
      step1Tag: '信心自評',
      step1Title: '在宅醫療參訪後信心自評',
      step1Desc: '請根據您今天實際參與病人與家屬的在宅醫療急症照護經驗，與參訪前的心境拉平對照，重新評估您目前的信心程度：',
      step2Tag: '第一部分',
      step2Title: '五大領域能力自我評量',
      step2Desc: '綜合今日家訪照護實務，請評定您自己在各臨床照護能力維度之等級：',
      step2NotYet: '尚未',
      step2Independent: '獨立執行',
      step3Tag: '第二部分',
      step3Title: '指定領域深度反思',
      step3Desc: '請從五大領域中勾選 1~3 個 您今日最有感受、最具挑戰或最值得深思的領域，並為它們撰寫深度學習札記。',
      step3PickerLabel: '請勾選欲進行深度反思的領域：',
      step3Fallback: '⚠️ 請至少勾選一個領域以生成深度反思題目',
      step3DynamicTag: '動態反思子題',
      step3Placeholder: '請避開「純描述」，聚焦於您的內在感受、事件細節與未來的醫術/醫療理念連結...',
      step4Tag: '第三與第四部分',
      step4Title: '自由反思與學習總結',
      step4Desc: '讓我們從今日的片段中提煉出最核心的學習訊息(Take-home Message)。',
      qFreeReflection: '今天整體經驗中，最讓你印象深刻或感到挑戰的是什麼？為什麼？',
      qFreeReflectionPlaceholder: '可記錄您印象最深刻、最觸動或最具挑戰的片段，無論是技術面、情感面、團隊合作、患者處境，或文化與倫理衝突...',
      qOneSentence: '用一句話描述，今天的經驗如何改變或深化你對醫師角色的理解？',
      qOneSentencePlaceholder: '將今天的經驗濃縮成一句最重要的洞見，形成清晰的「學習訊息」(Learning Point)...',
      step5Tag: '第五部分',
      step5Title: '情緒與心理狀態檢視',
      step5Desc: '醫療專業學習不只有知識與技能，也包含面對情緒、同理心與不確定性的能力。',
      step5FreqPrompt: '在今日照護過程中，您感受與體驗到下列狀態的頻率：',
      submitTrainingBtn: '提交並完結本套培訓 ✔',
      nextPageBtn: '下一頁 →',
      completeTitle: '反思問卷已成功提交！',
      completeDesc: '非常感謝您的全力參與！您已完結本套「國泰急症在宅醫療」所有研習單元、訪視記錄與反思歷程。',
      backToDashboardBtn: '返回主頁並下載 Excel 歷程檔案',
      stepsIndicator: (current, total) => `步驟 ${current} / ${total}`
    },

    admin: {
      title: '培訓內容管理 (管理端)',
      addItem: '新增培訓項目 +',
      newItemTitle: '新知識項目',
      logoConfigTag: 'LOGO 自訂設定',
      logoConfigTitle: '平台標題旁 Logo 與圖標自訂',
      logoConfigDesc: '您可以採用以下便利方式之一，來更換或自訂「國泰綜合醫院在宅照護教育訓練平台」左上角顯示的 Logo 圖案：',
      method1Title: '方法一：直接自瀏覽器選擇上傳圖片',
      method1Desc: '上傳圖片檔 (PNG, SVG, JPG 等)，圖片將以 Base64 編碼快取於本機瀏覽器內並即時生效。',
      uploadBtn: '選擇並上傳圖片 📁',
      resetLogo: '重置回預設聽診器 ✖',
      method2Title: '方法二：指定 public 資料夾內的檔名路徑',
      method2Desc: '您可以直接將 Logo 圖片放置於本專案的 /public 目錄下 (例如名為 logo.png 或 hospital-logo.svg)。',
      currentLogoPreview: '當前 Logo 預覽：',
      defaultStethoscope: '預設圓角聽診器',
      bannerGuideTitle: '🖼️ 平台首頁背景與模組 1 ~ 5 自訂 Banner 教學',
      bannerGuideDesc: '除了能在此處設定 Logo 外，平台首頁的背景與各學習模組（單元 1 ~ 5）的橫幅 Banner 也支援自動讀取 /public 資料夾內的圖片。',
      bannerFormat1: '首頁大 Banner 背景：hero-background.png 或 background.png',
      bannerFormat2: '單元 1~5：banner-1.png ~ banner-5.png',
      saveContent: '儲存內容',
      categoryLaw: '法規政策',
      categoryIndication: '收案適應症',
      categoryTreatment: '治療策略',
      categoryTool: '評估與檢測工具',
      resetAllData: '重置與還原初始國泰在宅常規教材'
    },

    preQuizQuestions: [
      {
        id: 'q1',
        text: '在宅醫療照護（試辦計畫）中的急症收治主要針對哪三種感染症？',
        options: ['肺炎、尿路感染、軟組織感染', '腸胃炎、骨折、肺炎', '腦中風、糖尿病、氣喘', '流感、新冠、感冒'],
        correctAnswer: '肺炎、尿路感染、軟組織感染'
      },
      {
        id: 'q2',
        text: '下列哪一項不屬於 HOME BASIC 居家評估之九大維度範疇？',
        options: ['Environment 環境安全', 'Income 收入狀況', 'Outlook 心理與展望', 'Basic ADL 日常生活功能'],
        correctAnswer: 'Income 收入狀況'
      },
      {
        id: 'q3',
        text: '關於「一般居家醫療 (S1)」之定義，下列敘述何者正確？',
        options: ['單純病況穩定、需定期醫療評估與基本處置', '病情較複雜，需多專業介入，包含藥事、護理、營養等', '以安寧緩和醫療或重症慢性病照護為主，需跨專業整合團隊持續介入', '病情極度危急，需要立即送至急診進行開刀與加護病房照護'],
        correctAnswer: '單純病況穩定、需定期醫療評估與基本處置'
      },
      {
        id: 'q4',
        text: '居家醫療分類中，「整合式居家醫療 (S3)」之主要服務對象包含下列哪一項？',
        options: ['行動完全自如之輕度感冒患者', '病情複雜、僅需單一藥師介入調劑者', '癌末、失智末期、神經退化末期、呼吸器依賴等', '僅限於年滿 18 歲但無任何慢性病者'],
        correctAnswer: '癌末、失智末期、神經退化末期、呼吸器依賴等'
      },
      {
        id: 'q5',
        text: '關於在宅醫療照護「模式 C（急診個案）」之收案標準，下列何者正確？',
        options: ['限巴氏量表（Barthel Index）小於 60 分之失能者，或因疾病特性而就醫極度不便者', '限巴氏量表大於 80 分且常規能獨立出門就醫者', '限無任何慢性病、且年齡在 65 歲以上之機構住民', '不限生理功能狀態，只要在急診室留觀滿 48 小時即可收案'],
        correctAnswer: '限巴氏量表（Barthel Index）小於 60 分之失能者，或因疾病特性而就醫極度不便者'
      }
    ],

    confidenceQuestions: [
      { id: 'c1', text: '我覺得我對在宅醫療照護的法規與知識有充分了解。' },
      { id: 'c2', text: '我有信心能獨立完成 HOME BASIC 居家評估。' },
      { id: 'c3', text: '我有信心能與病患及其家屬進行有效的溝通。' }
    ],

    evalDomains: [
      { id: 'tech', label: '1. 科技整合能力（如：POCUS、遙測、遠距醫療設備）' },
      { id: 'team', label: '2. 跨專業合作與團隊溝通' },
      { id: 'comm', label: '3. 家庭與病人為中心的健康溝通' },
      { id: 'system', label: '4. 系統思維與資源運用' },
      { id: 'role', label: '5. 專業態度與醫療角色認同' }
    ],

    deepReflectionDomains: [
      { id: 'tech', label: '科技整合' },
      { id: 'team', label: '跨專業合作' },
      { id: 'comm', label: '病人與家庭為中心的溝通' },
      { id: 'system', label: '系統性思考與流程理解' },
      { id: 'role', label: '專業精神與角色認同' }
    ],

    deepReflectionQuestions: [
      { id: 'event', label: '今天與此領域相關的具體事件是什麼？' },
      { id: 'thought', label: '這件事情讓你產生什麼觀察或想法（包含感受）？' },
      { id: 'concept', label: '回頭看，你覺得這代表什麼？與醫療專業概念有何連結？' },
      { id: 'better', label: '如果下一次遇到類似情況，你會如何做得更好？' }
    ],

    emotionItems: [
      { id: 'confidence', label: '信心' },
      { id: 'uncertainty', label: '不確定感' },
      { id: 'empathy', label: '同理心' },
      { id: 'ethics', label: '倫理張力 (Ethical tension)' },
      { id: 'overload', label: '認知負荷超載 (Cognitive overload)' }
    ],

    emotionFrequency: [
      { val: 1, label: '從未' },
      { val: 2, label: '偶爾' },
      { val: 3, label: '有時' },
      { val: 4, label: '經常' },
      { val: 5, label: '始終存在' }
    ],

    defaultKnowledge: [
      {
        id: 'law-1',
        category: 'law',
        title: '在宅急症模式 A/B/C',
        content: '【模式A：居家整合個案】\n原參與居家整合醫藥計畫者、呼吸器依存者整合型照護居家階段、特定居家照護及安寧居家療護（不含照護機構住民）。\n\n【模式B：照護機構個案】\n參與衛生福利部「減少照護機構住民至醫療機構就醫方案」之照護機構住民。\n\n【模式C：急診個案】\n限巴氏量表（Barthel Index）小於 60 分之失能者，或因疾病特性而就醫極度不便者。\n\n【提早出院個案】\n1. 限失能（巴氏量表小於60分）或因疾病特性致外出就醫不便且因感染症住院，經醫師評估病情穩定及確認細菌菌株適合提早出院於家中/機構接受靜脈抗生素治療。\n2. 不限感染症類別，即肺炎、尿路感染、軟組織感染及其他感染症。'
      },
      {
        id: 'law-2',
        category: 'law',
        title: '在宅收案與核簽程序',
        content: '【三大核心要素】\n1. 專門的急症照護人力整合（專任醫、護、藥、呼吸治療師團隊合作）。\n2. 24小時諮詢專線（Call Center）與緊急實地往診服務。\n3. 配備在宅床邊即時檢測(POCT)、遠距聯網監測、手持超音波與移動X光設備。\n\n【收案程序】\n1. 取得病人及其家屬之詳細說明，並取得在宅住院共享決策(SDM)同意書。\n2. 於收案後 24 小時內至健保 VPN 系統登打申報收案申請書。\n3. 主治醫師同一時段在宅收案上限為 20 人。'
      },
      {
        id: 'law-3',
        category: 'law',
        title: 'EPA (Emergency Passed Admission) 急診轉在宅機制',
        content: '【適合 EPA 條件】\n1. 符合居家整合計畫或特定失能條件患者。\n2. 經醫師評估符合肺炎、尿路感染、軟組織感染急症且確有住院需求，但病人與家屬強烈不想常規住院者。\n\n【EPA 定位與共識】\nEPA 是當病人/家屬「該住院而不住院」下的「第一替代選項」（第二選擇），而非急診醫學部的第一診斷處方。必須在急診科進行病家醫病共享決策(SDM)同意後收案。首劑靜脈抗生素應在急診室先予滴注完成，再由 green channel 返回家中，由在宅急症照護團隊（HAH）接手，且病歷紀錄考慮以門診追蹤模式進行（Day 1~9）。'
      },
      {
        id: 'law-4',
        category: 'law',
        title: '費用核付與部分負擔比例',
        content: '【部分負擔】\n在宅急症照護比照居家照護費用，僅收取 5% 之部分負擔（例如：(每日實際醫療費+每日護理費) * 5%）。\n\n【申報規範】\n特約醫療院所對同一患者、於相同在宅急症照護期間，原則上只能選擇一項最適疾病主診斷（肺炎、尿路或軟組織）進行案件申報，不可重複併報。'
      },
      {
        id: 'ind-1',
        category: 'indication',
        title: '肺炎（Pneumonia）：詳細診斷/收案標準 (4符合3)',
        content: '經急診 or 主治醫師評估臨床上應住院，但適合在宅照護者，需符合下述 4 項中之 3 項：\n\n1. 臨床症狀：明顯下呼吸道急症（濃痰、氣促、喘鳴、肺部聽診異常等）或全身性症狀（發燒或低體溫、心跳過速、低血壓、高齡意識障礙/嗜睡/混亂、食慾差）。\n2. 實驗室檢查：血液白血球/中性球比例上升、C反應蛋白（CRP）上升、流感或 COVID-19 快速檢測陽性、或肺炎鏈球菌/退伍軍人尿液抗原陽性。\n3. 影像學： X光發現或超音波之發現（影像資料需備查）。\n4. 細菌學：痰液或血液培養報告有致病細菌發現。'
      },
      {
        id: 'ind-2',
        category: 'indication',
        title: '尿路感染（UTI）：詳細診斷/收案標準 (4符合2)',
        content: '經醫師評估有住院需求，但適合在宅住院照護，且須符合下述 4 項中之 2 項：\n\n1. 局部症狀：解尿灼熱痛、排尿困難、排尿量減少、膿尿呈混濁、或腰脊角叩擊痛（CVA tenderness）。因過去一週口服藥治療失敗者尤佳。\n2. 全身症狀：發燒（>38°C）、心跳過速、血壓偏低、新發生之意識改變（嗜睡/胡言亂語）、食慾極差。\n3. 實驗室常規：WBC上升、CRP上升、尿液分析白血球白血球（WBC/hpf）增加、Bacteria/Nitrite（亞硝酸鹽）反應呈陽性。\n4. 細菌培養：尿液或血液細菌培養發現有意義之致病原株。'
      },
      {
        id: 'ind-3',
        category: 'indication',
        title: '軟組織感染：詳細診斷/收案標準 (4符合3)',
        content: '經醫師評估確有住院需求而適合在宅照護者，需符合下述 4 項中之 3 項：\n\n1. 局部症狀：皮膚大片紅、腫、熱、痛，或化膿/組織壞死病變。若過去一週經口服抗生素治療失敗者更合適。\n2. 全身症狀：發燒、心跳快、血壓低、意識退化、食慾差。\n3. 理學檢查：皮膚紅腫、傷口、化膿表現。\n4. 實驗室/細菌培養：血液白血球或 CRP 上升、或傷口分泌物/血液培養有致病微生物繁殖、塗片有意義發現。'
      },
      {
        id: 'ind-4',
        category: 'indication',
        title: '「留院/轉院治療」排除與轉送指標',
        content: '若病患涉及下述高風險生命指標，不適合在宅安全住院，應優先建議「留院或轉急診/住院」：\n\n1. 院內型肺炎（HAP）：住院48小時後，或出院14天內發生的肺炎，因常富含高變異抗藥菌種類。\n2. 多重抗藥菌株（MDRO）感染史：過去90天內已知曾有痰、尿培養有抗藥性高度可能者。\n3. 系統性免疫功能缺失：骨髓/器官移植、血液腫瘤癌症、無脾臟功能、控制極差之慢性糖尿病等。\n4. 生命徵象與器官功能高危不穩：\n   - qSOFA 評估分數 >= 2分（新發生意識改變、呼吸快>22、收縮壓<=100）。\n   - 肺炎 CURB-65 分數 >= 4分、生命徵象已高度偏向敗血性休克（Urosepsis）。\n5. 泌尿異常併發：合併嚴重腎臟水腫、腎臟膿瘍（Renal abscess）、或近期有泌尿道手術史，甚至合併急性腎損害（AKI Creatinine>=1.2）。\n6. SSTI 特殊複雜：感染擴及深部腱鞘（壞死性筋膜炎）進展迅速快（如海洋弧菌 Vibrio、產氣莢膜桿菌）、腔室症候群或 Fournier\'s 壞疽等。'
      },
      {
        id: 'treatment-1',
        category: 'treatment',
        title: '各急症目標日數與健保申報給付上限',
        content: '健保試辦計畫訂有疾病的「目標天數」與每日「申報給付上限」：\n\n- 肺炎：目標天數 9 天（給付每日 2800 ~ 4929 點），上限 14 天。\n- 尿路感染：目標天數 7 天（給付每日 2050 ~ 3608 點），上限 9 天。\n- 軟組織感染：目標天數 6 天（給付每日 2329 ~ 4099 點），上限 8 天。'
      },
      {
        id: 'treatment-2',
        category: 'treatment',
        title: '到宅訪視頻率與多專科團隊職責分工',
        content: '【醫師團隊職責】\n醫師於收案 3 天內必須實施至少 1 次「親自實地訪視健康狀況」。未去案家實地視察時，每日均需採用「遠距/視訊診療」病情追蹤、開立藥方，並在病誌與 VPN 鍵入訪視及視訊紀錄。\n\n【護理師職責】\n照護期間，原則上每日必須由居家護理人員親自實地到案家做實地訪視。執行生命跡象量測、給與注射抗生素/點滴，且確實登載病家到達與離開時間。\n\n【多專科團隊整合】\n除了醫護外，若主治醫師評估病人有多重吸藥困難或用藥遵從差，可指派 RT（呼吸治療師）到宅提供呼吸照護與吹藥輔導，或由專責藥師往診輔導「居家多重用藥安全與配送」服務。'
      },
      {
        id: 'treatment-3',
        category: 'treatment',
        title: '靜脈注射抗生素「5Ds」臨床處方指引',
        content: '【5Ds 正確臨床守則】\n1. Correct Diagnosis (正確診斷) / 2. Correct Drug (正確藥品)\n3. Correct Dosage (正確劑量) / 4. Correct Duration (正確天期)\n5. De-escalating therapy (適時抗生素降階/口服轉換)\n\n【抗生素配製與 24h 輸注合作】\n在宅針劑抗生素以 IV 為主。若使用需 24h cIF 連續滴注或 QD 給藥之抗生素（例如 Cefepime, Ceftazidime），主責醫師與家醫科必須與臨床藥師精確確認稀釋輸液（NS/D5W）、稀釋天量、配製後體積、平均滲透壓（Mean Osmolarity，如 (2g/50mL) D5W 平均滲透壓 457 mOsm/L）與稀釋後酸鹼值（pH，如 Cefazolin pH為 5.04）。且在宅需安裝合格的輸液小幫浦，確保安全；細菌培養得效後應儘早降階以防產生社區感染抗藥菌。'
      },
      {
        id: 'treatment-4',
        category: 'treatment',
        title: '不同急症之經驗性抗生素口服/靜脈選藥建議',
        content: '【社區型肺炎 (CAP) 選藥】\n- 輕中度（CRB-65 = 0~1）共病平穩者：可直接門診口服 Amoxicillin 1000mg Q8H 或 Amox/Clav (875/125) 1000mg BID * 7 天。\n- 共病不穩但可以居家 HAH 者：推薦口服 Cefuroxime、注射/口服 Moxifloxacin 400mg QD 或 Levo-floxacin 750mg QD、或在宅注射/ cIF Penicillin G 18MU、Cefuroxime 4500mg * 7 天。\n- 吸入性肺炎 (Aspiration Pneumonia)：須額外加用抗厭氧菌藥物（加 Oral/IV Metronidazole 500mg Q8H）。\n- 機構內肺炎常規：(24h cIF) Cefepime 6000mg 或 Ceftazidime 6000mg 或 Pip/Tazo 18000mg 連續輸注，常須合併 Doxycycline / Azithromycin。\n\n【尿路感染 (UTI) 選藥】\n- 普通腎盂腎炎（無 MDRO 歷史）：口服 TMP/SMX BID、Cefuroxime 500mg BID 10-14天。針劑首選 IV Ceftriaxone 2000mg QD * 7 天，或單劑 IV Gentamicin / Amikacin 後改口服。\n- 近期已知有 ESBL / AmpC 陽性病原紀錄：首選 HAH 注射 Ertapenem 1000mg QD * 7天、或 Amikacin 按腎功能調整給藥。\n\n【皮膚軟組織感染 (SSTI/SSTIs) 選藥】\n- 普通蜂窩性組織炎 / 丹毒：療程 5-7天。口服 Cephalexin 500mg QID 或 Clindamycin 300mg QID，針劑推薦 IV Ceftriaxone 2000mg QD 或 24h Cefazolin 6000mg 連續點滴。'
      },
      {
        id: 'tool-1',
        category: 'tool',
        title: '床邊即時檢驗 (POCT) 臨床團隊武器',
        content: '國泰在宅醫療團隊攜有完整、快速的床側即時檢驗器材，免去送院等待：\n\n1. EPOC / i-STAT 床邊生化：僅需微量全血，5分鐘可在床側解析血液氣體分析（Blood Gas）、血球容積(Hct)、離子與電解質（Ca++, Na/K/Cl）、血糖(Glucose)、尿素氮(BUN)及乳酸(Lactate)等，提早評享全身性休克風險。\n2. iProtin / Roche Cobas：在宅 10 分鐘分析定量發炎指標 C反應蛋白 (CRP) 與心肌酵素，即時研判目前抗菌治療的療效（如圖示定量數值 0.98 mg/dL 表示重度發炎）。\n3. 檢體收集：現場執行全套血液常規(CBC)、尿液、傷口分泌物或痰液之細菌塗片及培養，現場建立精準細菌報告。'
      },
      {
        id: 'tool-2',
        category: 'tool',
        title: '遠端多重監控 IoT 與智慧床架在宅黑科技',
        content: '運用雲端大數據技術，國泰將病房生命徵象監視器延伸到家：\n\n1. 智慧舒眠床墊 (iCue)：具備智慧重力感應，提供「離床超時通知」、「定時翻身警示」(如報表記錄平均翻身 111 分鐘)及在床即時呼吸心跳趨勢，舒緩病家與主要照顧者壓力。\n2. 全方位生理監測 (ASUS Telehealth / Chiline)：ASUS遠距健康系統、Chiline 全家寶，將家屬量測的血氧、血壓、脈搏、心電圖數據即時經 Wi-Fi 上傳雲端平台。數據若有異常，立即警示 24小時 Call center 以及主責到宅護理師即時回撥或進行緊急視訊往診。\n3. 手持式掌上型超音波（QT-Medical / 64通道）：隨行醫師能於床旁立即進行超音波偵測。例如導尿管移除前後，即時量算「膀胱餘尿容積」(如圖示)，精準安全；或用來排除肺炎積水。'
      },
      {
        id: 'tool-3',
        category: 'tool',
        title: '敗血症高風險評估指標：qSOFA / SOFA 臨床重症工具',
        content: '【qSOFA 快速相繼器官衰竭評估表 (符合 2 項以上提示高危)】\n1. 意識狀態改變（新發生嗜睡、混亂、胡言亂語）(Consciousness alteration)\n2. 呼吸急促（呼吸速率 > 22 breaths/min）\n3. 血壓偏低（收縮壓 Systolic BP <= 100 mmHg）\n\n【SIRS 全身性發炎反應標準 (符合 2 項以上)】\n1. 體溫 > 38°C 或 < 36°C\n2. 心跳過速 > 90 beats/min\n3. 呼吸急促 > 20 breaths/min (或 PaCO2 < 32 mmHg)\n4. 白血球數上升 > 12,000/μL 或顯著偏低 < 4,000/μL'
      }
    ]
  },

  en: {
    appTitle: 'Cathay General Hospital Home-Based Care Education Platform',
    appSubtitle: 'Hospital-at-Home (HaH) & Community Care Clinical Training',
    motto: 'To Be the Most Trusted Medical Center by the Public',
    loggedInStudent: 'Enrolled Trainee',
    adminTitle: 'Admin Console',
    adminPrompt: '【CGH Admin】Please enter the admin passcode:',
    adminAuthFailed: 'Authentication failed.',
    backToHome: '← Back to Home',
    footerText: '2026 Cathay General Hospital Dept. of Medical Education • Digital Technology & e-Learning Center',

    stepLabel: 'Step',
    completed: '✔️ Completed',
    unfilled: 'Pending',
    nextStep: 'Next Step',
    prevStep: 'Previous Step',
    save: 'Save',
    submit: 'Submit',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
    required: '*',

    heroTitle: 'CGH Hospital-at-Home (HaH) Education & Training Platform',
    heroDesc: 'Designed specifically for medical trainees and clinical students participating in home-based acute care visits at Cathay General Hospital.',
    supervisorTitle: 'Clinical Mentorship',
    supervisorDept: 'CGH Dept. of Medical Education / Emergency Medicine',
    studentInfoCardTitle: 'Trainee Profile & Visit Registration',
    studentNameLabel: 'Trainee Name:',
    studentNamePlaceholder: 'Enter your full name (e.g. David Wang)',
    patientChartLabel: 'Patient Chart Number:',
    patientChartPlaceholder: 'Enter patient chart number (Default: P123)',
    visitDateLabel: 'Visit / Entry Date:',
    studentBoundMsg: (name, chart) => `Trainee profile bound: System will compile portfolio for "${name}" (Chart No: ${chart || 'P123'}).`,
    studentMissingMsg: '⚠️ Please fill in your name, chart number, and visit date above before compiling Excel records!',
    exportBannerTitle: 'Compile Excel Portfolio & Email Instructor',
    exportBannerDesc: 'Click the button to compile your pre-test scores, visit HOME BASIC records, reflection answers, and trainee info into a standardized Excel file and generate a ready-to-send draft for your clinical preceptor.',
    exportBannerBtn: 'Compile Excel & Email',

    modules: {
      m1: { title: '1. HaH Knowledge Base', desc: 'Regulations, Indications & Acute Care Models', category: 'Core Knowledge' },
      m2: { title: '2. Pre-Visit Preparation', desc: 'Safety Checklist & HOME BASIC Framework', category: 'Clinical Prep' },
      m3: { title: '3. Pre-Test: Knowledge & Confidence', desc: 'Pre-Visit Self Assessment & Quiz', category: 'Self-Check' },
      m4: { title: '4. During Visit: HOME BASIC', desc: 'On-site Assessment Checklist & POCT Logs', category: 'Clinical Practice' },
      m5: { title: '5. Post-Test: Reflection Survey', desc: 'Deep Reflection & Portfolio Summary', category: 'Deep Reflection' },
    },

    exportModalTitle: 'Learning Portfolio Excel Compiled Successfully!',
    exportModalDesc: 'Your portfolio Excel file has been generated and downloaded. Click below to open your default mail client, then attach the downloaded Excel file to send it to your preceptor.',
    excelDownloaded: 'Downloaded File:',
    emailSubjectPrompt: 'Email subject and body have been pre-formatted for you.',
    autoOpenMail: 'Launch Mail Client',
    closeModal: 'Close Window',

    knowledgeTabs: {
      home_care: '1. Home Care Levels (S1/S2/S3)',
      model: '2. Acute Care Model (HaH)',
      law: '3. Regulations & Policies',
      indication: '4. Clinical Indications',
      treatment: '5. Treatment Strategies',
      tool: '6. Diagnostic Tools & POCT',
    },
    homeCareSection: {
      badge: 'Three Tiers of Home Healthcare (S1, S2, S3)',
      desc: 'Graded integrated home care pathways tailored to patients\' physiological functional status and clinical needs.',
      defLabel: 'Program Definition',
      contentLabel: 'Scope of Service',
      targetLabel: 'Target Population',
      categories: [
        {
          id: 'S1',
          title: 'General Home Healthcare',
          define: 'General Home Medical Care',
          desc: 'Clinically stable cases requiring routine medical assessment and basic procedures.',
          audience: 'Elderly, chronic disease patients with mobility difficulties.',
        },
        {
          id: 'S2',
          title: 'Complex Home Healthcare',
          define: 'Complex Home Healthcare',
          desc: 'More complex clinical cases requiring interprofessional support (pharmacy, nursing, nutrition).',
          audience: 'Multimorbidity, disabled individuals needing multidisciplinary care.',
        },
        {
          id: 'S3',
          title: 'Integrated Home Healthcare',
          define: 'Integrated Home Healthcare',
          desc: 'Palliative/hospice care or severe chronic illnesses requiring ongoing interdisciplinary team intervention.',
          audience: 'Terminal cancer, advanced dementia, end-stage neurodegenerative disease, ventilator dependence.',
        },
      ]
    },
    careModel: {
      comparisonTitle: 'Hospital-at-Home (HaH) vs. Traditional Inpatient Pathway',
      traditionalPathway: 'Traditional Emergency & Inpatient Pathway',
      inhomePathway: 'Hospital-at-Home Green Channel Pathway',
      stepDetailTitle: (step) => `STEP 0${step} Details`,
      studentTaskNote: '📚 Student Task: Ensure you review and assess the corresponding health dimensions during on-site HOME BASIC assessment.',
      cghOffice: 'Hospital-at-Home Learning Portal • CGH Clinical Case Office',
      keyFeaturesTitle: 'Cathay HaH Core Strengths & Multidisciplinary Defense',
      uploadZoneTitle: 'HaH Care Pathway Reference Diagrams (Upload Area)',
      removeImage: 'Remove Image',
      uploadHint: 'Click or drag image files here to upload',
      uploadSubHint: 'You may upload HaH models A/B/C, early discharge flowcharts, or clinical reference diagrams for quick access during visits.',
      imageCachedHint: '💡 Custom diagram is cached safely in your browser. Click remove on top right to upload a new one.',
      traditionalSteps: [
        { title: '1. Acute Health Issue', desc: 'Patient experiences sudden infection or acute exacerbation at home' },
        { title: '2. Emergency Room (ER)', desc: 'Ambulance transport to hospital ER for triage and screening' },
        { title: '3. Routine Inpatient Ward', desc: '7-14 days IV antibiotic treatment in hospital ward environment' },
        { title: '4. Discharge Processing', desc: 'Vitals stable, symptom relief, lengthy discharge billing process' },
        { title: '5. Discharge Care Plan', desc: 'Family transports patient home, medication transition challenges' }
      ],
      inhomeSteps: [
        {
          title: '1. Acute Onset at Home',
          desc: 'Patient presents with acute symptoms of pneumonia, UTI, or SSTI',
          details: 'Patient experiences fever, chills, worsening cough, dysuria, or localized skin erythema, swelling, warmth, and tenderness.'
        },
        {
          title: '2. Triage & Admission Criteria',
          desc: 'Assess eligibility for HaH Models A, B, C, or Early Discharge',
          details: '● Model A: Home healthcare enrolled cases\n● Model B: Long-term care facility residents\n● Model C: ER disabled patients (Barthel Index < 60 or severely restricted mobility)\n● Early Discharge: Stable patients with verified microbial culture transitioning home for completion of IV antibiotic course.'
        },
        {
          title: '3. HaH Clinical Team Dispatch',
          desc: 'Multidisciplinary team visits home with medications and IoT telemetry',
          details: 'Physicians, certified nurse specialists, and home pharmacists bring bedside POCT diagnostics, 24/7 video consultation, and deliver initial IV antibiotic doses.'
        },
        {
          title: '4. In-Home Hospitalization & Treatment',
          desc: 'Continuous remote monitoring, green-channel hospital fallback, POCT testing',
          details: '● Telemonitoring: ASUS telemetry kit and handheld POCUS.\n● Bedside POCT: On-site quantitative CRP, blood gas, and electrolyte analysis.\n● Green Channel: Dedicated emergency backup beds reserved for instant escalation if needed.'
        },
        {
          title: '5. Recovery & Primary Care Handover',
          desc: 'Complete antibiotic course, clinical resolution, handover to home doctor',
          details: 'Infection resolved safely; HaH equipment de-installed; transition back to routine family physician and community healthcare.'
        }
      ],
      teamFeatures: [
        {
          title: 'Direct Hospital Green Channel',
          desc: 'If any acute deterioration occurs at home, the HaH team connects directly with CGH Emergency Department for expedited admission without ER triage queues.',
          sub: '🏥 24/7 Coordinated Defense & Reserved Beds'
        },
        {
          title: 'Telehealth & Remote Monitoring',
          desc: 'Using handheld POCUS and ASUS Telehealth kits, vital signs (BP, HR, SpO2) are transmitted live to the cloud command center around the clock.',
          sub: '🖥️ Smart IoT & Portable Diagnostics'
        },
        {
          title: '24/7 Emergency Medical Hotline',
          desc: 'Dedicated 24/7 call center staffed by emergency and home care clinicians provides round-the-clock guidance, triage, and urgent video visits.',
          sub: '📞 Dedicated 24/7 Call Center Hotline'
        },
        {
          title: 'Long-Term Care Integration',
          desc: 'Connecting patients with community social services, respite care resources, and home pharmacy delivery to relieve primary caregiver burden.',
          sub: '🤝 Caregiver Support & Social Linkages'
        },
        {
          title: 'Specialized Acute Infection Team',
          desc: 'Interprofessional team of attending physicians, acute care nurses, and specialized pharmacists delivering IV antibiotic stewardship directly at the bedside.',
          sub: '🩺 Physician + Nurse + Pharmacist Joint Visits'
        }
      ]
    },

    prep: {
      reminderTitle: 'CGH Acute Home Visit Checklist & Safety Rules',
      reminders: [
        'Ensure all mobile communication devices and telemetry tools are fully charged.',
        'Confirm visit time with patient/family and verify if remote telemetry equipment is required.',
        'Carry essential clinical medication kits, POCT devices, and handheld ultrasound transducers.',
        'Adhere strictly to standard universal precautions, hand hygiene, and aseptic procedures.'
      ],
      homeBasicTitle: 'HOME BASIC Assessment Framework',
      readyBtn: 'Ready! Proceed to Pre-Test Assessment',
      homeBasicItems: [
        { char: 'H', title: 'Health Status', desc: 'Clinical history, acute discomfort, pain levels, vital signs (HR, BP, Temp, SpO2) and quantitative biomarkers.' },
        { char: 'O', title: 'Outlook & Psychology', desc: 'Mental status, morale, signs of depression, and shared decision-making (SDM) consensus regarding home hospitalization.' },
        { char: 'M', title: 'Medication Management', desc: 'Screening for polypharmacy, drug-drug interactions, and patient adherence to prescribed regimens.' },
        { char: 'E', title: 'Environment & Safety', desc: 'Home safety, fall hazards, accessibility, lighting, ventilation, and sanitation.' },
        { char: 'B', title: 'Basic ADL Function', desc: 'Feeding, continence, transfer mobility, ambulation, and need for assisted repositioning.' },
        { char: 'A', title: 'Access & Assistive Devices', desc: 'Availability of wheelchairs, oxygen concentrators, hospital beds, and telemetry setups.' },
        { char: 'S', title: 'Social Support System', desc: 'Family caregiver availability, neighbor assistance, and community welfare resources.' },
        { char: 'I', title: 'Instability & Acuity', desc: 'Risk of rapid deterioration, recent falls, altered mental status, and qSOFA sepsis screening.' },
        { char: 'C', title: 'Caregiver Stress & Capacity', desc: 'Primary caregiver burnout, sleep disruption, physical strain, and need for respite services.' }
      ]
    },

    preTest: {
      quizTitle: 'Pre-Visit Knowledge Quiz',
      quizDesc: 'Assess your understanding of core Hospital-at-Home regulations and clinical principles before departure',
      nextConfidence: 'Next: Confidence Self-Assessment',
      confTitle: 'Pre-Visit Confidence Self-Assessment',
      confDesc: 'Rate your current confidence on a 1-5 scale (1: Not confident at all, 5: Highly confident)',
      confScale1: '1: Not confident at all',
      confScale5: '5: Highly confident',
      submitBtn: 'Submit Pre-Test & Open Clinical Checklist',
      completeTitle: 'Pre-Visit Assessment Completed!',
      completeDesc: 'You have completed the pre-visit knowledge quiz and confidence evaluation. You may now proceed to on-site HOME BASIC documentation during the visit.',
      proceedChecklist: 'Proceed to HOME BASIC Clinical Checklist'
    },

    checklist: {
      title: 'Clinical Practice: HOME BASIC Assessment',
      subtitle: (id) => `Document your on-site home visit observations for patient (${id}) with the Cathay HaH team`,
      patientIdBadge: (id) => `Patient ID: ${id}`,
      clinicalNotesLabel: 'Comprehensive Clinical Notes (e.g. Bedside POCT / POCUS Residual Volume)',
      clinicalNotesPlaceholder: 'Additional clinical observations, POCT CRP levels, blood gas, pH, urine osmolarity, ultrasound findings...',
      saveBtn: 'Save Visit Assessment Record',
      successTitle: 'Visit Assessment Record Saved Successfully',
      successDesc: 'Great job! Your clinical visit data has been stored. Please proceed to the final post-visit reflection module.',
      proceedPostTest: 'Proceed to Post-Visit Reflection',
      fieldPlaceholder: (label) => `Enter detailed clinical observations for ${label}...`,
      items: [
        { key: 'health', label: 'Health (Vitals & Clinical Status)' },
        { key: 'outlook', label: 'Outlook (Psychological State & Morale)' },
        { key: 'medication', label: 'Medication (Polypharmacy & Adherence)' },
        { key: 'environment', label: 'Environment (Safety & Accessibility)' },
        { key: 'basicADL', label: 'Basic ADL (Self-Care & Mobility)' },
        { key: 'access', label: 'Access (Assistive & Telemetry Devices)' },
        { key: 'social', label: 'Social (Support Network & Family Burden)' },
        { key: 'instability', label: 'Instability (Risk of Acute Decline / qSOFA)' },
        { key: 'caregiver', label: 'Caregiver (Caregiver Burden & Respite)' },
      ]
    },

    postTest: {
      step1Tag: 'Confidence Assessment',
      step1Title: 'Post-Visit Confidence Evaluation',
      step1Desc: 'Reflect on today\'s hands-on experience and re-evaluate your confidence level across the key domains:',
      step2Tag: 'Part 1',
      step2Title: 'Five Clinical Competency Domains Self-Evaluation',
      step2Desc: 'Based on today\'s clinical visit, rate your current developmental milestone in each competency domain:',
      step2NotYet: 'Novice (1)',
      step2Independent: 'Independent with Supervision (5)',
      step3Tag: 'Part 2',
      step3Title: 'Targeted Deep Reflection',
      step3Desc: 'Select 1 to 3 domains that were most impactful, challenging, or thought-provoking today and complete guided reflection entries.',
      step3PickerLabel: 'Select domain(s) for deep reflection:',
      step3Fallback: '⚠️ Please select at least one domain to generate reflection prompts',
      step3DynamicTag: 'Guided Reflection Prompt',
      step3Placeholder: 'Focus on your inner reflections, clinical decision dilemmas, personal feelings, and connection to medical principles...',
      step4Tag: 'Parts 3 & 4',
      step4Title: 'Free Reflection & Take-Home Message',
      step4Desc: 'Synthesize your overall clinical learning points into key takeaways.',
      qFreeReflection: 'What was the most memorable or challenging moment of today\'s visit, and why?',
      qFreeReflectionPlaceholder: 'Describe technical challenges, emotional moments, ethical dilemmas, teamwork dynamics, or patient vulnerability...',
      qOneSentence: 'In one sentence, how did today\'s experience change or deepen your understanding of the physician\'s role?',
      qOneSentencePlaceholder: 'Condense today\'s core insight into a clear take-home learning point...',
      step5Tag: 'Part 5',
      step5Title: 'Emotional & Psychological State Matrix',
      step5Desc: 'Medical learning includes not only knowledge and skills, but also the capacity to navigate emotions, empathy, and uncertainty.',
      step5FreqPrompt: 'Rate how frequently you experienced the following emotional states during today\'s visit:',
      submitTrainingBtn: 'Submit & Complete Training Module ✔',
      nextPageBtn: 'Next Page →',
      completeTitle: 'Reflection Survey Submitted Successfully!',
      completeDesc: 'Thank you for your dedicated participation! You have completed all learning modules, visit records, and reflection exercises of the CGH Hospital-at-Home curriculum.',
      backToDashboardBtn: 'Return to Dashboard & Download Excel Portfolio',
      stepsIndicator: (current, total) => `Step ${current} of ${total}`
    },

    admin: {
      title: 'Curriculum Content Management (Admin)',
      addItem: 'Add Knowledge Item +',
      newItemTitle: 'New Knowledge Item',
      logoConfigTag: 'LOGO CUSTOMIZATION',
      logoConfigTitle: 'Header Logo & Brand Customization',
      logoConfigDesc: 'You can customize the logo displayed in the top header using any of the following convenient methods:',
      method1Title: 'Method 1: Upload Image Directly from Browser',
      method1Desc: 'Upload an image file (PNG, SVG, JPG). It will be cached locally in Base64 format and applied immediately.',
      uploadBtn: 'Choose & Upload Image 📁',
      resetLogo: 'Reset to Default Stethoscope ✖',
      method2Title: 'Method 2: Specify File Path in /public Directory',
      method2Desc: 'Place your logo in the /public folder (e.g. logo.png or hospital-logo.svg) and enter the relative path.',
      currentLogoPreview: 'Current Logo Preview:',
      defaultStethoscope: 'Default Rounded Stethoscope',
      bannerGuideTitle: '🖼️ Platform Background & Modules 1-5 Custom Banner Guide',
      bannerGuideDesc: 'In addition to the logo, the homepage banner background and individual module banners (Units 1-5) can be customized by placing matching images in the /public directory.',
      bannerFormat1: 'Homepage Hero Banner: hero-background.png or background.png',
      bannerFormat2: 'Modules 1 to 5: banner-1.png through banner-5.png',
      saveContent: 'Save Content',
      categoryLaw: 'Regulations & Policy',
      categoryIndication: 'Clinical Indications',
      categoryTreatment: 'Treatment Strategies',
      categoryTool: 'Diagnostic Tools & POCT',
      resetAllData: 'Reset & Restore Default CGH Curriculum'
    },

    preQuizQuestions: [
      {
        id: 'q1',
        text: 'What are the three primary acute infections targeted by the Hospital-at-Home (HaH) pilot program?',
        options: [
          'Pneumonia, Urinary Tract Infection (UTI), Soft Tissue Infection (SSTI)',
          'Gastroenteritis, Bone Fracture, Pneumonia',
          'Stroke, Diabetes Exacerbation, Asthma',
          'Influenza, COVID-19, Common Cold'
        ],
        correctAnswer: 'Pneumonia, Urinary Tract Infection (UTI), Soft Tissue Infection (SSTI)'
      },
      {
        id: 'q2',
        text: 'Which of the following is NOT one of the 9 core dimensions in the HOME BASIC assessment framework?',
        options: [
          'Environment (Safety)',
          'Income (Financial Status)',
          'Outlook (Psychological Morale)',
          'Basic ADL (Daily Living Function)'
        ],
        correctAnswer: 'Income (Financial Status)'
      },
      {
        id: 'q3',
        text: 'Regarding the definition of "General Home Healthcare (S1)", which statement is correct?',
        options: [
          'Clinically stable patients requiring routine medical evaluation and basic procedures',
          'Complex patients requiring multidisciplinary intervention (pharmacy, nursing, nutrition)',
          'Palliative/hospice or severe chronic cases requiring continuous interprofessional management',
          'Critically ill emergency patients requiring immediate surgery and ICU admission'
        ],
        correctAnswer: 'Clinically stable patients requiring routine medical evaluation and basic procedures'
      },
      {
        id: 'q4',
        text: 'In the home care classification, which group is the primary target for "Integrated Home Healthcare (S3)"?',
        options: [
          'Fully mobile patients with a mild common cold',
          'Stable patients only requiring a single pharmacist medication review',
          'Terminal cancer, advanced dementia, end-stage neurodegenerative diseases, ventilator dependency',
          'Healthy adults aged 18 or older without chronic illnesses'
        ],
        correctAnswer: 'Terminal cancer, advanced dementia, end-stage neurodegenerative diseases, ventilator dependency'
      },
      {
        id: 'q5',
        text: 'Regarding HaH "Model C (Emergency Department Cases)", which admission criterion is correct?',
        options: [
          'Disabled patients with Barthel Index < 60 or patients with severe mobility impairment preventing hospital transit',
          'Patients with Barthel Index > 80 who regularly visit clinics independently',
          'Nursing home residents over age 65 with no chronic diseases',
          'Any patient observed in the ER for over 48 hours regardless of functional status'
        ],
        correctAnswer: 'Disabled patients with Barthel Index < 60 or patients with severe mobility impairment preventing hospital transit'
      }
    ],

    confidenceQuestions: [
      { id: 'c1', text: 'I feel that I have a comprehensive understanding of Hospital-at-Home regulations and clinical knowledge.' },
      { id: 'c2', text: 'I am confident in my ability to independently perform a HOME BASIC assessment during home visits.' },
      { id: 'c3', text: 'I am confident in communicating effectively with patients and their family caregivers.' }
    ],

    evalDomains: [
      { id: 'tech', label: '1. Technological Integration (e.g. POCUS, Telemetry, Remote Devices)' },
      { id: 'team', label: '2. Interprofessional Collaboration & Team Communication' },
      { id: 'comm', label: '3. Patient- & Family-Centered Health Communication' },
      { id: 'system', label: '4. Systems Thinking & Healthcare Resource Utilization' },
      { id: 'role', label: '5. Professionalism & Physician Role Identity' }
    ],

    deepReflectionDomains: [
      { id: 'tech', label: 'Technology Integration' },
      { id: 'team', label: 'Interprofessional Collaboration' },
      { id: 'comm', label: 'Patient & Family Communication' },
      { id: 'system', label: 'Systems Thinking & Process' },
      { id: 'role', label: 'Professionalism & Role Identity' }
    ],

    deepReflectionQuestions: [
      { id: 'event', label: 'What specific event today related to this domain was most significant?' },
      { id: 'thought', label: 'What observations, thoughts, or emotions did this event evoke in you?' },
      { id: 'concept', label: 'Looking back, what does this signify and how does it connect to medical concepts?' },
      { id: 'better', label: 'If you encounter a similar situation in the future, what would you do differently?' }
    ],

    emotionItems: [
      { id: 'confidence', label: 'Confidence' },
      { id: 'uncertainty', label: 'Sense of Uncertainty' },
      { id: 'empathy', label: 'Empathy' },
      { id: 'ethics', label: 'Ethical Tension' },
      { id: 'overload', label: 'Cognitive Overload' }
    ],

    emotionFrequency: [
      { val: 1, label: 'Never' },
      { val: 2, label: 'Rarely' },
      { val: 3, label: 'Sometimes' },
      { val: 4, label: 'Frequently' },
      { val: 5, label: 'Constantly Present' }
    ],

    defaultKnowledge: [
      {
        id: 'law-1',
        category: 'law',
        title: 'Hospital-at-Home (HaH) Models A / B / C',
        content: '【Model A: Integrated Home Care Cases】\nPatients currently enrolled in NHI integrated home medical care programs, ventilator-dependent home care stage, specialized home healthcare, and home hospice (excluding residential long-term care institutions).\n\n【Model B: Residential Institution Cases】\nResidents of long-term care facilities participating in MOHW hospital avoidance programs.\n\n【Model C: Emergency Department Cases】\nDisabled patients with Barthel Index < 60, or patients with severe mobility constraints due to disease characteristics.\n\n【Early Discharge Criteria】\n1. Limited to disabled patients (Barthel Index < 60) or those with severe mobility constraints hospitalized with infection, assessed by attending physician as clinically stable with identified bacterial pathogen suitable for completion of IV antibiotics at home/facility.\n2. Applicable to any infection category: pneumonia, UTI, soft tissue infection, and other infections.'
      },
      {
        id: 'law-2',
        category: 'law',
        title: 'Admission & Electronic Claim Verification',
        content: '【Three Core Pillars】\n1. Dedicated acute interprofessional workforce (physicians, certified nurses, clinical pharmacists, respiratory therapists).\n2. 24/7 Call Center support line with urgent in-person home visit capabilities.\n3. Equipped with bedside POCT, cloud IoT telemonitoring, handheld POCUS ultrasound, and portable X-ray.\n\n【Admission Workflow】\n1. Comprehensive briefing to patient/family and signed Shared Decision-Making (SDM) consent for home hospitalization.\n2. Submit electronic admission case report via NHI VPN system within 24 hours of enrollment.\n3. Attending physician simultaneous HaH active patient cap: 20 patients.'
      },
      {
        id: 'law-3',
        category: 'law',
        title: 'EPA (Emergency Passed Admission) Mechanism',
        content: '【EPA Eligibility Criteria】\n1. Patients enrolled in home healthcare or meeting specific disability criteria.\n2. Clinically assessed by emergency physician as meeting hospitalization criteria for pneumonia, UTI, or soft tissue infection, where patient/family strongly express preference for home-based hospitalization.\n\n【EPA Role & Consensus】\nEPA serves as the "first alternative option" (secondary choice) when hospitalization is clinically indicated but refused, rather than primary ER default. Shared Decision-Making (SDM) must be documented in the ER. The first IV antibiotic dose is infused in the ER, followed by green-channel home transport and immediate handover to the HaH team (Days 1–9 outpatient tracking model).'
      },
      {
        id: 'law-4',
        category: 'law',
        title: 'Reimbursement & Copayment Policies',
        content: '【Copayment】\nHaH acute care aligns with home medical care copayment standards, charging only a 5% copayment rate on actual medical and nursing service fees.\n\n【Billing Regulations】\nContracted hospitals may submit NHI claims under only ONE primary infection diagnosis (Pneumonia, UTI, or SSTI) during the same HaH episode without duplicate billing.'
      },
      {
        id: 'ind-1',
        category: 'indication',
        title: 'Pneumonia: Diagnostic & Admission Criteria (3 of 4)',
        content: 'Clinically assessed as requiring hospitalization but suitable for HaH, meeting 3 of the following 4 criteria:\n\n1. Clinical Symptoms: Lower respiratory symptoms (purulent sputum, tachypnea, wheezing, abnormal auscultation) or systemic signs (fever/hypothermia, tachycardia, hypotension, delirium/confusion in elderly, anorexia).\n2. Laboratory: Elevated WBC/neutrophil count, elevated CRP, positive rapid influenza/COVID-19 antigen, or positive urine pneumococcal/legionella antigen.\n3. Imaging: Infiltrates on chest X-ray or lung ultrasound (images kept on record).\n4. Microbiology: Pathogen identified in sputum or blood culture.'
      },
      {
        id: 'ind-2',
        category: 'indication',
        title: 'Urinary Tract Infection (UTI): Criteria (2 of 4)',
        content: 'Clinically assessed as requiring hospitalization but suitable for HaH, meeting 2 of the following 4 criteria:\n\n1. Local Symptoms: Dysuria, frequency, decreased urine output, pyuria/cloudy urine, or CVA tenderness. Oral antibiotic failure in the past week is favorable for admission.\n2. Systemic Signs: Fever (>38°C), tachycardia, hypotension, new-onset altered mental status (confusion/delirium), severe anorexia.\n3. Routine Lab: Elevated WBC, elevated CRP, increased urine WBC/hpf, positive nitrite/bacteria.\n4. Bacterial Culture: Significant pathogen growth in urine or blood culture.'
      },
      {
        id: 'ind-3',
        category: 'indication',
        title: 'Soft Tissue Infection (SSTI): Criteria (3 of 4)',
        content: 'Clinically assessed as requiring hospitalization but suitable for HaH, meeting 3 of the following 4 criteria:\n\n1. Local Symptoms: Spreading erythema, warmth, edema, tenderness, or purulent drainage/tissue necrosis. Failure of oral antibiotics in the prior week is preferred.\n2. Systemic Signs: Fever, tachycardia, hypotension, altered mental status, poor oral intake.\n3. Physical Exam: Marked erythema, wound purulence, localized fluctuance.\n4. Lab/Microbiology: Leukocytosis or elevated CRP, positive wound swab or blood culture pathogen.'
      },
      {
        id: 'ind-4',
        category: 'indication',
        title: 'Exclusion & Hospital Escalation Red Flags',
        content: 'Patients presenting with high-risk clinical markers are NOT suitable for HaH and must remain hospitalized or be transferred to the ER:\n\n1. Hospital-Acquired Pneumonia (HAP): Onset >= 48 hours after admission or within 14 days of discharge, due to high multidrug-resistant (MDRO) risk.\n2. Known MDRO History: Culture-proven MDRO in sputum/urine within the past 90 days.\n3. Severe Immunocompromise: Bone marrow/organ transplant, hematologic malignancy, asplenia, uncontrolled diabetes.\n4. Critical Hemodynamic Instability:\n   - qSOFA score >= 2 (altered mental status, RR > 22, SBP <= 100).\n   - Pneumonia CURB-65 >= 4, severe signs of urosepsis/septic shock.\n5. Severe Urological Complications: Severe hydronephrosis, renal abscess, recent urological surgery, or Acute Kidney Injury (AKI Creatinine >= 1.2).\n6. Complex Deep SSTI: Rapidly progressive necrotizing fasciitis (e.g. Vibrio, Clostridium), compartment syndrome, or Fournier\'s gangrene.'
      },
      {
        id: 'treatment-1',
        category: 'treatment',
        title: 'Target Length of Stay & NHI Claim Caps',
        content: 'NHI pilot guidelines establish target days and maximum reimbursement caps:\n\n- Pneumonia: Target 9 days (2,800 ~ 4,929 points/day), maximum 14 days.\n- Urinary Tract Infection (UTI): Target 7 days (2,050 ~ 3,608 points/day), maximum 9 days.\n- Soft Tissue Infection (SSTI): Target 6 days (2,329 ~ 4,099 points/day), maximum 8 days.'
      },
      {
        id: 'treatment-2',
        category: 'treatment',
        title: 'Visit Frequencies & Interprofessional Team Roles',
        content: '【Physician Responsibilities】\nMust conduct at least one in-person physical home visit within 3 days of enrollment. On non-visit days, daily remote/telehealth consultation, medication review, and electronic VPN visit documentation are mandatory.\n\n【Nurse Responsibilities】\nHome care nurses conduct daily in-person visits to measure vital signs, administer IV antibiotics/infusions, and record arrival/departure timestamps.\n\n【Interprofessional Integration】\nRespiratory Therapists (RT) provide home airway clearance and inhaler training; clinical pharmacists provide home medication reconciliation and safe antibiotic delivery.'
      },
      {
        id: 'treatment-3',
        category: 'treatment',
        title: 'The "5Ds" Antibiotic Stewardship Principles',
        content: '【5Ds Clinical Principles】\n1. Correct Diagnosis / 2. Correct Drug\n3. Correct Dosage / 4. Correct Duration\n5. De-escalating therapy (Timely IV-to-oral step-down)\n\n【Continuous Infusion (cIF) & Safety】\nWhen using 24h continuous infusion or QD dosing (e.g. Cefepime, Ceftazidime), the physician and clinical pharmacist must verify diluent (NS/D5W), volume, mean osmolarity (e.g. 2g/50mL D5W = 457 mOsm/L), and pH (e.g. Cefazolin pH 5.04). Certified smart elastomeric pumps must be utilized at home.'
      },
      {
        id: 'treatment-4',
        category: 'treatment',
        title: 'Empiric Antibiotic Selection Guidelines',
        content: '【Community-Acquired Pneumonia (CAP)】\n- Mild-moderate (CRB-65 = 0~1): Oral Amoxicillin 1000mg Q8H or Amox/Clav (875/125) BID for 7 days.\n- Moderate with comorbidities in HaH: Oral Cefuroxime, IV/Oral Moxifloxacin 400mg QD, Levofloxacin 750mg QD, or IV Penicillin G 18MU / Cefuroxime 4500mg * 7 days.\n- Aspiration Pneumonia: Add anti-anaerobic coverage (Oral/IV Metronidazole 500mg Q8H).\n- Facility Pneumonia: 24h cIF Cefepime 6000mg or Ceftazidime 6000mg or Pip/Tazo 18000mg continuous infusion + Doxycycline/Azithromycin.\n\n【Urinary Tract Infection (UTI)】\n- Non-MDRO Pyelonephritis: Oral TMP/SMX BID or Cefuroxime 500mg BID 10-14 days. IV Ceftriaxone 2000mg QD * 7 days.\n- ESBL / AmpC Producer: IV Ertapenem 1000mg QD * 7 days or renal-adjusted Amikacin.\n\n【Skin & Soft Tissue Infections (SSTI)】\n- Cellulitis / Erysipelas: Cephalexin 500mg QID or Clindamycin 300mg QID (5-7 days). IV Ceftriaxone 2000mg QD or 24h Cefazolin 6000mg continuous infusion.'
      },
      {
        id: 'tool-1',
        category: 'tool',
        title: 'Point-of-Care Testing (POCT) Diagnostic Arsenal',
        content: 'The Cathay HaH team carries a comprehensive suite of rapid bedside POCT diagnostic tools:\n\n1. EPOC / i-STAT Blood Gas & Chemistry: 5-minute bedside whole-blood analysis of Blood Gas, Hematocrit, Electrolytes (Ca++, Na+, K+, Cl-), Glucose, BUN, and Lactate for rapid sepsis risk stratification.\n2. iProtin / Roche Cobas: 10-minute quantitative C-Reactive Protein (CRP) and cardiac biomarkers to assess antibiotic therapeutic response.\n3. Specimen Collection: On-site blood cultures, clean-catch urine, wound swabs, and sputum gram stain & culture.'
      },
      {
        id: 'tool-2',
        category: 'tool',
        title: 'IoT Telemetry & Smart Bedside Technology',
        content: 'Extending hospital-grade vital sign monitoring directly to the home environment:\n\n1. Smart Sleep Pad (iCue): Weight-sensing bed pad providing prolonged out-of-bed alerts, scheduled repositioning reminders (e.g. average 111-min turns), and real-time respiratory/heart rate trends.\n2. Continuous Physiological Monitoring (ASUS Telehealth): Wi-Fi connected pulse oximeter, blood pressure cuff, and 12-lead ECG transmitting live telemetry to the 24/7 command center.\n3. Handheld POCUS Ultrasound (QT-Medical): Bedside handheld ultrasound transducers for instant post-void residual bladder volume measurement and pulmonary pleural effusion screening.'
      },
      {
        id: 'tool-3',
        category: 'tool',
        title: 'Sepsis Risk Assessment: qSOFA & SIRS Tools',
        content: '【qSOFA Rapid Sepsis Screening (>= 2 criteria indicate high mortality risk)】\n1. Altered Mental Status (GCS < 15 or acute confusion)\n2. Tachypnea (Respiratory Rate >= 22 breaths/min)\n3. Hypotension (Systolic Blood Pressure <= 100 mmHg)\n\n【SIRS Criteria (>= 2 criteria)】\n1. Temperature > 38°C or < 36°C\n2. Heart Rate > 90 beats/min\n3. Respiratory Rate > 20 breaths/min or PaCO2 < 32 mmHg\n4. WBC > 12,000/μL or < 4,000/μL or > 10% bands'
      }
    ]
  }
};
