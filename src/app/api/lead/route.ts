import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Se o cliente não informou e-mail (campo opcional), gera identificador para compatibilidade com o schema do SaaS
    const rawEmail = (body.email || '').trim();
    if (!rawEmail) {
      const cleanPhone = (body.phone || body.whatsapp || 'lead').replace(/\D/g, '');
      body.email = `${cleanPhone || 'sem-email'}@whatsapp.traduztudo.com`;
      body.notes = (body.notes || '') + '\n[E-mail: Não informado pelo cliente no site (atendimento via WhatsApp)]';
    }

    const saasUrl =
      process.env.NEXT_PUBLIC_SAAS_API_URL ||
      'https://traduztudo-os.vercel.app/api/public/requests';
    
    const saasKey = "\\traduztudo-saas-api-secret-key-2026\\";

    const response = await fetch(saasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': saasKey,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: corsHeaders,
    });
  } catch (error: any) {
    console.error('Error forwarding lead to SaaS:', error);
    return NextResponse.json(
      { error: 'Erro ao encaminhar lead para o SaaS', details: error?.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
