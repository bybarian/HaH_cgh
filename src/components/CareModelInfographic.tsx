/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  AlertCircle, 
  ShieldAlert, 
  Activity, 
  CheckCircle, 
  ClipboardCheck, 
  Users, 
  Shield, 
  Home, 
  Image as LucideImage, 
  Trash2, 
  Upload 
} from 'lucide-react';
import { TranslationData } from '../i18n';

export function CareModelInfographic({ t }: { t: TranslationData }) {
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
                alert('Image size exceeds browser cache limit.');
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

  const modelMeta = t.careModel;

  const traditionalIcons = [
    <AlertCircle size={18} className="text-red-500" />,
    <ShieldAlert size={18} className="text-orange-500" />,
    <Activity size={18} className="text-pink-600" />,
    <CheckCircle size={18} className="text-blue-500" />,
    <ClipboardCheck size={18} className="text-[#8ec31f]" />
  ];

  const inhomeIcons = [
    <AlertCircle size={18} className="text-[#8ec31f]" />,
    <Users size={18} className="text-[#8ec31f]" />,
    <Activity size={18} className="text-[#8ec31f]" />,
    <Shield size={18} className="text-[#8ec31f]" />,
    <Home size={18} className="text-[#8ec31f]" />
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#008d3e]/15 p-6 md:p-8 shadow-sm space-y-8 overflow-hidden">
      
      {/* Top Title */}
      <div className="border-b border-[#008d3e]/10 pb-4">
        <h3 className="text-xl font-bold text-[#008d3e] flex items-center gap-2">
          <span className="p-1 bg-[#8ec31f]/20 rounded-lg text-[#008d3e]">
            <Activity size={20} />
          </span>
          {modelMeta.comparisonTitle}
        </h3>
      </div>

      {/* Pathway Switch Tabs */}
      <div className="flex bg-[#f4f9f4] p-1.5 rounded-xl border border-[#008d3e]/10 gap-1">
        <button
          onClick={() => setSelectedPathway('inhome')}
          className={`flex-1 py-3 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            selectedPathway === 'inhome'
              ? 'bg-[#008d3e] text-white shadow-md'
              : 'text-[#2d3a31]/60 hover:text-[#008d3e] hover:bg-white/60'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#8ec31f]"></span>
          <span>{modelMeta.inhomePathway}</span>
        </button>

        <button
          onClick={() => setSelectedPathway('traditional')}
          className={`flex-1 py-3 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            selectedPathway === 'traditional'
              ? 'bg-gray-700 text-white shadow-md'
              : 'text-[#2d3a31]/60 hover:text-gray-800 hover:bg-white/60'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          <span>{modelMeta.traditionalPathway}</span>
        </button>
      </div>

      {/* Interactive Pathway Content Display */}
      <div className="space-y-4">
        {selectedPathway === 'traditional' ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {modelMeta.traditionalSteps.map((step, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between space-y-2 opacity-80 hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Step 0{idx + 1}
                    </span>
                    {traditionalIcons[idx]}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-700">{step.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
              {modelMeta.inhomeSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between min-h-[110px] relative ${
                    activeStep === idx
                      ? 'bg-[#008d3e]/10 border-[#008d3e] shadow-sm'
                      : 'bg-white border-[#008d3e]/15 hover:border-[#008d3e]/50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] font-black tracking-widest px-2 py-0.5 rounded uppercase ${
                      activeStep === idx ? 'bg-[#008d3e] text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      Step 0{idx + 1}
                    </span>
                    {inhomeIcons[idx]}
                  </div>
                  <div>
                    <h4 className={`font-bold text-xs leading-snug mt-2 ${
                      activeStep === idx ? 'text-[#008d3e]' : 'text-[#2d3a31]'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-[10px] text-[#2d3a31]/60 line-clamp-2 mt-1 leading-normal">
                      {step.desc}
                    </p>
                  </div>
                  {activeStep === idx && (
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#008d3e] rotate-45 rounded-xs hidden md:block"></div>
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
                  {modelMeta.stepDetailTitle(activeStep + 1)}
                </span>
                <span className="font-bold text-sm text-[#008d3e]">{modelMeta.inhomeSteps[activeStep].title}</span>
              </div>
              <p className="text-xs text-[#2d3a31]/80 leading-relaxed whitespace-pre-line font-medium bg-[#f4f9f4]/45 p-3 rounded-md border border-[#008d3e]/10">
                {modelMeta.inhomeSteps[activeStep].details}
              </p>
              <div className="text-[10px] text-gray-400 font-bold flex items-center justify-between flex-wrap gap-2">
                <span>{modelMeta.studentTaskNote}</span>
                <span>{modelMeta.cghOffice}</span>
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
            <span>{modelMeta.uploadZoneTitle}</span>
          </h4>
          {uploadedImage && (
            <button
              onClick={removeUploadedImage}
              className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <Trash2 size={13} />
              {modelMeta.removeImage}
            </button>
          )}
        </div>

        {uploadedImage ? (
          <div className="space-y-2">
            <div className="bg-white border text-center p-3 rounded-xl group relative overflow-hidden flex items-center justify-center max-h-[550px] shadow-sm">
              <img
                src={uploadedImage}
                alt="Care model diagram"
                className="max-h-[520px] object-contain rounded-lg shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[11px] text-[#2d3a31]/60 text-center font-medium">
              {modelMeta.imageCachedHint}
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
              <p className="text-sm font-bold text-[#2d3a31]">{modelMeta.uploadHint}</p>
              <p className="text-xs text-[#2d3a31]/65 max-w-sm">
                {modelMeta.uploadSubHint}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Key Team Features */}
      <div className="space-y-4 pt-4 border-t border-[#008d3e]/10">
        <h4 className="text-sm font-bold text-[#008d3e] uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8ec31f]"></span>
          {modelMeta.keyFeaturesTitle}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modelMeta.teamFeatures.map((feat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-[#008d3e]/10 shadow-xs space-y-2 hover:border-[#8ec31f] transition-all">
              <span className="text-[10px] font-black text-[#008d3e] bg-[#8ec31f]/10 px-2 py-0.5 rounded">
                {feat.sub}
              </span>
              <h5 className="font-bold text-xs text-[#2d3a31]">{feat.title}</h5>
              <p className="text-[11px] text-[#2d3a31]/70 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
