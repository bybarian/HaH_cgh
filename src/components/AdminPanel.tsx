/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Stethoscope, LogOut } from 'lucide-react';
import { KnowledgeItem } from '../types';
import { db } from '../services/store';
import { TranslationData } from '../i18n';

export function AdminPanel({ 
  items, 
  setItems, 
  setView, 
  logoUrl, 
  setLogoUrl, 
  logoBase64, 
  setLogoBase64,
  t,
  onExitAdmin
}: { 
  items: KnowledgeItem[]; 
  setItems: (items: KnowledgeItem[]) => void; 
  setView: (v: any) => void; 
  logoUrl: string | null; 
  setLogoUrl: (v: string | null) => void; 
  logoBase64: string | null; 
  setLogoBase64: (v: string | null) => void;
  t: TranslationData;
  onExitAdmin?: () => void;
}) {
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
      title: t.admin.newItemTitle,
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

  const adminMeta = t.admin;

  return (
    <div className="space-y-8 pb-20 bg-white border border-[#008d3e]/10 rounded-2xl p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#008d3e]/10 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('dashboard')} className="text-[#008d3e] font-bold hover:underline text-sm flex items-center gap-1">
            {t.backToHome}
          </button>
          <span className="text-[#008d3e]/30">/</span>
          <h2 className="text-2xl font-bold text-[#008d3e]">{adminMeta.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {onExitAdmin && (
            <button
              onClick={onExitAdmin}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3.5 py-2 rounded-lg font-bold flex items-center gap-1.5 shadow-2xs transition-colors text-xs"
              title="登出並返回學員首頁 / Logout"
            >
              <LogOut size={14} />
              <span>登出管理員</span>
            </button>
          )}
          <button 
            onClick={handleAddItem}
            className="bg-[#008d3e] text-white px-4 py-2.5 rounded-lg font-bold hover:bg-[#007031] flex items-center gap-2 shadow-sm transition-colors text-xs self-start"
          >
            {adminMeta.addItem} +
          </button>
        </div>
      </div>

      {/* Logo Customization Panel */}
      <div className="bg-[#f4f9f4]/50 border border-[#008d3e]/15 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="p-1 px-2.5 text-[10px] bg-[#008d3e]/15 text-[#008d3e] rounded font-black">{adminMeta.logoConfigTag}</span>
          <h3 className="font-bold text-sm text-[#008d3e]">{adminMeta.logoConfigTitle}</h3>
        </div>
        
        <p className="text-xs text-[#2d3a31]/60 leading-relaxed">
          {adminMeta.logoConfigDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Method A: Upload File */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-2.5 shadow-sm">
            <h4 className="font-bold text-xs text-[#2d3a31]">{adminMeta.method1Title}</h4>
            <p className="text-[11px] text-gray-400">
              {adminMeta.method1Desc}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <input 
                type="file" 
                accept="image/*" 
                id="logo-uploader-input"
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const res = event.target?.result as string;
                      if (res) {
                        localStorage.setItem('cgh_custom_logo_base64', res);
                        setLogoBase64(res);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <label 
                htmlFor="logo-uploader-input"
                className="cursor-pointer bg-[#008d3e] text-white text-xs px-3.5 py-2 rounded-lg font-bold hover:bg-[#007031] transition shadow-sm inline-block"
              >
                {adminMeta.uploadBtn}
              </label>
              {(logoBase64 || logoUrl) && (
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('cgh_custom_logo_base64');
                    localStorage.removeItem('cgh_custom_logo_url');
                    setLogoBase64(null);
                    setLogoUrl(null);
                  }}
                  className="bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 text-xs px-3.5 py-2 rounded-lg font-bold transition"
                >
                  {adminMeta.resetLogo}
                </button>
              )}
            </div>
          </div>

          {/* Method B & C: Public Directory */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-2.5 shadow-sm">
            <h4 className="font-bold text-xs text-[#2d3a31]">{adminMeta.method2Title}</h4>
            <p className="text-[11px] text-gray-400">
              {adminMeta.method2Desc}
            </p>
            <div className="flex gap-2 pt-1">
              <input 
                type="text" 
                placeholder="e.g. /logo.svg or /hospital-logo.png"
                value={logoUrl && !logoUrl.startsWith('data:') ? logoUrl : ''}
                onChange={(e) => {
                  const val = e.target.value;
                  localStorage.setItem('cgh_custom_logo_url', val);
                  setLogoUrl(val || null);
                }}
                className="flex-1 text-xs p-2.5 border border-[#008d3e]/15 rounded-lg focus:ring-2 focus:ring-[#8ec31f] focus:border-transparent outline-none text-[#2d3a31]"
              />
            </div>
          </div>
        </div>

        {/* Current Preview */}
        <div className="bg-white p-3.5 rounded-xl border border-[#008d3e]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#008d3e]">{adminMeta.currentLogoPreview}</span>
            <div className="h-12 bg-[#f4f9f4]/30 px-5 rounded-lg border border-gray-100 flex items-center justify-center">
              {logoBase64 ? (
                <img src={logoBase64} alt="Custom Logo" className="h-8 max-w-[150px] object-contain" referrerPolicy="no-referrer" />
              ) : logoUrl ? (
                <img src={logoUrl} alt="Custom Logo" className="h-8 max-w-[150px] object-contain" referrerPolicy="no-referrer" />
              ) : (
                <div className="flex items-center gap-2 text-[#008d3e]">
                  <div className="bg-[#008d3e] p-1.5 rounded-lg text-white">
                    <Stethoscope size={18} />
                  </div>
                  <span className="text-xs font-bold">{adminMeta.defaultStethoscope}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Banners note */}
        <div className="mt-4 p-4.5 bg-white rounded-xl border border-dashed border-[#008d3e]/20 space-y-2">
          <h4 className="font-bold text-xs text-[#008d3e] flex items-center gap-1.5">
            🖼️ {adminMeta.bannerGuideTitle}
          </h4>
          <p className="text-[11px] text-[#2d3a31]/75 leading-relaxed">
            {adminMeta.bannerGuideDesc}
          </p>
          <ul className="list-disc list-inside text-[11px] text-[#2d3a31]/60 space-y-1 pl-2 font-mono">
            <li><strong>Hero Background:</strong> <code>hero-background.png</code> / <code>background.png</code></li>
            <li>Module 1: <code>banner-1.png</code> / <code>banner-module-1.png</code></li>
            <li>Module 2: <code>banner-2.png</code> / <code>banner-module-2.png</code></li>
            <li>Module 3: <code>banner-3.png</code> / <code>banner-module-3.png</code></li>
            <li>Module 4: <code>banner-4.png</code> / <code>banner-module-4.png</code></li>
            <li>Module 5: <code>banner-5.png</code> / <code>banner-module-5.png</code></li>
          </ul>
        </div>
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
                  <option value="law">{t.knowledgeTabs.law}</option>
                  <option value="indication">{t.knowledgeTabs.indication}</option>
                  <option value="treatment">{t.knowledgeTabs.treatment}</option>
                  <option value="tool">{t.knowledgeTabs.tool}</option>
                </select>
                <textarea 
                  value={editingItem.content} 
                  onChange={e => setEditingItem({...editingItem, content: e.target.value})}
                  className="w-full p-3 border border-[#008d3e]/10 rounded-xl min-h-[150px] text-sm text-[#2d3a31] focus:ring-1 focus:ring-[#8ec31f] outline-none"
                />
                <div className="flex gap-2">
                  <button onClick={handleSave} className="bg-[#008d3e] text-white px-6 py-2 rounded-lg text-xs font-bold hover:bg-[#007031] shadow-sm">{adminMeta.saveContent}</button>
                  <button onClick={() => setEditingItem(null)} className="bg-white text-[#2d3a31]/60 px-6 py-2 rounded-lg text-xs font-bold border border-[#008d3e]/10">{t.cancel}</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                    {t.knowledgeTabs[item.category as keyof typeof t.knowledgeTabs] || item.category}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem(item)} className="text-xs font-bold text-[#008d3e] hover:underline">{t.edit}</button>
                    <button onClick={() => handleDelete(item.id)} className="text-xs font-bold text-red-500 hover:underline">{t.delete}</button>
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#008d3e] mb-2">{item.title}</h3>
                <p className="text-xs text-[#2d3a31]/70 line-clamp-2">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
