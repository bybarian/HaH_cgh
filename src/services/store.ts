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
    return JSON.parse(data);
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
