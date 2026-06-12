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
];

export const PRE_QUIZ: Question[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    text: '在宅醫療照護（試辦計畫）中的急症收治主要針對哪三種感染症？',
    options: ['肺炎、尿路感染、軟組織感染', '腸胃炎、骨折、肺炎', '腦中風、糖尿病、氣喘', '流感、新冠、感冒'],
    correctAnswer: '肺炎、尿路感染、軟組織感染'
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    text: '下列哪一項不屬於 HOME BASIC 居家評估之九大維度範疇？',
    options: ['Environment 環境安全', 'Income 收入狀況', 'Outlook 心理與展望', 'Basic ADL 日常生活功能'],
    correctAnswer: 'Income 收入狀況'
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    text: '關於「一般居家醫療 (S1)」之定義，下列敘述何者正確？',
    options: ['單純病況穩定、需定期醫療評估與基本處置', '病情較複雜，需多專業介入，包含藥事、護理、營養等', '以安寧緩和醫療或重症慢性病照護為主，需跨專業整合團隊持續介入', '病情極度危急，需要立即送至急診進行開刀與加護病房照護'],
    correctAnswer: '單純病況穩定、需定期醫療評估與基本處置'
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    text: '居家醫療分類中，「整合式居家醫療 (S3)」之主要服務對象包含下列哪一項？',
    options: ['行動完全自如之輕度感冒患者', '病情複雜、僅需單一藥師介入調劑者', '癌末、失智末期、神經退化末期、呼吸器依賴等', '僅限於年滿 18 歲但無任何慢性病者'],
    correctAnswer: '癌末、失智末期、神經退化末期、呼吸器依賴等'
  },
  {
    id: 'q5',
    type: 'multiple-choice',
    text: '關於在宅醫療照護「模式 C（急診個案）」之收案標準，下列何者正確？',
    options: ['限巴氏量表（Barthel Index）小於 60 分之失能者，或因疾病特性而就醫極度不便者', '限巴氏量表大於 80 分且常規能獨立出門就醫者', '限無任何慢性病、且年齡在 65 歲以上之機構住民', '不限生理功能狀態，只要在急診室留觀滿 48 小時即可收案'],
    correctAnswer: '限巴氏量表（Barthel Index）小於 60 分之失能者，或因疾病特性而就醫極度不便者'
  }
];

export interface EvalDomainItem {
  id: string;
  label: string;
}

export const EVAL_DOMAINS: EvalDomainItem[] = [
  { id: 'tech', label: '1. 科技整合能力（如：POCUS、遙測、遠距醫療設備）' },
  { id: 'team', label: '2. 跨專業合作與團隊溝通' },
  { id: 'comm', label: '3. 家庭與病人為中心的健康溝通' },
  { id: 'system', label: '4. 系統思維與資源運用' },
  { id: 'role', label: '5. 專業態度與醫療角色認同' }
];

export const DEEP_REFLECTION_DOMAINS = [
  { id: 'tech', label: '科技整合' },
  { id: 'team', label: '跨專業合作' },
  { id: 'comm', label: '病人與家庭為中心的溝通' },
  { id: 'system', label: '系統性思考與流程理解' },
  { id: 'role', label: '專業精神與角色認同' }
];

export const DEEP_REFLECTION_QUESTIONS = [
  { id: 'event', label: '今天與此領域相關的具體事件是什麼？' },
  { id: 'thought', label: '這件事情讓你產生什麼觀察或想法（包含感受）？' },
  { id: 'concept', label: '回頭看，你覺得這代表什麼？與醫療專業概念有何連結？' },
  { id: 'better', label: '如果下一次遇到類似情況，你會如何做得更好？' }
];

export const EMOTION_ITEMS = [
  { id: 'confidence', label: '信心' },
  { id: 'uncertainty', label: '不確定感' },
  { id: 'empathy', label: '同理心' },
  { id: 'ethics', label: '倫理張力 (Ethical tension)' },
  { id: 'overload', label: '認知負荷超載 (Cognitive overload)' }
];

export const EMOTION_FREQUENCY = [
  { val: 1, label: '從未' },
  { val: 2, label: '偶爾' },
  { val: 3, label: '有時' },
  { val: 4, label: '經常' },
  { val: 5, label: '始終存在' }
];

// For backward compatibility and compiling
export const CONFIDENCE_QUESTIONS: Question[] = [
  { id: 'c1', type: 'scale', text: '我覺得我對在宅醫療照護的法規與知識有充分了解。' },
  { id: 'c2', type: 'scale', text: '我有信心能獨立完成 HOME BASIC 居家評估。' },
  { id: 'c3', type: 'scale', text: '我有信心能與病患及其家屬進行有效的溝通。' }
];

export const REFLECTION_QUESTIONS: Question[] = [];

