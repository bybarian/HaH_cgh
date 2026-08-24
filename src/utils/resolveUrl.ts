/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const resolveUrl = (pathStr: string): string => {
  if (!pathStr) return '';
  if (pathStr.startsWith('data:') || pathStr.startsWith('http://') || pathStr.startsWith('https://')) {
    return pathStr;
  }
  let base = (import.meta as any).env?.BASE_URL || '/';
  const cleanPath = pathStr.replace(/^\/+/, '');
  if (base === './') {
    return `./${cleanPath}`;
  }
  if (!base.endsWith('/')) {
    base = base + '/';
  }
  return `${base}${cleanPath}`;
};
