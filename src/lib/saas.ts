export interface SaaSLeadPayload {
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  service?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  estimatedVolume?: string;
  notes?: string;
  origin?: string;
  files?: Array<string | { name: string; url?: string; dataUrl?: string; size?: number; type?: string }>;
}

export async function sendQuoteToSaaS(data: {
  fullName?: string;
  name?: string;
  email?: string;
  whatsapp?: string;
  phone?: string;
  serviceType?: string;
  service?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  fileNames?: string[];
  files?: Array<string | { name: string; url?: string; dataUrl?: string; size?: number; type?: string }>;
  notes?: string;
  origin?: string;
}): Promise<{ success: boolean; requestId?: string; error?: string }> {
  try {
    const sName = (data.fullName || data.name || 'Cliente Sem Nome').trim();
    const sEmail = (data.email || 'contato@traduztudo.com').trim();
    const sPhone = (data.whatsapp || data.phone || '(11) 94748-5091').trim();
    const sService = data.serviceType || data.service || 'Tradução Juramentada';

    // Parse source & target language if mentioned in serviceType
    let srcLang = data.sourceLanguage || 'Português';
    let tgtLang = data.targetLanguage || 'Inglês';

    if (sService.toLowerCase().includes('para')) {
      const parts = sService.split(/para/i);
      if (parts.length === 2) {
        srcLang = parts[0].replace(/[^\w\s]/gi, '').trim() || srcLang;
        tgtLang = parts[1].replace(/[^\w\s]/gi, '').trim() || tgtLang;
      }
    }

    const filesList = (data.files && data.files.length > 0) ? data.files : (data.fileNames || []);
    const fileNamesOnly = filesList.map((f: any) => typeof f === 'string' ? f : f.name);

    const payload: SaaSLeadPayload = {
      name: sName,
      email: sEmail,
      phone: sPhone,
      whatsapp: sPhone,
      service: sService,
      sourceLanguage: srcLang,
      targetLanguage: tgtLang,
      estimatedVolume:
        fileNamesOnly.length > 0
          ? `${fileNamesOnly.length} arquivo(s)`
          : 'A combinar',
      notes: [
        data.notes || '',
        fileNamesOnly.length > 0
          ? `Arquivos anexados (${fileNamesOnly.length}): ${fileNamesOnly.join(', ')}`
          : '',
      ]
        .filter(Boolean)
        .join('\n'),
      origin: data.origin || 'Site TraduzTudo (traduztudo.com)',
      files: filesList,
    };

    // 1. Try sending via internal /api/lead route first (browser client)
    if (typeof window !== 'undefined') {
      try {
        const internalRes = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (internalRes.ok) {
          const result = await internalRes.json();
          console.log('[SaaS Sync] Sent via internal API:', result);
          return { success: true, requestId: result.requestId };
        }
      } catch (internalErr) {
        console.warn(
          '[SaaS Sync] Internal route call failed, falling back to direct SaaS API...',
          internalErr
        );
      }
    }

    // 2. Direct SaaS API call (works both server-side and client-side)
    const saasUrl =
      process.env.NEXT_PUBLIC_SAAS_API_URL ||
      'https://traduztudo-os.vercel.app/api/public/requests';
    const saasKey =
      process.env.SAAS_API_SECRET_KEY ||
      process.env.NEXT_PUBLIC_SAAS_API_KEY ||
      'traduztudo-saas-api-secret-key-2026';

    const directRes = await fetch(saasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': saasKey,
      },
      body: JSON.stringify(payload),
    });

    if (directRes.ok) {
      const directData = await directRes.json();
      console.log('[SaaS Sync] Sent directly to SaaS API:', directData);
      return { success: true, requestId: directData.requestId };
    } else {
      const errText = await directRes.text();
      console.error(
        '[SaaS Sync] SaaS direct call returned error status:',
        directRes.status,
        errText
      );
      return { success: false, error: errText };
    }
  } catch (error: any) {
    console.error('[SaaS Sync] Failed to send quote to SaaS:', error);
    return { success: false, error: error?.message || 'Unknown error' };
  }
}
