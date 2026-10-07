import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface AttachedDocumentPayload {
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
}

export async function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function readFilesAsAttachments(
  files: File[],
  maxDataUrlSizeBytes: number = 3.5 * 1024 * 1024
): Promise<AttachedDocumentPayload[]> {
  return Promise.all(
    files.map(async (file) => {
      const item: AttachedDocumentPayload = {
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
      };
      if (file.size <= maxDataUrlSizeBytes) {
        try {
          item.dataUrl = await readFileAsDataUrl(file);
        } catch (e) {
          console.warn('Could not read file as dataUrl:', file.name, e);
        }
      }
      return item;
    })
  );
}
