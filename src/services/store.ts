/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KnowledgeItem, INITIAL_KNOWLEDGE, TestResult, HomeBasicChecklist } from '../types';

const STORAGE_KEYS = {
  KNOWLEDGE: 'learning_site_knowledge',
  RESULTS: 'learning_site_results',
  CHECKLISTS: 'learning_site_checklists',
};

class StorageService {
  getKnowledge(): KnowledgeItem[] {
    const data = localStorage.getItem(STORAGE_KEYS.KNOWLEDGE);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.KNOWLEDGE, JSON.stringify(INITIAL_KNOWLEDGE));
      return INITIAL_KNOWLEDGE;
    }
    
    // Auto-sync updated INITIAL_KNOWLEDGE to existing localStorage
    try {
      const parsed: KnowledgeItem[] = JSON.parse(data);
      const merged = INITIAL_KNOWLEDGE.map(def => {
        const existing = parsed.find(p => p.id === def.id);
        if (existing) {
          // If title/content changed in codebase, prefer the updated codebase version
          // to always keep standard definitions fresh
          return def;
        }
        return def;
      });
      // Preserve any custom items added by the user
      const custom = parsed.filter(p => !INITIAL_KNOWLEDGE.find(def => def.id === p.id));
      const result = [...merged, ...custom];
      localStorage.setItem(STORAGE_KEYS.KNOWLEDGE, JSON.stringify(result));
      return result;
    } catch (e) {
      localStorage.setItem(STORAGE_KEYS.KNOWLEDGE, JSON.stringify(INITIAL_KNOWLEDGE));
      return INITIAL_KNOWLEDGE;
    }
  }

  saveKnowledge(items: KnowledgeItem[]) {
    localStorage.setItem(STORAGE_KEYS.KNOWLEDGE, JSON.stringify(items));
  }

  saveResult(result: TestResult) {
    const results = this.getResults();
    results.push(result);
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
  }

  getResults(): TestResult[] {
    const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
    return data ? JSON.parse(data) : [];
  }

  saveChecklist(checklist: HomeBasicChecklist) {
    const lists = this.getChecklists();
    lists.push(checklist);
    localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(lists));
  }

  getChecklists(): HomeBasicChecklist[] {
    const data = localStorage.getItem(STORAGE_KEYS.CHECKLISTS);
    return data ? JSON.parse(data) : [];
  }

  clearAll() {
    localStorage.clear();
    window.location.reload();
  }
}

export const db = new StorageService();
