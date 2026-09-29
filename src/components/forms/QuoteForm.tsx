'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { Upload, X, FileText, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { createQuoteRequest } from '@/lib/firestore';
import { cn } from '@/lib/utils';

interface FormData {
  full_name: string;
  email: string;
  wpp: string;
  type_service: 'trad' | 'apostille';
}

interface UploadedFile {
  file: File;
  progress: number;
  done: boolean;
}

export default function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((f) => ({ file: f, progress: 0, done: false }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1_073_741_824, // 1 GB
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  });

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1_048_576).toFixed(1)} MB`;
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const fileNames = files.map((f) => f.file.name);
      await createQuoteRequest({
        fullName: data.full_name,
        email: data.email,
        whatsapp: data.wpp,
        serviceType: data.type_service,
        fileNames,
      });
      setSubmitted(true);
      reset();
      setFiles([]);
      toast.success('Orçamento solicitado! Entraremos em contato em breve.');
    } catch (err) {
      toast.error('Erro ao enviar. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Solicitação enviada!</h3>
        <p className="text-gray-600 mb-6">
          Recebemos seu pedido de orçamento. Nossa equipe entrará em contato em até 2 horas
          úteis pelo e-mail e WhatsApp informados.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-[#2e7ec6] text-white font-bold px-6 py-3 rounded-full hover:bg-[#1a5fa8] transition-colors"
        >
          Nova solicitação
        </button>
      </div>
    );
  }

  return (
    <div className={cn('bg-white dark:bg-[#1a2233] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transition-colors', compact ? 'p-6' : 'p-8')}>
      {/* Header badge */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold text-[#2e7ec6] dark:text-[#38bdf8] uppercase tracking-wider">⚡ Rápido e instantâneo!</span>
      </div>
      <h2 className={cn('font-black text-gray-900 dark:text-white mb-6 tracking-tight', compact ? 'text-xl' : 'text-2xl')}>
        SOLICITE UM ORÇAMENTO
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Nome completo</label>
          <input
            {...register('full_name')}
            type="text"
            placeholder="Nome e sobrenome"
            className="w-full bg-white dark:bg-[#111726] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:border-[#2e7ec6] focus:ring-1 focus:ring-[#2e7ec6] outline-none transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">E-mail *</label>
          <input
            {...register('email', { required: 'E-mail é obrigatório' })}
            type="email"
            placeholder="Seu melhor e-mail"
            className={cn(
              'w-full bg-white dark:bg-[#111726] text-gray-900 dark:text-white border rounded-xl px-4 py-3 text-sm focus:border-[#2e7ec6] focus:ring-1 focus:ring-[#2e7ec6] outline-none transition-colors',
              errors.email ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
            )}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">WhatsApp</label>
          <input
            {...register('wpp')}
            type="tel"
            placeholder="+55 (11) 90000-0000"
            className="w-full bg-white dark:bg-[#111726] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:border-[#2e7ec6] focus:ring-1 focus:ring-[#2e7ec6] outline-none transition-colors"
          />
        </div>

        {/* Service type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Tipo de serviço *</label>
          <select
            {...register('type_service', { required: 'Selecione um serviço' })}
            className={cn(
              'w-full bg-white dark:bg-[#111726] text-gray-900 dark:text-white border rounded-xl px-4 py-3 text-sm focus:border-[#2e7ec6] outline-none transition-colors',
              errors.type_service ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
            )}
          >
            <option value="" disabled selected>Selecione *</option>
            <option value="trad">Tradução / Apostilas</option>
            <option value="apostille">Só Apostila de Haia</option>
          </select>
          {errors.type_service && <p className="text-red-500 text-xs mt-1">{errors.type_service.message}</p>}
        </div>

        {/* File upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Documentos</label>
          <div
            {...getRootProps()}
            className={cn(
              'border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all',
              isDragActive
                ? 'border-[#2e7ec6] bg-blue-50 dark:bg-blue-950/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-[#2e7ec6] dark:hover:border-[#2e7ec6] bg-gray-50/50 dark:bg-[#111726]'
            )}
          >
            <input {...getInputProps()} />
            <Upload size={22} className="mx-auto mb-2 text-gray-400 dark:text-gray-500" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isDragActive ? 'Solte os arquivos aqui' : 'Arraste ou clique para selecionar'}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG — Máximo 1 GB</p>
          </div>

          {files.length > 0 && (
            <ul className="mt-2 space-y-1">
              {files.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-gray-50 dark:bg-[#111726] rounded-lg px-3 py-2 text-sm">
                  <FileText size={14} className="text-[#2e7ec6] shrink-0" />
                  <span className="flex-1 truncate text-gray-700 dark:text-gray-200">{f.file.name}</span>
                  <span className="text-gray-400 text-xs">{formatSize(f.file.size)}</span>
                  <button type="button" onClick={() => removeFile(idx)} className="text-gray-400 hover:text-red-500">
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-[#2e7ec6] dark:text-[#38bdf8] mt-1.5 font-medium">Tamanho máximo de upload: <strong>1 GB</strong></p>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          Trataremos seus dados conforme nossa{' '}
          <a href="/politicas-de-privacidade" className="underline font-semibold hover:text-[#2e7ec6] dark:hover:text-[#38bdf8]" target="_blank">
            Política de Privacidade
          </a>
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#2e7ec6] hover:bg-[#1a5fa8] disabled:opacity-60 text-white font-bold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Enviando...
            </>
          ) : (
            'Ver preço e prazo'
          )}
        </button>
      </form>
    </div>
  );
}
